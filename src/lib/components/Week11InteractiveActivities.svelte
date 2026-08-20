<script lang="ts">
  import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
  import Scale from '@lucide/svelte/icons/scale';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Target from '@lucide/svelte/icons/target';
  import Gauge from '@lucide/svelte/icons/gauge';

  type TabType = 'pmf' | 'expected' | 'binomial' | 'geometric' | 'variance';
  let activeTab = $state<TabType>('expected');

  // Expected Value
  let outcome1 = $state(100);
  let prob1Pct = $state(20);
  let outcome2 = $state(10);
  let prob2Pct = $state(50);
  let outcome3 = $state(0);
  let prob3Pct = $derived(100 - prob1Pct - prob2Pct);

  let expectedVal = $derived(
    ((outcome1 * prob1Pct + outcome2 * prob2Pct + outcome3 * prob3Pct) / 100).toFixed(2)
  );

  // Binomial B(n, p)
  let binomN = $state(10);
  let binomP = $state(0.3); // 30% drop rate
  let binomK = $state(3);

  function binomCoeff(n: number, k: number): number {
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return res;
  }

  let binomProb = $derived(
    (
      binomCoeff(binomN, binomK) *
      Math.pow(binomP, binomK) *
      Math.pow(1 - binomP, binomN - binomK)
    ).toFixed(4)
  );

  // Geometric Distribution
  let dropRatePct = $state(2); // 2% SSR rate
  let expPullsUntilSuccess = $derived((100 / (dropRatePct || 1)).toFixed(1));
  let probWithin10Pulls = $derived(
    ((1 - Math.pow(1 - dropRatePct / 100, 10)) * 100).toFixed(1)
  );
  let probWithin50Pulls = $derived(
    ((1 - Math.pow(1 - dropRatePct / 100, 50)) * 100).toFixed(1)
  );
</script>

<div class="week11-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W11 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="expected">1. Expected Value E[X]</option>
      <option value="binomial">2. Binomial Distribution</option>
      <option value="geometric">3. Geometric (Gacha Pity)</option>
      <option value="pmf">4. PMF Distribution</option>
      <option value="variance">5. Variance & Risk</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 11 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Random Variables & Distributions</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'expected' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'expected')}>
        <Scale size={14} /> Expected Value
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'binomial' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'binomial')}>
        <Sparkles size={14} /> Binomial B(n,p)
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'geometric' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'geometric')}>
        <Target size={14} /> Gacha Pity
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'pmf' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'pmf')}>
        <BarChart3 size={14} /> PMF
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'variance' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'variance')}>
        <Gauge size={14} /> Variance
      </button>
    </div>
  </div>

  <!-- Content Area -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: EXPECTED VALUE -->
    {#if activeTab === 'expected'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-6 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Loot Box Payoff Model</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Jackpot: +{outcome1} Gold (Chance: {prob1Pct}%)</span>
              </div>
              <input type="range" min="10" max="500" step="10" bind:value={outcome1} class="range range-xs range-primary" />
              <input type="range" min="1" max="40" bind:value={prob1Pct} class="range range-xs range-primary mt-1" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Common: +{outcome2} Gold (Chance: {prob2Pct}%)</span>
              </div>
              <input type="range" min="1" max="50" bind:value={outcome2} class="range range-xs range-secondary" />
              <input type="range" min="1" max={90 - prob1Pct} bind:value={prob2Pct} class="range range-xs range-secondary mt-1" />
            </div>

            <div class="p-2 bg-base-100 rounded-xl text-xs">
              <span class="text-base-content/70">Trash Item (+0 Gold): {prob3Pct}%</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Expected Value E[X]</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{expectedVal} <span class="text-xl">Gold</span></div>
          <p class="text-xs font-mono text-base-content/70">Fair price for this loot box is {expectedVal} Gold per roll.</p>
        </div>
      </div>

    <!-- TAB 2: BINOMIAL DISTRIBUTION -->
    {:else if activeTab === 'binomial'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">B(n, p) Parameters</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Trials n = {binomN}</span></div>
              <input type="range" min="1" max="20" bind:value={binomN} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Success Rate p = {(binomP * 100).toFixed(0)}%</span></div>
              <input type="range" min="0.05" max="0.95" step="0.05" bind:value={binomP} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Target Successes k = {binomK}</span></div>
              <input type="range" min="0" max={binomN} bind:value={binomK} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Exact Probability P(X = {binomK})</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{(Number(binomProb) * 100).toFixed(2)}%</div>
          <span class="text-xs font-mono text-base-content/70">P(X = {binomK}) = {binomProb}</span>
        </div>
      </div>

    <!-- TAB 3: GACHA PITY (GEOMETRIC) -->
    {:else if activeTab === 'geometric'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Gacha Rate & Pity Analysis</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>SSR Drop Rate p = {dropRatePct}%</span></div>
              <input type="range" min="0.5" max="10" step="0.5" bind:value={dropRatePct} class="range range-xs range-primary" />
            </div>
            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs">
              <span class="font-bold text-primary">Expected Pulls (1/p):</span> {expPullsUntilSuccess} pulls
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-3 text-center">
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <span class="text-xs font-bold text-primary">Chance in 10 Pulls</span>
              <div class="text-3xl font-mono font-black mt-1">{probWithin10Pulls}%</div>
            </div>
            <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
              <span class="text-xs font-bold text-secondary">Chance in 50 Pulls</span>
              <div class="text-3xl font-mono font-black mt-1">{probWithin50Pulls}%</div>
            </div>
          </div>
          <p class="text-xs text-base-content/70">Notice: Even after 50 pulls at 2%, chance is not 100% (Gambler's fallacy)!</p>
        </div>
      </div>

    <!-- OTHER TABS -->
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        <span class="badge badge-primary font-bold">Distribution Summary</span>
        <div class="text-4xl font-mono font-black text-primary">E[X] = {expectedVal}</div>
        <p class="text-xs text-base-content/70">Models random outcomes across combat, economy, and reward systems.</p>
      </div>
    {/if}

  </div>
</div>
