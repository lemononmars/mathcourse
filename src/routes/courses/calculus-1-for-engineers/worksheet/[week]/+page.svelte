<script lang="ts">
  import WorksheetExperience from '$lib/components/WorksheetExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>แบบฝึกหัด · {data.courseWeek.title} · แคลคูลัส 1</title>
</svelte:head>

<WorksheetExperience
  courseWeek={data.courseWeek}
  courseSlug="calculus-1-for-engineers"
/>
