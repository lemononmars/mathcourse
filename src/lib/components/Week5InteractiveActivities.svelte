<script lang="ts">
  import Flame from '@lucide/svelte/icons/flame';
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import Binary from '@lucide/svelte/icons/binary';
  import Calculator from '@lucide/svelte/icons/calculator';
  import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
  import Volume2 from '@lucide/svelte/icons/volume-2';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Layers from '@lucide/svelte/icons/layers';

  type TabType = 'growth' | 'curve' | 'eq_exp' | 'log_def' | 'log_rules' | 'eq_log' | 'game_audio';
  let activeTab = $state<TabType>('growth');

  // ==========================================
  // TAB 1: RAPID GROWTH & LILYPAD PARADOX
  // ==========================================
  let pondDay = $state(15);
  let growthMode = $state<'exponential' | 'linear'>('exponential');
  const maxPondCells = 64; // visual 8x8 grid

  // In 30 days, lotus doubles every day: total capacity is 2^29 units on day 30
  // Normalized visual cells for day 1..30:
  let lilypadsFilled = $derived.by(() => {
    if (growthMode === 'linear') {
      // Linear fills ~2.13 cells per day up to 64 on day 30
      return Math.min(maxPondCells, Math.max(1, Math.round((pondDay / 30) * maxPondCells)));
    } else {
      // Exponential doubling:
      // Day 30 is 64 cells. Day 29 is 32 cells (half full!). Day 28 is 16 cells. Day 27 is 8 cells...
      const exponent = pondDay - 30; // 0 at day 30, -1 at day 29, -2 at day 28...
      const rawCount = Math.pow(2, exponent) * maxPondCells;
      if (pondDay < 25) return 1; // tiny trace until last few days
      return Math.min(maxPondCells, Math.max(1, Math.round(rawCount)));
    }
  });

  let pondPercentage = $derived.by(() => {
    if (growthMode === 'linear') {
      return ((pondDay / 30) * 100).toFixed(1);
    }
    // Exponential: 2^(day-30) * 100%
    if (pondDay >= 30) return '100.0';
    const pct = Math.pow(2, pondDay - 30) * 100;
    return pct < 0.01 ? '< 0.01' : pct.toFixed(2);
  });

  // Chessboard grains
  let chessSquare = $state(12);
  let wheatGrains = $derived(BigInt(2) ** BigInt(chessSquare - 1));
  let wheatComparison = $derived.by(() => {
    if (chessSquare <= 5) return 'A tiny pinch in your palm';
    if (chessSquare <= 15) return 'A handful to a few bowlfuls';
    if (chessSquare <= 25) return 'Multiple sack loads (~16.7 million grains)';
    if (chessSquare <= 35) return 'A fleet of cargo trucks (~17 billion grains)';
    if (chessSquare <= 50) return 'Exceeds entire annual global wheat harvest!';
    return 'Astronomical: ~18 quintillion grains (covers the entire Earth in wheat!)';
  });

  // ==========================================
  // TAB 2: EXPONENTIAL CURVE & LEVEL SCALING
  // ==========================================
  let curveA = $state(2);
  let curveB = $state(1.5);
  let curveC = $state(0);
  let levelTarget = $state(10);
  let scalingComparison = $state<'exponential' | 'rpg_benchmark'>('exponential');

  // Curve sampling for SVG graph (-3 <= x <= 8)
  const svgW = 440;
  const svgH = 260;
  const xMin = -2;
  const xMax = 8;
  const yMin = -5;
  const yMax = 35;

  function toSvgX(x: number) {
    return ((x - xMin) / (xMax - xMin)) * svgW;
  }
  function toSvgY(y: number) {
    return svgH - ((y - yMin) / (yMax - yMin)) * svgH;
  }

  let expCurvePath = $derived.by(() => {
    const points: string[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = curveA * Math.pow(curveB, x) + curveC;
      const clampedY = Math.max(yMin - 10, Math.min(yMax + 20, y));
      points.push(`${toSvgX(x).toFixed(1)},${toSvgY(clampedY).toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  });

  // RPG Benchmark curves: Linear (100x), Quadratic (15x^2), Exponential (100 * 1.35^x)
  let rpgLinearPath = $derived.by(() => {
    const p1 = `${toSvgX(0)},${toSvgY(2)}`;
    const p2 = `${toSvgX(8)},${toSvgY(2 + 8 * 3)}`;
    return `M ${p1} L ${p2}`;
  });

  let rpgQuadPath = $derived.by(() => {
    const points: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = 0 + (i / 40) * 8;
      const y = 0.5 * x * x;
      points.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  });

  let curveTypeValue = $derived(
    curveB > 1 ? 'Explosive Growth' : curveB === 1 ? 'Constant Linear' : 'Exponential Decay'
  );

  // ==========================================
  // TAB 3: EXPONENTIAL EQUATIONS SOLVER
  // ==========================================
  type ExpEqPreset = 'same_base_1' | 'same_base_2' | 'factoring' | 'quadratic_sub';
  let expEqPreset = $state<ExpEqPreset>('same_base_1');

  let expEqData = $derived.by(() => {
    if (expEqPreset === 'same_base_1') {
      return {
        title: '4ˣ = 1/64',
        strategy: 'Same Base Strategy',
        step1: 'Rewrite RHS with base 4 (or 2): 1/64 = 1/(4³) = 4⁻³',
        step2: 'Equate exponents: 4ˣ = 4⁻³ ⟹ x = -3',
        solution: 'x = -3',
        lhsFn: (x: number) => Math.pow(4, x),
        rhsVal: 1 / 64,
        targetX: -3,
        plotRange: { minX: -4, maxX: 1, minY: -0.1, maxY: 4 }
      };
    } else if (expEqPreset === 'same_base_2') {
      return {
        title: '9ˣ⁺¹ = 27',
        strategy: 'Common Base Conversion',
        step1: 'Rewrite both sides with base 3: (3²)ˣ⁺¹ = 3³',
        step2: 'Simplify: 3²⁽ˣ⁺¹⁾ = 3³ ⟹ 2(x + 1) = 3 ⟹ 2x + 2 = 3',
        solution: 'x = 1/2 = 0.5',
        lhsFn: (x: number) => Math.pow(9, x + 1),
        rhsVal: 27,
        targetX: 0.5,
        plotRange: { minX: -1, maxX: 1.5, minY: -5, maxY: 60 }
      };
    } else if (expEqPreset === 'factoring') {
      return {
        title: '2ˣ + 2ˣ⁺¹ = 96',
        strategy: 'Factoring Common Power',
        step1: 'Decompose: 2ˣ⁺¹ = 2 · 2ˣ. Then factor out 2ˣ: 2ˣ(1 + 2) = 96',
        step2: 'Simplify: 3 · 2ˣ = 96 ⟹ 2ˣ = 32 = 2⁵',
        solution: 'x = 5',
        lhsFn: (x: number) => Math.pow(2, x) + Math.pow(2, x + 1),
        rhsVal: 96,
        targetX: 5,
        plotRange: { minX: 1, maxX: 6, minY: -10, maxY: 150 }
      };
    } else {
      return {
        title: '4ˣ - 12(2ˣ) + 32 = 0',
        strategy: 'Quadratic Substitution (u = 2ˣ)',
        step1: 'Substitute u = 2ˣ: u² - 12u + 32 = 0 ⟹ (u - 4)(u - 8) = 0',
        step2: 'Roots for u: u = 4 or u = 8. Re-substitute: 2ˣ = 4 (x=2) and 2ˣ = 8 (x=3)',
        solution: 'x = 2 and x = 3',
        lhsFn: (x: number) => Math.pow(4, x) - 12 * Math.pow(2, x) + 32,
        rhsVal: 0,
        targetX: 2.5, // dual roots
        plotRange: { minX: 0.5, maxX: 4, minY: -10, maxY: 25 }
      };
    }
  });

  // ==========================================
  // TAB 4: LOGARITHM EXPLORER & SCALE COMPACTOR
  // ==========================================
  let logInput = $state(100);
  let logBase = $state(10);
  let logValue = $derived(
    logInput > 0 ? (Math.log(logInput) / Math.log(logBase)).toFixed(3) : 'Undefined'
  );

  // Dual Scale Compactor mapping (1 to 1,000,000)
  let compactorVal = $state(1000);
  let compactorLog10 = $derived(Math.log10(compactorVal).toFixed(2));

  // ==========================================
  // TAB 5: LOG PROPERTIES & SLIDE RULE
  // ==========================================
  let propA = $state(8);
  let propB = $state(4);
  let propRuleMode = $state<'product' | 'quotient'>('product');

  let logPropBase = 2;
  let lenA = $derived(Math.log2(propA));
  let lenB = $derived(Math.log2(propB));
  let lenCombined = $derived(propRuleMode === 'product' ? lenA + lenB : lenA - lenB);
  let resValue = $derived(propRuleMode === 'product' ? propA * propB : propA / propB);

  // ==========================================
  // TAB 6: LOG EQUATIONS & DOMAIN HAZARD LAB
  // ==========================================
  type LogEqPreset = 'sum_extraneous' | 'sub_quotient' | 'simple_exp';
  let logEqPreset = $state<LogEqPreset>('sum_extraneous');

  let logEqData = $derived.by(() => {
    if (logEqPreset === 'sum_extraneous') {
      return {
        equation: 'log₁₀(x) + log₁₀(x - 3) = 1',
        domainNotice: 'Forbidden Domain: x ≤ 3 (Arguments x and x-3 must be strictly > 0)',
        hazardLimit: 3,
        algebraSteps: [
          'Domain requirement: x > 0 and x - 3 > 0 ⟹ x > 3.',
          'Combine product: log₁₀(x(x - 3)) = 1 ⟹ x² - 3x = 10¹ = 10',
          'Solve quadratic: x² - 3x - 10 = 0 ⟹ (x - 5)(x + 2) = 0',
          'Algebraic roots: x = 5 or x = -2'
        ],
        extraneousX: -2,
        validX: 5,
        targetY: 1,
        explanation: 'x = -2 is in the Hazard Zone! log₁₀(-2) is undefined for real numbers.'
      };
    } else if (logEqPreset === 'sub_quotient') {
      return {
        equation: 'log₃(x + 4) - log₃(x) = 2',
        domainNotice: 'Forbidden Domain: x ≤ 0 (Arguments x+4 > 0 and x > 0 ⟹ x > 0)',
        hazardLimit: 0,
        algebraSteps: [
          'Domain requirement: x > 0.',
          'Combine quotient: log₃((x + 4)/x) = 2 ⟹ (x + 4)/x = 3² = 9',
          'Cross multiply: x + 4 = 9x ⟹ 8x = 4 ⟹ x = 1/2',
          'Check domain: 0.5 > 0 ✓ (Valid Solution!)'
        ],
        extraneousX: null,
        validX: 0.5,
        targetY: 2,
        explanation: 'Argument remains positive everywhere in solution domain. Valid root at x = 0.5.'
      };
    } else {
      return {
        equation: 'log₂(x + 3) = 5',
        domainNotice: 'Forbidden Domain: x ≤ -3 (Argument x+3 > 0 ⟹ x > -3)',
        hazardLimit: -3,
        algebraSteps: [
          'Domain requirement: x > -3.',
          'Convert directly to exponential form: x + 3 = 2⁵ = 32',
          'Isolate x: x = 32 - 3 = 29',
          'Check domain: 29 > -3 ✓ (Valid Solution!)'
        ],
        extraneousX: null,
        validX: 29,
        targetY: 5,
        explanation: 'Simple one-to-one conversion directly yields the integer root x = 29.'
      };
    }
  });

  // ==========================================
  // TAB 7: GAME AUDIO DECIBELS & DIGITS STUDIO
  // ==========================================
  let soundIntensityRatio = $state(1000); // I / I0 from 1 to 10^12
  let decibels = $derived((10 * Math.log10(Math.max(1, soundIntensityRatio))).toFixed(1));

  let audioPerceptionContext = $derived.by(() => {
    const db = Number(decibels);
    if (db < 25) return { label: 'Rustling Leaves / Whisper', color: 'text-info', bar: 15 };
    if (db < 50) return { label: 'Quiet Library / Ambient Studio', color: 'text-success', bar: 35 };
    if (db < 70) return { label: 'Normal Speech / UI Foley Click', color: 'text-primary', bar: 55 };
    if (db < 90) return { label: 'Heavy City Traffic / Combat SFX', color: 'text-warning', bar: 75 };
    if (db < 115) return { label: 'Rock Concert / Explosion Wave', color: 'text-error', bar: 90 };
    return { label: 'Jet Engine Takeoff (Pain Threshold!)', color: 'text-error font-black', bar: 100 };
  });

  // Digits counter
  let gameBigBase = $state(2);
  let gameBigExp = $state(64);
  let totalDigits = $derived(
    Math.floor(gameBigExp * Math.log10(gameBigBase)) + 1
  );
  let intTypeWarning = $derived.by(() => {
    if (totalDigits <= 10) return { type: '32-Bit Int Safe', desc: 'Fits inside standard signed int32 (Max ~2.14B).', badge: 'badge-success' };
    if (totalDigits <= 19) return { type: '64-Bit BigInt Safe', desc: 'Fits inside int64 / long (Max ~9.22 Quintillion).', badge: 'badge-warning' };
    return { type: 'Scientific Notation / BigNum Needed', desc: 'Exceeds native 64-bit int! Idle games require custom BigNumber library.', badge: 'badge-error' };
  });
</script>

<div class="week5-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown Selector -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W5 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="growth">1. Lilypad Doubling & Chessboard</option>
      <option value="curve">2. Exponential Curve & Level Scaling</option>
      <option value="eq_exp">3. Exponential Equations Lab</option>
      <option value="log_def">4. Logarithm & Scale Compactor</option>
      <option value="log_rules">5. The Slide Rule (Log Laws)</option>
      <option value="eq_log">6. Log Equations & Domain Hazard</option>
      <option value="game_audio">7. Game Audio dB & Digits Studio</option>
    </select>
  </div>

  <!-- Desktop Tab Pills -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold tracking-wider uppercase">Week 5 Lab</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Exponential & Logarithms Studio</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'growth' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'growth')}>
        <Flame size={14} /> Doubling
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'curve' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'curve')}>
        <TrendingUp size={14} /> Curves & RPG
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'eq_exp' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'eq_exp')}>
        <Crosshair size={14} /> Exp Solver
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'log_def' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'log_def')}>
        <Binary size={14} /> Log Compactor
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'log_rules' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'log_rules')}>
        <Layers size={14} /> Slide Rule
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'eq_log' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'eq_log')}>
        <AlertTriangle size={14} /> Log Equations
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'game_audio' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'game_audio')}>
        <Volume2 size={14} /> Audio & Digits
      </button>
    </div>
  </div>

  <!-- Content Container -->
  <div class="flex-1 overflow-y-auto py-3 px-1">

    <!-- ============================================================== -->
    <!-- LAB 1: RAPID GROWTH & LILYPAD PARADOX -->
    <!-- ============================================================== -->
    {#if activeTab === 'growth'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls & Thought Experiment -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">The 30-Day Lilypad Paradox</span>
              <div class="btn-group">
                <button class={`btn btn-xs ${growthMode === 'exponential' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (growthMode = 'exponential')}>Exponential (×2)</button>
                <button class={`btn btn-xs ${growthMode === 'linear' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (growthMode = 'linear')}>Linear (+k)</button>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span>Simulation Day:</span>
                <span class="text-primary font-mono text-sm">Day {pondDay} / 30</span>
              </div>
              <input type="range" min="1" max="30" bind:value={pondDay} class="range range-xs range-primary" />
              <div class="flex justify-between text-[10px] text-base-content/50 font-mono">
                <span>Day 1 (Empty)</span>
                <span>Day 29 (Half Full!)</span>
                <span>Day 30 (Full)</span>
              </div>
            </div>

            <div class="p-3.5 bg-base-100 rounded-xl border border-base-300 text-xs space-y-2">
              <div class="flex items-center gap-2 font-black text-warning">
                <AlertTriangle size={15} />
                <span>Exponential Blindspot</span>
              </div>
              <p class="text-base-content/80 leading-relaxed">
                Human brains naturally assume linear progression. On <strong>Day 29</strong>, the pond looks only <strong>50% full</strong>, giving a false sense of security. On Day 30, it completely suffocates the lake in one final double!
              </p>
            </div>

            <!-- Chessboard Sub-Lab -->
            <div class="pt-2 border-t border-base-300/80 space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-secondary">Wheat on Chessboard Square: #{chessSquare}</span>
                <span class="font-mono text-secondary">2^{chessSquare - 1}</span>
              </div>
              <input type="range" min="1" max="64" bind:value={chessSquare} class="range range-xs range-secondary" />
              <p class="text-[11px] text-base-content/70 italic font-medium">"{wheatComparison}"</p>
            </div>
          </div>
        </div>

        <!-- Visual Pond & Board Display -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between">
            <span class="text-xs uppercase font-black tracking-wider text-base-content/60">Pond Surface Coverage: {pondPercentage}%</span>
            <span class="badge {pondDay === 29 ? 'badge-warning font-bold animate-pulse' : pondDay === 30 ? 'badge-error font-black' : 'badge-ghost'}">
              {pondDay === 30 ? '100% OVERFLOW' : pondDay === 29 ? '50% HALF FULL' : `${lilypadsFilled} / 64 Cells`}
            </span>
          </div>

          <!-- Visual 8x8 Lake Grid -->
          <div class="grid grid-cols-8 gap-1.5 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 my-4 max-w-[320px] w-full aspect-square">
            {#each Array(maxPondCells) as _, i}
              <div
                class="rounded-md transition-all duration-300 flex items-center justify-center {i < lilypadsFilled ? (pondDay >= 30 ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 scale-105' : 'bg-emerald-400') : 'bg-cyan-900/10 border border-cyan-800/20'}"
              >
                {#if i < lilypadsFilled}
                  <span class="text-[10px]">🪷</span>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Bottom readout -->
          <div class="w-full p-3 bg-base-200/60 rounded-xl border border-base-300 flex items-center justify-between text-xs">
            <div>
              <span class="text-base-content/60">Square #{chessSquare} Grains:</span>
              <span class="font-mono font-black text-secondary ml-1 break-all">{wheatGrains.toString()}</span>
            </div>
            <button class="btn btn-ghost btn-xs gap-1" onclick={() => { pondDay = 15; chessSquare = 12; }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 2: EXPONENTIAL CURVE & RPG LEVEL SCALING -->
    <!-- ============================================================== -->
    {:else if activeTab === 'curve'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Control Sliders -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">f(x) = a · bˣ + c</span>
              <span class="badge {curveB > 1 ? 'badge-success' : curveB === 1 ? 'badge-neutral' : 'badge-warning'} font-bold badge-sm">
                {curveTypeValue}
              </span>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Scale Multiplier a = {curveA}</span>
              </div>
              <input type="range" min="0.5" max="5" step="0.5" bind:value={curveA} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Growth Base b = {curveB}</span>
                <span class="text-[11px] font-mono text-base-content/60">{curveB > 1 ? 'b > 1 (Exp Growth)' : '0 < b < 1 (Decay)'}</span>
              </div>
              <input type="range" min="0.2" max="2.5" step="0.1" bind:value={curveB} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Vertical Shift c = {curveC} (Asymptote y = c)</span>
              </div>
              <input type="range" min="-5" max="10" step="1" bind:value={curveC} class="range range-xs" />
            </div>

            <div class="pt-3 border-t border-base-300 space-y-2">
              <span class="text-xs font-bold uppercase text-base-content/70">Compare With RPG Curves</span>
              <div class="grid grid-cols-2 gap-2">
                <button
                  class={`btn btn-xs ${scalingComparison === 'exponential' ? 'btn-primary' : 'btn-outline'}`}
                  onclick={() => (scalingComparison = 'exponential')}
                >
                  Pure Exp Curve
                </button>
                <button
                  class={`btn btn-xs ${scalingComparison === 'rpg_benchmark' ? 'btn-secondary' : 'btn-outline'}`}
                  onclick={() => (scalingComparison = 'rpg_benchmark')}
                >
                  XP Curves (Linear vs Quad)
                </button>
              </div>
              <p class="text-[11px] text-base-content/70">
                {scalingComparison === 'rpg_benchmark' ? 'RPGs use quadratic/exponential curves so mid-game levels require exponentially more monster kills.' : 'Observe the horizontal asymptote at y = c where the curve approaches but never touches.'}
              </p>
            </div>
          </div>
        </div>

        <!-- SVG Curve Graph Visualizer -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div class="w-full flex items-center justify-between text-xs font-bold px-1">
            <span class="font-mono text-primary">f(x) = {curveA} · ({curveB})ˣ {curveC >= 0 ? `+ ${curveC}` : `- ${Math.abs(curveC)}`}</span>
            <span class="text-base-content/50 font-mono">Horizontal Asymptote: y = {curveC}</span>
          </div>

          <!-- Dynamic SVG Plot -->
          <div class="relative w-full aspect-[16/10] max-h-[300px] my-2 bg-base-200/30 rounded-xl border border-base-300 overflow-hidden flex items-center justify-center">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} class="w-full h-full">
              <!-- Grid lines -->
              {#each [-2, 0, 2, 4, 6, 8] as gx}
                <line x1={toSvgX(gx)} y1="0" x2={toSvgX(gx)} y2={svgH} stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />
                <text x={toSvgX(gx)} y={toSvgY(0) + 12} fill="currentColor" opacity="0.4" font-size="9" text-anchor="middle">{gx}</text>
              {/each}
              {#each [0, 10, 20, 30] as gy}
                <line x1="0" y1={toSvgY(gy)} x2={svgW} y2={toSvgY(gy)} stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />
                <text x="12" y={toSvgY(gy) - 3} fill="currentColor" opacity="0.4" font-size="9">{gy}</text>
              {/each}

              <!-- Axis lines -->
              <line x1="0" y1={toSvgY(0)} x2={svgW} y2={toSvgY(0)} stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />
              <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={svgH} stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />

              <!-- Asymptote Line -->
              <line x1="0" y1={toSvgY(curveC)} x2={svgW} y2={toSvgY(curveC)} stroke="#f59e0b" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.8" />

              {#if scalingComparison === 'rpg_benchmark'}
                <!-- Linear benchmark -->
                <path d={rpgLinearPath} fill="none" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="2" />
                <!-- Quadratic benchmark -->
                <path d={rpgQuadPath} fill="none" stroke="#a855f7" stroke-width="2" />
              {/if}

              <!-- Main Exponential Curve -->
              <path d={expCurvePath} fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" />

              <!-- Intercept point (0, a+c) -->
              <circle cx={toSvgX(0)} cy={toSvgY(curveA + curveC)} r="5" fill="#3b82f6" stroke="#fff" stroke-width="2" />
            </svg>
          </div>

          <!-- Legend -->
          <div class="w-full flex items-center justify-between text-[11px] text-base-content/70 px-2 font-medium">
            <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-blue-500 inline-block"></span> Exponential f(x)</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 border-t border-amber-500 border-dashed inline-block"></span> Asymptote y={curveC}</span>
            {#if scalingComparison === 'rpg_benchmark'}
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-purple-500 inline-block"></span> Quadratic x²</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-slate-400 border-dotted border-t inline-block"></span> Linear</span>
            {/if}
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 3: EXPONENTIAL EQUATIONS SOLVER -->
    <!-- ============================================================== -->
    {:else if activeTab === 'eq_exp'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Preset & Strategies -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-3">
            <span class="text-xs font-black uppercase tracking-wider text-primary">Lecture Equation Examples</span>
            <div class="grid grid-cols-1 gap-1.5">
              <button
                class={`btn btn-sm justify-start font-mono ${expEqPreset === 'same_base_1' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (expEqPreset = 'same_base_1')}
              >
                1. 4ˣ = 1/64
              </button>
              <button
                class={`btn btn-sm justify-start font-mono ${expEqPreset === 'same_base_2' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (expEqPreset = 'same_base_2')}
              >
                2. 9ˣ⁺¹ = 27
              </button>
              <button
                class={`btn btn-sm justify-start font-mono ${expEqPreset === 'factoring' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (expEqPreset = 'factoring')}
              >
                3. 2ˣ + 2ˣ⁺¹ = 96
              </button>
              <button
                class={`btn btn-sm justify-start font-mono ${expEqPreset === 'quadratic_sub' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (expEqPreset = 'quadratic_sub')}
              >
                4. 4ˣ - 12(2ˣ) + 32 = 0
              </button>
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 space-y-1.5 text-xs">
              <span class="font-bold text-secondary uppercase tracking-wide text-[10px]">Methodology: {expEqData.strategy}</span>
              <p class="text-base-content/80 font-mono text-[11px]">{expEqData.step1}</p>
              <p class="text-base-content/80 font-mono text-[11px]">{expEqData.step2}</p>
            </div>
          </div>
        </div>

        <!-- Intersection Visualizer -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between">
            <span class="font-mono text-sm font-black text-primary">{expEqData.title}</span>
            <span class="badge badge-success font-mono font-bold">{expEqData.solution}</span>
          </div>

          <!-- Graphic Card -->
          <div class="w-full p-6 bg-base-200/50 rounded-2xl border border-base-300 my-4 flex flex-col items-center justify-center text-center space-y-3">
            <div class="text-xs uppercase font-bold tracking-wider text-base-content/60">Analytical Equivalence</div>
            <div class="text-2xl sm:text-3xl font-mono font-black text-base-content">
              LHS(x) = RHS(x)
            </div>
            <div class="text-sm font-mono text-primary font-bold bg-base-100 px-4 py-2 rounded-xl border border-base-300">
              Solution Intersection: <span class="text-secondary">{expEqData.solution}</span>
            </div>
            <p class="text-xs text-base-content/70 max-w-sm">
              Because exponential functions with base b ≠ 1 are one-to-one (strictly monotonic), if bᵘ = bᵛ, then the powers MUST be identical: u = v.
            </p>
          </div>

          <div class="w-full p-3 bg-base-200/70 rounded-xl border border-base-300 flex items-center justify-between text-xs">
            <span class="text-base-content/70 font-medium">Core Property:</span>
            <span class="font-mono font-bold text-primary">bᵘ = bᵛ ⟺ u = v</span>
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 4: LOGARITHM & SCALE COMPACTOR -->
    <!-- ============================================================== -->
    {:else if activeTab === 'log_def'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Scale Compactor Explorer -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <span class="text-xs font-black uppercase tracking-wider text-primary">The Logarithmic Scale Compactor</span>
            <p class="text-xs text-base-content/80 leading-relaxed">
              Logarithms answer the inverse question: <em>"To what power must base {logBase} be raised to produce x?"</em>
            </p>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Base b = {logBase}</span>
              </div>
              <div class="btn-group w-full">
                <button class={`btn btn-xs flex-1 ${logBase === 2 ? 'btn-primary' : 'btn-outline'}`} onclick={() => (logBase = 2)}>Base 2 (Binary)</button>
                <button class={`btn btn-xs flex-1 ${logBase === 10 ? 'btn-primary' : 'btn-outline'}`} onclick={() => (logBase = 10)}>Base 10 (Decimal)</button>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input Number N:</span>
                <span class="font-mono text-primary font-bold">{compactorVal}</span>
              </div>
              <input type="range" min="1" max="1000000" step="100" bind:value={compactorVal} class="range range-xs range-primary" />
              <div class="flex justify-between text-[10px] text-base-content/50 font-mono">
                <span>1</span>
                <span>1,000</span>
                <span>1,000,000</span>
              </div>
            </div>

            <div class="p-3.5 bg-base-100 rounded-xl border border-base-300 space-y-2 text-xs">
              <span class="font-bold text-primary">Compression Effect:</span>
              <p class="text-base-content/70">
                A massive change of <strong>1,000,000×</strong> on a linear scale is neatly compressed into just <strong>6 units</strong> on a log₁₀ scale!
              </p>
            </div>
          </div>
        </div>

        <!-- Dual Scale Display -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <span class="text-xs uppercase font-black text-base-content/50">Linear vs Logarithmic Space</span>

          <div class="w-full space-y-5 my-auto max-w-md">
            <!-- Linear Ruler -->
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-base-content/70">Linear Space (Runaway):</span>
                <span class="font-mono text-secondary">{compactorVal}</span>
              </div>
              <div class="w-full h-5 bg-base-200 rounded-lg overflow-hidden border border-base-300 p-0.5">
                <div class="h-full bg-secondary transition-all duration-150 rounded" style={`width: ${Math.min(100, Math.max(1, (compactorVal / 1000000) * 100))}%`}></div>
              </div>
              <span class="text-[10px] text-base-content/50">Requires infinite screen width to show high numbers!</span>
            </div>

            <!-- Logarithmic Ruler -->
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-base-content/70">Logarithmic Scale (log₁₀):</span>
                <span class="font-mono text-primary font-black text-sm">{compactorLog10}</span>
              </div>
              <div class="w-full h-5 bg-base-200 rounded-lg overflow-hidden border border-base-300 p-0.5">
                <div class="h-full bg-primary transition-all duration-150 rounded" style={`width: ${(Number(compactorLog10) / 6) * 100}%`}></div>
              </div>
              <div class="flex justify-between text-[10px] font-mono text-base-content/60">
                <span>10⁰ = 0</span>
                <span>10² = 2</span>
                <span>10⁴ = 4</span>
                <span>10⁶ = 6</span>
              </div>
            </div>

            <!-- Output Callout -->
            <div class="text-center p-4 bg-primary/5 rounded-2xl border border-primary/20">
              <div class="text-xs font-bold uppercase tracking-wide text-primary">Inverse Identity</div>
              <div class="text-2xl sm:text-3xl font-mono font-black text-base-content mt-1">
                log₁₀({compactorVal}) = {compactorLog10}
              </div>
              <div class="text-xs font-mono text-base-content/60 mt-1">
                ⟺ 10^{compactorLog10} ≈ {compactorVal}
              </div>
            </div>
          </div>

          <div class="w-full text-center text-xs text-base-content/60 font-mono">
            log_b(x) = y ⟺ bʸ = x (x &gt; 0, b &gt; 0, b ≠ 1)
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 5: THE SLIDE RULE (LOG LAWS) -->
    <!-- ============================================================== -->
    {:else if activeTab === 'log_rules'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Sliders -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">The Slide Rule Principle</span>
              <div class="btn-group">
                <button class={`btn btn-xs ${propRuleMode === 'product' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (propRuleMode = 'product')}>Product Law</button>
                <button class={`btn btn-xs ${propRuleMode === 'quotient' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => (propRuleMode = 'quotient')}>Quotient Law</button>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Value A = {propA} (Length log₂ A = {lenA.toFixed(1)})</span>
              </div>
              <input type="range" min="2" max="64" step="2" bind:value={propA} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Value B = {propB} (Length log₂ B = {lenB.toFixed(1)})</span>
              </div>
              <input type="range" min="2" max="32" step="2" bind:value={propB} class="range range-xs range-secondary" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1.5">
              <span class="font-bold text-primary">Mechanical Analogy:</span>
              <p class="text-base-content/80 leading-relaxed">
                Before calculators existed, engineers used <em>Slide Rules</em>. Adding two physical lengths on a logarithmic ruler mechanically multiplies their numbers: <strong>log(A) + log(B) = log(A · B)</strong>!
              </p>
            </div>
          </div>
        </div>

        <!-- Visual Slide Rule Bars -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <span class="text-xs uppercase font-black text-base-content/50">Visual Ruler Addition</span>

          <div class="w-full space-y-4 my-auto max-w-md">
            <!-- Bar A -->
            <div>
              <div class="flex justify-between text-xs font-mono font-bold mb-1">
                <span>Bar A: log₂({propA}) = {lenA.toFixed(2)}</span>
              </div>
              <div class="w-full bg-base-200 h-6 rounded-lg overflow-hidden border border-base-300 flex">
                <div class="bg-blue-500 h-full flex items-center justify-center text-[11px] font-mono text-white font-bold transition-all duration-150" style={`width: ${Math.min(100, (lenA / 10) * 100)}%`}>
                  A
                </div>
              </div>
            </div>

            <!-- Bar B -->
            <div>
              <div class="flex justify-between text-xs font-mono font-bold mb-1">
                <span>Bar B: log₂({propB}) = {lenB.toFixed(2)}</span>
              </div>
              <div class="w-full bg-base-200 h-6 rounded-lg overflow-hidden border border-base-300 flex">
                <div class="bg-purple-500 h-full flex items-center justify-center text-[11px] font-mono text-white font-bold transition-all duration-150" style={`width: ${Math.min(100, (lenB / 10) * 100)}%`}>
                  B
                </div>
              </div>
            </div>

            <!-- Combined Result -->
            <div class="pt-2 border-t border-base-300">
              <div class="flex justify-between text-xs font-mono font-bold mb-1">
                <span class="text-primary font-black">
                  {propRuleMode === 'product' ? `Combined (A + B): log₂(${resValue}) = ${lenCombined.toFixed(2)}` : `Difference (A - B): log₂(${resValue}) = ${lenCombined.toFixed(2)}`}
                </span>
              </div>
              <div class="w-full bg-base-200 h-7 rounded-lg overflow-hidden border border-base-300 flex">
                <div class="bg-blue-500 h-full transition-all duration-150" style={`width: ${Math.min(100, (lenA / 10) * 100)}%`}></div>
                {#if propRuleMode === 'product'}
                  <div class="bg-purple-500 h-full transition-all duration-150" style={`width: ${Math.min(100, (lenB / 10) * 100)}%`}></div>
                {/if}
              </div>
            </div>

            <!-- Math statement -->
            <div class="p-3 bg-base-200/50 rounded-xl border border-base-300 text-center font-mono text-xs">
              {#if propRuleMode === 'product'}
                log₂({propA}) + log₂({propB}) = log₂({propA} · {propB}) = <span class="font-bold text-primary">{lenCombined.toFixed(2)}</span>
              {:else}
                log₂({propA}) - log₂({propB}) = log₂({propA} / {propB}) = <span class="font-bold text-primary">{lenCombined.toFixed(2)}</span>
              {/if}
            </div>
          </div>

          <div class="w-full text-center text-xs text-base-content/50 font-mono">
            log_b(xy) = log_b(x) + log_b(y) &nbsp;|&nbsp; log_b(x/y) = log_b(x) - log_b(y)
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 6: LOG EQUATIONS & DOMAIN HAZARD LAB -->
    <!-- ============================================================== -->
    {:else if activeTab === 'eq_log'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Preset Controls -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-3.5">
            <span class="text-xs font-black uppercase tracking-wider text-primary">Logarithmic Equations & Domain Checks</span>
            <div class="grid grid-cols-1 gap-1.5">
              <button
                class={`btn btn-sm justify-start font-mono ${logEqPreset === 'sum_extraneous' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (logEqPreset = 'sum_extraneous')}
              >
                1. log(x) + log(x - 3) = 1 (Extraneous!)
              </button>
              <button
                class={`btn btn-sm justify-start font-mono ${logEqPreset === 'sub_quotient' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (logEqPreset = 'sub_quotient')}
              >
                2. log₃(x + 4) - log₃(x) = 2
              </button>
              <button
                class={`btn btn-sm justify-start font-mono ${logEqPreset === 'simple_exp' ? 'btn-primary' : 'btn-outline'}`}
                onclick={() => (logEqPreset = 'simple_exp')}
              >
                3. log₂(x + 3) = 5
              </button>
            </div>

            <!-- Steps & Hazard alert -->
            <div class="p-3.5 bg-error/10 border border-error/30 rounded-xl space-y-1 text-xs">
              <div class="flex items-center gap-1.5 font-bold text-error">
                <AlertTriangle size={15} />
                <span>Extraneous Solution Warning</span>
              </div>
              <p class="text-base-content/80 text-[11px] leading-relaxed">
                {logEqData.domainNotice}
              </p>
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-[11px] font-mono space-y-1">
              {#each logEqData.algebraSteps as step}
                <p class="text-base-content/80">• {step}</p>
              {/each}
            </div>
          </div>
        </div>

        <!-- Hazard Visualization Display -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between">
            <span class="font-mono text-sm font-black text-primary">{logEqData.equation}</span>
            <span class="badge badge-primary font-mono font-bold">Valid Root: x = {logEqData.validX}</span>
          </div>

          <!-- Domain Graphic -->
          <div class="w-full max-w-md my-auto space-y-4">
            <!-- Number Line with Hazard Zone -->
            <div class="p-4 bg-base-200/50 rounded-2xl border border-base-300 space-y-3">
              <div class="text-xs font-bold text-base-content/70">Domain Safety Mapping on Number Line:</div>
              <div class="relative h-10 w-full bg-base-100 rounded-xl border border-base-300 overflow-hidden flex items-center">
                <!-- Forbidden striped zone -->
                <div class="h-full bg-error/20 border-r-2 border-error flex items-center justify-center text-[10px] font-bold text-error uppercase tracking-wider" style="width: 45%;">
                  Hazard Zone (x ≤ {logEqData.hazardLimit})
                </div>
                <!-- Valid zone -->
                <div class="h-full bg-success/15 flex-1 flex items-center justify-center text-[10px] font-bold text-success uppercase tracking-wider">
                  Valid Domain (x &gt; {logEqData.hazardLimit})
                </div>
              </div>

              <!-- Root Badges -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                {#if logEqData.extraneousX !== null}
                  <div class="p-2.5 bg-error/15 border border-error/30 rounded-xl text-center">
                    <span class="block font-mono font-bold text-error text-sm">x = {logEqData.extraneousX}</span>
                    <span class="badge badge-error badge-xs font-bold mt-1">REJECTED</span>
                    <p class="text-[10px] text-base-content/70 mt-1">Inside Hazard Zone (log is undefined)</p>
                  </div>
                {/if}
                <div class="p-2.5 bg-success/15 border border-success/30 rounded-xl text-center {logEqData.extraneousX === null ? 'col-span-2' : ''}">
                  <span class="block font-mono font-bold text-success text-sm">x = {logEqData.validX}</span>
                  <span class="badge badge-success badge-xs font-bold mt-1">ACCEPTED</span>
                  <p class="text-[10px] text-base-content/70 mt-1">Passes domain test: argument &gt; 0</p>
                </div>
              </div>
            </div>

            <p class="text-xs text-center text-base-content/70 italic px-2">
              "{logEqData.explanation}"
            </p>
          </div>

          <div class="w-full text-center text-xs font-mono text-base-content/50">
            Rule: Always check that each argument > 0 in the original equation!
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 7: GAME AUDIO DECIBELS & DIGITS STUDIO -->
    <!-- ============================================================== -->
    {:else if activeTab === 'game_audio'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Audio Decibel Controls -->
        <div class="md:col-span-6 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">Game Audio & Decibels (dB)</span>
              <span class="badge badge-primary font-mono font-bold">{decibels} dB</span>
            </div>

            <p class="text-xs text-base-content/80 leading-relaxed">
              Human hearing perceives loudness logarithmically. Doubling sound power does NOT sound twice as loud; an increase of <strong>+10 dB</strong> corresponds to roughly <strong>10× sound energy</strong>!
            </p>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Sound Power Ratio (I / I₀):</span>
                <span class="font-mono text-primary">{soundIntensityRatio.toLocaleString()}×</span>
              </div>
              <input type="range" min="10" max="100000000000" step="100" bind:value={soundIntensityRatio} class="range range-xs range-primary" />
            </div>

            <!-- Live Acoustic Gauge -->
            <div class="p-3.5 bg-base-100 rounded-xl border border-base-300 space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-base-content/60">Perceived Perception:</span>
                <span class={audioPerceptionContext.color}>{audioPerceptionContext.label}</span>
              </div>
              <div class="w-full h-3 bg-base-200 rounded-full overflow-hidden border border-base-300">
                <div class="h-full bg-gradient-to-r from-success via-warning to-error transition-all duration-200" style={`width: ${audioPerceptionContext.bar}%`}></div>
              </div>
              <p class="text-[11px] text-base-content/60 font-mono">
                Formula: dB = 10 · log₁₀(I / I₀)
              </p>
            </div>
          </div>
        </div>

        <!-- Big Number Digit Counter & Integer Overflow -->
        <div class="md:col-span-6 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner space-y-4">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-secondary">Idle Game Digit & Overflow Detector</span>
              <span class={`badge ${intTypeWarning.badge} font-bold text-xs`}>{intTypeWarning.type}</span>
            </div>

            <p class="text-xs text-base-content/80 leading-relaxed">
              In game engines, counting digits tells you if your score will crash 32-bit or 64-bit integer limits: <strong>Digits = ⌊log₁₀(bᵉ)⌋ + 1</strong>.
            </p>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <span class="text-xs font-bold text-base-content/70">Base b:</span>
                <input type="number" min="2" max="10" bind:value={gameBigBase} class="input input-sm input-bordered w-full font-mono mt-1" />
              </div>
              <div>
                <span class="text-xs font-bold text-base-content/70">Power e:</span>
                <input type="number" min="1" max="1000" bind:value={gameBigExp} class="input input-sm input-bordered w-full font-mono mt-1" />
              </div>
            </div>

            <!-- Big Number Output Card -->
            <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300 text-center space-y-1">
              <span class="text-xs uppercase font-bold text-base-content/50">Total Digits in {gameBigBase}^{gameBigExp}</span>
              <div class="text-4xl sm:text-5xl font-mono font-black text-primary">{totalDigits} <span class="text-lg">digits</span></div>
              <p class="text-xs text-base-content/70 font-mono mt-1">
                ⌊{gameBigExp} · log₁₀({gameBigBase})⌋ + 1 = {totalDigits}
              </p>
            </div>

            <div class="p-3 bg-base-200/40 rounded-xl border border-base-300 text-xs space-y-1">
              <span class="font-bold text-base-content/80">Game Dev Implication:</span>
              <p class="text-base-content/70 leading-relaxed">{intTypeWarning.desc}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>
