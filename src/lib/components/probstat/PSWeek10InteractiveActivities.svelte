<script lang="ts">
  import Target from '@lucide/svelte/icons/target';
  import Scale from '@lucide/svelte/icons/scale';
  import Users from '@lucide/svelte/icons/users';

  type TabType = 'ci' | 'samplesize';
  let activeTab = $state<TabType>('ci');

  // Confidence Interval for Mean: x̄ ± z* · (σ / √n)
  let sampleMean = $state(75);
  let sampleStd = $state(12);
  let sampleSizeN = $state(64);
  let confLevel = $state<90 | 95 | 99>(95);

  let zCritical = $derived(confLevel === 90 ? 1.645 : confLevel === 95 ? 1.96 : 2.576);
  let marginOfError = $derived((zCritical * (sampleStd / Math.sqrt(sampleSizeN))).toFixed(2));
  let lowerBound = $derived((sampleMean - Number(marginOfError)).toFixed(2));
  let upperBound = $derived((sampleMean + Number(marginOfError)).toFixed(2));
</script>

<div class="ps-week10-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W10 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="ci">1. Confidence Interval (x̄ ± ME)</option>
      <option value="samplesize">2. Sample Size Determination</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 10 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Estimation & Confidence Intervals</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'ci' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'ci')}><Target size={14}/> Confidence Interval</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'samplesize' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'samplesize')}><Users size={14}/> Sample Size</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
      <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Sample Statistics</span>
          <div><span>Sample Mean x̄ = {sampleMean}</span><input type="range" min="40" max="100" bind:value={sampleMean} class="range range-xs range-primary" /></div>
          <div><span>Sample Std Dev s = {sampleStd}</span><input type="range" min="2" max="30" bind:value={sampleStd} class="range range-xs range-secondary" /></div>
          <div><span>Sample Size n = {sampleSizeN}</span><input type="range" min="16" max="256" step="16" bind:value={sampleSizeN} class="range range-xs" /></div>
          <div class="pt-1">
            <span class="text-xs font-bold">Confidence Level:</span>
            <div class="join w-full mt-1">
              <button class={`join-item btn btn-xs flex-1 ${confLevel === 90 ? 'btn-primary' : 'btn-outline'}`} onclick={() => confLevel = 90}>90% (z=1.65)</button>
              <button class={`join-item btn btn-xs flex-1 ${confLevel === 95 ? 'btn-primary' : 'btn-outline'}`} onclick={() => confLevel = 95}>95% (z=1.96)</button>
              <button class={`join-item btn btn-xs flex-1 ${confLevel === 99 ? 'btn-primary' : 'btn-outline'}`} onclick={() => confLevel = 99}>99% (z=2.58)</button>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-4">
        <span class="text-xs uppercase font-bold text-base-content/50">{confLevel}% Confidence Interval for Population Mean μ</span>
        <div class="text-5xl font-mono font-black text-primary my-1">[{lowerBound}, {upperBound}]</div>
        <div class="p-3 bg-base-200/60 rounded-xl text-xs font-mono">
          x̄ ± Margin of Error = {sampleMean} ± {marginOfError}
        </div>
        <p class="text-xs text-base-content/70">We are {confLevel}% confident that true average player score lies between {lowerBound} and {upperBound}.</p>
      </div>
    </div>
  </div>
</div>
