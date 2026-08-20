<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Blocks from '@lucide/svelte/icons/blocks';
  import type { CourseWeek } from '$lib/course';
  import MathText from '../MathText.svelte';
  import SiteHeader from '../SiteHeader.svelte';
  import PSWeek1InteractiveActivities from './PSWeek1InteractiveActivities.svelte';
  import PSWeek2InteractiveActivities from './PSWeek2InteractiveActivities.svelte';
  import PSWeek3InteractiveActivities from './PSWeek3InteractiveActivities.svelte';
  import PSWeek4InteractiveActivities from './PSWeek4InteractiveActivities.svelte';
  import PSWeek5InteractiveActivities from './PSWeek5InteractiveActivities.svelte';
  import PSWeek6InteractiveActivities from './PSWeek6InteractiveActivities.svelte';
  import PSWeek7InteractiveActivities from './PSWeek7InteractiveActivities.svelte';
  import PSWeek8InteractiveActivities from './PSWeek8InteractiveActivities.svelte';
  import PSWeek9InteractiveActivities from './PSWeek9InteractiveActivities.svelte';
  import PSWeek10InteractiveActivities from './PSWeek10InteractiveActivities.svelte';
  import PSWeek11InteractiveActivities from './PSWeek11InteractiveActivities.svelte';
  import PSWeek12InteractiveActivities from './PSWeek12InteractiveActivities.svelte';

  let { courseWeek }: { courseWeek: CourseWeek } = $props();
</script>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
    <a href="/courses/prob-and-stat-for-gad" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex">
      <ArrowLeft size={16}/> Course
    </a>
    <header class="mb-8 hidden sm:block">
      <p class="eyebrow">Prob & Stat · Week {courseWeek.week} studio</p>
      <h1 class="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title} activities</h1>
    </header>

    {#if courseWeek.week === 1}
      <PSWeek1InteractiveActivities/>
    {:else if courseWeek.week === 2}
      <PSWeek2InteractiveActivities/>
    {:else if courseWeek.week === 3}
      <PSWeek3InteractiveActivities/>
    {:else if courseWeek.week === 4}
      <PSWeek4InteractiveActivities/>
    {:else if courseWeek.week === 5}
      <PSWeek5InteractiveActivities/>
    {:else if courseWeek.week === 6}
      <PSWeek6InteractiveActivities/>
    {:else if courseWeek.week === 7}
      <PSWeek7InteractiveActivities/>
    {:else if courseWeek.week === 8}
      <PSWeek8InteractiveActivities/>
    {:else if courseWeek.week === 9}
      <PSWeek9InteractiveActivities/>
    {:else if courseWeek.week === 10}
      <PSWeek10InteractiveActivities/>
    {:else if courseWeek.week === 11}
      <PSWeek11InteractiveActivities/>
    {:else if courseWeek.week === 12}
      <PSWeek12InteractiveActivities/>
    {/if}

    {#if courseWeek.activity.length}
      <div class="mt-8 space-y-6">
        {#each courseWeek.activity as activity, index}
          <section class="interactive-card">
            <p class="eyebrow">Activity {index + 1}</p>
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
