<script lang="ts">
  import ProbStatActivityExperience from '$lib/components/probstat/ProbStatActivityExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>Week {data.courseWeek.week} Studio · Prob & Stat for GAD</title>
</svelte:head>

<ProbStatActivityExperience courseWeek={data.courseWeek}/>
