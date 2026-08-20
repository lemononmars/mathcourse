<script lang="ts">
  import Calc1ActivityExperience from '$lib/components/calc1/Calc1ActivityExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>สัปดาห์ที่ {data.courseWeek.week} Studio · แคลคูลัส 1</title>
</svelte:head>

<Calc1ActivityExperience courseWeek={data.courseWeek}/>
