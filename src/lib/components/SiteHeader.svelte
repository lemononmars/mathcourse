<script lang="ts">
  import Sigma from '@lucide/svelte/icons/sigma';
  import ThemeToggle from './ThemeToggle.svelte';
  let { compact = false }: { compact?: boolean } = $props();
</script>

<header class={`navbar z-30 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur md:px-7 ${compact ? 'sticky top-0' : ''}`}>
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost gap-2 px-2 text-lg font-extrabold tracking-tight">
      <span class="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-content"><Sigma size={19}/></span>
      <span>Math for Designer</span>
    </a>
  </div>
  <div class="navbar-end gap-1">
    <a href="/course" class="btn btn-ghost btn-sm hidden sm:inline-flex">Course</a>
    <ThemeToggle/>
  </div>
</header>
