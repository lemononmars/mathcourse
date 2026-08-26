<script lang="ts">
  import LineChart from '@lucide/svelte/icons/line-chart';
  import Cpu from '@lucide/svelte/icons/cpu';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import Swords from '@lucide/svelte/icons/swords';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Percent from '@lucide/svelte/icons/percent';

  import Week4CoordinateLab from './Week4CoordinateLab.svelte';
  import Week4InterceptLab from './Week4InterceptLab.svelte';

  type TabType = 'evaluator' | 'composition' | 'coordinate' | 'intercept';
  let activeTab = $state<TabType>('evaluator');

  // ==========================================
  // TAB 1: FUNCTION EVALUATION
  // ==========================================
  let evalX = $state(4);
  let evalA = $state(2);
  let evalB = $state(-3);
  let evalC = $state(1);
  let evalFnType = $state<'linear' | 'quadratic' | 'ratio' | 'rpg_damage'>('linear');

  let evalResult = $derived.by(() => {
    if (evalFnType === 'linear') {
      const val = evalA * evalX + evalB;
      const bSign = evalB >= 0 ? `+ ${evalB}` : `- ${Math.abs(evalB)}`;
      const bSignSub = evalB >= 0 ? `+ ${evalB}` : `- ${Math.abs(evalB)}`;
      return {
        generalForm: `f(x) = ${evalA}x ${bSign}`,
        dynamicForm: `f(${evalX}) = ${evalA}(${evalX}) ${bSignSub}`,
        calcSteps: `${evalA * evalX} ${bSignSub}`,
        val: val.toString(),
        unit: '',
        context: 'Linear scaling: constant growth per level/point (e.g. Movement Speed, Flat HP per Level).'
      };
    } else if (evalFnType === 'quadratic') {
      const val = evalA * evalX * evalX + evalB * evalX + evalC;
      const bSign = evalB >= 0 ? `+ ${evalB}x` : `- ${Math.abs(evalB)}x`;
      const cSign = evalC >= 0 ? `+ ${evalC}` : `- ${Math.abs(evalC)}`;
      return {
        generalForm: `f(x) = ${evalA}x² ${bSign} ${cSign}`,
        dynamicForm: `f(${evalX}) = ${evalA}(${evalX})² + (${evalB})(${evalX}) + (${evalC})`,
        calcSteps: `${evalA * evalX * evalX} + (${evalB * evalX}) + (${evalC})`,
        val: val.toString(),
        unit: '',
        context: 'Accelerating curve: XP required for level x, or projectile jump height trajectory.'
      };
    } else if (evalFnType === 'ratio') {
      // Diminishing returns / Armor ratio formula: f(x) = (a * x) / (x + b)
      const aVal = Math.max(1, Math.abs(evalA) * 10); // e.g. 100 max reduction %
      const bVal = Math.max(1, Math.abs(evalB) * 5 + 20); // e.g. 50 armor constant
      const num = aVal * evalX;
      const den = evalX + bVal;
      const ratioVal = den !== 0 ? (num / den).toFixed(2) : 'Undefined';
      const pct = den !== 0 ? ((num / den)).toFixed(1) : '0';
      return {
        generalForm: `f(x) = (${aVal} · x) / (x + ${bVal})`,
        dynamicForm: `f(${evalX}) = (${aVal} · ${evalX}) / (${evalX} + ${bVal})`,
        calcSteps: `${num} / ${den}`,
        val: `${ratioVal}%`,
        unit: 'mitigation',
        context: `Diminishing returns ratio formula: as Armor x increases, reduction approaches ${aVal}%.`
      };
    } else {
      // RPG Damage: max(1, atk * mult - def)
      const atk = evalX;
      const mult = evalA;
      const def = Math.max(0, -evalB);
      const dmg = Math.max(1, atk * mult - def);
      return {
        generalForm: `Damage(x) = max(1, ${mult}x - ${def})`,
        dynamicForm: `Damage(${atk}) = max(1, ${mult}(${atk}) - ${def})`,
        calcSteps: `max(1, ${atk * mult} - ${def})`,
        val: dmg.toString(),
        unit: 'DMG',
        context: `Combat formula: Multiplier ${mult}× ATK minus ${def} DEF.`
      };
    }
  });

  // ==========================================
  // TAB 2: COMPOSITE FUNCTIONS (f ∘ g)(x)
  // ==========================================
  let compX = $state(3);
  let compGType = $state<'plus3' | 'double' | 'square'>('double');
  let compFType = $state<'plus5' | 'square' | 'sub4'>('plus5');

  function gFunc(x: number) {
    if (compGType === 'plus3') return x + 3;
    if (compGType === 'double') return 2 * x;
    return x * x;
  }
  function fFunc(u: number) {
    if (compFType === 'plus5') return u + 5;
    if (compFType === 'square') return u * u;
    return u - 4;
  }

  let compU = $derived(gFunc(compX));
  let compFinal = $derived(fFunc(compU));
</script>

<div class="week4-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Selection Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W4 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="evaluator">1. Function Evaluator</option>
      <option value="composition">2. Composition (f ∘ g)</option>
      <option value="coordinate">3. Coordinates & Grid</option>
      <option value="intercept">4. Collision / Intercept</option>
    </select>
  </div>

  <!-- Desktop Navigation Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 4 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Functions & Coordinate Geometry</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1.5 transition-all ${activeTab === 'evaluator' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'evaluator')}>
        <LineChart size={14} /> Evaluation
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1.5 transition-all ${activeTab === 'composition' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'composition')}>
        <Cpu size={14} /> Composition
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1.5 transition-all ${activeTab === 'coordinate' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'coordinate')}>
        <Crosshair size={14} /> Coordinates Lab
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1.5 transition-all ${activeTab === 'intercept' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'intercept')}>
        <Swords size={14} /> Intercept & Collision
      </button>
    </div>
  </div>

  <!-- Main Active Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: FUNCTION EVALUATOR -->
    {#if activeTab === 'evaluator'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Function Formula Setup</span>
            <div class="grid grid-cols-2 gap-1.5 bg-base-100 p-1 rounded-xl border border-base-300">
              <button class={`btn btn-xs ${evalFnType === 'linear' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'linear'}>Linear f(x)</button>
              <button class={`btn btn-xs ${evalFnType === 'quadratic' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'quadratic'}>Quadratic f(x)</button>
              <button class={`btn btn-xs ${evalFnType === 'ratio' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'ratio'}>Ratio f(x)</button>
              <button class={`btn btn-xs ${evalFnType === 'rpg_damage' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'rpg_damage'}>RPG Damage</button>
            </div>

            <div class="space-y-3 bg-base-100 p-3.5 rounded-2xl border border-base-300">
              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span class="text-primary font-bold">Input Argument x = {evalX}</span>
                  <span class="font-mono text-primary font-black text-sm">{evalX}</span>
                </div>
                <input type="range" min="0" max="20" step="1" bind:value={evalX} class="range range-xs range-primary" />
                <div class="flex justify-between text-[10px] text-base-content/40 font-mono px-0.5 mt-0.5">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Parameter a = {evalA}</span>
                  <span class="font-mono">{evalA}</span>
                </div>
                <input type="range" min="-5" max="10" step="1" bind:value={evalA} class="range range-xs range-secondary" />
              </div>

              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Parameter b = {evalB}</span>
                  <span class="font-mono">{evalB}</span>
                </div>
                <input type="range" min="-20" max="20" step="1" bind:value={evalB} class="range range-xs" />
              </div>
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs">
              <span class="font-bold text-primary">Context:</span> {evalResult.context}
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner">
          <div class="flex items-center justify-between border-b border-base-200 pb-3">
            <span class="text-xs uppercase font-bold text-base-content/60">Dynamic Form Evaluation</span>
            <span class="badge badge-primary badge-sm font-mono font-bold">f(x) live engine</span>
          </div>

          <!-- Prominent Dynamic Formula Box -->
          <div class="my-auto space-y-4 text-center">
            <div class="p-4 bg-primary/10 rounded-2xl border-2 border-primary/30 inline-block w-full">
              <span class="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">General Function Definition</span>
              <p class="text-2xl sm:text-3xl font-mono font-black text-primary">{evalResult.generalForm}</p>
            </div>

            <div class="p-4 bg-secondary/10 rounded-2xl border-2 border-secondary/30 inline-block w-full">
              <span class="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-1">Dynamic Substitution for x = {evalX}</span>
              <p class="text-xl sm:text-2xl font-mono font-black text-secondary">{evalResult.dynamicForm}</p>
              <p class="text-xs font-mono text-base-content/60 mt-1">= {evalResult.calcSteps}</p>
            </div>

            <div>
              <span class="text-xs uppercase font-bold text-base-content/50 block">Output Result y</span>
              <div class="text-5xl sm:text-6xl font-black font-mono text-primary mt-1">
                {evalResult.val} <span class="text-lg font-normal text-base-content/60">{evalResult.unit}</span>
              </div>
            </div>
          </div>

          <div class="p-3 bg-base-200/50 rounded-xl text-xs text-base-content/70 text-center font-mono border border-base-300">
            Evaluating a function means plugging the specific input value <span class="text-primary font-bold font-mono">x = {evalX}</span> into the rule to calculate the unique output <span class="text-secondary font-bold font-mono">y</span>.
          </div>
        </div>
      </div>

    <!-- TAB 2: COMPOSITION MACHINE (f ∘ g) -->
    {:else if activeTab === 'composition'}
      <div class="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 space-y-6 h-full shadow-inner animate-fade-in">
        <div class="text-center">
          <span class="badge badge-primary badge-sm font-bold">Assembly Line Model</span>
          <h3 class="text-lg font-black mt-1">Composite Function: (f ∘ g)(x) = f(g(x))</h3>
          <p class="text-xs text-base-content/70">The output of the inner function g(x) becomes the direct input to the outer function f(u).</p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-around gap-4 py-4">
          <!-- Step 1: Input -->
          <div class="flex flex-col items-center p-4 bg-base-200/60 rounded-2xl border border-base-300 min-w-[140px]">
            <span class="text-xs font-bold text-base-content/60 uppercase">Initial Input x</span>
            <input type="number" bind:value={compX} class="input input-sm input-bordered font-mono font-black text-center text-xl w-24 mt-2" />
          </div>

          <span class="text-2xl font-black text-primary">➔</span>

          <!-- Step 2: Inner Machine g(x) -->
          <div class="flex flex-col items-center p-4 bg-primary/10 rounded-2xl border-2 border-primary/40 min-w-[180px]">
            <span class="text-xs font-bold text-primary uppercase">1st Station: g(x)</span>
            <select class="select select-xs select-bordered mt-2" bind:value={compGType}>
              <option value="double">g(x) = 2x</option>
              <option value="plus3">g(x) = x + 3</option>
              <option value="square">g(x) = x²</option>
            </select>
            <div class="text-xl font-mono font-black mt-2 text-primary">u = {compU}</div>
          </div>

          <span class="text-2xl font-black text-secondary">➔</span>

          <!-- Step 3: Outer Machine f(u) -->
          <div class="flex flex-col items-center p-4 bg-secondary/10 rounded-2xl border-2 border-secondary/40 min-w-[180px]">
            <span class="text-xs font-bold text-secondary uppercase">2nd Station: f(u)</span>
            <select class="select select-xs select-bordered mt-2" bind:value={compFType}>
              <option value="plus5">f(u) = u + 5</option>
              <option value="square">f(u) = u²</option>
              <option value="sub4">f(u) = u - 4</option>
            </select>
            <div class="text-xl font-mono font-black mt-2 text-secondary">Final = {compFinal}</div>
          </div>
        </div>

        <div class="p-3 bg-base-200/40 rounded-xl text-center font-mono text-sm font-bold border border-base-300">
          Result: (f ∘ g)({compX}) = f({compU}) = <span class="text-secondary font-black text-lg">{compFinal}</span>
        </div>
      </div>

    <!-- TAB 3: COORDINATES & GRID (JSXGRAPH) -->
    {:else if activeTab === 'coordinate'}
      <Week4CoordinateLab />

    <!-- TAB 4: INTERCEPT & COLLISION (JSXGRAPH) -->
    {:else if activeTab === 'intercept'}
      <Week4InterceptLab />
    {/if}

  </div>
</div>
