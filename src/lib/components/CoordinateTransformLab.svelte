<script lang="ts">
  import katex from 'katex';
  const presets = [
    { name: 'Page 49 · Horizontal stretch', values: [2, 0, 0, 1, 0, 0], description: 'Horizontal scaling by 2: x doubles while y stays the same.' },
    { name: 'Page 50 · Vertical stretch and reflection', values: [1, 0, 0, -2, 0, 0], description: 'Reflect across the x-axis and scale vertically by 2.' },
    { name: 'Page 51 · Clockwise quarter-turn', values: [0, 1, -1, 0, 0, 0], description: 'Rotate 90° clockwise about the origin: (x, y) → (y, −x).' },
    { name: 'Page 52 · (x + y, x − y)', values: [1, 1, 1, -1, 0, 0], description: 'Reflect across y = x, rotate 45° clockwise, and scale uniformly by √2.' },
    { name: 'Translation by (2, 1)', values: [1, 0, 0, 1, 2, 1], description: 'Move every point right 2 and up 1. This is an affine transformation.' },
    { name: 'Uniform scaling by 2', values: [2, 0, 0, 2, 0, 0], description: 'Double both components and every distance from the origin.' },
    { name: 'Point reflection about (1, 1)', values: [-1, 0, 0, -1, 2, 2], description: 'The center (1, 1) is the midpoint of each point and its image.' },
    { name: 'Counterclockwise quarter-turn', values: [0, -1, 1, 0, 0, 0], description: 'Rotate 90° counterclockwise about the origin: (x, y) → (−y, x).' }
  ];
  let selected = $state('0');
  let x = $state<number | undefined>(1);
  let y = $state<number | undefined>(1);
  let a = $state<number | undefined>(2);
  let b = $state<number | undefined>(0);
  let c = $state<number | undefined>(0);
  let d = $state<number | undefined>(1);
  let h = $state<number | undefined>(0);
  let k = $state<number | undefined>(0);
  let showSquare = $state(true);
  const vertices = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const colors = ['#16a34a', '#a16207', '#2563eb', '#dc2626'];
  const tiles = [[0, 0], [0.5, 0], [0.5, 0.5], [0, 0.5]];
  const valid = $derived([x, y, a, b, c, d, h, k].every(v => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= 1000));
  function applyPreset(event: Event) {
    selected = (event.currentTarget as HTMLSelectElement).value;
    const preset = presets[Number(selected)];
    if (preset) [a, b, c, d, h, k] = preset.values;
  }
  function map(px: number, py: number): number[] {
    return [(a ?? 0) * px + (b ?? 0) * py + (h ?? 0), (c ?? 0) * px + (d ?? 0) * py + (k ?? 0)];
  }
  const image = $derived(map(x ?? 0, y ?? 0));
  const mappedVertices = $derived(vertices.map(([vx, vy]) => map(vx, vy)));
  const extent = $derived.by(() => {
    if (!valid) return 3;
    const bound = Math.max(2, Math.abs(x ?? 0), Math.abs(y ?? 0), ...image.map(Math.abs), ...mappedVertices.flat().map(Math.abs));
    const power = 10 ** Math.floor(Math.log10(bound / 2));
    const step = [1, 2, 5, 10].find(n => n * power >= bound / 2) ?? 10;
    return 3 * step * power;
  });
  const ticks = $derived(Array.from({ length: 7 }, (_, i) => (i - 3) * extent / 3));
  function sx(px: number) { return 180 + px / extent * 138; }
  function sy(py: number) { return 180 - py / extent * 138; }
  function fmt(n: number) { return Number(n.toFixed(5)).toLocaleString('en-US', { maximumFractionDigits: 5 }); }
  function polygon(points: number[][], transformed: boolean) {
    return points.map(([px, py]) => {
      const p = transformed ? map(px, py) : [px, py];
      return `${sx(p[0])},${sy(p[1])}`;
    }).join(' ');
  }
  const formula = $derived(`\\begin{pmatrix}x'\\\\y'\\end{pmatrix}=\\begin{pmatrix}${a ?? '?'}x+(${b ?? '?'})y+(${h ?? '?'})\\\\${c ?? '?'}x+(${d ?? '?'})y+(${k ?? '?'})\\end{pmatrix}`);
  const formulaHtml = $derived(katex.renderToString(formula, { displayMode: true, throwOnError: true }));
</script>

<section class="space-y-4" aria-label="Coordinate transformation explorer">
  <div><h3 class="text-xl font-black">Where does your coordinate go?</h3><p class="mt-1 text-sm text-base-content/70">Choose a rule from lecture pages 49–52, then enter a point. Compare the original and image on equally scaled axes.</p></div>
  <div class="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
    <div class="space-y-3 rounded-2xl border border-base-300 bg-base-200/50 p-4">
      <label class="block text-sm font-bold">Transformation
        <select class="select select-bordered mt-1 w-full" bind:value={selected} onchange={applyPreset}>
          {#each presets as preset, i}<option value={String(i)}>{preset.name}</option>{/each}
          <option value="custom">Custom rule</option>
        </select>
      </label>
      <p class="text-sm text-base-content/70">{selected === 'custom' ? 'Set the coefficients below: x′ = ax + by + h, y′ = cx + dy + k.' : presets[Number(selected)].description}</p>
      <div class="grid grid-cols-2 gap-3">
        <label class="text-sm font-bold">Input x<input aria-label="Input x" class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={x} /></label>
        <label class="text-sm font-bold">Input y<input aria-label="Input y" class="input input-bordered mt-1 w-full" type="number" step="any" min="-1000" max="1000" bind:value={y} /></label>
      </div>
      <div class="flex flex-wrap gap-1" aria-label="Try a square vertex">
        {#each vertices as vertex}<button class="btn btn-xs btn-outline" onclick={() => { [x, y] = vertex; }}>({vertex.join(', ')})</button>{/each}
      </div>
      {#if selected === 'custom'}
        <div class="grid grid-cols-3 gap-2">
          <label class="text-xs">a<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={a} /></label>
          <label class="text-xs">b<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={b} /></label>
          <label class="text-xs">h<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={h} /></label>
          <label class="text-xs">c<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={c} /></label>
          <label class="text-xs">d<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={d} /></label>
          <label class="text-xs">k<input class="input input-sm input-bordered w-full" type="number" step="any" bind:value={k} /></label>
        </div>
      {/if}
      <div class="overflow-x-auto text-sm">{@html formulaHtml}</div>
      <div class="rounded-xl bg-base-100 p-3 text-sm" aria-live="polite">
        {#if valid}
          <strong>P = ({fmt(x!)}, {fmt(y!)}) → P′ = ({fmt(image[0])}, {fmt(image[1])})</strong>
          <p class="mt-2 font-mono text-xs">x′ = ({a})({x}) + ({b})({y}) + ({h}) = {fmt(image[0])}<br />y′ = ({c})({x}) + ({d})({y}) + ({k}) = {fmt(image[1])}</p>
        {:else}<p role="alert">Enter a finite number between −1000 and 1000 in every field to see its image.</p>{/if}
      </div>
      <label class="flex items-center gap-2 text-sm"><input class="checkbox checkbox-sm" type="checkbox" bind:checked={showSquare} /> Show the colored unit square</label>
    </div>
    <div class="space-y-3">
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {#each [false, true] as transformed}
          <figure class="rounded-2xl border border-base-300 bg-base-100 p-2">
            <figcaption class="text-center text-sm font-bold">{transformed ? 'Image · P′' : 'Original · P'}</figcaption>
            <svg viewBox="0 0 360 360" class="aspect-square w-full" role="img" aria-label={transformed ? 'Transformed point and square' : 'Original point and square'}>
              {#each ticks as tick}
                <line x1={sx(tick)} y1="36" x2={sx(tick)} y2="324" stroke="currentColor" stroke-opacity="0.1" />
                <line x1="36" y1={sy(tick)} x2="324" y2={sy(tick)} stroke="currentColor" stroke-opacity="0.1" />
                {#if tick !== 0}<text x={sx(tick)} y="341" text-anchor="middle" font-size="10" fill="currentColor">{fmt(tick)}</text><text x="29" y={sy(tick) + 3} text-anchor="end" font-size="10" fill="currentColor">{fmt(tick)}</text>{/if}
              {/each}
              <path d="M 36 180 H 326 M 180 324 V 34" fill="none" stroke="currentColor" stroke-opacity="0.6" />
              <text x="330" y="184" font-size="12" fill="currentColor">x</text><text x="176" y="26" font-size="12" fill="currentColor">y</text><text x="169" y="195" font-size="10" fill="currentColor">0</text>
              {#if valid}
                {#if showSquare}
                  {#each tiles as tile, i}<polygon points={polygon([tile, [tile[0] + .5, tile[1]], [tile[0] + .5, tile[1] + .5], [tile[0], tile[1] + .5]], transformed)} fill={colors[i]} fill-opacity="0.25" stroke={colors[i]} stroke-width="1" />{/each}
                  {#each vertices as vertex, i}
                    {@const p = transformed ? mappedVertices[i] : vertex}
                    <circle cx={sx(p[0])} cy={sy(p[1])} r="3" fill={colors[i]} />
                  {/each}
                {/if}
                {@const point = transformed ? image : [x!, y!]}
                <line x1="180" y1="180" x2={sx(point[0])} y2={sy(point[1])} stroke={transformed ? '#e11d48' : '#2563eb'} stroke-width="2" stroke-dasharray="5 3" />
                <circle cx={sx(point[0])} cy={sy(point[1])} r="6" fill={transformed ? '#e11d48' : '#2563eb'} stroke="white" stroke-width="2" />
                <text x={sx(point[0]) + 9} y={sy(point[1]) - 10} font-size="14" font-weight="bold" fill={transformed ? '#e11d48' : '#2563eb'}>{transformed ? 'P′' : 'P'}</text>
              {/if}
            </svg>
          </figure>
        {/each}
      </div>
      {#if valid && showSquare}
        <div class="overflow-x-auto rounded-xl border border-base-300">
          <table class="table table-xs"><caption class="p-2 text-sm font-bold">Follow the four corners</caption><thead><tr><th>Corner</th><th>Original (x, y)</th><th>Image (x′, y′)</th></tr></thead><tbody>
            {#each vertices as vertex, i}<tr><th style:color={colors[i]}>V{i}</th><td>({vertex.join(', ')})</td><td>({mappedVertices[i].map(fmt).join(', ')})</td></tr>{/each}
          </tbody></table>
        </div>
      {/if}
    </div>
  </div>
</section>
