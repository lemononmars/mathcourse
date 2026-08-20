import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const coursesConfig = [
  {
    id: "calculus-1-for-engineers",
    title: "Calculus 1 for Engineers (แคลคูลัส 1)",
    code: "MTH 101",
    texDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 1 for Engineers"
  },
  {
    id: "calculus-2-for-engineers",
    title: "Calculus 2 for Engineers (แคลคูลัส 2)",
    code: "MTH 102",
    texDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 2 for Engineers"
  },
  {
    id: "calculus-3-for-engineers",
    title: "Calculus 3 for Engineers (แคลคูลัส 3)",
    code: "MTH 201",
    texDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 3 for Engineers"
  }
];

for (const c of coursesConfig) {
  console.log(`\n======================================================`);
  console.log(`COURSE: ${c.title} (${c.id})`);
  console.log(`======================================================`);
  for (let w = 1; w <= 15; w++) {
    const id = String(w).padStart(2, "0");
    const file = path.join(c.texDir, `lecture${id}.tex`);
    if (fs.existsSync(file)) {
      const src = fs.readFileSync(file, "utf8");
      const titleMatch = src.match(/\\title(?:\[[^\]]*\])?\{([^}]*)\}/);
      const title = titleMatch ? titleMatch[1].replace(/\\(?:textbf|textit|emph|alert)\{([^}]*)\}/g, "$1").replace(/\\\\/g, " ").trim() : `Lecture ${w}`;
      const sections = [...src.matchAll(/\\section(?:\[([^\]]*)\])?\{([^}]*)\}/g)].map(m => m[2].trim());
      console.log(`Week ${w} : ${title}`);
      console.log(`  Sections (${sections.length}): ${sections.slice(0, 5).join(", ")}${sections.length > 5 ? "..." : ""}`);
    }
  }
}
