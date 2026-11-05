<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  import Compass from '@lucide/svelte/icons/compass';
  import Games from './Lecture12Games.svelte';
  import ComplexLab from './Lecture12Complex.svelte';
  import DiceCurves from './Lecture12DiceCurves.svelte';
  const games = [
    { id: 'waiting', label: 'Waiting & rewards' }, { id: 'risk', label: 'Risk' },
    { id: 'yahtzee', label: 'Yahtzee' }, { id: 'cantstop', label: 'Can’t Stop' }
  ] as const;
  const complexModes = [{ id: 'arith', label: 'Complex arithmetic' }, { id: 'polar', label: 'Cis & powers' }, { id: 'roots', label: 'Complex roots' }] as const;
  type Tab = typeof games[number]['id'] | typeof complexModes[number]['id'] | 'curves';
  let active = $state<Tab>('cantstop');
  const isComplex = $derived(active === 'arith' || active === 'polar' || active === 'roots');
  const complexMode = $derived(active === 'polar' || active === 'roots' ? active : 'arith');
</script>

<div class="week12-studio space-y-5 overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-6">
  <header class="space-y-2"><span class="badge badge-primary badge-sm font-bold uppercase">Activity 12 · Interactive studio</span><h2 class="text-2xl font-black tracking-tight sm:text-3xl">Play the odds. Explore the complex plane.</h2><p class="max-w-3xl text-sm text-base-content/65">Try the lecture’s experiments, compare simulated results with exact mathematics, and explore complex numbers using cis notation and degree angles. Each lab keeps its state while you switch tabs.</p></header>
  <label class="block text-sm font-bold sm:hidden">Choose a lab<select class="select select-bordered mt-2 w-full" bind:value={active}><optgroup label="Game simulations">{#each games as game}<option value={game.id}>{game.label}</option>{/each}<option value="curves">Dice curves</option></optgroup><optgroup label="Complex numbers">{#each complexModes as item}<option value={item.id}>{item.label}</option>{/each}</optgroup></select></label>
  <nav class="hidden space-y-2 border-b border-base-300 pb-4 sm:block" aria-label="Activity 12 labs">
    <div class="flex flex-wrap items-center gap-2"><span class="mr-1 flex w-24 items-center gap-1 text-xs font-bold uppercase text-base-content/60"><Dices size={15} /> Games</span>{#each games as game}<button class={`btn btn-sm ${active === game.id ? 'btn-primary' : 'btn-ghost bg-base-200/70'}`} aria-pressed={active === game.id} onclick={() => active = game.id}>{game.label}</button>{/each}<button class={`btn btn-sm ${active === 'curves' ? 'btn-primary' : 'btn-ghost bg-base-200/70'}`} aria-pressed={active === 'curves'} onclick={() => active = 'curves'}>Dice curves</button></div>
    <div class="flex flex-wrap items-center gap-2"><span class="mr-1 flex w-24 items-center gap-1 text-xs font-bold uppercase text-base-content/60"><Compass size={15} /> Complex</span>{#each complexModes as item}<button class={`btn btn-sm ${active === item.id ? 'btn-secondary' : 'btn-ghost bg-base-200/70'}`} aria-pressed={active === item.id} onclick={() => active = item.id}>{item.label}</button>{/each}</div>
  </nav>
  {#each games as game}<div hidden={active !== game.id}><Games mode={game.id} /></div>{/each}
  <div hidden={!isComplex}><ComplexLab mode={complexMode} /></div>
  <div hidden={active !== 'curves'}><DiceCurves /></div>
</div>
