<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Navigation from '@lucide/svelte/icons/navigation';
  import Grid from '@lucide/svelte/icons/grid';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import type { CourseWeek } from '$lib/course';
  import MathText from '../MathText.svelte';
  import SiteHeader from '../SiteHeader.svelte';

  let { courseWeek }: { courseWeek: CourseWeek } = $props();

  // W1: Integration by Parts: int x * e^(ax) dx = (x/a)*e^(ax) - (1/a^2)*e^(ax)
  let w1A = $state(2);
  let w1X = $state(1);
  let w1Res = $derived((((w1X / w1A) - (1 / (w1A * w1A))) * Math.exp(w1A * w1X)).toFixed(3));

  // W4: Vector function r(t) = <R cos(t), R sin(t), c*t> (Helix)
  let w4R = $state(3);
  let w4C = $state(0.5);
  let w4T = $state(1.57); // pi/2
  let w4X = $derived((w4R * Math.cos(w4T)).toFixed(2));
  let w4Y = $derived((w4R * Math.sin(w4T)).toFixed(2));
  let w4Z = $derived((w4C * w4T).toFixed(2));

  // W9: Partial Derivatives f(x, y) = a*x^2 + b*y^2 + c*x*y
  let w9A = $state(2);
  let w9B = $state(3);
  let w9C = $state(1);
  let w9X = $state(2);
  let w9Y = $state(1);
  let w9Fx = $derived(2 * w9A * w9X + w9C * w9Y);
  let w9Fy = $derived(2 * w9B * w9Y + w9C * w9X);

  // W12: Second Partials Test D = fxx*fyy - (fxy)^2
  let w12Fxx = $state(4);
  let w12Fyy = $state(6);
  let w12Fxy = $state(2);
  let w12D = $derived(w12Fxx * w12Fyy - Math.pow(w12Fxy, 2));
  let w12Nature = $derived(
    w12D < 0 ? 'จุดอานม้า (Saddle Point)' : w12Fxx > 0 ? 'จุดต่ำสุดสัมพัทธ์ (Relative Minimum)' : 'จุดสูงสุดสัมพัทธ์ (Relative Maximum)'
  );
</script>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
    <a href="/courses/calculus-2-for-engineers" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex">
      <ArrowLeft size={16}/> หลักสูตร แคลคูลัส 2
    </a>
    <header class="mb-8 hidden sm:block">
      <p class="eyebrow">Calculus 2 · คาบเรียนที่ {courseWeek.week} Studio</p>
      <h1 class="display-title mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">{courseWeek.title}</h1>
    </header>

    <div class="calc2-studio flex h-[calc(100vh-100px)] max-h-[820px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl sm:p-6">
      <div class="flex items-center justify-between border-b border-base-200 pb-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="badge badge-secondary font-bold">แคลคูลัส 2</span>
          <h2 class="text-xl font-black text-base-content">ห้องทดลองเชิงภาพสัปดาห์ที่ {courseWeek.week}</h2>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto py-2">
        {#if courseWeek.week === 1}
          <!-- W1: Parts -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">อินทิเกรตทีละส่วน ∫ x · e^(ax) dx</span>
              <div><span>ค่าสัมประสิทธิ์ a = {w1A}</span><input type="range" min="1" max="5" bind:value={w1A} class="range range-xs range-primary" /></div>
              <div><span>จุดประเมิน x = {w1X}</span><input type="range" min="0" max="3" step="0.5" bind:value={w1X} class="range range-xs range-secondary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">ค่าของปฏิยานุพันธ์ F({w1X})</span>
              <div class="text-6xl font-mono font-black text-primary my-3">{w1Res}</div>
              <p class="text-xs font-mono">F(x) = (x/{w1A} - 1/{w1A*w1A}) e^({w1A}x) + C</p>
            </div>
          </div>

        {:else if courseWeek.week === 4}
          <!-- W4: Vector functions -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">เส้นโค้งเวกเตอร์ทรงก้นหอย (Helix) r(t)</span>
              <div><span>รัศมี R = {w4R}</span><input type="range" min="1" max="6" bind:value={w4R} class="range range-xs range-primary" /></div>
              <div><span>อัตราความชัน c = {w4C}</span><input type="range" min="0.1" max="2" step="0.1" bind:value={w4C} class="range range-xs range-secondary" /></div>
              <div><span>พารามิเตอร์ t = {w4T}</span><input type="range" min="0" max="6.28" step="0.1" bind:value={w4T} class="range range-xs" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">พิกัดเวกเตอร์ตำแหน่ง r({w4T})</span>
              <div class="text-4xl font-mono font-black text-primary my-3">⟨{w4X}, {w4Y}, {w4Z}⟩</div>
              <p class="text-xs font-mono">r(t) = ⟨{w4R} cos({w4T}), {w4R} sin({w4T}), {w4C}·{w4T}⟩</p>
            </div>
          </div>

        {:else if courseWeek.week === 9}
          <!-- W9: Partial Derivatives -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">อนุพันธ์ย่อย f(x, y) = ax² + by² + cxy</span>
              <div><span>จุด x = {w9X}</span><input type="range" min="-5" max="5" bind:value={w9X} class="range range-xs range-primary" /></div>
              <div><span>จุด y = {w9Y}</span><input type="range" min="-5" max="5" bind:value={w9Y} class="range range-xs range-secondary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-3 text-center">
              <div class="grid grid-cols-2 gap-3">
                <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <span class="text-xs font-bold text-primary">∂f/∂x</span>
                  <div class="text-4xl font-mono font-black mt-1">{w9Fx}</div>
                  <span class="text-xs text-base-content/60">2ax + cy</span>
                </div>
                <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                  <span class="text-xs font-bold text-secondary">∂f/∂y</span>
                  <div class="text-4xl font-mono font-black mt-1">{w9Fy}</div>
                  <span class="text-xs text-base-content/60">2by + cx</span>
                </div>
              </div>
            </div>
          </div>

        {:else if courseWeek.week === 12}
          <!-- W12: Second Partials Test -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">การทดสอบอนุพันธ์ย่อยอันดับสอง D</span>
              <div><span>f_xx = {w12Fxx}</span><input type="range" min="-8" max="8" bind:value={w12Fxx} class="range range-xs range-primary" /></div>
              <div><span>f_yy = {w12Fyy}</span><input type="range" min="-8" max="8" bind:value={w12Fyy} class="range range-xs range-secondary" /></div>
              <div><span>f_xy = {w12Fxy}</span><input type="range" min="-8" max="8" bind:value={w12Fxy} class="range range-xs" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner space-y-3">
              <span class="text-xs uppercase font-bold text-base-content/50">ดิสครีมิแนนต์ D = f_xx · f_yy - (f_xy)²</span>
              <div class="text-6xl font-mono font-black text-primary my-1">{w12D}</div>
              <div class="badge badge-lg badge-primary font-bold">{w12Nature}</div>
            </div>
          </div>

        {:else}
          <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
            <span class="badge badge-secondary font-bold text-sm">การทดลองทางคณิตศาสตร์ สัปดาห์ที่ {courseWeek.week}</span>
            <h3 class="text-2xl font-black text-base-content mt-2">{courseWeek.title}</h3>
            <p class="max-w-md text-sm text-base-content/70">
              สำรวจและวิเคราะห์แนวคิดแคลคูลัสขั้นสูงหลายตัวแปรและเวกเตอร์ผ่านแบบจำลองเชิงภาพ
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
