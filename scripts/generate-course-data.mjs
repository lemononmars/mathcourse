import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const force = process.argv.includes("--force");
const contentRoot = path.join(root, "content", "courses", "math-for-designer", "lectures");
const graphicsRoot = path.join(root, "graphics");
const staticGraphicsRoot = path.join(root, "static", "graphics");
const tikzManifestFile = path.join(root, "content", "courses", "math-for-designer", "tikz-manifest.json");
const commandSource = fs.readFileSync(path.join(root, "mycommands.tex"), "utf8");
const tikzManifest = fs.existsSync(tikzManifestFile) ? JSON.parse(fs.readFileSync(tikzManifestFile, "utf8")).diagrams : {};
const graphicsFiles = fs.readdirSync(graphicsRoot).filter((name) => fs.statSync(path.join(graphicsRoot, name)).isFile());
const graphicsByName = new Map(graphicsFiles.map((name) => [name.toLowerCase(), name]));
const graphicsByStem = new Map();
for (const name of graphicsFiles) {
  const stem = path.parse(name).name.toLowerCase();
  const current = graphicsByStem.get(stem);
  if (!current || /\.(png|webp)$/i.test(name)) graphicsByStem.set(stem, name);
}
fs.mkdirSync(staticGraphicsRoot, { recursive: true });

function graphicUrl(detail = "") {
  const requested = detail.split(/\s+(?:—|â€”|–)\s+/)[0].trim();
  if (!requested || /^https?:/i.test(requested)) return "";
  const exact = graphicsByName.get(requested.toLowerCase());
  const resolved = exact ?? graphicsByStem.get(path.parse(requested).name.toLowerCase());
  if (!resolved) return "";
  const target = path.join(staticGraphicsRoot, resolved);
  if (!fs.existsSync(target) || fs.statSync(target).size !== fs.statSync(path.join(graphicsRoot, resolved)).size) {
    fs.copyFileSync(path.join(graphicsRoot, resolved), target);
  }
  return `/graphics/${encodeURIComponent(resolved)}`;
}

export const slugify = (value) => value
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/\\[a-zA-Z]+|\$|[{}]/g, "").replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "").slice(0, 72);

const boxNames = {
  theorem: "theorem", thm: "theorem", property: "property", prop: "property",
  exercisebox: "exercise", exercise: "exercise", slide: "slide", block: "note",
  defn: "definition", definition: "definition", ex: "example", example: "example",
  sol: "solution", solution: "solution", remark: "remark", proof: "proof"
};

const cleanTitle = (value = "") => value
  .replace(/\\(?:textbf|textit|emph|alert|red|blue|green)\{([^{}]*)\}/g, "$1")
  .replace(/\$|\\mathbb\{([^}]*)\}/g, "$1").trim();

function applyCourseCommands(source) {
  if (!commandSource.includes("\\newcommand{\\then}")) throw new Error("mycommands.tex is missing the expected course commands.");
  return source
    .replace(/\\then\b/g, "\\longrightarrow")
    .replace(/\\(?:pa|smallskip|medskip|bigskip)\b/g, "")
    .replace(/\\ch\{([^{}]*)\}\{([^{}]*)\}/g, "\\binom{$1}{$2}")
    .replace(/\\mathnote\{([^{}]*)\}/g, "\\boxed{\\text{$1}}")
    .replace(/\\vv\{([^{}]*)\}\{([^{}]*)\}/g, "\\left\langle $1, $2 \\right\rangle")
    .replace(/\\bvec\{([^{}]*)\}/g, "\\mathbf{$1}")
    .replace(/\\cvec\{([^{}]*)\}\{([^{}]*)\}/g, "\\begin{pmatrix}$1\\\\$2\\end{pmatrix}")
    .replace(/\\bv\{([^{}]*)\}/g, "\\left\\langle $1 \\right\\rangle")
    .replace(/\\solbox\{([^{}]*)\}/g, "\n:::solution\n$1\n:::\n");
}

function latexTablesToMarkdown(source) {
  return source.replace(/\\begin\{(tabular|tblr)\}[^\n]*\n([\s\S]*?)\\end\{\1\}/g, (_match, _environment, body) => {
    const rows = body
      .replace(/\\(?:hline|toprule|midrule|bottomrule)\b/g, "")
      .replace(/\\cline\{[^}]*\}/g, "")
      .split(/\\\\(?:\[[^\]]*\])?/)
      .map((row) => row.trim())
      .filter(Boolean)
      .map((row) => row.split(/(?<!\\)&/).map((cell) => cell.trim()
        .replace(/\\multicolumn\{\d+\}\{[^}]*\}\{([^}]*)\}/g, "$1")
        .replace(/\|/g, "\\|")));
    if (!rows.length) return "";
    const width = Math.max(...rows.map((row) => row.length));
    const normalize = (row) => [...row, ...Array(Math.max(0, width - row.length)).fill("")];
    const lines = [normalize(rows[0]), Array(width).fill("---"), ...rows.slice(1).map(normalize)];
    return `\n${lines.map((row) => `| ${row.join(" | ")} |`).join("\n")}\n`;
  });
}

const youtubeId = (url = "") => url.match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{11})/)?.[1] ?? "";
const youtubeTitles = {
  p0quM2txQwg: "Vein's diagram done… right?",
  "5TkIe60y2GI": "All the Numbers — Numberphile",
  "2SUvWfNJSsM": "Binary, Hanoi and Sierpinski, part 1",
  "v-tFGm9nCV0": "A chain of factories",
  kMQ4PBjF0TI: "Exponential Idle",
  PF2nmCVSUEs: "Trigonometry hand trick",
  yBw67Fb31Cs: "The hidden graphing twist",
  snHKEpCv0Hk: "Beautiful Trigonometry — Numberphile",
  WR0nMTr6uOo: "Electrifying binomial probability",
  AuA2EAgAegE: "e (Euler's Number) — Numberphile",
  sULa9Lc4pck: "The Triangle of Power",
  pAMgUB51XZA: "Amazing Graphs — Numberphile",
  XkY2DOUCWMU: "Composition of linear transformations"
};
const youtubeDirective = (url, title = "Video lesson") => {
  const id = youtubeId(url);
  const suppliedTitle = cleanTitle(title);
  const displayTitle = !suppliedTitle || suppliedTitle === "Video lesson" ? youtubeTitles[id] || "Video lesson" : suppliedTitle;
  return id ? `\n:::youtube ${id} | ${displayTitle}\n:::\n` : "";
};

const texToMarkdown = (source) => applyCourseCommands(latexTablesToMarkdown(source))
  .replace(/(?<!\\)%.*$/gm, "")
  .replace(/\\begin\{tikzpicture\}([\s\S]*?)\\end\{tikzpicture\}/g, (_, body) => `\nTIKZBLOCK${Buffer.from(`\\begin{tikzpicture}${body}\\end{tikzpicture}`).toString("base64")}ENDTIKZBLOCK\n`)
  .replace(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/g, (_, file) => `\n:::figure ${file}\n:::\n`)
  .replace(/^\\addfig([^\n]*(?:youtube\.com|youtu\.be)[^\n]*)$/gm, (_, args) => {
    const link = args.match(/\\href\{([^}]*)\}\{([^}]*)\}/);
    const file = args.match(/\}\{([^{}]+)\}\{/)?.[1] ?? "Video lesson";
    return youtubeDirective(link?.[1], link?.[2] || file);
  })
  .replace(/\\addfig(?:\{[^}]*\})?\{([^}]*)\}(?:\{([^}]*)\})?(?:\{[^}]*\})?/g, (_, file, caption) => `\n:::figure ${file}${caption ? ` — ${caption}` : ""}\n:::\n`)
  .replace(/\\begin\{frame\}(?:\[[^\]]*\])?(?:\{([^}]*)\})?/g, (_, title) => title ? `\n## ${cleanTitle(title)}\n` : "")
  .replace(/\\frametitle\{([^}]*)\}/g, (_, title) => `\n## ${cleanTitle(title)}\n`)
  .replace(/\\begin\{(theorem|thm|property|prop|exercisebox|exercise|slide|block|defn|definition|ex|example|sol|solution|remark|proof)\}(?:\{([^}]*)\})?(?:\{[^}]*\})?/g,
    (_, env, title) => `\n:::${boxNames[env]}${cleanTitle(title) ? ` ${cleanTitle(title)}` : ""}\n`)
  .replace(/\\end\{(theorem|thm|property|prop|exercisebox|exercise|slide|block|defn|definition|ex|example|sol|solution|remark|proof)\}/g, "\n:::\n")
  .replace(/\\begin\{(?:columns?|figure|table|subfigure|center|flushleft|flushright|tasks|enumerate|itemize|description)\}(?:\[[^\]]*\])?(?:\([^)]*\))?(?:\{[^}]*\})?/g, "")
  .replace(/\\end\{(?:frame|columns?|figure|table|subfigure|center|flushleft|flushright|tasks|enumerate|itemize|description)\}/g, "")
  .replace(/\\begin\{column\}\{[^}]*\}|\\end\{column\}/g, "")
  .replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, "[$2]($1)")
  .replace(/\\(?:textbf|alert|red|blue|green)\{([^{}]*)\}/g, "**$1**")
  .replace(/\\(?:textit|emph|underline)\{([^{}]*)\}/g, "*$1*")
  .replace(/\\(?:frame|sectionpage|titlepage|pause|centering|newpage|tcblower|vfill|hfill|maketitle)\b(?:\{[^}]*\})?/g, "")
  .replace(/\\(?:vspace|hspace)\*?\{[^}]*\}/g, "")
  .replace(/\\item(?:\[[^\]]*\])?/g, "\n- ").replace(/\\task\s*/g, "\n- ")
  .replace(/\\caption\{([^}]*)\}/g, "*$1*").replace(/\\label\{[^}]*\}|\\only<[^>]*>/g, "")
  .replace(/\\(small|footnotesize|scriptsize|tiny|large|Large|LARGE|normalsize)\b/g, "")
  .replace(/\\end\{document\}|\\begin\{document\}/g, "")
  .replace(/\\\\/g, "\n").replace(/\n[ \t]+/g, "\n").replace(/[ \t]{2,}/g, " ")
  .replace(/TIKZBLOCK([A-Za-z0-9+/=]+)ENDTIKZBLOCK/g, (_, encoded) => `\n:::tikz TikZ diagram\n${Buffer.from(encoded, "base64").toString("utf8")}\n:::\n`)
  .replace(/\n{3,}/g, "\n\n").trim();

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: markdown };
  const meta = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
    const at = line.indexOf(":");
    const key = line.slice(0, at); const raw = line.slice(at + 1).trim();
    try { return [key, JSON.parse(raw)]; } catch { return [key, raw]; }
  }));
  return { meta, content: match[2].trim() };
}

function runtimeContent(content, relativeFile) {
  const diagrams = tikzManifest[relativeFile] ?? [];
  let index = 0;
  const normalized = applyCourseCommands(latexTablesToMarkdown(content))
    .replace(/\\begin\{proof\}/g, "\n:::proof\n")
    .replace(/\\end\{proof\}/g, "\n:::\n")
    .replace(/\\begin\{table\}(?:\[[^\]]*\])?/g, "")
    .replace(/\\end\{table\}/g, "");
  const withDiagrams = normalized.replace(/^(?:-\s*)?:::tikz(?:\s+([^\n]*))?\r?\n[\s\S]*?^:::[ \t]*(?:\r?\n[ \t]*)*(?:\*(?!\*)([^\r\n*]+)\*(?!\*))?/gm, (source, caption = "TikZ diagram") => {
    const diagram = diagrams[index++];
    return diagram ? `:::tikzsvg ${diagram.url} | ${diagram.caption || caption.trim()}\n:::\n\n` : source;
  });

  const withVideos = withDiagrams
    .replace(/^:::figure([^\n]*(?:youtube\.com|youtu\.be)[^\n]*)\r?\n:::[ \t]*(?:\r?\n[)} \t]*)*/gm, (_, detail) => {
      const url = detail.match(/https?:\/\/[^\s}\])]+/)?.[0] ?? "";
      const title = detail.split(/[—â€“-]/)[0]?.trim().replace(/^\S+\s*/, "") || "Video lesson";
      return youtubeDirective(url, title);
    })
    .replace(/\*?\[([^\]]*)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^)]+)\)\*?/g, (_, title, url) => youtubeDirective(url, title));

  const withoutVideoSources = withVideos.replace(/^:::figure[^\n]*\r?\n:::[ \t]*(?:\r?\n[ \t]*)*(?=:::youtube)/gm, "");
  return withoutVideoSources.replace(/^:::figure\s+([^\n]+)\r?\n:::/gm, (source, detail) => {
    const url = graphicUrl(detail);
    if (!url) return source;
    const parts = detail.split(/\s+(?:—|â€”|–)\s+/);
    const caption = parts.slice(1).join(" — ").trim() || path.parse(parts[0].trim()).name.replaceAll("_", " ");
    return `:::figureimg ${url} | ${caption}\n:::`;
  });
}

function titleOf(source, fallback) {
  return cleanTitle(source.match(/\\title\{([^}]*)\}/)?.[1] || fallback).replace(/Lecture\s*\d+\s*[:–-]?\s*/i, "");
}

function lectureSections(source) {
  const markers = [...source.matchAll(/\\section(?:\[([^\]]*)\])?\{([^}]*)\}/g)];
  return markers.map((marker, index) => {
    const start = marker.index + marker[0].length; const end = markers[index + 1]?.index ?? source.length;
    return { title: cleanTitle(marker[2]), preferredSlug: cleanTitle(marker[1] || marker[2]), content: texToMarkdown(source.slice(start, end)) };
  }).filter((section) => section.content.length > 40);
}

function worksheetQuestions(source) {
  const cleaned = source.replace(/(?<!\\)%.*$/gm, "")
    .replace(/\\begin\{(?:enumerate|tasks|itemize)\}(?:\[[^\]]*\])?(?:\([^)]*\))?/g, "")
    .replace(/\\end\{(?:enumerate|tasks|itemize)\}/g, "");
  return cleaned.split(/\\(?:item|task)\b(?:\[[^\]]*\])?/).slice(1).map(texToMarkdown).filter((q) => q.length > 10).slice(0, 14);
}

const weeks = [];
for (let week = 1; week <= 12; week += 1) {
  const id = String(week).padStart(2, "0");
  const lectureSource = fs.readFileSync(path.join(root, "tex", `lecture${id}.tex`), "utf8");
  const worksheetSource = fs.readFileSync(path.join(root, "tex", `worksheet${id}.tex`), "utf8");
  const weekDir = path.join(contentRoot, id); fs.mkdirSync(weekDir, { recursive: true });
  const generated = lectureSections(lectureSource).map((section, index) => {
    const slug = slugify(section.preferredSlug) || `section-${index + 1}`;
    const filename = `${String(index + 1).padStart(2, "0")}-${slug}.md`;
    const fullPath = path.join(weekDir, filename);
    const frontmatter = `---\nweek: ${week}\norder: ${index + 1}\nslug: ${JSON.stringify(slug)}\ntitle: ${JSON.stringify(section.title)}\nsource: ${JSON.stringify(`tex/lecture${id}.tex`)}\n---\n\n`;
    if (force || !fs.existsSync(fullPath)) fs.writeFileSync(fullPath, frontmatter + section.content + "\n");
    const parsed = parseFrontmatter(fs.readFileSync(fullPath, "utf8"));
    const anchors = [...parsed.content.matchAll(/^##\s+(.+)$/gm)].map((match) => slugify(match[1])).filter(Boolean);
    const relativeFile = `content/courses/math-for-designer/lectures/${id}/${filename}`;
    return { title: parsed.meta.title, anchor: parsed.meta.slug, routeSlug: `${String(index + 1).padStart(2, "0")}-${slugify(parsed.meta.title) || parsed.meta.slug}`, anchors, file: relativeFile, content: runtimeContent(parsed.content, relativeFile) };
  });
  const weekTitle = titleOf(lectureSource, `Week ${week}`);
  const activity = generated.filter((section) => /activity/i.test(`${section.anchor} ${section.title}`));
  const sections = generated.filter((section) => !activity.includes(section));
  weeks.push({ week, slug: `${id}-${slugify(weekTitle)}`, title: weekTitle, sections, activity, worksheet: worksheetQuestions(worksheetSource) });
}

fs.writeFileSync(path.join(root, "src", "lib", "course-data.json"), JSON.stringify(weeks, null, 2));
console.log(`Generated ${weeks.length} weeks, ${weeks.reduce((sum, week) => sum + week.sections.length, 0)} Markdown sections${force ? " (forced)" : ""}.`);
