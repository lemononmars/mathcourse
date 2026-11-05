<script lang="ts">
  import { argument, numberText, type Complex } from '$lib/lecture12';
  type Point = Complex & { label: string; color: string; dashed?: boolean };
  type Segment = { from: Complex; to: Complex; color: string };
  let { points, segments = [], circle = 0, polygon = false, angles = [] }: { points: Point[]; segments?: Segment[]; circle?: number; polygon?: boolean; angles?: { degrees: number; label: string; color: string }[] } = $props();
  const uid = $props.id();
  const extent = $derived.by(() => {
    const bound = Math.max(2, circle, ...points.flatMap(p => [Math.abs(p.re), Math.abs(p.im)]));
    const power = 10 ** Math.floor(Math.log10(bound));
    return Math.ceil(bound / power * 1.3) * power;
  });
  const ticks = $derived(Array.from({ length: 7 }, (_, i) => (i - 3) * extent / 3));
  const x = (n: number) => 180 + n / extent * 138;
  const y = (n: number) => 180 - n / extent * 138;
  function arc(radius: number, degrees: number) {
    const radians = degrees * Math.PI / 180, sweep = degrees >= 0 ? 0 : 1;
    if (Math.abs(degrees) >= 359.999999) return `M ${180 + radius} 180 A ${radius} ${radius} 0 1 ${sweep} ${180 - radius} 180 A ${radius} ${radius} 0 1 ${sweep} ${180 + radius} 180`;
    return `M ${180 + radius} 180 A ${radius} ${radius} 0 ${Math.abs(degrees) > 180 ? 1 : 0} ${sweep} ${180 + radius * Math.cos(radians)} ${180 - radius * Math.sin(radians)}`;
  }
  const tickText = (n: number) => Math.abs(n) >= 10000 ? n.toExponential(0) : Number(n.toPrecision(3)).toString();
</script>

<figure class="rounded-2xl border border-base-300 bg-base-100 p-2 sm:p-3">
  <svg viewBox="0 0 360 360" role="img" aria-label="Complex plane with original and resulting complex-number vectors" class="mx-auto aspect-square w-full max-w-[440px]">
    <defs>{#each points as point, i}<marker id={`${uid}-arrow-${i}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M 0 0 L 7 3.5 L 0 7 Z" fill={point.color} /></marker>{/each}</defs>
    {#each ticks as tick}
      <line x1={x(tick)} y1="35" x2={x(tick)} y2="325" stroke="currentColor" stroke-opacity="0.08" />
      <line x1="35" y1={y(tick)} x2="325" y2={y(tick)} stroke="currentColor" stroke-opacity="0.08" />
      {#if tick !== 0}<text x={x(tick)} y="341" text-anchor="middle" font-size="9" fill="currentColor">{tickText(tick)}</text><text x="28" y={y(tick) + 3} text-anchor="end" font-size="9" fill="currentColor">{tickText(tick)}</text>{/if}
    {/each}
    <path d="M 35 180 H 326 M 180 325 V 34" fill="none" stroke="currentColor" stroke-opacity="0.5" />
    <text x="329" y="184" font-size="11" fill="currentColor">Re</text><text x="175" y="26" font-size="11" fill="currentColor">Im</text><text x="168" y="195" font-size="9" fill="currentColor">0</text>
    {#if circle > 0}<circle cx="180" cy="180" r={circle / extent * 138} fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-dasharray="4 3" />{/if}
    {#if polygon && points.length > 2}<polygon points={points.map(p => `${x(p.re)},${y(p.im)}`).join(' ')} fill="#0d9488" fill-opacity="0.08" stroke="#0d9488" stroke-opacity="0.4" />{/if}
    {#each segments as segment}<line x1={x(segment.from.re)} y1={y(segment.from.im)} x2={x(segment.to.re)} y2={y(segment.to.im)} stroke={segment.color} stroke-width="1.5" stroke-dasharray="5 4" />{/each}
    {#each points as point, i}
      <line x1="180" y1="180" x2={x(point.re)} y2={y(point.im)} stroke={point.color} stroke-width={point.dashed ? 2.5 : 2} stroke-dasharray={point.dashed ? '6 4' : undefined} marker-end={point.re || point.im ? `url(#${uid}-arrow-${i})` : undefined} />
      <circle cx={x(point.re)} cy={y(point.im)} r={point.dashed ? 4.5 : 3.5} fill={point.color} stroke="white" stroke-width="1" />
      <text x={x(point.re) + (i % 2 ? -8 : 8)} y={y(point.im) - 9 - (point.re === 0 && point.im === 0 ? i * 13 : 0)} text-anchor={i % 2 ? 'end' : 'start'} font-size="11" font-weight="bold" fill={point.color}>{point.label}</text>
    {/each}
    {#each angles as angle, i}
      {@const radius = 24 + i * 19}
      {#if Math.abs(angle.degrees) > 0.000001}
        <path d={arc(radius, angle.degrees)} fill="none" stroke={angle.color} stroke-width="1.5" />
        <text x={180 + (radius + 10) * Math.cos(angle.degrees / 2 * Math.PI / 180)} y={180 - (radius + 10) * Math.sin(angle.degrees / 2 * Math.PI / 180)} font-size="9" fill={angle.color}>{angle.label}</text>
      {/if}
    {/each}
  </svg>
  <figcaption class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
    {#each points as point}<span><span style:color={point.color} aria-hidden="true">●</span> {point.label} = {numberText(point.re)} {point.im < 0 ? '−' : '+'} {numberText(Math.abs(point.im))}i</span>{/each}
  </figcaption>
</figure>
