import { error } from '@sveltejs/kit';
import { getCourseWeek } from '$lib/course';

export function load({ params }) {
  const courseWeek = getCourseWeek('calculus-1-for-engineers', params.week);
  if (!courseWeek) error(404, 'Worksheet not found');
  return { courseWeek };
}
