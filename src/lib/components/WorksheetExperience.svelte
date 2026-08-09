<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left'; import Dices from '@lucide/svelte/icons/dices'; import Printer from '@lucide/svelte/icons/printer'; import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import type { CourseWeek } from '$lib/course'; import SiteHeader from './SiteHeader.svelte'; import MathText from './MathText.svelte';
  let { courseWeek }: { courseWeek: CourseWeek } = $props(); let seed=$state(0);
  const varyNumbers=(text:string,current:number)=>{let index=0;return text.replace(/\b([2-9]|[1-9]\d)\b/g,(match)=>{index+=1;const number=Number(match);return String(Math.max(1,number+((current*7+index*3)%7)-3));});};
  let questions=$derived(courseWeek.worksheet.map((question)=>varyNumbers(question,seed)));
</script>

<main class="min-h-screen bg-base-200/60"><SiteHeader compact/><section class="mx-auto max-w-5xl px-5 py-10 md:px-8">
  <a href="/course" class="btn btn-ghost btn-sm -ml-3 mb-5"><ArrowLeft size={16}/> Course</a>
  <div class="worksheet-head"><div><p class="eyebrow">Week {courseWeek.week} worksheet</p><h1 class="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title}</h1><p class="mt-3 text-base-content/60">Problem set {seed+1} · {questions.length} questions</p></div><Dices class="hidden h-24 w-24 text-primary/25 md:block"/></div>
  <div class="mt-6 flex flex-wrap gap-3 print:hidden"><button class="btn btn-primary rounded-full" onclick={() => seed+=1}><RefreshCw size={17}/> Generate a different set</button><button class="btn rounded-full" onclick={() => window.print()}><Printer size={17}/> Print</button></div>
  <div class="mt-8 space-y-4">{#each questions as question,index}<article class="worksheet-question"><div class="question-number">{index+1}</div><div class="min-w-0 flex-1"><MathText content={question}/><div class="answer-space"></div></div></article>{/each}</div>
</section></main>
