<script lang="ts">
  import Triangle from '@lucide/svelte/icons/triangle';
  import Compass from '@lucide/svelte/icons/compass';
  import Circle from '@lucide/svelte/icons/circle';
  import ShieldCheck from '@lucide/svelte/icons/shield-check';
  import Activity from '@lucide/svelte/icons/activity';
  import Crosshair from '@lucide/svelte/icons/crosshair';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Eye from '@lucide/svelte/icons/eye';

  type TabType = 'triangle' | 'unitcircle' | 'symmetry' | 'wave' | 'identity_eq' | 'game_fov';
  let activeTab = $state<TabType>('triangle');

  // ==========================================
  // TAB 1: RIGHT TRIANGLE & SOH-CAH-TOA EXPLORER
  // ==========================================
  let triAngleDeg = $state(30);
  let triHyp = $state(10);

  let triRad = $derived((triAngleDeg * Math.PI) / 180);
  let triOpp = $derived(triHyp * Math.sin(triRad));
  let triAdj = $derived(triHyp * Math.cos(triRad));

  let sinRatio = $derived((triOpp / triHyp).toFixed(3));
  let cosRatio = $derived((triAdj / triHyp).toFixed(3));
  let tanRatio = $derived((triOpp / (triAdj || 0.001)).toFixed(3));

  let specialAngleData = $derived.by(() => {
    if (triAngleDeg === 30) return { label: '30° Special Angle', sinExact: '1/2 (0.500)', cosExact: '√3/2 ≈ 0.866', tanExact: '1/√3 ≈ 0.577' };
    if (triAngleDeg === 45) return { label: '45° Special Angle', sinExact: '√2/2 ≈ 0.707', cosExact: '√2/2 ≈ 0.707', tanExact: '1 (1.000)' };
    if (triAngleDeg === 60) return { label: '60° Special Angle', sinExact: '√3/2 ≈ 0.866', cosExact: '1/2 (0.500)', tanExact: '√3 ≈ 1.732' };
    return null;
  });

  // SVG scaling for Triangle
  const triSvgW = 360;
  const triSvgH = 220;
  const triScale = 16;
  const triBaseX = 40;
  const triBaseY = 190;

  // ==========================================
  // TAB 2: INTERACTIVE UNIT CIRCLE
  // ==========================================
  let circleDeg = $state(45);
  let circleRad = $derived((circleDeg * Math.PI) / 180);
  let circleCos = $derived(Math.cos(circleRad));
  let circleSin = $derived(Math.sin(circleRad));
  let circleTan = $derived(Math.abs(circleCos) > 0.0001 ? Math.tan(circleRad).toFixed(3) : 'Undefined');

  let circleQuadrant = $derived.by(() => {
    const d = ((circleDeg % 360) + 360) % 360;
    if (d === 0 || d === 360) return { name: '+X Axis', sign: '(+1, 0)', badge: 'badge-neutral' };
    if (d === 90) return { name: '+Y Axis', sign: '(0, +1)', badge: 'badge-neutral' };
    if (d === 180) return { name: '−X Axis', sign: '(−1, 0)', badge: 'badge-neutral' };
    if (d === 270) return { name: '−Y Axis', sign: '(0, −1)', badge: 'badge-neutral' };
    if (d > 0 && d < 90) return { name: 'Quadrant I', sign: '(+, +) Both Pos', badge: 'badge-success' };
    if (d > 90 && d < 180) return { name: 'Quadrant II', sign: '(−, +) Sin Pos', badge: 'badge-primary' };
    if (d > 180 && d < 270) return { name: 'Quadrant III', sign: '(−, −) Tan Pos', badge: 'badge-warning' };
    return { name: 'Quadrant IV', sign: '(+, −) Cos Pos', badge: 'badge-secondary' };
  });

  const ucR = 100;
  const ucCenter = 130;

  // ==========================================
  // TAB 3: ANGLE SYMMETRY & REFLECTION
  // ==========================================
  let symBaseDeg = $state(35);
  let symMode = $state<'complement' | 'supplement' | 'negative'>('complement');

  let symDerived = $derived.by(() => {
    const thetaRad = (symBaseDeg * Math.PI) / 180;
    const sinT = Math.sin(thetaRad);
    const cosT = Math.cos(thetaRad);

    if (symMode === 'complement') {
      const compDeg = 90 - symBaseDeg;
      const compRad = (compDeg * Math.PI) / 180;
      return {
        modeName: 'Co-function (90° − θ)',
        angle2: compDeg,
        formula: 'sin(90° − θ) = cos(θ) & cos(90° − θ) = sin(θ)',
        sin2: Math.sin(compRad),
        cos2: Math.cos(compRad),
        explanation: 'Flipping across the 45° diagonal exchanges the horizontal and vertical sides.'
      };
    } else if (symMode === 'supplement') {
      const supDeg = 180 - symBaseDeg;
      const supRad = (supDeg * Math.PI) / 180;
      return {
        modeName: 'Supplementary (180° − θ)',
        angle2: supDeg,
        formula: 'sin(180° − θ) = sin(θ) & cos(180° − θ) = −cos(θ)',
        sin2: Math.sin(supRad),
        cos2: Math.cos(supRad),
        explanation: 'Reflecting across the vertical Y-axis preserves height (sin) but negates width (cos).'
      };
    } else {
      const negDeg = -symBaseDeg;
      const negRad = (negDeg * Math.PI) / 180;
      return {
        modeName: 'Negative Angle (−θ)',
        angle2: negDeg,
        formula: 'sin(−θ) = −sin(θ) (Odd) & cos(−θ) = cos(θ) (Even)',
        sin2: Math.sin(negRad),
        cos2: Math.cos(negRad),
        explanation: 'Clockwise rotation reflects across the horizontal X-axis, keeping cos identical but inverting sin.'
      };
    }
  });

  // ==========================================
  // TAB 4: CIRCLE-TO-WAVE UNROLLER (HARMONIC MOTION)
  // ==========================================
  let waveAmp = $state(45);
  let waveFreq = $state(2);
  let wavePhase = $state(0);
  let waveTime = $state(45);

  let waveCurrentY = $derived(
    waveAmp * Math.sin(((waveFreq * waveTime + wavePhase) * Math.PI) / 180)
  );
  let wavePx = $derived(50 + 35 * Math.cos(((waveFreq * waveTime + wavePhase) * Math.PI) / 180));
  let wavePy = $derived(80 - (waveAmp / 60) * 35 * Math.sin(((waveFreq * waveTime + wavePhase) * Math.PI) / 180));

  let waveSvgPath = $derived.by(() => {
    const points: string[] = [];
    for (let x = 0; x <= 240; x += 3) {
      const angle = (x / 240) * 360 * waveFreq + wavePhase;
      const y = 80 - waveAmp * Math.sin((angle * Math.PI) / 180);
      points.push(`${x},${y.toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  });

  // ==========================================
  // TAB 5: TRIG IDENTITIES & EQUATIONS SOLVER
  // ==========================================
  let idAngle = $state(40);
  let idRad = $derived((idAngle * Math.PI) / 180);
  let idSin = $derived(Math.sin(idRad));
  let idCos = $derived(Math.cos(idRad));
  let idSinSq = $derived(idSin * idSin);
  let idCosSq = $derived(idCos * idCos);
  let idSum = $derived((idSinSq + idCosSq).toFixed(5));

  // Equation solver: cos(2x) = cos(x) on [0, 360]
  type EqPreset = 'cos2x' | 'sin2x';
  let eqPreset = $state<EqPreset>('cos2x');

  // ==========================================
  // TAB 6: GAME TURRET AIM & FOV CONE LAB
  // ==========================================
  let targetX = $state(6);
  let targetY = $state(4);
  let fovAngle = $state(45); // half-angle cone in degrees

  let aimDist = $derived(Math.hypot(targetX, targetY).toFixed(2));
  let aimAngleRad = $derived(Math.atan2(targetY, targetX));
  let aimAngleDeg = $derived(((aimAngleRad * 180) / Math.PI).toFixed(1));

  let turretFacingDeg = $state(30); // turret's current orientation
  let angleDelta = $derived.by(() => {
    let diff = Number(aimAngleDeg) - turretFacingDeg;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return Math.abs(diff);
  });

  let isInFov = $derived(angleDelta <= fovAngle);

  let fovStartA = $derived(((turretFacingDeg - fovAngle) * Math.PI) / 180);
  let fovEndA = $derived(((turretFacingDeg + fovAngle) * Math.PI) / 180);
  let fovX1 = $derived(110 * Math.cos(fovStartA));
  let fovY1 = $derived(-110 * Math.sin(fovStartA));
  let fovX2 = $derived(110 * Math.cos(fovEndA));
  let fovY2 = $derived(-110 * Math.sin(fovEndA));
  let barrelX = $derived(25 * Math.cos((turretFacingDeg * Math.PI) / 180));
  let barrelY = $derived(-25 * Math.sin((turretFacingDeg * Math.PI) / 180));
  let tgtSvgX = $derived(targetX * 10);
  let tgtSvgY = $derived(-targetY * 10);
</script>

<div class="week6-studio flex min-h-[640px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">

  <!-- Mobile Dropdown -->
  <div class="flex sm:hidden items-center justify-between gap-2 border-b border-base-200 pb-2 mb-2 shrink-0">
    <span class="badge badge-primary badge-sm font-bold">W6 Studio</span>
    <select class="select select-sm select-bordered font-bold flex-1" bind:value={activeTab}>
      <option value="triangle">1. SOH-CAH-TOA Triangle Explorer</option>
      <option value="unitcircle">2. Dynamic Unit Circle (360°)</option>
      <option value="symmetry">3. Angle Symmetry & Reflection</option>
      <option value="wave">4. Circle-to-Wave Unroller</option>
      <option value="identity_eq">5. Identities & Equation Solver</option>
      <option value="game_fov">6. Turret Aim (atan2) & FOV Cone</option>
    </select>
  </div>

  <!-- Desktop Tabs -->
  <div class="hidden sm:flex flex-wrap items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold tracking-wider uppercase">Week 6 Lab</span>
      <h2 class="text-xl font-black text-base-content sm:text-2xl">Trigonometry & Game Spatial Studio</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl flex flex-wrap gap-1">
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'triangle' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'triangle')}>
        <Triangle size={14} /> SOH-CAH-TOA
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'unitcircle' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'unitcircle')}>
        <Circle size={14} /> Unit Circle
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'symmetry' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'symmetry')}>
        <Compass size={14} /> Symmetries
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'wave' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'wave')}>
        <Activity size={14} /> Wave Unroller
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'identity_eq' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'identity_eq')}>
        <ShieldCheck size={14} /> Identity & Eq
      </button>
      <button class={`tab tab-xs md:tab-sm font-bold gap-1 transition-all ${activeTab === 'game_fov' ? 'tab-active !bg-primary !text-primary-content shadow-sm' : ''}`} onclick={() => (activeTab = 'game_fov')}>
        <Crosshair size={14} /> Aim & FOV
      </button>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="flex-1 overflow-y-auto py-3 px-1">

    <!-- ============================================================== -->
    <!-- LAB 1: RIGHT TRIANGLE & SOH-CAH-TOA EXPLORER -->
    <!-- ============================================================== -->
    {#if activeTab === 'triangle'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <span class="text-xs font-black uppercase tracking-wider text-primary">Interactive Right Triangle</span>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Angle θ: {triAngleDeg}°</span>
                <span class="text-base-content/60 font-mono">{(triRad).toFixed(2)} rad</span>
              </div>
              <input type="range" min="5" max="85" bind:value={triAngleDeg} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Hypotenuse c = {triHyp}</span>
              </div>
              <input type="range" min="5" max="15" bind:value={triHyp} class="range range-xs range-secondary" />
            </div>

            <!-- Quick-Snap Special Angles -->
            <div class="pt-2 border-t border-base-300 space-y-2">
              <span class="text-[11px] font-bold uppercase text-base-content/70">Snap To Special Angles</span>
              <div class="grid grid-cols-3 gap-1.5">
                <button class={`btn btn-xs ${triAngleDeg === 30 ? 'btn-primary' : 'btn-outline'}`} onclick={() => (triAngleDeg = 30)}>30° (π/6)</button>
                <button class={`btn btn-xs ${triAngleDeg === 45 ? 'btn-primary' : 'btn-outline'}`} onclick={() => (triAngleDeg = 45)}>45° (π/4)</button>
                <button class={`btn btn-xs ${triAngleDeg === 60 ? 'btn-primary' : 'btn-outline'}`} onclick={() => (triAngleDeg = 60)}>60° (π/3)</button>
              </div>
            </div>

            <!-- Special Angle exact box -->
            {#if specialAngleData}
              <div class="p-3 bg-primary/10 border border-primary/20 rounded-xl space-y-1 text-xs">
                <span class="font-bold text-primary">{specialAngleData.label}</span>
                <div class="grid grid-cols-3 gap-1 font-mono text-[11px] mt-1">
                  <div>sin = {specialAngleData.sinExact}</div>
                  <div>cos = {specialAngleData.cosExact}</div>
                  <div>tan = {specialAngleData.tanExact}</div>
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- SVG Visualizer -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between text-xs font-bold">
            <span class="text-primary font-mono">Opposite a = {triOpp.toFixed(2)}</span>
            <span class="text-secondary font-mono">Adjacent b = {triAdj.toFixed(2)}</span>
            <span class="text-accent font-mono">Hypotenuse c = {triHyp}</span>
          </div>

          <!-- Dynamic SVG Triangle -->
          <div class="relative w-full aspect-[16/10] max-h-[260px] my-2 bg-base-200/40 rounded-xl border border-base-300 flex items-center justify-center p-2">
            <svg viewBox={`0 0 ${triSvgW} ${triSvgH}`} class="w-full h-full">
              <!-- Right triangle polygon -->
              <polygon
                points={`${triBaseX},${triBaseY} ${triBaseX + triAdj * triScale},${triBaseY} ${triBaseX + triAdj * triScale},${triBaseY - triOpp * triScale}`}
                fill="currentColor"
                fill-opacity="0.06"
                stroke="#3b82f6"
                stroke-width="2.5"
                stroke-linejoin="round"
              />

              <!-- Right angle symbol -->
              <path
                d={`M ${triBaseX + triAdj * triScale - 14},${triBaseY} L ${triBaseX + triAdj * triScale - 14},${triBaseY - 14} L ${triBaseX + triAdj * triScale},${triBaseY - 14}`}
                fill="none"
                stroke="currentColor"
                stroke-opacity="0.5"
                stroke-width="1.5"
              />

              <!-- Angle Arc for theta -->
              <path
                d={`M ${triBaseX + 28},${triBaseY} A 28 28 0 0 0 ${triBaseX + 28 * Math.cos(triRad)},${triBaseY - 28 * Math.sin(triRad)}`}
                fill="none"
                stroke="#f59e0b"
                stroke-width="2"
              />
              <text x={triBaseX + 34} y={triBaseY - 8} font-size="11" font-weight="bold" fill="#f59e0b">θ</text>

              <!-- Side Labels -->
              <text x={triBaseX + (triAdj * triScale) / 2} y={triBaseY + 16} font-size="11" font-weight="bold" fill="#6366f1" text-anchor="middle">
                Adj b = {triAdj.toFixed(1)}
              </text>
              <text x={triBaseX + triAdj * triScale + 10} y={triBaseY - (triOpp * triScale) / 2} font-size="11" font-weight="bold" fill="#10b981" text-anchor="start">
                Opp a = {triOpp.toFixed(1)}
              </text>
              <text
                x={triBaseX + (triAdj * triScale) / 2 - 10}
                y={triBaseY - (triOpp * triScale) / 2 - 8}
                font-size="11"
                font-weight="bold"
                fill="#f43f5e"
                text-anchor="middle"
              >
                Hyp c = {triHyp}
              </text>
            </svg>
          </div>

          <!-- SOH CAH TOA Cards -->
          <div class="w-full grid grid-cols-3 gap-2 text-center text-xs">
            <div class="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span class="block font-black text-emerald-500">SOH: sin θ</span>
              <span class="font-mono text-sm font-bold text-base-content">{sinRatio}</span>
              <span class="text-[10px] text-base-content/60 block">Opp / Hyp</span>
            </div>
            <div class="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <span class="block font-black text-indigo-500">CAH: cos θ</span>
              <span class="font-mono text-sm font-bold text-base-content">{cosRatio}</span>
              <span class="text-[10px] text-base-content/60 block">Adj / Hyp</span>
            </div>
            <div class="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span class="block font-black text-amber-500">TOA: tan θ</span>
              <span class="font-mono text-sm font-bold text-base-content">{tanRatio}</span>
              <span class="text-[10px] text-base-content/60 block">Opp / Adj</span>
            </div>
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 2: DYNAMIC UNIT CIRCLE -->
    <!-- ============================================================== -->
    {:else if activeTab === 'unitcircle'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">360° Unit Circle Explorer</span>
              <span class={`badge ${circleQuadrant.badge} font-bold text-xs`}>{circleQuadrant.name}</span>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Angle θ: {circleDeg}°</span>
                <span class="font-mono text-primary font-bold">{circleRad.toFixed(2)} rad</span>
              </div>
              <input type="range" min="0" max="360" bind:value={circleDeg} class="range range-xs range-primary" />
              <div class="flex justify-between text-[10px] text-base-content/50 font-mono">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </div>
            </div>

            <!-- Coordinate readouts -->
            <div class="p-3.5 bg-base-100 rounded-xl border border-base-300 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="font-bold text-base-content/70">Point P(x, y) on Circle:</span>
                <span class="font-mono font-black text-sm text-primary">({circleCos.toFixed(3)}, {circleSin.toFixed(3)})</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 border-t border-base-200">
                <div class="text-blue-500 font-bold">x = cos θ = {circleCos.toFixed(3)}</div>
                <div class="text-emerald-500 font-bold">y = sin θ = {circleSin.toFixed(3)}</div>
              </div>
              <div class="text-amber-500 font-mono text-[11px] font-bold">
                tan θ = y/x = {circleTan}
              </div>
            </div>

            <p class="text-[11px] text-base-content/70 leading-relaxed">
              On the unit circle (radius r = 1), cosine is the <strong>horizontal width</strong> and sine is the <strong>vertical height</strong>. In game physics, setting velocity to <code>(speed · cos θ, speed · sin θ)</code> moves an entity in direction θ!
            </p>
          </div>
        </div>

        <!-- SVG Unit Circle Visualizer -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between text-xs font-bold px-1">
            <span class="text-base-content/50">Radius r = 1.0</span>
            <span class="font-mono text-primary">Signs: {circleQuadrant.sign}</span>
          </div>

          <!-- Dynamic SVG Circle with Projections -->
          <div class="relative w-full aspect-square max-w-[280px] my-2 bg-base-200/30 rounded-full border border-base-300 flex items-center justify-center">
            <svg viewBox="0 0 260 260" class="w-full h-full">
              <!-- Grid axes -->
              <line x1="20" y1={ucCenter} x2="240" y2={ucCenter} stroke="currentColor" stroke-opacity="0.25" stroke-width="1.5" />
              <line x1={ucCenter} y1="20" x2={ucCenter} y2="240" stroke="currentColor" stroke-opacity="0.25" stroke-width="1.5" />

              <!-- Unit Circle Outline -->
              <circle cx={ucCenter} cy={ucCenter} r={ucR} fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />

              <!-- Projections: Horizontal cos projection -->
              <line
                x1={ucCenter}
                y1={ucCenter - circleSin * ucR}
                x2={ucCenter + circleCos * ucR}
                y2={ucCenter - circleSin * ucR}
                stroke="#10b981"
                stroke-dasharray="3,3"
                stroke-width="2"
              />
              <!-- Vertical sin projection -->
              <line
                x1={ucCenter + circleCos * ucR}
                y1={ucCenter}
                x2={ucCenter + circleCos * ucR}
                y2={ucCenter - circleSin * ucR}
                stroke="#3b82f6"
                stroke-dasharray="3,3"
                stroke-width="2"
              />

              <!-- Highlighted Cos bar on X axis -->
              <line
                x1={ucCenter}
                y1={ucCenter}
                x2={ucCenter + circleCos * ucR}
                y2={ucCenter}
                stroke="#3b82f6"
                stroke-width="3.5"
                stroke-linecap="round"
              />
              <!-- Highlighted Sin bar on Y axis -->
              <line
                x1={ucCenter}
                y1={ucCenter}
                x2={ucCenter}
                y2={ucCenter - circleSin * ucR}
                stroke="#10b981"
                stroke-width="3.5"
                stroke-linecap="round"
              />

              <!-- Radius vector -->
              <line
                x1={ucCenter}
                y1={ucCenter}
                x2={ucCenter + circleCos * ucR}
                y2={ucCenter - circleSin * ucR}
                stroke="#f59e0b"
                stroke-width="2.5"
              />

              <!-- Point P -->
              <circle
                cx={ucCenter + circleCos * ucR}
                cy={ucCenter - circleSin * ucR}
                r="6"
                fill="#ef4444"
                stroke="#fff"
                stroke-width="2"
              />
            </svg>
          </div>

          <!-- Color Key -->
          <div class="w-full flex items-center justify-between text-[11px] font-bold px-2">
            <span class="text-blue-500">■ cos θ (X projection)</span>
            <span class="text-emerald-500">■ sin θ (Y projection)</span>
            <span class="text-amber-500">■ Radius Vector (1.0)</span>
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 3: ANGLE SYMMETRY & REFLECTION -->
    <!-- ============================================================== -->
    {:else if activeTab === 'symmetry'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <span class="text-xs font-black uppercase tracking-wider text-primary">Symmetry & Quadrant Reflections</span>

            <div class="grid grid-cols-1 gap-1.5">
              <button class={`btn btn-xs justify-start ${symMode === 'complement' ? 'btn-primary' : 'btn-outline'}`} onclick={() => (symMode = 'complement')}>
                1. Complementary: (90° − θ)
              </button>
              <button class={`btn btn-xs justify-start ${symMode === 'supplement' ? 'btn-primary' : 'btn-outline'}`} onclick={() => (symMode = 'supplement')}>
                2. Supplementary: (180° − θ)
              </button>
              <button class={`btn btn-xs justify-start ${symMode === 'negative' ? 'btn-primary' : 'btn-outline'}`} onclick={() => (symMode = 'negative')}>
                3. Negative Angle: (−θ)
              </button>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Base Angle θ: {symBaseDeg}°</span>
              </div>
              <input type="range" min="10" max="80" bind:value={symBaseDeg} class="range range-xs range-primary" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 space-y-2 text-xs">
              <span class="font-bold text-primary">{symDerived.modeName}</span>
              <p class="font-mono text-base-content font-bold text-[11px]">{symDerived.formula}</p>
              <p class="text-base-content/70 text-[11px] leading-relaxed">{symDerived.explanation}</p>
            </div>
          </div>
        </div>

        <!-- Symmetry Display -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <span class="text-xs font-black text-base-content/50 uppercase">Visual Comparison of θ vs {symDerived.angle2}°</span>

          <div class="w-full grid grid-cols-2 gap-3 my-auto max-w-md">
            <!-- Angle 1 -->
            <div class="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-center space-y-1">
              <span class="badge badge-primary badge-sm font-bold">Base Angle θ = {symBaseDeg}°</span>
              <div class="font-mono text-xs pt-2 space-y-1">
                <div>cos({symBaseDeg}°) = <strong class="text-primary">{Math.cos((symBaseDeg * Math.PI) / 180).toFixed(3)}</strong></div>
                <div>sin({symBaseDeg}°) = <strong class="text-primary">{Math.sin((symBaseDeg * Math.PI) / 180).toFixed(3)}</strong></div>
              </div>
            </div>

            <!-- Angle 2 -->
            <div class="p-4 bg-secondary/10 border border-secondary/20 rounded-2xl text-center space-y-1">
              <span class="badge badge-secondary badge-sm font-bold">Transformed = {symDerived.angle2}°</span>
              <div class="font-mono text-xs pt-2 space-y-1">
                <div>cos({symDerived.angle2}°) = <strong class="text-secondary">{symDerived.cos2.toFixed(3)}</strong></div>
                <div>sin({symDerived.angle2}°) = <strong class="text-secondary">{symDerived.sin2.toFixed(3)}</strong></div>
              </div>
            </div>
          </div>

          <div class="w-full text-center text-xs font-mono text-base-content/60 p-2 bg-base-200/50 rounded-xl">
            {symDerived.formula}
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 4: CIRCLE-TO-WAVE UNROLLER -->
    <!-- ============================================================== -->
    {:else if activeTab === 'wave'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Sliders -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-3.5">
            <span class="text-xs font-black uppercase tracking-wider text-primary">y = A · sin(B · x + C)</span>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Amplitude A: {waveAmp} px</span>
              </div>
              <input type="range" min="15" max="60" bind:value={waveAmp} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Frequency Multiplier B: {waveFreq}×</span>
              </div>
              <input type="range" min="1" max="4" bind:value={waveFreq} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Time / Phase Scrub: {waveTime}°</span>
              </div>
              <input type="range" min="0" max="360" bind:value={waveTime} class="range range-xs" />
            </div>

            <div class="p-3 bg-base-100 rounded-xl border border-base-300 text-xs space-y-1">
              <span class="font-bold text-primary">Game Design Application:</span>
              <p class="text-base-content/70 leading-relaxed">
                Harmonic waves drive idle hovering animations, weapon recoil recovery, and smooth camera bobbing without rigid linear snaps!
              </p>
            </div>
          </div>
        </div>

        <!-- Wave Unroller Visualizer -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between text-xs font-bold px-1">
            <span class="text-primary font-mono">Current Amplitude Offset: {waveCurrentY.toFixed(1)} px</span>
            <span class="badge badge-success font-bold font-mono">Sprite In Motion</span>
          </div>

          <!-- SVG Circle + Wave Unroller -->
          <div class="relative w-full aspect-[16/9] max-h-[260px] my-2 bg-base-200/30 rounded-xl border border-base-300 flex items-center justify-center p-2">
            <svg viewBox="0 0 360 160" class="w-full h-full">
              <!-- Centerline -->
              <line x1="0" y1="80" x2="360" y2="80" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" />

              <!-- Wave Path -->
              <path d={waveSvgPath} transform="translate(100, 0)" fill="none" stroke="#3b82f6" stroke-width="2.5" />

              <!-- Left Phasor Circle -->
              <circle cx="50" cy="80" r="35" fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.5" />
              <!-- Phasor arm -->
              <line x1="50" y1="80" x2={wavePx} y2={wavePy} stroke="#f59e0b" stroke-width="2" />
              <circle cx={wavePx} cy={wavePy} r="4" fill="#ef4444" />

              <!-- Tracer line to wave point -->
              <line x1={wavePx} y1={wavePy} x2="100" y2={80 - waveCurrentY} stroke="#ef4444" stroke-dasharray="3,3" stroke-width="1.5" />

              <!-- Animated Bobbing Game Sprite (Coin) -->
              <g transform={`translate(20, ${80 - waveCurrentY})`}>
                <circle cx="0" cy="0" r="10" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
                <text x="0" y="3.5" font-size="9" font-weight="black" text-anchor="middle" fill="#78350f">★</text>
              </g>
            </svg>
          </div>

          <div class="w-full flex justify-between items-center text-xs text-base-content/60 px-2 font-mono">
            <span>Rotating Wheel (Phasor)</span>
            <span>Tracer ⟹ Wave Stream</span>
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 5: TRIG IDENTITIES & EQUATIONS SOLVER -->
    <!-- ============================================================== -->
    {:else if activeTab === 'identity_eq'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls & Problem selector -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <span class="text-xs font-black uppercase tracking-wider text-primary">Identity & Equation Lab</span>

            <!-- Identity Slider -->
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span>Angle θ: {idAngle}°</span>
                <span class="font-mono text-primary font-bold">sin²θ + cos²θ = {idSum}</span>
              </div>
              <input type="range" min="0" max="360" bind:value={idAngle} class="range range-xs range-primary" />
            </div>

            <!-- Double Angle Worksheet Problem -->
            <div class="p-3.5 bg-base-100 rounded-xl border border-base-300 space-y-2 text-xs">
              <span class="font-bold text-secondary uppercase text-[10px]">Worksheet 06 Equation:</span>
              <p class="font-mono text-sm font-bold text-base-content">cos(2θ) = cos(θ) for θ ∈ [0°, 360°]</p>
              <div class="space-y-1 font-mono text-[11px] text-base-content/80 leading-relaxed">
                <div>1. Substitute identity: 2cos²(θ) − 1 = cos(θ)</div>
                <div>2. Quadratic form (u = cos θ): 2u² − u − 1 = 0</div>
                <div>3. Factoring: (2u + 1)(u − 1) = 0 ⟹ u = 1 or u = −1/2</div>
                <div>4. Solutions: θ = 0°, 120°, 240°, 360°</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Graphic Area -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <span class="text-xs uppercase font-black text-base-content/50">Pythagorean Unit Circle Proof</span>

          <!-- Visual Bar Sum -->
          <div class="w-full max-w-md my-auto space-y-4">
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-mono font-bold">
                <span class="text-blue-500">cos²({idAngle}°) = {idCosSq.toFixed(3)}</span>
                <span class="text-emerald-500">sin²({idAngle}°) = {idSinSq.toFixed(3)}</span>
              </div>
              <div class="w-full h-8 bg-base-200 rounded-xl overflow-hidden border border-base-300 flex">
                <div class="bg-blue-500 h-full transition-all duration-150 flex items-center justify-center text-white text-xs font-bold font-mono" style={`width: ${idCosSq * 100}%`}>
                  {idCosSq > 0.15 ? 'cos²θ' : ''}
                </div>
                <div class="bg-emerald-500 h-full transition-all duration-150 flex items-center justify-center text-white text-xs font-bold font-mono" style={`width: ${idSinSq * 100}%`}>
                  {idSinSq > 0.15 ? 'sin²θ' : ''}
                </div>
              </div>
              <div class="text-center font-mono font-bold text-xs text-base-content/70">
                Sum: {idCosSq.toFixed(3)} + {idSinSq.toFixed(3)} = <span class="text-primary text-sm font-black">1.000</span>
              </div>
            </div>

            <!-- Double Angle Intersection Summary Card -->
            <div class="p-3.5 bg-secondary/10 border border-secondary/30 rounded-xl text-center space-y-1">
              <span class="text-xs font-bold uppercase text-secondary">Worksheet 06 Solutions for cos(2θ) = cos(θ)</span>
              <div class="flex justify-center gap-2 pt-1">
                <span class="badge badge-secondary font-mono font-bold">0°</span>
                <span class="badge badge-secondary font-mono font-bold">120°</span>
                <span class="badge badge-secondary font-mono font-bold">240°</span>
                <span class="badge badge-secondary font-mono font-bold">360°</span>
              </div>
            </div>
          </div>

          <div class="w-full text-center text-xs font-mono text-base-content/50">
            cos(2θ) = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ
          </div>
        </div>
      </div>

    <!-- ============================================================== -->
    <!-- LAB 6: GAME TURRET AIM (atan2) & FOV CONE LAB -->
    <!-- ============================================================== -->
    {:else if activeTab === 'game_fov'}
      <div class="grid md:grid-cols-12 gap-5 h-full">
        <!-- Controls -->
        <div class="md:col-span-5 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-5 space-y-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-primary">Turret Aim & FOV Cone</span>
              <span class={`badge ${isInFov ? 'badge-error animate-pulse font-bold' : 'badge-success font-bold'} text-xs`}>
                {isInFov ? 'TARGET DETECTED!' : 'STEALTH: OUT OF FOV'}
              </span>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Target Coordinate X: {targetX}</span>
              </div>
              <input type="range" min="-10" max="10" bind:value={targetX} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Target Coordinate Y: {targetY}</span>
              </div>
              <input type="range" min="-10" max="10" bind:value={targetY} class="range range-xs range-primary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Turret Facing Orientation: {turretFacingDeg}°</span>
              </div>
              <input type="range" min="-180" max="180" bind:value={turretFacingDeg} class="range range-xs range-secondary" />
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span>Vision Cone FOV: ±{fovAngle}°</span>
              </div>
              <input type="range" min="15" max="90" bind:value={fovAngle} class="range range-xs" />
            </div>
          </div>
        </div>

        <!-- 2D Radar Canvas -->
        <div class="md:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 shadow-inner">
          <div class="w-full flex items-center justify-between text-xs font-mono font-bold px-1">
            <span>atan2(Δy, Δx) = <strong class="text-primary">{aimAngleDeg}°</strong></span>
            <span>Distance: <strong class="text-secondary">{aimDist} m</strong></span>
          </div>

          <!-- Radar SVG Plot -->
          <div class="relative w-full aspect-square max-w-[260px] my-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <svg viewBox="-120 -120 240 240" class="w-full h-full">
              <!-- Radar range rings -->
              <circle cx="0" cy="0" r="40" fill="none" stroke="#334155" stroke-dasharray="2,2" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="#334155" stroke-dasharray="2,2" />
              <circle cx="0" cy="0" r="110" fill="none" stroke="#334155" />

              <!-- Crosshairs -->
              <line x1="-120" y1="0" x2="120" y2="0" stroke="#1e293b" />
              <line x1="0" y1="-120" x2="0" y2="120" stroke="#1e293b" />

              <!-- Vision Cone Wedge -->
              <path
                d={`M 0,0 L ${fovX1},${fovY1} A 110 110 0 0 0 ${fovX2},${fovY2} Z`}
                fill={isInFov ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.15)'}
                stroke={isInFov ? '#ef4444' : '#10b981'}
                stroke-width="1.5"
              />

              <!-- Turret Base & Barrel -->
              <line x1="0" y1="0" x2={barrelX} y2={barrelY} stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
              <circle cx="0" cy="0" r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

              <!-- Enemy Target -->
              <circle cx={tgtSvgX} cy={tgtSvgY} r="7" fill={isInFov ? '#ef4444' : '#94a3b8'} stroke="#fff" stroke-width="2" />
              <line x1="0" y1="0" x2={tgtSvgX} y2={tgtSvgY} stroke={isInFov ? '#ef4444' : '#64748b'} stroke-dasharray="3,3" stroke-width="1.5" />
            </svg>
          </div>

          <div class="w-full text-center text-xs font-mono text-base-content/60">
            Angular Difference: {angleDelta.toFixed(1)}° (Threshold: ±{fovAngle}°)
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>
