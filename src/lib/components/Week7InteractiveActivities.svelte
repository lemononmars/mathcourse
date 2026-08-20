<script lang="ts">
  import Move from '@lucide/svelte/icons/move';
  import Navigation from '@lucide/svelte/icons/navigation';
  import Route from '@lucide/svelte/icons/route';
  import Plus from '@lucide/svelte/icons/plus';
  import Maximize2 from '@lucide/svelte/icons/maximize-2';
  import Sun from '@lucide/svelte/icons/sun';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Grid from '@lucide/svelte/icons/grid';

  type TabType = 'line1d' | 'vector' | 'displacement' | 'arithmetic' | 'unitvec' | 'dotprod' | 'plane2d' | 'basis';
  let activeTab = $state<TabType>('vector');

  // ==========================================
  // TAB 1: 1D TRANSFORMATION
  // ==========================================
  let lineX = $state(2);
  let lineTranslate = $state(3);
  let lineScale = $state(2);
  let lineResult = $derived(lineX * lineScale + lineTranslate);

  // ==========================================
  // TAB 2: VECTOR COMPONENT
  // ==========================================
  let vecX = $state(4);
  let vecY = $state(3);
  let vecMag = $derived(Math.hypot(vecX, vecY).toFixed(2));
  let vecAngle = $derived(((Math.atan2(vecY, vecX) * 180) / Math.PI).toFixed(1));

  // ==========================================
  // TAB 3: DISPLACEMENT (AB = B - A)
  // ==========================================
  let ptAx = $state(1);
  let ptAy = $state(2);
  let ptBx = $state(5);
  let ptBy = $state(6);
  let dispX = $derived(ptBx - ptAx);
  let dispY = $derived(ptBy - ptAy);

  // ==========================================
  // TAB 4: ARITHMETIC (u + v)
  // ==========================================
  let uX = $state(3);
  let uY = $state(1);
  let vX = $state(1);
  let vY = $state(3);
  let sumX = $derived(uX + vX);
  let sumY = $derived(uY + vY);

  // ==========================================
  // TAB 5: NORM & UNIT VECTOR
  // ==========================================
  let normX = $state(6);
  let normY = $state(8);
  let normLen = $derived(Math.hypot(normX, normY));
  let unitX = $derived((normX / (normLen || 1)).toFixed(2));
  let unitY = $derived((normY / (normLen || 1)).toFixed(2));

  // ==========================================
  // TAB 6: DOT PRODUCT & LIGHTING/FOV
  // ==========================================
  let dotUx = $state(1);
  let dotUy = $state(0);
  let dotVx = $state(0);
  let dotVy = $state(1);
  let dotVal = $derived(dotUx * dotVx + dotUy * dotVy);
  let dotCosTheta = $derived((dotVal / (Math.hypot(dotUx, dotUy) * Math.hypot(dotVx, dotVy) || 1)).toFixed(2));
  let dotAngleDeg = $derived(((Math.acos(Math.max(-1, Math.min(1, Number(dotCosTheta)))) * 180) / Math.PI).toFixed(1));

  // ==========================================
  // TAB 7: 2D PLANE ROTATION
  // ==========================================
  let rotDeg = $state(45);
  let rotPx = $state(4);
  let rotPy = $state(0);
  let rotRad = $derived((rotDeg * Math.PI) / 180);
  let rotResX = $derived((rotPx * Math.cos(rotRad) - rotPy * Math.sin(rotRad)).toFixed(2));
  let rotResY = $derived((rotPx * Math.sin(rotRad) + rotPy * Math.cos(rotRad)).toFixed(2));

  // ==========================================
  // TAB 8: BASIS VECTORS (i, j)
  // ==========================================
  let basisIx = $state(1);
  let basisIy = $state(0);
  let basisJx = $state(0);
  let basisJy = $state(1);
</script>

<div class="week7-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W7 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="line1d">1. 1D Motion</option>
      <option value="vector">2. Vector Components</option>
      <option value="displacement">3. Displacement AB</option>
      <option value="arithmetic">4. Vector Addition</option>
      <option value="unitvec">5. Unit Normalization</option>
      <option value="dotprod">6. Dot Product & FOV</option>
      <option value="plane2d">7. 2D Plane Rotation</option>
      <option value="basis">8. Basis Vectors</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 7 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Vectors & Motion</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'line1d' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'line1d')}>
        <Move size={14} /> 1D Motion
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'vector' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'vector')}>
        <Navigation size={14} /> Component
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'displacement' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'displacement')}>
        <Route size={14} /> Displacement
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'arithmetic' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'arithmetic')}>
        <Plus size={14} /> Addition
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'unitvec' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'unitvec')}>
        <Maximize2 size={14} /> Unit Vec
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'dotprod' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'dotprod')}>
        <Sun size={14} /> Dot Product
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'plane2d' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'plane2d')}>
        <RotateCw size={14} /> 2D Rotate
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'basis' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'basis')}>
        <Grid size={14} /> Basis
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 2: VECTOR COMPONENT -->
    {#if activeTab === 'vector'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Vector Components ⟨x, y⟩</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Component x = {vecX}</span></div>
              <input type="range" min="-10" max="10" bind:value={vecX} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Component y = {vecY}</span></div>
              <input type="range" min="-10" max="10" bind:value={vecY} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-3 bg-base-100 rounded-xl border border-base-300 font-mono text-xs">
            v = ⟨{vecX}, {vecY}⟩ = {vecX}î + {vecY}ĵ
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Vector Magnitude ||v||</span>
          <div class="text-5xl font-mono font-black text-primary my-2">{vecMag}</div>
          <span class="text-xs font-mono text-base-content/70">Heading Angle: {vecAngle}°</span>
        </div>
      </div>

    <!-- TAB 4: ADDITION -->
    {:else if activeTab === 'arithmetic'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Add u + v</span>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs font-bold">u = ⟨{uX}, {uY}⟩</span>
                <input type="range" min="-5" max="5" bind:value={uX} class="range range-xs range-primary mt-1" />
                <input type="range" min="-5" max="5" bind:value={uY} class="range range-xs range-primary mt-1" />
              </div>
              <div>
                <span class="text-xs font-bold">v = ⟨{vX}, {vY}⟩</span>
                <input type="range" min="-5" max="5" bind:value={vX} class="range range-xs range-secondary mt-1" />
                <input type="range" min="-5" max="5" bind:value={vY} class="range range-xs range-secondary mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Resultant Vector u + v</span>
          <div class="text-4xl font-mono font-black text-primary my-3">⟨{sumX}, {sumY}⟩</div>
          <p class="text-xs font-mono text-base-content/70">⟨{uX} + {vX}, {uY} + {vY}⟩ = ⟨{sumX}, {sumY}⟩</p>
        </div>
      </div>

    <!-- TAB 6: DOT PRODUCT -->
    {:else if activeTab === 'dotprod'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">u · v = u_x v_x + u_y v_y</span>
            <div>
              <span class="text-xs font-bold">Vector u: ⟨{dotUx}, {dotUy}⟩</span>
              <input type="range" min="-5" max="5" bind:value={dotUx} class="range range-xs range-primary mt-1" />
              <input type="range" min="-5" max="5" bind:value={dotUy} class="range range-xs range-primary mt-1" />
            </div>
            <div>
              <span class="text-xs font-bold">Vector v: ⟨{dotVx}, {dotVy}⟩</span>
              <input type="range" min="-5" max="5" bind:value={dotVx} class="range range-xs range-secondary mt-1" />
              <input type="range" min="-5" max="5" bind:value={dotVy} class="range range-xs range-secondary mt-1" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
          <span class="text-xs uppercase font-bold text-base-content/50">Dot Product Result</span>
          <div class="text-5xl font-mono font-black text-primary">{dotVal}</div>
          <p class="text-sm font-mono font-bold">Angle Between: {dotAngleDeg}°</p>
          <p class="text-xs text-base-content/70">
            {#if dotVal > 0}Facing same general direction (acute angle)
            {:else if dotVal === 0}Perpendicular (90° orthogonal)
            {:else}Facing away from each other (obtuse angle){/if}
          </p>
        </div>
      </div>

    <!-- OTHER TABS: FALLBACK SUMMARY -->
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-4">
        {#if activeTab === 'line1d'}
          <span class="badge badge-primary badge-sm font-bold">1D Transformation</span>
          <h3 class="text-xl font-bold">f(x) = s · x + t</h3>
          <div class="text-3xl font-mono font-black text-primary">{lineX} × {lineScale} + {lineTranslate} = {lineResult}</div>
        {:else if activeTab === 'displacement'}
          <span class="badge badge-primary badge-sm font-bold">Displacement AB</span>
          <h3 class="text-xl font-bold">AB = B - A = ⟨{dispX}, {dispY}⟩</h3>
        {:else if activeTab === 'unitvec'}
          <span class="badge badge-primary badge-sm font-bold">Unit Vector</span>
          <h3 class="text-xl font-bold">v̂ = ⟨{unitX}, {unitY}⟩ (Length = 1)</h3>
        {:else if activeTab === 'plane2d'}
          <span class="badge badge-primary badge-sm font-bold">2D Rotation ({rotDeg}°)</span>
          <h3 class="text-xl font-bold">Rotated: ({rotResX}, {rotResY})</h3>
        {:else}
          <span class="badge badge-primary badge-sm font-bold">Basis Vectors</span>
          <h3 class="text-xl font-bold">î = ⟨1, 0⟩, ĵ = ⟨0, 1⟩</h3>
        {/if}
      </div>
    {/if}

  </div>
</div>
