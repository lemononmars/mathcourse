<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Activity from '@lucide/svelte/icons/activity';
  import TrendingUp from '@lucide/svelte/icons/trending-up';
  import Layers from '@lucide/svelte/icons/layers';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Maximize2 from '@lucide/svelte/icons/maximize-2';
  import type { CourseWeek } from '$lib/course';
  import MathText from '../MathText.svelte';
  import SiteHeader from '../SiteHeader.svelte';

  let { courseWeek }: { courseWeek: CourseWeek } = $props();

  // Active subtab for current week's studio
  let subTab = $state(0);

  // Live Math Interactive State
  // W1: Functions
  let w1A = $state(2);
  let w1B = $state(-3);
  let w1X = $state(4);
  let w1Y = $derived(w1A * w1X + w1B);

  // W2: Limits (x -> a)
  let w2A = $state(2);
  let w2Delta = $state(0.01);
  let w2Left = $derived(Math.pow(w2A - w2Delta, 2).toFixed(4));
  let w2Right = $derived(Math.pow(w2A + w2Delta, 2).toFixed(4));

  // W3: Tangent slope f(x) = x^2 at x0
  let w3X0 = $state(3);
  let w3H = $state(0.1);
  let w3SecSlope = $derived(((Math.pow(w3X0 + w3H, 2) - Math.pow(w3X0, 2)) / (w3H || 0.001)).toFixed(3));
  let w3TanSlope = $derived((2 * w3X0).toFixed(3));

  // W10: Definite Integral Riemann Sums f(x) = x^2 from 0 to B
  let w10B = $state(3);
  let w10N = $state(20);
  let w10Riemann = $derived.by(() => {
    const dx = w10B / (w10N || 1);
    let sum = 0;
    for (let i = 1; i <= w10N; i++) {
      const xi = i * dx;
      sum += Math.pow(xi, 2) * dx;
    }
    return sum.toFixed(3);
  });
  let w10Exact = $derived((Math.pow(w10B, 3) / 3).toFixed(3));

  // W11: Area between f(x)=a*x and g(x)=x^2
  let w11A = $state(4);
  let w11Area = $derived((Math.pow(w11A, 3) / 6).toFixed(2));

  // W12: Volume of revolution f(x)=sqrt(x) around x-axis from 0 to R
  let w12R = $state(4);
  let w12Vol = $derived(((Math.PI * Math.pow(w12R, 2)) / 2).toFixed(2));
</script>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
    <a href="/courses/calculus-1-for-engineers" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex">
      <ArrowLeft size={16}/> หลักสูตร แคลคูลัส 1
    </a>
    <header class="mb-8 hidden sm:block">
      <p class="eyebrow">Calculus 1 · คาบเรียนที่ {courseWeek.week} Studio</p>
      <h1 class="display-title mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">{courseWeek.title}</h1>
    </header>

    <!-- Studio Sandbox Container -->
    <div class="calc1-studio flex h-[calc(100vh-100px)] max-h-[820px] min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl sm:p-6">
      
      <!-- Studio Header / Section Title -->
      <div class="flex items-center justify-between border-b border-base-200 pb-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="badge badge-primary font-bold">แคลคูลัส 1</span>
          <h2 class="text-xl font-black text-base-content">ห้องทดลองเชิงภาพสัปดาห์ที่ {courseWeek.week}</h2>
        </div>
      </div>

      <!-- Main Visual Workspace -->
      <div class="flex-1 overflow-y-auto py-2">
        {#if courseWeek.week === 1}
          <!-- W1: Functions & Graphs -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">ฟังก์ชันเชิงเส้น f(x) = ax + b</span>
              <div><span>ค่าสัมประสิทธิ์ a = {w1A}</span><input type="range" min="-5" max="5" bind:value={w1A} class="range range-xs range-primary" /></div>
              <div><span>จุดตัดแกน Y (b) = {w1B}</span><input type="range" min="-10" max="10" bind:value={w1B} class="range range-xs range-secondary" /></div>
              <div><span>จุดอินพุต x = {w1X}</span><input type="range" min="-10" max="10" bind:value={w1X} class="range range-xs" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">ผลลัพธ์ f({w1X})</span>
              <div class="text-6xl font-mono font-black text-primary my-3">{w1Y}</div>
              <p class="text-xs font-mono">f({w1X}) = ({w1A})({w1X}) + ({w1B}) = {w1Y}</p>
            </div>
          </div>

        {:else if courseWeek.week === 2}
          <!-- W2: Limits -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">ลิมิต f(x) = x² เมื่อ x → a</span>
              <div><span>จุดเป้าหมาย a = {w2A}</span><input type="range" min="-5" max="5" bind:value={w2A} class="range range-xs range-primary" /></div>
              <div><span>ระยะใกล้เคียง Δ = {w2Delta}</span><input type="range" min="0.001" max="0.1" step="0.005" bind:value={w2Delta} class="range range-xs range-secondary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-3 text-center">
              <div class="grid grid-cols-2 gap-3">
                <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <span class="text-xs font-bold text-primary">ลิมิตซ้าย (x → {w2A}⁻)</span>
                  <div class="text-3xl font-mono font-black mt-1">{w2Left}</div>
                </div>
                <div class="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                  <span class="text-xs font-bold text-secondary">ลิมิตขวา (x → {w2A}⁺)</span>
                  <div class="text-3xl font-mono font-black mt-1">{w2Right}</div>
                </div>
              </div>
              <p class="text-xs font-mono font-bold text-success">lim_{'{x→' + w2A + '}'} x² = {w2A * w2A}</p>
            </div>
          </div>

        {:else if courseWeek.week === 3}
          <!-- W3: Derivative Tangent Line -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">ความชันของเส้นสัมผัส f(x) = x²</span>
              <div><span>จุดสัมผัส x₀ = {w3X0}</span><input type="range" min="-5" max="5" bind:value={w3X0} class="range range-xs range-primary" /></div>
              <div><span>ระยะก้าว h → 0: h = {w3H}</span><input type="range" min="0.01" max="1" step="0.05" bind:value={w3H} class="range range-xs range-secondary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-6 shadow-inner space-y-3 text-center">
              <div class="grid grid-cols-2 gap-3">
                <div class="p-4 bg-base-200 rounded-2xl">
                  <span class="text-xs font-bold">ความชันเส้นตัดคอร์ด (Secant)</span>
                  <div class="text-3xl font-mono font-black mt-1">{w3SecSlope}</div>
                  <span class="text-[10px] text-base-content/60">[f(x₀+h)-f(x₀)]/h</span>
                </div>
                <div class="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <span class="text-xs font-bold text-primary">อนุพันธ์ f'(x₀) (Tangent)</span>
                  <div class="text-3xl font-mono font-black text-primary mt-1">{w3TanSlope}</div>
                  <span class="text-[10px] text-base-content/60">2 · x₀ = {2 * w3X0}</span>
                </div>
              </div>
            </div>
          </div>

        {:else if courseWeek.week === 10}
          <!-- W10: Definite Integral & Riemann Sum -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">ผลบวกรีมันน์ ∫₀ᵇ x² dx</span>
              <div><span>ขอบเขตบน b = {w10B}</span><input type="range" min="1" max="6" bind:value={w10B} class="range range-xs range-primary" /></div>
              <div><span>จำนวนช่วงย่อย n = {w10N}</span><input type="range" min="4" max="100" step="4" bind:value={w10N} class="range range-xs range-secondary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">พื้นที่ผลบวกรีมันน์ vs พื้นที่แท้จริง</span>
              <div class="text-5xl font-mono font-black text-primary my-2">{w10Riemann}</div>
              <p class="text-xs font-mono text-base-content/70">พื้นที่แท้จริง (FTC): ∫₀^{w10B} x² dx = b³/3 = {w10Exact}</p>
            </div>
          </div>

        {:else if courseWeek.week === 11}
          <!-- W11: Area Between Curves -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">พื้นที่ระหว่างเส้นโค้ง y = ax และ y = x²</span>
              <div><span>ความชัน a = {w11A}</span><input type="range" min="1" max="6" bind:value={w11A} class="range range-xs range-primary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">พื้นที่ระหว่างเส้นโค้ง A</span>
              <div class="text-6xl font-mono font-black text-primary my-2">{w11Area}</div>
              <p class="text-xs font-mono">∫₀^{w11A} (ax - x²) dx = a³/6 = {w11Area} ตารางหน่วย</p>
            </div>
          </div>

        {:else if courseWeek.week === 12}
          <!-- W12: Volumes of Revolution -->
          <div class="grid md:grid-cols-12 gap-4 h-full animate-fade-in">
            <div class="md:col-span-5 rounded-2xl border border-base-300 bg-base-200/40 p-4 space-y-3">
              <span class="text-xs font-bold uppercase text-primary">ปริมาตรทรงตันการหมุน y = √x หมุนรอบแกน X</span>
              <div><span>รัศมีขอบเขต x = {w12R}</span><input type="range" min="1" max="8" bind:value={w12R} class="range range-xs range-primary" /></div>
            </div>
            <div class="md:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-inner">
              <span class="text-xs uppercase font-bold text-base-content/50">ปริมาตรทรงตัน V</span>
              <div class="text-5xl font-mono font-black text-primary my-2">{w12Vol} <span class="text-lg">π·R²/2</span></div>
              <p class="text-xs font-mono">V = π ∫₀^{w12R} (√x)² dx = π R²/2 = {w12Vol} ลูกบาศก์หน่วย</p>
            </div>
          </div>

        {:else}
          <!-- General Visual Explorer for Other Weeks -->
          <div class="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center h-full space-y-3">
            <span class="badge badge-primary font-bold text-sm">การทดลองทางคณิตศาสตร์ สัปดาห์ที่ {courseWeek.week}</span>
            <h3 class="text-2xl font-black text-base-content mt-2">{courseWeek.title}</h3>
            <p class="max-w-md text-sm text-base-content/70">
              สำรวจและทำความเข้าใจแนวคิดหลักของเนื้อหาในคาบเรียนนี้ผ่านแบบฝึกหัดและการคำนวณเชิงโต้ตอบ
            </p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Additional Exercise Sections from lecture -->
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
