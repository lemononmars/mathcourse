<script lang="ts">
  import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
  import Scale from '@lucide/svelte/icons/scale';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Target from '@lucide/svelte/icons/target';
  import Gauge from '@lucide/svelte/icons/gauge';

  type TabType = 'expected' | 'binomial' | 'geometric';
  let activeTab = $state<TabType>('expected');

  // ==========================================
  // TAB 1: EXPECTED VALUE E[X] (LOOT BOX DESIGN)
  // ==========================================
  let goldCommon = 10;
  let probCommonPct = $state(70);

  let goldRare = 100;
  let probRarePct = $state(25);

  let goldJackpot = 1000;
  let probJackpotPct = $derived(Math.max(0, 100 - probCommonPct - probRarePct));

  let boxCost = $state(50); // Gold coin price of opening loot box

  let expGold = $derived(
    (goldCommon * probCommonPct + goldRare * probRarePct + goldJackpot * probJackpotPct) / 100
  );
  let houseEdge = $derived((boxCost - expGold).toFixed(1));
  let isPlayerProfitable = $derived(expGold >= boxCost);
  let tiltAngle = $derived(Math.max(-25, Math.min(25, (boxCost - expGold) * 0.5)));

  // ==========================================
  // TAB 2: BINOMIAL DISTRIBUTION B(n, p)
  // ==========================================
  let binomN = $state(10); // number of trials (e.g. 10 loot crates)
  let binomP = $state(0.2); // 20% success rate per trial
  let binomK = $state(3); // target successes

  function binomCoeff(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return res;
  }

  let binomProb = $derived(
    (
      binomCoeff(binomN, binomK) *
      Math.pow(binomP, binomK) *
      Math.pow(1 - binomP, binomN - binomK) *
      100
    ).toFixed(2)
  );

  let binomExpected = $derived((binomN * binomP).toFixed(1));

  // ==========================================
  // TAB 3: GEOMETRIC DISTRIBUTION (GACHA PITY SYSTEM)
  // ==========================================
  let ssrRatePct = $state(2); // 2% banner rate
  let expPullsToFirst = $derived(
    ssrRatePct > 0 ? (100 / ssrRatePct).toFixed(1) : '∞'
  );

  let pityPulls = $state(50); // e.g. 50 pulls
  let probSuccessWithinPity = $derived(
    ((1 - Math.pow(1 - ssrRatePct / 100, pityPulls)) * 100).toFixed(1)
  );
</script>

<div class="week11-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W11 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="expected">1. Expected Value E[X] (Loot Box Balance)</option>
      <option value="binomial">2. Binomial Distribution B(n, p)</option>
      <option value="geometric">3. Geometric Distribution (Gacha Pity)</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 11 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Random Variables & Game Economy</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'expected' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'expected')}
      >
        <Scale size={14} /> Expected Value
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'binomial' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'binomial')}
      >
        <BarChart3 size={14} /> Binomial B(n,p)
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'geometric' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'geometric')}
      >
        <Target size={14} /> Geometric (Pity)
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- TAB 1: EXPECTED VALUE -->
    {#if activeTab === 'expected'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Scale size={18} class="text-primary" /> Expected Value: E[X] = Σ x_i · P(x_i)
            </h3>
            <p class="text-xs text-base-content/70">
              The long-term average reward per attempt. If E[X] &lt; Cost, the game design creates a currency sink (house advantage). If E[X] &gt; Cost, players experience runaway economic inflation!
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Common Reward ({goldCommon} Gold) Chance:</span>
                <span class="text-primary font-mono">{probCommonPct}%</span>
              </div>
              <input type="range" min="40" max="85" step="5" bind:value={probCommonPct} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Rare Reward ({goldRare} Gold) Chance:</span>
                <span class="text-secondary font-mono">{probRarePct}%</span>
              </div>
              <input type="range" min="10" max={95 - probCommonPct} step="5" bind:value={probRarePct} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Loot Box Opening Cost:</span>
                <span class="text-warning font-mono">{boxCost} Gold</span>
              </div>
              <input type="range" min="20" max="150" step="5" bind:value={boxCost} class="range range-xs range-warning" />
            </div>
          </div>

          <div class="p-4 bg-base-200 rounded-2xl border border-base-300 font-mono text-xs space-y-1">
            <div class="flex justify-between items-center text-sm">
              <span>Expected Return E[X]:</span>
              <strong class="text-primary">{expGold.toFixed(1)} Gold</strong>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span>Net Player Profit:</span>
              <strong class={isPlayerProfitable ? 'text-success' : 'text-error'}>
                {(expGold - boxCost).toFixed(1)} Gold ({isPlayerProfitable ? 'Player Profit' : 'House Sink'})
              </strong>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Balance scale visual -->
            <line x1="120" y1="40" x2="120" y2="180" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
            <polygon points="100,180 140,180 120,150" fill="#94a3b8" />

            <!-- Pivot bar tilted by difference -->
            <g transform={`rotate(${tiltAngle} 120 70)`}>
              <line x1="30" y1="70" x2="210" y2="70" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" />

              <!-- Left Plate (Cost) -->
              <line x1="40" y1="70" x2="40" y2="110" stroke="#94a3b8" stroke-width="1.5" />
              <rect x="20" y="110" width="40" height="15" rx="4" fill="#f59e0b" />
              <text x="40" y="122" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">Cost: {boxCost}</text>

              <!-- Right Plate (Reward E[X]) -->
              <line x1="200" y1="70" x2="200" y2="110" stroke="#94a3b8" stroke-width="1.5" />
              <rect x="175" y="110" width="50" height="15" rx="4" fill="#10b981" />
              <text x="200" y="122" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">E[X]: {expGold.toFixed(0)}</text>
            </g>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">
            {isPlayerProfitable ? '⚠️ Warning: Gold fountain creates inflation' : '✅ Balanced: Healthy sink absorbs excess gold'}
          </span>
        </div>
      </div>
    {/if}

    <!-- TAB 2: BINOMIAL DISTRIBUTION -->
    {#if activeTab === 'binomial'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <BarChart3 size={18} class="text-primary" /> Binomial B(n, p): Exactly k Successes
            </h3>
            <p class="text-xs text-base-content/70">
              In n independent trials each with success probability p, the probability of exactly k successes is:
              P(X = k) = C(n, k) · p^k · (1 - p)^(n - k). Expected successes: E[X] = n · p.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Total Attempts / Crates (n):</span>
                <span class="text-primary font-mono">{binomN}</span>
              </div>
              <input type="range" min="2" max="20" step="1" bind:value={binomN} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Success Rate per Trial (p):</span>
                <span class="text-secondary font-mono">{(binomP * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0.05" max="0.8" step="0.05" bind:value={binomP} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Target Exactly k Successes:</span>
                <span class="text-accent font-mono">k = {binomK}</span>
              </div>
              <input type="range" min="0" max={binomN} step="1" bind:value={binomK} class="range range-xs range-accent" />
            </div>
          </div>

          <div class="p-4 bg-primary/10 border border-primary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">P(Exactly {binomK} Drops out of {binomN})</span>
            <div class="text-3xl sm:text-4xl font-black text-primary my-1">
              {binomProb}%
            </div>
            <span class="text-[11px] text-base-content/60">Expected Successes: E[X] = {binomExpected} drops</span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Binomial PMF Bar Chart -->
            {#each Array(Math.min(10, binomN + 1)) as _, i}
              {@const barProb = (binomCoeff(binomN, i) * Math.pow(binomP, i) * Math.pow(1 - binomP, binomN - i))}
              {@const barH = Math.min(150, barProb * 350)}
              {@const barX = 25 + i * (190 / Math.min(10, binomN + 1))}

              <rect
                x={barX}
                y={200 - barH}
                width="14"
                height={barH}
                rx="3"
                fill={i === binomK ? '#3b82f6' : 'rgba(148, 163, 184, 0.4)'}
                stroke={i === binomK ? '#1d4ed8' : 'none'}
              />
              <text x={barX + 7} y="215" font-size="9" font-family="monospace" text-anchor="middle" fill="currentColor">{i}</text>
            {/each}
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Blue Bar: Target k = {binomK} successes</span>
        </div>
      </div>
    {/if}

    <!-- TAB 3: GEOMETRIC (GACHA PITY) -->
    {#if activeTab === 'geometric'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Target size={18} class="text-primary" /> Geometric: Trials Until First Success
            </h3>
            <p class="text-xs text-base-content/70">
              The geometric distribution models the number of attempts needed to hit the first rare drop: E[Pulls] = 1 / p. Without a pity threshold, unlucky players can pull hundreds of times without hitting!
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Base SSR Gacha Rate (p):</span>
                <span class="text-primary font-mono">{ssrRatePct}%</span>
              </div>
              <input type="range" min="0.5" max="5" step="0.5" bind:value={ssrRatePct} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Player Pull Count / Soft Pity:</span>
                <span class="text-secondary font-mono">{pityPulls} pulls</span>
              </div>
              <input type="range" min="10" max="120" step="5" bind:value={pityPulls} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Mean Pulls (1 / p)</span>
              <span class="text-base font-bold text-primary">{expPullsToFirst} pulls</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">Average wait time</span>
            </div>
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Hit Chance by Pull #{pityPulls}</span>
              <span class="text-base font-bold text-success">{probSuccessWithinPity}%</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">Cumulative probability</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <div class="w-full max-w-[260px] p-4 bg-base-100 rounded-2xl border border-base-300 shadow-inner flex flex-col gap-3 font-mono text-xs">
            <span class="font-bold text-center text-base-content/70">Cumulative Hit Rate</span>

            <div class="space-y-2">
              {#each [10, 30, 50, 80] as pull}
                {@const cPct = ((1 - Math.pow(1 - ssrRatePct / 100, pull)) * 100).toFixed(0)}
                <div>
                  <div class="flex justify-between text-[11px]">
                    <span>By Pull #{pull}:</span>
                    <strong>{cPct}%</strong>
                  </div>
                  <div class="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-primary h-full" style={`width: ${cPct}%`}></div>
                  </div>
                </div>
              {/each}
            </div>

            <span class="text-[10px] text-base-content/50 text-center mt-1">
              Guaranteed pity mechanics cap the tail of the geometric curve.
            </span>
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>
