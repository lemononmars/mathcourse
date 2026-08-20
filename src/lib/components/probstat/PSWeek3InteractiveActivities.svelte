<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import Plus from '@lucide/svelte/icons/plus';
  import ArrowDownUp from '@lucide/svelte/icons/arrow-down-up';
  import Award from '@lucide/svelte/icons/award';
  import Layers from '@lucide/svelte/icons/layers';

  type TabType = 'product' | 'sum' | 'factorial' | 'perm' | 'comb';
  let activeTab = $state<TabType>('product');

  let prodN1 = $state(4);
  let prodN2 = $state(3);
  let prodTotal = $derived(prodN1 * prodN2);

  let sumN1 = $state(5);
  let sumN2 = $state(7);
  let sumTotal = $derived(sumN1 + sumN2);

  let factN = $state(6);
  function fact(n: number) {
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }
  let factVal = $derived(fact(factN));

  let permN = $state(7);
  let permR = $state(3);
  let permVal = $derived(Math.floor(fact(permN) / fact(Math.max(1, permN - permR))));

  let combN = $state(9);
  let combR = $state(4);
  let combVal = $derived(Math.floor(fact(combN) / (fact(combR) * fact(Math.max(1, combN - combR)))));
</script>

<div class="ps-week3-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W3 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="product">1. Rule of Product</option>
      <option value="sum">2. Rule of Sum</option>
      <option value="factorial">3. Factorial (n!)</option>
      <option value="perm">4. Permutation P(n,r)</option>
      <option value="comb">5. Combination C(n,r)</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 3 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Counting & Combinatorics</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'product' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'product')}><X size={14}/> Product</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'sum' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'sum')}><Plus size={14}/> Sum</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'factorial' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'factorial')}><ArrowDownUp size={14}/> Factorial</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'perm' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'perm')}><Award size={14}/> P(n,r)</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'comb' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'comb')}><Layers size={14}/> C(n,r)</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'product'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Stage Choices</span>
            <div><span>Stage 1 Choices: {prodN1}</span><input type="range" min="1" max="10" bind:value={prodN1} class="range range-xs range-primary" /></div>
            <div><span>Stage 2 Choices: {prodN2}</span><input type="range" min="1" max="10" bind:value={prodN2} class="range range-xs range-secondary" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Total Outcomes</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{prodTotal}</div>
          <p class="text-xs font-mono">{prodN1} × {prodN2} = {prodTotal}</p>
        </div>
      </div>
    {:else if activeTab === 'perm'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Permutations P(n,r)</span>
            <div><span>Total Pool n = {permN}</span><input type="range" min="1" max="10" bind:value={permN} class="range range-xs range-primary" /></div>
            <div><span>Slots r = {permR}</span><input type="range" min="1" max={permN} bind:value={permR} class="range range-xs range-secondary" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Ordered Permutations P({permN}, {permR})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{permVal}</div>
        </div>
      </div>
    {:else if activeTab === 'comb'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Combinations C(n,r)</span>
            <div><span>Deck Pool n = {combN}</span><input type="range" min="1" max="12" bind:value={combN} class="range range-xs range-primary" /></div>
            <div><span>Hand Size r = {combR}</span><input type="range" min="1" max={combN} bind:value={combR} class="range range-xs range-secondary" /></div>
          </div>
        </div>
        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Unordered Combinations C({combN}, {combR})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{combVal}</div>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        {#if activeTab === 'sum'}
          <span class="badge badge-primary font-bold">Rule of Sum</span>
          <div class="text-5xl font-mono font-black text-primary">{sumN1} + {sumN2} = {sumTotal}</div>
        {:else}
          <span class="badge badge-primary font-bold">Factorial (n!)</span>
          <div class="text-5xl font-mono font-black text-primary">{factN}! = {factVal}</div>
        {/if}
      </div>
    {/if}
  </div>
</div>
