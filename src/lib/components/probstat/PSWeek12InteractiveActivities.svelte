<script lang="ts">
  import Swords from '@lucide/svelte/icons/swords';
  import Target from '@lucide/svelte/icons/target';
  import Scale from '@lucide/svelte/icons/scale';

  type TabType = 'patch' | 'twotail';
  let activeTab = $state<TabType>('patch');

  // Game Patch Win Rate Proportion Test
  // H0: p = 0.50 (Balanced 50% winrate) vs Ha: p > 0.50 (Overpowered)
  let sampleWins = $state(580);
  let sampleMatches = $state(1000);
  let sampleProp = $derived(sampleWins / (sampleMatches || 1));

  let zTestStat = $derived.by(() => {
    const p0 = 0.50;
    const pHat = sampleProp;
    const se = Math.sqrt((p0 * (1 - p0)) / sampleMatches);
    return ((pHat - p0) / (se || 1)).toFixed(2);
  });

  let isNerfNeeded = $derived(Number(zTestStat) > 1.96);
</script>

<div class="ps-week12-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W12 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="patch">1. Hero Win-Rate A/B Balance Test</option>
      <option value="twotail">2. One-Tailed vs Two-Tailed Rejection</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 12 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Game Balancing Analytics & Inference</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'patch' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'patch')}><Swords size={14}/> Hero Balance Test</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'twotail' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'twotail')}><Scale size={14}/> Tail Rejections</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
      <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">New Character Match Data</span>
          <div><span>Matches Played: {sampleMatches}</span><input type="range" min="200" max="2000" step="100" bind:value={sampleMatches} class="range range-xs range-primary" /></div>
          <div><span>Wins: {sampleWins} ({(sampleProp * 100).toFixed(1)}% win rate)</span><input type="range" min="50" max={sampleMatches} bind:value={sampleWins} class="range range-xs range-secondary" /></div>
        </div>
        <div class="p-3 bg-base-100 rounded-xl text-xs space-y-1 font-mono">
          <div>H₀: Win rate = 50%</div>
          <div>Hₐ: Win rate &gt; 50% (OP Hero)</div>
        </div>
      </div>

      <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
        <span class="text-xs uppercase font-bold text-base-content/50">Z-Statistic for Proportion</span>
        <div class="text-5xl font-mono font-black text-primary">{zTestStat}</div>
        <div class={`badge badge-lg font-bold ${isNerfNeeded ? 'badge-error' : 'badge-success'}`}>
          {isNerfNeeded ? 'Overpowered: Statistically Significant (Nerf Required!)' : 'Within Normal Variance Range (Balanced)'}
        </div>
        <p class="text-xs text-base-content/70">Critical z* threshold at α = 0.05 is 1.645 (one-tailed) or 1.96 (two-tailed).</p>
      </div>
    </div>
  </div>
</div>
