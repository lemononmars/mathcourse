import { error } from '@sveltejs/kit';
import { getCourseWeekFromSlug } from '$lib/course';
import { activeSectionWeek } from '$lib/lecture-payload';

export function load({ params }) {
  const courseWeek = getCourseWeekFromSlug('prob-and-stat-for-gad', params.lecture);
  if (!courseWeek || courseWeek.slug !== params.lecture) error(404, 'Lecture not found');
  const section = courseWeek.sections.find((item) => item.routeSlug === params.section);
  if (!section) error(404, 'Section not found');
  return {
    courseWeek: activeSectionWeek(courseWeek, section.routeSlug),
    initialSection: section.routeSlug
  };
}
