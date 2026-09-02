<script lang="ts">
  import Grid from '@lucide/svelte/icons/grid';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Layers from '@lucide/svelte/icons/layers';
  import Maximize2 from '@lucide/svelte/icons/maximize-2';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import FlipHorizontal from '@lucide/svelte/icons/flip-horizontal';
  import Scaling from '@lucide/svelte/icons/scaling';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';

  type TabType = 'multiplier' | 'basis_grid' | 'gallery' | 'composition' | 'determinant';
  let activeTab = $state<TabType>('basis_grid');

  // ==========================================
  // SHARED MATRIX STATE [a, b; c, d]
  // ==========================================
  let matA = $state(1);
  let matB = $state(0);
  let matC = $state(0);
  let matD = $state(1);

  // Vector v = [x; y]
  let vecX = $state(2);
  let vecY = $state(1);

  // Transformed vector v' = M * v
  let resX = $derived(matA * vecX + matB * vecY);
  let resY = $derived(matC * vecX + matD * vecY);

  // Determinant & Area
  let det = $derived(matA * matD - matB * matC);
  let detAbs = $derived(Math.abs(det).toFixed(2));

  // ==========================================
  // TAB 1: SVG MULTIPLIER COORDS
  // ==========================================
  let svgVecX = $derived(120 + vecX * 20);
  let svgVecY = $derived(120 - vecY * 20);
  let svgResX = $derived(120 + resX * 20);
  let svgResY = $derived(120 - resY * 20);

  // ==========================================
  // TAB 2: BASIS VECTORS i-hat & j-hat
  // i-hat = [1, 0] -> lands at [matA, matC]
  // j-hat = [0, 1] -> lands at [matB, matD]
  // ==========================================
  let svgIhatX = $derived(120 + matA * 30);
  let svgIhatY = $derived(120 - matC * 30);
  let svgJhatX = $derived(120 + matB * 30);
  let svgJhatY = $derived(120 - matD * 30);
  let svgParallTopX = $derived(120 + (matA + matB) * 30);
  let svgParallTopY = $derived(120 - (matC + matD) * 30);

  let basisParallPoints = $derived(
    `120,120 ${svgIhatX},${svgIhatY} ${svgParallTopX},${svgParallTopY} ${svgJhatX},${svgJhatY}`
  );

  // ==========================================
  // TAB 3: GALLERY PRESETS
  // ==========================================
  let galleryPreset = $state<'rotate' | 'scale' | 'reflect' | 'shear'>('rotate');
  let rotAngleDeg = $state(45);
  let rotAngleRad = $derived((rotAngleDeg * Math.PI) / 180);

  let scaleSx = $state(1.5);
  let scaleSy = $state(1.0);
  let shearK = $state(1.0);

  let galleryA = $derived.by(() => {
    if (galleryPreset === 'rotate') return Number(Math.cos(rotAngleRad).toFixed(2));
    if (galleryPreset === 'scale') return scaleSx;
    if (galleryPreset === 'reflect') return 1;
    if (galleryPreset === 'shear') return 1;
    return 1;
  });

  let galleryB = $derived.by(() => {
    if (galleryPreset === 'rotate') return Number((-Math.sin(rotAngleRad)).toFixed(2));
    if (galleryPreset === 'scale') return 0;
    if (galleryPreset === 'reflect') return 0;
    if (galleryPreset === 'shear') return shearK;
    return 0;
  });

  let galleryC = $derived.by(() => {
    if (galleryPreset === 'rotate') return Number(Math.sin(rotAngleRad).toFixed(2));
    if (galleryPreset === 'scale') return 0;
    if (galleryPreset === 'reflect') return 0;
    if (galleryPreset === 'shear') return 0;
    return 0;
  });

  let galleryD = $derived.by(() => {
    if (galleryPreset === 'rotate') return Number(Math.cos(rotAngleRad).toFixed(2));
    if (galleryPreset === 'scale') return scaleSy;
    if (galleryPreset === 'reflect') return -1; // Reflect across X-axis
    if (galleryPreset === 'shear') return 1;
    return 1;
  });

  // Game Sprite (Spaceship) Vertices in object space:
  // Tip: (0, 1.8), Right Wing: (1.2, -1.2), Center Thruster: (0, -0.6), Left Wing: (-1.2, -1.2)
  function transformPt(px: number, py: number, a: number, b: number, c: number, d: number) {
    const tx = a * px + b * py;
    const ty = c * px + d * py;
    return `${120 + tx * 26},${120 - ty * 26}`;
  }

  let originalShipPoints = $derived(
    `${transformPt(0, 1.8, 1, 0, 0, 1)} ${transformPt(1.2, -1.2, 1, 0, 0, 1)} ${transformPt(0, -0.6, 1, 0, 0, 1)} ${transformPt(-1.2, -1.2, 1, 0, 0, 1)}`
  );

  let transformedShipPoints = $derived(
    `${transformPt(0, 1.8, galleryA, galleryB, galleryC, galleryD)} ${transformPt(1.2, -1.2, galleryA, galleryB, galleryC, galleryD)} ${transformPt(0, -0.6, galleryA, galleryB, galleryC, galleryD)} ${transformPt(-1.2, -1.2, galleryA, galleryB, galleryC, galleryD)}`
  );

  // ==========================================
  // TAB 4: COMPOSITION (M2 * M1 != M1 * M2)
  // M1 = Rotate 90 deg = [0, -1; 1, 0]
  // M2 = Scale X by 2 = [2, 0; 0, 1]
  // ==========================================
  let compOrder = $state<'M2_then_M1' | 'M1_then_M2'>('M2_then_M1');

  // M1: 90 deg rotation
  const m1A = 0, m1B = -1, m1C = 1, m1D = 0;
  // M2: Non-uniform scale (x2 in X)
  const m2A = 2, m2B = 0, m2C = 0, m2D = 1;

  // Composite matrix calculation
  // If M2 * M1 (Rotate first, then Scale):
  // [2, 0; 0, 1] * [0, -1; 1, 0] = [0, -2; 1, 0]
  let compA = $derived(compOrder === 'M2_then_M1' ? (m2A * m1A + m2B * m1C) : (m1A * m2A + m1B * m2C));
  let compB = $derived(compOrder === 'M2_then_M1' ? (m2A * m1B + m2B * m1D) : (m1A * m2B + m1B * m2D));
  let compC = $derived(compOrder === 'M2_then_M1' ? (m2C * m1A + m2D * m1C) : (m1C * m2A + m1D * m2C));
  let compD = $derived(compOrder === 'M2_then_M1' ? (m2C * m1B + m2D * m1D) : (m1C * m2B + m1D * m2D));

  let compShipPoints = $derived(
    `${transformPt(0, 1.8, compA, compB, compC, compD)} ${transformPt(1.2, -1.2, compA, compB, compC, compD)} ${transformPt(0, -0.6, compA, compB, compC, compD)} ${transformPt(-1.2, -1.2, compA, compB, compC, compD)}`
  );

  // ==========================================
  // TAB 5: DETERMINANT VISUALIZATION
  // ==========================================
  let detStatus = $derived.by(() => {
    if (Math.abs(det) < 0.001) return 'Singular (Det = 0) → Collapsed to line/point (No inverse!)';
    if (det < 0) return 'Negative Det → Reflection / Orientation Flipped (Inside-Out)';
    return 'Positive Det → Area Preserved & Scaled (Standard Orientation)';
  });
</script>

<div class="week8-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W8 Matrices</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="basis_grid">1. Basis Vectors (i-hat & j-hat)</option>
      <option value="multiplier">2. Matrix-Vector Multiplier</option>
      <option value="gallery">3. Transformation Gallery</option>
      <option value="composition">4. Matrix Composition (M2 · M1)</option>
      <option value="determinant">5. Determinant & Area Scaling</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 8 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Matrices & Transformations</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'basis_grid' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'basis_grid')}
      >
        <Grid size={14} /> Basis Vectors
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'multiplier' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'multiplier')}
      >
        <Maximize2 size={14} /> Multiplier
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'gallery' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'gallery')}
      >
        <Sparkles size={14} /> Gallery
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'composition' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'composition')}
      >
        <Layers size={14} /> Composition
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'determinant' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'determinant')}
      >
        <Scaling size={14} /> Determinant
      </button>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- ========================================== -->
    <!-- ========================================== -->
    <!-- TAB 1: BASIS VECTORS (i-hat & j-hat)       -->
    <!-- ========================================== -->
    {#if activeTab === 'basis_grid'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Grid size={18} class="text-primary" /> The Basis Vector Secret
            </h3>
            <p class="text-xs text-base-content/70">
              Every 2×2 matrix simply tells you where the standard basis vectors land!
              Column 1 [a, c] is the new î, and Column 2 [b, d] is the new ĵ.
            </p>
          </div>

          <!-- Matrix Inputs Grid -->
          <div class="p-4 bg-base-200 rounded-2xl border border-base-300 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 block">
              Matrix Elements: M = [a, b; c, d]
            </span>

            <div class="grid grid-cols-2 gap-3 font-mono text-xs">
              <div class="p-2.5 bg-base-100 rounded-xl border border-emerald-500/40">
                <span class="text-emerald-500 font-bold block mb-1">Column 1 (New î)</span>
                <div class="flex items-center justify-between gap-1 mb-1">
                  <span>a:</span>
                  <input type="number" step="0.5" bind:value={matA} class="input input-xs input-bordered w-16 text-center font-bold" />
                </div>
                <div class="flex items-center justify-between gap-1">
                  <span>c:</span>
                  <input type="number" step="0.5" bind:value={matC} class="input input-xs input-bordered w-16 text-center font-bold" />
                </div>
              </div>

              <div class="p-2.5 bg-base-100 rounded-xl border border-red-500/40">
                <span class="text-red-500 font-bold block mb-1">Column 2 (New ĵ)</span>
                <div class="flex items-center justify-between gap-1 mb-1">
                  <span>b:</span>
                  <input type="number" step="0.5" bind:value={matB} class="input input-xs input-bordered w-16 text-center font-bold" />
                </div>
                <div class="flex items-center justify-between gap-1">
                  <span>d:</span>
                  <input type="number" step="0.5" bind:value={matD} class="input input-xs input-bordered w-16 text-center font-bold" />
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="flex flex-wrap gap-2 text-xs">
            <button class="btn btn-xs btn-outline" onclick={() => { matA = 1; matB = 0; matC = 0; matD = 1; }}>
              Identity
            </button>
            <button class="btn btn-xs btn-outline btn-info" onclick={() => { matA = 0; matB = -1; matC = 1; matD = 0; }}>
              Rotate 90°
            </button>
            <button class="btn btn-xs btn-outline btn-secondary" onclick={() => { matA = 1; matB = 1; matC = 0; matD = 1; }}>
              Shear X
            </button>
            <button class="btn btn-xs btn-outline btn-warning" onclick={() => { matA = 2; matB = 0; matC = 0; matD = 2; }}>
              Scale 2x
            </button>
          </div>
        </div>

        <!-- Visual Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.15" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.15" />

            <!-- Original unit square outline (dashed) -->
            <rect x="120" y="90" width="30" height="30" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2" />

            <!-- Transformed Parallelogram -->
            <polygon points={basisParallPoints} fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="1.5" />

            <defs>
              <marker id="arr-ihat" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker id="arr-jhat" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
              </marker>
            </defs>

            <!-- Transformed i-hat (Green) -->
            <line x1="120" y1="120" x2={svgIhatX} y2={svgIhatY} stroke="#10b981" stroke-width="3" marker-end="url(#arr-ihat)" />
            <circle cx={svgIhatX} cy={svgIhatY} r="3.5" fill="#10b981" />

            <!-- Transformed j-hat (Red) -->
            <line x1="120" y1="120" x2={svgJhatX} y2={svgJhatY} stroke="#ef4444" stroke-width="3" marker-end="url(#arr-jhat)" />
            <circle cx={svgJhatX} cy={svgJhatY} r="3.5" fill="#ef4444" />
          </svg>
          <div class="flex justify-between w-full max-w-[260px] text-xs font-mono mt-2 px-2">
            <span class="text-emerald-500 font-bold">î' = ({matA}, {matC})</span>
            <span class="text-red-500 font-bold">ĵ' = ({matB}, {matD})</span>
          </div>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 2: MATRIX-VECTOR MULTIPLIER            -->
    <!-- ========================================== -->
    {#if activeTab === 'multiplier'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Maximize2 size={18} class="text-primary" /> Matrix-Vector Multiplier
            </h3>
            <p class="text-xs text-base-content/70">
              Row-by-column multiplication transforms coordinate vector v⃗ into v⃗':
              [a, b; c, d] · [x, y] = [ax + by, cx + dy].
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 font-mono text-xs">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="text-xs font-bold text-primary block">Vector v (x, y)</span>
              <div class="flex items-center gap-1">
                <span>x:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={vecX} class="range range-xs range-primary" />
                <span class="w-4 text-right">{vecX}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>y:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={vecY} class="range range-xs range-primary" />
                <span class="w-4 text-right">{vecY}</span>
              </div>
            </div>

            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="text-xs font-bold text-secondary block">Matrix M [a,b; c,d]</span>
              <div class="grid grid-cols-2 gap-1 text-center">
                <input type="number" step="0.5" bind:value={matA} class="input input-xs input-bordered text-center font-bold" />
                <input type="number" step="0.5" bind:value={matB} class="input input-xs input-bordered text-center font-bold" />
                <input type="number" step="0.5" bind:value={matC} class="input input-xs input-bordered text-center font-bold" />
                <input type="number" step="0.5" bind:value={matD} class="input input-xs input-bordered text-center font-bold" />
              </div>
            </div>
          </div>

          <!-- Step-by-step evaluation card -->
          <div class="p-3 bg-primary/10 border border-primary/30 rounded-xl font-mono text-xs space-y-1">
            <div class="text-base-content/70">
              x' = ({matA} × {vecX}) + ({matB} × {vecY}) = <strong class="text-primary">{resX.toFixed(1)}</strong>
            </div>
            <div class="text-base-content/70">
              y' = ({matC} × {vecX}) + ({matD} × {vecY}) = <strong class="text-secondary">{resY.toFixed(1)}</strong>
            </div>
            <div class="pt-1 border-t border-primary/20 text-sm font-bold text-accent">
              Result v⃗' = [{resX.toFixed(1)}, {resY.toFixed(1)}]
            </div>
          </div>
        </div>

        <!-- Visual Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.15" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.15" />

            <defs>
              <marker id="arr-vorig" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#3b82f6" />
              </marker>
              <marker id="arr-vres" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            <!-- Original vector v (Blue) -->
            <line x1="120" y1="120" x2={svgVecX} y2={svgVecY} stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="3,2" marker-end="url(#arr-vorig)" />
            <circle cx={svgVecX} cy={svgVecY} r="3" fill="#3b82f6" />

            <!-- Transformed vector v' (Emerald) -->
            <line x1="120" y1="120" x2={svgResX} y2={svgResY} stroke="#10b981" stroke-width="3.5" marker-end="url(#arr-vres)" />
            <circle cx={svgResX} cy={svgResY} r="4" fill="#10b981" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Dashed Blue: Input v⃗ | Solid Green: Transformed v⃗'</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 3: TRANSFORMATION GALLERY              -->
    <!-- ========================================== -->
    {#if activeTab === 'gallery'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Sparkles size={18} class="text-primary" /> 2D Transformation Gallery
            </h3>
            <p class="text-xs text-base-content/70">
              In video games, 2D sprites (ships, characters) are manipulated through matrix transformations. Select a preset and adjust parameters to observe the live morphing.
            </p>
          </div>

          <!-- Preset Switcher -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              class={`btn btn-xs ${galleryPreset === 'rotate' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (galleryPreset = 'rotate')}
            >
              <RotateCw size={12} /> Rotate
            </button>
            <button
              class={`btn btn-xs ${galleryPreset === 'scale' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (galleryPreset = 'scale')}
            >
              <Scaling size={12} /> Scale
            </button>
            <button
              class={`btn btn-xs ${galleryPreset === 'reflect' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (galleryPreset = 'reflect')}
            >
              <FlipHorizontal size={12} /> Reflect
            </button>
            <button
              class={`btn btn-xs ${galleryPreset === 'shear' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (galleryPreset = 'shear')}
            >
              <Grid size={12} /> Shear
            </button>
          </div>

          <!-- Dynamic Controls per Preset -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
            {#if galleryPreset === 'rotate'}
              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Rotation Angle ($\theta$):</span>
                <span class="text-primary">{rotAngleDeg}°</span>
              </div>
              <input type="range" min="0" max="360" step="5" bind:value={rotAngleDeg} class="range range-xs range-primary" />
            {:else if galleryPreset === 'scale'}
              <div class="space-y-2">
                <div class="flex justify-between text-xs font-mono font-bold">
                  <span>Scale X ($s_x$):</span>
                  <span class="text-primary">{scaleSx.toFixed(1)}</span>
                </div>
                <input type="range" min="0.2" max="2.5" step="0.1" bind:value={scaleSx} class="range range-xs range-primary" />
                <div class="flex justify-between text-xs font-mono font-bold">
                  <span>Scale Y ($s_y$):</span>
                  <span class="text-secondary">{scaleSy.toFixed(1)}</span>
                </div>
                <input type="range" min="0.2" max="2.5" step="0.1" bind:value={scaleSy} class="range range-xs range-secondary" />
              </div>
            {:else if galleryPreset === 'reflect'}
              <p class="text-xs text-base-content/70">
                Reflect across the $x$-axis: $y' = -y$. Notice the spaceship flips upside-down!
              </p>
            {:else if galleryPreset === 'shear'}
              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Horizontal Shear Factor ($k$):</span>
                <span class="text-primary">{shearK.toFixed(1)}</span>
              </div>
              <input type="range" min="-2" max="2" step="0.2" bind:value={shearK} class="range range-xs range-primary" />
            {/if}
          </div>

          <!-- Matrix Readout -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs flex justify-between items-center">
            <span>Matrix M:</span>
            <strong class="text-primary text-sm">
              [{galleryA}, {galleryB}; {galleryC}, {galleryD}]
            </strong>
          </div>
        </div>

        <!-- Visual Canvas: Spaceship Sprite -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="#334155" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="#334155" />

            <!-- Original Spaceship (Dashed Slate) -->
            <polygon points={originalShipPoints} fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="2,2" />

            <!-- Transformed Spaceship (Cyan Neon) -->
            <polygon points={transformedShipPoints} fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" stroke-width="2" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Dashed: Rest Pose | Cyan: Transformed Ship</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 4: MATRIX COMPOSITION                  -->
    <!-- ========================================== -->
    {#if activeTab === 'composition'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Layers size={18} class="text-primary" /> Matrix Composition Order
            </h3>
            <p class="text-xs text-base-content/70">
              Matrix multiplication is <strong>not commutative</strong>: M₂ · M₁ ≠ M₁ · M₂. In game engines, doing a Rotation then Scale produces a completely different result than Scale then Rotate!
            </p>
          </div>

          <!-- Order Selector -->
          <div class="flex flex-col gap-2">
            <button
              class={`btn btn-sm text-xs justify-between ${compOrder === 'M2_then_M1' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (compOrder = 'M2_then_M1')}
            >
              <span>1. Rotate 90° first, then Stretch X (M₂ · M₁)</span>
              <ArrowRight size={14} />
            </button>
            <button
              class={`btn btn-sm text-xs justify-between ${compOrder === 'M1_then_M2' ? 'btn-secondary' : 'btn-outline'}`}
              onclick={() => (compOrder = 'M1_then_M2')}
            >
              <span>2. Stretch X first, then Rotate 90° (M₁ · M₂)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <!-- Active Composite Matrix Readout -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs space-y-2">
            <div class="flex justify-between items-center">
              <span>M₁ (Rotate 90°):</span>
              <span>[0, -1; 1, 0]</span>
            </div>
            <div class="flex justify-between items-center">
              <span>M₂ (Scale X by 2):</span>
              <span>[2, 0; 0, 1]</span>
            </div>
            <div class="pt-2 border-t border-base-300 flex justify-between items-center">
              <span class="font-bold">Resulting Matrix:</span>
              <strong class="text-primary text-sm">
                [{compA}, {compB}; {compC}, {compD}]
              </strong>
            </div>
          </div>
        </div>

        <!-- Visual Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="#334155" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="#334155" />

            <!-- Original Spaceship (Dashed Slate) -->
            <polygon points={originalShipPoints} fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="2,2" />

            <!-- Composed Spaceship Result -->
            <polygon
              points={compShipPoints}
              fill={compOrder === 'M2_then_M1' ? 'rgba(59, 130, 246, 0.35)' : 'rgba(236, 72, 153, 0.35)'}
              stroke={compOrder === 'M2_then_M1' ? '#3b82f6' : '#ec4899'}
              stroke-width="2"
            />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">
            {compOrder === 'M2_then_M1' ? 'Rotate then Scale' : 'Scale then Rotate'}
          </span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 5: DETERMINANT & AREA SCALING          -->
    <!-- ========================================== -->
    {#if activeTab === 'determinant'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Scaling size={18} class="text-primary" /> Determinant: Geometric Area Factor
            </h3>
            <p class="text-xs text-base-content/70">
              The determinant $\det(M) = ad - bc$ measures how much 2D area scales under the transformation. If $\det(M) &lt; 0$, space has been flipped (inverted handedness / reflection). If $\det(M) = 0$, space collapses to a line or point!
            </p>
          </div>

          <!-- Matrix Inputs -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs space-y-2">
            <span class="text-xs font-bold text-base-content/70 block">Matrix M [a, b; c, d]</span>
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="flex items-center gap-1">
                <span>a:</span>
                <input type="number" step="0.5" bind:value={matA} class="input input-xs input-bordered w-full text-center font-bold" />
              </div>
              <div class="flex items-center gap-1">
                <span>b:</span>
                <input type="number" step="0.5" bind:value={matB} class="input input-xs input-bordered w-full text-center font-bold" />
              </div>
              <div class="flex items-center gap-1">
                <span>c:</span>
                <input type="number" step="0.5" bind:value={matC} class="input input-xs input-bordered w-full text-center font-bold" />
              </div>
              <div class="flex items-center gap-1">
                <span>d:</span>
                <input type="number" step="0.5" bind:value={matD} class="input input-xs input-bordered w-full text-center font-bold" />
              </div>
            </div>
          </div>

          <!-- Determinant Output Stats -->
          <div class="grid grid-cols-2 gap-2 font-mono text-xs">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Formula</span>
              <span class="text-xs font-bold">{matA}×{matD} - {matB}×{matC}</span>
            </div>
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Determinant</span>
              <span class="text-base font-black text-accent">{det.toFixed(2)}</span>
            </div>
          </div>

          <div class="p-2.5 bg-base-200/80 rounded-xl border border-base-300 text-xs font-mono text-center">
            {detStatus}
          </div>
        </div>

        <!-- Parallelogram Area Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.15" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.15" />

            <!-- Original unit square (Area = 1.0) -->
            <rect x="120" y="90" width="30" height="30" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2" />

            <!-- Transformed Parallelogram -->
            <polygon
              points={basisParallPoints}
              fill={det < 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)'}
              stroke={det < 0 ? '#ef4444' : '#10b981'}
              stroke-width="2"
            />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">
            Area Scale = {detAbs}× {det < 0 ? '(Inverted)' : ''}
          </span>
        </div>
      </div>
    {/if}

  </div>
</div>
