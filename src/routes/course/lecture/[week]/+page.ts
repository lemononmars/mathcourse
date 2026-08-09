import { error } from '@sveltejs/kit'; import { getWeek } from '$lib/course';
export function load({ params }) { const courseWeek=getWeek(params.week); if(!courseWeek) error(404,'Lecture not found'); return { courseWeek }; }
