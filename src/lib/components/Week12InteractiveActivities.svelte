<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import PlusCircle from '@lucide/svelte/icons/plus-circle';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Compass from '@lucide/svelte/icons/compass';
  import Sparkles from '@lucide/svelte/icons/sparkles';

  type TabType = 'dices' | 'arith' | 'polar' | 'roots';
  let activeTab = $state<TabType>('dices');

  // ==========================================
  // TAB 1: 2d6 vs 1d12 / 1d20 DICE CURVES
  // ==========================================
  let diceType = $state<'2d6' | '1d12'>('2d6');

  // 2d6 distribution: 2 to 12
  // counts: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] / 36
  const twoD6Distribution = [
    { sum: 2, prob: 1 / 36 },
    { sum: 3, prob: 2 / 36 },
    { sum: 4, prob: 3 / 36 },
    { sum: 5, prob: 4 / 36 },
    { sum: 6, prob: 5 / 36 },
    { sum: 7, prob: 6 / 36 },
    { sum: 8, prob: 5 / 36 },
    { sum: 9, prob: 4 / 36 },
    { sum: 10, prob: 3 / 36 },
    { sum: 11, prob: 2 / 36 },
    { sum: 12, prob: 1 / 36 }
  ];

  // ==========================================
  // TAB 2: COMPLEX ARITHMETIC (z1 + z2, z1 * z2)
  // ==========================================
  let z1R = $state(3);
  let z1I = $state(2);
  let z2R = $state(1);
  let z2I = $state(-2);

  let op = $state<'add' | 'mul'>('add');

  let resR = $derived(op === 'add' ? z1R + z2R : z1R * z2R - z1I * z2I);
  let resI = $derived(op === 'add' ? z1I + z2I : z1R * z2I + z1I * z2R);

  let svgZ1x = $derived(120 + z1R * 14);
  let svgZ1y = $derived(120 - z1I * 14);
  let svgZ2x = $derived(120 + z2R * 14);
  let svgZ2y = $derived(120 - z2I * 14);
  let svgResX = $derived(120 + resR * 14);
  let svgResY = $derived(120 - resI * 14);

  // ==========================================
  // TAB 3: POLAR FORM & 2D ROTATION
  // z = r * (cos theta + i sin theta)
  // ==========================================
  let polarR = $state(1.5);
  let polarThetaDeg = $state(45);
  let polarThetaRad = $derived((polarThetaDeg * Math.PI) / 180);

  let polarX = $derived(polarR * Math.cos(polarThetaRad));
  let polarY = $derived(polarR * Math.sin(polarThetaRad));

  let svgPolarX = $derived(120 + polarX * 45);
  let svgPolarY = $derived(120 - polarY * 45);

  // ==========================================
  // TAB 4: ROOTS OF UNITY (CIRCULAR RADIAL DIVISION)
  // z^n = 1 -> roots at e^(i 2pi k / n)
  // ==========================================
  let rootN = $state(6);
  let rootPolygonPts = $derived(
    Array.from({ length: rootN }, (_, k) => {
      const a = (k * 2 * Math.PI) / rootN;
      return `${120 + 70 * Math.cos(a)},${120 - 70 * Math.sin(a)}`;
    }).join(' ')
  );
</script>

<div class="week12-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W12 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="dices">1. Dice Mechanics: 2d6 vs 1d12</option>
      <option value="arith">2. Complex Plane & Arithmetic</option>
      <option value="polar">3. Polar Form 2D Rotation</option>
      <option value="roots">4. Roots of Unity & Symmetries</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 12 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Board Game Math & Complex Plane</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'dices' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'dices')}
      >
        <Dices size={14} /> 2d6 vs 1d12
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'arith' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'arith')}
      >
        <Crosshair size={14} /> Complex Arithmetic
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'polar' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'polar')}
      >
        <RotateCw size={14} /> Polar 2D Rotation
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'roots' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'roots')}
      >
        <Compass size={14} /> Roots of Unity
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- TAB 1: 2D6 VS 1D12 -->
    {#if activeTab === 'dices'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Dices size={18} class="text-primary" /> Multi-Dice Bell Curve vs Flat Roll
            </h3>
            <p class="text-xs text-base-content/70">
              Rolling 2d6 sums independent random variables, creating a <strong>triangular bell curve</strong> centered at 7 (16.7% chance). In contrast, rolling 1d12 is a <strong>flat uniform distribution</strong> where extreme values (1 or 12) have the exact same chance as 7 (8.3%).
            </p>
          </div>

          <div class="flex gap-2">
            <button
              class={`btn btn-sm flex-1 ${diceType === '2d6' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (diceType = '2d6')}
            >
              2d6 (Bell Curve / Catan)
            </button>
            <button
              class={`btn btn-sm flex-1 ${diceType === '1d12' ? 'btn-secondary' : 'btn-outline'}`}
              onclick={() => (diceType = '1d12')}
            >
              1d12 (Flat Uniform)
            </button>
          </div>

          <div class="p-4 bg-base-200 rounded-2xl border border-base-300 font-mono text-xs space-y-1">
            <div class="flex justify-between items-center text-sm">
              <span>Center Mode (Sum = 7):</span>
              <strong class="text-primary">{diceType === '2d6' ? '16.7% (6/36 ways)' : '8.3% (1/12 ways)'}</strong>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span>Extreme Outcomes (2 or 12):</span>
              <strong class={diceType === '2d6' ? 'text-accent' : 'text-secondary'}>
                {diceType === '2d6' ? '2.8% each (Rare)' : '8.3% each (Equally Likely)'}
              </strong>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- X Axis -->
            <line x1="20" y1="200" x2="225" y2="200" stroke="currentColor" stroke-opacity="0.2" />

            {#if diceType === '2d6'}
              {#each twoD6Distribution as d, i}
                {@const barH = d.prob * 900}
                {@const barX = 30 + i * 17}
                <rect x={barX} y={200 - barH} width="13" height={barH} rx="2" fill={d.sum === 7 ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)'} />
                <text x={barX + 6.5} y="213" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor">{d.sum}</text>
              {/each}
            {:else}
              {#each Array(12) as _, i}
                {@const barH = (1 / 12) * 900}
                {@const barX = 25 + i * 16}
                <rect x={barX} y={200 - barH} width="12" height={barH} rx="2" fill="rgba(168, 85, 247, 0.5)" />
                <text x={barX + 6} y="213" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor">{i + 1}</text>
              {/each}
            {/if}
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">
            {diceType === '2d6' ? '2d6: Predictable center minimizes extreme variance' : '1d12: Maximum randomness / swingy outcomes'}
          </span>
        </div>
      </div>
    {/if}

    <!-- TAB 2: COMPLEX ARITHMETIC -->
    {#if activeTab === 'arith'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Crosshair size={18} class="text-primary" /> Complex Plane (Argand Diagram)
            </h3>
            <p class="text-xs text-base-content/70">
              A complex number z = a + bi represents a 2D point (Real, Imaginary). Addition translates vectors tip-to-tail; multiplication rotates by angles and scales by lengths!
            </p>
          </div>

          <div class="flex gap-2">
            <button class={`btn btn-xs flex-1 ${op === 'add' ? 'btn-primary' : 'btn-outline'}`} onclick={() => (op = 'add')}>
              Addition (z₁ + z₂)
            </button>
            <button class={`btn btn-xs flex-1 ${op === 'mul' ? 'btn-secondary' : 'btn-outline'}`} onclick={() => (op = 'mul')}>
              Multiplication (z₁ × z₂)
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono">
            <div class="p-2.5 bg-base-200 rounded-xl border border-base-300">
              <span class="font-bold text-blue-500 block mb-1">z₁ = {z1R} + {z1I}i</span>
              <div class="flex items-center gap-1">
                <span>R:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={z1R} class="range range-xs range-info" />
              </div>
              <div class="flex items-center gap-1">
                <span>I:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={z1I} class="range range-xs range-info" />
              </div>
            </div>

            <div class="p-2.5 bg-base-200 rounded-xl border border-base-300">
              <span class="font-bold text-purple-500 block mb-1">z₂ = {z2R} + {z2I}i</span>
              <div class="flex items-center gap-1">
                <span>R:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={z2R} class="range range-xs range-secondary" />
              </div>
              <div class="flex items-center gap-1">
                <span>I:</span>
                <input type="range" min="-4" max="4" step="1" bind:value={z2I} class="range range-xs range-secondary" />
              </div>
            </div>
          </div>

          <div class="p-3 bg-primary/10 border border-primary/30 rounded-xl font-mono text-xs flex justify-between items-center">
            <span>Result z =</span>
            <strong class="text-primary text-sm">{resR} + {resI}i</strong>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes: Real & Imaginary -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.2" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.2" />
            <text x="220" y="115" font-size="9" fill="currentColor" opacity="0.6">Re</text>
            <text x="125" y="20" font-size="9" fill="currentColor" opacity="0.6">Im</text>

            <!-- z1 point -->
            <circle cx={svgZ1x} cy={svgZ1y} r="4" fill="#3b82f6" />
            <!-- z2 point -->
            <circle cx={svgZ2x} cy={svgZ2y} r="4" fill="#a855f7" />
            <!-- Result point -->
            <circle cx={svgResX} cy={svgResY} r="5" fill="#10b981" />
            <line x1="120" y1="120" x2={svgResX} y2={svgResY} stroke="#10b981" stroke-width="2" stroke-dasharray="2,2" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Blue: z₁ | Purple: z₂ | Green: Result</span>
        </div>
      </div>
    {/if}

    <!-- TAB 3: POLAR FORM 2D ROTATION -->
    {#if activeTab === 'polar'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <RotateCw size={18} class="text-primary" /> Polar Form: Rotation Without Matrices
            </h3>
            <p class="text-xs text-base-content/70">
              In polar coordinates, z = r · e^(i θ) = r(cos θ + i sin θ). Multiplying by e^(i Δθ) rotates any 2D vector smoothly by Δθ without computing full 2×2 matrix transformations!
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Radius / Magnitude (r):</span>
                <span class="text-primary font-mono">{polarR.toFixed(2)}</span>
              </div>
              <input type="range" min="0.5" max="2.2" step="0.1" bind:value={polarR} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Rotation Angle (θ):</span>
                <span class="text-secondary font-mono">{polarThetaDeg}°</span>
              </div>
              <input type="range" min="0" max="360" step="5" bind:value={polarThetaDeg} class="range range-xs range-secondary" />
            </div>
          </div>

          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs flex justify-between items-center">
            <span>Rectangular Form:</span>
            <strong class="text-primary text-sm">{polarX.toFixed(2)} + {polarY.toFixed(2)}i</strong>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Unit / Radius Circle -->
            <circle cx="120" cy="120" r={polarR * 45} fill="none" stroke="#3b82f6" stroke-opacity="0.3" stroke-width="1.5" />

            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.2" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.2" />

            <!-- Phasor / Vector -->
            <line x1="120" y1="120" x2={svgPolarX} y2={svgPolarY} stroke="#3b82f6" stroke-width="3" />
            <circle cx={svgPolarX} cy={svgPolarY} r="4" fill="#3b82f6" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">z = {polarR.toFixed(1)} · e^(i · {polarThetaDeg}°)</span>
        </div>
      </div>
    {/if}

    <!-- TAB 4: ROOTS OF UNITY -->
    {#if activeTab === 'roots'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Compass size={18} class="text-primary" /> Roots of Unity: Radial Game Symmetry
            </h3>
            <p class="text-xs text-base-content/70">
              The solutions to z^n = 1 form n equally spaced points around the unit circle. In game design, this provides the exact trigonometry for bullet hell radial patterns and circular magic circles.
            </p>
          </div>

          <div>
            <div class="flex justify-between text-xs font-bold mb-1">
              <span>Radial Slices (n-gon / Bullets):</span>
              <span class="text-primary font-mono text-base">{rootN} points</span>
            </div>
            <input type="range" min="3" max="12" step="1" bind:value={rootN} class="range range-xs range-primary" />
          </div>

          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs text-center">
            <span>Angular Step: </span>
            <strong class="text-primary text-sm">360° / {rootN} = {(360 / rootN).toFixed(1)}°</strong>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Unit Circle -->
            <circle cx="120" cy="120" r="70" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />

            <!-- Polygon Connecting Roots -->
            <polygon points={rootPolygonPts} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" />

            <!-- Spoke Lines & Dots -->
            {#each Array(rootN) as _, k}
              {@const a = (k * 2 * Math.PI) / rootN}
              {@const rx = 120 + 70 * Math.cos(a)}
              {@const ry = 120 - 70 * Math.sin(a)}
              <line x1="120" y1="120" x2={rx} y2={ry} stroke="#10b981" stroke-width="1" stroke-dasharray="2,2" />
              <circle cx={rx} cy={ry} r="4.5" fill="#10b981" />
            {/each}
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">Regular {rootN}-gon: e^(i · 2πk / {rootN})</span>
        </div>
      </div>
    {/if}

  </div>
</div>
