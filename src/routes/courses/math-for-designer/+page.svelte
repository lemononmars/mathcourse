<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import BookOpen from '@lucide/svelte/icons/book-open';
  import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { mathForDesignerWeeks, weekAccent, lectureSectionPath } from '$lib/course';

  let weekProgress = $state<Record<number, number>>({});
  onMount(() => {
    weekProgress = Object.fromEntries(mathForDesignerWeeks.map((week) => {
      let completed: string[] = [];
      try { completed = JSON.parse(localStorage.getItem(`course-progress:math-for-designer:${week.week}`) ?? '[]'); } catch { completed = []; }
      const count = completed.filter((anchor) => week.sections.some((section) => section.anchor === anchor)).length;
      return [week.week, Math.round((count / (week.sections.length || 1)) * 100)];
    }));
  });
</script>

<svelte:head>
  <title>Course · Math for Designer</title>
</svelte:head>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <section class="border-b border-base-300 bg-base-100">
    <div class="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <div class="badge badge-primary badge-outline mb-4 font-bold">MTH 101 · 12 weeks</div>
      <h1 class="display-title max-w-3xl text-5xl font-black tracking-[-.045em] md:text-7xl">Math for Designer</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-base-content/65">Build mathematical intuition through visual explanations, interactive models, and collaborative play.</p>
      <div class="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-sm">
        <div class="stat-card"><BookOpen/> 12 Interactive Lessons</div>
        <div class="stat-card"><Gamepad2/> 12 Weekly Studio Activities</div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-7 flex items-end justify-between">
      <div>
        <p class="eyebrow">Course syllabus</p>
        <h2 class="text-3xl font-extrabold">Your 12-week path</h2>
      </div>
      <p class="hidden text-sm text-base-content/50 md:block">Lecture · activity · worksheet</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      {#each mathForDesignerWeeks as week, index}
        <article class="week-card group" style={`--week-color:${weekAccent[index]}`}>
          <div class="week-number">{String(week.week).padStart(2, '0')}</div>
          <div class="min-w-0 flex-1">
            <p class="text-xs font-bold uppercase tracking-[.18em] text-base-content/45">Week {week.week}</p>
            <h3 class="mt-1 text-xl font-extrabold leading-tight">{week.title}</h3>
            
            <div class="mt-4">
              <div class="mb-1 flex justify-between text-xs font-bold text-base-content/50">
                <span>Lecture progress</span>
                <span>{weekProgress[week.week] ?? 0}%</span>
              </div>
              <progress class="progress week-progress h-2 w-full" value={weekProgress[week.week] ?? 0} max="100" aria-label={`Week ${week.week} progress`}></progress>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              {#if week.sections.length}
                <a class="btn btn-sm rounded-full" href={lectureSectionPath('math-for-designer', week)}>
                  Learn <ArrowRight size={14}/>
                </a>
              {/if}
              <a class="btn btn-sm btn-ghost rounded-full" href={`/courses/math-for-designer/activity/${week.week}`}>
                Studio Activity
              </a>
              {#if week.worksheet?.length}
                <a class="btn btn-sm btn-ghost rounded-full" href={`/courses/math-for-designer/worksheet/${week.week}`}>
                  Worksheet
                </a>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>
</main>
