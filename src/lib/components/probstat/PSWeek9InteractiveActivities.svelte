<script lang="ts">
  import Gauge from '@lucide/svelte/icons/gauge';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import BarChart from '@lucide/svelte/icons/bar-chart';

  type TabType = 'empirical' | 'zscore' | 'clt';
  let activeTab = $state<TabType>('empirical');

  let empiricalK = $state(1); // 1, 2, or 3 std deviations
  let empiricalCoverage = $derived(empiricalK === 1 ? '68.2%' : empiricalK === 2 ? '95.4%' : '99.7%');

  // Z-Score Standardization
  let rawScoreX = $state(115);
  let popMean = $state(100);
  let popStd = $state(15);
  let zScore = $derived(((rawScoreX - popMean) / (popStd || 1)).toFixed(2));
</script>

<div class="ps-week9-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W9 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="empirical">1. The Empirical Rule (68-95-99.7)</option>
      <option value="zscore">2. Z-Score Standardization</option>
      <option value="clt">3. Central Limit Theorem</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 9 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Standard Normal & Z-Scores</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'empirical' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'empirical')}><Gauge size={14}/> 68-95-99.7 Rule</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'zscore' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'zscore')}><Sparkles size={14}/> Z-Score</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'clt' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'clt')}><BarChart size={14}/> CLT</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'empirical'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Standard Deviation Bounds</span>
            <div class="join w-full">
              <button class={`join-item btn btn-sm flex-1 ${empiricalK === 1 ? 'btn-primary' : 'btn-outline'}`} onclick={() => empiricalK = 1}>±1σ (68%)</button>
              <button class={`join-item btn btn-sm flex-1 ${empiricalK === 2 ? 'btn-primary' : 'btn-outline'}`} onclick={() => empiricalK = 2}>±2σ (95%)</button>
              <button class={`join-item btn btn-sm flex-1 ${empiricalK === 3 ? 'btn-primary' : 'btn-outline'}`} onclick={() => empiricalK = 3}>±3σ (99.7%)</button>
            </div>
            <div class="p-3 bg-base-100 rounded-xl text-xs space-y-1">
              <p class="font-bold text-primary">Empirical Rule:</p>
              <p class="text-base-content/70">For any bell-shaped normal distribution, approximately {empiricalCoverage} of all values fall within ±{empiricalK} standard deviations of the mean.</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Data Coverage within [μ - {empiricalK}σ, μ + {empiricalK}σ]</span>
          <div class="text-7xl font-mono font-black text-primary my-3">{empiricalCoverage}</div>
        </div>
      </div>
    {:else if activeTab === 'zscore'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Standardization: z = (x - μ) / σ</span>
            <div><span>Raw Score x = {rawScoreX}</span><input type="range" min="50" max="150" bind:value={rawScoreX} class="range range-xs range-primary" /></div>
            <div><span>Population Mean μ = {popMean}</span><input type="range" min="50" max="150" bind:value={popMean} class="range range-xs range-secondary" /></div>
            <div><span>Standard Dev σ = {popStd}</span><input type="range" min="5" max="30" bind:value={popStd} class="range range-xs" /></div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Standardized Z-Score</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{zScore}</div>
          <p class="text-xs font-mono text-base-content/70">z = ({rawScoreX} - {popMean}) / {popStd} = {zScore}</p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        <span class="badge badge-primary font-bold">Central Limit Theorem (CLT)</span>
        <div class="text-3xl font-mono font-black text-primary">x̄ ~ N(μ, σ / √n)</div>
        <p class="text-xs text-base-content/70 max-w-md">As sample size n increases, the distribution of sample averages becomes normal, regardless of the underlying population shape!</p>
      </div>
    {/if}
  </div>
</div>
