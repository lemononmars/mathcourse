<script lang="ts">
  import GitBranch from '@lucide/svelte/icons/git-branch';
  import X from '@lucide/svelte/icons/x';
  import Plus from '@lucide/svelte/icons/plus';
  import ArrowDownUp from '@lucide/svelte/icons/arrow-down-up';
  import Award from '@lucide/svelte/icons/award';
  import Layers from '@lucide/svelte/icons/layers';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Shield from '@lucide/svelte/icons/shield';

  type TabType = 'product' | 'sum' | 'factorial' | 'perm' | 'comb';
  let activeTab = $state<TabType>('product');

  // ==========================================
  // TAB 1: RULE OF PRODUCT (CHARACTER CUSTOMIZER)
  // ==========================================
  let numHeads = $state(4);
  let numArmors = $state(3);
  let numWeapons = $state(5);
  let totalOutfits = $derived(numHeads * numArmors * numWeapons);

  // ==========================================
  // TAB 2: RULE OF SUM (MUTUALLY EXCLUSIVE TALENTS)
  // ==========================================
  let warriorSkills = $state(4);
  let mageSkills = $state(5);
  let rogueSkills = $state(3);
  let totalExclusiveChoices = $derived(warriorSkills + mageSkills + rogueSkills);

  // ==========================================
  // TAB 3: FACTORIAL & INVENTORY PERMUTATIONS
  // ==========================================
  let factN = $state(5);
  function calcFact(n: number): number {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }
  let factRes = $derived(calcFact(factN));

  // ==========================================
  // TAB 4: PERMUTATION P(n, r) - LEADERBOARD PODIUM
  // ==========================================
  let permN = $state(6);
  let permR = $state(3);
  let permRes = $derived(
    permN >= permR ? Math.floor(calcFact(permN) / calcFact(Math.max(1, permN - permR))) : 0
  );

  // ==========================================
  // TAB 5: COMBINATION C(n, r) - GACHA / DECK BUILDER
  // ==========================================
  let combN = $state(8);
  let combR = $state(3);
  let combRes = $derived(
    combN >= combR
      ? Math.floor(calcFact(combN) / (calcFact(combR) * calcFact(Math.max(1, combN - combR))))
      : 0
  );
</script>

<div class="week9-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W9 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="product">1. Rule of Product (Customizer)</option>
      <option value="sum">2. Rule of Sum (Class Talents)</option>
      <option value="factorial">3. Factorial (n! Permutations)</option>
      <option value="perm">4. Permutation P(n, r) (Podium)</option>
      <option value="comb">5. Combination C(n, r) (Deck Builder)</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 9 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Combinatorics in Game Design</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'product' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'product')}
      >
        <X size={14} /> Rule of Product
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'sum' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'sum')}
      >
        <Plus size={14} /> Rule of Sum
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'factorial' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'factorial')}
      >
        <Sparkles size={14} /> Factorial (n!)
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'perm' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'perm')}
      >
        <Award size={14} /> Permutation P(n,r)
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'comb' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'comb')}
      >
        <Layers size={14} /> Combination C(n,r)
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- TAB 1: RULE OF PRODUCT -->
    {#if activeTab === 'product'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <X size={18} class="text-primary" /> Rule of Product: Sequential Steps
            </h3>
            <p class="text-xs text-base-content/70">
              When an event consists of sequential independent choices, multiply the possibilities: Total = n₁ × n₂ × n₃. In RPG character creation, independent gear slots produce millions of visual permutations.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Helmets / Hair Options (n₁):</span>
                <span class="text-primary font-mono">{numHeads}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={numHeads} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Armor / Body Styles (n₂):</span>
                <span class="text-secondary font-mono">{numArmors}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={numArmors} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Weapons / Accessories (n₃):</span>
                <span class="text-accent font-mono">{numWeapons}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={numWeapons} class="range range-xs range-accent" />
            </div>
          </div>

          <div class="p-4 bg-primary/10 border border-primary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">Total Unique Outfits</span>
            <div class="text-2xl sm:text-3xl font-black text-primary my-1">
              {numHeads} × {numArmors} × {numWeapons} = {totalOutfits.toLocaleString()}
            </div>
            <span class="text-[11px] text-base-content/60">Multiplication Principle applies because slots are chosen simultaneously.</span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Decision Tree Graphic -->
            <circle cx="20" cy="120" r="8" fill="#3b82f6" />
            <text x="20" y="140" font-size="9" text-anchor="middle" font-weight="bold" fill="currentColor">Base</text>

            <!-- Stage 1 Branching -->
            {#each Array(Math.min(5, numHeads)) as _, i}
              {@const y1 = 40 + i * (160 / Math.min(5, numHeads))}
              <line x1="28" y1="120" x2="80" y2={y1} stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.6" />
              <circle cx="80" cy={y1} r="5" fill="#a855f7" />

              <!-- Stage 2 Branching -->
              {#each Array(Math.min(3, numArmors)) as _, j}
                {@const y2 = y1 - 10 + j * 10}
                <line x1="85" y1={y1} x2="150" y2={y2} stroke="#a855f7" stroke-width="1" stroke-opacity="0.4" />
                <circle cx="150" cy={y2} r="3" fill="#10b981" />

                <!-- Stage 3 Branching line -->
                <line x1="153" y1={y2} x2="210" y2={y2} stroke="#10b981" stroke-width="0.75" stroke-opacity="0.3" stroke-dasharray="2,2" />
              {/each}
            {/each}

            <circle cx="215" cy="120" r="14" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.5" />
            <text x="215" y="124" font-size="10" font-weight="black" text-anchor="middle" fill="#10b981">✨</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Tree Diagram: 1 Base → {numHeads} Heads → {numArmors} Bodies → {numWeapons} Weapons</span>
        </div>
      </div>
    {/if}

    <!-- TAB 2: RULE OF SUM -->
    {#if activeTab === 'sum'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Plus size={18} class="text-primary" /> Rule of Sum: Mutually Exclusive Choices
            </h3>
            <p class="text-xs text-base-content/70">
              When an event can occur in one of several mutually exclusive ways (A OR B OR C, without overlap), add their options: Total = n₁ + n₂ + n₃.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Warrior Class Talents:</span>
                <span class="text-error font-mono">{warriorSkills}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={warriorSkills} class="range range-xs range-error" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Mage Class Talents:</span>
                <span class="text-info font-mono">{mageSkills}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={mageSkills} class="range range-xs range-info" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Rogue Class Talents:</span>
                <span class="text-success font-mono">{rogueSkills}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={rogueSkills} class="range range-xs range-success" />
            </div>
          </div>

          <div class="p-4 bg-secondary/10 border border-secondary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">Pick Exactly 1 Talent (OR):</span>
            <div class="text-2xl sm:text-3xl font-black text-secondary my-1">
              {warriorSkills} + {mageSkills} + {rogueSkills} = {totalExclusiveChoices} Choices
            </div>
            <span class="text-[11px] text-base-content/60">Disjoint sets: Warrior ∩ Mage ∩ Rogue = ∅.</span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Three Disjoint Pools -->
            <rect x="25" y="25" width="190" height="50" rx="12" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1.5" />
            <text x="40" y="55" font-size="12" font-weight="bold" fill="#ef4444">⚔ Warrior: {warriorSkills}</text>

            <rect x="25" y="95" width="190" height="50" rx="12" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="1.5" />
            <text x="40" y="125" font-size="12" font-weight="bold" fill="#3b82f6">🔮 Mage: {mageSkills}</text>

            <rect x="25" y="165" width="190" height="50" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.5" />
            <text x="40" y="195" font-size="12" font-weight="bold" fill="#10b981">🗡 Rogue: {rogueSkills}</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Disjoint Sets: Total Pool = |W| + |M| + |R|</span>
        </div>
      </div>
    {/if}

    <!-- TAB 3: FACTORIAL -->
    {#if activeTab === 'factorial'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Sparkles size={18} class="text-primary" /> Factorial: Full Queue Permutations (n!)
            </h3>
            <p class="text-xs text-base-content/70">
              The number of ways to arrange n distinct objects in a line is n! = n × (n - 1) × ... × 2 × 1. In games, this models spell queue combinations, turn order sequences, and deck shuffling.
            </p>
          </div>

          <div>
            <div class="flex justify-between text-xs font-bold mb-1">
              <span>Distinct Items in Action Queue (n):</span>
              <span class="text-primary font-mono text-base">{factN}</span>
            </div>
            <input type="range" min="1" max="8" step="1" bind:value={factN} class="range range-xs range-primary" />
          </div>

          <div class="p-4 bg-accent/10 border border-accent/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">Queue Orderings ({factN}!)</span>
            <div class="text-3xl sm:text-4xl font-black text-accent my-1">
              {factRes.toLocaleString()}
            </div>
            <span class="text-[11px] text-base-content/60">
              {#each Array(factN) as _, i}
                {factN - i}{i < factN - 1 ? ' × ' : ''}
              {/each}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <div class="w-full max-w-[260px] flex flex-col gap-2 p-3 bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <span class="text-xs font-bold text-center text-base-content/60 font-mono">Sample Queue Sequence:</span>
            <div class="flex flex-wrap gap-2 justify-center py-4">
              {#each Array(factN) as _, idx}
                <div class="w-10 h-10 rounded-xl bg-primary/20 border border-primary flex items-center justify-center font-bold font-mono text-primary shadow-sm">
                  #{idx + 1}
                </div>
              {/each}
            </div>
            <div class="text-center text-[11px] text-base-content/60 font-mono">
              Position 1: {factN} options<br />
              Position 2: {Math.max(1, factN - 1)} options<br />
              Position {factN}: 1 option left
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- TAB 4: PERMUTATION P(n, r) -->
    {#if activeTab === 'perm'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Award size={18} class="text-primary" /> Permutation P(n, r): Order Matters!
            </h3>
            <p class="text-xs text-base-content/70">
              Arranging r items chosen from n candidates where <strong>order matters</strong>:
              P(n, r) = n! / (n - r)!.
              Classic example: Gold, Silver, and Bronze tournament podium awards.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Contestants (n):</span>
                <span class="text-primary font-mono">{permN}</span>
              </div>
              <input type="range" min="1" max="10" step="1" bind:value={permN} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Podium Ranks (r):</span>
                <span class="text-secondary font-mono">{permR}</span>
              </div>
              <input type="range" min="1" max={permN} step="1" bind:value={permR} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-4 bg-primary/10 border border-primary/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">P({permN}, {permR}) Possibilities</span>
            <div class="text-3xl sm:text-4xl font-black text-primary my-1">
              {permRes.toLocaleString()}
            </div>
            <span class="text-[11px] text-base-content/60">
              Formula: {permN}! / ({permN} - {permR})! =
              {#each Array(permR) as _, i}
                {permN - i}{i < permR - 1 ? ' × ' : ''}
              {/each}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Podium Display -->
            <!-- 2nd Place -->
            <rect x="30" y="120" width="55" height="90" rx="8" fill="rgba(148, 163, 184, 0.3)" stroke="#94a3b8" stroke-width="2" />
            <text x="57" y="155" font-size="20" font-weight="black" text-anchor="middle" fill="#94a3b8">2</text>
            <text x="57" y="180" font-size="10" font-weight="bold" text-anchor="middle" fill="#94a3b8">SILVER</text>

            <!-- 1st Place -->
            <rect x="92" y="80" width="55" height="130" rx="8" fill="rgba(234, 179, 8, 0.3)" stroke="#eab308" stroke-width="2" />
            <text x="120" y="120" font-size="24" font-weight="black" text-anchor="middle" fill="#eab308">1</text>
            <text x="120" y="145" font-size="10" font-weight="bold" text-anchor="middle" fill="#eab308">GOLD</text>

            <!-- 3rd Place -->
            <rect x="155" y="145" width="55" height="65" rx="8" fill="rgba(217, 119, 6, 0.3)" stroke="#d97706" stroke-width="2" />
            <text x="182" y="175" font-size="18" font-weight="black" text-anchor="middle" fill="#d97706">3</text>
            <text x="182" y="195" font-size="9" font-weight="bold" text-anchor="middle" fill="#d97706">BRONZE</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Gold (Player A) + Silver (Player B) ≠ Gold (B) + Silver (A)</span>
        </div>
      </div>
    {/if}

    <!-- TAB 5: COMBINATION C(n, r) -->
    {#if activeTab === 'comb'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Layers size={18} class="text-primary" /> Combination C(n, r): Order Does NOT Matter
            </h3>
            <p class="text-xs text-base-content/70">
              Selecting r items from n candidates where <strong>order does not matter</strong>:
              C(n, r) = n! / (r! × (n - r)!).
              Card hands (Poker, Hearthstone), party lineups, and gacha loot pools.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Card Pool / Hero Pool (n):</span>
                <span class="text-primary font-mono">{combN}</span>
              </div>
              <input type="range" min="1" max="12" step="1" bind:value={combN} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Hand / Party Size (r):</span>
                <span class="text-secondary font-mono">{combR}</span>
              </div>
              <input type="range" min="1" max={combN} step="1" bind:value={combR} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl font-mono text-center">
            <span class="text-xs text-base-content/60 block uppercase">C({combN}, {combR}) Unique Lineups</span>
            <div class="text-3xl sm:text-4xl font-black text-emerald-500 my-1">
              {combRes.toLocaleString()}
            </div>
            <span class="text-[11px] text-base-content/60">
              Formula: {combN}! / ({combR}! × {combN - combR}!)
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <div class="w-full max-w-[260px] p-4 bg-base-100 rounded-2xl border border-base-300 shadow-inner flex flex-col items-center justify-center">
            <span class="text-xs font-bold text-base-content/60 font-mono mb-3">Party Hand (Any Order):</span>
            <div class="flex -space-x-3 py-2">
              {#each Array(Math.min(5, combR)) as _, i}
                <div class="w-12 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 shadow-md flex items-center justify-center text-xs font-black font-mono text-emerald-600">
                  Card {i + 1}
                </div>
              {/each}
            </div>
            <span class="text-xs text-base-content/60 font-mono mt-3 text-center">
              Dividing by r! ({combR}!) cancels redundant order shuffles.
            </span>
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>
