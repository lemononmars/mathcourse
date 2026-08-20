<script lang="ts">
  import { dev } from '$app/environment';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import BookOpen from '@lucide/svelte/icons/book-open';
  import CircleDot from '@lucide/svelte/icons/circle-dot';
  import MoveUpRight from '@lucide/svelte/icons/move-up-right';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { courses } from '$lib/course';

  let selectedLang = $state<'all' | 'en' | 'th'>('all');
  let availableCourses = $derived(courses.filter((c) => !c.devOnly || dev));
  let filteredCourses = $derived(
    selectedLang === 'all'
      ? availableCourses
      : availableCourses.filter((c) => c.lang === selectedLang)
  );
</script>

<svelte:head>
  <title>Math for Designer · Interactive Learning Platform</title>
  <meta name="description" content="Visual, interactive mathematics course for game designers and creative technologists."/>
</svelte:head>

<main class="min-h-screen bg-base-100">
  <SiteHeader/>

  <!-- Hero Section -->
  <section class="hero-grid relative mx-auto grid min-h-[calc(75vh-65px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
    <div class="relative z-10 max-w-2xl">
      <div class="mb-5 flex items-center gap-2 text-sm font-bold text-primary">
        <Sparkles size={17}/> Interactive Learning Platform
      </div>
      <h1 class="display-title text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">
        See the pattern.<br/><span class="text-primary">Master the math.</span>
      </h1>
      <p class="mt-7 max-w-xl text-lg leading-8 text-base-content/70">
        Build mathematical intuition through visual explanations, interactive models, and collaborative game mechanics tailored for Game Designers (DD211).
      </p>
      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a class="btn btn-primary btn-lg rounded-full px-7" href="/courses/math-for-designer">
          Start Math for Designer <ArrowRight size={19}/>
        </a>
        {#if dev}
          <a class="btn btn-outline btn-lg rounded-full" href="#courses">
            View All Courses ({availableCourses.length})
          </a>
        {/if}
      </div>
    </div>

    <div class="relative mx-auto aspect-square w-full max-w-[480px]">
      <div class="absolute inset-[8%] rotate-6 rounded-[36%_64%_63%_37%/47%_40%_60%_53%] bg-primary/10"></div>
      <div class="absolute left-[11%] top-[16%] grid h-[42%] w-[42%] place-items-center rounded-full border-[14px] border-secondary/80 bg-base-100/70 text-7xl font-black shadow-xl backdrop-blur">∑</div>
      <div class="absolute right-[8%] top-[26%] h-[38%] w-[38%] rotate-12 rounded-3xl bg-primary p-7 text-primary-content shadow-2xl">
        <MoveUpRight class="h-full w-full" strokeWidth={1.2}/>
      </div>
      <div class="absolute bottom-[8%] left-[28%] flex h-[30%] w-[58%] items-center justify-center gap-3 rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
        <CircleDot class="translate-y-2 text-accent" size={44}/>
        <CircleDot class="-translate-y-2 text-accent" size={52}/>
        <CircleDot class="translate-y-2 text-accent" size={60}/>
      </div>
    </div>
  </section>

  <!-- Courses Catalog Section -->
  <section id="courses" class="border-t border-base-300 bg-base-200/50 py-16 px-6 lg:px-12">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <p class="eyebrow">Curriculum</p>
            {#if dev}
              <span class="badge badge-warning badge-sm font-bold">DEV MODE</span>
            {/if}
          </div>
          <h2 class="display-title text-4xl font-black tracking-[-.04em] sm:text-5xl mt-1">Available Courses</h2>
        </div>

        {#if dev}
          <!-- Language Filter Tabs (Dev Only) -->
          <div class="tabs tabs-boxed bg-base-100 border border-base-300 p-1.5 rounded-2xl flex gap-1 self-start md:self-auto">
            <button
              class={`tab tab-sm font-bold rounded-xl transition-all ${selectedLang === 'all' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
              onclick={() => (selectedLang = 'all')}
            >
              All ({availableCourses.length})
            </button>
            <button
              class={`tab tab-sm font-bold rounded-xl transition-all ${selectedLang === 'en' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
              onclick={() => (selectedLang = 'en')}
            >
              English
            </button>
            <button
              class={`tab tab-sm font-bold rounded-xl transition-all ${selectedLang === 'th' ? 'tab-active !bg-primary !text-primary-content' : ''}`}
              onclick={() => (selectedLang = 'th')}
            >
              ภาษาไทย
            </button>
          </div>
        {/if}
      </div>

      <!-- Course Cards Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each filteredCourses as course}
          <div class="card border border-base-300 bg-base-100 shadow-xl transition-all hover:shadow-2xl hover:border-primary/50 flex flex-col justify-between p-7 rounded-3xl">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-1.5">
                  <span class="badge badge-primary font-bold">{course.code}</span>
                  {#if course.devOnly}
                    <span class="badge badge-warning font-bold">DEV</span>
                  {/if}
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="badge badge-outline badge-sm font-bold uppercase">{course.lang === 'th' ? 'TH' : 'EN'}</span>
                  <span class="text-xs font-bold text-base-content/50 uppercase tracking-wider">{course.weeksCount} WEEKS</span>
                </div>
              </div>
              <h3 class="text-xl font-black text-base-content mb-2">{course.title}</h3>
              <p class="text-base-content/70 leading-relaxed text-xs line-clamp-3">{course.description}</p>
            </div>

            <div class="mt-6 pt-5 border-t border-base-200 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 text-xs font-bold text-base-content/60">
                <BookOpen size={14} /> {course.weeksCount} Lessons
              </div>
              <a href={`/courses/${course.slug}`} class="btn btn-primary btn-sm rounded-full px-4 gap-1.5">
                Open Course <ArrowRight size={13}/>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>
