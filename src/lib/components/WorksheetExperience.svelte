<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
  import Dices from '@lucide/svelte/icons/dices';
  import Printer from '@lucide/svelte/icons/printer';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import type { CourseWeek } from '$lib/course';
  import SiteHeader from './SiteHeader.svelte';
  import MathText from './MathText.svelte';

  let {
    courseWeek,
    courseSlug = 'math-for-designer'
  }: {
    courseWeek: CourseWeek;
    courseSlug?: string;
  } = $props();

  let seed = $state(0);
  let numericAnswers = $state<Record<number, string>>({});
  let writtenAnswers = $state<Record<number, string>>({});

  const varyNumbers = (text: string, current: number) => {
    let index = 0;
    return text.replace(/\b([2-9]|[1-9]\d)\b/g, (match) => {
      index += 1;
      const number = Number(match);
      return String(Math.max(1, number + ((current * 7 + index * 3) % 7) - 3));
    });
  };

  const solutionGuide = (question: string) => {
    const plain = question.replace(/\$[^$]*\$/g, ' the displayed expression ').replace(/[*_`#]/g, ' ').trim();
    if (/draw|sketch|graph|construct|create|design/i.test(plain)) return 'Answers vary. Check that every requested object is labelled, the stated relationships are visible, and your diagram satisfies each condition in the prompt.';
    if (/explain|describe|compare|interpret|justify|why/i.test(plain)) return 'Answers vary. A complete solution states the relevant definition, applies it to this case, and gives one concrete reason or example supporting the conclusion.';
    if (/vector|coordinate|component|magnitude/i.test(plain)) return 'Write the known coordinates first. Work component-by-component; for a displacement vector subtract endpoint minus start point, and for magnitude use the square root of the sum of squared components.';
    if (/probability|chance|random|sample|event/i.test(plain)) return 'List the equally likely outcomes, count the favourable outcomes, then divide favourable by total. Simplify the resulting fraction or convert it to a decimal.';
    if (/find|calculate|compute|solve|evaluate|simplify|determine/i.test(plain)) return 'Substitute the displayed values into the formula introduced in this week, show one operation per line, and check the result by putting it back into the original condition.';
    return 'Use the definitions and worked examples from this week. Show the rule you chose, each substitution or construction step, and a final sentence that answers the prompt.';
  };

  function reroll() {
    seed += 1;
    numericAnswers = {};
    writtenAnswers = {};
  }

  let questions = $derived(courseWeek.worksheet.map((question) => varyNumbers(question, seed)));
</script>

<main class="min-h-screen bg-base-200/60">
  <SiteHeader compact/>
  <section class="mx-auto max-w-5xl px-5 py-10 md:px-8">
    <a href={`/courses/${courseSlug}`} class="btn btn-ghost btn-sm -ml-3 mb-5">
      <ArrowLeft size={16}/> Course
    </a>
    <div class="worksheet-head">
      <div>
        <p class="eyebrow">Week {courseWeek.week} worksheet</p>
        <h1 class="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title}</h1>
        <p class="mt-3 text-base-content/60">Problem set {seed + 1} · {questions.length} questions</p>
      </div>
      <Dices class="hidden h-24 w-24 text-primary/25 md:block"/>
    </div>
    <div class="mt-6 flex flex-wrap gap-3 print:hidden">
      <button class="btn btn-primary rounded-full" onclick={reroll}>
        <RefreshCw size={17}/> Generate a different set
      </button>
      <button class="btn rounded-full" onclick={() => window.print()}>
        <Printer size={17}/> Print
      </button>
    </div>
    <div class="mt-8 space-y-4">
      {#each questions as question, index}
        <article class="worksheet-question">
          <div class="question-number">{index + 1}</div>
          <div class="min-w-0 flex-1">
            <MathText content={question}/>
            <div class="mt-5 grid gap-3 print:hidden sm:grid-cols-[12rem_1fr]">
              <label class="form-control">
                <span class="label-text mb-1 text-xs font-bold uppercase tracking-wider">Numeric answer</span>
                <input class="input input-bordered w-full" type="number" inputmode="decimal" placeholder="When applicable" bind:value={numericAnswers[index]}/>
              </label>
              <label class="form-control">
                <span class="label-text mb-1 text-xs font-bold uppercase tracking-wider">Working / explanation</span>
                <textarea class="textarea textarea-bordered min-h-20 w-full" placeholder="Show your reasoning" bind:value={writtenAnswers[index]}></textarea>
              </label>
            </div>
            <details class="collapse collapse-arrow mt-4 border border-success/25 bg-success/5 print:hidden">
              <summary class="collapse-title flex items-center gap-2 font-bold text-success">
                <CheckCircle2 size={18}/> Solution / checking guide
              </summary>
              <div class="collapse-content text-sm leading-7 text-base-content/75">{solutionGuide(question)}</div>
            </details>
            <div class="answer-space hidden print:block"></div>
          </div>
        </article>
      {/each}
    </div>
  </section>
</main>
