<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left'; import Blocks from '@lucide/svelte/icons/blocks'; import Users from '@lucide/svelte/icons/users';
  import type { CourseWeek } from '$lib/course'; import MathText from './MathText.svelte'; import SiteHeader from './SiteHeader.svelte'; import ThingsInRings from './ThingsInRings.svelte'; import Week2InteractiveActivities from './Week2InteractiveActivities.svelte';
  let { courseWeek }:{courseWeek:CourseWeek}=$props();
</script>

<main class="min-h-screen bg-base-200/50"><SiteHeader compact/><div class="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-10">
  <a href="/courses/math-for-designer" class="btn btn-ghost btn-sm -ml-3 mb-4 hidden sm:inline-flex"><ArrowLeft size={16}/> Course</a>
  <header class="mb-8 hidden sm:block"><p class="eyebrow">Week {courseWeek.week} studio</p><h1 class="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title} activities</h1></header>
  {#if courseWeek.week===1}
    <ThingsInRings/>
  {:else if courseWeek.week===2}
    <Week2InteractiveActivities/>
  {/if}
  {#if courseWeek.activity.length && courseWeek.week > 2}
    <div class="mt-8 space-y-6">{#each courseWeek.activity as activity, index}<section class="interactive-card"><p class="eyebrow">Activity {index+1}</p><h2 class="mt-2 text-3xl font-extrabold">{activity.title}</h2><div class="mt-5"><MathText content={activity.content} numberingPrefix={`${courseWeek.week}.A${index+1}`}/></div></section>{/each}</div>
  {:else if courseWeek.week > 2}
    <section class="activity-placeholder"><div class="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary"><Blocks size={38}/></div><h2 class="display-title mt-6 text-4xl font-black">Studio activity coming soon</h2><p class="mt-4 max-w-xl text-lg leading-8 text-base-content/65">This week does not yet include an activity section in the source lecture.</p></section>
  {/if}
</div></main>
