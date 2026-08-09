import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const stripTex = (source) => source
  .replace(/%.*$/gm, "")
  .replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, "\n[Interactive diagram available in the lesson]\n")
  .replace(/\\(?:includegraphics|addfig)\{[^}]*\}(?:\{[^}]*\}){0,3}/g, "")
  .replace(/\\begin\{(?:frame|columns?|figure|center|flushleft|flushright|block|defn|ex|sol|remark|tasks|enumerate|itemize|description)\}(?:\[[^\]]*\])?(?:\{[^}]*\})?/g, "")
  .replace(/\\end\{(?:frame|columns?|figure|center|flushleft|flushright|block|defn|ex|sol|remark|tasks|enumerate|itemize|description)\}/g, "")
  .replace(/\\begin\{column\}\{[^}]*\}/g, "")
  .replace(/\\end\{column\}/g, "")
  .replace(/\\(?:frametitle|title|section|subsection)\*?\{[^}]*\}/g, "")
  .replace(/\\(?:frame|sectionpage|titlepage|pause|centering|newpage|tcblower|vfill|hfill)\b(?:\{[^}]*\})?/g, "")
  .replace(/\\(?:vspace|hspace)\*?\{[^}]*\}/g, "")
  .replace(/\\(?:textbf|textit|emph|alert|underline|mathrm|text)\{([^{}]*)\}/g, "$1")
  .replace(/\\item(?:\[[^\]]*\])?/g, "\n- ")
  .replace(/\\task\s*/g, "\n- ")
  .replace(/\\caption\{([^}]*)\}/g, "$1")
  .replace(/\\label\{[^}]*\}|\\pause|\\only<[^>]*>/g, "")
  .replace(/\\(small|footnotesize|scriptsize|tiny|large|Large|LARGE|normalsize)\b/g, "")
  .replace(/\\\\/g, "\n")
  .replace(/\n[ \t]+/g, "\n")
  .replace(/[ \t]{2,}/g, " ")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

function titleOf(source, fallback) {
  return (source.match(/\\title\{([^}]*)\}/)?.[1] || fallback)
    .replace(/Lecture\s*\d+\s*[:–-]?\s*/i, "")
    .replace(/\$|\\mathbb\{([^}]*)\}/g, "$1")
    .trim();
}

function lectureSections(source, week) {
  const markers = [...source.matchAll(/\\section\{([^}]*)\}/g)];
  if (!markers.length) {
    const frames = [...source.matchAll(/\\begin\{frame\}(?:\[[^\]]*\])?(?:\{([^}]*)\})?([\s\S]*?)\\end\{frame\}/g)];
    const size = Math.max(1, Math.ceil(frames.length / 4));
    return Array.from({ length: Math.ceil(frames.length / size) }, (_, index) => ({
      title: ["Foundations", "Core ideas", "Worked examples", "Applications"][index] || `Part ${index + 1}`,
      content: stripTex(frames.slice(index * size, (index + 1) * size).map((m) => m[0]).join("\n")),
    }));
  }
  return markers.map((marker, index) => {
    const start = marker.index + marker[0].length;
    const end = markers[index + 1]?.index ?? source.length;
    return { title: stripTex(marker[1]), content: stripTex(source.slice(start, end)) };
  }).filter((section) => section.content.length > 80 && !/^extra$/i.test(section.title));
}

function worksheetQuestions(source) {
  const cleaned = source
    .replace(/%.*$/gm, "")
    .replace(/\\begin\{(?:enumerate|tasks|itemize)\}(?:\[[^\]]*\])?(?:\([^)]*\))?/g, "")
    .replace(/\\end\{(?:enumerate|tasks|itemize)\}/g, "");
  const chunks = cleaned.split(/\\(?:item|task)\b(?:\[[^\]]*\])?/).slice(1);
  return chunks.map(stripTex).filter((q) => q.length > 10).slice(0, 14);
}

const weeks = [];
for (let week = 1; week <= 12; week += 1) {
  const id = String(week).padStart(2, "0");
  const lectureSource = fs.readFileSync(path.join(root, "tex", `lecture${id}.tex`), "utf8");
  const worksheetSource = fs.readFileSync(path.join(root, "tex", `worksheet${id}.tex`), "utf8");
  weeks.push({
    week,
    title: titleOf(lectureSource, `Week ${week}`),
    sections: lectureSections(lectureSource, week),
    worksheet: worksheetQuestions(worksheetSource),
  });
}

fs.writeFileSync(path.join(root, "src", "lib", "course-data.json"), JSON.stringify(weeks, null, 2));
console.log(`Generated ${weeks.length} weeks with ${weeks.reduce((sum, week) => sum + week.sections.length, 0)} sections.`);
