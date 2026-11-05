<script lang="ts">
  import { rollDice, riskProbability, bestKeep, yahtzeeChance, isYahtzee, optimalYahtzeeProbability, pairTotals, pairings, legalPairings, pairProbability, waitingTrial, type PairOption, type WaitingMode } from '$lib/lecture12';
  let { mode }: { mode: 'waiting' | 'risk' | 'yahtzee' | 'cantstop' } = $props();
  const pct = (n: number) => `${(100 * n).toFixed(2)}%`;
  const rate = (wins: number, trials: number) => trials ? pct(wins / trials) : '—';
  const titles = { waiting: 'Watch an expectation emerge', risk: 'Risk: compare the highest dice', yahtzee: 'Yahtzee with one reroll', cantstop: 'Can’t Stop: pair, push, or bank' };

  let waitMode = $state<WaitingMode>('heads');
  let trace = $state<string[]>([]), steps = $state(0), coins = $state(0), wasHead = $state(false);
  let waitDone = $state(false), waitCount = $state(0), waitTotal = $state(0), capped = $state(0);
  let waitRecent = $state<number[]>([]);
  const expectation = $derived(waitMode === 'heads' ? 6 : 2);
  function nextTrial() { trace = []; steps = 0; coins = 0; wasHead = false; waitDone = false; }
  function resetWaiting() { nextTrial(); waitCount = 0; waitTotal = 0; capped = 0; waitRecent = []; }
  function stepWaiting() {
    if (waitDone) return;
    steps++;
    let complete = false, value = 0;
    if (waitMode === 'penalty') {
      const d = rollDice(1)[0]; trace = [...trace.slice(-31), String(d)];
      if (d === 6) coins -= 5;
      else { coins += d; complete = true; value = coins; }
    } else {
      const head = Math.random() < 0.5;
      trace = [...trace.slice(-31), head ? 'H' : 'T'];
      complete = waitMode === 'tail' ? !head : head && wasHead;
      wasHead = head; value = steps;
    }
    if (complete) {
      waitCount++; waitTotal += value; waitRecent = [...waitRecent, value].slice(-12); waitDone = true;
    } else if (steps >= 10000) { capped++; waitDone = true; }
  }
  function batchWaiting() {
    let count = 0, total = 0, censored = 0;
    const recent: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const trial = waitingTrial(waitMode);
      if (trial.completed) { count++; total += trial.value; recent.push(trial.value); } else censored++;
    }
    waitCount += count; waitTotal += total; capped += censored; waitRecent = recent.slice(-12);
  }

  let attack = $state(2), defend = $state(1), attackRoll = $state<number[]>([]), defendRoll = $state<number[]>([]);
  let riskTrials = $state(0), riskWins = $state(0);
  const riskExact = $derived(riskProbability(attack, defend));
  function resetRisk() { riskTrials = 0; riskWins = 0; attackRoll = []; defendRoll = []; }
  function simulateRisk(n: number) {
    let wins = 0, a: number[] = [], d: number[] = [];
    for (let i = 0; i < n; i++) {
      a = rollDice(attack); d = rollDice(defend);
      if (Math.max(...a) > Math.max(...d)) wins++;
    }
    riskTrials += n; riskWins += wins; attackRoll = a; defendRoll = d;
  }

  let hand = $state<number[]>([]), held = $state<boolean[]>([]), handPhase = $state<'start' | 'keep' | 'done'>('start');
  let manualWins = $state(0), manualTrials = $state(0), autoWins = $state(0), autoTrials = $state(0);
  const exactYahtzee = optimalYahtzeeProbability();
  const conditional = $derived(hand.length ? yahtzeeChance(hand, held) : 0);
  function firstRoll() {
    hand = rollDice(5); held = bestKeep(hand);
    if (isYahtzee(hand)) { handPhase = 'done'; manualTrials++; manualWins++; }
    else handPhase = 'keep';
  }
  function reroll() {
    if (handPhase !== 'keep') return;
    hand = hand.map((v, i) => held[i] ? v : rollDice(1)[0]);
    handPhase = 'done'; manualTrials++; if (isYahtzee(hand)) manualWins++;
  }
  function batchYahtzee() {
    let wins = 0;
    for (let i = 0; i < 1000; i++) {
      const dice = rollDice(5), keep = bestKeep(dice);
      if (isYahtzee(dice.map((v, j) => keep[j] ? v : rollDice(1)[0]))) wins++;
    }
    autoTrials += 1000; autoWins += wins;
  }
  function resetYahtzee() { hand = []; held = []; handPhase = 'start'; manualWins = 0; manualTrials = 0; autoWins = 0; autoTrials = 0; }

  let stopDice = $state<number[]>([]), progress = $state<Record<number, number>>({});
  let stopPhase = $state<'ready' | 'choose' | 'bust'>('ready'), banked = $state(0), busts = $state(0), lost = $state(0);
  let pairTrials = $state(0), pairTwos = $state(0), pairSevens = $state(0);
  const active = $derived(Object.keys(progress).map(Number));
  const turnSteps = $derived(Object.values(progress).reduce((a, b) => a + b, 0));
  const choices = $derived(legalPairings(stopDice, active));
  const exactTwo = pairProbability(2), exactSeven = pairProbability(7);
  function observe(dice: number[]) {
    const totals = pairTotals(dice).flat(); pairTrials++;
    if (totals.includes(2)) pairTwos++;
    if (totals.includes(7)) pairSevens++;
  }
  function rollStop() {
    if (stopPhase !== 'ready') return;
    const dice = rollDice(4); stopDice = dice; observe(dice);
    if (legalPairings(dice, active).length) stopPhase = 'choose';
    else { lost = turnSteps; progress = {}; busts++; stopPhase = 'bust'; }
  }
  function choosePair(option: PairOption) {
    if (stopPhase !== 'choose') return;
    const next = { ...progress };
    for (const sum of option.moves) next[sum] = (next[sum] ?? 0) + 1;
    progress = next; stopPhase = 'ready';
  }
  function newTurn() { progress = {}; stopDice = []; stopPhase = 'ready'; lost = 0; }
  function bank() { if (stopPhase === 'ready' && turnSteps) { banked += turnSteps; newTurn(); } }
  function batchPairs() {
    let two = 0, seven = 0;
    for (let i = 0; i < 1000; i++) {
      const sums = pairTotals(rollDice(4)).flat();
      if (sums.includes(2)) two++; if (sums.includes(7)) seven++;
    }
    pairTrials += 1000; pairTwos += two; pairSevens += seven;
  }
  function resetStop() { newTurn(); banked = 0; busts = 0; pairTrials = 0; pairTwos = 0; pairSevens = 0; }
</script>

{#snippet diceRow(values: number[])}
  <div class="flex flex-wrap gap-2">
    {#each values as value, i}<span class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-base-300 bg-base-100 text-2xl font-black shadow-sm" aria-label={`Die ${i + 1}: ${value}`}>{value}</span>{/each}
  </div>
{/snippet}

<section class="space-y-5" aria-label={titles[mode]}>
  <h3 class="text-2xl font-black tracking-tight">{titles[mode]}</h3>
  {#if mode === 'waiting'}
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <label class="block text-sm font-bold">Experiment
          <select class="select select-bordered mt-2 w-full" bind:value={waitMode} onchange={resetWaiting}>
            <option value="heads">Wait for two consecutive heads</option><option value="tail">Wait for the first tail</option><option value="penalty">Die reward: pay 5 and reroll on a 6</option>
          </select>
        </label>
        <p class="text-sm text-base-content/75">{waitMode === 'heads' ? 'Flip a fair coin. HH finishes the trial; a tail resets the consecutive-head count.' : waitMode === 'tail' ? 'Flip a fair coin until its first tail. Count every flip, including the final tail.' : 'Roll a fair die. A 1–5 ends the trial and pays that many coins. Each 6 costs 5 coins and requires another roll.'}</p>
        <div class="flex flex-wrap gap-2"><button class="btn btn-primary btn-sm" onclick={stepWaiting} disabled={waitDone}>{waitMode === 'penalty' ? 'Roll one die' : 'Flip one coin'}</button><button class="btn btn-outline btn-sm" onclick={nextTrial}>New trial</button><button class="btn btn-secondary btn-sm" onclick={batchWaiting}>Simulate 1,000 trials</button><button class="btn btn-ghost btn-sm" onclick={resetWaiting}>Reset</button></div>
        <div class="min-h-24 rounded-xl bg-base-100 p-4" aria-live="polite">
          <p class="text-xs font-bold uppercase tracking-wide text-base-content/60">Current trial · {steps} {waitMode === 'penalty' ? 'rolls' : 'flips'}</p>
          <p class="mt-2 break-words font-mono text-lg">{steps > 32 ? '… ' : ''}{trace.join(' · ') || 'Start a trial to see its sequence.'}</p>
          {#if waitMode === 'penalty'}<p class="mt-2 font-bold">Net reward so far: {coins} coins</p>{/if}
          {#if waitDone}<p class="mt-2 text-sm font-bold text-primary">Trial ended. Start a new trial to continue.</p>{/if}
        </div>
      </div>
      <div class="lab-panel space-y-4" aria-live="polite">
        <div class="grid grid-cols-2 gap-3"><div class="stat-box"><span>Exact expectation</span><strong>{expectation} {waitMode === 'penalty' ? 'coins' : 'flips'}</strong></div><div class="stat-box"><span>Observed average</span><strong>{waitCount ? (waitTotal / waitCount).toFixed(3) : '—'}</strong></div></div>
        <p class="text-sm">{waitCount.toLocaleString()} completed trials. More trials usually bring the average closer to the exact expectation; individual batches still fluctuate.</p>
        <p class="rounded-xl bg-base-100 p-3 font-mono text-sm">{waitMode === 'heads' ? 'E₀ = 1 + ½E₀ + ½E_H; E_H = 1 + ½E₀ → E₀ = 6' : waitMode === 'tail' ? 'E = 1 + ½E → E = 2' : 'E = (1 + 2 + 3 + 4 + 5 + E − 5)/6 → E = 2'}</p>
        <div><h4 class="text-sm font-bold">Latest completed outcomes</h4><div class="mt-2 flex flex-wrap gap-2">{#each waitRecent as value}<span class="badge badge-outline">{value}</span>{/each}</div></div>
        {#if capped}<p role="status" class="text-sm text-warning">{capped} trials reached the 10,000-step limit and were excluded from the average.</p>{/if}
      </div>
    </div>
  {:else if mode === 'risk'}
    <p class="text-sm text-base-content/75">Use the lecture’s highest-die comparison: compare the maximum on each side once. The attacker must be strictly higher; ties favor the defender.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <div class="grid grid-cols-2 gap-3"><label class="text-sm font-bold">Attacker dice<select class="select select-bordered mt-2 w-full" bind:value={attack} onchange={resetRisk}>{#each [1,2,3] as n}<option value={n}>{n}d6</option>{/each}</select></label><label class="text-sm font-bold">Defender dice<select class="select select-bordered mt-2 w-full" bind:value={defend} onchange={resetRisk}>{#each [1,2] as n}<option value={n}>{n}d6</option>{/each}</select></label></div>
        <div class="space-y-2"><h4 class="font-bold text-blue-600">Attacker</h4>{@render diceRow(attackRoll)}<h4 class="font-bold text-rose-600">Defender</h4>{@render diceRow(defendRoll)}</div>
        {#if attackRoll.length}<p class="rounded-xl bg-base-100 p-3 font-bold" aria-live="polite">{Math.max(...attackRoll)} vs {Math.max(...defendRoll)} → {Math.max(...attackRoll) > Math.max(...defendRoll) ? 'Attacker wins' : 'Defender wins'}{Math.max(...attackRoll) === Math.max(...defendRoll) ? ' (tie)' : ''}</p>{/if}
        <div class="flex flex-wrap gap-2"><button class="btn btn-primary btn-sm" onclick={() => simulateRisk(1)}>Roll battle</button><button class="btn btn-secondary btn-sm" onclick={() => simulateRisk(1000)}>Simulate 1,000 battles</button><button class="btn btn-ghost btn-sm" onclick={resetRisk}>Reset</button></div>
      </div>
      <div class="lab-panel space-y-4" aria-live="polite">
        <div class="grid grid-cols-2 gap-3"><div class="stat-box"><span>Exact attacker win chance</span><strong>{pct(riskExact)}</strong></div><div class="stat-box"><span>Observed win rate</span><strong>{rate(riskWins, riskTrials)}</strong></div></div>
        <label class="block text-sm">Exact<progress class="progress progress-primary mt-2 w-full" max="1" value={riskExact}></progress></label><label class="block text-sm">Observed<progress class="progress progress-secondary mt-2 w-full" max="1" value={riskTrials ? riskWins / riskTrials : 0}></progress></label>
        <p class="text-sm">{riskWins.toLocaleString()} attacker wins / {riskTrials.toLocaleString()} battles.</p>
        <p class="rounded-xl bg-base-100 p-3 text-sm">P(max ≤ k) = (k/6)ⁿ. Add P(attacker max = k) × P(defender max &lt; k) for k = 1,…,6.</p>
        <p class="text-sm font-semibold">Try 1 vs 1, 2 vs 1, then 2 vs 2. Why does winning a tie matter?</p>
      </div>
    </div>
  {:else if mode === 'yahtzee'}
    <p class="text-sm text-base-content/75">Match all five dice using an initial roll and at most one reroll, as in the lecture. Click dice to hold or release them. The initial suggestion holds the most frequent face.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <div class="flex flex-wrap gap-2">{#each hand as value, i}<button class={`flex h-16 w-14 flex-col items-center justify-center rounded-xl border-2 font-black transition ${held[i] ? 'border-primary bg-primary/15 text-primary' : 'border-base-300 bg-base-100'}`} aria-label={`Die ${i + 1}: ${value}, ${held[i] ? 'held' : 'released'}`} aria-pressed={held[i]} disabled={handPhase !== 'keep'} onclick={() => { held = held.map((v,j) => i === j ? !v : v); }}><span class="text-2xl">{value}</span><span class="text-[10px] uppercase">{held[i] ? 'Hold' : 'Reroll'}</span></button>{/each}</div>
        {#if handPhase === 'keep'}<p class="text-sm" aria-live="polite">Chance with this hold: <strong>{pct(conditional)}</strong>. Holding different faces makes a five-of-a-kind impossible on this reroll.</p>{/if}
        {#if handPhase === 'done'}<p class="text-lg font-black text-primary" aria-live="polite">{isYahtzee(hand) ? 'Yahtzee!' : 'Round complete: no five-of-a-kind.'}</p>{/if}
        <div class="flex flex-wrap gap-2"><button class="btn btn-primary btn-sm" onclick={firstRoll} disabled={handPhase === 'keep'}>{handPhase === 'start' ? 'Roll five dice' : 'New round'}</button><button class="btn btn-secondary btn-sm" onclick={reroll} disabled={handPhase !== 'keep'}>Use the one reroll</button><button class="btn btn-outline btn-sm" onclick={() => { held = bestKeep(hand); }} disabled={handPhase !== 'keep'}>Hold most frequent face</button><button class="btn btn-ghost btn-sm" onclick={resetYahtzee}>Reset</button></div>
        <p class="text-sm">Your rounds: {manualWins} successes / {manualTrials} completed. {manualTrials ? `Win rate: ${rate(manualWins, manualTrials)}.` : ''}</p>
      </div>
      <div class="lab-panel space-y-4" aria-live="polite">
        <h4 class="font-black">Test the automatic strategy</h4><p class="text-sm">Keep the largest matching group, then reroll every other die once. Tied groups are equally good.</p>
        <div class="grid grid-cols-2 gap-3"><div class="stat-box"><span>Exact strategy probability</span><strong>{pct(exactYahtzee)}</strong></div><div class="stat-box"><span>Simulated strategy rate</span><strong>{rate(autoWins, autoTrials)}</strong></div></div>
        <button class="btn btn-secondary btn-sm" onclick={batchYahtzee}>Simulate 1,000 rounds</button><p class="text-sm">{autoWins.toLocaleString()} successes / {autoTrials.toLocaleString()} automatic rounds. These results are separate from your manual choices.</p>
        <p class="rounded-xl bg-base-100 p-3 text-sm">After holding m matching dice, the chance is (1/6)^(5 − m). Average that over all 6⁵ first rolls for the exact strategy probability.</p>
      </div>
    </div>
  {:else}
    <p class="text-sm text-base-content/75">One-turn practice: assume every column is open with room to advance. Choose a pairing, lock in up to three active columns, then roll again or bank your steps. <a class="link" href="https://en.boardgamearena.com/gamepanel?game=cantstop" target="_blank" rel="noreferrer">Game rules</a></p>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        {@render diceRow(stopDice)}
        <div class="flex flex-wrap gap-2"><button class="btn btn-primary btn-sm" onclick={rollStop} disabled={stopPhase !== 'ready'}>{turnSteps ? 'Risk another roll' : 'Roll four dice'}</button><button class="btn btn-secondary btn-sm" onclick={bank} disabled={stopPhase !== 'ready' || !turnSteps}>Bank {turnSteps} steps</button>{#if stopPhase === 'bust'}<button class="btn btn-outline btn-sm" onclick={newTurn}>Start next turn</button>{/if}<button class="btn btn-ghost btn-sm" onclick={resetStop}>Reset</button></div>
        {#if stopPhase === 'choose'}<div class="space-y-2"><h4 class="text-sm font-black">Choose a legal pairing</h4>{#each choices as choice}<button class="btn btn-outline h-auto min-h-14 w-full justify-start py-2 text-left" onclick={() => choosePair(choice)}><span>Dice {pairings[choice.pairing].map(pair => pair.map(i => i + 1).join(' + ')).join(' | ')} → totals {choice.sums.join(' & ')}<br /><span class="text-xs font-normal">Advance {choice.moves.join(' & ')}{choice.moves.length === 1 ? ' (one usable total)' : ''}</span></span></button>{/each}</div>{/if}
        {#if stopPhase === 'bust'}<p role="status" class="rounded-xl bg-error/10 p-3 font-bold text-error">Bust! No legal pairing can move a runner. Lost {lost} unbanked steps.</p>{/if}
        <div class="grid grid-cols-2 gap-3"><div class="stat-box"><span>Unbanked this turn</span><strong>{turnSteps}</strong></div><div class="stat-box"><span>Banked across turns</span><strong>{banked}</strong></div></div>
        <div class="flex flex-wrap gap-2" aria-live="polite">{#each active as column}<span class="badge badge-primary badge-lg">Column {column}: {progress[column]} steps</span>{/each}{#if !active.length}<span class="text-sm text-base-content/60">No active columns yet.</span>{/if}</div><p class="text-xs text-base-content/60">{busts} busted turns. Repeated totals move the same runner twice. With one runner slot left, choose which new column to open.</p>
      </div>
      <div class="lab-panel space-y-4" aria-live="polite">
        <h4 class="font-black">Lecture experiment: make a 2 or a 7</h4><p class="text-sm">Count a roll as a success when any of its three pairings contains the target total, regardless of your active columns. Count each roll once per target.</p>
        <div class="overflow-x-auto"><table class="table table-sm"><thead><tr><th>Target</th><th>Exact</th><th>Observed</th></tr></thead><tbody><tr><th>2</th><td>19/144 · {pct(exactTwo)}</td><td>{rate(pairTwos, pairTrials)}</td></tr><tr><th>7</th><td>139/216 · {pct(exactSeven)}</td><td>{rate(pairSevens, pairTrials)}</td></tr></tbody></table></div>
        <button class="btn btn-secondary btn-sm" onclick={batchPairs}>Sample 1,000 four-dice rolls</button><p class="text-sm">{pairTrials.toLocaleString()} rolls sampled, including your turn rolls.</p>
        <div class="space-y-2 text-sm"><label class="block">Observed 2<progress class="progress progress-primary w-full" value={pairTrials ? pairTwos / pairTrials : 0} max="1"></progress></label><label class="block">Observed 7<progress class="progress progress-secondary w-full" value={pairTrials ? pairSevens / pairTrials : 0} max="1"></progress></label></div>
        <p class="rounded-xl bg-base-100 p-3 text-sm">A 2 needs at least two ones. A 7 needs both faces of {`{1,6}, {2,5}, or {3,4}`}. Different pairings overlap, so their probabilities cannot simply be added.</p>
      </div>
    </div>
  {/if}
</section>

<style>
  .lab-panel { border: 1px solid var(--color-base-300); background: color-mix(in oklab, var(--color-base-200) 55%, transparent); border-radius: 1.25rem; padding: 1rem; min-width: 0; }
  .stat-box { border-radius: .9rem; padding: .85rem; background: var(--color-base-100); min-width: 0; }
  .stat-box span { display: block; font-size: .75rem; opacity: .65; }
  .stat-box strong { display: block; margin-top: .3rem; font-size: 1.25rem; overflow-wrap: anywhere; }
</style>
