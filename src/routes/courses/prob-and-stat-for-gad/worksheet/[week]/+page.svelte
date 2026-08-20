<script lang="ts">
  import WorksheetExperience from '$lib/components/WorksheetExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>Worksheet · {data.courseWeek.title} · Prob & Stat</title>
</svelte:head>

<WorksheetExperience
  courseWeek={data.courseWeek}
  courseSlug="prob-and-stat-for-gad"
/>
