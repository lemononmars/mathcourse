<script lang="ts">
  import ShieldAlert from '@lucide/svelte/icons/shield-alert';
  import Scale from '@lucide/svelte/icons/scale';
  import AlertTriangle from '@lucide/svelte/icons/alert-triangle';

  type TabType = 'framework' | 'errors' | 'pvalue';
  let activeTab = $state<TabType>('pvalue');

  // p-value Decision Engine
  let alphaLevel = $state(0.05);
  let pValueCalculated = $state(0.028);

  let isSignificant = $derived(pValueCalculated <= alphaLevel);
</script>

<div class="ps-week11-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W11 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="pvalue">1. The p-value Decision Rule</option>
      <option value="errors">2. Type I vs Type II Errors</option>
      <option value="framework">3. H₀ vs Hₐ Formulation</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 11 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Null Hypothesis & p-Values</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'pvalue' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'pvalue')}><Scale size={14}/> p-Value Decision</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'errors' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'errors')}><AlertTriangle size={14}/> Error Tradeoff</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'pvalue'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Hypothesis Decision Engine</span>
            <div><span>Calculated p-value: {pValueCalculated}</span><input type="range" min="0.001" max="0.15" step="0.005" bind:value={pValueCalculated} class="range range-xs range-primary" /></div>
            <div><span>Significance Level α: {alphaLevel}</span><input type="range" min="0.01" max="0.10" step="0.01" bind:value={alphaLevel} class="range range-xs range-secondary" /></div>
          </div>
          <div class="p-3 bg-base-100 rounded-xl text-xs">
            Rule: If <span class="font-bold">p ≤ α</span>, reject H₀ (statistically significant effect).
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
          <span class="text-xs uppercase font-bold text-base-content/50">Decision Outcome</span>
          <div class={`text-4xl font-black ${isSignificant ? 'text-success' : 'text-warning'}`}>
            {isSignificant ? 'Reject Null Hypothesis (H₀)' : 'Fail to Reject H₀'}
          </div>
          <p class="text-sm font-mono bg-base-200 px-4 py-2 rounded-xl">
            {isSignificant ? `p (${pValueCalculated}) ≤ α (${alphaLevel}) → Significant Evidence of Effect!` : `p (${pValueCalculated}) > α (${alphaLevel}) → Not enough evidence to reject status quo.`}
          </p>
        </div>
      </div>
    {:else}
      <div class="grid md:grid-cols-2 gap-4 h-full animate-fade-in p-2">
        <div class="p-5 bg-error/10 border border-error/30 rounded-2xl flex flex-col justify-between">
          <div>
            <span class="badge badge-error badge-sm font-bold">Type I Error (α)</span>
            <h3 class="text-lg font-black mt-2">False Alarm / False Positive</h3>
            <p class="text-xs text-base-content/70 mt-2">Banning an innocent fair player because cheat detection falsely triggered.</p>
          </div>
          <span class="text-xs font-mono font-bold text-error">Controlled by Significance Level α (e.g. 0.05)</span>
        </div>

        <div class="p-5 bg-warning/10 border border-warning/30 rounded-2xl flex flex-col justify-between">
          <div>
            <span class="badge badge-warning badge-sm font-bold">Type II Error (β)</span>
            <h3 class="text-lg font-black mt-2">Missed Effect / False Negative</h3>
            <p class="text-xs text-base-content/70 mt-2">Failing to detect a subtle aimbot cheater because the threshold was too strict.</p>
          </div>
          <span class="text-xs font-mono font-bold text-warning">Statistical Power = 1 - β</span>
        </div>
      </div>
    {/if}
  </div>
</div>
