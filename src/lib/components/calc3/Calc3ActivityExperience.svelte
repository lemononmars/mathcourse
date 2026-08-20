<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Activity from '@lucide/svelte/icons/activity';
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import Scale from '@lucide/svelte/icons/scale';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import type { CourseWeek } from '$lib/course';
  import MathText from '../MathText.svelte';
  import SiteHeader from '../SiteHeader.svelte';

  let { courseWeek }: { courseWeek: CourseWeek } = $props();

  // W3: Second-Order Constant Coeffs: a*r^2 + b*r + c = 0
  let w3A = $state(1);
  let w3B = $state(-5);
  let w3C = $state(6);
  let w3Disc = $derived(w3B * w3B - 4 * w3A * w3C);
  let w3Roots = $derived.by(() => {
    if (w3Disc > 0) {
      const r1 = ((-w3B + Math.sqrt(w3Disc)) / (2 * w3A)).toFixed(2);
      const r2 = ((-w3B - Math.sqrt(w3Disc)) / (2 * w3A)).toFixed(2);
      return `รากจริงต่างกัน: r₁ = ${r1}, r₂ = ${r2} → y = c₁e^(${r1}x) + c₂e^(${r2}x)`;
    } else if (w3Disc === 0) {
      const r = (-w3B / (2 * w3A)).toFixed(2);
      return `รากจริงซ้ำ: r = ${r} → y = (c₁ + c₂x)e^(${r}x)`;
    } else {
      const alpha = (-w3B / (2 * w3A)).toFixed(2);
      const beta = (Math.sqrt(-w3Disc) / (2 * w3A)).toFixed(2);
      return `รากเชิงซ้อน: ${alpha} ± ${beta}i → y = e^(${alpha}x)(c₁ cos(${beta}x) + c₂ sin(${beta}x))`;
    }
  });

  // W4: Numerical Integration of f(x) = x^3 from 0 to 2
  let w4N = $state(8);
  let w4Trap = $derived.by(() => {
    const a = 0, b = 2;
    const h = (b - a) / (w4N || 1);
    let s = (Math.pow(a, 3) + Math.pow(b, 3)) / 2;
    for (let i = 1; i < w4N; i++) s += Math.pow(a + i * h, 3);
    return (s * h).toFixed(4);
  });
  let w4Exact = '4.0000'; // int_0^2 x^3 dx = 2^4/4 = 4

  // W12: p-series sum 1/n^p
  let w12P = $state(2);
  let w12Status = $derived(
    w12P > 1 ? `ลู่เข้า (Converges เพราะ p = ${w12P} > 1)` : `ลู่ออก (Diverges เพราะ p = ${w12P} ≤ 1)`
  );
</script>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
    <a href="/courses/calculus-3-for-engineers" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex">
      <ArrowLeft size={16}/> หลักสูตร แคลคูลัส 3
    </a>
    <header class="mb-8 hidden sm:block">
      <p class="eyebrow">Calculus 3 · คาบเรียนที่ {courseWeek.week} Studio</p>
      <h1 class="display-title mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">{courseWeek.title}</h1>
    </header>

    <div class="calc3-studio flex h-[calc(100vh-100px)] max-h-[820px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl sm:p-6">
      <div class="flex items-center justify-between border-b border-base-200 pb-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="badge badge-accent font-bold">แคลคูลัส 3</span>
          <h2 class="text-xl font-black text-base-content">ห้องทดลองเชิงภาพสัปดาห์ที่ {courseWeek.week}</h2>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto py-2">
        {#if courseWeek.week === 3}
          <!-- W3: Differential Equations Characteristic Equation -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">สมการเอกพันธ์ ar² + br + c = 0</span>
              <div><span>สัมประสิทธิ์ a = {w3A}</span><input type="range" min="1" max="5" bind:value={w3A} class="range range-xs range-primary" /></div>
              <div><span>สัมประสิทธิ์ b = {w3B}</span><input type="range" min="-10" max="10" bind:value={w3B} class="range range-xs range-secondary" /></div>
              <div><span>สัมประสิทธิ์ c = {w3C}</span><input type="range" min="-10" max="15" bind:value={w3C} class="range range-xs" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
              <span class="text-xs uppercase font-bold text-base-content/50">สมการลักษณะเฉพาะและผลเฉลยทั่วไป</span>
              <div class="text-2xl font-mono font-black text-primary">{w3A}r² {w3B >= 0 ? '+' : ''}{w3B}r {w3C >= 0 ? '+' : ''}{w3C} = 0</div>
              <div class="p-4 bg-base-200 rounded-2xl border border-base-300 font-mono text-sm font-bold text-base-content">
                {w3Roots}
              </div>
            </div>
          </div>

        {:else if courseWeek.week === 4}
          <!-- W4: Numerical Integration -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">กฎสี่เหลี่ยมคางหมู ∫₀² x³ dx</span>
              <div><span>จำนวนช่วงย่อย n = {w4N}</span><input type="range" min="2" max="64" step="2" bind:value={w4N} class="range range-xs range-primary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-2">
              <span class="text-xs uppercase font-bold text-base-content/50">ค่าประมาณเชิงตัวเลข vs ค่าจริง</span>
              <div class="text-6xl font-mono font-black text-primary my-1">{w4Trap}</div>
              <p class="text-xs font-mono text-base-content/70">ค่าจริง (Exact): ∫₀² x³ dx = 2⁴/4 = {w4Exact}</p>
            </div>
          </div>

        {:else if courseWeek.week === 12}
          <!-- W12: Infinite Series -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">การทดสอบอนุกรมพี (p-Series) ∑ (1 / nᵖ)</span>
              <div><span>เลขชี้กำลัง p = {w12P}</span><input type="range" min="0.2" max="4" step="0.2" bind:value={w12P} class="range range-xs range-primary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
              <span class="text-xs uppercase font-bold text-base-content/50">สถานะการลู่เข้าของอนุกรม</span>
              <div class={`text-3xl font-black ${w12P > 1 ? 'text-success' : 'text-error'}`}>{w12Status}</div>
              <p class="text-xs text-base-content/70">อนุกรมพีจะลู่เข้าก็ต่อเมื่อ p &gt; 1 และลู่ออกเมื่อ p ≤ 1</p>
            </div>
          </div>

        {:else}
          <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
            <span class="badge badge-accent font-bold text-sm">การทดลองทางคณิตศาสตร์ สัปดาห์ที่ {courseWeek.week}</span>
            <h3 class="text-2xl font-black text-base-content mt-2">{courseWeek.title}</h3>
            <p class="max-w-md text-sm text-base-content/70">
              สำรวจแบบจำลองทางคณิตศาสตร์ สมการเชิงอนุพันธ์ และอนุกรมอนันต์เชิงวิศวกรรม
            </p>
          </div>
        {/if}
      </div>
    </div>

    {#if courseWeek.activity.length}
      <div class="mt-8 space-y-6">
        {#each courseWeek.activity as activity, index}
          <section class="interactive-card">
            <p class="eyebrow">กิจกรรมที่ {index + 1}</p>
            <h2 class="mt-2 text-3xl font-extrabold">{activity.title}</h2>
            <div class="mt-5">
              <MathText content={activity.content} numberingPrefix={`${courseWeek.week}.A${index + 1}`}/>
            </div>
          </section>
        {/each}
      </div>
    {/if}
  </div>
</main>
