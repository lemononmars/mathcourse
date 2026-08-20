<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import PieChart from '@lucide/svelte/icons/pie-chart';
  import GitFork from '@lucide/svelte/icons/git-fork';
  import Layers from '@lucide/svelte/icons/layers';

  type TabType = 'simulator' | 'complement' | 'conditional' | 'union';
  let activeTab = $state<TabType>('simulator');

  // Simulator
  let rollCount = $state(100);
  let targetDie = $state(6);
  let theoreticalProb = $derived((1 / 6).toFixed(3));

  // Complement Rule
  let eventProbPct = $state(30);
  let compProbPct = $derived(100 - eventProbPct);

  // Conditional Probability P(A|B)
  let pBothPct = $state(15);
  let pGivenPct = $state(50);
  let pCondPct = $derived(((pBothPct / (pGivenPct || 1)) * 100).toFixed(1));

  // Union Rule P(A u B)
  let probAPct = $state(40);
  let probBPct = $state(50);
  let probIntersectionPct = $state(20);
  let probUnionPct = $derived(probAPct + probBPct - probIntersectionPct);
</script>

<div class="week10-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W10 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="simulator">1. Probability Simulator</option>
      <option value="complement">2. Complement Rule</option>
      <option value="conditional">3. Conditional P(A|B)</option>
      <option value="union">4. Union & Addition Rule</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 10 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Probability & Events</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'simulator' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'simulator')}>
        <Dices size={14} /> Dice Prob
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'complement' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'complement')}>
        <PieChart size={14} /> Complement
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'conditional' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'conditional')}>
        <GitFork size={14} /> Conditional
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'union' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'union')}>
        <Layers size={14} /> Addition Rule
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: SIMULATOR -->
    {#if activeTab === 'simulator'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Fair 6-Sided Die</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Target Face: {targetDie}</span></div>
              <input type="range" min="1" max="6" bind:value={targetDie} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Total Rolls: {rollCount}</span></div>
              <input type="range" min="10" max="1000" step="10" bind:value={rollCount} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Theoretical Probability P(Die = {targetDie})</span>
          <div class="text-5xl font-mono font-black text-primary my-3">1/6 ≈ {theoreticalProb}</div>
          <span class="text-xs font-mono text-base-content/70">16.67% expected frequency over {rollCount} rolls</span>
        </div>
      </div>

    <!-- TAB 2: COMPLEMENT -->
    {:else if activeTab === 'complement'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">P(Eᶜ) = 1 - P(E)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Critical Hit Chance: {eventProbPct}%</span></div>
              <input type="range" min="0" max="100" bind:value={eventProbPct} class="range range-xs range-primary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-4">
          <div class="grid grid-cols-2 gap-3 text-center">
            <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <span class="text-xs font-bold text-primary">P(Critical Hit)</span>
              <div class="text-3xl font-mono font-black mt-1">{eventProbPct}%</div>
            </div>
            <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
              <span class="text-xs font-bold text-secondary">P(Normal Hit / Miss)</span>
              <div class="text-3xl font-mono font-black mt-1">{compProbPct}%</div>
            </div>
          </div>
          <p class="text-xs text-center text-base-content/70">Sum of an event and its complement is always 100%.</p>
        </div>
      </div>

    <!-- TAB 3: CONDITIONAL -->
    {:else if activeTab === 'conditional'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">P(A | B) = P(A ∩ B) / P(B)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Joint P(A ∩ B): {pBothPct}%</span></div>
              <input type="range" min="1" max={pGivenPct} bind:value={pBothPct} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Given Condition P(B): {pGivenPct}%</span></div>
              <input type="range" min="10" max="100" bind:value={pGivenPct} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Conditional Probability P(A | B)</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{pCondPct}%</div>
          <p class="text-xs font-mono text-base-content/70">P(A|B) = {pBothPct}% / {pGivenPct}% = {pCondPct}%</p>
        </div>
      </div>

    <!-- TAB 4: UNION -->
    {:else}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>P(A): {probAPct}%</span></div>
              <input type="range" min="0" max="60" bind:value={probAPct} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>P(B): {probBPct}%</span></div>
              <input type="range" min="0" max="60" bind:value={probBPct} class="range range-xs range-secondary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>P(A ∩ B): {probIntersectionPct}%</span></div>
              <input type="range" min="0" max={Math.min(probAPct, probBPct)} bind:value={probIntersectionPct} class="range range-xs" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Union Probability P(A ∪ B)</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{probUnionPct}%</div>
          <p class="text-xs font-mono text-base-content/70">{probAPct}% + {probBPct}% - {probIntersectionPct}% = {probUnionPct}%</p>
        </div>
      </div>
    {/if}

  </div>
</div>
