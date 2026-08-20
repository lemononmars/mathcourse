<script lang="ts">
  import WorksheetExperience from '$lib/components/WorksheetExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>แบบฝึกหัด · {data.courseWeek.title} · แคลคูลัส 2</title>
</svelte:head>

<WorksheetExperience
  courseWeek={data.courseWeek}
  courseSlug="calculus-2-for-engineers"
/>
