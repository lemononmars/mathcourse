<script lang="ts">
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import Sliders from '@lucide/svelte/icons/sliders';
  import Activity from '@lucide/svelte/icons/activity';

  type TabType = 'normal' | 'cdf';
  let activeTab = $state<TabType>('normal');

  // Normal Curve Parameters
  let meanMu = $state(50);
  let stdSigma = $state(10);
  let targetX = $state(60);

  // Standard Normal approx
  function stdNormalCDF(z: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
  }

  let zScore = $derived(((targetX - meanMu) / (stdSigma || 1)).toFixed(2));
  let probBelow = $derived((stdNormalCDF(Number(zScore)) * 100).toFixed(2));
</script>

<div class="ps-week8-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W8 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="normal">1. Normal Distribution (μ, σ)</option>
      <option value="cdf">2. Cumulative Probability P(X ≤ x)</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 8 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Continuous & Normal Curves</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'normal' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'normal')}><TrendingUp size={14}/> Normal Curve</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'cdf' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'cdf')}><Activity size={14}/> CDF Area</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
      <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Normal Curve Parameters</span>
          <div><span>Mean μ = {meanMu}</span><input type="range" min="20" max="80" bind:value={meanMu} class="range range-xs range-primary" /></div>
          <div><span>Standard Deviation σ = {stdSigma}</span><input type="range" min="2" max="25" bind:value={stdSigma} class="range range-xs range-secondary" /></div>
          <div><span>Evaluation Point x = {targetX}</span><input type="range" min="10" max="90" bind:value={targetX} class="range range-xs" /></div>
        </div>
        <div class="p-3 bg-base-100 rounded-xl font-mono text-xs">
          Z-Score = ({targetX} - {meanMu}) / {stdSigma} = <span class="font-bold text-primary">{zScore}</span>
        </div>
      </div>

      <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
        <span class="text-xs uppercase font-bold text-base-content/50">Cumulative Probability P(X ≤ {targetX})</span>
        <div class="text-6xl font-mono font-black text-primary my-2">{probBelow}%</div>
        <p class="text-xs text-base-content/70">Area under normal curve to the left of x = {targetX}.</p>
      </div>
    </div>
  </div>
</div>
