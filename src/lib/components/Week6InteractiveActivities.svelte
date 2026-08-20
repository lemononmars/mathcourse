<script lang="ts">
  import Triangle from '@lucide/svelte/icons/triangle';
  import Compass from '@lucide/svelte/icons/compass';
  import Circle from '@lucide/svelte/icons/circle';
  import ShieldCheck from '@lucide/svelte/icons/shield-check';
  import Activity from '@lucide/svelte/icons/activity';
  import Eye from '@lucide/svelte/icons/eye';

  type TabType = 'pythagoras' | 'sohcahtoa' | 'unitcircle' | 'identity' | 'waves' | 'fov';
  let activeTab = $state<TabType>('pythagoras');

  // ==========================================
  // TAB 1: PYTHAGOREAN THEOREM (a^2 + b^2 = c^2)
  // ==========================================
  let pythA = $state(3);
  let pythB = $state(4);
  let pythC = $derived(Math.sqrt(pythA * pythA + pythB * pythB).toFixed(2));

  // ==========================================
  // TAB 2: SOH CAH TOA
  // ==========================================
  let trigOpp = $state(3);
  let trigAdj = $state(4);
  let trigHyp = $derived(Math.sqrt(trigOpp * trigOpp + trigAdj * trigAdj));
  let sinVal = $derived((trigOpp / trigHyp).toFixed(3));
  let cosVal = $derived((trigAdj / trigHyp).toFixed(3));
  let tanVal = $derived((trigOpp / (trigAdj || 1)).toFixed(3));

  // ==========================================
  // TAB 3: UNIT CIRCLE
  // ==========================================
  let unitDeg = $state(45);
  let unitRad = $derived(((unitDeg * Math.PI) / 180).toFixed(3));
  let unitCos = $derived(Math.cos((unitDeg * Math.PI) / 180).toFixed(3));
  let unitSin = $derived(Math.sin((unitDeg * Math.PI) / 180).toFixed(3));

  // ==========================================
  // TAB 4: TRIG IDENTITY
  // ==========================================
  let idDeg = $state(30);
  let idSin = $derived(Math.sin((idDeg * Math.PI) / 180));
  let idCos = $derived(Math.cos((idDeg * Math.PI) / 180));
  let idSum = $derived((idSin * idSin + idCos * idCos).toFixed(4));

  // ==========================================
  // TAB 5: HARMONIC WAVE (A sin(Bx + C) + D)
  // ==========================================
  let waveAmp = $state(20);
  let waveFreq = $state(2);
  let waveOffset = $state(0);

  // ==========================================
  // TAB 6: GAME FOV & AIM ANGLE
  // ==========================================
  let playerX = $state(5);
  let playerY = $state(5);
  let aimAngleRad = $derived(Math.atan2(playerY, playerX));
  let aimAngleDeg = $derived(((aimAngleRad * 180) / Math.PI).toFixed(1));
  let aimDist = $derived(Math.hypot(playerX, playerY).toFixed(2));
</script>

<div class="week6-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W6 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="pythagoras">1. Pythagoras (a² + b² = c²)</option>
      <option value="sohcahtoa">2. SOH CAH TOA Ratios</option>
      <option value="unitcircle">3. The Unit Circle</option>
      <option value="identity">4. sin²θ + cos²θ = 1</option>
      <option value="waves">5. Wave Oscillations</option>
      <option value="fov">6. Aim & FOV Angles</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 6 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Trigonometry & Unit Circle</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'pythagoras' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'pythagoras')}>
        <Triangle size={14} /> Pythagoras
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'sohcahtoa' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'sohcahtoa')}>
        <Compass size={14} /> Ratios
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'unitcircle' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'unitcircle')}>
        <Circle size={14} /> Unit Circle
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'identity' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'identity')}>
        <ShieldCheck size={14} /> Identity
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'waves' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'waves')}>
        <Activity size={14} /> Wave
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'fov' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'fov')}>
        <Eye size={14} /> Aim & FOV
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: PYTHAGORAS -->
    {#if activeTab === 'pythagoras'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Right Triangle Legs</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Leg a = {pythA}</span></div>
              <input type="range" min="1" max="15" bind:value={pythA} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Leg b = {pythB}</span></div>
              <input type="range" min="1" max="15" bind:value={pythB} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-3 bg-base-100 rounded-xl border border-base-300 font-mono text-xs">
            a² + b² = {pythA * pythA} + {pythB * pythB} = {pythA * pythA + pythB * pythB}
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Hypotenuse Length c</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{pythC}</div>
          <span class="badge badge-outline font-mono">c = √({pythA}² + {pythB}²) = {pythC}</span>
        </div>
      </div>

    <!-- TAB 2: SOH CAH TOA -->
    {:else if activeTab === 'sohcahtoa'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Triangle Sides</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Opposite = {trigOpp}</span></div>
              <input type="range" min="1" max="12" bind:value={trigOpp} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Adjacent = {trigAdj}</span></div>
              <input type="range" min="1" max="12" bind:value={trigAdj} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner">
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <span class="text-xs font-bold text-primary">sin θ (Opp/Hyp)</span>
              <div class="text-2xl font-mono font-black mt-1">{sinVal}</div>
            </div>
            <div class="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
              <span class="text-xs font-bold text-secondary">cos θ (Adj/Hyp)</span>
              <div class="text-2xl font-mono font-black mt-1">{cosVal}</div>
            </div>
            <div class="p-3 bg-accent/10 rounded-xl border border-accent/20">
              <span class="text-xs font-bold text-accent">tan θ (Opp/Adj)</span>
              <div class="text-2xl font-mono font-black mt-1">{tanVal}</div>
            </div>
          </div>
        </div>
      </div>

    <!-- TAB 3: UNIT CIRCLE -->
    {:else if activeTab === 'unitcircle'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Angle θ Control</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Angle: {unitDeg}° ({unitRad} rad)</span></div>
              <input type="range" min="0" max="360" bind:value={unitDeg} class="range range-xs range-primary" />
            </div>
            <div class="grid grid-cols-4 gap-1">
              {#each [0, 90, 180, 270] as preset}
                <button class="btn btn-xs btn-outline" onclick={() => unitDeg = preset}>{preset}°</button>
              {/each}
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Coordinates (cos θ, sin θ)</span>
          <div class="text-3xl font-mono font-black text-primary my-3">({unitCos}, {unitSin})</div>
          <div class="flex gap-4 text-xs font-mono">
            <span class="text-secondary font-bold">cos({unitDeg}°) = {unitCos}</span>
            <span class="text-primary font-bold">sin({unitDeg}°) = {unitSin}</span>
          </div>
        </div>
      </div>

    <!-- TAB 4: IDENTITY -->
    {:else if activeTab === 'identity'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Test Pythagorean Identity</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Angle θ = {idDeg}°</span></div>
              <input type="range" min="0" max="360" bind:value={idDeg} class="range range-xs range-primary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
          <div class="text-xl font-mono">sin²({idDeg}°) + cos²({idDeg}°)</div>
          <div class="text-base font-mono text-base-content/60">({idSin.toFixed(3)})² + ({idCos.toFixed(3)})²</div>
          <div class="text-6xl font-mono font-black text-primary my-2">= {idSum}</div>
          <p class="text-xs text-base-content/70">Always equal to 1 for any angle θ!</p>
        </div>
      </div>

    <!-- TAB 5: WAVES -->
    {:else if activeTab === 'waves'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Wave Params</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Amplitude A = {waveAmp}</span></div>
              <input type="range" min="5" max="40" bind:value={waveAmp} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Frequency B = {waveFreq}</span></div>
              <input type="range" min="1" max="5" bind:value={waveFreq} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-4 shadow-inner">
          <svg viewBox="0 -50 200 100" class="w-full h-40">
            <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" stroke-opacity="0.2" />
            <path
              d={`M 0 ${-waveAmp * Math.sin(0)} ` + Array.from({length: 200}, (_, x) => `L ${x} ${-waveAmp * Math.sin(x * waveFreq * 0.05)}`).join(' ')}
              fill="none"
              stroke="oklch(var(--p))"
              stroke-width="2.5"
            />
          </svg>
        </div>
      </div>

    <!-- TAB 6: AIM & FOV -->
    {:else if activeTab === 'fov'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Target Coordinates</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>dx = {playerX}</span></div>
              <input type="range" min="-10" max="10" bind:value={playerX} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>dy = {playerY}</span></div>
              <input type="range" min="-10" max="10" bind:value={playerY} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Aim Angle (atan2(dy, dx))</span>
          <div class="text-5xl font-mono font-black text-primary my-3">{aimAngleDeg}°</div>
          <span class="text-xs font-mono text-base-content/70">Distance: {aimDist} units</span>
        </div>
      </div>
    {/if}

  </div>
</div>
