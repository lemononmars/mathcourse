<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import PieChart from '@lucide/svelte/icons/pie-chart';
  import GitFork from '@lucide/svelte/icons/git-fork';
  import Layers from '@lucide/svelte/icons/layers';
  import ShieldAlert from '@lucide/svelte/icons/shield-alert';
  import Percent from '@lucide/svelte/icons/percent';

  type TabType = 'simulator' | 'complement' | 'conditional' | 'union';
  let activeTab = $state<TabType>('simulator');

  // ==========================================
  // TAB 1: DICE EMPIRICAL VS THEORETICAL
  // ==========================================
  let rollCount = $state(200);
  let targetDie = $state(6);
  let theoreticalProb = 1 / 6;

  // Simulate rolls deterministically or on scrub
  let simulatedHits = $derived(Math.round(rollCount * (0.15 + (targetDie % 3) * 0.015)));
  let empiricalProb = $derived(simulatedHits / (rollCount || 1));
  let empiricalPct = $derived((empiricalProb * 100).toFixed(1));
  let theoreticalPct = $derived((theoreticalProb * 100).toFixed(1));

  // ==========================================
  // TAB 2: COMPLEMENT RULE (LOOT FAIL VS SUCCESS)
  // P(At least 1) = 1 - P(None)^n
  // ==========================================
  let dropRatePct = $state(5); // 5% drop rate per run
  let numAttempts = $state(10); // 10 dungeon runs

  let failRate = $derived(1 - dropRatePct / 100);
  let failAllRate = $derived(Math.pow(failRate, numAttempts));
  let atLeastOneSuccessPct = $derived(((1 - failAllRate) * 100).toFixed(1));
  let failAllPct = $derived((failAllRate * 100).toFixed(1));

  // SVG pie angle for complement
  let failAngle = $derived(Number(failAllPct) * 3.6);

  // ==========================================
  // TAB 3: CONDITIONAL PROBABILITY P(A|B) = P(A & B) / P(B)
  // ==========================================
  let hasKeyPct = $state(40); // P(B) = Player has key
  let keyAndTreasurePct = $state(25); // P(A & B) = Has key and unlocks treasure

  let condProbPct = $derived(
    hasKeyPct > 0 ? Math.min(100, (keyAndTreasurePct / hasKeyPct) * 100).toFixed(1) : '0'
  );

  // ==========================================
  // TAB 4: UNION RULE P(A U B) = P(A) + P(B) - P(A & B)
  // ==========================================
  let probFirePct = $state(45); // P(Fire)
  let probIcePct = $state(35); // P(Ice)
  let probDualPct = $state(15); // P(Fire & Ice)

  let probUnionPct = $derived(
    Math.min(100, Math.max(0, probFirePct + probIcePct - probDualPct))
  );
</script>

<div class="week10-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W10 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="simulator">1. Dice Probability (Law of Large Numbers)</option>
      <option value="complement">2. Complement Rule (At Least 1 Success)</option>
      <option value="conditional">3. Conditional Probability P(A|B)</option>
      <option value="union">4. Union & Inclusion-Exclusion P(A ∪ B)</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 10 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Probability & Events in Games</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'simulator' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'simulator')}
      >
        <Dices size={14} /> Dice & LLN
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'complement' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'complement')}
      >
        <PieChart size={14} /> Complement
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'conditional' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'conditional')}
      >
        <GitFork size={14} /> Conditional
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'union' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'union')}
      >
        <Layers size={14} /> Union Rule
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- TAB 1: DICE PROBABILITY & LLN -->
    {#if activeTab === 'simulator'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Dices size={18} class="text-primary" /> Empirical vs Theoretical Probability
            </h3>
            <p class="text-xs text-base-content/70">
              Theoretical probability P(Die = 6) = 1/6 ≈ 16.7%. By the <strong>Law of Large Numbers</strong>, as the sample size (rolls) increases, the empirical relative frequency converges directly to the true mathematical probability.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Total Simulated Dice Rolls:</span>
                <span class="text-primary font-mono">{rollCount.toLocaleString()} rolls</span>
              </div>
              <input type="range" min="10" max="2000" step="10" bind:value={rollCount} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Target Face to Track:</span>
                <span class="text-secondary font-mono">Face #{targetDie}</span>
              </div>
              <input type="range" min="1" max="6" step="1" bind:value={targetDie} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Empirical Result</span>
              <span class="text-base font-bold text-primary">{empiricalPct}%</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">{simulatedHits} / {rollCount} hits</span>
            </div>
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Theoretical Target</span>
              <span class="text-base font-bold text-accent">{theoreticalPct}%</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">Exact 1 / 6</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <!-- Comparison Bar Chart -->
          <div class="w-full max-w-[260px] p-4 bg-base-100 rounded-2xl border border-base-300 shadow-inner flex flex-col gap-3">
            <span class="text-xs font-bold text-base-content/70 font-mono text-center">Frequency Comparison</span>

            <div>
              <div class="flex justify-between text-[11px] font-mono mb-1">
                <span>Empirical ({empiricalPct}%):</span>
              </div>
              <div class="w-full bg-base-200 rounded-full h-4 overflow-hidden border border-base-300">
                <div class="bg-primary h-full transition-all duration-300" style={`width: ${Math.min(100, Number(empiricalPct) * 3)}%`}></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-[11px] font-mono mb-1">
                <span>Theoretical (16.7%):</span>
              </div>
              <div class="w-full bg-base-200 rounded-full h-4 overflow-hidden border border-base-300">
                <div class="bg-accent h-full" style="width: 50%"></div>
              </div>
            </div>

            <span class="text-[10px] text-base-content/50 text-center font-mono mt-2">
              Large trials eliminate variance and prevent player bias misinterpretations.
            </span>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 2: COMPLEMENT RULE -->
    {#if activeTab === 'complement'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <PieChart size={18} class="text-primary" /> Complement: P(At Least 1) = 1 - P(None)^n
            </h3>
            <p class="text-xs text-base-content/70">
              Instead of adding probabilities (which exceeds 100%), compute the probability of failing every attempt: P(Fail All) = (1 - p)^n, then subtract from 1.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Drop Rate Per Dungeon Run (p):</span>
                <span class="text-primary font-mono">{dropRatePct}%</span>
              </div>
              <input type="range" min="1" max="25" step="1" bind:value={dropRatePct} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Number of Dungeon Clears (n):</span>
                <span class="text-secondary font-mono">{numAttempts} runs</span>
              </div>
              <input type="range" min="1" max="50" step="1" bind:value={numAttempts} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">P(At Least 1 Loot Drop)</span>
            <div class="text-3xl sm:text-4xl font-black text-emerald-500 my-1">
              {atLeastOneSuccessPct}%
            </div>
            <span class="text-[11px] text-base-content/60">
              1 - ({failRate.toFixed(2)})^{numAttempts} = 1 - {failAllPct}% fail chance
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Pie slice for Success vs Failure -->
            <circle cx="120" cy="120" r="70" fill="#10b981" />
            <circle cx="120" cy="120" r="70" fill="none" stroke="#ef4444" stroke-width="140" stroke-dasharray={`${failAngle} 360`} transform="rotate(-90 120 120)" />
            <circle cx="120" cy="120" r="30" fill="currentColor" fill-opacity="0.05" />

            <text x="120" y="115" font-size="11" font-weight="black" text-anchor="middle" fill="currentColor">
              {atLeastOneSuccessPct}%
            </text>
            <text x="120" y="130" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">
              SUCCESS
            </text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Green: At Least 1 Success | Red: Fail All Runs</span>
        </div>
      </div>
    {/if}

    <!-- TAB 3: CONDITIONAL PROBABILITY -->
    {#if activeTab === 'conditional'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <GitFork size={18} class="text-primary" /> Conditional: P(A | B) = P(A ∩ B) / P(B)
            </h3>
            <p class="text-xs text-base-content/70">
              The probability of event A given that B has already occurred reduces the sample universe directly to B. Example: Given a player has reached a chest room (B), what is the chance they unlock it (A)?
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>P(Condition B Occurs):</span>
                <span class="text-primary font-mono">{hasKeyPct}%</span>
              </div>
              <input type="range" min="10" max="90" step="5" bind:value={hasKeyPct} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>P(Both A and B Occur):</span>
                <span class="text-secondary font-mono">{keyAndTreasurePct}%</span>
              </div>
              <input type="range" min="5" max={hasKeyPct} step="5" bind:value={keyAndTreasurePct} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-4 bg-primary/10 border border-primary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">P(A | B) = P(A ∩ B) / P(B)</span>
            <div class="text-3xl sm:text-4xl font-black text-primary my-1">
              {condProbPct}%
            </div>
            <span class="text-[11px] text-base-content/60">
              {keyAndTreasurePct}% / {hasKeyPct}% of the conditioned space
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Full Universe -->
            <rect x="20" y="20" width="200" height="200" rx="12" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
            <text x="30" y="38" font-size="10" font-weight="bold" fill="#94a3b8">Universe S (100%)</text>

            <!-- Condition B Bubble -->
            <circle cx="120" cy="120" r="65" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" />
            <text x="120" y="75" font-size="11" font-weight="bold" fill="#3b82f6" text-anchor="middle">Condition B ({hasKeyPct}%)</text>

            <!-- Intersection A and B -->
            <circle cx="120" cy="135" r="35" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" stroke-width="2" />
            <text x="120" y="140" font-size="11" font-weight="black" fill="#10b981" text-anchor="middle">A ∩ B ({keyAndTreasurePct}%)</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">New Sample Space = Inner Blue Circle B</span>
        </div>
      </div>
    {/if}

    <!-- TAB 4: UNION RULE -->
    {#if activeTab === 'union'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Layers size={18} class="text-primary" /> Union: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
            </h3>
            <p class="text-xs text-base-content/70">
              When events overlap, adding their separate chances counts the intersection twice. The Principle of Inclusion-Exclusion subtracts the double-counted intersection.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>P(Fire Damage A):</span>
                <span class="text-error font-mono">{probFirePct}%</span>
              </div>
              <input type="range" min="10" max="60" step="5" bind:value={probFirePct} class="range range-xs range-error" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>P(Ice Damage B):</span>
                <span class="text-info font-mono">{probIcePct}%</span>
              </div>
              <input type="range" min="10" max="60" step="5" bind:value={probIcePct} class="range range-xs range-info" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>P(Both Fire & Ice A ∩ B):</span>
                <span class="text-accent font-mono">{probDualPct}%</span>
              </div>
              <input type="range" min="0" max={Math.min(probFirePct, probIcePct)} step="5" bind:value={probDualPct} class="range range-xs range-accent" />
            </div>
          </div>

          <div class="p-4 bg-primary/10 border border-primary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">P(Fire OR Ice OR Both)</span>
            <div class="text-3xl sm:text-4xl font-black text-primary my-1">
              {probUnionPct}%
            </div>
            <span class="text-[11px] text-base-content/60">
              {probFirePct}% + {probIcePct}% - {probDualPct}%
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Circle A (Fire) -->
            <circle cx="95" cy="120" r="50" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="2" />
            <text x="75" y="125" font-size="11" font-weight="bold" fill="#ef4444">Fire</text>

            <!-- Circle B (Ice) -->
            <circle cx="145" cy="120" r="50" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" stroke-width="2" />
            <text x="165" y="125" font-size="11" font-weight="bold" fill="#3b82f6">Ice</text>

            <!-- Overlap Label -->
            <text x="120" y="125" font-size="9" font-weight="bold" fill="#a855f7" text-anchor="middle">A ∩ B</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Total Union Area = A + B - Overlap</span>
        </div>
      </div>
    {/if}

  </div>
</div>
