# Editing course content

The course is organized so that ordinary lesson editing happens in Markdown, not in application code.

## Where everything lives

```text
content/courses/math-for-designer/
└── lectures/
    ├── 01/
    │   ├── 01-concept.md
    │   ├── 02-set-operation.md
    │   └── ...
    ├── 02/
    └── ... through 12/

tex/
├── lecture01.tex ... lecture12.tex
└── worksheet01.tex ... worksheet12.tex

src/lib/course-data.json       generated data consumed by SvelteKit
scripts/generate-course-data.mjs
```

Each numbered folder is one week. Each Markdown file is one subsection and appears as one item in the lecture sidebar. The filename order controls its position. The frontmatter controls its stable URL and label:

```markdown
---
week: 4
order: 5
slug: "composite"
title: "Composite Function"
source: "tex/lecture04.tex"
---
```

The `slug` is the deep link, for example `/courses/math-for-designer/lecture/4#composite`. Keep an existing slug stable after publishing so saved links continue to work.

## Is it manageable by hand?

Yes. There are 76 small subsection files rather than 12 very large files, so changing prose, formulas, headings, examples, and box types is practical. Edit the Markdown files and then run:

```sh
npm run content:sync
```

This refreshes `src/lib/course-data.json` while preserving existing Markdown files. Do not edit `course-data.json` directly because it is generated.

Use `npm run content:reset` only when you intentionally want to regenerate every subsection from the original TeX. It passes `--force` and overwrites manual Markdown edits.

## Supported writing syntax

Use normal paragraphs, `-` lists, `**bold**`, `*italic*`, links, inline math such as `$f(x)=x^2$`, and display math:

```markdown
\[
  (f \circ g)(x)=f(g(x))
\]
```

A frame title is represented by a level-two heading and renders as a linked lesson header:

```markdown
## Composite functions
```

TeX environments use directive boxes. Available types are `definition`, `theorem`, `property`, `example`, `exercise`, `note`, `slide`, `remark`, and `solution`:

```markdown
:::definition Optional short title
A function maps every input to exactly one output.
:::

:::solution
Work through the substitution here.
:::
```

Solutions render as collapsed DaisyUI accordions. Other types receive distinct tcolorbox-like colors.

TikZ and original images can be retained as source markers:

```markdown
:::tikz Coordinate diagram
\begin{tikzpicture}
  \draw[->] (-1,0) -- (4,0);
\end{tikzpicture}
:::
```

TikZ is compiled ahead of time into content-hashed SVG files under `static/generated/tikz`. Run `npm run content:tikz` after adding or editing a TikZ block. Existing hashes are cached; use `npm run content:tikz:force` only to rebuild every diagram. The production build verifies that the source blocks still match the prebuilt manifest, but never runs TeX on Vercel or in a student browser. The design rationale is in [`research/tikz-in-markdown.md`](research/tikz-in-markdown.md).

## Development editor

Run `npm run dev` and open a lecture. An **Edit this subsection** button appears below the lesson only in development mode. It loads the subsection Markdown into a textarea and saves back to both the Markdown file and generated course data, then reloads the page.

The editor endpoint is Vite development middleware. It is not included in the Vercel production application, only accepts `.md` files inside this course's content directory, and rejects path traversal. This is intentionally a local authoring tool, not a public CMS.

For structural changes—adding, removing, or reordering subsection files—stop the dev server, update the files/frontmatter, run `npm run content:sync`, and restart. For ordinary text edits, the in-page editor is enough.
