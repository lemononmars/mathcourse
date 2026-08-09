<script lang="ts">
  import { onMount } from 'svelte';
  let pointBoard: any, functionBoard: any;
  let slope = $state(1), intercept = $state(0);

  onMount(() => {
    const JXG = window.JXG;
    if (!JXG) return;
    pointBoard = JXG.JSXGraph.initBoard('coordinate-point-board', { boundingbox: [-6,6,6,-6], axis: true, grid: true, showCopyright: false, showNavigation: false, keepaspectratio: true });
    const point = pointBoard.create('point', [3,2], { name: 'P', size: 5, color: '#e64980', snapToGrid: true, snapSizeX: .5, snapSizeY: .5 });
    pointBoard.create('segment', [[() => point.X(), 0], point], { dash: 2, strokeWidth: 3, strokeColor: '#4c6ef5', fixed: true });
    pointBoard.create('segment', [[0, () => point.Y()], point], { dash: 2, strokeWidth: 3, strokeColor: '#15aabf', fixed: true });
    pointBoard.create('text', [() => point.X() + .25, () => point.Y() + .4, () => `(${point.X().toFixed(1)}, ${point.Y().toFixed(1)})`], { fontSize: 16, color: '#e64980' });

    functionBoard = JXG.JSXGraph.initBoard('coordinate-function-board', { boundingbox: [-6,8,6,-6], axis: true, grid: true, showCopyright: false, showNavigation: false });
    functionBoard.create('functiongraph', [(x: number) => slope*x+intercept, -6, 6], { strokeColor: '#7950f2', strokeWidth: 4 });
    functionBoard.create('point', [0, () => intercept], { name: 'y-intercept', color: '#e64980', size: 4, fixed: true });
    functionBoard.create('segment', [[0, () => intercept], [1, () => intercept]], { strokeColor: '#f49f38', strokeWidth: 3, fixed: true });
    functionBoard.create('segment', [[1, () => intercept], [1, () => slope+intercept]], { strokeColor: '#f49f38', strokeWidth: 3, fixed: true });
    return () => { if (pointBoard) JXG.JSXGraph.freeBoard(pointBoard); if (functionBoard) JXG.JSXGraph.freeBoard(functionBoard); };
  });
  $effect(() => { slope; intercept; functionBoard?.update(); });
</script>

<section class="interactive-card">
  <div class="mb-4 flex flex-wrap items-start justify-between gap-3"><div><span class="eyebrow">Interactive coordinate lab</span><h3 class="text-2xl font-extrabold">Coordinates are addresses</h3><p class="mt-1 text-sm text-base-content/60">Drag P. The colored projections show how its x and y coordinates are read.</p></div><span class="badge badge-secondary">JSXGraph</span></div>
  <div id="coordinate-point-board" class="jxgbox !h-[360px] !w-full rounded-2xl border-0"></div>
</section>

<section class="interactive-card">
  <div class="mb-4"><span class="eyebrow">Graph a function</span><h3 class="text-2xl font-extrabold">Explore y = mx + b</h3><p class="mt-1 text-sm text-base-content/60">The orange triangle visualizes a run of 1 and a rise of m.</p></div>
  <div id="coordinate-function-board" class="jxgbox !h-[360px] !w-full rounded-2xl border-0"></div>
  <div class="mt-5 grid gap-4 sm:grid-cols-2"><label class="text-sm font-bold">Slope m = {slope}<input class="range range-primary range-sm mt-2" type="range" min="-4" max="4" step=".25" bind:value={slope}/></label><label class="text-sm font-bold">Intercept b = {intercept}<input class="range range-secondary range-sm mt-2" type="range" min="-4" max="4" step=".25" bind:value={intercept}/></label></div>
</section>
