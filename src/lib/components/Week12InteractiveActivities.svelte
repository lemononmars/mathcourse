<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import PlusCircle from '@lucide/svelte/icons/plus-circle';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Compass from '@lucide/svelte/icons/compass';

  type TabType = 'dices' | 'arith' | 'plane' | 'polar' | 'roots';
  let activeTab = $state<TabType>('dices');

  // Dice distribution
  let diceType = $state<'2d6' | '1d20'>('2d6');

  // Complex Arithmetic (z1 + z2, z1 * z2)
  let z1R = $state(3);
  let z1I = $state(2);
  let z2R = $state(1);
  let z2I = $state(-4);

  let sumR = $derived(z1R + z2R);
  let sumI = $derived(z1I + z2I);

  let prodR = $derived(z1R * z2R - z1I * z2I);
  let prodI = $derived(z1R * z2I + z1I * z2R);

  // Complex Plane
  let modZ = $derived(Math.hypot(z1R, z1I).toFixed(2));
  let argZDeg = $derived(((Math.atan2(z1I, z1R) * 180) / Math.PI).toFixed(1));

  // Polar Form Rotation
  let polarR = $state(2);
  let polarThetaDeg = $state(45);
  let polarX = $derived((polarR * Math.cos((polarThetaDeg * Math.PI) / 180)).toFixed(2));
  let polarY = $derived((polarR * Math.sin((polarThetaDeg * Math.PI) / 180)).toFixed(2));

  // Roots of Unity
  let rootN = $state(6);
</script>

<div class="week12-studio flex h-[calc(100vh-80px)] max-h-[840px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W12 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="dices">1. 2d6 vs 1d20 Curves</option>
      <option value="arith">2. Complex Arithmetic</option>
      <option value="plane">3. Argand Diagram (Plane)</option>
      <option value="polar">4. Polar Form 2D Rotation</option>
      <option value="roots">5. Roots of Unity</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 12 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Board Games & Complex Numbers</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'dices' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'dices')}>
        <Dices size={14} /> 2d6 vs 1d20
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'arith' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'arith')}>
        <PlusCircle size={14} /> Arithmetic
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'plane' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'plane')}>
        <Crosshair size={14} /> Argand Plane
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'polar' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'polar')}>
        <RotateCw size={14} /> Polar 2D
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'roots' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onclick={() => (activeTab = 'roots')}>
        <Compass size={14} /> Roots of Unity
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto py-2 px-1">
    
    <!-- TAB 1: 2D6 VS 1D20 -->
    {#if activeTab === 'dices'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Dice Distribution Mechanics</span>
            <div class="join w-full">
              <button class={`join-item btn btn-sm flex-1 ${diceType === '2d6' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => diceType = '2d6'}>2d6 (Bell Curve)</button>
              <button class={`join-item btn btn-sm flex-1 ${diceType === '1d20' ? 'btn-primary' : 'btn-ghost'}`} onclick={() => diceType = '1d20'}>1d20 (Flat / D&D)</button>
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1">
              <p class="font-bold text-primary">Game Design Impact:</p>
              <p class="text-base-content/70">
                {#if diceType === '2d6'}
                  2d6 produces a pyramid distribution with 7 being the most likely (16.7%). Catan relies on this!
                {:else}
                  1d20 has equal 5% chance for every number 1 to 20, creating high swingy drama.
                {/if}
              </p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Distribution Profile</span>
          <div class="text-5xl font-mono font-black text-primary my-3">
            {diceType === '2d6' ? 'Peak at Sum = 7' : 'Uniform 5% Each'}
          </div>
          <span class="text-xs font-mono text-base-content/70">{diceType === '2d6' ? 'Range [2..12], 36 combinations' : 'Range [1..20], 20 outcomes'}</span>
        </div>
      </div>

    <!-- TAB 2: COMPLEX ARITHMETIC -->
    {:else if activeTab === 'arith'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-6 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Complex Numbers z₁ and z₂</span>
            <div>
              <span class="text-xs font-bold">z₁ = {z1R} + {z1I}i</span>
              <input type="range" min="-5" max="5" bind:value={z1R} class="range range-xs range-primary mt-1" />
              <input type="range" min="-5" max="5" bind:value={z1I} class="range range-xs range-primary mt-1" />
            </div>
            <div>
              <span class="text-xs font-bold">z₂ = {z2R} + {z2I}i</span>
              <input type="range" min="-5" max="5" bind:value={z2R} class="range range-xs range-secondary mt-1" />
              <input type="range" min="-5" max="5" bind:value={z2I} class="range range-xs range-secondary mt-1" />
            </div>
          </div>
        </div>

        <div class="md:col-span-6 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-4 text-center">
          <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
            <span class="text-xs font-bold text-primary uppercase">Addition z₁ + z₂</span>
            <div class="text-3xl font-mono font-black mt-1">{sumR} {sumI >= 0 ? '+' : ''}{sumI}i</div>
          </div>

          <div class="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
            <span class="text-xs font-bold text-secondary uppercase">Multiplication z₁ · z₂ (i² = -1)</span>
            <div class="text-3xl font-mono font-black mt-1">{prodR} {prodI >= 0 ? '+' : ''}{prodI}i</div>
          </div>
        </div>
      </div>

    <!-- TAB 4: POLAR FORM 2D ROTATION -->
    {:else if activeTab === 'polar'}
      <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary">Polar Form r · e^(iθ)</span>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Modulus r = {polarR}</span></div>
              <input type="range" min="1" max="10" bind:value={polarR} class="range range-xs range-primary" />
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1"><span>Rotation Angle θ = {polarThetaDeg}°</span></div>
              <input type="range" min="0" max="360" bind:value={polarThetaDeg} class="range range-xs range-secondary" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
          <span class="text-xs uppercase font-bold text-base-content/50">Rectangular Coordinates (x, y)</span>
          <div class="text-4xl font-mono font-black text-primary my-3">({polarX}, {polarY})</div>
          <p class="text-xs font-mono text-base-content/70">{polarR}(cos {polarThetaDeg}° + i sin {polarThetaDeg}°)</p>
        </div>
      </div>

    <!-- OTHER TABS -->
    {:else}
      <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
        {#if activeTab === 'plane'}
          <span class="badge badge-primary font-bold">Argand Plane</span>
          <div class="text-4xl font-mono font-black text-primary">z = {z1R} + {z1I}i</div>
          <p class="text-sm font-mono">Modulus |z| = {modZ}, Angle θ = {argZDeg}°</p>
        {:else}
          <span class="badge badge-primary font-bold">Roots of Unity: zⁿ = 1</span>
          <div>
            <span>Order n = {rootN}</span>
            <input type="range" min="3" max="12" bind:value={rootN} class="range range-xs range-primary mt-2" />
          </div>
          <p class="text-xs text-base-content/70">The {rootN} roots form a regular {rootN}-gon on the unit circle.</p>
        {/if}
      </div>
    {/if}

  </div>
</div>
