<script lang="ts">
  import Dices from '@lucide/svelte/icons/dices';
  let diceType = $state<'2d6' | '1d12'>('2d6');

  // 2d6 distribution: 2 to 12
  // counts: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] / 36
  const twoD6Distribution = [
    { sum: 2, prob: 1 / 36 },
    { sum: 3, prob: 2 / 36 },
    { sum: 4, prob: 3 / 36 },
    { sum: 5, prob: 4 / 36 },
    { sum: 6, prob: 5 / 36 },
    { sum: 7, prob: 6 / 36 },
    { sum: 8, prob: 5 / 36 },
    { sum: 9, prob: 4 / 36 },
    { sum: 10, prob: 3 / 36 },
    { sum: 11, prob: 2 / 36 },
    { sum: 12, prob: 1 / 36 }
  ];

</script>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
        <div class="space-y-4">
          <div class="p-4 bg-base-200/60 rounded-2xl border border-base-300">
            <h3 class="text-base font-black flex items-center gap-2 mb-1">
              <Dices size={18} class="text-primary" /> Multi-Dice Bell Curve vs Flat Roll
            </h3>
            <p class="text-xs text-base-content/70">
              Rolling 2d6 sums independent random variables, creating a <strong>triangular distribution</strong> centered at 7 (16.7% chance). In contrast, rolling 1d12 is a <strong>flat uniform distribution</strong> where extreme values (1 or 12) have the exact same chance as 7 (8.3%).
            </p>
          </div>

          <div class="flex gap-2">
            <button
              class={`btn btn-sm flex-1 ${diceType === '2d6' ? 'btn-primary' : 'btn-outline'}`}
              onclick={() => (diceType = '2d6')}
            >
              2d6 (Triangular)
            </button>
            <button
              class={`btn btn-sm flex-1 ${diceType === '1d12' ? 'btn-secondary' : 'btn-outline'}`}
              onclick={() => (diceType = '1d12')}
            >
              1d12 (Flat Uniform)
            </button>
          </div>

          <div class="p-4 bg-base-200 rounded-2xl border border-base-300 font-mono text-xs space-y-1">
            <div class="flex justify-between items-center text-sm">
              <span>P(total = 7):</span>
              <strong class="text-primary">{diceType === '2d6' ? '16.7% (6/36 ways)' : '8.3% (1/12 ways)'}</strong>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span>Extreme Outcomes (2 or 12):</span>
              <strong class={diceType === '2d6' ? 'text-accent' : 'text-secondary'}>
                {diceType === '2d6' ? '2.8% each (Rare)' : '8.3% each (Equally Likely)'}
              </strong>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center p-4 bg-base-200/40 rounded-2xl border border-base-300">
          <svg viewBox="0 0 240 240" class="w-full max-w-[260px] aspect-square bg-base-100 rounded-2xl border border-base-300 shadow-inner">
            <!-- X Axis -->
            <line x1="20" y1="200" x2="225" y2="200" stroke="currentColor" stroke-opacity="0.2" />

            {#if diceType === '2d6'}
              {#each twoD6Distribution as d, i}
                {@const barH = d.prob * 900}
                {@const barX = 30 + i * 17}
                <rect x={barX} y={200 - barH} width="13" height={barH} rx="2" fill={d.sum === 7 ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)'} />
                <text x={barX + 6.5} y="213" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor">{d.sum}</text>
              {/each}
            {:else}
              {#each Array(12) as _, i}
                {@const barH = (1 / 12) * 900}
                {@const barX = 25 + i * 16}
                <rect x={barX} y={200 - barH} width="12" height={barH} rx="2" fill="rgba(168, 85, 247, 0.5)" />
                <text x={barX + 6} y="213" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor">{i + 1}</text>
              {/each}
            {/if}
          </svg>
          <span class="text-xs text-base-content/60 font-mono mt-2 text-center">
            {diceType === '2d6' ? '2d6: the middle total is more common than the extremes' : '1d12: all twelve outcomes are equally likely'}
          </span>
        </div>
      </div>


