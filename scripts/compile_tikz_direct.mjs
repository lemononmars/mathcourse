import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import tikzjax from 'node-tikzjax';

const root = 'C:/coding projects/mathcourse';
const outputRoot = path.join(root, 'static', 'generated', 'tikz');
const manifestFile = path.join(root, 'content', 'courses', 'math-for-designer', 'tikz-manifest.json');
const tex2svg = tikzjax.default ?? tikzjax;

const preamble = `
\\usepackage{amsmath,amssymb,amsfonts}
\\newcommand{\\red}[1]{\\textcolor{red}{#1}}
\\newcommand{\\blue}[1]{\\textcolor{blue}{#1}}
\\newcommand{\\green}[1]{\\textcolor{green!60!black}{#1}}
\\newcommand{\\orange}[1]{\\textcolor{orange}{#1}}
\\newcommand{\\purple}[1]{\\textcolor{purple}{#1}}
\\newcommand{\\bv}[1]{\\left\\langle #1 \\right\\rangle}
\\newcommand{\\axes}[4]{\\draw[<->](#1,0) -- (#2,0) node[right] {$x$}; \\draw[<->](0,#3)--(0,#4) node[above] {$y$};}
`;

const tikzOptions = {
  texPackages: { amsmath: '', amssymb: '', amsfonts: '' },
  tikzLibraries: 'arrows,arrows.meta,calc,patterns,positioning,shapes,intersections,angles,quotes,decorations.pathreplacing',
  addToPreamble: preamble,
  embedFontCss: true,
  fontCssUrl: '/generated/tikz/fonts.css',
  disableOptimize: false
};

const fontDirectory = path.join(root, 'node_modules', 'node-tikzjax', 'css', 'bakoma', 'ttf');

function selfContainedSvg(svg) {
  const families = [...new Set([...svg.matchAll(/font-family="([^"]+)"/g)].map((match) => match[1]))];
  const fontRules = families.map((family) => {
    const file = path.join(fontDirectory, `${family}.ttf`);
    if (!fs.existsSync(file)) return '';
    const data = fs.readFileSync(file).toString('base64');
    return `@font-face{font-family:${family};src:url(data:font/ttf;base64,${data}) format("truetype")}`;
  }).join('');
  const style = `${fontRules}svg{background:#fff}`;
  return svg.replace(/<style>@import\s+url\([^)]*\);<\/style>/, `<style>${style}</style>`);
}

const sources = [
  {
    caption: 'Clock Arithmetic (Modulo 6)',
    source: `\\begin{tikzpicture}[scale=0.7]

\\filldraw[thick, fill = blue!30] (0,0) circle (4.5 cm);
\\foreach \\theta in {0,1,2,3,4,5} {
	\\draw (0,0) -- ({\\theta*60}:4.5);
}

\\draw[->, dashed, domain = 0:19, smooth, samples = 200, variable=\\t] plot ({(1+\\t/6)*cos((pi/2 - \\t) r)}, {(1+\\t/6)*sin((pi/2 - \\t) r)});
\\foreach \\n in {0,1,...,17} {
 	\\node[circle, fill = white, draw, minimum size=1mm, font=\\small] at ({90-\\n*60}:{1+\\n/6}) {\\n};
}

\\end{tikzpicture}`
  },
  {
    caption: 'Clock Arithmetic (Modulo 6 - Negative Numbers)',
    source: `\\begin{tikzpicture}[scale=0.7]

\\filldraw[thick, fill = red!20] (0,0) circle (4.5 cm);
\\foreach \\theta in {0,1,2,3,4,5} {
	\\draw (0,0) -- ({\\theta*60}:4.5);
}

\\draw[->, dashed, domain = 0:19, smooth, samples = 200, variable=\\t] plot ({(1+\\t/6)*cos((pi/2 + \\t) r)}, {(1+\\t/6)*sin((pi/2 + \\t) r)});
\\foreach \\n in {0,1,...,17} {
 	\\node[circle, fill = white, draw, minimum size=1mm, font=\\small] at ({90+\\n*60}:{1+\\n/6}) {-\\n};
}

\\end{tikzpicture}`
  }
];

const results = [];
for (const item of sources) {
  const normalized = item.source.trim();
  const hash = crypto.createHash('sha256').update(`node-tikzjax@1.0.5\02\0${normalized}`).digest('hex').slice(0, 16);
  const doc = `\\begin{document}\n${normalized}\n\\end{document}`;
  console.log(`Compiling ${item.caption} (hash: ${hash})...`);
  const rawSvg = await tex2svg(doc, tikzOptions);
  const svg = selfContainedSvg(rawSvg);
  const outputFile = path.join(outputRoot, `${hash}.svg`);
  fs.writeFileSync(outputFile, svg);
  results.push({ hash, url: `/generated/tikz/${hash}.svg`, caption: item.caption });
  console.log(`Saved to ${outputFile}`);
}

const manifestData = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
manifestData.diagrams['content/courses/math-for-designer/lectures/02/03-modulo.md'] = results;
fs.writeFileSync(manifestFile, JSON.stringify(manifestData, null, 2) + '\n');
console.log('Updated manifest!');
