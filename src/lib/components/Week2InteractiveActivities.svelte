<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Play from '@lucide/svelte/icons/play';
  import Pause from '@lucide/svelte/icons/pause';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import StepForward from '@lucide/svelte/icons/step-forward';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Hash from '@lucide/svelte/icons/hash';
  import Clock from '@lucide/svelte/icons/clock';
  import Grid from '@lucide/svelte/icons/grid';
  import ChevronUp from '@lucide/svelte/icons/chevron-up';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';

  let activeTab = $state<'divisibility' | 'prime' | 'modulo' | 'bases'>('divisibility');

  // ==========================================
  // TAB 1: DIVISIBILITY (m = q * n + r)
  // ==========================================
  let divM = $state(19);
  let divN = $state(5);

  let divQ = $derived(Math.floor(divM / (divN || 1)));
  let divR = $derived(divM % (divN || 1));

  // ==========================================
  // TAB 2: SIEVE OF ERATOSTHENES ANIMATION
  // ==========================================
  type SieveStatus = 'unmarked' | 'prime' | 'crossed' | 'current-prime' | 'active-crossed';
  let sieveState = $state<SieveStatus[]>(Array(101).fill('unmarked'));
  let sieveCurrentPrime = $state<number | null>(null);
  let sieveIsRunning = $state(false);
  let sieveSpeed = $state(40); // 10x speed
  let sieveTimer: any = null;
  let sieveFinished = $state(false);
  let currentEliminatingIndex = $state<number | null>(null);

  function resetSieve() {
    stopSieve();
    sieveState = Array(101).fill('unmarked');
    sieveState[1] = 'crossed'; // 1 is not prime
    sieveCurrentPrime = null;
    sieveFinished = false;
    currentEliminatingIndex = null;
  }

  function finishSieve() {
    for (let i = 2; i <= 100; i++) {
      if (sieveState[i] === 'active-crossed' || sieveState[i] === 'crossed') {
        sieveState[i] = 'crossed';
      } else {
        sieveState[i] = 'prime';
      }
    }
    sieveCurrentPrime = null;
    sieveFinished = true;
    stopSieve();
  }

  function clearActiveRedHighlights() {
    for (let i = 2; i <= 100; i++) {
      if (sieveState[i] === 'active-crossed') {
        sieveState[i] = 'crossed';
      }
    }
  }

  function tickSieveAnimation() {
    if (sieveFinished) return;

    let p = sieveCurrentPrime;
    if (p === null) {
      clearActiveRedHighlights();
      p = 2;
      while (p <= 10 && (sieveState[p] === 'crossed' || sieveState[p] === 'prime')) p++;
      if (p > 10) {
        finishSieve();
        return;
      }
      sieveCurrentPrime = p;
      sieveState[p] = 'current-prime';
      currentEliminatingIndex = p * 2;
      return;
    }

    // Next multiple of current active prime p (NO SKIPPING already sieved numbers!)
    let mult = currentEliminatingIndex ?? (p * 2);

    if (mult <= 100) {
      if (sieveState[mult] !== 'prime') {
        sieveState[mult] = 'active-crossed';
      }
      currentEliminatingIndex = mult + p;
    } else {
      // End of current prime round! Clear red background from this prime round before moving on
      clearActiveRedHighlights();
      sieveState[p] = 'prime';

      // Advance to next prime candidate <= 10 (since sqrt(100) = 10)
      let nextP = p + 1;
      while (nextP <= 10 && (sieveState[nextP] === 'crossed' || sieveState[nextP] === 'prime')) nextP++;
      if (nextP > 10) {
        finishSieve();
      } else {
        sieveCurrentPrime = nextP;
        sieveState[nextP] = 'current-prime';
        currentEliminatingIndex = nextP * 2;
      }
    }
  }

  function stepSieveToNextPrime() {
    if (sieveFinished) return;

    // Clear red background from previous prime round
    clearActiveRedHighlights();

    let p = sieveCurrentPrime;
    if (p === null) {
      p = 2;
      while (p <= 10 && (sieveState[p] === 'crossed' || sieveState[p] === 'prime')) p++;
    }

    if (p > 10) {
      finishSieve();
      return;
    }

    // Mark current prime and show RED background for all its multiples in this active round
    sieveState[p] = 'prime';
    for (let m = p * 2; m <= 100; m += p) {
      if (sieveState[m] !== 'prime') {
        sieveState[m] = 'active-crossed';
      }
    }

    // Advance to next prime candidate
    let nextP = p + 1;
    while (nextP <= 10 && (sieveState[nextP] === 'crossed' || sieveState[nextP] === 'prime' || sieveState[nextP] === 'active-crossed')) nextP++;

    if (nextP > 10) {
      sieveCurrentPrime = null;
    } else {
      sieveCurrentPrime = nextP;
    }
  }

  function startSieve() {
    if (sieveIsRunning) return;
    sieveIsRunning = true;
    sieveTimer = setInterval(() => {
      tickSieveAnimation();
    }, sieveSpeed);
  }

  function stopSieve() {
    sieveIsRunning = false;
    if (sieveTimer) clearInterval(sieveTimer);
    sieveTimer = null;
  }

  let primeCount = $derived(
    sieveState.filter((st, idx) => idx >= 2 && (st === 'prime' || st === 'current-prime')).length
  );

  // ==========================================
  // TAB 3: MODULO CLOCK
  // ==========================================
  let modBase = $state(6);
  let modRange = $state(20);
  let selectedModSegment = $state<number | null>(null);
  let clockA = $state(14);
  let clockB = $derived(((clockA % modBase) + modBase) % modBase);

  $effect(() => {
    selectedModSegment = clockB;
  });

  let modSegments = $derived.by(() => {
    const segments: Record<number, number[]> = {};
    for (let i = 0; i < modBase; i++) segments[i] = [];
    for (let x = -modRange; x <= modRange; x++) {
      const rem = ((x % modBase) + modBase) % modBase;
      segments[rem].push(x);
    }
    return segments;
  });

  // ==========================================
  // TAB 4: NUMBER BASES
  // ==========================================
  let baseNum = $state(78);
  let targetBase = $state(4);
  let isBaseAnimating = $state(false);
  let baseAnimTimer: any = null;

  function toggleBaseAnimation() {
    if (isBaseAnimating) {
      isBaseAnimating = false;
      if (baseAnimTimer) clearInterval(baseAnimTimer);
      baseAnimTimer = null;
    } else {
      isBaseAnimating = true;
      baseAnimTimer = setInterval(() => {
        baseNum = baseNum >= 999 ? 1 : baseNum + 1;
      }, 500);
    }
  }

  const baseDigits = '0123456789ABCDEF';

  let baseConversion = $derived.by(() => {
    let n = Math.max(0, Math.floor(baseNum));
    const b = Math.max(2, Math.min(16, Math.floor(targetBase)));
    if (n === 0) return { digits: ['0'], stringVal: '0', steps: [{ qIn: 0, div: b, qOut: 0, rem: 0, digit: '0' }] };

    const steps: { qIn: number; div: number; qOut: number; rem: number; digit: string }[] = [];
    const digits: string[] = [];
    let temp = n;

    while (temp > 0) {
      const qOut = Math.floor(temp / b);
      const rem = temp % b;
      const digit = baseDigits[rem];
      steps.push({ qIn: temp, div: b, qOut, rem, digit });
      digits.unshift(digit);
      temp = qOut;
    }

    return {
      digits,
      stringVal: digits.join(''),
      steps
    };
  });

  onDestroy(() => {
    stopSieve();
    if (baseAnimTimer) clearInterval(baseAnimTimer);
  });
</script>

<!-- App Container: Fixed Height without Page Scroll -->
<div class="week2-studio flex h-[calc(100vh-80px)] max-h-[820px] min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">
  
  <!-- Desktop Navigation Tabs (Hidden on Mobile) -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 2 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Interactive Playground</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl">
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'divisibility' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'divisibility')}
      >
        <Grid size={15} /> Divisibility
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'prime' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'prime')}
      >
        <Sparkles size={15} /> Sieve
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'modulo' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'modulo')}
      >
        <Clock size={15} /> Clock Modulo
      </button>
      <button
        class={`tab tab-sm font-bold gap-1.5 transition-all ${activeTab === 'bases' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'bases')}
      >
        <Hash size={15} /> Number Bases
      </button>
    </div>
  </div>

  <!-- Main Active Content View (No Outer Page Scroll) -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: DIVISIBILITY -->
    {#if activeTab === 'divisibility'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- UPPER (Mobile) / RIGHT (Desktop) : Dot Matrix Diagram -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <div>
            <div class="flex items-center justify-between text-xs font-bold text-base-content/80 mb-3">
              <span>Dot Matrix Representation ({divM} total dots):</span>
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Quotient (q = {divQ})</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Remainder (r = {divR})</span>
              </div>
            </div>

            <!-- Full Rows & Remainder Grid -->
            <div class="space-y-2 max-h-[360px] overflow-y-auto p-3 rounded-2xl bg-base-200/30 border border-base-200">
              
            <!-- Column Indicator Line above First Row (Spans up to rightmost column) -->
            <div class="flex items-center gap-2 mb-2 pt-1">
              <span class="text-xs font-mono w-14 shrink-0 opacity-0">Cols</span>
              <div class="flex flex-1 items-center gap-1.5 min-w-0">
                <div class="w-full border-b-2 border-info relative text-center pb-0.5">
                  <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-base-100 px-2 text-[11px] font-black font-mono text-info border border-info/40 rounded-full shadow-2xs">
                    n = {divN}
                  </div>
                </div>
              </div>
            </div>

              {#each Array(divQ) as _, rowIndex}
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono w-14 text-emerald-600 font-bold shrink-0">Row {rowIndex + 1}:</span>
                  <div class="flex flex-1 items-center gap-1.5 min-w-0">
                    {#each Array(divN) as _, colIndex}
                      <div
                        class="flex-1 max-w-[32px] aspect-square rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        title={`Dot ${rowIndex * divN + colIndex + 1}`}
                      >
                        {rowIndex * divN + colIndex + 1}
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}

              <!-- Remainder Dots Row -->
              {#if divR > 0}
                <div class="flex items-center gap-2 pt-2 border-t border-dashed border-base-300">
                  <span class="text-xs font-mono w-14 text-rose-600 font-bold shrink-0">Rem ({divR}):</span>
                  <div class="flex flex-1 items-center gap-1.5 min-w-0">
                    {#each Array(divR) as _, remIndex}
                      <div
                        class="flex-1 max-w-[32px] aspect-square rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce"
                        title={`Remainder Dot ${divQ * divN + remIndex + 1}`}
                      >
                        {divQ * divN + remIndex + 1}
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- LOWER (Mobile) / LEFT (Desktop) : Aligned Interactive Time-Picker Equation -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-center space-y-4 rounded-2xl border border-base-200 bg-base-200/30 p-5">
          <div class="rounded-3xl border border-base-300 bg-base-100 p-6 text-center shadow-md">
            
            <!-- Perfect Horizontally Aligned Equation (m = q * n + r) -->
            <div class="flex items-center justify-center gap-2 sm:gap-3 py-4">
              
              <!-- m Time-Picker Wheel -->
              <div class="flex flex-col items-center select-none">
                <button
                  class="btn btn-xs btn-ghost p-0 h-6 min-h-0 text-accent opacity-60 hover:opacity-100 transition-opacity"
                  onclick={() => (divM = Math.min(60, divM + 1))}
                  title="Increase m"
                >
                  <ChevronUp size={20} />
                </button>
                <div
                  class="text-3xl sm:text-5xl font-black font-mono text-accent bg-accent/10 px-3 py-2 rounded-2xl cursor-ns-resize border-2 border-accent/30 shadow-inner hover:bg-accent/20 transition-all"
                  onwheel={(e) => {
                    e.preventDefault();
                    divM = e.deltaY < 0 ? Math.min(60, divM + 1) : Math.max(1, divM - 1);
                  }}
                  title="Scroll wheel or use arrows to adjust m"
                >
                  {divM}
                </div>
                <button
                  class="btn btn-xs btn-ghost p-0 h-6 min-h-0 text-accent opacity-60 hover:opacity-100 transition-opacity"
                  onclick={() => (divM = Math.max(1, divM - 1))}
                  title="Decrease m"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <span class="text-2xl sm:text-4xl font-black text-base-content/40 self-center">=</span>

              <!-- q Quotient (Aligned to horizontal center line) -->
              <div class="flex flex-col items-center select-none justify-center">
                <div class="h-6"></div> <!-- Top spacer matching chevron -->
                <div class="text-3xl sm:text-5xl font-black font-mono text-emerald-500 px-2 py-2">
                  {divQ}
                </div>
                <div class="h-6"></div> <!-- Bottom spacer matching chevron -->
              </div>

              <span class="text-2xl sm:text-4xl font-black text-base-content/40 self-center">×</span>

              <!-- n Time-Picker Wheel -->
              <div class="flex flex-col items-center select-none">
                <button
                  class="btn btn-xs btn-ghost p-0 h-6 min-h-0 text-info opacity-60 hover:opacity-100 transition-opacity"
                  onclick={() => (divN = Math.min(12, divN + 1))}
                  title="Increase n"
                >
                  <ChevronUp size={20} />
                </button>
                <div
                  class="text-3xl sm:text-5xl font-black font-mono text-info bg-info/10 px-3 py-2 rounded-2xl cursor-ns-resize border-2 border-info/30 shadow-inner hover:bg-info/20 transition-all"
                  onwheel={(e) => {
                    e.preventDefault();
                    divN = e.deltaY < 0 ? Math.min(12, divN + 1) : Math.max(1, divN - 1);
                  }}
                  title="Scroll wheel or use arrows to adjust n"
                >
                  {divN}
                </div>
                <button
                  class="btn btn-xs btn-ghost p-0 h-6 min-h-0 text-info opacity-60 hover:opacity-100 transition-opacity"
                  onclick={() => (divN = Math.max(1, divN - 1))}
                  title="Decrease n"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <span class="text-2xl sm:text-4xl font-black text-base-content/40 self-center">+</span>

              <!-- r Remainder (Aligned to horizontal center line) -->
              <div class="flex flex-col items-center select-none justify-center">
                <div class="h-6"></div> <!-- Top spacer matching chevron -->
                <div class="text-3xl sm:text-5xl font-black font-mono text-rose-500 px-2 py-2">
                  {divR}
                </div>
                <div class="h-6"></div> <!-- Bottom spacer matching chevron -->
              </div>

            </div>

            <div class="text-[11px] font-mono text-base-content/60 pt-2 border-t border-base-200 flex justify-center gap-4">
              <span>Quotient q = {divQ}</span>
              <span>Remainder r = {divR}</span>
            </div>
          </div>
        </div>

      </div>

    <!-- TAB 2: SIEVE OF ERATOSTHENES -->
    {:else if activeTab === 'prime'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- UPPER (Mobile) / RIGHT (Desktop) : 100 Grid with 2x Font Size & Red Background ONLY for active round -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-3 shadow-inner">
          <div class="flex items-center justify-between text-xs font-bold text-base-content/70 mb-2 px-1">
            <span>Sieve Grid (1 to 100)</span>
            {#if sieveCurrentPrime}
              <span class="text-amber-600 font-black">Active Prime: {sieveCurrentPrime}</span>
            {/if}
          </div>

          <!-- Square Grid 10x10 with 2x Font Size (text-xl sm:text-2xl) and Active Red Multiples -->
          <div class="grid grid-cols-10 gap-1.5 p-2 rounded-2xl bg-base-200/20 border border-base-200">
            {#each Array(100) as _, index}
              {@const num = index + 1}
              {@const status = sieveState[num]}
              <div
                class={`aspect-[5/4] w-full flex items-center justify-center rounded-lg font-mono text-base sm:text-xl font-black transition-all duration-150 ${
                  num === 1
                    ? 'bg-base-200/60 text-base-content/25 line-through'
                    : status === 'current-prime'
                    ? 'bg-amber-400 text-black scale-105 ring-4 ring-amber-500 shadow-md z-10'
                    : status === 'active-crossed'
                    ? 'bg-rose-500 text-white font-black scale-105 shadow-md'
                    : status === 'prime'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : status === 'crossed'
                    ? 'bg-base-200/70 text-base-content/40 line-through'
                    : 'bg-white text-black font-black hover:bg-base-100 shadow-2xs border border-base-200/60'
                }`}
              >
                {num}
              </div>
            {/each}
          </div>
        </div>

        <!-- LOWER (Mobile) / LEFT (Desktop) : Compact Controls (Single Line on Mobile, No Discovered Primes Box) -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-center space-y-4 rounded-2xl border border-base-200 bg-base-200/30 p-5">
          <div class="flex items-center justify-between">
            <h3 class="font-black text-lg text-base-content">Sieve Controls</h3>
            <div class="badge badge-warning badge-lg font-bold text-sm">Primes: {primeCount}</div>
          </div>

          <!-- Controls Buttons (Single Line on Mobile) -->
          <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-3">
            <button
              class="btn btn-primary gap-1.5 font-bold text-xs sm:text-sm"
              onclick={sieveIsRunning ? stopSieve : startSieve}
            >
              {#if sieveIsRunning}<Pause size={15} /> Pause{:else}<Play size={15} /> Play Animation{/if}
            </button>
            <button
              class="btn btn-outline gap-1.5 font-bold text-xs sm:text-sm"
              onclick={stepSieveToNextPrime}
              disabled={sieveIsRunning || sieveFinished}
            >
              <StepForward size={15} /> Next Prime
            </button>
          </div>
          
          <button class="btn btn-ghost btn-sm gap-2 font-bold w-full" onclick={resetSieve}>
            <RotateCcw size={15} /> Reset Sieve
          </button>
        </div>

      </div>

    <!-- TAB 3: CLOCK MODULO -->
    {:else if activeTab === 'modulo'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        
        <!-- UPPER (Mobile) / RIGHT (Desktop) : Expanded SVG Clock Wheel Container -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-2 sm:p-4 shadow-inner relative min-h-[360px] h-full">
          <svg class="w-full h-full max-h-[460px] aspect-square" viewBox="-200 -200 400 400">
            <!-- Clock Outer Circle -->
            <circle cx="0" cy="0" r="160" class="fill-base-200/40 stroke-base-300" stroke-width="4" />

            <!-- Spokes -->
            {#each Array(modBase) as _, seg}
              {@const angle = (seg * 360) / modBase - 90}
              {@const rad = (angle * Math.PI) / 180}
              {@const x2 = 160 * Math.cos(rad)}
              {@const y2 = 160 * Math.sin(rad)}
              <line x1="0" y1="0" x2={x2} y2={y2} class="stroke-base-300 stroke-2" />

              <!-- Outer Spoke Segment Label (0..n-1) -->
              {@const labelRad = ((angle + 180 / modBase) * Math.PI) / 180}
              {@const lx = 135 * Math.cos(labelRad)}
              {@const ly = 135 * Math.sin(labelRad)}
              <g
                class="cursor-pointer transition-transform hover:scale-110"
                onclick={() => (selectedModSegment = selectedModSegment === seg ? null : seg)}
              >
                <circle
                  cx={lx}
                  cy={ly}
                  r="20"
                  class={selectedModSegment === seg ? 'fill-primary stroke-primary-content stroke-2' : 'fill-base-100 stroke-base-300'}
                />
                <text
                  x={lx}
                  y={ly + 5}
                  text-anchor="middle"
                  class={`text-sm sm:text-base font-black font-mono ${selectedModSegment === seg ? 'fill-primary-content' : 'fill-base-content'}`}
                >
                  {seg}
                </text>
              </g>
            {/each}

            <!-- Inner Spoke Numbers (-k..+k) -->
            {#each Array(modBase) as _, seg}
              {@const segNums = modSegments[seg] || []}
              {@const angle = ((seg * 360) / modBase + 180 / modBase - 90)}
              {@const rad = (angle * Math.PI) / 180}
              {#each segNums.slice(0, 6) as num, idx}
                {@const dist = 35 + idx * 16}
                {@const nx = dist * Math.cos(rad)}
                {@const ny = dist * Math.sin(rad)}
                <text
                  x={nx}
                  y={ny + 4}
                  text-anchor="middle"
                  class={`text-xs sm:text-sm font-mono font-bold transition-all ${
                    selectedModSegment === null || selectedModSegment === seg
                      ? num < 0
                        ? 'fill-rose-500 font-bold'
                        : 'fill-primary font-bold'
                      : 'fill-base-content/20'
                  }`}
                >
                  {num}
                </text>
              {/each}
            {/each}
          </svg>
        </div>

        <!-- LOWER (Mobile) / LEFT (Desktop) : Clock Controls & Title -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-center space-y-4 rounded-2xl border border-base-200 bg-base-200/30 p-5">
          <h3 class="font-black text-base sm:text-lg text-base-content text-center sm:text-left">
            Clock Arithmetic Wheel (Modulo {modBase})
          </h3>

          <!-- Congruence Equation Box (a ≡ b mod n) with Large Input a & Stepper Modulo n -->
          <div class="rounded-2xl border border-base-300 bg-base-100 p-4 text-center shadow-md">
            <span class="text-[10px] font-black uppercase tracking-wider text-base-content/50 block mb-2">
              Equivalence Class Equation
            </span>
            <div class="flex items-center justify-center gap-2 sm:gap-3 py-2">
              
              <!-- Input a (Large Font Size matching Bases) -->
              <div class="flex items-center">
                <input
                  type="number"
                  bind:value={clockA}
                  class="w-20 sm:w-28 text-center text-2xl sm:text-4xl font-black font-mono text-primary bg-base-100 rounded-2xl border-2 border-primary/40 p-1 shadow-inner focus:outline-hidden focus:ring-2 focus:ring-primary"
                  title="Input number a"
                />
              </div>

              <span class="text-2xl sm:text-4xl font-black text-primary">≡</span>

              <!-- Equivalence Class Result b -->
              <span class="text-3xl sm:text-5xl font-black font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-2xl border-2 border-emerald-500/30 shadow-inner">
                {clockB}
              </span>

              <!-- Modulo Base n Stepper -->
              <div class="flex items-center gap-1 text-base-content/70 text-sm sm:text-base font-bold">
                <span>(mod</span>
                <div class="inline-flex flex-col items-center select-none align-baseline text-secondary">
                  <button
                    class="btn btn-xs btn-ghost p-0 h-3 min-h-0 text-secondary opacity-60 hover:opacity-100"
                    onclick={() => (modBase = Math.min(12, modBase + 1))}
                    title="Increase mod base n"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <span class="text-xl sm:text-3xl font-black font-mono text-secondary bg-secondary/15 px-2 py-0.5 rounded-xl border border-secondary/30 leading-none">
                    {modBase}
                  </span>
                  <button
                    class="btn btn-xs btn-ghost p-0 h-3 min-h-0 text-secondary opacity-60 hover:opacity-100"
                    onclick={() => (modBase = Math.max(2, modBase - 1))}
                    title="Decrease mod base n"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
                <span>)</span>
              </div>

            </div>
          </div>

          <!-- Equivalence Class Details Box (Hidden on Mobile) -->
          {#if selectedModSegment !== null}
            <div class="hidden sm:flex alert alert-info py-2 font-mono text-xs text-center items-center justify-between w-full shadow-xs">
              <span>Equivalence Class [{selectedModSegment}]:</span>
              <strong class="truncate max-w-[220px]">
                {modSegments[selectedModSegment]?.join(', ')}
              </strong>
            </div>
          {/if}
        </div>

      </div>

    <!-- TAB 4: NUMBER BASES (Full Width) -->
    {:else if activeTab === 'bases'}
      <div class="w-full flex flex-col justify-center space-y-6 rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-6 shadow-inner animate-fade-in">
        
        <!-- Interactive Base Equation (Editable Base 10 Number + Up/Down Base Stepper + Icon Play Button) -->
        <div class="text-center py-6 rounded-2xl bg-gradient-to-r from-primary/10 via-base-200/50 to-secondary/10 border border-base-200 flex flex-col items-center justify-center">
          <p class="text-[10px] uppercase tracking-widest font-black text-base-content/50 mb-2">Base Conversion Equation</p>
          
          <div class="flex items-center justify-center gap-2 sm:gap-3">
            
            <!-- Base 10 Input Box -->
            <div class="flex items-center">
              <input
                type="number"
                min="1"
                max="999"
                bind:value={baseNum}
                class="w-20 sm:w-28 text-center text-2xl sm:text-4xl font-black font-mono text-primary bg-base-100 rounded-2xl border-2 border-primary/40 p-1 shadow-inner focus:outline-hidden focus:ring-2 focus:ring-primary"
                title="Edit base 10 number"
              />
              <span class="text-xs sm:text-sm font-bold font-mono text-base-content/60 self-end mb-1 ml-0.5">10</span>
            </div>

            <span class="text-2xl sm:text-4xl font-black text-base-content/40">=</span>

            <!-- Result in Target Base + Subscript Base Stepper below parenthesis -->
            <div class="flex items-baseline">
              <span class="text-2xl sm:text-4xl font-black font-mono text-secondary">
                ({baseConversion.stringVal})
              </span>

              <!-- Subscript Base Stepper sitting right below/under the right parenthesis -->
              <div class="inline-flex flex-col items-center select-none align-baseline -ml-1 text-secondary">
                <button
                  class="btn btn-xs btn-ghost p-0 h-3 min-h-0 text-secondary opacity-60 hover:opacity-100"
                  onclick={() => (targetBase = Math.min(16, targetBase + 1))}
                  title="Increase base m"
                >
                  <ChevronUp size={12} />
                </button>
                <span class="text-xs sm:text-sm font-black font-mono bg-secondary/15 px-1 py-0.2 rounded-sm border border-secondary/30 leading-none">
                  {targetBase}
                </span>
                <button
                  class="btn btn-xs btn-ghost p-0 h-3 min-h-0 text-secondary opacity-60 hover:opacity-100"
                  onclick={() => (targetBase = Math.max(2, targetBase - 1))}
                  title="Decrease base m"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>

            <!-- Icon-Only Animate Button -->
            <button
              class={`btn btn-circle btn-sm font-bold transition-all shadow-md ml-2 ${isBaseAnimating ? 'btn-error' : 'btn-primary'}`}
              onclick={toggleBaseAnimation}
              title={isBaseAnimating ? "Stop Animation" : "Play Animation (+1 / 0.5s)"}
            >
              {#if isBaseAnimating}
                <Pause size={18} />
              {:else}
                <Play size={18} />
              {/if}
            </button>

          </div>
        </div>

        <!-- Positional Weight Breakdown (Centered) -->
        <div class="space-y-2 text-center">
          <span class="text-xs font-bold text-base-content/70 block">Digit Positional Weights:</span>
          <div class="flex flex-nowrap justify-center overflow-x-auto gap-3 py-2 px-1">
            {#each baseConversion.digits as digit, idx}
              {@const power = baseConversion.digits.length - 1 - idx}
              <div class="w-20 sm:w-24 shrink-0 rounded-2xl border border-base-300 bg-base-200/40 p-3 text-center space-y-1 shadow-xs">
                <div class="text-2xl sm:text-3xl font-black font-mono text-primary">{digit}</div>
                <div class="text-xs sm:text-sm font-mono font-bold text-base-content/80">{targetBase}<sup>{power}</sup></div>
                <div class="text-xs sm:text-sm font-mono font-bold text-secondary">{parseInt(digit, 16) * Math.pow(targetBase, power)}</div>
              </div>
            {/each}
          </div>
        </div>

      </div>
    {/if}

  </div>

  <!-- Mobile Bottom Sticky Navigation Tab Bar -->
  <div class="sm:hidden border-t border-base-200 pt-2 shrink-0">
    <div class="grid grid-cols-4 gap-1 bg-base-200 p-1 rounded-2xl text-center">
      <button
        class={`py-2 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center gap-0.5 ${
          activeTab === 'divisibility' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70'
        }`}
        onclick={() => (activeTab = 'divisibility')}
      >
        <Grid size={14} /> Divisibility
      </button>
      <button
        class={`py-2 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center gap-0.5 ${
          activeTab === 'prime' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70'
        }`}
        onclick={() => (activeTab = 'prime')}
      >
        <Sparkles size={14} /> Sieve
      </button>
      <button
        class={`py-2 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center gap-0.5 ${
          activeTab === 'modulo' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70'
        }`}
        onclick={() => (activeTab = 'modulo')}
      >
        <Clock size={14} /> Clock
      </button>
      <button
        class={`py-2 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center gap-0.5 ${
          activeTab === 'bases' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70'
        }`}
        onclick={() => (activeTab = 'bases')}
      >
        <Hash size={14} /> Bases
      </button>
    </div>
  </div>

</div>
