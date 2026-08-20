<script lang="ts">
  import WorksheetExperience from '$lib/components/WorksheetExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>แบบฝึกหัด · {data.courseWeek.title} · แคลคูลัส 3</title>
</svelte:head>

<WorksheetExperience
  courseWeek={data.courseWeek}
  courseSlug="calculus-3-for-engineers"
/>
