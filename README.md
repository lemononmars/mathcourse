# Math for Designer

An interactive, mobile-friendly 12-week mathematics course built from the TeX lecture and worksheet sources in this repository.

## Stack

- Svelte 5 and SvelteKit
- TypeScript
- Tailwind CSS 4 and DaisyUI
- KaTeX for mathematical notation
- JSXGraph for interactive diagrams
- Cloudflare adapter

## Development

```sh
npm install
npm run dev
```

Validate and build with:

```sh
npm run check
npm run build
```

Course data is generated from `tex/lecture01.tex`–`tex/lecture12.tex` and `tex/worksheet01.tex`–`tex/worksheet12.tex` using `scripts/generate-course-data.mjs`.
