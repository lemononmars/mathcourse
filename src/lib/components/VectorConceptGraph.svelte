<script lang="ts">
  import { onMount } from 'svelte';
  let { section }: { section: 'vector' | 'non-origin' | 'operation' } = $props();
  let board: any;

  onMount(() => {
    const JXG = window.JXG;
    if (!JXG) return;
    board = JXG.JSXGraph.initBoard(`vector-${section}-board`, { boundingbox: [-7, 7, 7, -7], axis: true, grid: true, keepaspectratio: true, showCopyright: false, showNavigation: false });

    if (section === 'vector') {
      const tip = board.create('point', [4, 3], { name: 'drag v', size: 5, color: '#e64980', snapToGrid: true });
      board.create('arrow', [[0, 0], [() => tip.X(), () => tip.Y()]], { strokeColor: '#4c6ef5', strokeWidth: 5 });
      board.create('segment', [[() => tip.X(), 0], [() => tip.X(), () => tip.Y()]], { dash: 2, strokeColor: '#ff6b6b', strokeWidth: 3 });
      board.create('segment', [[0, 0], [() => tip.X(), 0]], { dash: 2, strokeColor: '#f3c623', strokeWidth: 3 });
      board.create('text', [() => tip.X() / 2, -.55, () => `x = ${tip.X().toFixed(1)}`], { color: '#a47700', fontSize: 15 });
      board.create('text', [() => tip.X() + .25, () => tip.Y() / 2, () => `y = ${tip.Y().toFixed(1)}`], { color: '#c92a2a', fontSize: 15 });
    } else if (section === 'non-origin') {
      const start = board.create('point', [-3, -2], { name: 'A', size: 5, color: '#e64980', snapToGrid: true });
      const end = board.create('point', [2, 3], { name: 'B', size: 5, color: '#7950f2', snapToGrid: true });
      board.create('arrow', [start, end], { strokeColor: '#4c6ef5', strokeWidth: 5 });
      board.create('arrow', [[0, 0], [() => end.X() - start.X(), () => end.Y() - start.Y()]], { strokeColor: '#15aabf', strokeWidth: 4, dash: 2 });
      board.create('text', [-6.5, 6.2, () => `B − A = ⟨${(end.X() - start.X()).toFixed(1)}, ${(end.Y() - start.Y()).toFixed(1)}⟩`], { fontSize: 17, color: '#15aabf' });
    } else {
      const u = board.create('point', [4, 1], { name: 'u', size: 5, color: '#e64980', snapToGrid: true });
      const v = board.create('point', [1, 4], { name: 'v', size: 5, color: '#7950f2', snapToGrid: true });
      board.create('arrow', [[0, 0], u], { strokeColor: '#e64980', strokeWidth: 4 });
      board.create('arrow', [[0, 0], v], { strokeColor: '#7950f2', strokeWidth: 4 });
      board.create('arrow', [[0, 0], [() => u.X() + v.X(), () => u.Y() + v.Y()]], { strokeColor: '#15aabf', strokeWidth: 5 });
      board.create('segment', [u, [() => u.X() + v.X(), () => u.Y() + v.Y()]], { dash: 2, strokeColor: '#7950f2', strokeWidth: 2 });
      board.create('segment', [v, [() => u.X() + v.X(), () => u.Y() + v.Y()]], { dash: 2, strokeColor: '#e64980', strokeWidth: 2 });
      board.create('text', [-6.5, 6.2, () => `u + v = ⟨${(u.X() + v.X()).toFixed(1)}, ${(u.Y() + v.Y()).toFixed(1)}⟩`], { fontSize: 17, color: '#087f5b' });
    }
    return () => { if (board) JXG.JSXGraph.freeBoard(board); };
  });
</script>

<section class="interactive-card">
  <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
    <div><span class="eyebrow">Interactive vector lab</span><h3 class="text-2xl font-extrabold">{section === 'vector' ? 'A vector has direction and components' : section === 'non-origin' ? 'A vector can start anywhere' : 'Add vectors with the parallelogram rule'}</h3><p class="mt-1 text-sm text-base-content/60">Drag the labeled points and watch the geometric and numerical descriptions update together.</p></div><span class="badge badge-secondary">JSXGraph</span>
  </div>
  <div id={`vector-${section}-board`} class="jxgbox !h-[min(70vh,620px)] !w-full rounded-2xl border-0"></div>
</section>
