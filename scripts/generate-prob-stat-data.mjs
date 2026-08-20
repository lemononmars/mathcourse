import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const force = process.argv.includes("--force");
const probStatTexRoot = "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Prob and Stat for GAD";
const contentRoot = path.join(root, "content", "courses", "prob-and-stat-for-gad", "lectures");
const staticGraphicsRoot = path.join(root, "static", "graphics");
const manifestFile = path.join(root, "content", "courses", "prob-and-stat-for-gad", "tikz-manifest.json");
const tikzManifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")).diagrams ?? {} : {};

fs.mkdirSync(contentRoot, { recursive: true });
fs.mkdirSync(staticGraphicsRoot, { recursive: true });

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

const texToMarkdown = (source) => applyCourseCommands(latexTablesToMarkdown(source))
  .replace(/(?<!\\)%.*$/gm, "")
  .replace(/\\begin\{tikzpicture\}([\s\S]*?)\\end\{tikzpicture\}/g, (_, body) => `\nTIKZBLOCK${Buffer.from(`\\begin{tikzpicture}${body}\\end{tikzpicture}`).toString("base64")}ENDTIKZBLOCK\n`)
  .replace(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/g, (_, file) => `\n:::figure ${file}\n:::\n`)
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

function resolveGraphic(detail) {
  const requested = detail.split(/\s+(?:—|â€”|–)\s+/)[0].trim().replace(/^graphics\//, "");
  if (!requested || /^https?:/i.test(requested)) return "";
  
  const courseDir = path.join(staticGraphicsRoot, "prob-and-stat-for-gad");
  const courseFiles = fs.existsSync(courseDir) ? fs.readdirSync(courseDir) : [];
  const reqStem = path.parse(requested).name.toLowerCase();
  const reqExt = path.parse(requested).ext.toLowerCase();

  const matched = courseFiles.find((f) => f.toLowerCase() === requested.toLowerCase())
    || courseFiles.find((f) => path.parse(f).name.toLowerCase() === reqStem && (!reqExt || path.parse(f).ext.toLowerCase() === reqExt))
    || courseFiles.find((f) => path.parse(f).name.toLowerCase() === reqStem);

  if (matched) {
    return `/graphics/prob-and-stat-for-gad/${encodeURIComponent(matched)}`;
  }

  const flatFiles = fs.readdirSync(staticGraphicsRoot).filter((f) => {
    try { return !fs.statSync(path.join(staticGraphicsRoot, f)).isDirectory(); } catch { return false; }
  });
  const flatMatched = flatFiles.find((f) => f.toLowerCase() === requested.toLowerCase())
    || flatFiles.find((f) => path.parse(f).name.toLowerCase() === reqStem);
  if (flatMatched) {
    return `/graphics/${encodeURIComponent(flatMatched)}`;
  }

  return "";
}

function runtimeContent(content, relativeFile) {
  const diagrams = tikzManifest[relativeFile] ?? [];
  let diagramIdx = 0;
  
  const withDiagrams = content.replace(/^(?:-\s*)?:::tikz(?:\s+([^\n]*))?\r?\n[\s\S]*?^:::[ \t]*(?:\r?\n[ \t]*)*(?:\*(?!\*)([^\r\n*]+)\*(?!\*))?/gm, (source, caption = "TikZ diagram") => {
    const diagram = diagrams[diagramIdx++];
    return diagram ? `:::tikzsvg ${diagram.url} | ${diagram.caption || caption.trim()}\n:::\n\n` : source;
  });

  return withDiagrams.replace(/^:::figure\s+([^\n]+)\r?\n:::/gm, (source, detail) => {
    const url = resolveGraphic(detail);
    if (!url) return source;
    const parts = detail.split(/\s+(?:—|â€”|–)\s+/);
    const caption = parts.slice(1).join(" — ").trim() || path.parse(parts[0].trim()).name.replaceAll("_", " ");
    return `:::figureimg ${url} | ${caption}\n:::`;
  });
}

function titleOf(source, fallback) {
  return cleanTitle(source.match(/\\title(?:\[[^\]]*\])?\{([^}]*)\}/)?.[1] || fallback).replace(/Lecture\s*\d+\s*[:–-]?\s*/i, "").replace(/\\\\/g, " ").trim();
}

function lectureSections(source) {
  const markers = [...source.matchAll(/\\section(?:\[([^\]]*)\])?\{([^}]*)\}/g)];
  return markers.map((marker, index) => {
    const start = marker.index + marker[0].length;
    const end = markers[index + 1]?.index ?? source.length;
    return {
      title: cleanTitle(marker[2]).replace(/\\\\/g, " ").trim(),
      preferredSlug: cleanTitle(marker[1] || marker[2]),
      content: texToMarkdown(source.slice(start, end))
    };
  }).filter((section) => section.content.length > 20);
}

function worksheetQuestions(source) {
  if (!source) return [];
  const cleaned = source.replace(/(?<!\\)%.*$/gm, "")
    .replace(/\\begin\{(?:enumerate|tasks|itemize)\}(?:\[[^\]]*\])?(?:\([^)]*\))?/g, "")
    .replace(/\\end\{(?:enumerate|tasks|itemize)\}/g, "");
  return cleaned.split(/\\(?:item|task)\b(?:\[[^\]]*\])?/).slice(1).map(texToMarkdown).filter((q) => q.length > 10).slice(0, 14);
}

const weeks = [];
for (let week = 1; week <= 12; week += 1) {
  const id = String(week).padStart(2, "0");
  const lectureFile = path.join(probStatTexRoot, `lecture${id}.tex`);
  const worksheetFile = path.join(probStatTexRoot, `worksheet${id}.tex`);

  if (!fs.existsSync(lectureFile)) {
    console.warn(`[Prob & Stat] Missing: ${lectureFile}`);
    continue;
  }

  const lectureSource = fs.readFileSync(lectureFile, "utf8");
  const worksheetSource = fs.existsSync(worksheetFile) ? fs.readFileSync(worksheetFile, "utf8") : "";
  const weekDir = path.join(contentRoot, id);
  fs.mkdirSync(weekDir, { recursive: true });

  const rawSections = lectureSections(lectureSource);
  const generated = (rawSections.length ? rawSections : [{ title: "Overview", preferredSlug: "overview", content: texToMarkdown(lectureSource) }]).map((section, index) => {
    const slug = slugify(section.preferredSlug) || `section-${index + 1}`;
    const filename = `${String(index + 1).padStart(2, "0")}-${slug}.md`;
    const fullPath = path.join(weekDir, filename);
    const frontmatter = `---\nweek: ${week}\norder: ${index + 1}\nslug: ${JSON.stringify(slug)}\ntitle: ${JSON.stringify(section.title)}\nsource: ${JSON.stringify(`tex/lecture${id}.tex`)}\n---\n\n`;
    if (force || !fs.existsSync(fullPath)) fs.writeFileSync(fullPath, frontmatter + section.content + "\n");
    const parsed = parseFrontmatter(fs.readFileSync(fullPath, "utf8"));
    const anchors = [...parsed.content.matchAll(/^##\s+(.+)$/gm)].map((match) => slugify(match[1])).filter(Boolean);
    const relativeFile = `content/courses/prob-and-stat-for-gad/lectures/${id}/${filename}`;
    const processedContent = runtimeContent(parsed.content, relativeFile);
    return {
      title: parsed.meta.title,
      anchor: parsed.meta.slug,
      routeSlug: `${String(index + 1).padStart(2, "0")}-${slugify(parsed.meta.title) || parsed.meta.slug}`,
      anchors,
      file: relativeFile,
      content: processedContent
    };
  });

  const weekTitle = titleOf(lectureSource, `Week ${week}`);
  const activity = generated.filter((section) => /activity/i.test(`${section.anchor} ${section.title}`));
  const sections = generated.filter((section) => !activity.includes(section));
  weeks.push({
    week,
    slug: `${id}-${slugify(weekTitle)}`,
    title: weekTitle,
    sections,
    activity,
    worksheet: worksheetQuestions(worksheetSource)
  });
}

fs.writeFileSync(path.join(root, "src", "lib", "prob-and-stat-data.json"), JSON.stringify(weeks, null, 2));
console.log(`[Prob & Stat] Generated ${weeks.length} weeks.`);
