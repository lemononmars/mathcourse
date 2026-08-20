import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const courses = [
  {
    slug: "math-for-designer",
    srcDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Math for Designer/graphics"
  },
  {
    slug: "prob-and-stat-for-gad",
    srcDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Prob and Stat for GAD/graphics"
  },
  {
    slug: "calculus-1-for-engineers",
    srcDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 1 for Engineers/graphics"
  },
  {
    slug: "calculus-2-for-engineers",
    srcDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 2 for Engineers/graphics"
  },
  {
    slug: "calculus-3-for-engineers",
    srcDir: "C:/Users/sakul_bp6myy0/OneDrive/Tex/Slides/Calculus 3 for Engineers/graphics"
  }
];

const staticGraphicsRoot = path.join(root, "static", "graphics");
fs.mkdirSync(staticGraphicsRoot, { recursive: true });

let totalCopied = 0;

for (const course of courses) {
  const courseTargetDir = path.join(staticGraphicsRoot, course.slug);
  fs.mkdirSync(courseTargetDir, { recursive: true });

  if (!fs.existsSync(course.srcDir)) {
    console.warn(`[${course.slug}] No graphics dir found at ${course.srcDir}`);
    continue;
  }

  const files = fs.readdirSync(course.srcDir).filter((f) => {
    try {
      return fs.statSync(path.join(course.srcDir, f)).isFile();
    } catch {
      return false;
    }
  });

  let copied = 0;
  for (const file of files) {
    const srcFile = path.join(course.srcDir, file);
    const targetFile = path.join(courseTargetDir, file);
    const flatTargetFile = path.join(staticGraphicsRoot, file);

    // Copy to course-specific folder
    if (!fs.existsSync(targetFile) || fs.statSync(targetFile).size !== fs.statSync(srcFile).size) {
      fs.copyFileSync(srcFile, targetFile);
    }
    // Also copy to flat static/graphics/ if not present
    if (!fs.existsSync(flatTargetFile)) {
      try {
        fs.copyFileSync(srcFile, flatTargetFile);
      } catch (err) {
        // Ignore duplicate naming collisions in flat root
      }
    }
    copied++;
  }
  totalCopied += copied;
  console.log(`[${course.slug}] Synchronized ${copied} graphics files.`);
}

console.log(`\nTotal graphics synchronized: ${totalCopied} files.`);
