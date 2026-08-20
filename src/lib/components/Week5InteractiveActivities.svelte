<script lang="ts">
  import Flame from '@lucide/svelte/icons/flame';
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import Box from '@lucide/svelte/icons/box';
  import Coins from '@lucide/svelte/icons/coins';
  import Binary from '@lucide/svelte/icons/binary';
  import Calculator from '@lucide/svelte/icons/calculator';
  import Volume2 from '@lucide/svelte/icons/volume-2';
  import Triangle from '@lucide/svelte/icons/triangle';
  import Play from '@lucide/svelte/icons/play';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';

  type TabType = 'growth' | 'expcurve' | 'rules' | 'compound' | 'logdef' | 'logprops' | 'logapps' | 'extra';
  let activeTab = $state<TabType>('growth');

  // ==========================================
  // TAB 1: RAPID GROWTH / CHESSBOARD
  // ==========================================
  let chessSquare = $state(10);
  let wheatGrains = $derived(BigInt(2) ** BigInt(chessSquare - 1));

  // ==========================================
  // TAB 2: EXPONENTIAL CURVE
  // ==========================================
  let expA = $state(2);
  let expB = $state(1.5);
  let expX = $state(4);
  let expVal = $derived((expA * Math.pow(expB, expX)).toFixed(2));

  // ==========================================
  // TAB 3: EXPONENT RULES
  // ==========================================
  let ruleBase = $state(3);
  let ruleM = $state(2);
  let ruleN = $state(3);
  let ruleMultRes = $derived(Math.pow(ruleBase, ruleM + ruleN));

  // ==========================================
  // TAB 4: COMPOUND INTEREST & RPG SCALING
  // ==========================================
  let principal = $state(1000);
  let ratePct = $state(8);
  let compFreq = $state(4); // quarterly
  let compYears = $state(5);
  let compoundRes = $derived((principal * Math.pow(1 + (ratePct / 100) / compFreq, compFreq * compYears)).toFixed(2));

  // ==========================================
  // TAB 5: LOGARITHM DEFINITION
  // ==========================================
  let logBase = $state(2);
  let logX = $state(16);
  let logRes = $derived((Math.log(logX) / Math.log(logBase)).toFixed(2));

  // ==========================================
  // TAB 6: LOG PROPERTIES
  // ==========================================
  let propA = $state(8);
  let propB = $state(4);
  let propBase = $state(2);
  let logA = $derived(Math.log(propA) / Math.log(propBase));
  let logB = $derived(Math.log(propB) / Math.log(propBase));
  let logProduct = $derived(Math.log(propA * propB) / Math.log(propBase));

  // ==========================================
  // TAB 7: LOG APPLICATIONS & DIGITS
  // ==========================================
  let digitBase = $state(2);
  let digitExp = $state(100);
  let numDigits = $derived(Math.floor(digitExp * Math.log10(digitBase)) + 1);

  // ==========================================
  // TAB 8: EULER'S E & TRIANGLE OF POWER
  // ==========================================
  let eulerN = $state(100);
  let eulerApprox = $derived(Math.pow(1 + 1 / eulerN, eulerN).toFixed(6));
</script>

<div class="week5-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Selection Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W5 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="growth">1. Rapid Growth (Chessboard)</option>
      <option value="expcurve">2. Exponential Curves</option>
      <option value="rules">3. Exponent Rules</option>
      <option value="compound">4. Compound Scaling</option>
      <option value="logdef">5. Log Definition</option>
      <option value="logprops">6. Log Properties</option>
      <option value="logapps">7. Decibel & Digits</option>
      <option value="extra">8. Euler's e & Power</option>
    </select>
  </div>

  <!-- Desktop Navigation Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 5 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Exponential & Logarithms</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'growth' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'growth')}>
        <Flame size={14} /> Doubling
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'expcurve' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'expcurve')}>
        <TrendingUp size={14} /> Exp Curve
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'rules' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'rules')}>
        <Box size={14} /> Rules
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'compound' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'compound')}>
        <Coins size={14} /> Compound
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'logdef' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'logdef')}>
        <Binary size={14} /> Logarithm
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'logprops' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'logprops')}>
        <Calculator size={14} /> Log Rules
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'logapps' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'logapps')}>
        <Volume2 size={14} /> Scales & Digits
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'extra' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'extra')}>
        <Triangle size={14} /> Euler & Power
      </button>
    </div>
  </div>

  <!-- Main Active Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: RAPID GROWTH -->
    {#if activeTab === 'growth'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Wheat on Chessboard</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Chessboard Square: #{chessSquare} / 64</span>
              </div>
              <input type="range" min="1" max="64" bind:value={chessSquare} class="range range-xs range-primary" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1">
              <p class="font-bold text-primary">Formula: Grains = 2^(n-1)</p>
              <p class="text-base-content/70">Notice how grains grow from 1 to billions in just a few dozen squares. This drives exponential idle games and scaling.</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Grains on Square #{chessSquare}</span>
          <div class="text-2xl sm:text-3xl font-mono font-black text-primary my-4 break-all max-w-md">{wheatGrains.toString()}</div>
          <span class="badge badge-secondary font-bold font-mono">2^{chessSquare - 1}</span>
        </div>
      </div>

    <!-- TAB 2: EXPONENTIAL CURVE -->
    {:else if activeTab === 'expcurve'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">f(x) = a · b^x</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Initial Scale a = {expA}</span></div>
              <input type="range" min="1" max="10" bind:value={expA} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Base b = {expB} ({expB >= 1 ? 'Growth' : 'Decay'})</span></div>
              <input type="range" min="0.2" max="3" step="0.1" bind:value={expB} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Exponent x = {expX}</span></div>
              <input type="range" min="0" max="10" bind:value={expX} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs font-bold uppercase text-base-content/50">Output f({expX})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{expVal}</div>
          <p class="text-xs font-mono bg-base-200 px-3 py-1.5 rounded-lg border border-base-300">{expA} · ({expB})^{expX} = {expVal}</p>
        </div>
      </div>

    <!-- TAB 3: EXPONENT RULES -->
    {:else if activeTab === 'rules'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Product Rule: b^m · b^n = b^(m+n)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Base b = {ruleBase}</span></div>
              <input type="range" min="2" max="5" bind:value={ruleBase} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Power m = {ruleM}</span></div>
              <input type="range" min="1" max="4" bind:value={ruleM} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Power n = {ruleN}</span></div>
              <input type="range" min="1" max="4" bind:value={ruleN} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
          <div class="text-3xl font-mono font-bold text-base-content">
            {ruleBase}<sup>{ruleM}</sup> × {ruleBase}<sup>{ruleN}</sup> = {ruleBase}<sup>{ruleM + ruleN}</sup>
          </div>
          <div class="text-5xl font-mono font-black text-primary">{ruleMultRes}</div>
        </div>
      </div>

    <!-- TAB 4: COMPOUND INTEREST -->
    {:else if activeTab === 'compound'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">A(t) = P(1 + r/n)^(nt)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Principal P = ${principal}</span></div>
              <input type="range" min="100" max="5000" step="100" bind:value={principal} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Rate r = {ratePct}%</span></div>
              <input type="range" min="1" max="25" bind:value={ratePct} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Years t = {compYears}</span></div>
              <input type="range" min="1" max="30" bind:value={compYears} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs font-bold uppercase text-base-content/50">Accumulated Value After {compYears} Years</span>
          <div class="text-5xl font-mono font-black text-primary my-3">${compoundRes}</div>
          <span class="text-xs text-base-content/70">Compounded {compFreq} times / year</span>
        </div>
      </div>

    <!-- TAB 5: LOG DEFINITION -->
    {:else if activeTab === 'logdef'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">log_b(x) = y ⟺ b^y = x</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Base b = {logBase}</span></div>
              <input type="range" min="2" max="10" bind:value={logBase} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Input x = {logX}</span></div>
              <input type="range" min="1" max="128" bind:value={logX} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <div class="text-3xl font-mono font-bold text-base-content">
            log<sub>{logBase}</sub>({logX}) = <span class="text-primary font-black text-5xl">{logRes}</span>
          </div>
          <p class="text-xs font-mono text-base-content/70 mt-3">Because {logBase}<sup>{logRes}</sup> ≈ {logX}</p>
        </div>
      </div>

    <!-- TAB 6: LOG PROPERTIES -->
    {:else if activeTab === 'logprops'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">log(AB) = log(A) + log(B)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Term A = {propA}</span></div>
              <input type="range" min="1" max="32" bind:value={propA} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Term B = {propB}</span></div>
              <input type="range" min="1" max="32" bind:value={propB} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
          <div class="text-xl font-mono">log<sub>{propBase}</sub>({propA}) + log<sub>{propBase}</sub>({propB})</div>
          <div class="text-2xl font-mono text-base-content/70">= {logA.toFixed(2)} + {logB.toFixed(2)}</div>
          <div class="text-4xl font-mono font-black text-primary">= {logProduct.toFixed(2)}</div>
          <div class="text-xs font-mono text-base-content/50">log<sub>{propBase}</sub>({propA * propB}) = {logProduct.toFixed(2)}</div>
        </div>
      </div>

    <!-- TAB 7: LOG SCALES & DIGITS -->
    {:else if activeTab === 'logapps'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Number of Digits: ⌊log₁₀(bᵉ)⌋ + 1</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Base b = {digitBase}</span></div>
              <input type="range" min="2" max="9" bind:value={digitBase} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Exponent e = {digitExp}</span></div>
              <input type="range" min="1" max="200" bind:value={digitExp} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs font-bold uppercase text-base-content/50">Total Digits in {digitBase}^{digitExp}</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{numDigits} <span class="text-xl">digits</span></div>
          <p class="text-xs font-mono text-base-content/70">⌊{digitExp} × log₁₀({digitBase})⌋ + 1 = {numDigits}</p>
        </div>
      </div>

    <!-- TAB 8: EULER & POWER -->
    {:else if activeTab === 'extra'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Euler's e = lim (1 + 1/n)ⁿ</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Steps n = {eulerN}</span></div>
              <input type="range" min="1" max="10000" step="100" bind:value={eulerN} class="range range-xs range-primary" />
            </div>
            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs">
              <span class="font-bold text-primary">True Value e:</span> 2.718281828...
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs font-bold uppercase text-base-content/50">Approximation with n = {eulerN}</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{eulerApprox}</div>
          <p class="text-xs text-base-content/70">(1 + 1/{eulerN})^{eulerN} = {eulerApprox}</p>
        </div>
      </div>
    {/if}

  </div>
</div>
