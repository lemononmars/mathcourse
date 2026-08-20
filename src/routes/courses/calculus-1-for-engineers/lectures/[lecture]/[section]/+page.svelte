<script lang="ts">
  import LectureExperience from '$lib/components/LectureExperience.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.courseWeek.title} · แคลคูลัส 1</title>
</svelte:head>

<LectureExperience
  courseWeek={data.courseWeek}
  initialSection={data.initialSection}
  courseSlug="calculus-1-for-engineers"
/>
