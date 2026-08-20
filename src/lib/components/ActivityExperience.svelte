<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Blocks from '@lucide/svelte/icons/blocks';
  import Users from '@lucide/svelte/icons/users';
  import type { CourseWeek } from '$lib/course';
  import MathText from './MathText.svelte';
  import SiteHeader from './SiteHeader.svelte';
  import ThingsInRings from './ThingsInRings.svelte';
  import Week2InteractiveActivities from './Week2InteractiveActivities.svelte';
  import Week3InteractiveActivities from './Week3InteractiveActivities.svelte';
  import Week4InteractiveActivities from './Week4InteractiveActivities.svelte';
  import Week5InteractiveActivities from './Week5InteractiveActivities.svelte';
  import Week6InteractiveActivities from './Week6InteractiveActivities.svelte';
  import Week7InteractiveActivities from './Week7InteractiveActivities.svelte';
  import Week8InteractiveActivities from './Week8InteractiveActivities.svelte';
  import Week9InteractiveActivities from './Week9InteractiveActivities.svelte';
  import Week10InteractiveActivities from './Week10InteractiveActivities.svelte';
  import Week11InteractiveActivities from './Week11InteractiveActivities.svelte';
  import Week12InteractiveActivities from './Week12InteractiveActivities.svelte';

  let { courseWeek }: { courseWeek: CourseWeek } = $props();
</script>

<main class="min-h-screen bg-base-200/50">
  <SiteHeader compact/>
  <div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
    <a href="/courses/math-for-designer" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex">
      <ArrowLeft size={16}/> Course
    </a>
    <header class="mb-8 hidden sm:block">
      <p class="eyebrow">Week {courseWeek.week} studio</p>
      <h1 class="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title} activities</h1>
    </header>

    {#if courseWeek.week === 1}
      <ThingsInRings/>
    {:else if courseWeek.week === 2}
      <Week2InteractiveActivities/>
    {:else if courseWeek.week === 3}
      <Week3InteractiveActivities/>
    {:else if courseWeek.week === 4}
      <Week4InteractiveActivities/>
    {:else if courseWeek.week === 5}
      <Week5InteractiveActivities/>
    {:else if courseWeek.week === 6}
      <Week6InteractiveActivities/>
    {:else if courseWeek.week === 7}
      <Week7InteractiveActivities/>
    {:else if courseWeek.week === 8}
      <Week8InteractiveActivities/>
    {:else if courseWeek.week === 9}
      <Week9InteractiveActivities/>
    {:else if courseWeek.week === 10}
      <Week10InteractiveActivities/>
    {:else if courseWeek.week === 11}
      <Week11InteractiveActivities/>
    {:else if courseWeek.week === 12}
      <Week12InteractiveActivities/>
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
