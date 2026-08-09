<script lang="ts">
  import LectureExperience from '$lib/components/LectureExperience.svelte';
  let { data } = $props();
</script>

<svelte:head><title>{data.courseWeek.title} · Math for Designer</title></svelte:head>
<LectureExperience courseWeek={data.courseWeek} initialSection={data.initialSection}/>
