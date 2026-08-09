<script lang="ts">
  import katex from 'katex';

  let { content, suppressDiagrams = false, numberingPrefix = '' }: { content: string; suppressDiagrams?: boolean; numberingPrefix?: string } = $props();

  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
  const slug = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
  const labels: Record<string, string> = {
    theorem: 'Theorem', property: 'Property', exercise: 'Try it', slide: 'Lecture note',
    note: 'Note', definition: 'Definition', example: 'Example', solution: 'Solution',
    remark: 'Remark', proof: 'Proof', figure: 'Source figure', figureimg: 'Figure', tikzsvg: 'Diagram', youtube: 'Video'
  };
  type Counters = { example: number; theorem: number; figure: number };
  const numbered = (kind: keyof Counters, counters: Counters) => `${numberingPrefix ? `${numberingPrefix}.` : ''}${++counters[kind]}`;

  function plainInline(value: string) {
    return escape(value)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a class="link link-primary" href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function inline(value: string) {
    return value.split(/(\$[^$\n]+\$)/g).map((part) =>
      part.startsWith('$') && part.endsWith('$')
        ? katex.renderToString(part.slice(1, -1), { throwOnError: false })
        : plainInline(part)
    ).join('');
  }

  function math(value: string) {
    const cleaned = value.replace(/^\\\[|\\\]$/g, '').replace(/^\\begin\{[^}]+\}|\\end\{[^}]+\}$/g, '');
    return `<div class="math-scroll">${katex.renderToString(cleaned, { throwOnError: false, displayMode: true })}</div>`;
  }

  function wrapDirective(type: string, detail: string, body: string, counters: Counters) {
    if (type === 'tikz') return '';
    if ((type === 'tikz' || type === 'tikzsvg' || type === 'figure' || type === 'figureimg') && suppressDiagrams) return '';
    const title = type === 'example' ? `Example ${numbered('example', counters)}` : type === 'theorem' ? `Theorem ${numbered('theorem', counters)}` : type === 'figure' ? `Figure ${numbered('figure', counters)}` : labels[type] ?? type;
    if (type === 'solution') return `<div class="collapse collapse-arrow tex-box tex-solution"><input type="checkbox"/><div class="collapse-title tex-box-title">${title}</div><div class="collapse-content tex-box-body">${body}</div></div>`;
    if (type === 'tikzsvg') {
      const [url, caption = 'TikZ diagram'] = detail.split('|').map((part) => part.trim());
      return `<figure class="tikz-static"><img src="${escape(url)}" alt="${escape(caption)}" loading="lazy" decoding="async"/><figcaption><strong>Figure ${numbered('figure', counters)}</strong> — ${inline(caption)}</figcaption></figure>`;
    }
    if (type === 'figureimg') {
      const [url, caption = 'Lecture figure'] = detail.split('|').map((part) => part.trim());
      return `<figure class="lecture-figure"><img src="${escape(url)}" alt="${escape(caption)}" loading="lazy" decoding="async"/><figcaption><strong>Figure ${numbered('figure', counters)}</strong> — ${inline(caption)}</figcaption></figure>`;
    }
    if (type === 'youtube') {
      const [id, caption = 'Video lesson'] = detail.split('|').map((part) => part.trim());
      return `<figure class="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/${escape(id)}" title="${escape(caption)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><figcaption>${inline(caption)}</figcaption></figure>`;
    }
    if (type === 'figure') {
      return `<aside class="tex-box tex-${type}"><div class="tex-box-title">${title}</div><div class="tex-box-body"><p>${inline(detail || 'Illustration from the original lecture.')}</p>${body}</div></aside>`;
    }
    return `<aside class="tex-box tex-${type}"><div class="tex-box-title">${title}${detail ? ` · ${inline(detail)}` : ''}</div><div class="tex-box-body">${body}</div></aside>`;
  }

  function renderLines(lines: string[], counters: Counters, start = 0, nested = false): { html: string; next: number } {
    const output: string[] = [];
    let index = start;
    while (index < lines.length) {
      const raw = lines[index];
      const line = raw.trim();
      if (line === ':::') return { html: output.join(''), next: index + 1 };
      const directive = line.match(/^:::(\w+)(?:\s+(.+))?$/);
      if (directive) {
        const inner = renderLines(lines, counters, index + 1, true);
        output.push(wrapDirective(directive[1].toLowerCase(), directive[2] ?? '', inner.html, counters));
        index = inner.next;
        continue;
      }
      if (line.startsWith('\\[')) {
        const block = [raw];
        while (!block.at(-1)?.includes('\\]') && ++index < lines.length) block.push(lines[index]);
        output.push(math(block.join('\n')));
      } else {
        const environment = line.match(/^\\begin\{([^}]+)\}/);
        if (environment) {
          const block = [raw];
          while (!block.at(-1)?.includes(`\\end{${environment[1]}}`) && ++index < lines.length) block.push(lines[index]);
          output.push(math(block.join('\n')));
        } else if (line.startsWith('|') && /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[index + 1]?.trim() ?? '')) {
          const tableLines = [line];
          index += 2;
          while (index < lines.length && lines[index].trim().startsWith('|')) tableLines.push(lines[index++].trim());
          const cells = (row: string) => row.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, '|'));
          const header = cells(tableLines[0]);
          const bodyRows = tableLines.slice(1).map(cells);
          output.push(`<div class="lesson-table-wrap"><table class="lesson-table"><thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
          continue;
        } else if (/^##\s+/.test(line)) {
          const title = line.replace(/^##\s+/, '');
          const id = slug(title);
          output.push(`<h2 class="frame-title" id="${id}">${inline(title)}<a class="heading-anchor" href="#${id}" aria-label="Link to ${escape(title)}">#</a></h2>`);
        } else if (/^-\s+/.test(line)) {
          output.push(`<div class="lesson-bullet"><span></span>${inline(line.replace(/^-\s+/, ''))}</div>`);
        } else if (line && line !== '{}') {
          output.push(`<p>${inline(line)}</p>`);
        }
      }
      index += 1;
    }
    return { html: output.join(''), next: index };
  }

  function render(value: string) {
    return renderLines(value.replace(/^---[\s\S]*?---\s*/, '').split(/\r?\n/), { example: 0, theorem: 0, figure: 0 }).html;
  }
</script>

<div class="lesson-copy">{@html render(content)}</div>
