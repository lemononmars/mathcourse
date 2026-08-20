<script lang="ts">
  import LectureExperience from '$lib/components/LectureExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.courseWeek.title} · Prob & Stat for GAD</title>
</svelte:head>

<LectureExperience
  courseWeek={data.courseWeek}
  initialSection={data.initialSection}
  courseSlug="prob-and-stat-for-gad"
/>
