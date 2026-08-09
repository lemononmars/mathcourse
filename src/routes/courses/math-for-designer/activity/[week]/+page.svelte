<script lang="ts">import ActivityExperience from '$lib/components/ActivityExperience.svelte'; let { data }=$props();</script>
<svelte:head><title>Activity · {data.courseWeek.title}</title></svelte:head><ActivityExperience courseWeek={data.courseWeek}/>
