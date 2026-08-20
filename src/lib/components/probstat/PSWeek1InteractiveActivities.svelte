<script lang="ts">
  import BarChart from '@lucide/svelte/icons/bar-chart-2';
  import PieChart from '@lucide/svelte/icons/pie-chart';
  import Users from '@lucide/svelte/icons/users';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Database from '@lucide/svelte/icons/database';

  type TabType = 'datatypes' | 'histogram' | 'birthday' | 'survey';
  let activeTab = $state<TabType>('datatypes');

  // TAB 1: Data Type Classifier
  type VariableItem = { name: string; type: 'qualitative' | 'discrete' | 'continuous'; desc: string };
  const sampleVariables: VariableItem[] = [
    { name: 'Character Class (Warrior/Mage)', type: 'qualitative', desc: 'Category label (nominal)' },
    { name: 'Inventory Item Count', type: 'discrete', desc: 'Countable whole integer' },
    { name: 'Player Movement Speed (m/s)', type: 'continuous', desc: 'Measurable real number' },
    { name: 'Server Ping Latency (ms)', type: 'continuous', desc: 'Continuous time measurement' },
    { name: 'Number of Boss Kills', type: 'discrete', desc: 'Non-negative integer count' },
    { name: 'Guild Name', type: 'qualitative', desc: 'Categorical string identifier' }
  ];
  let selectedVarIndex = $state(0);

  // TAB 2: Interactive Frequency & Histogram
  let bin1 = $state(8);  // 0-20 score
  let bin2 = $state(15); // 21-40
  let bin3 = $state(28); // 41-60
  let bin4 = $state(22); // 61-80
  let bin5 = $state(12); // 81-100
  let totalSamples = $derived(bin1 + bin2 + bin3 + bin4 + bin5);
  let maxBin = $derived(Math.max(bin1, bin2, bin3, bin4, bin5, 1));

  // TAB 3: Birthday Paradox Simulator
  let roomSize = $state(23);
  let matchProb = $derived.by(() => {
    let probNoMatch = 1.0;
    for (let i = 0; i < roomSize; i++) {
      probNoMatch *= (365 - i) / 365;
    }
    return ((1 - probNoMatch) * 100).toFixed(1);
  });
</script>

<div class="ps-week1-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W1 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="datatypes">1. Variable Types</option>
      <option value="histogram">2. Frequency Histogram</option>
      <option value="birthday">3. Birthday Paradox</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 1 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Introduction to Statistics & Data</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'datatypes' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'datatypes')}>
        <Database size={14} /> Data Types
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'histogram' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'histogram')}>
        <BarChart size={14} /> Histogram
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'birthday' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'birthday')}>
        <Users size={14} /> Birthday Paradox
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: DATA TYPES -->
    {#if activeTab === 'datatypes'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Game Data Variables</span>
            <div class="flex flex-col gap-2">
              {#each sampleVariables as item, idx}
                <button
                  class={`btn btn-sm justify-start text-left font-bold ${selectedVarIndex === idx ? 'btn-primary' : 'btn-outline'}`}
                  onclick={() => selectedVarIndex = idx}
                >
                  {item.name}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
          <span class="text-xs uppercase font-bold text-base-content/50">Classification</span>
          <div class="text-3xl font-black text-primary uppercase">
            {sampleVariables[selectedVarIndex].type}
          </div>
          <p class="text-sm font-mono bg-base-200 px-4 py-2 rounded-xl border border-base-300 max-w-md">
            {sampleVariables[selectedVarIndex].desc}
          </p>
        </div>
      </div>

    <!-- TAB 2: HISTOGRAM -->
    {:else if activeTab === 'histogram'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Player Score Frequencies</span>
            <div><span class="text-xs font-bold">0-20 score: {bin1}</span><input type="range" min="0" max="50" bind:value={bin1} class="range range-xs range-primary" /></div>
            <div><span class="text-xs font-bold">21-40 score: {bin2}</span><input type="range" min="0" max="50" bind:value={bin2} class="range range-xs range-primary" /></div>
            <div><span class="text-xs font-bold">41-60 score: {bin3}</span><input type="range" min="0" max="50" bind:value={bin3} class="range range-xs range-primary" /></div>
            <div><span class="text-xs font-bold">61-80 score: {bin4}</span><input type="range" min="0" max="50" bind:value={bin4} class="range range-xs range-primary" /></div>
            <div><span class="text-xs font-bold">81-100 score: {bin5}</span><input type="range" min="0" max="50" bind:value={bin5} class="range range-xs range-primary" /></div>
          </div>
          <div class="p-2 bg-base-100 rounded-xl text-xs font-mono font-bold">Total Samples N = {totalSamples}</div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-end rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner">
          <div class="flex items-end justify-between h-56 gap-2 pt-6 border-b border-base-300">
            {#each [{ l: '0-20', v: bin1 }, { l: '21-40', v: bin2 }, { l: '41-60', v: bin3 }, { l: '61-80', v: bin4 }, { l: '81-100', v: bin5 }] as b}
              <div class="flex-1 flex flex-col items-center gap-1">
                <span class="text-xs font-mono font-bold">{b.v}</span>
                <div class="w-full bg-primary/80 hover:bg-primary rounded-t-lg transition-all" style={`height: ${(b.v / maxBin) * 160}px`}></div>
                <span class="text-[10px] font-bold text-base-content/60">{b.l}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

    <!-- TAB 3: BIRTHDAY PARADOX -->
    {:else}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Birthday Paradox Explorer</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Number of People in Room n = {roomSize}</span>
              </div>
              <input type="range" min="2" max="80" bind:value={roomSize} class="range range-xs range-primary" />
            </div>
            <div class="p-3 bg-base-100 rounded-xl text-xs space-y-1">
              <p class="font-bold text-primary">Intuition vs Math:</p>
              <p class="text-base-content/70">With just 23 people, there are 23×22/2 = 253 pairs of people, giving over a 50% chance of a shared birthday!</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Chance of At Least 2 Sharing Birthday</span>
          <div class="text-6xl font-mono font-black text-primary my-3">{matchProb}%</div>
          <span class="badge badge-secondary font-mono">{roomSize} people in room</span>
        </div>
      </div>
    {/if}

  </div>
</div>
