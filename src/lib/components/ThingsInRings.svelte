<script lang="ts">
  import { onMount } from 'svelte';
  import Eye from '@lucide/svelte/icons/eye';
  import EyeOff from '@lucide/svelte/icons/eye-off';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Users from '@lucide/svelte/icons/users';
  import UserRound from '@lucide/svelte/icons/user-round';
  import { officialCards, soloPuzzles, type RingIndex } from '$lib/things-in-rings-data';

  type Deck = keyof typeof officialCards;
  type HostObject = { name: string; syllables: number; compound?: boolean; context: string[]; attribute: string[] };
  const colors = ['#f3c623', '#ff6b6b', '#4c6ef5'];
  const ringNames = ['Word', 'Context', 'Attribute'];
  const regionPoints: Record<string, [number, number]> = { '': [4.15, -3.15], '0': [-2.5, 1.4], '1': [2.5, 1.4], '2': [0, -2.65], '0,1': [0, 1.75], '0,2': [-1.2, -.72], '1,2': [1.2, -.72], '0,1,2': [0, .18] };
  const hostObjects: HostObject[] = [
    { name: 'Phone', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME','MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT IN AN OFFICE','YOU EXPECT TO FIND IT AT A SCHOOL','MAN-MADE','USEFUL','CAN BE BOUGHT IN A STORE','MOST PEOPLE SEE IT REGULARLY','CAN BE FOUND IN THIS BUILDING','PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['CONTAINS PLASTIC','SHINY OR REFLECTIVE','OFTEN MAKES A SOUND','OFTEN HAS WRITING ON IT','COULD BE HELD WITH ONE HAND',"SHOULDN'T GET WET",'HAS A STANDARD SIZE','TYPICALLY THE SAME SIZE','EASY TO CLEAN'] },
    { name: 'Tree', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT','MOSTLY FOUND OUTSIDE','USEFUL','YOU CAN FIND IT WITHIN AN HOUR FROM HERE','USUALLY FOUND WITH OTHERS NEARBY','MOST PEOPLE SEE IT REGULARLY','USUALLY FOUND IN RURAL AREAS','EXPECTED TO LAST 100+ YEARS','COULD HELP YOU SURVIVE IN THE WILDERNESS','SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON','USUALLY ROUND OR CURVED','ALIVE','CONTAINS WOOD','WEIGHS MORE THAN A CHAIR','WOULD HURT IF DROPPED ON YOU','FLAMMABLE','USUALLY A SINGLE COLOR','HAS A STANDARD SIZE'] },
    { name: 'Spoon', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME','MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT AT A SCHOOL','MAN-MADE','USEFUL','CAN BE BOUGHT IN A STORE','CAN BE FOUND IN THIS BUILDING','PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['USUALLY ROUND OR CURVED','SHINY OR REFLECTIVE','COULD BE HELD WITH ONE HAND','HAS A STANDARD SIZE','TYPICALLY THE SAME SIZE','EASY TO CLEAN'] },
    { name: 'School bus', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT AT A SCHOOL','CAN BE DANGEROUS','MOSTLY FOUND OUTSIDE','MAN-MADE','USEFUL','USUALLY WORTH MORE THAN $100','USUALLY FOUND WITH OTHERS NEARBY','MOST PEOPLE SEE IT REGULARLY','CAN BE FOUND IN THIS BUILDING'], attribute: ['BIGGER THAN A PERSON','CONTAINS PLASTIC','SHINY OR REFLECTIVE','WEIGHS MORE THAN A CHAIR','WOULD HURT IF DROPPED ON YOU','FLAMMABLE','OFTEN MAKES A SOUND','OFTEN HAS WRITING ON IT',"SHOULDN'T GET WET",'HAS A STANDARD SIZE'] },
    { name: 'Apple', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME','MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT AT A SCHOOL','USEFUL','CAN BE BOUGHT IN A STORE','MAKES PEOPLE HAPPY','EASILY FOUND IF LOST','USUALLY FOUND WITH OTHERS NEARBY','CAN BE FOUND IN THIS BUILDING','PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['USUALLY ROUND OR CURVED','EASY TO DESTROY','ALIVE','HAS A STRONG TASTE','COULD BE HELD WITH ONE HAND','TYPICALLY THE SAME SIZE','EASY TO CLEAN'] },
    { name: 'Mirror', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME','MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT IN AN OFFICE','YOU EXPECT TO FIND IT AT A SCHOOL','MAN-MADE','USEFUL','CAN BE BOUGHT IN A STORE','CAN BE FOUND IN THIS BUILDING'], attribute: ['SHINY OR REFLECTIVE','EASY TO DESTROY','YOU CAN LOOK THROUGH IT','WOULD HURT IF DROPPED ON YOU','COULD BE HELD WITH ONE HAND','HAS A STANDARD SIZE'] },
    { name: 'Dragon', syllables: 2, context: ['CAN BE DANGEROUS','SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON','HAS A POINT OR SPIKE','ALIVE','OFTEN HAS SPOTS OR STRIPES','WEIGHS MORE THAN A CHAIR','WOULD HURT IF DROPPED ON YOU','FLAMMABLE','OFTEN MAKES A SOUND'] },
    { name: 'Notebook', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME','MOST PEOPLE HAVE TOUCHED IT','YOU EXPECT TO FIND IT IN AN OFFICE','YOU EXPECT TO FIND IT AT A SCHOOL','MAN-MADE','USEFUL','CAN BE BOUGHT IN A STORE','CAN BE FOUND IN THIS BUILDING','PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['CONTAINS WOOD','EASY TO DESTROY','FLAMMABLE','OFTEN HAS WRITING ON IT','COULD BE HELD WITH ONE HAND',"SHOULDN'T GET WET",'HAS A STANDARD SIZE','TYPICALLY THE SAME SIZE'] }
  ];

  let mode = $state<'solo' | 'host'>('solo');
  let puzzleIndex = $state(0), cardIndex = $state(4), guess = $state<RingIndex[]>([]), message = $state('');
  let revealed = $state([false, false, false]), score = $state(0), moves = $state(0), placed = $state<{name:string;rings:RingIndex[]}[]>([]);
  let hostCards = $state<[string,string,string]>(['','','']), hostHidden = $state([false,false,false]), hostObjectIndex = $state(0);
  let board: any, mounted = false;
  let puzzle = $derived(soloPuzzles[puzzleIndex]), card = $derived(puzzle.objects[cardIndex % puzzle.objects.length]);
  let hostObject = $derived(hostObjects[hostObjectIndex]);

  const regionKey = (rings: readonly number[]) => [...rings].sort().join(',');
  const regionLabel = (rings: readonly number[]) => rings.length ? rings.map((ring) => ringNames[ring]).join(' + ') : 'Outside all rings';
  const pick = <T,>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)];
  const difficulty = (deck: Deck, cardText: string) => Math.floor(Math.max(0, (officialCards[deck] as readonly string[]).indexOf(cardText)) / 8) + 1;
  const stars = (level: number) => '★'.repeat(level) + '☆'.repeat(3-level);

  function wordMatches(rule: string, object: HostObject) {
    const letters = object.name.toUpperCase().replace(/[^A-Z]/g, '');
    const vowels = new Set(letters.match(/[AEIOU]/g) ?? []);
    const counts = [...letters].reduce<Record<string,number>>((all, letter) => ({...all,[letter]:(all[letter]??0)+1}), {});
    const first = letters[0] ?? '', second = letters[1] ?? '';
    if (rule === 'HAS 1 SYLLABLE') return object.syllables === 1;
    if (rule === 'HAS 2 SYLLABLES') return object.syllables === 2;
    if (rule === '5 OR FEWER LETTERS LONG') return letters.length <= 5;
    if (rule.startsWith('HAS A CONSECUTIVE DOUBLE')) return /(.)\1/.test(letters);
    if (rule === 'HAS AN "O"') return letters.includes('O'); if (rule === 'HAS AN "R"') return letters.includes('R');
    if (rule === 'EXACTLY 5 LETTERS LONG') return letters.length === 5;
    if (rule === 'STARTS WITH A VOWEL OR "Y"') return /^[AEIOUY]/.test(letters);
    if (rule === 'STARTS WITH A LETTER FROM "A"-"M"') return first >= 'A' && first <= 'M';
    if (rule === 'HAS 2 OR MORE DIFFERENT VOWELS') return vowels.size >= 2;
    if (rule === 'HAS 4 OR FEWER UNIQUE LETTERS') return new Set(letters).size <= 4;
    if (rule.startsWith('IS A COMPOUND WORD')) return !!object.compound;
    if (rule.startsWith('FIRST LETTER IS REPEATED')) return (counts[first] ?? 0) > 1;
    if (rule.startsWith('HAS 3 OR MORE CONSECUTIVE CONSONANTS')) return /[^AEIOUY]{3}/.test(letters);
    if (rule.startsWith('HAS 1 OR MORE REPEATED LETTERS')) return Object.values(counts).some((count) => count > 1);
    if (rule === 'ENDS WITH A CONSONANT OR "Y"') return /[^AEIOU]$/.test(letters);
    if (rule === '6-8 LETTERS LONG') return letters.length >= 6 && letters.length <= 8;
    if (rule.startsWith('HAS 2 OR MORE CONSECUTIVE VOWELS')) return /[AEIOU]{2}/.test(letters);
    if (rule === 'HAS 1 OR MORE REPEATED VOWELS') return [...vowels].some((vowel) => (counts[vowel] ?? 0) > 1);
    if (rule === 'ENDS WITH 2 CONSONANTS') return /[^AEIOU]{2}$/.test(letters);
    if (rule === 'ENDS WITH A LETTER FROM "N"-"Z"') return letters.at(-1)! >= 'N';
    if (rule === '4-6 LETTERS LONG') return letters.length >= 4 && letters.length <= 6;
    if (rule === 'HAS EXACTLY 1 VOWEL (NOT INCLUDING "Y")') return vowels.size === 1;
    if (rule === 'FIRST 2 LETTERS ARE IN ALPHABETICAL ORDER') return first <= second;
    return false;
  }

  function hostSolution(): RingIndex[] {
    return [wordMatches(hostCards[0], hostObject), hostObject.context.includes(hostCards[1]), hostObject.attribute.includes(hostCards[2])].map((yes,index)=>yes ? index as RingIndex : null).filter((value): value is RingIndex => value !== null);
  }
  function rerollHostCard(index: number) { const decks: Deck[]=['word','context','attribute']; hostCards[index]=pick(officialCards[decks[index]]); hostCards=[...hostCards]; hostHidden[index]=false; hostHidden=[...hostHidden]; }
  function newHostCards() { rerollHostCard(0); rerollHostCard(1); rerollHostCard(2); }
  function resetSolo() { puzzleIndex=(puzzleIndex+1)%soloPuzzles.length;cardIndex=4;guess=[];message='';revealed=[false,false,false];score=0;moves=0;placed=[];setTimeout(buildBoard); }
  function selectRegion(rings: RingIndex[]) { guess=rings;message='';board?.update(); }
  function stackFor(key:string) {
    const initial=puzzle.objects.slice(0,4).filter((object)=>regionKey(object.rings)===key).map((object)=>object.name);
    const answered=placed.filter((object)=>regionKey(object.rings)===key).map((object)=>object.name);
    const preview=regionKey(guess)===key && score<5 ? [`<b style="color:#e64980">${card.name}</b>`] : [];
    return [...initial,...answered,...preview].join('<br>');
  }
  function buildBoard() {
    if (!mounted || !window.JXG || mode !== 'solo') return;
    if (board) window.JXG.JSXGraph.freeBoard(board);
    board=window.JXG.JSXGraph.initBoard('rings-board',{boundingbox:[-5,4.5,5,-4.5],axis:false,keepaspectratio:true,showCopyright:false,showNavigation:false,pan:{enabled:false},zoom:{enabled:false}});
    const centers:[number,number][]=[[-1.35,.7],[1.35,.7],[0,-1.1]];
    centers.forEach(([x,y],index)=>{board.create('circle',[[x,y],2.55],{strokeColor:colors[index],fillColor:colors[index],fillOpacity:.17,strokeWidth:5,fixed:true,highlight:false});board.create('text',[x+(index===0?-2.25:index===1?1.25:-.65),y+(index===2?-2.7:2.55),ringNames[index].toUpperCase()],{color:colors[index],fontSize:15,fixed:true,highlight:false,cssStyle:'font-weight:900;letter-spacing:.08em'});});
    Object.entries(regionPoints).forEach(([key,[x,y]])=>board.create('text',[x,y,()=>stackFor(key)],{anchorX:'middle',anchorY:'middle',fontSize:12,fixed:true,highlight:false,useHTML:true,cssStyle:'text-align:center;line-height:1.25;font-weight:700;max-width:120px'}));
    board.on('down',(event:PointerEvent)=>{if(score>=5)return;const coords=new window.JXG.Coords(window.JXG.COORDS_BY_SCREEN,board.getMousePosition(event),board).usrCoords;selectRegion(centers.map(([x,y],index)=>({index:index as RingIndex,inside:Math.hypot(coords[1]-x,coords[2]-y)<=2.55})).filter((item)=>item.inside).map((item)=>item.index));});
  }
  function submit() {
    if(score>=5)return; moves+=1; const correct=regionKey(card.rings)===regionKey(guess); placed=[...placed,{name:card.name,rings:card.rings}];
    if(correct){score+=1;message='Correct — one point earned!';}else{guess=[...card.rings];message=`Placed correctly in ${regionLabel(card.rings)}.`;}
    board?.update(); setTimeout(()=>{if(score<5){cardIndex=(cardIndex+1)%puzzle.objects.length;guess=[];message='';board?.update();}},850);
  }
  onMount(()=>{mounted=true;newHostCards();buildBoard();return()=>{if(board&&window.JXG)window.JXG.JSXGraph.freeBoard(board);};});
  $effect(()=>{puzzleIndex;mode;if(mounted)setTimeout(buildBoard);});
</script>

<section class="rings-game">
  <div class="flex flex-wrap items-center justify-between gap-4"><div><p class="eyebrow">Week 1 activity</p><h2 class="display-title text-4xl font-black tracking-[-.04em]">Things in Rings</h2></div><div class="tabs tabs-box"><button class:tab-active={mode==='solo'} class="tab gap-2" onclick={()=>mode='solo'}><UserRound size={16}/> Solo</button><button class:tab-active={mode==='host'} class="tab gap-2" onclick={()=>mode='host'}><Users size={16}/> Host</button></div></div>
  <p class="mt-3 max-w-3xl text-base-content/65">{mode==='solo'?'Reach 5 points in as few moves as possible. Click a diagram region; a wrong answer is automatically moved to its correct region.':'Draw, hide, reveal, or reroll any official card independently. The object randomizer includes its placement solution.'}</p>
  {#if mode==='solo'}
    <div class="mt-6 grid grid-cols-3 gap-3"><div class="stat-card"><span class="eyebrow">Score</span><b class="text-2xl">{score}/5</b></div><div class="stat-card"><span class="eyebrow">Moves</span><b class="text-2xl">{moves}</b></div><div class="stat-card"><span class="eyebrow">Goal</span><b class="text-lg">Fewest moves</b></div></div>
    <div class="mt-5 grid gap-5 xl:grid-cols-[.8fr_1.4fr]"><div class="game-panel"><div class="flex items-center justify-between"><h3 class="font-extrabold">Category cards</h3><button class="btn btn-ghost btn-sm" onclick={resetSolo}><RefreshCw size={16}/> New game</button></div><div class="mt-4 space-y-3">{#each puzzle.categories as category,index}<div class={`category-card official-ring-${index}`}><div><span>{ringNames[index]} · {stars(difficulty((['word','context','attribute'] as Deck[])[index],category))}</span><b>{revealed[index]?category:'???'}</b></div><button class="btn btn-ghost btn-xs" onclick={()=>{revealed[index]=!revealed[index];revealed=[...revealed]}}>{#if revealed[index]}<EyeOff size={14}/> Hide{:else}<Eye size={14}/> Reveal{/if}</button></div>{/each}</div></div>
      <div class="game-panel"><div class="object-card mb-4"><span>{score>=5?'Completed':'Place this object'}</span><strong>{score>=5?`${score} points in ${moves} moves`:card.name}</strong></div><div id="rings-board" class="jxgbox !h-[min(68vh,620px)] !w-full cursor-crosshair rounded-2xl border-0" aria-label="Clickable three-ring Venn diagram"></div><div class="mt-3 flex flex-wrap items-center justify-between gap-3"><p class="text-sm font-bold">Selected: <span class="text-primary">{regionLabel(guess)}</span></p><button class="btn btn-primary rounded-full px-7" disabled={score>=5} onclick={submit}>Place object</button></div>{#if message}<div class={`alert mt-3 ${message.startsWith('Correct')?'alert-success':'alert-info'}`}>{message}</div>{/if}<details class="collapse collapse-arrow mt-4 bg-base-100"><summary class="collapse-title font-bold">Keyboard placement options</summary><div class="collapse-content grid grid-cols-2 gap-2 sm:grid-cols-4">{#each [[],[0],[1],[2],[0,1],[0,2],[1,2],[0,1,2]] as region}<button class:selected={regionKey(guess)===regionKey(region)} class="placement-btn" onclick={()=>selectRegion(region as RingIndex[])}>{regionLabel(region)}</button>{/each}</div></details></div></div>
  {:else}
    <div class="mt-6 grid gap-5 lg:grid-cols-[1.25fr_.75fr]"><div class="game-panel"><div class="flex items-center justify-between"><h3 class="font-extrabold">Official category cards</h3><button class="btn btn-sm" onclick={newHostCards}><RefreshCw size={15}/> Reroll all</button></div><div class="mt-4 grid gap-3">{#each hostCards as category,index}<div class={`category-card official-ring-${index}`}><div><span>{ringNames[index]} · {stars(difficulty((['word','context','attribute'] as Deck[])[index],category))}</span><b>{hostHidden[index]?'HIDDEN':category}</b></div><div class="flex gap-1"><button class="btn btn-ghost btn-xs" onclick={()=>{hostHidden[index]=!hostHidden[index];hostHidden=[...hostHidden]}}>{#if hostHidden[index]}<Eye size={14}/>{:else}<EyeOff size={14}/>{/if} {hostHidden[index]?'Reveal':'Hide'}</button><button class="btn btn-ghost btn-xs" onclick={()=>rerollHostCard(index)}><RotateCw size={14}/> Reroll</button></div></div>{/each}</div><p class="mt-3 text-xs text-base-content/45">24 official cards per deck; fan cards excluded.</p></div>
      <div class="game-panel"><div class="flex items-center justify-between"><h3 class="font-extrabold">Object randomizer</h3><button class="btn btn-sm" onclick={()=>hostObjectIndex=(hostObjectIndex+1)%hostObjects.length}><RefreshCw size={15}/> New object</button></div><div class="object-card mt-4"><span>Place this object</span><strong>{hostObject.name}</strong></div><div class="alert alert-success mt-4"><div><b>Built-in solution</b><div class="mt-1">{regionLabel(hostSolution())}</div></div></div></div></div>
  {/if}
</section>
