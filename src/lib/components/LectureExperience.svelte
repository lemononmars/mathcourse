<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left'; import ArrowRight from '@lucide/svelte/icons/arrow-right'; import Check from '@lucide/svelte/icons/check'; import ChevronLeft from '@lucide/svelte/icons/chevron-left'; import Menu from '@lucide/svelte/icons/menu'; import X from '@lucide/svelte/icons/x';
  import { lectureSectionPath, type CourseWeek } from '$lib/course';
  import CoordinateSystemGraph from './CoordinateSystemGraph.svelte'; import DevMarkdownEditor from './DevMarkdownEditor.svelte'; import InteractiveGraph from './InteractiveGraph.svelte'; import MathText from './MathText.svelte'; import ThemeToggle from './ThemeToggle.svelte'; import VectorConceptGraph from './VectorConceptGraph.svelte';

  let { courseWeek, initialSection = '' }: { courseWeek: CourseWeek; initialSection?: string } = $props();
  let completed = $state<string[]>([]), menu = $state(false);
  let sections = $derived(courseWeek.sections);
  let active = $derived(Math.max(0, sections.findIndex((section) => section.routeSlug === initialSection)));
  let section = $derived(sections[active]);
  let progress = $derived(Math.round((completed.filter((anchor) => sections.some((item) => item.anchor === anchor)).length / sections.length) * 100));
  let coordinateSection = $derived(courseWeek.week === 4 && section?.anchor === 'coordinate');
  let vectorSection = $derived(courseWeek.week === 7 && ['vector', 'non-origin', 'operation'].includes(section?.anchor));

  const storageKey = () => `course-progress:math-for-designer:${courseWeek.week}`;
  onMount(() => {
    try { completed = JSON.parse(localStorage.getItem(storageKey()) ?? '[]'); } catch { completed = []; }
    const legacy = Number(localStorage.getItem(`mfd-progress-${courseWeek.week}`) || 0);
    if (!completed.length && legacy > 0) completed = sections.slice(0, legacy).map((item) => item.anchor);
  });

  function markComplete() {
    if (completed.includes(section.anchor)) return;
    completed = [...completed, section.anchor];
    localStorage.setItem(storageKey(), JSON.stringify(completed));
  }
</script>

<div class="min-h-screen bg-base-100">
  <div class="fixed inset-x-0 top-0 z-50 h-1 bg-base-300"><div class="h-full bg-primary transition-all" style={`width:${progress}%`}></div></div>
  <header class="sticky top-0 z-40 flex h-16 items-center border-b border-base-300 bg-base-100/95 px-3 backdrop-blur md:px-5">
    <button class="btn btn-ghost btn-circle lg:hidden" onclick={() => menu=true} aria-label="Open section menu"><Menu/></button>
    <a class="btn btn-ghost gap-2" href="/courses/math-for-designer"><ChevronLeft size={18}/><span class="hidden sm:inline">Course</span></a>
    <div class="min-w-0 flex-1 text-center"><p class="truncate text-xs font-bold uppercase tracking-[.14em] text-base-content/45">Week {courseWeek.week}</p><h1 class="truncate font-extrabold">{courseWeek.title}</h1></div>
    <div class="flex items-center gap-2"><div class="radial-progress text-primary" style={`--value:${progress};--size:3rem;--thickness:4px`} role="progressbar" aria-label={`${progress}% complete`}><span class="text-xs font-bold">{progress}%</span></div><ThemeToggle/></div>
  </header>
  <div class="mx-auto flex max-w-[1500px]">
    <aside class={`lesson-sidebar ${menu?'is-open':''}`}>
      <div class="flex items-center justify-between p-5 lg:hidden"><b>Sections</b><button class="btn btn-ghost btn-circle" onclick={() => menu=false} aria-label="Close section menu"><X/></button></div>
      <div class="p-5"><p class="eyebrow">In this lecture</p><nav class="mt-3 space-y-1">
        {#each sections as item, index}<a href={lectureSectionPath(courseWeek, index)} class:active={active===index} class="section-link" onclick={() => menu=false}><span>{#if completed.includes(item.anchor)}<Check size={15}/>{:else}{index+1}{/if}</span><span>{item.title}</span></a>{/each}
      </nav></div>
      <div class="mt-auto border-t border-base-300 p-5"><div class="text-sm font-semibold">Need more practice?</div><a class="link link-primary mt-1 text-sm" href={`/courses/math-for-designer/worksheet/${courseWeek.week}`}>Open the worksheet →</a></div>
    </aside>
    {#if menu}<button class="fixed inset-0 z-40 bg-black/30 lg:hidden" onclick={() => menu=false} aria-label="Close menu"></button>{/if}
    <main class="min-w-0 flex-1 px-5 py-9 md:px-10 lg:px-16"><article class="mx-auto max-w-[800px]">
      <div class="mb-8"><p class="eyebrow">Section {active+1} of {sections.length}</p><h1 id={section.anchor} class="display-title mt-2 scroll-mt-24 text-4xl font-black tracking-[-.035em] md:text-5xl">{section.title}</h1><a class="link mt-2 inline-block text-xs text-base-content/45" href={`#${section.anchor}`}>#{section.anchor}</a></div>
      <MathText content={section.content} suppressDiagrams={coordinateSection || vectorSection} numberingPrefix={`${courseWeek.week}.${active+1}`}/>
      {#if coordinateSection}<CoordinateSystemGraph/>{:else if vectorSection}<VectorConceptGraph section={section.anchor as 'vector' | 'non-origin' | 'operation'}/>{:else if courseWeek.week>=3 && courseWeek.week<=8 && active===0}<InteractiveGraph week={courseWeek.week}/>{/if}
      {#if dev}<DevMarkdownEditor section={section}/>{/if}
      <nav class="mt-12 flex items-center justify-between border-t border-base-300 pt-6" aria-label="Section navigation">
        {#if active > 0}<a class="btn btn-ghost" href={lectureSectionPath(courseWeek, active-1)}><ArrowLeft/> Back</a>{:else}<span></span>{/if}
        {#if active < sections.length - 1}<a class="btn btn-primary rounded-full px-6" href={lectureSectionPath(courseWeek, active+1)} onclick={markComplete}>Next section <ArrowRight/></a>{:else}<a class="btn btn-primary rounded-full px-6" href={`/courses/math-for-designer/worksheet/${courseWeek.week}`} onclick={markComplete}>Next: worksheet <ArrowRight/></a>{/if}
      </nav>
    </article></main>
  </div>
</div>
