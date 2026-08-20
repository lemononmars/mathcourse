<script lang="ts">
  import Calc2ActivityExperience from '$lib/components/calc2/Calc2ActivityExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>สัปดาห์ที่ {data.courseWeek.week} Studio · แคลคูลัส 2</title>
</svelte:head>

<Calc2ActivityExperience courseWeek={data.courseWeek}/>
