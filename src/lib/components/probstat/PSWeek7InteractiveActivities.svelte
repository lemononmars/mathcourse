<script lang="ts">
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Target from '@lucide/svelte/icons/target';
  import Layers from '@lucide/svelte/icons/layers';
  import Clock from '@lucide/svelte/icons/clock';

  type TabType = 'binomial' | 'geometric' | 'hyper' | 'poisson';
  let activeTab = $state<TabType>('binomial');

  function fact(n: number): number {
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }
  function nCr(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    return Math.floor(fact(n) / (fact(r) * fact(n - r)));
  }

  // Binomial
  let binomN = $state(10);
  let binomP = $state(0.4);
  let binomK = $state(4);
  let binomProb = $derived((nCr(binomN, binomK) * Math.pow(binomP, binomK) * Math.pow(1 - binomP, binomN - binomK)).toFixed(4));

  // Geometric
  let geomP = $state(0.05); // 5% drop
  let geomK = $state(10);   // on 10th pull
  let geomProb = $derived((Math.pow(1 - geomP, geomK - 1) * geomP).toFixed(4));

  // Poisson: P(X = k) = e^(-lambda) * lambda^k / k!
  let lambdaRate = $state(3); // 3 enemy spawns / min
  let poissonK = $state(3);
  let poissonProb = $derived((Math.exp(-lambdaRate) * Math.pow(lambdaRate, poissonK) / fact(poissonK)).toFixed(4));
</script>

<div class="ps-week7-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W7 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="binomial">1. Binomial Distribution</option>
      <option value="geometric">2. Geometric Distribution</option>
      <option value="poisson">3. Poisson Process</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 7 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Discrete Probability Distributions</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'binomial' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'binomial')}><Sparkles size={14}/> Binomial</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'geometric' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'geometric')}><Target size={14}/> Geometric</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'poisson' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'poisson')}><Clock size={14}/> Poisson</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'binomial'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Binomial B(n, p)</span>
            <div><span>Total Shots n = {binomN}</span><input type="range" min="1" max="20" bind:value={binomN} class="range range-xs range-primary" /></div>
            <div><span>Hit Chance p = {(binomP * 100).toFixed(0)}%</span><input type="range" min="0.05" max="0.95" step="0.05" bind:value={binomP} class="range range-xs range-secondary" /></div>
            <div><span>Target Hits k = {binomK}</span><input type="range" min="0" max={binomN} bind:value={binomK} class="range range-xs" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Probability P(X = {binomK})</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{(Number(binomProb) * 100).toFixed(2)}%</div>
          <span class="text-xs font-mono">P(X={binomK}) = {binomProb}</span>
        </div>
      </div>
    {:else if activeTab === 'poisson'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Poisson λ Rate</span>
            <div><span>Avg Spawns/min λ = {lambdaRate}</span><input type="range" min="1" max="10" bind:value={lambdaRate} class="range range-xs range-primary" /></div>
            <div><span>Observed Count k = {poissonK}</span><input type="range" min="0" max="15" bind:value={poissonK} class="range range-xs range-secondary" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Probability P(X = {poissonK})</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{(Number(poissonProb) * 100).toFixed(2)}%</div>
        </div>
      </div>
    {:else}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Geometric Drop Trials</span>
            <div><span>SSR Drop Rate p = {(geomP * 100).toFixed(0)}%</span><input type="range" min="0.01" max="0.30" step="0.01" bind:value={geomP} class="range range-xs range-primary" /></div>
            <div><span>Success on Pull #k = {geomK}</span><input type="range" min="1" max="50" bind:value={geomK} class="range range-xs range-secondary" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Probability First SSR is on Pull #{geomK}</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{(Number(geomProb) * 100).toFixed(2)}%</div>
        </div>
      </div>
    {/if}
  </div>
</div>
