<script lang="ts">
  import LineChart from '@lucide/svelte/icons/line-chart';
  import Layers from '@lucide/svelte/icons/layers';
  import Variable from '@lucide/svelte/icons/variable';
  import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
  import Sliders from '@lucide/svelte/icons/sliders';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Check from '@lucide/svelte/icons/check';
  import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
  import Sparkles from '@lucide/svelte/icons/sparkles';

  type TabType = 'linear' | 'system' | 'quadratic' | 'absolute' | 'quadineq';
  let activeTab = $state<TabType>('linear');

  // ==========================================
  // TAB 1: LINEAR EQUATIONS (ax + b = cx + d)
  // ==========================================
  let linMode = $state<'single' | 'both'>('both');
  let linA = $state(3);
  let linB = $state(5);
  let linC = $state(1);
  let linD = $state(11);

  let linSol = $derived.by(() => {
    if (linMode === 'single') {
      if (linA === 0) {
        return { type: linB === linD ? 'identity' : 'none', val: null };
      }
      return { type: 'unique', val: (linD - linB) / linA };
    } else {
      const denom = linA - linC;
      if (denom === 0) {
        return { type: linB === linD ? 'identity' : 'none', val: null };
      }
      return { type: 'unique', val: (linD - linB) / denom };
    }
  });

  // SVG dimensions & mapping for Linear Graph
  const linWidth = 360;
  const linHeight = 240;
  const linCenterX = 180;
  const linCenterY = 120;
  const linScale = 12; // 12px per unit

  function toSvgX(x: number) {
    return linCenterX + x * linScale;
  }
  function toSvgY(y: number) {
    return linCenterY - y * linScale;
  }

  // ==========================================
  // TAB 2: SYSTEM OF EQUATIONS
  // ==========================================
  // Equation 1: a1*x + b1*y = c1
  // Equation 2: a2*x + b2*y = c2
  let sysA1 = $state(2);
  let sysB1 = $state(3);
  let sysC1 = $state(7);

  let sysA2 = $state(4);
  let sysB2 = $state(-3);
  let sysC2 = $state(5);

  let sysSol = $derived.by(() => {
    const det = sysA1 * sysB2 - sysA2 * sysB1;
    if (Math.abs(det) < 1e-6) {
      // Parallel or coincident
      const isCoincident = Math.abs(sysA1 * sysC2 - sysA2 * sysC1) < 1e-6 && Math.abs(sysB1 * sysC2 - sysB2 * sysC1) < 1e-6;
      return { type: isCoincident ? 'infinite' : 'none', x: null, y: null, det: 0 };
    }
    const x = (sysC1 * sysB2 - sysC2 * sysB1) / det;
    const y = (sysA1 * sysC2 - sysA2 * sysC1) / det;
    return { type: 'unique', x, y, det };
  });

  function applySysPreset(type: 'unique' | 'none' | 'infinite') {
    if (type === 'unique') {
      sysA1 = 1; sysB1 = 1; sysC1 = 6;
      sysA2 = 2; sysB2 = -1; sysC2 = 3;
    } else if (type === 'none') {
      sysA1 = 2; sysB1 = 4; sysC1 = 8;
      sysA2 = 1; sysB2 = 2; sysC2 = 1;
    } else {
      sysA1 = 1; sysB1 = -2; sysC1 = 3;
      sysA2 = 2; sysB2 = -4; sysC2 = 6;
    }
  }

  // ==========================================
  // TAB 3: QUADRATIC EQUATIONS & 3 METHODS
  // ==========================================
  let quadA = $state(1);
  let quadB = $state(-3);
  let quadC = $state(2);
  let quadMethod = $state<'formula' | 'factoring' | 'square'>('formula');

  let quadDisc = $derived(quadB * quadB - 4 * quadA * quadC);
  let quadRoots = $derived.by(() => {
    if (quadDisc > 0) {
      const r1 = (-quadB + Math.sqrt(quadDisc)) / (2 * quadA);
      const r2 = (-quadB - Math.sqrt(quadDisc)) / (2 * quadA);
      return { type: 'two', r1: Math.min(r1, r2), r2: Math.max(r1, r2) };
    } else if (Math.abs(quadDisc) < 1e-6) {
      return { type: 'one', r1: -quadB / (2 * quadA), r2: -quadB / (2 * quadA) };
    } else {
      return { type: 'complex', r1: null, r2: null };
    }
  });

  let quadVertex = $derived.by(() => {
    const h = -quadB / (2 * (quadA || 1));
    const k = quadA * h * h + quadB * h + quadC;
    return { h, k };
  });

  function applyQuadPreset(preset: 'integer' | 'double' | 'complex') {
    if (preset === 'integer') {
      quadA = 1; quadB = -5; quadC = 6; // roots 2, 3
    } else if (preset === 'double') {
      quadA = 1; quadB = -4; quadC = 4; // root 2
    } else {
      quadA = 1; quadB = 2; quadC = 5; // complex
    }
  }

  // ==========================================
  // TAB 4: MARIO HITBOX & ABSOLUTE VALUE INEQ
  // ==========================================
  let marioX = $state(6);
  let marioW = $state(2);
  let koopaX = $state(2.5);
  let koopaW = $state(3);

  let hitboxDist = $derived(Math.abs(marioX - koopaX));
  let safeThreshold = $derived((marioW + koopaW) / 2);
  let isColliding = $derived(hitboxDist < safeThreshold);

  let marioLeft = $derived(marioX - marioW / 2);
  let marioRight = $derived(marioX + marioW / 2);
  let koopaLeft = $derived(koopaX - koopaW / 2);
  let koopaRight = $derived(koopaX + koopaW / 2);

  // ==========================================
  // TAB 5: QUADRATIC INEQUALITIES & SIGN CHART
  // ==========================================
  let qIneqM1 = $state<number | string>(1);
  let qIneqM2 = $state<number | string>(3);
  let qIneqA = $state(1); // >0 or <0
  let qIneqOp = $state<'>' | '>=' | '<' | '<='>('<');
  let qIneqTestX = $state(0);

  let numM1 = $derived(typeof qIneqM1 === 'number' ? (isNaN(qIneqM1) ? 0 : qIneqM1) : (parseFloat(qIneqM1) || 0));
  let numM2 = $derived(typeof qIneqM2 === 'number' ? (isNaN(qIneqM2) ? 0 : qIneqM2) : (parseFloat(qIneqM2) || 0));

  let qIneqRoots = $derived.by(() => {
    const r1 = Math.min(numM1, numM2);
    const r2 = Math.max(numM1, numM2);
    return { r1, r2, m1: numM1, m2: numM2 };
  });

  let xDomain = $derived.by(() => {
    const minVal = Math.min(-5, Math.floor(Math.min(numM1, numM2, qIneqTestX) - 1));
    const maxVal = Math.max(5, Math.ceil(Math.max(numM1, numM2, qIneqTestX) + 1));
    return { min: minVal, max: maxVal };
  });

  let testTerm1 = $derived(qIneqTestX - numM1);
  let testTerm2 = $derived(qIneqTestX - numM2);
  let testProd = $derived(qIneqA * testTerm1 * testTerm2);

  let testSatisfies = $derived.by(() => {
    if (qIneqOp === '<') return testProd < 0;
    if (qIneqOp === '<=') return testProd <= 0;
    if (qIneqOp === '>') return testProd > 0;
    return testProd >= 0;
  });

  let solutionText = $derived.by(() => {
    const { r1, r2 } = qIneqRoots;
    if (r1 === r2) {
      if (qIneqOp === '<') return '∅';
      if (qIneqOp === '<=') return `{${r1}}`;
      if (qIneqOp === '>') return `x ≠ ${r1}`;
      return 'ℝ';
    }
    if (qIneqOp === '<') return `(${r1}, ${r2})`;
    if (qIneqOp === '<=') return `[${r1}, ${r2}]`;
    if (qIneqOp === '>') return `(-∞, ${r1}) ∪ (${r2}, ∞)`;
    return `(-∞, ${r1}] ∪ [${r2}, ∞)`;
  });
</script>

<div class="week3-studio flex h-[calc(100vh-80px)] max-h-[820px] min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Selection Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W3 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="linear">Linear Equations</option>
      <option value="system">Systems of Equations</option>
      <option value="quadratic">Quadratic Equations</option>
      <option value="absolute">Hitbox & Abs Inequality</option>
      <option value="quadineq">Quadratic Inequalities</option>
    </select>
  </div>

  <!-- Desktop Navigation Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 3 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Equations & Inequalities</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl">
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'linear' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'linear')}
      >
        <LineChart size={15} /> Linear
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'system' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'system')}
      >
        <Layers size={15} /> Systems
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'quadratic' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'quadratic')}
      >
        <Variable size={15} /> Quadratics
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'absolute' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'absolute')}
      >
        <Gamepad2 size={15} /> Hitboxes
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'quadineq' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'quadineq')}
      >
        <Sliders size={15} /> Quad Inequalities
      </button>
    </div>
  </div>

  <!-- Main Active Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: LINEAR EQUATIONS -->
    {#if activeTab === 'linear'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- Controls Column -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Equation Setup</span>
              <div class="join border border-base-300 rounded-xl overflow-hidden">
                <button
                  class={`join-item btn btn-xs ${linMode === 'single' ? 'btn-primary' : 'btn-ghost'}`}
                  onclick={() => (linMode = 'single')}
                >
                  ax + b = c
                </button>
                <button
                  class={`join-item btn btn-xs ${linMode === 'both' ? 'btn-primary' : 'btn-ghost'}`}
                  onclick={() => (linMode = 'both')}
                >
                  ax + b = cx + d
                </button>
              </div>
            </div>

            <!-- Inputs -->
            <div class="space-y-3 font-mono text-sm">
              <div class="flex items-center gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300">
                <span class="w-8 font-bold text-info">a:</span>
                <input type="range" min="-10" max="10" step="1" class="range range-xs range-info flex-1" bind:value={linA} />
                <span class="w-8 text-right font-bold">{linA}</span>
              </div>
              <div class="flex items-center gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300">
                <span class="w-8 font-bold text-info">b:</span>
                <input type="range" min="-20" max="20" step="1" class="range range-xs range-info flex-1" bind:value={linB} />
                <span class="w-8 text-right font-bold">{linB}</span>
              </div>

              {#if linMode === 'both'}
                <div class="flex items-center gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300">
                  <span class="w-8 font-bold text-secondary">c:</span>
                  <input type="range" min="-10" max="10" step="1" class="range range-xs range-secondary flex-1" bind:value={linC} />
                  <span class="w-8 text-right font-bold">{linC}</span>
                </div>
                <div class="flex items-center gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300">
                  <span class="w-8 font-bold text-secondary">d:</span>
                  <input type="range" min="-20" max="20" step="1" class="range range-xs range-secondary flex-1" bind:value={linD} />
                  <span class="w-8 text-right font-bold">{linD}</span>
                </div>
              {:else}
                <div class="flex items-center gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300">
                  <span class="w-8 font-bold text-secondary">c:</span>
                  <input type="range" min="-20" max="20" step="1" class="range range-xs range-secondary flex-1" bind:value={linD} />
                  <span class="w-8 text-right font-bold">{linD}</span>
                </div>
              {/if}
            </div>

            <!-- Algebraic Steps Card -->
            <div class="mt-4 rounded-xl bg-base-100 p-3.5 border border-base-300">
              <span class="text-xs font-bold text-base-content/60 uppercase">Algebraic Manipulation</span>
              <div class="mt-2 space-y-1.5 font-mono text-sm">
                {#if linMode === 'single'}
                  <div>{linA}x {linB >= 0 ? `+ ${linB}` : `- ${Math.abs(linB)}`} = {linD}</div>
                  <div class="text-xs text-base-content/60">→ {linA}x = {linD} - ({linB}) = {linD - linB}</div>
                  {#if linA !== 0}
                    <div class="font-bold text-success">x = ({linD - linB}) / {linA} = {linSol.val?.toFixed(2)}</div>
                  {:else}
                    <div class="font-bold text-error">No unique solution (a=0)</div>
                  {/if}
                {:else}
                  <div>{linA}x {linB >= 0 ? `+ ${linB}` : `- ${Math.abs(linB)}`} = {linC}x {linD >= 0 ? `+ ${linD}` : `- ${Math.abs(linD)}`}</div>
                  <div class="text-xs text-base-content/60">→ ({linA} - {linC})x = {linD} - ({linB})</div>
                  <div class="text-xs text-base-content/60">→ {linA - linC}x = {linD - linB}</div>
                  {#if linA - linC !== 0}
                    <div class="font-bold text-success">x = {linD - linB} / {linA - linC} = {linSol.val?.toFixed(2)}</div>
                  {:else}
                    <div class="font-bold text-error">{linB === linD ? 'Infinitely Many Solutions' : 'No Solution (Parallel)'}</div>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Graph Column -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-base-content/70">Geometrical View (Lines & Intersection)</span>
            {#if linSol.type === 'unique'}
              <span class="badge badge-success badge-sm font-mono">x = {linSol.val?.toFixed(2)}</span>
            {/if}
          </div>

          <!-- SVG Graph -->
          <div class="relative w-full h-[280px] bg-base-200/40 rounded-xl overflow-hidden border border-base-200 flex items-center justify-center">
            <svg viewBox={`0 0 ${linWidth} ${linHeight}`} class="w-full h-full">
              <!-- Grid lines -->
              {#each Array(15) as _, i}
                {@const gx = (i - 7) * 2}
                <line x1={toSvgX(gx)} y1="0" x2={toSvgX(gx)} y2={linHeight} stroke="currentColor" stroke-opacity="0.08" />
              {/each}
              {#each Array(11) as _, i}
                {@const gy = (i - 5) * 2}
                <line x1="0" y1={toSvgY(gy)} x2={linWidth} y2={toSvgY(gy)} stroke="currentColor" stroke-opacity="0.08" />
              {/each}

              <!-- Axes -->
              <line x1="0" y1={linCenterY} x2={linWidth} y2={linCenterY} stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
              <line x1={linCenterX} y1="0" x2={linCenterX} y2={linHeight} stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />

              <!-- Line 1: y = a*x + b -->
              {#if true}
                {@const l1y1 = linA * (-15) + linB}
                {@const l1y2 = linA * 15 + linB}
                <line x1={toSvgX(-15)} y1={toSvgY(l1y1)} x2={toSvgX(15)} y2={toSvgY(l1y2)} stroke="#0284c7" stroke-width="2.5" />
              {/if}

              <!-- Line 2: y = c*x + d or y = c -->
              {#if true}
                {@const cVal = linMode === 'both' ? linC : 0}
                {@const l2y1 = cVal * (-15) + linD}
                {@const l2y2 = cVal * 15 + linD}
                <line x1={toSvgX(-15)} y1={toSvgY(l2y1)} x2={toSvgX(15)} y2={toSvgY(l2y2)} stroke="#d97706" stroke-width="2.5" stroke-dasharray={linMode === 'single' ? '4 4' : 'none'} />
              {/if}

              <!-- Intersection Point -->
              {#if linSol.type === 'unique' && linSol.val !== null}
                {@const ix = linSol.val}
                {@const iy = linA * ix + linB}
                <g transform={`translate(${toSvgX(ix)}, ${toSvgY(iy)})`}>
                  <circle r="7" fill="#22c55e" opacity="0.3" class="animate-ping" />
                  <circle r="5" fill="#22c55e" stroke="#ffffff" stroke-width="2" />
                  <text y="-10" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">
                    ({ix.toFixed(1)}, {iy.toFixed(1)})
                  </text>
                </g>
              {/if}
            </svg>
          </div>

          <div class="mt-2 flex items-center justify-center gap-6 text-xs font-semibold">
            <span class="flex items-center gap-1.5 text-info"><span class="w-3 h-3 rounded-full bg-info inline-block"></span> y = {linA}x {linB >= 0 ? `+ ${linB}` : linB}</span>
            <span class="flex items-center gap-1.5 text-warning"><span class="w-3 h-3 rounded-full bg-warning inline-block"></span> {linMode === 'both' ? `y = ${linC}x ${linD >= 0 ? `+ ${linD}` : linD}` : `y = ${linD}`}</span>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 2: SYSTEM OF EQUATIONS -->
    {#if activeTab === 'system'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- System Controls -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Presets</span>
              <div class="flex gap-1">
                <button class="btn btn-xs btn-outline" onclick={() => applySysPreset('unique')}>1 Solution</button>
                <button class="btn btn-xs btn-outline" onclick={() => applySysPreset('none')}>No Sol</button>
                <button class="btn btn-xs btn-outline" onclick={() => applySysPreset('infinite')}>Inf Sol</button>
              </div>
            </div>

            <!-- Equations Input Cards -->
            <div class="space-y-3 font-mono text-xs">
              <!-- Eq 1 -->
              <div class="p-2.5 bg-base-100 rounded-xl border-l-4 border-l-info border border-base-300">
                <div class="font-bold text-info mb-1">Eq 1: {sysA1}x + {sysB1}y = {sysC1}</div>
                <div class="grid grid-cols-3 gap-2">
                  <label class="flex flex-col">a1: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysA1} /></label>
                  <label class="flex flex-col">b1: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysB1} /></label>
                  <label class="flex flex-col">c1: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysC1} /></label>
                </div>
              </div>

              <!-- Eq 2 -->
              <div class="p-2.5 bg-base-100 rounded-xl border-l-4 border-l-secondary border border-base-300">
                <div class="font-bold text-secondary mb-1">Eq 2: {sysA2}x + {sysB2}y = {sysC2}</div>
                <div class="grid grid-cols-3 gap-2">
                  <label class="flex flex-col">a2: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysA2} /></label>
                  <label class="flex flex-col">b2: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysB2} /></label>
                  <label class="flex flex-col">c2: <input type="number" class="input input-xs input-bordered font-bold" bind:value={sysC2} /></label>
                </div>
              </div>
            </div>

            <!-- Solution State Summary -->
            <div class="mt-4 p-3 rounded-xl bg-base-100 border border-base-300">
              <span class="text-xs font-bold text-base-content/60 uppercase">Determinant & Result</span>
              <div class="mt-1 font-mono text-sm">
                <div>Det = (a1)(b2) - (a2)(b1) = <span class="font-bold">{sysSol.det}</span></div>
                {#if sysSol.type === 'unique'}
                  <div class="mt-2 text-success font-bold flex items-center gap-1">
                    <Check size={16} /> Unique Solution: (x = {sysSol.x?.toFixed(2)}, y = {sysSol.y?.toFixed(2)})
                  </div>
                {:else if sysSol.type === 'none'}
                  <div class="mt-2 text-error font-bold flex items-center gap-1">
                    <AlertTriangle size={16} /> No Solution (Parallel Lines)
                  </div>
                {:else}
                  <div class="mt-2 text-purple-600 font-bold flex items-center gap-1">
                    <Sparkles size={16} /> Infinitely Many Solutions (Coincident)
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- 2D System Graph -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-base-content/70">Intersection Visualization</span>
            <span class={`badge ${sysSol.type === 'unique' ? 'badge-success' : sysSol.type === 'none' ? 'badge-error' : 'badge-primary'} badge-sm font-bold uppercase`}>
              {sysSol.type}
            </span>
          </div>

          <div class="relative w-full h-[280px] bg-base-200/40 rounded-xl overflow-hidden border border-base-200 flex items-center justify-center">
            <svg viewBox={`0 0 ${linWidth} ${linHeight}`} class="w-full h-full">
              <!-- Axes -->
              <line x1="0" y1={linCenterY} x2={linWidth} y2={linCenterY} stroke="currentColor" stroke-opacity="0.3" stroke-width="1" />
              <line x1={linCenterX} y1="0" x2={linCenterX} y2={linHeight} stroke="currentColor" stroke-opacity="0.3" stroke-width="1" />

              <!-- Line 1: a1*x + b1*y = c1 => y = (c1 - a1*x)/b1 -->
              {#if sysB1 !== 0}
                {@const sy1 = (sysC1 - sysA1 * (-15)) / sysB1}
                {@const sy2 = (sysC1 - sysA1 * 15) / sysB1}
                <line x1={toSvgX(-15)} y1={toSvgY(sy1)} x2={toSvgX(15)} y2={toSvgY(sy2)} stroke="#0284c7" stroke-width="3" />
              {:else if sysA1 !== 0}
                {@const sx = sysC1 / sysA1}
                <line x1={toSvgX(sx)} y1="0" x2={toSvgX(sx)} y2={linHeight} stroke="#0284c7" stroke-width="3" />
              {/if}

              <!-- Line 2: a2*x + b2*y = c2 -->
              {#if sysB2 !== 0}
                {@const sy1 = (sysC2 - sysA2 * (-15)) / sysB2}
                {@const sy2 = (sysC2 - sysA2 * 15) / sysB2}
                <line x1={toSvgX(-15)} y1={toSvgY(sy1)} x2={toSvgX(15)} y2={toSvgY(sy2)} stroke="#c026d3" stroke-width="2.5" stroke-dasharray="6 4" />
              {:else if sysA2 !== 0}
                {@const sx = sysC2 / sysA2}
                <line x1={toSvgX(sx)} y1="0" x2={toSvgX(sx)} y2={linHeight} stroke="#c026d3" stroke-width="2.5" stroke-dasharray="6 4" />
              {/if}

              <!-- Point of Intersection -->
              {#if sysSol.type === 'unique' && sysSol.x !== null && sysSol.y !== null}
                <g transform={`translate(${toSvgX(sysSol.x)}, ${toSvgY(sysSol.y)})`}>
                  <circle r="6" fill="#22c55e" stroke="#ffffff" stroke-width="2" />
                </g>
              {/if}
            </svg>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 3: QUADRATIC EQUATIONS & 3 METHODS -->
    {#if activeTab === 'quadratic'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- Controls Column -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div>
            <!-- Presets & Method selector -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Method Breakdown</span>
              <div class="flex gap-1">
                <button class="btn btn-xs btn-ghost" onclick={() => applyQuadPreset('integer')}>Integer Roots</button>
                <button class="btn btn-xs btn-ghost" onclick={() => applyQuadPreset('double')}>Double Root</button>
              </div>
            </div>

            <!-- Coefficients -->
            <div class="space-y-2 font-mono text-xs mb-3">
              <div class="flex items-center gap-2 bg-base-100 p-2 rounded-xl border border-base-300">
                <span class="w-6 font-bold">a:</span>
                <input type="range" min="-5" max="5" step="1" class="range range-xs flex-1" bind:value={quadA} />
                <span class="w-6 text-right font-bold">{quadA}</span>
              </div>
              <div class="flex items-center gap-2 bg-base-100 p-2 rounded-xl border border-base-300">
                <span class="w-6 font-bold">b:</span>
                <input type="range" min="-10" max="10" step="1" class="range range-xs flex-1" bind:value={quadB} />
                <span class="w-6 text-right font-bold">{quadB}</span>
              </div>
              <div class="flex items-center gap-2 bg-base-100 p-2 rounded-xl border border-base-300">
                <span class="w-6 font-bold">c:</span>
                <input type="range" min="-10" max="10" step="1" class="range range-xs flex-1" bind:value={quadC} />
                <span class="w-6 text-right font-bold">{quadC}</span>
              </div>
            </div>

            <!-- Method Switcher Tabs -->
            <div class="join w-full border border-base-300 rounded-xl overflow-hidden mb-3">
              <button class={`join-item flex-1 btn btn-xs ${quadMethod === 'formula' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (quadMethod = 'formula')}>1. Formula</button>
              <button class={`join-item flex-1 btn btn-xs ${quadMethod === 'factoring' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (quadMethod = 'factoring')}>2. Factoring</button>
              <button class={`join-item flex-1 btn btn-xs ${quadMethod === 'square' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (quadMethod = 'square')}>3. Square</button>
            </div>

            <!-- Method Detail Content -->
            <div class="p-3 bg-base-100 rounded-xl border border-base-300 font-mono text-xs space-y-1.5">
              {#if quadMethod === 'formula'}
                <div class="font-bold text-primary">Formula: x = (-b ± √(b² - 4ac)) / (2a)</div>
                <div>Discriminant Δ = b² - 4ac = ({quadB})² - 4({quadA})({quadC}) = <span class="font-bold text-secondary">{quadDisc}</span></div>
                {#if quadRoots.type === 'two'}
                  <div class="text-success font-bold">Roots: x₁ = {quadRoots.r1?.toFixed(2)}, x₂ = {quadRoots.r2?.toFixed(2)}</div>
                {:else if quadRoots.type === 'one'}
                  <div class="text-info font-bold">Single Root: x = {quadRoots.r1?.toFixed(2)}</div>
                {:else}
                  <div class="text-error font-bold">Δ &lt; 0 → No Real Roots</div>
                {/if}
              {:else if quadMethod === 'factoring'}
                <div class="font-bold text-primary">Factoring: (x - m₁)(x - m₂) = 0</div>
                <div>Target sum: m₁ + m₂ = -b/a = {(-quadB/quadA).toFixed(2)}</div>
                <div>Target product: m₁ · m₂ = c/a = {(quadC/quadA).toFixed(2)}</div>
                {#if quadRoots.type !== 'complex'}
                  <div class="text-success font-bold mt-1">(x - ({quadRoots.r1?.toFixed(1)}))(x - ({quadRoots.r2?.toFixed(1)})) = 0</div>
                {:else}
                  <div class="text-error font-bold">Cannot factor over Real numbers (Δ &lt; 0)</div>
                {/if}
              {:else}
                <div class="font-bold text-primary">Completing the Square:</div>
                <div>(x + b/2a)² = (b² - 4ac)/(4a²)</div>
                <div>(x + { (quadB/(2*quadA)).toFixed(2) })² = { (quadDisc/(4*quadA*quadA)).toFixed(2) }</div>
                {#if quadDisc >= 0}
                  <div class="text-success font-bold">x = -b/2a ± √(Δ)/2a</div>
                {:else}
                  <div class="text-error font-bold">LHS square cannot equal negative RHS</div>
                {/if}
              {/if}
            </div>
          </div>
        </div>

        <!-- Parabola SVG Visualization -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-base-content/70">Parabola f(x) = {quadA}x² {quadB >= 0 ? `+ ${quadB}` : quadB}x {quadC >= 0 ? `+ ${quadC}` : quadC}</span>
            <span class="text-xs font-mono font-bold text-info">Vertex: ({quadVertex.h.toFixed(1)}, {quadVertex.k.toFixed(1)})</span>
          </div>

          <div class="relative w-full h-[280px] bg-base-200/40 rounded-xl overflow-hidden border border-base-200 flex items-center justify-center">
            <svg viewBox={`0 0 ${linWidth} ${linHeight}`} class="w-full h-full">
              <!-- Axes -->
              <line x1="0" y1={linCenterY} x2={linWidth} y2={linCenterY} stroke="currentColor" stroke-opacity="0.3" stroke-width="1" />
              <line x1={linCenterX} y1="0" x2={linCenterX} y2={linHeight} stroke="currentColor" stroke-opacity="0.3" stroke-width="1" />

              <!-- Parabola Path -->
              {#if true}
                {@const pts = Array(61).fill(0).map((_, i) => {
                  const px = -6 + i * 0.2;
                  const py = quadA * px * px + quadB * px + quadC;
                  return `${toSvgX(px)},${toSvgY(py)}`;
                }).join(' ')}
                <polyline points={pts} fill="none" stroke="#2563eb" stroke-width="3" />
              {/if}

              <!-- Vertex Point -->
              <circle cx={toSvgX(quadVertex.h)} cy={toSvgY(quadVertex.k)} r="5" fill="#ea580c" />

              <!-- Root Points on X axis -->
              {#if quadRoots.type === 'two'}
                <circle cx={toSvgX(quadRoots.r1!)} cy={linCenterY} r="6" fill="#16a34a" stroke="#fff" stroke-width="2" />
                <circle cx={toSvgX(quadRoots.r2!)} cy={linCenterY} r="6" fill="#16a34a" stroke="#fff" stroke-width="2" />
              {:else if quadRoots.type === 'one'}
                <circle cx={toSvgX(quadRoots.r1!)} cy={linCenterY} r="6" fill="#16a34a" stroke="#fff" stroke-width="2" />
              {/if}
            </svg>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 4: MARIO HITBOX & ABSOLUTE VALUE INEQ -->
    {#if activeTab === 'absolute'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- Controls & Mario Story -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Mario vs Koopa Hitbox</span>
              <span class={`badge ${isColliding ? 'badge-error animate-pulse' : 'badge-success'} badge-sm font-bold uppercase`}>
                {isColliding ? '💥 COLLISION!' : '🛡️ SAFE!'}
              </span>
            </div>

            <!-- Position Sliders -->
            <div class="space-y-3 font-mono text-xs">
              <div class="bg-base-100 p-2.5 rounded-xl border border-base-300">
                <div class="flex justify-between font-bold text-red-500 mb-1">
                  <span>Mario Position (x):</span>
                  <span>{marioX.toFixed(1)}</span>
                </div>
                <input type="range" min="-2" max="8" step="0.1" class="range range-xs range-error" bind:value={marioX} />
              </div>

              <div class="bg-base-100 p-2.5 rounded-xl border border-base-300">
                <div class="flex justify-between font-bold text-green-600 mb-1">
                  <span>Koopa Center:</span>
                  <span>{koopaX.toFixed(1)}</span>
                </div>
                <input type="range" min="0" max="6" step="0.1" class="range range-xs range-success" bind:value={koopaX} />
              </div>
            </div>

            <!-- Absolute Value Inequality Breakdown -->
            <div class="mt-4 p-3 rounded-xl bg-base-100 border border-base-300 font-mono text-xs space-y-2">
              <span class="text-xs font-bold text-base-content/60 uppercase">Absolute Distance Formula</span>
              <div>Distance between centers: |x_M - x_K| = |{marioX.toFixed(1)} - {koopaX.toFixed(1)}| = <span class="font-bold text-info">{hitboxDist.toFixed(2)}</span></div>
              <div>Combined Half-Widths: (w_M + w_K) / 2 = ({marioW} + {koopaW})/2 = <span class="font-bold text-warning">{safeThreshold.toFixed(1)}</span></div>
              
              <div class="p-2 rounded-lg bg-base-200/60 font-bold mt-1">
                {#if isColliding}
                  <div class="text-error">|x - {koopaX.toFixed(1)}| &lt; {safeThreshold.toFixed(1)} → Hitboxes Overlap!</div>
                {:else}
                  <div class="text-success">|x - {koopaX.toFixed(1)}| ≥ {safeThreshold.toFixed(1)} → Safe Distance!</div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Canvas / Graphic -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-base-content/70">Real Line Hitbox Overlap</span>
            <span class="text-xs font-mono">Mario [{marioLeft.toFixed(1)}, {marioRight.toFixed(1)}] | Koopa [{koopaLeft.toFixed(1)}, {koopaRight.toFixed(1)}]</span>
          </div>

          <!-- Real Line Graphic -->
          <div class="relative w-full h-[280px] bg-base-200/40 rounded-xl overflow-hidden border border-base-200 flex flex-col items-center justify-center p-4">
            
            <svg viewBox="0 0 400 200" class="w-full h-full">
              <!-- Number line -->
              <line x1="20" y1="120" x2="380" y2="120" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" />
              {#each Array(11) as _, i}
                {@const tickX = 40 + i * 32}
                <line x1={tickX} y1="115" x2={tickX} y2="125" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5" />
                <text x={tickX} y="140" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">{i - 2}</text>
              {/each}

              {#if true}
                <!-- Koopa Hitbox Interval (Green) -->
                {@const kSvgL = 40 + (koopaLeft + 2) * 32}
                {@const kSvgW = koopaW * 32}
                <rect x={kSvgL} y="75" width={kSvgW} height="25" rx="6" fill="#22c55e" opacity="0.4" stroke="#16a34a" stroke-width="2" />
                <text x={kSvgL + kSvgW/2} y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Koopa</text>

                <!-- Mario Hitbox Interval (Red) -->
                {@const mSvgL = 40 + (marioLeft + 2) * 32}
                {@const mSvgW = marioW * 32}
                <rect x={mSvgL} y="40" width={mSvgW} height="25" rx="6" fill="#ef4444" opacity="0.4" stroke="#dc2626" stroke-width="2" />
                <text x={mSvgL + mSvgW/2} y="57" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c">Mario</text>

                <!-- Distance Arrow -->
                {@const kCenterSvg = 40 + (koopaX + 2) * 32}
                {@const mCenterSvg = 40 + (marioX + 2) * 32}
                <line x1={kCenterSvg} y1="160" x2={mCenterSvg} y2="160" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4" />
                <circle cx={kCenterSvg} cy="160" r="4" fill="#0284c7" />
                <circle cx={mCenterSvg} cy="160" r="4" fill="#0284c7" />
                <text x={(kCenterSvg + mCenterSvg)/2} y="178" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">
                  |x_M - x_K| = {hitboxDist.toFixed(1)}
                </text>
              {/if}
            </svg>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 5: QUADRATIC INEQUALITIES & SIGN CHART -->
    {#if activeTab === 'quadineq'}
      {@const toSvgX = (v: number) => {
        const span = xDomain.max - xDomain.min || 1;
        const raw = 85 + ((v - xDomain.min) / span) * 430;
        return Math.max(85, Math.min(515, raw));
      }}
      {@const testSvgX = toSvgX(qIneqTestX)}
      {@const m1SvgX = toSvgX(numM1)}
      {@const m2SvgX = toSvgX(numM2)}
      {@const r1SvgX = toSvgX(qIneqRoots.r1)}
      {@const r2SvgX = toSvgX(qIneqRoots.r2)}

      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in overflow-y-auto pr-1">
        
        <!-- Controls Column -->
        <div class="order-2 md:order-1 md:col-span-4 flex flex-col justify-between gap-3 rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Inequality Operator</span>
              <div class="join border border-base-300 rounded-xl overflow-hidden">
                {#each ['<', '<=', '>', '>='] as op}
                  <button class={`join-item btn btn-xs ${qIneqOp === op ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (qIneqOp = op as any)}>
                    {op}
                  </button>
                {/each}
              </div>
            </div>

            <!-- Roots Text Inputs -->
            <div class="space-y-2.5 font-mono text-xs">
              <div class="bg-base-100 p-2.5 rounded-xl border border-base-300">
                <div class="flex justify-between items-center font-bold text-info mb-1.5">
                  <label for="input-m1">Root m₁:</label>
                  <span class="badge badge-info badge-sm font-mono font-bold">{numM1}</span>
                </div>
                <input
                  id="input-m1"
                  type="number"
                  step="any"
                  class="input input-sm input-bordered w-full font-mono font-bold text-base focus:input-info"
                  bind:value={qIneqM1}
                  placeholder="Enter m₁"
                />
              </div>

              <div class="bg-base-100 p-2.5 rounded-xl border border-base-300">
                <div class="flex justify-between items-center font-bold text-secondary mb-1.5">
                  <label for="input-m2">Root m₂:</label>
                  <span class="badge badge-secondary badge-sm font-mono font-bold">{numM2}</span>
                </div>
                <input
                  id="input-m2"
                  type="number"
                  step="any"
                  class="input input-sm input-bordered w-full font-mono font-bold text-base focus:input-secondary"
                  bind:value={qIneqM2}
                  placeholder="Enter m₂"
                />
              </div>
            </div>

            <!-- Interval Test Result Card -->
            <div class="mt-3 p-3 rounded-xl bg-base-100 border border-base-300 font-mono text-xs space-y-1.5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-base-content/60 uppercase">Evaluation at x = {qIneqTestX.toFixed(1)}</span>
                <span class={`badge badge-xs font-bold ${testSatisfies ? 'badge-success' : 'badge-error'}`}>
                  {testSatisfies ? 'Satisfied' : 'Not Satisfied'}
                </span>
              </div>
              <div class="pt-1 text-[11px]">
                (x - m₁) = ({qIneqTestX.toFixed(1)} - {numM1}) = 
                <span class={testTerm1 >= 0 ? 'text-success font-bold' : 'text-error font-bold'}>
                  {testTerm1 >= 0 ? '+' : ''}{testTerm1.toFixed(1)} ({testTerm1 >= 0 ? '+' : '−'})
                </span>
              </div>
              <div class="text-[11px]">
                (x - m₂) = ({qIneqTestX.toFixed(1)} - {numM2}) = 
                <span class={testTerm2 >= 0 ? 'text-success font-bold' : 'text-error font-bold'}>
                  {testTerm2 >= 0 ? '+' : ''}{testTerm2.toFixed(1)} ({testTerm2 >= 0 ? '+' : '−'})
                </span>
              </div>
              <div class="text-[11px]">
                Product Sign: 
                <span class={testProd > 0 ? 'text-success font-bold' : testProd < 0 ? 'text-error font-bold' : 'font-bold'}>
                  {testProd > 0 ? '(+) × (+) = +' : testProd < 0 ? '(+) × (−) = −' : '0'}
                </span>
              </div>
              
              <div class={`mt-2 p-2 rounded-lg font-bold text-center text-xs ${testSatisfies ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
                {testSatisfies ? '✅ x satisfies inequality' : '❌ x does NOT satisfy inequality'}
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Column -->
        <div class="order-1 md:order-2 md:col-span-8 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-3.5 shadow-inner">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-base-content/80 uppercase tracking-wide">Sign Charts</span>
              <span class="badge badge-neutral badge-xs font-mono">(x - m₁)(x - m₂) {qIneqOp} 0</span>
            </div>
            <span class="text-xs font-mono font-bold text-primary">
              Solution: {solutionText}
            </span>
          </div>

          <!-- Interactive Test Point Slider Bar -->
          <div class="bg-base-200/50 p-2.5 rounded-xl border border-base-200 mb-2">
            <div class="flex items-center justify-between text-xs font-bold mb-1">
              <span class="text-warning flex items-center gap-1.5">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-warning"></span>
                Test Point (x):
              </span>
              <span class="font-mono text-xs px-2 py-0.5 rounded bg-warning/20 text-warning font-black">
                {qIneqTestX.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={xDomain.min}
              max={xDomain.max}
              step="0.1"
              class="range range-xs range-warning w-full cursor-pointer"
              bind:value={qIneqTestX}
            />
            <div class="flex justify-between text-[10px] text-base-content/40 font-mono mt-0.5">
              <span>{xDomain.min}</span>
              <span>0</span>
              <span>{xDomain.max}</span>
            </div>
          </div>

          <!-- SVG Stacked Charts Area -->
          <div class="relative w-full h-[270px] bg-base-200/30 rounded-xl overflow-hidden border border-base-200 p-1 flex items-center justify-center">
            <svg viewBox="0 0 540 250" class="w-full h-full select-none">
              <!-- Grid line markers for domain -->
              <line x1="85" y1="15" x2="85" y2="235" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />
              <line x1="515" y1="15" x2="515" y2="235" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />
              <line x1={toSvgX(0)} y1="15" x2={toSvgX(0)} y2="235" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="2 2" />

              <!-- Test Point Vertical Guide across all 3 charts -->
              <line x1={testSvgX} y1="18" x2={testSvgX} y2="238" stroke="#eab308" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.85" />
              <text x={testSvgX} y="14" text-anchor="middle" font-size="9" font-weight="bold" fill="#ca8a04" font-family="monospace">x={qIneqTestX.toFixed(1)}</text>

              <!-- ============================================== -->
              <!-- CHART 1: (x - m₁) -->
              <!-- ============================================== -->
              <!-- Label -->
              <text x="12" y="44" font-size="11" font-weight="bold" fill="#0284c7" font-family="monospace">(x - m₁)</text>
              
              <!-- Real Line 1 -->
              <line x1="85" y1="40" x2="515" y2="40" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" />
              
              <!-- Zones for (x - m₁) -->
              <!-- Left of m1 (-) -->
              <rect x="85" y="24" width={Math.max(0, m1SvgX - 85)} height="32" fill="#ef4444" opacity="0.15" rx="3" />
              <text x={(85 + m1SvgX) / 2} y="44" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">−</text>
              
              <!-- Right of m1 (+) -->
              <rect x={m1SvgX} y="24" width={Math.max(0, 515 - m1SvgX)} height="32" fill="#22c55e" opacity="0.15" rx="3" />
              <text x={(m1SvgX + 515) / 2} y="44" text-anchor="middle" font-size="13" font-weight="bold" fill="#16a34a">+</text>
              
              <!-- Root m1 tick & circle -->
              <line x1={m1SvgX} y1="20" x2={m1SvgX} y2="58" stroke="#0284c7" stroke-width="2" />
              <circle cx={m1SvgX} cy="40" r="5" fill="#0284c7" stroke="#ffffff" stroke-width="1.5" />
              <text x={m1SvgX} y="68" text-anchor="middle" font-size="9" font-weight="bold" fill="#0284c7" font-family="monospace">m₁={numM1}</text>
              
              <!-- Test point on Chart 1 (static circle, no bounce) -->
              <circle cx={testSvgX} cy="40" r="6" fill="#eab308" stroke="#ffffff" stroke-width="2" />
              <text x={testSvgX} y="28" text-anchor="middle" font-size="9" font-weight="bold" fill={testTerm1 >= 0 ? '#16a34a' : '#dc2626'} font-family="monospace">
                {testTerm1 >= 0 ? '(+)' : '(−)'}
              </text>


              <!-- ============================================== -->
              <!-- CHART 2: (x - m₂) -->
              <!-- ============================================== -->
              <!-- Label -->
              <text x="12" y="119" font-size="11" font-weight="bold" fill="#c026d3" font-family="monospace">(x - m₂)</text>
              
              <!-- Real Line 2 -->
              <line x1="85" y1="115" x2="515" y2="115" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" />
              
              <!-- Zones for (x - m₂) -->
              <!-- Left of m2 (-) -->
              <rect x="85" y="99" width={Math.max(0, m2SvgX - 85)} height="32" fill="#ef4444" opacity="0.15" rx="3" />
              <text x={(85 + m2SvgX) / 2} y="119" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">−</text>
              
              <!-- Right of m2 (+) -->
              <rect x={m2SvgX} y="99" width={Math.max(0, 515 - m2SvgX)} height="32" fill="#22c55e" opacity="0.15" rx="3" />
              <text x={(m2SvgX + 515) / 2} y="119" text-anchor="middle" font-size="13" font-weight="bold" fill="#16a34a">+</text>
              
              <!-- Root m2 tick & circle -->
              <line x1={m2SvgX} y1="95" x2={m2SvgX} y2="133" stroke="#c026d3" stroke-width="2" />
              <circle cx={m2SvgX} cy="115" r="5" fill="#c026d3" stroke="#ffffff" stroke-width="1.5" />
              <text x={m2SvgX} y="143" text-anchor="middle" font-size="9" font-weight="bold" fill="#c026d3" font-family="monospace">m₂={numM2}</text>
              
              <!-- Test point on Chart 2 (static circle, no bounce) -->
              <circle cx={testSvgX} cy="115" r="6" fill="#eab308" stroke="#ffffff" stroke-width="2" />
              <text x={testSvgX} y="103" text-anchor="middle" font-size="9" font-weight="bold" fill={testTerm2 >= 0 ? '#16a34a' : '#dc2626'} font-family="monospace">
                {testTerm2 >= 0 ? '(+)' : '(−)'}
              </text>


              <!-- ============================================== -->
              <!-- CHART 3: Product (x - m₁)(x - m₂) -->
              <!-- ============================================== -->
              <!-- Label -->
              <text x="12" y="194" font-size="11" font-weight="bold" fill="currentColor" font-family="monospace">Product</text>
              
              <!-- Real Line 3 -->
              <line x1="85" y1="190" x2="515" y2="190" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" />
              
              {#if qIneqRoots.r1 < qIneqRoots.r2}
                <!-- Zone 1: (-inf, r1) -> Product is (+) -->
                <rect x="85" y="174" width={Math.max(0, r1SvgX - 85)} height="32" fill={qIneqOp.includes('>') ? '#22c55e' : '#ef4444'} opacity="0.15" rx="3" />
                <text x={(85 + r1SvgX) / 2} y="194" text-anchor="middle" font-size="13" font-weight="bold" fill={qIneqOp.includes('>') ? '#16a34a' : '#dc2626'}>+</text>
                <text x={(85 + r1SvgX) / 2} y="222" text-anchor="middle" font-size="8" opacity="0.65" font-family="monospace">(-∞, {qIneqRoots.r1})</text>

                <!-- Zone 2: (r1, r2) -> Product is (-) -->
                <rect x={r1SvgX} y="174" width={Math.max(0, r2SvgX - r1SvgX)} height="32" fill={qIneqOp.includes('<') ? '#22c55e' : '#ef4444'} opacity="0.15" rx="3" />
                <text x={(r1SvgX + r2SvgX) / 2} y="194" text-anchor="middle" font-size="13" font-weight="bold" fill={qIneqOp.includes('<') ? '#16a34a' : '#dc2626'}>−</text>
                <text x={(r1SvgX + r2SvgX) / 2} y="222" text-anchor="middle" font-size="8" opacity="0.65" font-family="monospace">({qIneqRoots.r1}, {qIneqRoots.r2})</text>

                <!-- Zone 3: (r2, +inf) -> Product is (+) -->
                <rect x={r2SvgX} y="174" width={Math.max(0, 515 - r2SvgX)} height="32" fill={qIneqOp.includes('>') ? '#22c55e' : '#ef4444'} opacity="0.15" rx="3" />
                <text x={(r2SvgX + 515) / 2} y="194" text-anchor="middle" font-size="13" font-weight="bold" fill={qIneqOp.includes('>') ? '#16a34a' : '#dc2626'}>+</text>
                <text x={(r2SvgX + 515) / 2} y="222" text-anchor="middle" font-size="8" opacity="0.65" font-family="monospace">({qIneqRoots.r2}, ∞)</text>

                <!-- Root ticks on product line -->
                <line x1={r1SvgX} y1="170" x2={r1SvgX} y2="208" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" />
                <line x1={r2SvgX} y1="170" x2={r2SvgX} y2="208" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" />

                <!-- Root circles (solid if inclusive <= / >=, hollow if strict < / >) -->
                {#if qIneqOp === '<=' || qIneqOp === '>='}
                  <circle cx={r1SvgX} cy="190" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" />
                  <circle cx={r2SvgX} cy="190" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" />
                {:else}
                  <circle cx={r1SvgX} cy="190" r="5" fill="#ffffff" stroke="#3b82f6" stroke-width="2" />
                  <circle cx={r2SvgX} cy="190" r="5" fill="#ffffff" stroke="#3b82f6" stroke-width="2" />
                {/if}
              {:else}
                <!-- Equal roots (r1 == r2) -->
                <rect x="85" y="174" width="430" height="32" fill={qIneqOp.includes('>') || qIneqOp === '>=' ? '#22c55e' : '#ef4444'} opacity="0.15" rx="3" />
                <text x="300" y="194" text-anchor="middle" font-size="13" font-weight="bold" fill={qIneqOp.includes('>') || qIneqOp === '>=' ? '#16a34a' : '#dc2626'}>+</text>
                {#if qIneqOp === '<=' || qIneqOp === '>='}
                  <circle cx={r1SvgX} cy="190" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" />
                {:else}
                  <circle cx={r1SvgX} cy="190" r="5" fill="#ffffff" stroke="#3b82f6" stroke-width="2" />
                {/if}
              {/if}

              <!-- Test point on Chart 3 (static circle, no bounce) -->
              <circle cx={testSvgX} cy="190" r="6" fill="#eab308" stroke="#ffffff" stroke-width="2" />
              <text x={testSvgX} y="178" text-anchor="middle" font-size="9" font-weight="bold" fill={testProd > 0 ? '#16a34a' : testProd < 0 ? '#dc2626' : '#ca8a04'} font-family="monospace">
                {testProd > 0 ? '(+)' : testProd < 0 ? '(−)' : '0'}
              </text>
            </svg>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
