<script lang="ts">
  import Move from '@lucide/svelte/icons/move';
  import Navigation from '@lucide/svelte/icons/navigation';
  import Route from '@lucide/svelte/icons/route';
  import Plus from '@lucide/svelte/icons/plus';
  import Maximize2 from '@lucide/svelte/icons/maximize-2';
  import Sun from '@lucide/svelte/icons/sun';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Grid from '@lucide/svelte/icons/grid';
  import Compass from '@lucide/svelte/icons/compass';
  import Zap from '@lucide/svelte/icons/zap';
  import Shield from '@lucide/svelte/icons/shield';

  type TabType = 'components' | 'displacement' | 'arithmetic' | 'unitvec' | 'dotprod' | 'transforms';
  let activeTab = $state<TabType>('components');

  // ==========================================
  // TAB 1: VECTOR COMPONENTS & POLAR CONVERSION
  // ==========================================
  let vecX = $state(4);
  let vecY = $state(3);
  let vecNorm = $derived(Math.hypot(vecX, vecY).toFixed(2));
  let vecAngleRad = $derived(Math.atan2(vecY, vecX));
  let vecAngleDeg = $derived(((vecAngleRad * 180) / Math.PI).toFixed(1));

  let vecQuadrant = $derived.by(() => {
    if (vecX > 0 && vecY > 0) return 'Quadrant I (+, +)';
    if (vecX < 0 && vecY > 0) return 'Quadrant II (-, +)';
    if (vecX < 0 && vecY < 0) return 'Quadrant III (-, -)';
    if (vecX > 0 && vecY < 0) return 'Quadrant IV (+, -)';
    return 'On Axis';
  });

  // SVG coordinate projection (Scale: 1 unit = 16px, center at (120, 120))
  let svgVecX = $derived(120 + vecX * 14);
  let svgVecY = $derived(120 - vecY * 14);

  // ==========================================
  // TAB 2: DISPLACEMENT VECTOR (AB = B - A)
  // ==========================================
  let ptAx = $state(-3);
  let ptAy = $state(-2);
  let ptBx = $state(3);
  let ptBy = $state(3);

  let dispDx = $derived(ptBx - ptAx);
  let dispDy = $derived(ptBy - ptAy);
  let dispDist = $derived(Math.hypot(dispDx, dispDy).toFixed(2));

  let svgAx = $derived(120 + ptAx * 14);
  let svgAy = $derived(120 - ptAy * 14);
  let svgBx = $derived(120 + ptBx * 14);
  let svgBy = $derived(120 - ptBy * 14);
  let svgOriginDx = $derived(120 + dispDx * 14);
  let svgOriginDy = $derived(120 - dispDy * 14);

  // ==========================================
  // TAB 3: VECTOR ARITHMETIC (u + v or u - v)
  // ==========================================
  let uX = $state(3);
  let uY = $state(2);
  let vX = $state(2);
  let vY = $state(-3);
  let arithOp = $state<'add' | 'sub'>('add');

  let resVx = $derived(arithOp === 'add' ? uX + vX : uX - vX);
  let resVy = $derived(arithOp === 'add' ? uY + vY : uY - vY);
  let resNorm = $derived(Math.hypot(resVx, resVy).toFixed(2));

  let svgUx = $derived(120 + uX * 12);
  let svgUy = $derived(120 - uY * 12);
  let svgVx = $derived(120 + vX * 12);
  let svgVy = $derived(120 - vY * 12);

  // Chained v head position (starting at head of u)
  let chainedVx = $derived(arithOp === 'add' ? vX : -vX);
  let chainedVy = $derived(arithOp === 'add' ? vY : -vY);
  let svgChainedEndX = $derived(svgUx + chainedVx * 12);
  let svgChainedEndY = $derived(svgUy - chainedVy * 12);

  let svgResX = $derived(120 + resVx * 12);
  let svgResY = $derived(120 - resVy * 12);

  // ==========================================
  // TAB 4: UNIT VECTOR & 8-WAY MOVEMENT
  // ==========================================
  let moveX = $state(1);
  let moveY = $state(1);
  let moveNorm = $derived(Math.hypot(moveX, moveY));
  let moveNormStr = $derived(moveNorm.toFixed(3));
  let unitX = $derived(moveNorm > 0 ? (moveX / moveNorm).toFixed(3) : '0');
  let unitY = $derived(moveNorm > 0 ? (moveY / moveNorm).toFixed(3) : '0');

  let isOverSpeed = $derived(moveNorm > 1.01);

  function setMovePreset(preset: 'cardinal' | 'diagonal_raw' | 'diagonal_norm') {
    if (preset === 'cardinal') {
      moveX = 1;
      moveY = 0;
    } else if (preset === 'diagonal_raw') {
      moveX = 1;
      moveY = 1;
    } else if (preset === 'diagonal_norm') {
      moveX = Math.SQRT1_2;
      moveY = Math.SQRT1_2;
    }
  }

  let svgMoveEndX = $derived(120 + moveX * 60);
  let svgMoveEndY = $derived(120 - moveY * 60);
  let svgUnitEndX = $derived(120 + Number(unitX) * 60);
  let svgUnitEndY = $derived(120 - Number(unitY) * 60);

  // ==========================================
  // TAB 5: DOT PRODUCT & SURFACE LIGHTING LAB
  // ==========================================
  let lightAngleDeg = $state(45); // angle of incoming light from surface normal
  let lightAngleRad = $derived((lightAngleDeg * Math.PI) / 180);

  // Normal vector N is straight UP: (0, 1)
  let normNx = 0;
  let normNy = 1;

  // Light vector L points towards light source: (sin(rad), cos(rad))
  let lightLx = $derived(Math.sin(lightAngleRad));
  let lightLy = $derived(Math.cos(lightAngleRad));

  // Dot product N . L = 0*sin + 1*cos = cos(lightAngleRad)
  let dotProdVal = $derived(Math.cos(lightAngleRad));
  let dotProdStr = $derived(dotProdVal.toFixed(3));
  let diffuseIntensity = $derived(Math.max(0, dotProdVal)); // Lambertian clamp: max(0, N . L)
  let diffusePercent = $derived(Math.round(diffuseIntensity * 100));

  let dotClassification = $derived.by(() => {
    if (Math.abs(dotProdVal) < 0.02) return 'Perpendicular (90°) → No Light Grazing';
    if (dotProdVal > 0) return 'Acute (< 90°) → Illuminated Surface';
    return 'Obtuse (> 90°) → In Dark Shadow';
  });

  let svgLightEndX = $derived(120 + lightLx * 70);
  let svgLightEndY = $derived(120 - lightLy * 70);

  // ==========================================
  // TAB 6: 2D TRANSFORMATION OF UNIT SQUARE
  // ==========================================
  let scaleX = $state(2);
  let scaleY = $state(1.5);
  let transX = $state(1);
  let transY = $state(0);

  // Unit square vertices: (0,0), (1,0), (1,1), (0,1)
  let sqV0 = $derived({ x: transX, y: transY });
  let sqV1 = $derived({ x: 1 * scaleX + transX, y: transY });
  let sqV2 = $derived({ x: 1 * scaleX + transX, y: 1 * scaleY + transY });
  let sqV3 = $derived({ x: transX, y: 1 * scaleY + transY });

  function toSvg(x: number, y: number) {
    return `${120 + x * 22},${120 - y * 22}`;
  }

  let origSquareSvg = '120,120 142,120 142,98 120,98';
  let transSquareSvg = $derived(
    `${toSvg(sqV0.x, sqV0.y)} ${toSvg(sqV1.x, sqV1.y)} ${toSvg(sqV2.x, sqV2.y)} ${toSvg(sqV3.x, sqV3.y)}`
  );

  let transfTypeDesc = $derived.by(() => {
    if (scaleX < 0 || scaleY < 0) return 'Reflection + Dilation';
    if (scaleX === scaleY && scaleX !== 1 && transX === 0 && transY === 0) return 'Uniform Scaling (Dilation)';
    if (transX !== 0 || transY !== 0) return 'Scaling & Translation';
    return 'Non-Uniform Scaling (Anamorphic Stretch)';
  });
</script>

<div class="week7-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Tab Select -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W7 Vectors</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="components">1. Vector Components & Norm</option>
      <option value="displacement">2. Displacement Vector (AB = B - A)</option>
      <option value="arithmetic">3. Vector Arithmetic (u ± v)</option>
      <option value="unitvec">4. Normalization & Game Speed</option>
      <option value="dotprod">5. Dot Product & Surface Lighting</option>
      <option value="transforms">6. 2D Unit Square Transformations</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 7 Studio</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Vectors & 2D Transformations</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'components' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'components')}
      >
        <Navigation size={14} /> Components
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'displacement' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'displacement')}
      >
        <Route size={14} /> Displacement
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'arithmetic' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'arithmetic')}
      >
        <Plus size={14} /> Arithmetic
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'unitvec' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'unitvec')}
      >
        <Compass size={14} /> Normalization
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'dotprod' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'dotprod')}
      >
        <Sun size={14} /> Dot & Lighting
      </button>
      <button
        class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'transforms' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
        onclick={() => (activeTab = 'transforms')}
      >
        <Maximize2 size={14} /> 2D Transform
      </button>
    </div>
  </div>

  <!-- Studio Main Content Area -->
  <div class="flex-1 overflow-y-auto py-2">

    <!-- ========================================== -->
    <!-- TAB 1: VECTOR COMPONENTS & NORM            -->
    <!-- ========================================== -->
    {#if activeTab === 'components'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Navigation size={18} class="text-primary" /> Vector Components & Magnitude
            </h3>
            <p class="text-xs text-base-content/70">
              A 2D vector v⃗ = [v_x, v_y] has horizontal and vertical step components. Its length ||v⃗|| is computed via Pythagoras: √(v_x² + v_y²).
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Horizontal Component (v_x):</span>
                <span class="text-primary font-mono">{vecX}</span>
              </div>
              <input type="range" min="-7" max="7" step="1" bind:value={vecX} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Vertical Component (v_y):</span>
                <span class="text-secondary font-mono">{vecY}</span>
              </div>
              <input type="range" min="-7" max="7" step="1" bind:value={vecY} class="range range-xs range-secondary" />
            </div>
          </div>

          <!-- Formula & Stats Card -->
          <div class="grid grid-cols-2 gap-2 text-xs font-mono">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Magnitude (Norm)</span>
              <span class="text-base font-bold text-accent">||v|| = {vecNorm}</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">√({vecX}² + {vecY}²)</span>
            </div>
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Direction Angle</span>
              <span class="text-base font-bold text-primary">{vecAngleDeg}°</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">{vecQuadrant}</span>
            </div>
          </div>
        </div>

        <!-- Visual Coordinate Plot -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Grid Lines -->
            {#each [-6, -4, -2, 0, 2, 4, 6] as g}
              <line x1={120 + g * 14} y1="10" x2={120 + g * 14} y2="230" stroke="currentColor" stroke-opacity="0.08" />
              <line x1="10" y1={120 - g * 14} x2="230" y2={120 - g * 14} stroke="currentColor" stroke-opacity="0.08" />
            {/each}

            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" />

            <!-- Triangle Legs: Horizontal vx and Vertical vy -->
            <line x1="120" y1="120" x2={svgVecX} y2="120" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="3,2" />
            <line x1={svgVecX} y1="120" x2={svgVecX} y2={svgVecY} stroke="#a855f7" stroke-width="2.5" stroke-dasharray="3,2" />

            <!-- Main Vector Arrow v -->
            <defs>
              <marker id="arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>
            <line x1="120" y1="120" x2={svgVecX} y2={svgVecY} stroke="#10b981" stroke-width="3.5" marker-end="url(#arrow-v)" />

            <!-- Vector Head Dot -->
            <circle cx={svgVecX} cy={svgVecY} r="4.5" fill="#10b981" />
            <!-- Origin Dot -->
            <circle cx="120" cy="120" r="3" fill="currentColor" stroke-opacity="0.6" />

            <!-- Labels -->
            <text x={svgVecX} y={svgVecY - 8} font-size="11" font-weight="bold" fill="#10b981" text-anchor="middle">
              ({vecX}, {vecY})
            </text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Vector v⃗ = {vecX}î + {vecY}ĵ</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 2: DISPLACEMENT VECTOR (AB = B - A)    -->
    <!-- ========================================== -->
    {#if activeTab === 'displacement'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Route size={18} class="text-primary" /> Displacement: AB = B - A
            </h3>
            <p class="text-xs text-base-content/70">
              Vectors are free: they describe direction and displacement, not fixed world coordinates. Moving from point A to point B yields the exact same vector as anchoring it at the origin.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="text-xs font-black text-primary">Start Point A (x₁, y₁)</span>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span>x:</span>
                <input type="range" min="-6" max="6" step="1" bind:value={ptAx} class="range range-xs range-primary" />
                <span class="w-5 text-right">{ptAx}</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span>y:</span>
                <input type="range" min="-6" max="6" step="1" bind:value={ptAy} class="range range-xs range-primary" />
                <span class="w-5 text-right">{ptAy}</span>
              </div>
            </div>

            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="text-xs font-black text-secondary">End Point B (x₂, y₂)</span>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span>x:</span>
                <input type="range" min="-6" max="6" step="1" bind:value={ptBx} class="range range-xs range-secondary" />
                <span class="w-5 text-right">{ptBx}</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span>y:</span>
                <input type="range" min="-6" max="6" step="1" bind:value={ptBy} class="range range-xs range-secondary" />
                <span class="w-5 text-right">{ptBy}</span>
              </div>
            </div>
          </div>

          <div class="p-3 bg-primary/10 border border-primary/30 rounded-xl font-mono text-xs">
            <div class="flex justify-between items-center">
              <span>Displacement Vector:</span>
              <strong class="text-primary text-sm">AB = [{dispDx}, {dispDy}]</strong>
            </div>
            <div class="flex justify-between items-center mt-1 text-base-content/70">
              <span>Distance ||AB||:</span>
              <span>{dispDist} units</span>
            </div>
          </div>
        </div>

        <!-- Visual Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.2" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.2" />

            <!-- Origin Reference Vector (Dashed) -->
            <line x1="120" y1="120" x2={svgOriginDx} y2={svgOriginDy} stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />

            <!-- Displacement Vector A -> B -->
            <defs>
              <marker id="arrow-disp" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#3b82f6" />
              </marker>
            </defs>
            <line x1={svgAx} y1={svgAy} x2={svgBx} y2={svgBy} stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow-disp)" />

            <!-- Point A -->
            <circle cx={svgAx} cy={svgAy} r="5" fill="#f59e0b" />
            <text x={svgAx - 6} y={svgAy - 6} font-size="10" font-weight="bold" fill="#f59e0b">A</text>

            <!-- Point B -->
            <circle cx={svgBx} cy={svgBy} r="5" fill="#ec4899" />
            <text x={svgBx + 6} y={svgBy - 6} font-size="10" font-weight="bold" fill="#ec4899">B</text>
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Blue: World Motion AB | Dashed: Same vector at origin</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 3: VECTOR ARITHMETIC (u ± v)           -->
    <!-- ========================================== -->
    {#if activeTab === 'arithmetic'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Plus size={18} class="text-primary" /> Vector Addition & Subtraction
            </h3>
            <p class="text-xs text-base-content/70">
              Vector addition attaches the tail of v⃗ to the head of u⃗ (Head-to-Tail rule / Parallelogram). In games, this models combined forces, wind drift, and impulse physics.
            </p>
          </div>

          <!-- Operation Toggle -->
          <div class="flex gap-2">
            <button
              class={`btn btn-sm flex-1 ${arithOp === 'add' ? 'btn-primary' : 'btn-ghost'}`}
              onclick={() => (arithOp = 'add')}
            >
              Addition (u⃗ + v⃗)
            </button>
            <button
              class={`btn btn-sm flex-1 ${arithOp === 'sub' ? 'btn-primary' : 'btn-ghost'}`}
              onclick={() => (arithOp = 'sub')}
            >
              Subtraction (u⃗ - v⃗)
            </button>
          </div>

          <!-- Controls for u and v -->
          <div class="grid grid-cols-2 gap-3 text-xs font-mono">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="font-bold text-blue-500">Vector u ({uX}, {uY})</span>
              <div class="flex items-center gap-1">
                <span>x:</span>
                <input type="range" min="-5" max="5" step="1" bind:value={uX} class="range range-xs range-info" />
              </div>
              <div class="flex items-center gap-1">
                <span>y:</span>
                <input type="range" min="-5" max="5" step="1" bind:value={uY} class="range range-xs range-info" />
              </div>
            </div>

            <div class="p-3 bg-base-200 rounded-xl border border-base-300 space-y-2">
              <span class="font-bold text-purple-500">Vector v ({vX}, {vY})</span>
              <div class="flex items-center gap-1">
                <span>x:</span>
                <input type="range" min="-5" max="5" step="1" bind:value={vX} class="range range-xs range-secondary" />
              </div>
              <div class="flex items-center gap-1">
                <span>y:</span>
                <input type="range" min="-5" max="5" step="1" bind:value={vY} class="range range-xs range-secondary" />
              </div>
            </div>
          </div>

          <!-- Result banner -->
          <div class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl font-mono text-xs flex justify-between items-center">
            <span>Resultant w⃗:</span>
            <strong class="text-emerald-500 text-sm">
              ({resVx}, {resVy}) | Magnitude: {resNorm}
            </strong>
          </div>
        </div>

        <!-- SVG Visualizer -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.15" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.15" />

            <defs>
              <marker id="arr-u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#3b82f6" />
              </marker>
              <marker id="arr-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#a855f7" />
              </marker>
              <marker id="arr-res" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            <!-- Vector u from origin -->
            <line x1="120" y1="120" x2={svgUx} y2={svgUy} stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arr-u)" />

            <!-- Chained vector v starting at head of u -->
            <line x1={svgUx} y1={svgUy} x2={svgChainedEndX} y2={svgChainedEndY} stroke="#a855f7" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arr-v)" />

            <!-- Resultant vector from origin to end -->
            <line x1="120" y1="120" x2={svgResX} y2={svgResY} stroke="#10b981" stroke-width="3.5" marker-end="url(#arr-res)" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Blue: u⃗ | Purple: v⃗ (chained) | Green: Resultant</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 4: NORMALIZATION & 8-WAY MOVEMENT      -->
    <!-- ========================================== -->
    {#if activeTab === 'unitvec'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Compass size={18} class="text-primary" /> Unit Vectors & Game Speed
            </h3>
            <p class="text-xs text-base-content/70">
              A unit vector has length ||v̂|| = 1. When games accept input like (W + D) without normalizing v⃗, diagonal movement speed increases to √(1² + 1²) ≈ 1.414 (41% faster)!
            </p>
          </div>

          <!-- Quick Presets -->
          <div class="flex flex-wrap gap-2">
            <button class="btn btn-xs btn-outline" onclick={() => setMovePreset('cardinal')}>
              Cardinal (1, 0)
            </button>
            <button class="btn btn-xs btn-outline btn-warning" onclick={() => setMovePreset('diagonal_raw')}>
              Unnormalized (1, 1) [Speed Bug]
            </button>
            <button class="btn btn-xs btn-outline btn-success" onclick={() => setMovePreset('diagonal_norm')}>
              Normalized [Fixed]
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input X Velocity:</span>
                <span class="font-mono">{moveX.toFixed(2)}</span>
              </div>
              <input type="range" min="-1.5" max="1.5" step="0.05" bind:value={moveX} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Input Y Velocity:</span>
                <span class="font-mono">{moveY.toFixed(2)}</span>
              </div>
              <input type="range" min="-1.5" max="1.5" step="0.05" bind:value={moveY} class="range range-xs range-secondary" />
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 font-mono text-xs space-y-1">
            <div class="flex justify-between items-center">
              <span>Current Speed ||v||:</span>
              <span class={`font-bold text-sm ${isOverSpeed ? 'text-error animate-pulse' : 'text-success'}`}>
                {moveNormStr} {isOverSpeed ? '(+41% FASTER!)' : '(Balanced)'}
              </span>
            </div>
            <div class="flex justify-between items-center text-base-content/70">
              <span>Unit Vector v̂:</span>
              <span>({unitX}, {unitY})</span>
            </div>
          </div>
        </div>

        <!-- Visual Unit Circle Comparison -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Unit Radius Circle (r = 60px) -->
            <circle cx="120" cy="120" r="60" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" />

            <!-- Axes -->
            <line x1="20" y1="120" x2="220" y2="120" stroke="currentColor" stroke-opacity="0.2" />
            <line x1="120" y1="20" x2="120" y2="220" stroke="currentColor" stroke-opacity="0.2" />

            <defs>
              <marker id="arr-move" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill={isOverSpeed ? '#ef4444' : '#3b82f6'} />
              </marker>
            </defs>

            <!-- Raw Velocity Vector -->
            <line x1="120" y1="120" x2={svgMoveEndX} y2={svgMoveEndY} stroke={isOverSpeed ? '#ef4444' : '#3b82f6'} stroke-width="3.5" marker-end="url(#arr-move)" />

            <!-- Unit Normal Target Dot -->
            <circle cx={svgUnitEndX} cy={svgUnitEndY} r="4" fill="#10b981" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Dashed Circle: Unit Speed (1.0) | Red exceeds boundary</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 5: DOT PRODUCT & SURFACE LIGHTING      -->
    <!-- ========================================== -->
    {#if activeTab === 'dotprod'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Sun size={18} class="text-warning" /> Dot Product & 3D Shading
            </h3>
            <p class="text-xs text-base-content/70">
              The dot product N⃗ · L⃗ = ||N⃗|| ||L⃗|| cos θ. In 3D graphics (Lambert's law), surface brightness equals max(0, N⃗ · L⃗), making perpendicular light bright and angled light dim.
            </p>
          </div>

          <div>
            <div class="flex justify-between text-xs font-bold mb-1">
              <span>Light Incident Angle ($\theta$):</span>
              <span class="text-warning font-mono">{lightAngleDeg}°</span>
            </div>
            <input type="range" min="0" max="180" step="5" bind:value={lightAngleDeg} class="range range-xs range-warning" />
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono">
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Dot Product (N · L)</span>
              <span class="text-base font-bold text-primary">{dotProdStr}</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">cos({lightAngleDeg}°)</span>
            </div>
            <div class="p-3 bg-base-200 rounded-xl border border-base-300">
              <span class="text-base-content/60 block text-[10px] uppercase">Diffuse Brightness</span>
              <span class="text-base font-bold text-warning">{diffusePercent}%</span>
              <span class="text-[10px] text-base-content/50 block mt-0.5">max(0, N · L)</span>
            </div>
          </div>

          <div class="p-2.5 bg-base-200/80 rounded-xl border border-base-300 text-xs font-mono text-center">
            {dotClassification}
          </div>
        </div>

        <!-- 3D Shading Preview Canvas -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <!-- Surface Plane -->
            <line x1="20" y1="160" x2="220" y2="160" stroke="#64748b" stroke-width="3" />

            <!-- Surface Normal Vector N = (0, 1) -->
            <defs>
              <marker id="arr-norm" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="arr-light" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>
            <line x1="120" y1="160" x2="120" y2="90" stroke="#38bdf8" stroke-width="3" marker-end="url(#arr-norm)" />
            <text x="125" y="85" font-size="11" font-weight="bold" fill="#38bdf8">N</text>

            <!-- Light Ray Vector L -->
            <line x1="120" y1="160" x2={svgLightEndX} y2={160 - lightLy * 70} stroke="#f59e0b" stroke-width="3" marker-end="url(#arr-light)" />
            <text x={svgLightEndX + 5} y={160 - lightLy * 70} font-size="11" font-weight="bold" fill="#f59e0b">L</text>

            <!-- Simulated 3D Sphere Lit by this Angle -->
            <circle
              cx="120"
              cy="195"
              r="24"
              fill={`rgb(${Math.round(245 * diffuseIntensity)}, ${Math.round(158 * diffuseIntensity)}, ${Math.round(11 * diffuseIntensity)})`}
              stroke="#475569"
              stroke-width="1.5"
            />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Sphere below updates diffuse brightness in real time</span>
        </div>
      </div>
    {/if}

    <!-- ========================================== -->
    <!-- TAB 6: 2D UNIT SQUARE TRANSFORMATION       -->
    <!-- ========================================== -->
    {#if activeTab === 'transforms'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Maximize2 size={18} class="text-primary" /> 2D Geometric Transformations
            </h3>
            <p class="text-xs text-base-content/70">
              Transforming points by $(x, y) \to (s_x x + h, s_y y + k)$. Observe how the unit square $(0,0), (1,0), (1,1), (0,1)$ scales, translates, or reflects across axes when factors become negative.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Scale X ($s_x$):</span>
                <span class="text-primary">{scaleX}</span>
              </div>
              <input type="range" min="-3" max="3" step="0.5" bind:value={scaleX} class="range range-xs range-primary" />

              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Scale Y ($s_y$):</span>
                <span class="text-secondary">{scaleY}</span>
              </div>
              <input type="range" min="-3" max="3" step="0.5" bind:value={scaleY} class="range range-xs range-secondary" />
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Translate X ($h$):</span>
                <span class="text-accent">{transX}</span>
              </div>
              <input type="range" min="-3" max="3" step="1" bind:value={transX} class="range range-xs range-accent" />

              <div class="flex justify-between text-xs font-mono font-bold">
                <span>Translate Y ($k$):</span>
                <span class="text-accent">{transY}</span>
              </div>
              <input type="range" min="-3" max="3" step="1" bind:value={transY} class="range range-xs range-accent" />
            </div>
          </div>

          <!-- Classification Badge -->
          <div class="p-3 bg-base-200 rounded-xl border border-base-300 text-xs font-mono">
            <div class="text-base-content/60 text-[10px] uppercase">Transformation Type:</div>
            <strong class="text-primary text-sm">{transfTypeDesc}</strong>
          </div>
        </div>

        <!-- Visual Plot -->
        <div class="flex flex-col items-center justify-center p-3 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- Axes -->
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" stroke-opacity="0.2" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" stroke-opacity="0.2" />

            <!-- Original Unit Square (Dashed Gray) -->
            <polygon points={origSquareSvg} fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />

            <!-- Transformed Polygon -->
            <polygon
              points={transSquareSvg}
              fill="rgba(59, 130, 246, 0.25)"
              stroke="#3b82f6"
              stroke-width="2"
            />

            <!-- Vertex Dots -->
            <circle cx={toSvg(sqV0.x, sqV0.y).split(',')[0]} cy={toSvg(sqV0.x, sqV0.y).split(',')[1]} r="3" fill="#3b82f6" />
            <circle cx={toSvg(sqV1.x, sqV1.y).split(',')[0]} cy={toSvg(sqV1.x, sqV1.y).split(',')[1]} r="3" fill="#3b82f6" />
            <circle cx={toSvg(sqV2.x, sqV2.y).split(',')[0]} cy={toSvg(sqV2.x, sqV2.y).split(',')[1]} r="3" fill="#3b82f6" />
            <circle cx={toSvg(sqV3.x, sqV3.y).split(',')[0]} cy={toSvg(sqV3.x, sqV3.y).split(',')[1]} r="3" fill="#3b82f6" />
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2">Dashed: Original (0,0)-(1,1) | Blue: Transformed shape</span>
        </div>
      </div>
    {/if}

  </div>
</div>
