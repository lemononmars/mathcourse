<script lang="ts">
  import katex from 'katex';
  import Plane from './Lecture12ComplexPlane.svelte';
  import { calculate, cis, magnitude, argument, power, roots, numberText as f, complexText, type Complex, type ComplexOperation } from '$lib/lecture12';
  let { mode }: { mode: 'arith' | 'polar' | 'roots' } = $props();
  const blue = '#2563eb', teal = '#0d9488', red = '#e11d48';
  const math = (source: string) => katex.renderToString(source, { throwOnError: false, displayMode: true });
  const numberValid = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= 1000;
  const argText = (z: Complex) => argument(z) === null ? 'undefined' : `${f(argument(z)!)}°`;
  let ar = $state<number | undefined>(Math.sqrt(3)), ai = $state<number | undefined>(1);
  let br = $state<number | undefined>(1), bi = $state<number | undefined>(1);
  let op = $state<ComplexOperation>('mul');
  const inputsValid = $derived((op === 'conj' ? [ar, ai] : [ar, ai, br, bi]).every(numberValid));
  const a = $derived({ re: ar ?? 0, im: ai ?? 0 }), b = $derived({ re: br ?? 0, im: bi ?? 0 });
  const result = $derived(inputsValid ? calculate(a, b, op) : null);
  const points = $derived(result ? [
    { ...a, label: 'z₁', color: blue },
    ...(op === 'conj' ? [] : [{ ...b, label: 'z₂', color: teal }]),
    { ...result, label: 'w', color: red, dashed: true }
  ] : []);
  const segments = $derived(result && op === 'add' ? [{ from: a, to: result, color: teal }, { from: b, to: result, color: blue }] : result && op === 'sub' ? [{ from: b, to: a, color: red }] : []);
  const angles = $derived.by(() => {
    if (!result || !['mul', 'div'].includes(op)) return [];
    const aa = argument(a), ab = argument(b);
    if (aa === null || ab === null) return [];
    return [{ degrees: aa, label: 'θ₁', color: blue }, { degrees: ab, label: 'θ₂', color: teal }, { degrees: op === 'mul' ? aa + ab : aa - ab, label: op === 'mul' ? 'θ₁+θ₂' : 'θ₁−θ₂', color: red }];
  });
  const operationLabel = $derived(({ add: 'z₁ + z₂', sub: 'z₁ − z₂', mul: 'z₁ × z₂', div: 'z₁ / z₂', conj: 'conjugate of z₁' })[op]);
  function arithmeticPreset(kind: 'angles' | 'vectors' | 'division' | 'zero') {
    if (kind === 'angles') { ar = Math.sqrt(3); ai = 1; br = 1; bi = 1; op = 'mul'; }
    if (kind === 'vectors') { ar = 2; ai = 1; br = 1; bi = 2; op = 'add'; }
    if (kind === 'division') { ar = 3; ai = -1; br = 1; bi = 1; op = 'div'; }
    if (kind === 'zero') { br = 0; bi = 0; op = 'div'; }
  }

  let entry = $state<'cis' | 'rect'>('cis');
  let radius = $state<number | undefined>(2), theta = $state<number | undefined>(30);
  let rectRe = $state<number | undefined>(-3), rectIm = $state<number | undefined>(3);
  let exponent = $state(3);
  const polarValid = $derived(entry === 'cis' ? numberValid(radius) && radius >= 0 && numberValid(theta) && theta >= -180 && theta <= 360 : numberValid(rectRe) && numberValid(rectIm));
  const z = $derived(entry === 'cis' ? cis(radius ?? 0, theta ?? 0) : { re: rectRe ?? 0, im: rectIm ?? 0 });
  const length = $derived(magnitude(z)), direction = $derived(argument(z));
  const zPower = $derived(power(z, exponent));
  const polarPoints = $derived(polarValid ? [{ ...z, label: 'z', color: blue }, { ...zPower, label: `z^${exponent}`, color: red, dashed: true }] : []);
  const cisFormula = $derived(polarValid ? math(`z=${f(z.re)}${z.im < 0 ? '-' : '+'}${f(Math.abs(z.im))}i=${f(length)}\\operatorname{cis}(${f(direction ?? 0)}^\\circ)`) : '');

  let rootRe = $state<number | undefined>(8), rootIm = $state<number | undefined>(0), degree = $state(3);
  const rootValid = $derived(numberValid(rootRe) && numberValid(rootIm));
  const target = $derived({ re: rootRe ?? 0, im: rootIm ?? 0 });
  const rootList = $derived(rootValid ? roots(target, degree) : []);
  const rootRadius = $derived(magnitude(target) ** (1 / degree));
  const rootPoints = $derived(rootList.map((point, i) => ({ ...point, label: `k=${i}`, color: i === 0 ? blue : teal })));
  const rootFormula = $derived(math(`w_k=${f(rootRadius)}\\operatorname{cis}\\left(\\frac{${f(argument(target) ?? 0)}^\\circ+360^\\circ k}{${degree}}\\right)`));
  function rootPreset(re: number, im: number, n: number) { rootRe = re; rootIm = im; degree = n; }
</script>

<section class="space-y-5">
  <div><h3 class="text-2xl font-black">{mode === 'arith' ? 'Complex numbers are vectors—and rotations' : mode === 'polar' ? 'Rectangular ↔ cis, with angles in degrees' : 'Find every n-th root'}</h3><p class="mt-1 text-sm text-base-content/70">{mode === 'arith' ? 'Enter two complex numbers and follow their result on an automatically scaled plane.' : mode === 'polar' ? 'Change a length and angle or enter real and imaginary parts. Raise the result to a power.' : 'Enter any complex number. Its roots have equal lengths and evenly spaced arguments.'}</p></div>
  {#if mode === 'arith'}
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <label class="block text-sm font-bold">Operation<select class="select select-bordered mt-2 w-full" bind:value={op}><option value="add">Addition · z₁ + z₂</option><option value="sub">Subtraction · z₁ − z₂</option><option value="mul">Multiplication · z₁ × z₂</option><option value="div">Division · z₁ / z₂</option><option value="conj">Conjugate · z̄₁</option></select></label>
        <div class="grid grid-cols-2 gap-3"><fieldset class="space-y-2"><legend class="font-bold text-blue-600">z₁ = a + bi</legend><label class="block text-sm">Real a<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={ar} /></label><label class="block text-sm">Imaginary b<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={ai} /></label></fieldset><fieldset class="space-y-2" disabled={op === 'conj'}><legend class="font-bold text-teal-600">z₂ = c + di</legend><label class="block text-sm">Real c<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={br} /></label><label class="block text-sm">Imaginary d<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={bi} /></label></fieldset></div>
        <div class="flex flex-wrap gap-2"><button class="btn btn-xs btn-outline" onclick={() => arithmeticPreset('angles')}>Lecture: 30° × 45°</button><button class="btn btn-xs btn-outline" onclick={() => arithmeticPreset('vectors')}>Vector addition</button><button class="btn btn-xs btn-outline" onclick={() => arithmeticPreset('division')}>Division example</button><button class="btn btn-xs btn-outline" onclick={() => arithmeticPreset('zero')}>Try dividing by zero</button></div>
        <div class="rounded-xl bg-base-100 p-4" aria-live="polite">
          {#if !inputsValid}<p role="alert">Enter finite numbers between −1000 and 1000 in the active component fields.</p>
          {:else if !result}<p role="alert">{op === 'div' && b.re === 0 && b.im === 0 ? 'Division by zero is undefined. Choose a nonzero z₂.' : 'The result is too large to display. Try smaller values.'}</p>
          {:else}<p class="text-sm text-base-content/60">w = {operationLabel}</p><p class="mt-1 break-words font-mono text-xl font-black text-rose-600">{complexText(result)}</p><p class="mt-2 text-sm">|w| = {f(magnitude(result))} · arg(w) = {argText(result)}</p>{/if}
        </div>
        <p class="text-sm">{op === 'add' ? 'Add real parts and imaginary parts separately. The dashed sides complete the vector parallelogram.' : op === 'sub' ? 'Subtract corresponding parts. The dashed arrow from z₂ to z₁ is the same displacement as the result vector w.' : op === 'conj' ? 'Keep the real part and reverse the imaginary part: reflection across the real axis.' : op === 'mul' ? 'Multiply lengths and add arguments. The three arcs show θ₁, θ₂, and their sum.' : 'Divide lengths and subtract arguments. The denominator must be nonzero.'}</p>
        {#if result && (op === 'mul' || op === 'div')}<div class="rounded-xl bg-base-100 p-3 text-sm"><p>θ₁ = {argText(a)} · θ₂ = {argText(b)}</p>{#if argument(a) !== null && argument(b) !== null}<p class="mt-1">θ₁ {op === 'mul' ? '+' : '−'} θ₂ = {f(op === 'mul' ? argument(a)! + argument(b)! : argument(a)! - argument(b)!)}°; principal result angle = {argText(result)}. Angles differing by 360° give the same direction.</p>{:else}<p>Zero has no defined argument, so angle arcs are omitted.</p>{/if}</div>{/if}
      </div>
      <div>{#if result}<Plane {points} {segments} {angles} />{:else}<div class="flex min-h-80 items-center justify-center rounded-2xl border border-base-300 p-5 text-center text-base-content/60">A valid result will appear here.</div>{/if}</div>
    </div>
  {:else if mode === 'polar'}
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <div class="flex flex-wrap gap-2"><button class={`btn btn-sm ${entry === 'cis' ? 'btn-primary' : 'btn-outline'}`} aria-pressed={entry === 'cis'} onclick={() => entry = 'cis'}>Enter cis form</button><button class={`btn btn-sm ${entry === 'rect' ? 'btn-primary' : 'btn-outline'}`} aria-pressed={entry === 'rect'} onclick={() => entry = 'rect'}>Enter rectangular form</button></div>
        {#if entry === 'cis'}
          <div class="grid grid-cols-2 gap-3"><label class="text-sm font-bold">Length r<input class="input input-bordered mt-1 w-full" type="number" step="any" min="0" max="1000" bind:value={radius} /></label><label class="text-sm font-bold">Angle θ (degrees)<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-180" max="360" bind:value={theta} /></label></div>
          <label class="block text-sm">Rotate θ: {theta ?? '—'}°<input class="range range-primary mt-2 w-full" type="range" min="-180" max="360" step="1" bind:value={theta} /></label>
        {:else}<div class="grid grid-cols-2 gap-3"><label class="text-sm font-bold">Real part<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={rectRe} /></label><label class="text-sm font-bold">Imaginary part<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={rectIm} /></label></div>{/if}
        {#if polarValid}
          <div class="overflow-x-auto rounded-xl bg-base-100 p-2" aria-live="polite">{#if length === 0}<p class="p-2 text-sm">z = 0. Its modulus is 0 and its argument is undefined.</p>{:else}{@html cisFormula}{/if}</div>
          <label class="block text-sm font-bold">Power n = {exponent}<input class="range range-secondary mt-2 w-full" type="range" min="1" max="8" step="1" bind:value={exponent} /></label>
          <div class="rounded-xl bg-base-100 p-3 text-sm" aria-live="polite"><p class="font-black">z^{exponent} = {complexText(zPower)}</p>{#if length > 0}<p class="mt-2">Length: {f(length)}^{exponent} = {f(magnitude(zPower))}</p><p>Angle: {exponent} × {f(direction!)}° = {f(exponent * direction!)}° ≡ {argText(zPower)}</p>{/if}</div>
        {:else}<p role="alert">Use finite values: length 0–1000, angle −180°–360°, and rectangular components −1000–1000.</p>{/if}
        <p class="text-sm">cis θ = cos θ + i sin θ. For conversion back from rectangular form, use the quadrant to select the angle. All displayed angles are degrees.</p>
      </div>
      <div>{#if polarValid}<Plane points={polarPoints} angles={direction === null ? [] : [{ degrees: entry === 'cis' ? theta! : direction, label: 'θ', color: blue }]} />{/if}</div>
    </div>
  {:else}
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="lab-panel space-y-4">
        <div class="grid grid-cols-2 gap-3"><label class="text-sm font-bold">Target real part<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={rootRe} /></label><label class="text-sm font-bold">Target imaginary part<input class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={rootIm} /></label></div>
        <label class="block text-sm font-bold">Root degree n = {degree}<input class="range range-primary mt-2 w-full" type="range" min="2" max="12" step="1" bind:value={degree} /></label>
        <div class="flex flex-wrap gap-2"><button class="btn btn-xs btn-outline" onclick={() => rootPreset(1,0,6)}>Six roots of unity</button><button class="btn btn-xs btn-outline" onclick={() => rootPreset(8,0,3)}>Cube roots of 8</button><button class="btn btn-xs btn-outline" onclick={() => rootPreset(-81,0,4)}>Fourth roots of −81</button><button class="btn btn-xs btn-outline" onclick={() => rootPreset(0,16,4)}>Worksheet: roots of 16i</button><button class="btn btn-xs btn-outline" onclick={() => rootPreset(0,0,degree)}>Zero</button></div>
        {#if rootValid}
          {#if magnitude(target) === 0}<p class="rounded-xl bg-base-100 p-3 text-sm" aria-live="polite">Zero has one distinct n-th root: 0 (with multiplicity n). Its argument is undefined.</p>{:else}<div class="overflow-x-auto rounded-xl bg-base-100 p-2" aria-live="polite">{@html rootFormula}</div><p class="text-sm">k = 0,…,{degree - 1}. Each root has length {f(rootRadius)} and adjacent arguments differ by {f(360 / degree)}°.</p>{/if}
          <div class="overflow-x-auto"><table class="table table-xs"><thead><tr><th>k</th><th>Rectangular form</th><th>Cis angle</th></tr></thead><tbody>{#each rootList as root, k}<tr><th>{k}</th><td class="font-mono">{complexText(root)}</td><td>{magnitude(target) ? `${f(((argument(target) ?? 0) + 360*k) / degree)}°` : 'undefined'}</td></tr>{/each}</tbody></table></div>
          <p class="text-sm">Check any root by raising it to the power {degree}: it returns {complexText(target)} (up to rounding).</p>
        {:else}<p role="alert">Enter finite real and imaginary parts between −1000 and 1000.</p>{/if}
      </div>
      <div>{#if rootValid}<Plane points={rootPoints} circle={rootRadius} polygon={true} />{/if}</div>
    </div>
  {/if}
  <p class="text-xs text-base-content/55">Displayed values are rounded to six significant figures. Plots use equal scales on both axes and resize automatically.</p>
</section>

<style>
  .lab-panel { border: 1px solid var(--color-base-300); background: color-mix(in oklab, var(--color-base-200) 55%, transparent); border-radius: 1.25rem; padding: 1rem; min-width: 0; }
</style>
