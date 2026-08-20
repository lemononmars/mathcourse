<script lang="ts">
  import Scale from '@lucide/svelte/icons/scale';
  import Gauge from '@lucide/svelte/icons/gauge';
  import BarChart from '@lucide/svelte/icons/bar-chart-2';

  type TabType = 'expected' | 'variance' | 'pmf';
  let activeTab = $state<TabType>('expected');

  // RPG Boss Drop Table: Outcome x and Probability P(X=x)
  let dropA_val = $state(500); // Rare weapon
  let dropA_p = $state(0.05);
  let dropB_val = $state(100); // Gold bag
  let dropB_p = $state(0.25);
  let dropC_val = $state(10);  // Potion
  let dropC_p = $derived(Number((1 - dropA_p - dropB_p).toFixed(2)));

  let expVal = $derived((dropA_val * dropA_p + dropB_val * dropB_p + dropC_val * dropC_p).toFixed(2));

  let expX2 = $derived(
    Math.pow(dropA_val, 2) * dropA_p +
    Math.pow(dropB_val, 2) * dropB_p +
    Math.pow(dropC_val, 2) * dropC_p
  );
  let varianceVal = $derived((expX2 - Math.pow(Number(expVal), 2)).toFixed(2));
  let stdDevVal = $derived(Math.sqrt(Math.max(0, Number(varianceVal))).toFixed(2));
</script>

<div class="ps-week6-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W6 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="expected">1. Expected Value E[X]</option>
      <option value="variance">2. Variance & Risk Var(X)</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 6 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Random Variables & Payoffs</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'expected' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'expected')}><Scale size={14}/> Expected Value</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'variance' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'variance')}><Gauge size={14}/> Variance & Risk</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
      <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Boss Loot Table (PMF)</span>
          <div>
            <div class="flex justify-between text-xs font-bold mb-1"><span>Rare Drop Value: {dropA_val} ({(dropA_p * 100).toFixed(0)}%)</span></div>
            <input type="range" min="100" max="1000" step="50" bind:value={dropA_val} class="range range-xs range-primary" />
            <input type="range" min="0.01" max="0.30" step="0.01" bind:value={dropA_p} class="range range-xs range-primary mt-1" />
          </div>
          <div>
            <div class="flex justify-between text-xs font-bold mb-1"><span>Common Gold: {dropB_val} ({(dropB_p * 100).toFixed(0)}%)</span></div>
            <input type="range" min="10" max="200" step="10" bind:value={dropB_val} class="range range-xs range-secondary" />
            <input type="range" min="0.10" max="0.60" step="0.05" bind:value={dropB_p} class="range range-xs range-secondary mt-1" />
          </div>
          <div class="p-2 bg-base-100 rounded-xl text-xs">
            <span>Potion Value: {dropC_val} ({(dropC_p * 100).toFixed(0)}%)</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-4">
        <div class="p-4 bg-primary/10 rounded-2xl border border-primary/30">
          <span class="text-xs font-bold uppercase text-primary">Expected Payoff E[X]</span>
          <div class="text-5xl font-mono font-black mt-2">{expVal} <span class="text-lg">Gold</span></div>
          <p class="text-xs text-base-content/70 mt-1">E[X] = Σ x · P(x)</p>
        </div>

        <div class="grid grid-cols-2 gap-3 text-center">
          <div class="p-3 bg-base-200/50 rounded-xl">
            <span class="text-xs font-bold text-base-content/60">Variance Var(X)</span>
            <div class="text-2xl font-mono font-black text-secondary mt-1">{varianceVal}</div>
          </div>
          <div class="p-3 bg-base-200/50 rounded-xl">
            <span class="text-xs font-bold text-base-content/60">Std Dev σ</span>
            <div class="text-2xl font-mono font-black text-secondary mt-1">{stdDevVal}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
