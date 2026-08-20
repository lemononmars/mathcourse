import { error } from '@sveltejs/kit';
import { getCourseWeek } from '$lib/course';

export function load({ params }) {
  const courseWeek = getCourseWeek('calculus-3-for-engineers', params.week);
  if (!courseWeek) error(404, 'Week not found');
  return { courseWeek };
}
