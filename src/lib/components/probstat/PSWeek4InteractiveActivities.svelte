<script lang="ts">
  import Lock from '@lucide/svelte/icons/lock';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Grid from '@lucide/svelte/icons/grid';

  type TabType = 'restrictions' | 'starsbars' | 'pascal';
  let activeTab = $state<TabType>('starsbars');

  // Stars and Bars (Combinations with Repetition): C(n + k - 1, k)
  let itemsK = $state(6); // 6 skill points
  let categoriesN = $state(3); // 3 stats (STR, DEX, INT)

  function fact(n: number) {
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }
  function nCr(n: number, r: number) {
    if (r < 0 || r > n) return 0;
    return Math.floor(fact(n) / (fact(r) * fact(n - r)));
  }

  let starsBarsComb = $derived(nCr(categoriesN + itemsK - 1, itemsK));

  // Restrictions (e.g. Choose 4 from 10, but 2 specific players MUST be included)
  let totalPool = $state(10);
  let teamSize = $state(4);
  let mustInclude = $state(2);
  let restrictedComb = $derived(nCr(totalPool - mustInclude, teamSize - mustInclude));
</script>

<div class="ps-week4-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W4 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="starsbars">1. Stars & Bars (Repetition)</option>
      <option value="restrictions">2. Selections with Restrictions</option>
      <option value="pascal">3. Pascal's Triangle Identity</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 4 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Advanced Combinatorics</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'starsbars' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'starsbars')}><Sparkles size={14}/> Stars & Bars</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'restrictions' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'restrictions')}><Lock size={14}/> Restrictions</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'pascal' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'pascal')}><Grid size={14}/> Pascal's Rule</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'starsbars'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Resource Distribution</span>
            <div><span>Skill Points (Stars) k = {itemsK}</span><input type="range" min="1" max="10" bind:value={itemsK} class="range range-xs range-primary" /></div>
            <div><span>Stat Categories (Bins) n = {categoriesN}</span><input type="range" min="2" max="6" bind:value={categoriesN} class="range range-xs range-secondary" /></div>
          </div>
          <div class="p-3 bg-base-100 rounded-xl text-xs">
            Formula: C(n + k - 1, k) = C({categoriesN + itemsK - 1}, {itemsK})
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Distinct Skill Builds</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{starsBarsComb}</div>
          <span class="badge badge-secondary font-mono">{itemsK} points across {categoriesN} stats</span>
        </div>
      </div>
    {:else if activeTab === 'restrictions'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Restricted Team Selection</span>
            <div><span>Total Squad n = {totalPool}</span><input type="range" min="5" max="15" bind:value={totalPool} class="range range-xs range-primary" /></div>
            <div><span>Active Team Size r = {teamSize}</span><input type="range" min="2" max="6" bind:value={teamSize} class="range range-xs range-secondary" /></div>
            <div><span>Must-Include VIPs = {mustInclude}</span><input type="range" min="1" max={Math.min(mustInclude + 1, teamSize)} bind:value={mustInclude} class="range range-xs" /></div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Restricted Combinations</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{restrictedComb}</div>
          <p class="text-xs font-mono">C({totalPool - mustInclude}, {teamSize - mustInclude}) = {restrictedComb}</p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        <span class="badge badge-primary font-bold">Pascal's Identity</span>
        <div class="text-3xl font-mono font-black text-primary">C(n, r) = C(n-1, r-1) + C(n-1, r)</div>
        <p class="text-xs text-base-content/70">Each cell in Pascal's triangle is the sum of the two cells directly above it.</p>
      </div>
    {/if}
  </div>
</div>
