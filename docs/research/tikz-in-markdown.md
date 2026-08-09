# TikZ in Markdown for the SvelteKit course site

## Decision

Yes, Markdown can *carry* TikZ code, but Markdown does not execute TikZ by itself. A Markdown processor must recognize a custom fenced code block and hand its contents to a renderer.

For this repository, use a hybrid approach:

1. Authors write trusted TikZ in fenced `tikz` blocks.
2. The development-only editor renders those blocks in the browser with the maintained `@rod2ik/tikzjax` fork, preferably in a sandboxed preview frame and after a short debounce.
3. The production build converts the same blocks to content-hashed SVG files and pages display them with ordinary `<img>` elements.
4. Continue using JSXGraph instead of TikZ for diagrams that should be manipulated by students.

This provides immediate author feedback without putting a TeX installation in a Vercel Function, while production pages remain fast, cacheable, accessible, and independent of JavaScript/Wasm compilation.

## What “TikZ in Markdown” means

A sensible authoring form is a fenced block:

````markdown
```tikz
\begin{tikzpicture}
  \draw[->] (-1,0) -- (4,0) node[right] {$x$};
  \draw[->] (0,-1) -- (0,3) node[above] {$y$};
  \fill (3,2) circle (2pt) node[above right] {$(3,2)$};
\end{tikzpicture}
```
````

The fence is only a storage convention. The parser must transform a `code` node whose language is `tikz` into either:

- a Svelte `<TikzDiagram source={...} />` component for live preview; or
- an `<img src="/generated/tikz/<hash>.svg" ...>` element after build-time compilation.

This is a normal Markdown-extension pattern. The official remark documentation describes remark as a Markdown transformer with plugins, distinguishes remark plugins (Markdown) from rehype plugins (HTML), and lists plugins that select/transform code blocks. [remark plugin documentation](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)

MDsveX is another possible integration layer: its official repository describes it as “a Markdown preprocessor for Svelte.” It is not currently installed in this project, so adopting it would be a larger content-pipeline choice rather than a prerequisite for TikZ. [MDsveX repository](https://github.com/pngwn/MDsveX)

## Rendering approaches

### 1. Client-side TikZJax

TikZJax replaces `<script type="text/tikz">` elements with SVG. Its documented runtime compiles TeX to WebAssembly, loads a prebuilt LaTeX/TikZ core in the browser, executes the diagram, and converts the DVI result to SVG; no server compiler is involved. [TikZJax documentation](https://tikzjax.com/)

For a new integration, prefer the actively maintained [`@rod2ik/tikzjax` fork](https://github.com/rod2ik/tikzjax) over the historical v1 script. Its official documentation adds Web Workers, detection of dynamically inserted content, bounded worker pools, viewport-aware scheduling, duplicate-job suppression, timeouts/retries, IndexedDB SVG caching, light/dark adaptation, per-diagram preambles and libraries, and native fenced `tikzjax` support for MkDocs. SvelteKit still needs a small fence-to-component adapter, but the runtime is designed to notice content inserted during client-side navigation.

Advantages:

- Ideal for a development editor because changes can be previewed without saving or deploying.
- No TeX installation or Function execution on Vercel.
- A failed diagram affects the current browser, not the server.

Costs and limitations:

- The browser must fetch and initialize a TeX/Wasm runtime before the first render.
- Compilation consumes client CPU and battery, which matters on phones and lower-powered student devices.
- The documented format is a DOM `<script type="text/tikz">`, not a Markdown feature; Svelte must create and manage that boundary.
- The historical core preloads `standalone` and `tikz`; the maintained fork supports a finite documented set of optional packages plus per-diagram libraries and preambles. Lecture-specific macros are still not automatic. For example, `tex/lecture04.tex` uses a custom `\axes` macro, so it must be expanded, added to a controlled shared preamble, or replaced with ordinary TikZ/JSXGraph code.
- Rendering every diagram on every navigation or keystroke would produce avoidable work.

For a dev editor, initialize the renderer only in the browser, debounce edits, cancel or ignore stale results, and keep the worker pool small on mobile. Svelte's `onMount` is a suitable boundary because the official docs state that it does not run during server rendering. [Svelte lifecycle hooks](https://svelte.dev/docs/svelte/lifecycle-hooks)

A sandboxed iframe adds containment for editable source. If rendering inside the page, construct the inert TikZ element with DOM APIs and assign its `textContent`; do not concatenate source into raw HTML.

### 2. Build-time TeX to SVG

The native toolchain is well established: PGF/TikZ’s official manual documents SVG output by running LaTeX (preferably LuaLaTeX in DVI mode when its extra capabilities are needed) followed by `dvisvgm`. [PGF/TikZ manual, “Producing SVG Output”](https://mirrors.ctan.org/graphics/pgf/base/doc/pgfmanual.pdf)

`dvisvgm` converts TeX-generated DVI, EPS, and PDF to scalable SVG and supports fonts, colors, and several TeX “specials.” [dvisvgm project](https://dvisvgm.de/) and [CTAN package page](https://ctan.org/pkg/dvisvgm/)

Advantages:

- Highest compatibility with the existing lecture sources, shared macros, and installed packages.
- Production output is an ordinary static asset: fast, responsive, printable, and usable without client-side compilation.
- Compile errors appear during development or CI rather than in a student’s browser.
- Content-hashed SVGs can be cached indefinitely.

Costs:

- The build environment needs a pinned TeX distribution and `dvisvgm`.
- A full TeX installation increases build setup and cache size.
- The live editor still needs a preview renderer or a local compilation endpoint.

Prefer running this step locally or in a pinned CI/Docker build and committing or uploading the generated SVG assets. Do not assume that the stock Vercel build image contains the exact TeX packages used by the lectures.

### 3. On-demand server-side compilation

A SvelteKit endpoint could accept TikZ, execute TeX, return SVG, and cache it. This is the least suitable default here.

Vercel Functions have a 250 MB uncompressed bundle limit and a 4.5 MB request/response payload limit, and execution is metered and duration-limited. A TeX distribution plus packages and fonts competes directly with the bundle limit; cache misses also turn diagram rendering into user-visible server latency. [Vercel Function limits](https://vercel.com/docs/functions/limitations)

Vercel can cache shared Function responses using `s-maxage`, while hashed static assets can use a one-year immutable cache. [Vercel Cache-Control guidance](https://vercel.com/docs/caching/cache-control-headers)

Even with caching, arbitrary server-side TeX requires a real operating-system sandbox. A TeX Live maintainer notes that configuration such as `openin_any` is not sufficient for true protection against reading arbitrary files and explicitly recommends an OS-level sandbox. [TeX Live security discussion](https://tug.org/pipermail/tex-live/2025-December/051965.html)

Therefore, do not expose a general public “TikZ compiler” endpoint in this app. If server compilation ever becomes necessary, accept only authenticated/dev traffic, disable shell escape, impose strict source-size and time limits, give each job an isolated temporary filesystem with no secrets, deny outbound networking, sanitize the result, and cache by a versioned content hash.

## Security model

Treat course Markdown and TikZ as trusted author content. Do not allow students or anonymous visitors to publish arbitrary Markdown, HTML, or TikZ into production pages.

- Avoid passing arbitrary Markdown output to Svelte’s `{@html}`. The official Svelte documentation says never to render unsanitized content because it can cause XSS. [Svelte `{@html}` documentation](https://svelte.dev/docs/svelte/%40html)
- Prefer a structured Markdown AST that maps only known nodes to Svelte components. A TikZ fence should become a dedicated component, not general raw HTML.
- Prefer production SVG as an `<img>` resource instead of injecting SVG markup inline. If inline SVG is required for theming, sanitize it with a strict SVG allowlist and remove scripts, event handlers, external resources, and unsafe links.
- Self-host and pin the TikZJax script, Wasm/core, CSS, and fonts rather than depending on an unversioned third-party CDN at runtime. This also makes Content Security Policy and offline/dev behavior predictable.
- A WebAssembly-based renderer may require a CSP allowance such as `script-src 'wasm-unsafe-eval'`; MDN documents that this source expression permits WebAssembly compilation without granting the broader JavaScript `eval` permission. Keep `worker-src` limited to the self-hosted origin. [MDN CSP `script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)
- Cap source length and compilation time. Debounce editor input and prevent concurrent render floods.
- Include the renderer version, shared preamble version, and normalized TikZ source in the cache key. Otherwise a toolchain or macro change can incorrectly reuse stale SVG.
- The maintained fork is GPL-3.0 licensed. Before bundling or self-hosting it, preserve required notices and have the project owner confirm that the distribution obligations fit the project. [Maintained fork license/source](https://github.com/rod2ik/tikzjax)

## Performance and caching

For production:

- Compile each distinct diagram once.
- Name the output with a content hash, for example `tikz-<sha256>.svg`.
- Emit it as a static asset with `Cache-Control: public, max-age=31536000, immutable`.
- Keep width/height or a `viewBox` so layout does not jump while the SVG loads.
- Add an author-supplied caption and accessible alternative text outside the generated SVG.

For the development preview:

- Lazy-load TikZJax only when the editor contains a TikZ block.
- Debounce keystrokes (roughly 300–500 ms is a reasonable starting point).
- Render only the active/visible block and queue additional blocks.
- Cache the SVG result in memory, and optionally IndexedDB, by the versioned content hash.
- Show source/compiler errors beside the fence without replacing the last successful preview.

## Fit with this repository

The current project does not yet have a Markdown compiler. `scripts/generate-course-data.mjs` converts `tex/lecture01.tex` through `tex/lecture12.tex` into `src/lib/course-data.json`, and `MathText.svelte` renders that generated text with KaTeX. Therefore, “TikZ in Markdown” is not something the current runtime can consume automatically.

The smallest compatible evolution is:

1. Define a stable course-source schema that recognizes fenced `tikz` blocks (whether the source remains generated from TeX or moves to hand-maintained Markdown).
2. Preserve the raw source plus caption/alt text as a typed diagram node instead of flattening it into HTML.
3. Render that node with a dev-only TikZ preview component.
4. Add a build command that compiles each node to a hashed SVG and rewrites the production node to an image reference.

For Lecture 4, part 7 (“Coordinate System and Graph”), use JSXGraph as requested because those graphs should be interactive. TikZ remains useful for static set maps, machine diagrams, and decorative figures. `\includegraphics` should normally become a normal Markdown image that points at a checked-in asset; it should not be routed through TikZ.

## Recommendation in one sentence

Use fenced TikZ as an authoring format, the maintained `@rod2ik/tikzjax` runtime only for trusted live previews in the dev editor, and pinned native TeX + `dvisvgm` to generate content-hashed static SVGs for production; use JSXGraph wherever interaction is part of the lesson.

## Primary sources

- [TikZJax documentation](https://tikzjax.com/)
- [TikZJax source repository](https://github.com/artisticat1/tikzjax)
- [`@rod2ik/tikzjax` maintained fork and documentation](https://github.com/rod2ik/tikzjax)
- [PGF/TikZ manual](https://mirrors.ctan.org/graphics/pgf/base/doc/pgfmanual.pdf)
- [dvisvgm documentation](https://dvisvgm.de/)
- [CTAN: dvisvgm](https://ctan.org/pkg/dvisvgm/)
- [Svelte: `{@html}`](https://svelte.dev/docs/svelte/%40html)
- [Svelte lifecycle hooks](https://svelte.dev/docs/svelte/lifecycle-hooks)
- [MDsveX source repository](https://github.com/pngwn/MDsveX)
- [remark plugin documentation](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [Vercel Function limits](https://vercel.com/docs/functions/limitations)
- [Vercel Cache-Control headers](https://vercel.com/docs/caching/cache-control-headers)
- [TeX Live security discussion](https://tug.org/pipermail/tex-live/2025-December/051965.html)
- [MDN: CSP `script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)
