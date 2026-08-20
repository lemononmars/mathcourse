<script lang="ts">
  import Grid from '@lucide/svelte/icons/grid';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Layers from '@lucide/svelte/icons/layers';
  import Maximize2 from '@lucide/svelte/icons/maximize-2';

  type TabType = 'mult' | 'presets' | 'comp' | 'det';
  let activeTab = $state<TabType>('mult');

  // Matrix elements: [a, b; c, d]
  let matA = $state(2);
  let matB = $state(0);
  let matC = $state(0);
  let matD = $state(2);

  // Vector [x; y]
  let vecX = $state(3);
  let vecY = $state(2);

  // Transformed vector [x'; y']
  let resX = $derived(matA * vecX + matB * vecY);
  let resY = $derived(matC * vecX + matD * vecY);
  let determinant = $derived(matA * matD - matB * matC);

  function applyPreset(preset: 'identity' | 'scale2' | 'rot90' | 'reflectX' | 'shearX') {
    if (preset === 'identity') { matA = 1; matB = 0; matC = 0; matD = 1; }
    else if (preset === 'scale2') { matA = 2; matB = 0; matC = 0; matD = 2; }
    else if (preset === 'rot90') { matA = 0; matB = -1; matC = 1; matD = 0; }
    else if (preset === 'reflectX') { matA = 1; matB = 0; matC = 0; matD = -1; }
    else if (preset === 'shearX') { matA = 1; matB = 1.5; matC = 0; matD = 1; }
  }
</script>

<div class="week8-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W8 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="mult">1. Matrix-Vector Multiplier</option>
      <option value="presets">2. Transformation Gallery</option>
      <option value="comp">3. Matrix Composition</option>
      <option value="det">4. Determinant & Area</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 8 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Matrix Transformations</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'mult' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'mult')}>
        <Grid size={14} /> Multiplier
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'presets' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'presets')}>
        <Sparkles size={14} /> Gallery
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'comp' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'comp')}>
        <Layers size={14} /> Composition
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'det' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'det')}>
        <Maximize2 size={14} /> Determinant
      </button>
    </div>
  </div>

  <!-- Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: MATRIX MULTIPLIER -->
    {#if activeTab === 'mult'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-6 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Matrix 2×2 & Vector</span>
            
            <div class="grid grid-cols-2 gap-3 p-3 bg-base-100 rounded-xl border border-base-300">
              <div>
                <span class="text-xs font-bold">a: {matA}</span>
                <input type="range" min="-3" max="3" step="0.5" bind:value={matA} class="range range-xs range-primary" />
              </div>
              <div>
                <span class="text-xs font-bold">b: {matB}</span>
                <input type="range" min="-3" max="3" step="0.5" bind:value={matB} class="range range-xs range-primary" />
              </div>
              <div>
                <span class="text-xs font-bold">c: {matC}</span>
                <input type="range" min="-3" max="3" step="0.5" bind:value={matC} class="range range-xs range-primary" />
              </div>
              <div>
                <span class="text-xs font-bold">d: {matD}</span>
                <input type="range" min="-3" max="3" step="0.5" bind:value={matD} class="range range-xs range-primary" />
              </div>
            </div>

            <div>
              <span class="text-xs font-bold block mb-1">Input Vector [x; y]</span>
              <div class="grid grid-cols-2 gap-2">
                <input type="range" min="-5" max="5" bind:value={vecX} class="range range-xs range-secondary" />
                <input type="range" min="-5" max="5" bind:value={vecY} class="range range-xs range-secondary" />
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
          <span class="text-xs uppercase font-bold text-base-content/50">Matrix Product</span>
          <div class="flex items-center gap-3 text-2xl font-mono font-bold">
            <div class="p-2 border-2 border-primary rounded-lg">[{matA}, {matB}; {matC}, {matD}]</div>
            <span>×</span>
            <div class="p-2 border-2 border-secondary rounded-lg">[{vecX}; {vecY}]</div>
            <span>=</span>
            <div class="p-3 bg-primary/10 border-2 border-primary text-primary font-black text-3xl rounded-xl">
              [{resX}; {resY}]
            </div>
          </div>
          <p class="text-xs text-base-content/70">Transforms 2D game objects and mesh vertices.</p>
        </div>
      </div>

    <!-- TAB 2: PRESETS -->
    {:else if activeTab === 'presets'}
      <div class="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 space-y-6 h-full shadow-inner animate-fade-in">
        <div class="text-center">
          <span class="badge badge-primary badge-sm font-bold">Transformation Matrix Gallery</span>
          <h3 class="text-lg font-black mt-1">Select a Standard 2D Transformation</h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button class="btn btn-outline btn-sm font-bold" onclick={() => applyPreset('identity')}>Identity</button>
          <button class="btn btn-outline btn-sm font-bold" onclick={() => applyPreset('scale2')}>2x Scale</button>
          <button class="btn btn-outline btn-sm font-bold" onclick={() => applyPreset('rot90')}>90° Rotate</button>
          <button class="btn btn-outline btn-sm font-bold" onclick={() => applyPreset('reflectX')}>Reflect Y</button>
          <button class="btn btn-outline btn-sm font-bold" onclick={() => applyPreset('shearX')}>Shear X</button>
        </div>

        <div class="p-6 bg-base-200/50 rounded-2xl border border-base-300 text-center font-mono space-y-2">
          <p class="text-xs uppercase text-base-content/60 font-bold">Active Matrix</p>
          <div class="text-3xl font-black text-primary">[{matA}, {matB}; {matC}, {matD}]</div>
          <p class="text-sm font-bold text-secondary">Vector [{vecX}, {vecY}] ➔ [{resX}, {resY}]</p>
        </div>
      </div>

    <!-- TAB 4: DETERMINANT -->
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-4 animate-fade-in">
        <span class="badge badge-primary badge-sm font-bold">Determinant (Area Scaling Factor)</span>
        <div class="text-6xl font-mono font-black text-primary my-2">{determinant}</div>
        <p class="text-sm font-mono">det(M) = ({matA})({matD}) - ({matB})({matC}) = {determinant}</p>
        <p class="text-xs text-base-content/70 max-w-md">
          {#if Math.abs(determinant) < 1e-6}
            Determinant is 0: The transformation collapses 2D space into a 1D line or point (Non-invertible).
          {:else if determinant > 0}
            Area scales by {determinant}x (Orientation preserved).
          {:else}
            Area scales by {Math.abs(determinant)}x with inverted orientation (reflection).
          {/if}
        </p>
      </div>
    {/if}

  </div>
</div>
