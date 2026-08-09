import fs from 'node:fs';
import path from 'node:path';

const directory = path.resolve('static', 'generated', 'tikz');
const unsafe = fs.readdirSync(directory).filter((name) => name.endsWith('.svg')).filter((name) => {
  const svg = fs.readFileSync(path.join(directory, name), 'utf8');
  return svg.includes('<text') && /@import\s+url\(/.test(svg) && !svg.includes('data:font/');
});

if (unsafe.length) {
  console.error(`FAIL: ${unsafe.length} SVGs contain text whose TeX fonts are external. As <img> resources, they can fall back to ordinary Unicode glyphs and display math symbols incorrectly.`);
  process.exit(1);
}

console.log('PASS: every text-bearing TikZ SVG is self-contained.');
