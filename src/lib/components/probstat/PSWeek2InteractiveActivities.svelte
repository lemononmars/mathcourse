<script lang="ts">
  import Activity from '@lucide/svelte/icons/activity';
  import Sliders from '@lucide/svelte/icons/sliders';
  import Box from '@lucide/svelte/icons/box';
  import Layers from '@lucide/svelte/icons/layers';

  type TabType = 'center' | 'spread' | 'boxplot' | 'sets';
  let activeTab = $state<TabType>('center');

  // Interactive sample dataset of 7 numbers
  let d1 = $state(12);
  let d2 = $state(15);
  let d3 = $state(18);
  let d4 = $state(20);
  let d5 = $state(25);
  let d6 = $state(30);
  let d7 = $state(45);

  let rawData = $derived([d1, d2, d3, d4, d5, d6, d7].sort((a, b) => a - b));
  let meanVal = $derived((rawData.reduce((s, v) => s + v, 0) / rawData.length).toFixed(2));
  let medianVal = $derived(rawData[3]); // 4th element in sorted 7 items
  let minVal = $derived(rawData[0]);
  let maxVal = $derived(rawData[6]);
  let q1Val = $derived(rawData[1]);
  let q3Val = $derived(rawData[5]);
  let iqrVal = $derived(q3Val - q1Val);

  let varianceVal = $derived.by(() => {
    const m = Number(meanVal);
    const sumSq = rawData.reduce((s, v) => s + Math.pow(v - m, 2), 0);
    return (sumSq / (rawData.length - 1)).toFixed(2);
  });
  let stdDevVal = $derived(Math.sqrt(Number(varianceVal)).toFixed(2));
</script>

<div class="ps-week2-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W2 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="center">1. Measures of Center</option>
      <option value="spread">2. Measures of Spread</option>
      <option value="boxplot">3. 5-Number Summary & Boxplot</option>
      <option value="sets">4. Event Subsets</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 2 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Descriptive Statistics: Center & Spread</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'center' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'center')}>
        <Activity size={14} /> Center
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'spread' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'spread')}>
        <Sliders size={14} /> Variance & Spread
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'boxplot' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'boxplot')}>
        <Box size={14} /> Boxplot Summary
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'sets' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'sets')}>
        <Layers size={14} /> Sets & Events
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: CENTER -->
    {#if activeTab === 'center'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Adjust 7 Data Values</span>
            <div class="grid grid-cols-2 gap-2">
              <div><span class="text-xs font-bold">x₁: {d1}</span><input type="range" min="1" max="50" bind:value={d1} class="range range-xs range-primary" /></div>
              <div><span class="text-xs font-bold">x₂: {d2}</span><input type="range" min="1" max="50" bind:value={d2} class="range range-xs range-primary" /></div>
              <div><span class="text-xs font-bold">x₃: {d3}</span><input type="range" min="1" max="50" bind:value={d3} class="range range-xs range-primary" /></div>
              <div><span class="text-xs font-bold">x₄: {d4}</span><input type="range" min="1" max="50" bind:value={d4} class="range range-xs range-primary" /></div>
              <div><span class="text-xs font-bold">x₅: {d5}</span><input type="range" min="1" max="50" bind:value={d5} class="range range-xs range-primary" /></div>
              <div><span class="text-xs font-bold">x₆: {d6}</span><input type="range" min="1" max="50" bind:value={d6} class="range range-xs range-primary" /></div>
            </div>
            <div><span class="text-xs font-bold">x₇ (Outlier test): {d7}</span><input type="range" min="1" max="100" bind:value={d7} class="range range-xs range-secondary" /></div>
          </div>
          <p class="text-xs font-mono text-base-content/70">Sorted: [{rawData.join(', ')}]</p>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-4">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <span class="text-xs font-bold text-primary uppercase">Mean (Average x̄)</span>
              <div class="text-4xl font-mono font-black mt-2">{meanVal}</div>
              <span class="text-xs text-base-content/60">Sensitive to outliers</span>
            </div>
            <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
              <span class="text-xs font-bold text-secondary uppercase">Median (Middle value)</span>
              <div class="text-4xl font-mono font-black mt-2">{medianVal}</div>
              <span class="text-xs text-base-content/60">Robust against outliers</span>
            </div>
          </div>
        </div>
      </div>

    <!-- TAB 2: SPREAD -->
    {:else if activeTab === 'spread'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-6 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
          <span class="text-xs font-bold uppercase text-primary">Sample Variance s²</span>
          <div class="text-5xl font-mono font-black text-primary">{varianceVal}</div>
          <p class="text-xs font-mono text-base-content/70">s² = Σ(x - x̄)² / (n - 1)</p>
        </div>

        <div class="md:col-span-6 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
          <span class="text-xs font-bold uppercase text-secondary">Standard Deviation s</span>
          <div class="text-5xl font-mono font-black text-secondary">{stdDevVal}</div>
          <p class="text-xs font-mono text-base-content/70">s = √(Variance)</p>
        </div>
      </div>

    <!-- TAB 3: BOXPLOT -->
    {:else}
      <div class="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 space-y-6 h-full shadow-inner animate-fade-in">
        <div class="text-center">
          <span class="badge badge-primary badge-sm font-bold">5-Number Summary</span>
          <h3 class="text-lg font-black mt-1">Min, Q1, Median, Q3, Max</h3>
        </div>

        <div class="grid grid-cols-5 gap-2 text-center">
          <div class="p-3 bg-base-200 rounded-xl"><span class="text-xs font-bold">Min</span><div class="text-2xl font-mono font-black text-primary mt-1">{minVal}</div></div>
          <div class="p-3 bg-base-200 rounded-xl"><span class="text-xs font-bold">Q1</span><div class="text-2xl font-mono font-black text-primary mt-1">{q1Val}</div></div>
          <div class="p-3 bg-primary/20 rounded-xl border border-primary/40"><span class="text-xs font-bold text-primary">Median</span><div class="text-2xl font-mono font-black text-primary mt-1">{medianVal}</div></div>
          <div class="p-3 bg-base-200 rounded-xl"><span class="text-xs font-bold">Q3</span><div class="text-2xl font-mono font-black text-primary mt-1">{q3Val}</div></div>
          <div class="p-3 bg-base-200 rounded-xl"><span class="text-xs font-bold">Max</span><div class="text-2xl font-mono font-black text-primary mt-1">{maxVal}</div></div>
        </div>

        <div class="p-4 bg-base-200/50 rounded-2xl text-center font-mono">
          <span class="text-xs font-bold uppercase text-base-content/60">Interquartile Range (IQR) = Q3 - Q1</span>
          <div class="text-3xl font-black text-secondary mt-1">{iqrVal}</div>
          <p class="text-xs text-base-content/60 mt-1">Outlier Boundary: [Q1 - 1.5·IQR, Q3 + 1.5·IQR] = [{q1Val - 1.5 * iqrVal}, {q3Val + 1.5 * iqrVal}]</p>
        </div>
      </div>
    {/if}

  </div>
</div>
