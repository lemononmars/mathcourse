import { error } from '@sveltejs/kit';
import { getCourseWeek } from '$lib/course';

export function load({ params }) {
  const courseWeek = getCourseWeek('prob-and-stat-for-gad', params.week);
  if (!courseWeek) error(404, 'Week not found');
  return { courseWeek };
}
