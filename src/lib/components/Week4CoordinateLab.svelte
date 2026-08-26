<script lang="ts">
  import { onMount } from 'svelte';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import Move from '@lucide/svelte/icons/move';

  let coordX = $state(3);
  let coordY = $state(2);
  let board: any = null;
  let pointP: any = null;
  let isDragging = false;

  const boardId = `w4-coord-board-${Math.random().toString(36).substring(2, 9)}`;

  let coordSlope = $derived(coordX !== 0 ? (coordY / coordX).toFixed(2) : 'Undefined');
  let coordDist = $derived(Math.sqrt(coordX * coordX + coordY * coordY).toFixed(2));
  let quadrant = $derived.by(() => {
    if (coordX > 0 && coordY > 0) return 'Quadrant I (+, +)';
    if (coordX < 0 && coordY > 0) return 'Quadrant II (−, +)';
    if (coordX < 0 && coordY < 0) return 'Quadrant III (−, −)';
    if (coordX > 0 && coordY < 0) return 'Quadrant IV (+, −)';
    if (coordX === 0 && coordY === 0) return 'Origin (0, 0)';
    if (coordX === 0) return 'Y-Axis';
    return 'X-Axis';
  });

  onMount(() => {
    const JXG = (window as any).JXG;
    if (!JXG) return;

    board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-7, 7, 7, -7],
      axis: true,
      grid: true,
      showCopyright: false,
      showNavigation: false,
      keepaspectratio: true,
      pan: { enabled: false },
      zoom: { wheel: false }
    });

    // Draggable point P
    pointP = board.create('point', [coordX, coordY], {
      name: 'P',
      size: 5,
      color: '#e64980',
      fillColor: '#e64980',
      strokeColor: '#fff',
      strokeWidth: 2,
      snapToGrid: false,
      showInfobox: false
    });

    // Projections: vertical to x-axis, horizontal to y-axis
    board.create('segment', [pointP, [() => pointP.X(), 0]], {
      dash: 2,
      strokeWidth: 2.5,
      strokeColor: '#4c6ef5',
      fixed: true,
      highlight: false
    });

    board.create('segment', [pointP, [0, () => pointP.Y()]], {
      dash: 2,
      strokeWidth: 2.5,
      strokeColor: '#15aabf',
      fixed: true,
      highlight: false
    });

    // Vector line from origin
    board.create('arrow', [[0, 0], pointP], {
      strokeColor: '#f59f00',
      strokeWidth: 2,
      dash: 1,
      fixed: true,
      highlight: false
    });

    // Dynamic text label next to point P
    board.create('text', [
      () => pointP.X() + 0.35,
      () => pointP.Y() + 0.45,
      () => `P(${pointP.X().toFixed(1)}, ${pointP.Y().toFixed(1)})`
    ], {
      fontSize: 14,
      color: '#e64980',
      fontWeight: 'bold'
    });

    // Sync drag to state
    pointP.on('drag', () => {
      isDragging = true;
      coordX = Number(pointP.X().toFixed(1));
      coordY = Number(pointP.Y().toFixed(1));
      isDragging = false;
    });

    return () => {
      if (board) {
        JXG.JSXGraph.freeBoard(board);
      }
    };
  });

  // Sync sliders to point position
  $effect(() => {
    if (!isDragging && pointP && board) {
      const JXG = (window as any).JXG;
      if (JXG) {
        pointP.setPosition(JXG.COORDS_BY_USER, [coordX, coordY]);
        board.update();
      }
    }
  });

  function setPreset(x: number, y: number) {
    coordX = x;
    coordY = y;
  }
</script>

<div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
  <!-- Controls Panel -->
  <div class="md:col-span-4 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Crosshair size={14} /> Coordinates Lab
        </span>
        <span class="badge badge-secondary badge-xs font-mono font-bold">JSXGraph</span>
      </div>

      <!-- Sliders -->
      <div class="space-y-3 bg-base-100 p-3.5 rounded-2xl border border-base-300">
        <div>
          <div class="flex justify-between text-xs font-bold mb-1">
            <span class="text-blue-600 dark:text-blue-400">X Coordinate (Horizontal)</span>
            <span class="font-mono font-black text-blue-600 dark:text-blue-400">{coordX}</span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.5"
            bind:value={coordX}
            class="range range-xs range-primary"
          />
          <div class="flex justify-between text-[10px] text-base-content/40 font-mono px-0.5 mt-0.5">
            <span>-6</span>
            <span>0</span>
            <span>+6</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs font-bold mb-1">
            <span class="text-cyan-600 dark:text-cyan-400">Y Coordinate (Vertical)</span>
            <span class="font-mono font-black text-cyan-600 dark:text-cyan-400">{coordY}</span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.5"
            bind:value={coordY}
            class="range range-xs range-secondary"
          />
          <div class="flex justify-between text-[10px] text-base-content/40 font-mono px-0.5 mt-0.5">
            <span>-6</span>
            <span>0</span>
            <span>+6</span>
          </div>
        </div>
      </div>

      <!-- Quick Presets -->
      <div>
        <span class="text-[11px] font-bold text-base-content/60 block mb-1.5 uppercase">Quick Positions:</span>
        <div class="grid grid-cols-3 gap-1.5">
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(3, 2)}>(3, 2)</button>
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(-4, 3)}>(-4, 3)</button>
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(-3, -4)}>(-3, -4)</button>
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(5, -2)}>(5, -2)</button>
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(0, 4)}>(0, 4)</button>
          <button class="btn btn-xs btn-outline" onclick={() => setPreset(0, 0)}>(0, 0)</button>
        </div>
      </div>

      <!-- Geometric Properties -->
      <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1.5 font-mono">
        <div class="flex justify-between">
          <span class="text-base-content/70">Location:</span>
          <span class="font-bold text-secondary">{quadrant}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content/70">Distance:</span>
          <span class="font-bold text-amber-600 dark:text-amber-400">r = {coordDist}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content/70">Slope (y/x):</span>
          <span class="font-bold text-primary">{coordSlope}</span>
        </div>
      </div>
    </div>

    <div class="text-[11px] text-base-content/60 flex items-center gap-1 mt-2">
      <Move size={12} class="text-primary shrink-0" />
      <span>Drag point <strong>P</strong> directly or use the sliders above.</span>
    </div>
  </div>

  <!-- JSXGraph Visualization Board -->
  <div class="md:col-span-8 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-3 shadow-inner min-h-[380px]">
    <div class="flex items-center justify-between px-2 pb-1 border-b border-base-200 text-xs">
      <span class="font-bold text-base-content/70">2D Cartesian Coordinate System</span>
      <span class="font-mono font-black text-primary text-sm">P({coordX}, {coordY})</span>
    </div>

    <div class="flex-1 w-full relative min-h-[320px] my-1 rounded-xl overflow-hidden border border-base-200">
      <div id={boardId} class="jxgbox !w-full !h-full rounded-xl"></div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 border-t border-base-200 text-[11px] text-base-content/70">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-0.5 bg-blue-500 inline-block border-t border-dashed"></span>
        <span>Blue dashed: <strong>x-projection ({coordX})</strong></span>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-0.5 bg-cyan-500 inline-block border-t border-dashed"></span>
        <span>Cyan dashed: <strong>y-projection ({coordY})</strong></span>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-0.5 bg-amber-500 inline-block border-t"></span>
        <span>Amber: <strong>Radius vector</strong></span>
      </span>
    </div>
  </div>
</div>
