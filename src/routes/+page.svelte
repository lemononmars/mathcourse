<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import CircleDot from '@lucide/svelte/icons/circle-dot';
  import MoveUpRight from '@lucide/svelte/icons/move-up-right';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
</script>

<svelte:head>
  <title>Math for Designer</title>
  <meta name="description" content="A visual, interactive 12-week mathematics course for creative thinkers."/>
  <meta property="og:title" content="Math for Designer"/><meta property="og:description" content="See the pattern. Shape the idea."/><meta property="og:image" content="/og.png"/>
</svelte:head>

<main class="min-h-screen overflow-hidden bg-base-100">
  <SiteHeader/>
  <section class="hero-grid relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
    <div class="relative z-10 max-w-2xl">
      <div class="mb-5 flex items-center gap-2 text-sm font-bold text-primary"><Sparkles size={17}/> Interactive mathematics</div>
      <h1 class="display-title text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">See the pattern.<br/><span class="text-primary">Shape the idea.</span></h1>
      <p class="mt-7 max-w-xl text-lg leading-8 text-base-content/70">A visual, hands-on math course for creative thinkers. Explore each idea, play with it, and prove you understand it before moving forward.</p>
      <div class="mt-9 flex flex-wrap gap-3"><a class="btn btn-primary btn-lg rounded-full px-7" href="/course">Explore the course <ArrowRight size={19}/></a><span class="flex items-center px-3 text-sm text-base-content/55">12 weeks · self-paced</span></div>
    </div>
    <div class="relative mx-auto aspect-square w-full max-w-[520px]">
      <div class="absolute inset-[8%] rotate-6 rounded-[36%_64%_63%_37%/47%_40%_60%_53%] bg-primary/10"></div>
      <div class="absolute left-[11%] top-[16%] grid h-[42%] w-[42%] place-items-center rounded-full border-[14px] border-secondary/80 bg-base-100/70 text-7xl font-black shadow-xl backdrop-blur">π</div>
      <div class="absolute right-[8%] top-[26%] h-[38%] w-[38%] rotate-12 rounded-3xl bg-primary p-7 text-primary-content shadow-2xl"><MoveUpRight class="h-full w-full" strokeWidth={1.2}/></div>
      <div class="absolute bottom-[8%] left-[28%] flex h-[30%] w-[58%] items-center justify-center gap-3 rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
        <CircleDot class="translate-y-2 text-accent" size={44}/><CircleDot class="-translate-y-2 text-accent" size={52}/><CircleDot class="translate-y-2 text-accent" size={60}/>
      </div>
    </div>
  </section>
</main>
