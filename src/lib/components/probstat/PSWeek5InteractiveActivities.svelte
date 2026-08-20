<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import ShieldAlert from '@lucide/svelte/icons/shield-alert';
  import GitFork from '@lucide/svelte/icons/git-fork';
  import Sparkles from '@lucide/svelte/icons/sparkles';

  type TabType = 'dice' | 'conditional' | 'bayes';
  let activeTab = $state<TabType>('bayes');

  // Bayes' Theorem (Disease / Impostor Detection Paradox)
  // P(Impostor | Positive Test) = P(Pos | Imp) * P(Imp) / P(Pos)
  let baseRatePct = $state(2); // 2% true impostors
  let testAccuracyPct = $state(95); // 95% true positive rate
  let falsePositivePct = $state(5); // 5% false alarm on innocents

  let bayesPosterior = $derived.by(() => {
    const pImp = baseRatePct / 100;
    const pInn = 1 - pImp;
    const pPosGivenImp = testAccuracyPct / 100;
    const pPosGivenInn = falsePositivePct / 100;

    const totalPos = pPosGivenImp * pImp + pPosGivenInn * pInn;
    const pImpGivenPos = (pPosGivenImp * pImp) / (totalPos || 1);
    return (pImpGivenPos * 100).toFixed(1);
  });
</script>

<div class="ps-week5-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">PS W5 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="bayes">1. Bayes' Theorem Detector</option>
      <option value="conditional">2. Conditional P(A|B)</option>
      <option value="dice">3. Sample Spaces</option>
    </select>
  </div>

  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 5 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Probability & Bayes' Rule</h2>
    </div>
    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'bayes' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'bayes')}><ShieldAlert size={14}/> Bayes' Detector</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'conditional' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'conditional')}><GitFork size={14}/> Conditional</button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 ${activeTab === 'dice' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'dice')}><Dices size={14}/> Sample Space</button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-2 px-1">
    {#if activeTab === 'bayes'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Impostor Detection Model</span>
            <div><span>Base Rate of Impostors: {baseRatePct}%</span><input type="range" min="0.5" max="20" step="0.5" bind:value={baseRatePct} class="range range-xs range-primary" /></div>
            <div><span>Scanner Accuracy (True Pos): {testAccuracyPct}%</span><input type="range" min="80" max="99" bind:value={testAccuracyPct} class="range range-xs range-secondary" /></div>
            <div><span>False Alarm Rate: {falsePositivePct}%</span><input type="range" min="1" max="20" bind:value={falsePositivePct} class="range range-xs" /></div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
          <span class="text-xs uppercase font-bold text-base-content/50">Probability Player is ACTUALLY Impostor given Positive Alarm</span>
          <div class="text-6xl font-mono font-black text-primary my-2">{bayesPosterior}%</div>
          <p class="text-xs text-base-content/70 max-w-md">
            Even with a 95% accurate scanner, if the base rate is low (2%), most alarms are false positives (Base Rate Fallacy)!
          </p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        <span class="badge badge-primary font-bold">Conditional Probability</span>
        <div class="text-4xl font-mono font-black text-primary">P(A | B) = P(A ∩ B) / P(B)</div>
        <p class="text-xs text-base-content/70">Updating belief upon receiving new evidence in game AI systems.</p>
      </div>
    {/if}
  </div>
</div>
