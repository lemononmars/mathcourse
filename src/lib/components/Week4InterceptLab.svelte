<script lang="ts">
  import { onMount } from 'svelte';
  import Swords from '@lucide/svelte/icons/swords';
  import Sparkles from '@lucide/svelte/icons/sparkles';

  let m1 = $state(2);
  let b1 = $state(0);
  let m2 = $state(-1);
  let b2 = $state(6);

  let board: any = null;
  const boardId = `w4-intercept-board-${Math.random().toString(36).substring(2, 9)}`;

  let interceptData = $derived.by(() => {
    const denom = m1 - m2;
    if (Math.abs(denom) < 0.0001) {
      return {
        hasIntercept: false,
        x: null,
        y: null,
        status: b1 === b2 ? 'Coincident (Infinite Intercepts)' : 'Parallel Lines (No Intercept)',
        xFormula: 'Undefined (m₁ = m₂)',
        yFormula: 'None'
      };
    }
    const xVal = (b2 - b1) / denom;
    const yVal = m1 * xVal + b1;
    return {
      hasIntercept: true,
      x: Number(xVal.toFixed(2)),
      y: Number(yVal.toFixed(2)),
      status: `Intercept at (${xVal.toFixed(2)}, ${yVal.toFixed(2)})`,
      xFormula: `(${b2} - ${b1}) / (${m1} - (${m2})) = ${(b2 - b1).toFixed(1)} / ${(m1 - m2).toFixed(1)}`,
      yFormula: `${m1}(${xVal.toFixed(2)}) + (${b1}) = ${yVal.toFixed(2)}`
    };
  });

  onMount(() => {
    const JXG = (window as any).JXG;
    if (!JXG) return;

    board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-4, 12, 12, -4],
      axis: true,
      grid: true,
      showCopyright: false,
      showNavigation: false,
      keepaspectratio: true,
      pan: { enabled: false },
      zoom: { wheel: false }
    });

    // Line 1: f(x) = m1*x + b1
    board.create('functiongraph', [(x: number) => m1 * x + b1, -10, 20], {
      strokeColor: '#7950f2',
      strokeWidth: 3.5,
      highlight: false
    });

    // Line 2: g(x) = m2*x + b2
    board.create('functiongraph', [(x: number) => m2 * x + b2, -10, 20], {
      strokeColor: '#e64980',
      strokeWidth: 3.5,
      highlight: false
    });

    // Intercept Point
    const intPoint = board.create('point', [
      () => {
        const denom = m1 - m2;
        return Math.abs(denom) > 0.0001 ? (b2 - b1) / denom : 9999;
      },
      () => {
        const denom = m1 - m2;
        if (Math.abs(denom) <= 0.0001) return 9999;
        const x = (b2 - b1) / denom;
        return m1 * x + b1;
      }
    ], {
      name: 'Collision',
      size: 5,
      color: '#f59f00',
      fillColor: '#f59f00',
      strokeColor: '#fff',
      strokeWidth: 2,
      fixed: true,
      visible: () => Math.abs(m1 - m2) > 0.0001
    });

    // Vertical dashed projection to x-axis
    board.create('segment', [
      intPoint,
      [() => intPoint.X(), 0]
    ], {
      dash: 2,
      strokeWidth: 2,
      strokeColor: '#f59f00',
      fixed: true,
      highlight: false,
      visible: () => Math.abs(m1 - m2) > 0.0001
    });

    // Horizontal dashed projection to y-axis
    board.create('segment', [
      intPoint,
      [0, () => intPoint.Y()]
    ], {
      dash: 2,
      strokeWidth: 2,
      strokeColor: '#f59f00',
      fixed: true,
      highlight: false,
      visible: () => Math.abs(m1 - m2) > 0.0001
    });

    // Dynamic text on board
    board.create('text', [
      () => intPoint.X() + 0.35,
      () => intPoint.Y() + 0.45,
      () => `(${intPoint.X().toFixed(1)}, ${intPoint.Y().toFixed(1)})`
    ], {
      fontSize: 13,
      color: '#f59f00',
      fontWeight: 'bold',
      visible: () => Math.abs(m1 - m2) > 0.0001
    });

    return () => {
      if (board) {
        JXG.JSXGraph.freeBoard(board);
      }
    };
  });

  $effect(() => {
    m1; b1; m2; b2;
    board?.update();
  });

  function setPreset(newM1: number, newB1: number, newM2: number, newB2: number) {
    m1 = newM1;
    b1 = newB1;
    m2 = newM2;
    b2 = newB2;
  }
</script>

<div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
  <!-- Controls Panel -->
  <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Swords size={14} /> Intercept & Collision Lab
        </span>
        <span class="badge badge-secondary badge-xs font-mono font-bold">JSXGraph</span>
      </div>

      <!-- Line 1 Controls -->
      <div class="p-3 bg-base-100 rounded-xl border-2 border-purple-500/30 space-y-2">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-purple-600 dark:text-purple-400">Function 1: f(x) = {m1}x + ({b1})</span>
          <span class="badge badge-xs bg-purple-500 text-white font-mono">Line 1</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <div class="flex justify-between text-[11px] font-bold">
              <span>Slope m₁</span>
              <span class="font-mono">{m1}</span>
            </div>
            <input type="range" min="-4" max="5" step="0.5" bind:value={m1} class="range range-xs range-primary" />
          </div>
          <div>
            <div class="flex justify-between text-[11px] font-bold">
              <span>Intercept b₁</span>
              <span class="font-mono">{b1}</span>
            </div>
            <input type="range" min="-4" max="8" step="1" bind:value={b1} class="range range-xs range-primary" />
          </div>
        </div>
      </div>

      <!-- Line 2 Controls -->
      <div class="p-3 bg-base-100 rounded-xl border-2 border-pink-500/30 space-y-2">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-pink-600 dark:text-pink-400">Function 2: g(x) = {m2}x + ({b2})</span>
          <span class="badge badge-xs bg-pink-500 text-white font-mono">Line 2</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <div class="flex justify-between text-[11px] font-bold">
              <span>Slope m₂</span>
              <span class="font-mono">{m2}</span>
            </div>
            <input type="range" min="-4" max="5" step="0.5" bind:value={m2} class="range range-xs range-secondary" />
          </div>
          <div>
            <div class="flex justify-between text-[11px] font-bold">
              <span>Intercept b₂</span>
              <span class="font-mono">{b2}</span>
            </div>
            <input type="range" min="-4" max="8" step="1" bind:value={b2} class="range range-xs range-secondary" />
          </div>
        </div>
      </div>

      <!-- Scenarios Presets -->
      <div>
        <span class="text-[11px] font-bold text-base-content/60 block mb-1.5 uppercase">Game Presets:</span>
        <div class="grid grid-cols-2 gap-1.5">
          <button class="btn btn-xs btn-outline font-bold" onclick={() => setPreset(2, 0, -1, 6)}>Opposing Motion</button>
          <button class="btn btn-xs btn-outline font-bold" onclick={() => setPreset(3, 0, 1, 4)}>Chasing Lead</button>
          <button class="btn btn-xs btn-outline font-bold" onclick={() => setPreset(2.5, 0, 0, 8)}>Fixed Wall Goal</button>
          <button class="btn btn-xs btn-outline font-bold" onclick={() => setPreset(2, 2, 2, -2)}>Parallel Paths</button>
        </div>
      </div>

      <!-- Math Breakdown Box -->
      <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1 font-mono">
        <p class="font-bold text-base-content/80 text-[11px] uppercase">Algebraic Solution:</p>
        <p class="text-base-content/70">Solve: m₁x + b₁ = m₂x + b₂</p>
        {#if interceptData.hasIntercept}
          <p class="text-primary font-bold">x = (b₂ - b₁) / (m₁ - m₂) = {interceptData.x}</p>
          <p class="text-secondary font-bold">y = f({interceptData.x}) = {interceptData.y}</p>
        {:else}
          <p class="text-warning font-bold">{interceptData.status}</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Board Visualizer -->
  <div class="md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-3 shadow-inner min-h-[380px]">
    <div class="flex items-center justify-between px-2 pb-1 border-b border-base-200 text-xs">
      <span class="font-bold text-base-content/70">Graph Intersection & Intercept</span>
      {#if interceptData.hasIntercept}
        <span class="badge badge-warning font-mono font-black text-xs gap-1">
          <Sparkles size={11} /> ({interceptData.x}, {interceptData.y})
        </span>
      {:else}
        <span class="badge badge-ghost font-mono text-xs">{interceptData.status}</span>
      {/if}
    </div>

    <div class="flex-1 w-full relative min-h-[320px] my-1 rounded-xl overflow-hidden border border-base-200">
      <div id={boardId} class="jxgbox !w-full !h-full rounded-xl"></div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 border-t border-base-200 text-[11px] text-base-content/70">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-1 bg-purple-500 inline-block rounded"></span>
        <span>Line 1: <strong>f(x) = {m1}x + {b1}</strong></span>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-1 bg-pink-500 inline-block rounded"></span>
        <span>Line 2: <strong>g(x) = {m2}x + {b2}</strong></span>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
        <span>Gold: <strong>Intercept ({interceptData.hasIntercept ? `${interceptData.x}, ${interceptData.y}` : 'None'})</strong></span>
      </span>
    </div>
  </div>
</div>
