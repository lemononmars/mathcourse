import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import tikzjax from 'node-tikzjax';

const root = process.cwd();
const contentRoot = path.join(root, 'content', 'courses', 'math-for-designer', 'lectures');
const outputRoot = path.join(root, 'static', 'generated', 'tikz');
const manifestFile = path.join(root, 'content', 'courses', 'math-for-designer', 'tikz-manifest.json');
const force = process.argv.includes('--force');
const checkOnly = process.argv.includes('--check');
const compilerVersion = 'node-tikzjax@1.0.5';
const preambleVersion = '2';
const tex2svg = tikzjax.default ?? tikzjax;
const preamble = String.raw`
\usepackage{amsmath,amssymb,amsfonts}
\newcommand{\red}[1]{\textcolor{red}{#1}}
\newcommand{\blue}[1]{\textcolor{blue}{#1}}
\newcommand{\green}[1]{\textcolor{green!60!black}{#1}}
\newcommand{\orange}[1]{\textcolor{orange}{#1}}
\newcommand{\purple}[1]{\textcolor{purple}{#1}}
\newcommand{\bv}[1]{\left\langle #1 \right\rangle}
\newcommand{\axes}[4]{\draw[<->](#1,0) -- (#2,0) node[right] {$x$}; \draw[<->](0,#3)--(0,#4) node[above] {$y$};}
`;
const tikzOptions = {
  texPackages: { amsmath: '', amssymb: '', amsfonts: '' },
  tikzLibraries: 'arrows,arrows.meta,calc,patterns,positioning,shapes,intersections,angles,quotes,decorations.pathreplacing',
  addToPreamble: preamble,
  embedFontCss: true,
  fontCssUrl: '/generated/tikz/fonts.css',
  disableOptimize: false
};
const legacyPreamble = preamble.replace('\\newcommand{\\bv}[1]{\\left\\langle #1 \\right\\rangle}', '\\newcommand{\\bv}[1]{\\boldsymbol{\\langle #1 \\rangle}}');
const fontDirectory = path.join(root, 'node_modules', 'node-tikzjax', 'css', 'bakoma', 'ttf');

function selfContainedSvg(svg) {
  const families = [...new Set([...svg.matchAll(/font-family="([^"]+)"/g)].map((match) => match[1]))];
  const fontRules = families.map((family) => {
    const file = path.join(fontDirectory, `${family}.ttf`);
    if (!fs.existsSync(file)) throw new Error(`TikZ font is missing: ${family}`);
    const data = fs.readFileSync(file).toString('base64');
    return `@font-face{font-family:${family};src:url(data:font/ttf;base64,${data}) format("truetype")}`;
  }).join('');
  const style = `${fontRules}svg{background:#fff}`;
  return svg.replace(/<style>@import\s+url\([^)]*\);<\/style>/, `<style>${style}</style>`);
}

function markdownTikzBlocks(value) {
  return [...value.matchAll(/^(?:-\s*)?:::tikz(?:\s+([^\n]*))?\r?\n([\s\S]*?)^:::[ \t]*$/gm)].map((match) => {
    const following = value.slice((match.index ?? 0) + match[0].length);
    const nearbyCaption = following.match(/^(?:\r?\n[ \t]*)*\*(?!\*)([^\r\n*]+)\*(?!\*)/)?.[1]?.trim();
    const preceding = value.slice(0, match.index ?? 0);
    const nearbyHeading = [...preceding.matchAll(/^##\s+(.+)$/gm)].at(-1)?.[1]?.trim();
    const directiveCaption = match[1]?.trim();
    return {
      caption: directiveCaption && directiveCaption !== 'TikZ diagram'
        ? directiveCaption
        : nearbyCaption || nearbyHeading || 'Diagram',
      source: match[2].trim()
    };
  });
}

function contentFiles() {
  return fs.readdirSync(contentRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name)).flatMap((week) =>
    fs.readdirSync(path.join(contentRoot, week.name)).filter((name) => name.endsWith('.md')).sort().map((name) => path.join(contentRoot, week.name, name))
  );
}

function diagramJobs() {
  const jobs = [];
  for (const file of contentFiles()) {
    const relativeFile = path.relative(root, file).replaceAll('\\', '/');
    markdownTikzBlocks(fs.readFileSync(file, 'utf8')).forEach(({ source, caption }, diagramIndex) => {
      const normalized = source.replace(/\r\n/g, '\n').trim();
      const hash = crypto.createHash('sha256').update(`${compilerVersion}\0${preambleVersion}\0${normalized}`).digest('hex').slice(0, 16);
      jobs.push({ relativeFile, diagramIndex, source: normalized, caption, hash, url: `/generated/tikz/${hash}.svg` });
    });
  }
  return jobs;
}

const jobs = diagramJobs();
console.log(`Found ${jobs.length} TikZ diagrams with matching Markdown source slots.`);
if (checkOnly) {
  if (!fs.existsSync(manifestFile)) throw new Error('TikZ manifest is missing. Run npm run content:tikz.');
  const existing = JSON.parse(fs.readFileSync(manifestFile, 'utf8')).diagrams ?? {};
  const missing = jobs.filter((job) => {
    const file = path.join(outputRoot, `${job.hash}.svg`);
    return existing[job.relativeFile]?.[job.diagramIndex]?.hash !== job.hash || !fs.existsSync(file) || /@import\s+url\(/.test(fs.readFileSync(file, 'utf8'));
  });
  if (missing.length) throw new Error(`${missing.length} TikZ assets are stale or missing. Run npm run content:tikz.`);
  console.log(`Verified ${jobs.length} prebuilt static SVG references.`);
  process.exit(0);
}

fs.mkdirSync(outputRoot, { recursive: true });
fs.cpSync(path.join(root, 'node_modules', 'node-tikzjax', 'css', 'bakoma'), path.join(outputRoot, 'bakoma'), { recursive: true });
fs.copyFileSync(path.join(root, 'node_modules', 'node-tikzjax', 'css', 'fonts.css'), path.join(outputRoot, 'fonts.css'));

const manifest = {};
for (let index = 0; index < jobs.length; index += 1) {
  const job = jobs[index];
  const outputFile = path.join(outputRoot, `${job.hash}.svg`);
  if (!force && !fs.existsSync(outputFile) && !job.source.includes('\\bv')) {
    const legacyHash = crypto.createHash('sha256').update(`${compilerVersion}\0${legacyPreamble}\0${job.source}`).digest('hex').slice(0, 16);
    const legacyFile = path.join(outputRoot, `${legacyHash}.svg`);
    if (fs.existsSync(legacyFile)) fs.copyFileSync(legacyFile, outputFile);
  }
  if (force || !fs.existsSync(outputFile)) {
    process.stdout.write(`[${index + 1}/${jobs.length}] ${job.relativeFile} diagram ${job.diagramIndex + 1} ... `);
    const document = `\\begin{document}\n${job.source}\n\\end{document}`;
    try {
      const svg = await tex2svg(document, tikzOptions);
      fs.writeFileSync(outputFile, selfContainedSvg(svg));
      console.log('built');
    } catch (error) {
      console.error('failed');
      throw new Error(`TikZ compilation failed for ${job.relativeFile}, diagram ${job.diagramIndex + 1}: ${error instanceof Error ? error.message : error}`);
    }
  }
  const existingSvg = fs.readFileSync(outputFile, 'utf8');
  if (/@import\s+url\(/.test(existingSvg)) fs.writeFileSync(outputFile, selfContainedSvg(existingSvg));
  (manifest[job.relativeFile] ??= []).push({ hash: job.hash, url: job.url, caption: job.caption });
}

fs.writeFileSync(manifestFile, `${JSON.stringify({ compiler: compilerVersion, diagrams: manifest }, null, 2)}\n`);
const keep = new Set(jobs.map((job) => `${job.hash}.svg`));
for (const name of fs.readdirSync(outputRoot).filter((name) => name.endsWith('.svg'))) {
  if (!keep.has(name)) fs.unlinkSync(path.join(outputRoot, name));
}
execFileSync(process.execPath, [path.join(root, 'scripts', 'generate-course-data.mjs')], { cwd: root, stdio: 'inherit' });
console.log(`Wrote ${jobs.length} static SVG references to ${path.relative(root, manifestFile)}.`);
