<script lang="ts">
  import { dev } from '$app/environment';
  import Sigma from '@lucide/svelte/icons/sigma';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import ThemeToggle from './ThemeToggle.svelte';
  import { courses } from '$lib/course';

  let { compact = false }: { compact?: boolean } = $props();
  let visibleCourses = $derived(courses.filter((c) => !c.devOnly || dev));
</script>

<header class={`navbar z-30 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur md:px-7 ${compact ? 'sticky top-0' : ''}`}>
  <div class="navbar-start gap-2">
    <a href="/" class="btn btn-ghost gap-2 px-2 text-lg font-extrabold tracking-tight">
      <span class="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-content"><Sigma size={19}/></span>
      <span class="hidden sm:inline">Creative Math</span>
    </a>

    {#if visibleCourses.length > 1}
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm gap-1 font-bold">
          Courses <ChevronDown size={14}/>
        </div>
        <ul class="dropdown-content menu z-[1] mt-2 w-72 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">
          {#each visibleCourses as course}
            <li>
              <a href={`/courses/${course.slug}`} class="flex flex-col items-start gap-0.5 py-2">
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-sm text-base-content">{course.shortTitle}</span>
                  {#if course.devOnly}
                    <span class="badge badge-warning badge-xs font-bold">DEV</span>
                  {/if}
                </div>
                <span class="text-[11px] text-base-content/60">{course.code} · {course.weeksCount} Weeks</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <a href="/courses/math-for-designer" class="btn btn-ghost btn-sm font-bold">
        Math for Designer
      </a>
    {/if}
  </div>

  <div class="navbar-end gap-2">
    <ThemeToggle/>
  </div>
</header>
