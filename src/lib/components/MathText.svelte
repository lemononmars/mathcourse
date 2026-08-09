<script lang="ts">
  import katex from 'katex';
  let { content }: { content: string } = $props();
  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
  const inline = (value: string) => value.split(/(\$[^$\n]+\$)/g).map((part) => part.startsWith('$') && part.endsWith('$') ? katex.renderToString(part.slice(1, -1), { throwOnError: false }) : escape(part)).join('');
  function render(value: string) {
    return value.split(/(\\\[[\s\S]*?\\\]|\\begin\{(?:align\*?|equation\*?|eqnarray\*?|split|array)\}[\s\S]*?\\end\{(?:align\*?|equation\*?|eqnarray\*?|split|array)\})/g).map((segment) => {
      const block = segment.match(/^\\\[([\s\S]*)\\\]$/) || segment.match(/^\\begin\{[^}]+\}([\s\S]*)\\end\{[^}]+\}$/);
      if (block) return `<div class="math-scroll">${katex.renderToString(block[1], { throwOnError: false, displayMode: true })}</div>`;
      return segment.split(/\n+/).map((line) => line.trim()).filter((line) => line && line !== '{}' && !line.startsWith('[Interactive diagram')).map((line) => line.startsWith('- ') ? `<div class="lesson-bullet"><span></span>${inline(line.slice(2))}</div>` : `<p>${inline(line)}</p>`).join('');
    }).join('');
  }
</script>

<div class="lesson-copy">{@html render(content)}</div>
