<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import BookOpen from '@lucide/svelte/icons/book-open';
  import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { calc2Weeks, weekAccent, lectureSectionPath } from '$lib/course';

  let weekProgress = $state<Record<number, number>>({});
  onMount(() => {
    weekProgress = Object.fromEntries(calc2Weeks.map((week) => {
      let completed: string[] = [];
      try { completed = JSON.parse(localStorage.getItem(`course-progress:calculus-2-for-engineers:${week.week}`) ?? '[]'); } catch { completed = []; }
      const count = completed.filter((anchor) => week.sections.some((section) => section.anchor === anchor)).length;
      return [week.week, Math.round((count / (week.sections.length || 1)) * 100)];
    }));
  });
</script>

<svelte:head>
  <title>Calculus 2 for Engineers · แคลคูลัส 2</title>
</svelte:head>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <section class="border-b border-base-300 bg-base-100">
    <div class="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <div class="badge badge-secondary badge-outline mb-4 font-bold">MTH 102 · 15 สัปดาห์</div>
      <h1 class="display-title max-w-3xl text-4xl font-black tracking-[-.045em] md:text-6xl">Calculus 2 for Engineers<br/><span class="text-secondary text-3xl md:text-5xl">แคลคูลัส 2 สำหรับวิศวกร</span></h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-base-content/65">เทคนิคการอินทิเกรตขั้นสูง ฟังก์ชันค่าเวกเตอร์ เวกเตอร์สัมผัส/ความโค้ง ฟังก์ชันหลายตัวแปร อนุพันธ์ย่อย เกรเดียนต์ และค่าสุดขีด</p>
      <div class="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-sm">
        <div class="stat-card"><BookOpen/> 15 คาบเรียนบรรยาย</div>
        <div class="stat-card"><Gamepad2/> 15 สตูดิโอเชิงภาพ</div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-7 flex items-end justify-between">
      <div>
        <p class="eyebrow">โครงสร้างรายวิชา</p>
        <h2 class="text-3xl font-extrabold">แผนการเรียนรู้ 15 สัปดาห์</h2>
      </div>
      <p class="hidden text-sm text-base-content/50 md:block">บทเรียน · กิจกรรม · แบบฝึกหัด</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      {#each calc2Weeks as week, index}
        <article class="week-card group" style={`--week-color:${weekAccent[index % weekAccent.length]}`}>
          <div class="week-number">{String(week.week).padStart(2, '0')}</div>
          <div class="min-w-0 flex-1">
            <p class="text-xs font-bold uppercase tracking-[.18em] text-base-content/45">สัปดาห์ที่ {week.week}</p>
            <h3 class="mt-1 text-xl font-extrabold leading-tight">{week.title}</h3>
            
            <div class="mt-4">
              <div class="mb-1 flex justify-between text-xs font-bold text-base-content/50">
                <span>ความคืบหน้า</span>
                <span>{weekProgress[week.week] ?? 0}%</span>
              </div>
              <progress class="progress week-progress h-2 w-full" value={weekProgress[week.week] ?? 0} max="100" aria-label={`Week ${week.week} progress`}></progress>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              {#if week.sections.length}
                <a class="btn btn-sm rounded-full" href={lectureSectionPath('calculus-2-for-engineers', week)}>
                  บทเรียน <ArrowRight size={14}/>
                </a>
              {/if}
              <a class="btn btn-sm btn-ghost rounded-full" href={`/courses/calculus-2-for-engineers/activity/${week.week}`}>
                กิจกรรมสตูดิโอ
              </a>
              {#if week.worksheet?.length}
                <a class="btn btn-sm btn-ghost rounded-full" href={`/courses/calculus-2-for-engineers/worksheet/${week.week}`}>
                  แบบฝึกหัด
                </a>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>
</main>
