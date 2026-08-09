import type { CourseWeek } from './course';

export function activeSectionWeek(courseWeek: CourseWeek, routeSlug: string): CourseWeek {
  return {
    ...courseWeek,
    worksheet: [],
    activity: [],
    sections: courseWeek.sections.map((section) => ({
      ...section,
      content: section.routeSlug === routeSlug ? section.content : ''
    }))
  };
}
