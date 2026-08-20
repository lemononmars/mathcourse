<script lang="ts">
  import Play from '@lucide/svelte/icons/play';
  import Pause from '@lucide/svelte/icons/pause';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import LineChart from '@lucide/svelte/icons/line-chart';
  import GitCommit from '@lucide/svelte/icons/git-commit';
  import Layers from '@lucide/svelte/icons/layers';
  import Cpu from '@lucide/svelte/icons/cpu';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import Shapes from '@lucide/svelte/icons/shapes';
  import Swords from '@lucide/svelte/icons/swords';

  type TabType = 'mapping' | 'evaluator' | 'algebra' | 'composition' | 'inverse' | 'coordinate' | 'types' | 'graphread';
  let activeTab = $state<TabType>('mapping');

  // ==========================================
  // TAB 1: FUNCTION MAPPING (Domain -> Codomain)
  // ==========================================
  const domainItems = [1, 2, 3, 4, 5];
  let mappingRule = $state<'double' | 'square' | 'mod3' | 'constant'>('double');
  let selectedDomainElement = $state<number | null>(2);

  function mapFunction(x: number, rule: string): number {
    switch (rule) {
      case 'double': return 2 * x;
      case 'square': return x * x;
      case 'mod3': return x % 3;
      case 'constant': return 5;
      default: return x;
    }
  }

  let mappedCodomain = $derived(domainItems.map(x => ({ x, y: mapFunction(x, mappingRule) })));
  let rangeSet = $derived([...new Set(mappedCodomain.map(item => item.y))].sort((a, b) => a - b));

  // ==========================================
  // TAB 2: FUNCTION EVALUATION
  // ==========================================
  let evalX = $state(4);
  let evalA = $state(2);
  let evalB = $state(-3);
  let evalC = $state(1);
  let evalFnType = $state<'linear' | 'quadratic' | 'rpg_damage'>('rpg_damage');

  let evalResult = $derived.by(() => {
    if (evalFnType === 'linear') {
      return { val: evalA * evalX + evalB, formula: `f(${evalX}) = ${evalA}(${evalX}) + (${evalB})` };
    } else if (evalFnType === 'quadratic') {
      const val = evalA * evalX * evalX + evalB * evalX + evalC;
      return { val, formula: `f(${evalX}) = ${evalA}(${evalX})² + (${evalB})(${evalX}) + (${evalC})` };
    } else {
      // RPG Damage: (BaseATK * ATK_Multiplier) - EnemyDEF
      const atk = evalX;
      const mult = evalA;
      const def = Math.max(0, -evalB);
      const dmg = Math.max(1, atk * mult - def);
      return { val: dmg, formula: `Damage(${atk}) = max(1, ${atk} × ${mult} - ${def})` };
    }
  });

  // ==========================================
  // TAB 3: ALGEBRA OF FUNCTIONS
  // ==========================================
  let algOp = $state<'+' | '-' | '×' | '÷'>('+');
  let algX = $state(3);
  // f(x) = 2x + 1, g(x) = x - 2
  let algFx = $derived(2 * algX + 1);
  let algGx = $derived(algX - 2);
  let algCombined = $derived.by(() => {
    switch (algOp) {
      case '+': return { val: algFx + algGx, formula: `(f + g)(${algX}) = ${algFx} + ${algGx}` };
      case '-': return { val: algFx - algGx, formula: `(f - g)(${algX}) = ${algFx} - (${algGx})` };
      case '×': return { val: algFx * algGx, formula: `(f · g)(${algX}) = ${algFx} × ${algGx}` };
      case '÷': return { val: algGx !== 0 ? (algFx / algGx).toFixed(2) : 'Undefined (div by 0)', formula: `(f / g)(${algX}) = ${algFx} / ${algGx}` };
    }
  });

  // ==========================================
  // TAB 4: COMPOSITE FUNCTIONS (f ∘ g)(x)
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

  // ==========================================
  // TAB 5: INVERSE FUNCTIONS
  // ==========================================
  let invM = $state(2);
  let invB = $state(3);
  let invInputX = $state(4);

  let forwardY = $derived(invM * invInputX + invB);
  let backwardX = $derived((forwardY - invB) / (invM || 1));

  // ==========================================
  // TAB 6: COORDINATE SYSTEM & GRAPHING
  // ==========================================
  let coordX = $state(3);
  let coordY = $state(2);
  let coordSlope = $derived(coordX !== 0 ? (coordY / coordX).toFixed(2) : 'Undefined');
  let coordDist = $derived(Math.sqrt(coordX * coordX + coordY * coordY).toFixed(2));

  // ==========================================
  // TAB 7: FUNCTION TYPES GALLERY
  // ==========================================
  let fTypeActive = $state<'linear' | 'quadratic' | 'piecewise'>('quadratic');
  let fTypeParam = $state(1);

  // ==========================================
  // TAB 8: GRAPH READING & COLLISION
  // ==========================================
  let playerSpeed = $state(4);
  let enemySpawnDist = $state(12);
  let interceptTime = $derived((enemySpawnDist / (playerSpeed || 1)).toFixed(2));
</script>

<div class="week4-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Selection Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W4 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="mapping">1. Mapping & Domain</option>
      <option value="evaluator">2. Function Evaluator</option>
      <option value="algebra">3. Algebra of Functions</option>
      <option value="composition">4. Composition (f ∘ g)</option>
      <option value="inverse">5. Inverse Functions</option>
      <option value="coordinate">6. Coordinates & Grid</option>
      <option value="types">7. Function Types</option>
      <option value="graphread">8. Collision / Intercept</option>
    </select>
  </div>

  <!-- Desktop Navigation Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 4 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Functions & Game Progression</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'mapping' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'mapping')}>
        <GitCommit size={14} /> Mapping
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'evaluator' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'evaluator')}>
        <LineChart size={14} /> Evaluation
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'algebra' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'algebra')}>
        <Layers size={14} /> Algebra
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'composition' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'composition')}>
        <Cpu size={14} /> Composition
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'inverse' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'inverse')}>
        <RefreshCw size={14} /> Inverse
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'coordinate' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'coordinate')}>
        <Crosshair size={14} /> Coordinates
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'types' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'types')}>
        <Shapes size={14} /> Types
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'graphread' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'graphread')}>
        <Swords size={14} /> Intercept
      </button>
    </div>
  </div>

  <!-- Main Active Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: MAPPING & DOMAIN -->
    {#if activeTab === 'mapping'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-4 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Mapping Rule</span>
            <div class="grid grid-cols-2 gap-2">
              <button class={`btn btn-sm ${mappingRule === 'double' ? 'btn-primary' : 'btn-outline'}`} onclick={() => mappingRule = 'double'}>f(x) = 2x</button>
              <button class={`btn btn-sm ${mappingRule === 'square' ? 'btn-primary' : 'btn-outline'}`} onclick={() => mappingRule = 'square'}>f(x) = x²</button>
              <button class={`btn btn-sm ${mappingRule === 'mod3' ? 'btn-primary' : 'btn-outline'}`} onclick={() => mappingRule = 'mod3'}>f(x) = x mod 3</button>
              <button class={`btn btn-sm ${mappingRule === 'constant' ? 'btn-primary' : 'btn-outline'}`} onclick={() => mappingRule = 'constant'}>f(x) = 5</button>
            </div>

            <div class="rounded-xl border border-base-300 bg-base-100 p-3 text-xs space-y-1">
              <p class="font-bold text-base-content/80">Game Design Context:</p>
              <p class="text-base-content/70">A function maps every input (e.g. Player Level) to exactly one output (e.g. Max HP). Range is the subset of values actually reached.</p>
            </div>
          </div>

          <div class="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl">
            <p class="text-xs font-bold text-primary">Calculated Range:</p>
            <p class="text-lg font-mono font-black">{`{ ${rangeSet.join(', ')} }`}</p>
          </div>
        </div>

        <div class="md:col-span-8 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <p class="text-xs font-bold uppercase text-center text-base-content/60 mb-3">Domain ➔ Codomain Arrow Mapping</p>
          <div class="flex items-center justify-around py-6">
            <!-- Domain bubble -->
            <div class="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-primary/40 bg-primary/5 min-w-[120px]">
              <span class="font-black text-sm text-primary uppercase">Domain X</span>
              {#each domainItems as item}
                <button
                  class={`w-10 h-10 rounded-full font-mono font-bold flex items-center justify-center transition-all ${selectedDomainElement === item ? 'bg-primary text-primary-content ring-2 ring-primary ring-offset-2' : 'bg-base-200 hover:bg-base-300'}`}
                  onclick={() => selectedDomainElement = item}
                >
                  {item}
                </button>
              {/each}
            </div>

            <div class="text-center">
              <div class="text-2xl font-black text-secondary">➔</div>
              <span class="text-xs font-mono font-bold text-base-content/60">maps to</span>
            </div>

            <!-- Codomain bubble -->
            <div class="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-secondary/40 bg-secondary/5 min-w-[120px]">
              <span class="font-black text-sm text-secondary uppercase">Range f(X)</span>
              {#each mappedCodomain as item}
                <div class={`w-10 h-10 rounded-full font-mono font-bold flex items-center justify-center transition-all ${selectedDomainElement === item.x ? 'bg-secondary text-secondary-content scale-110 shadow-md' : 'bg-base-200 text-base-content/70'}`}>
                  {item.y}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

    <!-- TAB 2: FUNCTION EVALUATOR -->
    {:else if activeTab === 'evaluator'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Function Formula Setup</span>
            <div class="join w-full">
              <button class={`join-item btn btn-sm flex-1 ${evalFnType === 'rpg_damage' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'rpg_damage'}>RPG Damage</button>
              <button class={`join-item btn btn-sm flex-1 ${evalFnType === 'linear' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'linear'}>Linear</button>
              <button class={`join-item btn btn-sm flex-1 ${evalFnType === 'quadratic' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => evalFnType = 'quadratic'}>Quadratic</button>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input x = {evalX}</span>
              </div>
              <input type="range" min="0" max="20" bind:value={evalX} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Multiplier a = {evalA}</span>
              </div>
              <input type="range" min="-5" max="10" bind:value={evalA} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Modifier b = {evalB}</span>
              </div>
              <input type="range" min="-20" max="20" bind:value={evalB} class="range range-xs" />
            </div>
          </div>

          <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs">
            <span class="font-bold text-primary">Formula:</span> {evalResult.formula}
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Evaluation Output</span>
          <div class="text-6xl font-black font-mono text-primary my-4">{evalResult.val}</div>
          <p class="font-mono text-sm bg-base-200/60 px-4 py-2 rounded-xl border border-base-300">{evalResult.formula}</p>
        </div>
      </div>

    <!-- TAB 3: ALGEBRA OF FUNCTIONS -->
    {:else if activeTab === 'algebra'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Defined Functions</span>
            <div class="p-3 bg-base-100 rounded-xl border border-base-300 space-y-1 font-mono text-sm">
              <p class="text-primary font-bold">f(x) = 2x + 1</p>
              <p class="text-secondary font-bold">g(x) = x - 2</p>
            </div>

            <div>
              <span class="text-xs font-bold block mb-2">Operation:</span>
              <div class="grid grid-cols-4 gap-2">
                {#each ['+', '-', '×', '÷'] as op}
                  <button class={`btn btn-sm font-bold ${algOp === op ? 'btn-primary' : 'btn-outline'}`} onclick={() => algOp = op as any}>{op}</button>
                {/each}
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input x = {algX}</span>
              </div>
              <input type="range" min="-5" max="10" bind:value={algX} class="range range-xs range-primary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 space-y-4 shadow-inner">
          <div class="grid grid-cols-2 gap-3 text-center">
            <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <span class="text-xs font-bold text-primary">f({algX})</span>
              <div class="text-2xl font-mono font-black">{algFx}</div>
            </div>
            <div class="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
              <span class="text-xs font-bold text-secondary">g({algX})</span>
              <div class="text-2xl font-mono font-black">{algGx}</div>
            </div>
          </div>

          <div class="p-4 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-2xl border border-base-300 text-center">
            <p class="text-xs font-bold text-base-content/60 uppercase">Combined Result</p>
            <p class="text-4xl font-mono font-black text-primary mt-2">{algCombined.val}</p>
            <p class="text-xs font-mono text-base-content/70 mt-1">{algCombined.formula}</p>
          </div>
        </div>
      </div>

    <!-- TAB 4: COMPOSITION MACHINE (f ∘ g) -->
    {:else if activeTab === 'composition'}
      <div class="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 space-y-6 h-full shadow-inner animate-fade-in">
        <div class="text-center">
          <span class="badge badge-primary badge-sm font-bold">Assembly Line Model</span>
          <h3 class="text-lg font-black mt-1">Composite Function: (f ∘ g)(x) = f(g(x))</h3>
          <p class="text-xs text-base-content/70">The output of g(x) becomes the direct input to f(u).</p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-around gap-4 py-4">
          <!-- Step 1: Input -->
          <div class="flex flex-col items-center p-4 bg-base-200/60 rounded-2xl border border-base-300 min-w-[140px]">
            <span class="text-xs font-bold text-base-content/60">Initial Input x</span>
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

    <!-- TAB 5: INVERSE FUNCTION -->
    {:else if activeTab === 'inverse'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Linear Invertibility</span>
            <div class="p-3 bg-base-100 rounded-xl border border-base-300 font-mono text-sm">
              <p class="font-bold text-primary">f(x) = {invM}x + {invB}</p>
              <p class="font-bold text-secondary mt-1">f⁻¹(y) = (y - {invB}) / {invM}</p>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input x = {invInputX}</span>
              </div>
              <input type="range" min="-10" max="10" bind:value={invInputX} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Slope m = {invM}</span>
              </div>
              <input type="range" min="1" max="5" bind:value={invM} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 space-y-4 text-center shadow-inner">
          <div class="flex items-center justify-around">
            <div class="p-4 bg-primary/10 rounded-2xl border border-primary/30">
              <span class="text-xs font-bold text-primary uppercase">Forward f(x)</span>
              <div class="text-3xl font-black font-mono mt-1">{forwardY}</div>
              <span class="text-xs text-base-content/60">Input: {invInputX}</span>
            </div>

            <span class="text-2xl font-black text-base-content/40">⇄</span>

            <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/30">
              <span class="text-xs font-bold text-secondary uppercase">Inverse f⁻¹(y)</span>
              <div class="text-3xl font-black font-mono mt-1">{backwardX}</div>
              <span class="text-xs text-base-content/60">Recovered: {backwardX}</span>
            </div>
          </div>
          <p class="text-xs text-base-content/70">f(f⁻¹(y)) = y and f⁻¹(f(x)) = x</p>
        </div>
      </div>

    <!-- TAB 6: COORDINATES & GRID -->
    {:else if activeTab === 'coordinate'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-4 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Point Coordinates (x, y)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>X = {coordX}</span>
              </div>
              <input type="range" min="-8" max="8" bind:value={coordX} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Y = {coordY}</span>
              </div>
              <input type="range" min="-8" max="8" bind:value={coordY} class="range range-xs range-secondary" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1 font-mono">
              <p>Distance from (0,0): <span class="font-bold text-primary">{coordDist}</span></p>
              <p>Slope to Origin: <span class="font-bold text-secondary">{coordSlope}</span></p>
            </div>
          </div>
        </div>

        <div class="md:col-span-8 flex items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <svg viewBox="-100 -100 200 200" class="w-full max-w-[280px] h-[280px]">
            <!-- Axes -->
            <line x1="-90" y1="0" x2="90" y2="0" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />
            <line x1="0" y1="-90" x2="0" y2="90" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />
            <!-- Line from origin -->
            <line x1="0" y1="0" x2={coordX * 10} y2={-coordY * 10} stroke="oklch(var(--p))" stroke-width="2" stroke-dasharray="3 3" />
            <!-- Point -->
            <circle cx={coordX * 10} cy={-coordY * 10} r="6" fill="oklch(var(--p))" />
            <text x={coordX * 10 + 8} y={-coordY * 10 - 8} fill="currentColor" font-size="10" font-weight="bold">({coordX}, {coordY})</text>
          </svg>
        </div>
      </div>

    <!-- TAB 7: FUNCTION TYPES -->
    {:else if activeTab === 'types'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-4 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Family of Functions</span>
            <div class="flex flex-col gap-2">
              <button class={`btn btn-sm justify-start ${fTypeActive === 'linear' ? 'btn-primary' : 'btn-outline'}`} onclick={() => fTypeActive = 'linear'}>Linear: f(x) = ax</button>
              <button class={`btn btn-sm justify-start ${fTypeActive === 'quadratic' ? 'btn-primary' : 'btn-outline'}`} onclick={() => fTypeActive = 'quadratic'}>Quadratic: f(x) = ax²</button>
              <button class={`btn btn-sm justify-start ${fTypeActive === 'piecewise' ? 'btn-primary' : 'btn-outline'}`} onclick={() => fTypeActive = 'piecewise'}>Piecewise Step</button>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Curve Parameter a = {fTypeParam}</span>
              </div>
              <input type="range" min="1" max="5" bind:value={fTypeParam} class="range range-xs range-primary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-8 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="badge badge-secondary badge-sm font-bold uppercase">{fTypeActive}</span>
          <p class="text-xs text-base-content/70 mt-2 max-w-md">
            {#if fTypeActive === 'linear'}
              Straight line growth. Constant rate of change. Commonly used for walking speed, fixed resource generation.
            {:else if fTypeActive === 'quadratic'}
              Accelerating growth curve. Used for projectile trajectory, gravity, XP required per level ($XP = a \cdot L^2$).
            {:else}
              Piecewise conditional function. Used for stamina states, damage thresholds, rank tier promotions.
            {/if}
          </p>
        </div>
      </div>

    <!-- TAB 8: GRAPH READING & COLLISION -->
    {:else if activeTab === 'graphread'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Interception Math</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Player Speed: {playerSpeed} m/s</span>
              </div>
              <input type="range" min="1" max="10" bind:value={playerSpeed} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Enemy Spawn Distance: {enemySpawnDist} m</span>
              </div>
              <input type="range" min="4" max="30" bind:value={enemySpawnDist} class="range range-xs range-secondary" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1 font-mono">
              <p>Player Position: <span class="font-bold text-primary">d(t) = {playerSpeed}t</span></p>
              <p>Enemy Position: <span class="font-bold text-secondary">d = {enemySpawnDist}</span></p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs font-bold uppercase text-base-content/60">Time to Intercept</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{interceptTime} <span class="text-xl">sec</span></div>
          <p class="text-xs text-base-content/70">Found by solving intersection of graphs $d_1(t) = d_2(t)$.</p>
        </div>
      </div>
    {/if}

  </div>
</div>
