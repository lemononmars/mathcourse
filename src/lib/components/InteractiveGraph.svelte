<script lang="ts">
  import { onMount } from 'svelte';
  let { week }: { week: number } = $props();
  let value = $state(1);
  let board: any;
  onMount(() => {
    const JXG = window.JXG;
    if (!JXG) return;
    board = JXG.JSXGraph.initBoard('jxg-board', { boundingbox: [-6,6,6,-6], axis: true, showCopyright: false, showNavigation: false, pan: { enabled: true }, zoom: { wheel: true } });
    if (week === 6) {
      board.create('functiongraph', [(x: number) => Math.sin(x), -6, 6], { strokeColor: '#7950f2', strokeWidth: 4 });
      const p = board.create('glider', [1,0,board.defaultAxes.x], { color: '#ff6b6b', size: 5 });
      board.create('point', [() => p.X(), () => Math.sin(p.X())], { color: '#ff6b6b', size: 5, name: 'sin(x)' });
    } else if (week >= 7 && week <= 8) {
      const p = board.create('point', [2,2], { color: '#ff6b6b', name: 'drag me', size: 5 });
      board.create('arrow', [[0,0],[() => p.X(), () => p.Y()]], { strokeColor: '#15aabf', strokeWidth: 4 });
      board.create('point', [() => -p.Y(), () => p.X()], { color: '#7950f2', name: 'rotated', size: 5 });
    } else board.create('functiongraph', [(x: number) => value * x * x / 4 - 2, -5, 5], { strokeColor: '#4c6ef5', strokeWidth: 4 });
    return () => { if (board) JXG.JSXGraph.freeBoard(board); };
  });
  $effect(() => { value; board?.update(); });
</script>

<div class="interactive-card">
  <div class="mb-3 flex items-center justify-between"><div><span class="eyebrow">Interactive lab</span><h3 class="text-xl font-extrabold">Drag, zoom, discover</h3></div><span class="badge badge-secondary">JSXGraph</span></div>
  <div id="jxg-board" class="jxgbox !h-[300px] !w-full rounded-2xl border-0"></div>
  {#if week >= 3 && week <= 5}<label class="mt-4 flex items-center gap-3 text-sm font-semibold">Shape <input class="range range-primary range-sm" type="range" min="-2" max="2" step=".1" bind:value/><span class="w-9">{value}</span></label>{/if}
</div>
