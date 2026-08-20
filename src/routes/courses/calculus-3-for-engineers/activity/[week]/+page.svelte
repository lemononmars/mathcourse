<script lang="ts">
  import Calc3ActivityExperience from '$lib/components/calc3/Calc3ActivityExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>สัปดาห์ที่ {data.courseWeek.week} Studio · แคลคูลัส 3</title>
</svelte:head>

<Calc3ActivityExperience courseWeek={data.courseWeek}/>
