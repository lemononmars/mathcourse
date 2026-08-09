<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left'; import ArrowRight from '@lucide/svelte/icons/arrow-right'; import Check from '@lucide/svelte/icons/check'; import ChevronLeft from '@lucide/svelte/icons/chevron-left'; import LockKeyhole from '@lucide/svelte/icons/lock-keyhole'; import Menu from '@lucide/svelte/icons/menu'; import X from '@lucide/svelte/icons/x';
  import type { CourseWeek } from '$lib/course';
  import MathText from './MathText.svelte'; import ThemeToggle from './ThemeToggle.svelte'; import InteractiveGraph from './InteractiveGraph.svelte';
  let { courseWeek }: { courseWeek: CourseWeek } = $props();
  let active = $state(0), unlocked = $state(0), selected = $state<string|null>(null), feedback = $state<'correct'|'wrong'|null>(null), menu = $state(false);
  let sections = $derived(courseWeek.sections);
  let progress = $derived(Math.round(((unlocked + 1) / sections.length) * 100));
  let choices = $derived.by(() => {
    const correct = sections[active].title;
    const others = sections.map((section) => section.title).filter((title) => title !== correct).slice(0, 2);
    return [correct, ...others, 'A different mathematical model', 'Historical background'].slice(0, 3).sort((a,b) => (a.charCodeAt(0)+active)%3-(b.charCodeAt(0)+active)%3);
  });
  onMount(() => { const saved = Number(localStorage.getItem(`mfd-progress-${courseWeek.week}`) || 0); unlocked = Math.min(saved, sections.length - 1); active = unlocked; });
  function go(index: number) { if (index > unlocked) return; active=index; selected=null; feedback=null; menu=false; window.scrollTo({top:0,behavior:'smooth'}); }
  function check() { if (!selected) return; const correct=selected===sections[active].title; feedback=correct?'correct':'wrong'; if(correct && active<sections.length-1){unlocked=Math.max(unlocked,active+1); localStorage.setItem(`mfd-progress-${courseWeek.week}`,String(unlocked));} }
</script>

<div class="min-h-screen bg-base-100">
  <div class="fixed inset-x-0 top-0 z-50 h-1 bg-base-300"><div class="h-full bg-primary transition-all" style={`width:${progress}%`}></div></div>
  <header class="sticky top-0 z-40 flex h-16 items-center border-b border-base-300 bg-base-100/95 px-3 backdrop-blur md:px-5">
    <button class="btn btn-ghost btn-circle lg:hidden" onclick={() => menu=true} aria-label="Open section menu"><Menu/></button>
    <a class="btn btn-ghost gap-2" href="/course"><ChevronLeft size={18}/><span class="hidden sm:inline">Course</span></a>
    <div class="min-w-0 flex-1 text-center"><p class="truncate text-xs font-bold uppercase tracking-[.14em] text-base-content/45">Week {courseWeek.week}</p><h1 class="truncate font-extrabold">{courseWeek.title}</h1></div>
    <div class="flex items-center gap-2"><div class="radial-progress text-primary" style={`--value:${progress};--size:3rem;--thickness:4px`} role="progressbar" aria-label={`${progress}% complete`}><span class="text-xs font-bold">{progress}%</span></div><ThemeToggle/></div>
  </header>
  <div class="mx-auto flex max-w-[1500px]">
    <aside class={`lesson-sidebar ${menu?'is-open':''}`}>
      <div class="flex items-center justify-between p-5 lg:hidden"><b>Sections</b><button class="btn btn-ghost btn-circle" onclick={() => menu=false}><X/></button></div>
      <div class="p-5"><p class="eyebrow">In this lecture</p><nav class="mt-3 space-y-1">
        {#each sections as section, index}<button class:active={active===index} class="section-link" disabled={index>unlocked} onclick={() => go(index)}><span>{#if index<unlocked}<Check size={15}/>{:else if index>unlocked}<LockKeyhole size={14}/>{:else}{index+1}{/if}</span><span>{section.title}</span></button>{/each}
      </nav></div>
      <div class="mt-auto border-t border-base-300 p-5"><div class="text-sm font-semibold">Need more practice?</div><a class="link link-primary mt-1 text-sm" href={`/course/worksheet/${courseWeek.week}`}>Open the worksheet →</a></div>
    </aside>
    {#if menu}<button class="fixed inset-0 z-40 bg-black/30 lg:hidden" onclick={() => menu=false} aria-label="Close menu"></button>{/if}
    <main class="min-w-0 flex-1 px-5 py-9 md:px-10 lg:px-16"><article class="mx-auto max-w-[760px]">
      <div class="mb-8"><p class="eyebrow">Section {active+1} of {sections.length}</p><h2 class="display-title mt-2 text-4xl font-black tracking-[-.035em] md:text-5xl">{sections[active].title}</h2></div>
      <MathText content={sections[active].content}/>
      {#if courseWeek.week>=3 && courseWeek.week<=8 && active===0}<InteractiveGraph week={courseWeek.week}/>{/if}
      <section class="checkpoint mt-12"><div class="mb-1 text-sm font-black uppercase tracking-[.14em] text-primary">Checkpoint</div><h3 class="text-2xl font-extrabold">What was the central idea of this section?</h3>
        <div class="mt-5 grid gap-3">{#each choices as choice}<button onclick={() => {selected=choice;feedback=null}} class:selected={selected===choice} class="answer-choice">{choice}</button>{/each}</div>
        {#if feedback}<div class={`alert mt-4 ${feedback==='correct'?'alert-success':'alert-error'}`}><span>{feedback==='correct'?'Exactly — the next section is now open.':'Not quite. Revisit the heading and try once more.'}</span></div>{/if}
        <div class="mt-5 flex justify-between"><button class="btn btn-ghost" disabled={active===0} onclick={() => go(active-1)}><ArrowLeft/> Back</button>
          {#if feedback==='correct' && active<sections.length-1}<button class="btn btn-primary rounded-full px-6" onclick={() => go(active+1)}>Continue <ArrowRight/></button>{:else if active===sections.length-1 && feedback==='correct'}<a class="btn btn-primary rounded-full" href={`/course/worksheet/${courseWeek.week}`}>Start worksheet <ArrowRight/></a>{:else}<button class="btn btn-primary rounded-full px-6" disabled={!selected} onclick={check}>Check answer</button>{/if}
        </div>
      </section>
    </article></main>
  </div>
</div>
