<script lang="ts">
  import GitBranch from '@lucide/svelte/icons/git-branch';
  import X from '@lucide/svelte/icons/x';
  import Plus from '@lucide/svelte/icons/plus';
  import ArrowDownUp from '@lucide/svelte/icons/arrow-down-up';
  import Award from '@lucide/svelte/icons/award';
  import Layers from '@lucide/svelte/icons/layers';

  type TabType = 'product' | 'sum' | 'factorial' | 'perm' | 'comb';
  let activeTab = $state<TabType>('product');

  // Rule of Product
  let numHeads = $state(4);
  let numArmors = $state(3);
  let numWeapons = $state(5);
  let totalOutfits = $derived(numHeads * numArmors * numWeapons);

  // Rule of Sum
  let meleeSkills = $state(4);
  let magicSkills = $state(6);
  let totalChoice = $derived(meleeSkills + magicSkills);

  // Factorial
  let factN = $state(5);
  function factorial(n: number): number {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }
  let factRes = $derived(factorial(factN));

  // Permutation P(n, r)
  let permN = $state(6);
  let permR = $state(3);
  let permRes = $derived(Math.floor(factorial(permN) / factorial(Math.max(1, permN - permR))));

  // Combination C(n, r)
  let combN = $state(8);
  let combR = $state(3);
  let combRes = $derived(Math.floor(factorial(combN) / (factorial(combR) * factorial(Math.max(1, combN - combR)))));
</script>

<div class="week9-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W9 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="product">1. Rule of Product</option>
      <option value="sum">2. Rule of Sum</option>
      <option value="factorial">3. Factorial (n!)</option>
      <option value="perm">4. Permutation P(n,r)</option>
      <option value="comb">5. Combination C(n,r)</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 9 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Counting & Combinatorics</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'product' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'product')}>
        <X size={14} /> Product Rule
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'sum' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'sum')}>
        <Plus size={14} /> Sum Rule
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'factorial' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'factorial')}>
        <ArrowDownUp size={14} /> Factorial (n!)
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'perm' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'perm')}>
        <Award size={14} /> Permutation P(n,r)
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'comb' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'comb')}>
        <Layers size={14} /> Combination C(n,r)
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: PRODUCT RULE -->
    {#if activeTab === 'product'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Avatar Customizer Combinations</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Head Choices: {numHeads}</span></div>
              <input type="range" min="1" max="10" bind:value={numHeads} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Armor Choices: {numArmors}</span></div>
              <input type="range" min="1" max="10" bind:value={numArmors} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Weapon Choices: {numWeapons}</span></div>
              <input type="range" min="1" max="10" bind:value={numWeapons} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Total Custom Loadouts</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{totalOutfits}</div>
          <p class="text-xs font-mono text-base-content/70">{numHeads} × {numArmors} × {numWeapons} = {totalOutfits} unique combos</p>
        </div>
      </div>

    <!-- TAB 4: PERMUTATION -->
    {:else if activeTab === 'perm'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">P(n, r) - Order Matters</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Pool of Candidates n = {permN}</span></div>
              <input type="range" min="1" max="10" bind:value={permN} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Selected Positions r = {permR}</span></div>
              <input type="range" min="1" max={permN} bind:value={permR} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Permutations P({permN}, {permR})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{permRes}</div>
          <p class="text-xs font-mono text-base-content/70">{permN}! / ({permN} - {permR})! = {permRes} ways</p>
        </div>
      </div>

    <!-- TAB 5: COMBINATION -->
    {:else if activeTab === 'comb'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">C(n, r) - Order Does Not Matter</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Deck / Card Pool n = {combN}</span></div>
              <input type="range" min="1" max="12" bind:value={combN} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Hand Size r = {combR}</span></div>
              <input type="range" min="1" max={combN} bind:value={combR} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Unique Hands C({combN}, {combR})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{combRes}</div>
          <p class="text-xs font-mono text-base-content/70">{combN}! / ({combR}! × {combN - combR}!) = {combRes} hands</p>
        </div>
      </div>

    <!-- OTHER TABS -->
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        {#if activeTab === 'sum'}
          <span class="badge badge-primary font-bold">Rule of Sum</span>
          <div class="text-5xl font-mono font-black text-primary">{meleeSkills} + {magicSkills} = {totalChoice}</div>
          <p class="text-xs text-base-content/70">When choices are mutually exclusive, add their possibilities.</p>
        {:else}
          <span class="badge badge-primary font-bold">Factorial</span>
          <div class="text-5xl font-mono font-black text-primary">{factN}! = {factRes}</div>
          <p class="text-xs text-base-content/70">Total ways to arrange {factN} distinct items.</p>
        {/if}
      </div>
    {/if}

  </div>
</div>
