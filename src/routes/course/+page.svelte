<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right'; import BookOpen from '@lucide/svelte/icons/book-open'; import Gamepad2 from '@lucide/svelte/icons/gamepad-2'; import PenLine from '@lucide/svelte/icons/pen-line';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { weeks, weekAccent } from '$lib/course';
</script>

<svelte:head><title>Course · Math for Designer</title></svelte:head>
<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <section class="border-b border-base-300 bg-base-100"><div class="mx-auto max-w-6xl px-6 py-14 md:py-20">
    <div class="badge badge-primary badge-outline mb-4 font-bold">MTH 101 · 12 weeks</div>
    <h1 class="display-title max-w-3xl text-5xl font-black tracking-[-.045em] md:text-7xl">Math for Designer</h1>
    <p class="mt-5 max-w-2xl text-lg leading-8 text-base-content/65">Build mathematical intuition through visual explanations, interactive models, worksheets, and collaborative play.</p>
    <div class="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm"><div class="stat-card"><BookOpen/> Interactive lessons</div><div class="stat-card"><PenLine/> Fresh worksheets</div><div class="stat-card"><Gamepad2/> Weekly activities</div></div>
  </div></section>
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-7 flex items-end justify-between"><div><p class="eyebrow">Course syllabus</p><h2 class="text-3xl font-extrabold">Your 12-week path</h2></div><p class="hidden text-sm text-base-content/50 md:block">Lecture · worksheet · activity</p></div>
    <div class="grid gap-4 md:grid-cols-2">
      {#each weeks as week, index}
        <article class="week-card group" style={`--week-color:${weekAccent[index]}`}>
          <div class="week-number">{String(week.week).padStart(2, '0')}</div>
          <div class="min-w-0 flex-1"><p class="text-xs font-bold uppercase tracking-[.18em] text-base-content/45">Week {week.week}</p><h3 class="mt-1 text-xl font-extrabold leading-tight">{week.title}</h3>
            <div class="mt-4 flex flex-wrap gap-2"><a class="btn btn-sm rounded-full" href={`/course/lecture/${week.week}`}>Learn <ArrowRight size={14}/></a><a class="btn btn-sm btn-ghost rounded-full" href={`/course/worksheet/${week.week}`}>Worksheet</a><a class="btn btn-sm btn-ghost rounded-full" href={`/course/activity/${week.week}`}>Activity</a></div>
          </div>
        </article>
      {/each}
    </div>
  </section>
</main>
