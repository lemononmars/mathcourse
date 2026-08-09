<script lang="ts">
  import Moon from '@lucide/svelte/icons/moon'; import Sun from '@lucide/svelte/icons/sun';
  import { onMount } from 'svelte';
  let dark = false;
  onMount(() => {
    const saved = localStorage.getItem('mfd-theme');
    dark = saved ? saved === 'night' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'night' : 'mfdlight';
  });
  function toggle() {
    dark = !dark;
    document.documentElement.dataset.theme = dark ? 'night' : 'mfdlight';
    localStorage.setItem('mfd-theme', dark ? 'night' : 'mfdlight');
  }
</script>

<button class="btn btn-ghost btn-circle" onclick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
  {#if dark}<Sun size={19}/>{:else}<Moon size={19}/>{/if}
</button>
