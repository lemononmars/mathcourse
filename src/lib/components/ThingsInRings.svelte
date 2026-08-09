<script lang="ts">
  import Eye from '@lucide/svelte/icons/eye'; import EyeOff from '@lucide/svelte/icons/eye-off'; import RefreshCw from '@lucide/svelte/icons/refresh-cw'; import Users from '@lucide/svelte/icons/users'; import UserRound from '@lucide/svelte/icons/user-round';
  type Puzzle={categories:string[];objects:{name:string;rings:number[]}[]};
  const puzzles:Puzzle[]=[
    {categories:['Can fly','Is alive','Is usually red'],objects:[{name:'Robin',rings:[0,1,2]},{name:'Airplane',rings:[0]},{name:'Rose',rings:[1,2]},{name:'Ladybird',rings:[0,1,2]},{name:'Brick',rings:[2]},{name:'Penguin',rings:[1]},{name:'Red kite',rings:[0,2]},{name:'Spoon',rings:[]}]},
    {categories:['Found in a kitchen','Contains a circle','Made of metal'],objects:[{name:'Frying pan',rings:[0,1,2]},{name:'Clock',rings:[1]},{name:'Fork',rings:[0,2]},{name:'Coin',rings:[1,2]},{name:'Towel',rings:[0]},{name:'Bicycle',rings:[1,2]},{name:'Whisk',rings:[0,1,2]},{name:'Cloud',rings:[]}]},
    {categories:['Has four legs','Can be sat on','Has a pattern'],objects:[{name:'Striped chair',rings:[0,1,2]},{name:'Zebra',rings:[0,2]},{name:'Stool',rings:[0,1]},{name:'Beanbag',rings:[1]},{name:'Wallpaper',rings:[2]},{name:'Table',rings:[0]},{name:'Picnic blanket',rings:[1,2]},{name:'Moon',rings:[]}]}
  ];
  const placements=[[],[0],[1],[2],[0,1],[0,2],[1,2],[0,1,2]];
  let mode=$state<'solo'|'host'>('solo'), puzzleIndex=$state(0), cardIndex=$state(0), guess=$state<number[]>([]), message=$state(''), revealed=$state(false);
  let puzzle=$derived(puzzles[puzzleIndex]), card=$derived(puzzle.objects[cardIndex]);
  const regionLabel=(rings:number[],categories:string[])=>rings.length?rings.map((ring)=>categories[ring]).join(' + '):'Outside all rings';
  function reset(){puzzleIndex=(puzzleIndex+1)%puzzles.length;cardIndex=0;guess=[];message='';revealed=false;}
  function submit(){const correct=[...card.rings].sort().join()===[...guess].sort().join();message=correct?'Correct placement — good deduction!':'That card belongs somewhere else. Use the examples and try again.';if(correct)setTimeout(()=>{cardIndex=(cardIndex+1)%puzzle.objects.length;guess=[];message='';},850);}
</script>

<section class="rings-game">
  <div class="flex flex-wrap items-center justify-between gap-4"><div><p class="eyebrow">Week 1 activity</p><h2 class="display-title text-4xl font-black tracking-[-.04em]">Things in Rings</h2></div><div class="tabs tabs-box"><button class:tab-active={mode==='solo'} class="tab gap-2" onclick={() => mode='solo'}><UserRound size={16}/> Solo</button><button class:tab-active={mode==='host'} class="tab gap-2" onclick={() => mode='host'}><Users size={16}/> Host</button></div></div>
  <p class="mt-3 max-w-2xl text-base-content/65">{mode==='solo'?'Deduce the three hidden rules from the object cards, then place the next card in the correct region.':'Generate category cards, then guide a group as they suggest objects and discover how the rings overlap.'}</p>
  <div class="mt-7 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
    <div class="game-panel"><div class="flex items-center justify-between"><h3 class="font-extrabold">Category cards</h3><button class="btn btn-ghost btn-sm" onclick={() => revealed=!revealed}>{#if revealed||mode==='host'}<EyeOff size={16}/> Hide{:else}<Eye size={16}/> Reveal{/if}</button></div>
      <div class="mt-4 space-y-3">{#each puzzle.categories as category,index}<div class={`category-card ring-${index}`}><span>Ring {String.fromCharCode(65+index)}</span><b>{revealed||mode==='host'?category:'???'}</b></div>{/each}</div><button class="btn mt-4 w-full rounded-full" onclick={reset}><RefreshCw size={16}/> New categories</button>
    </div>
    <div class="game-panel">{#if mode==='solo'}
      <div class="object-card"><span>Place this object</span><strong>{card.name}</strong></div><div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{#each placements as placement}<button class:selected={guess.join()===placement.join()} class="placement-btn" onclick={() => {guess=placement;message=''}}>{regionLabel(placement,['A','B','C'])}</button>{/each}</div>
      <button class="btn btn-primary mt-4 w-full rounded-full" onclick={submit}>Check placement</button>{#if message}<div class={`alert mt-3 ${message.startsWith('Correct')?'alert-success':'alert-warning'}`}>{message}</div>{/if}
      <div class="mt-5"><p class="mb-2 text-xs font-bold uppercase tracking-wider text-base-content/45">Clue cards already placed</p><div class="flex flex-wrap gap-2">{#each puzzle.objects.filter((_,index)=>index!==cardIndex).slice(0,4) as object}<span class="badge badge-lg">{object.name} · {regionLabel(object.rings,['A','B','C'])}</span>{/each}</div></div>
    {:else}<h3 class="text-xl font-extrabold">Object deck</h3><p class="mt-1 text-sm text-base-content/55">Use these ready-made examples, or invite players to suggest their own.</p><div class="mt-5 grid grid-cols-2 gap-3">{#each puzzle.objects as object}<div class="host-object"><b>{object.name}</b><span>{regionLabel(object.rings,['A','B','C'])}</span></div>{/each}</div>{/if}</div>
  </div>
</section>
