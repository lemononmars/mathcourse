import courseData from './course-data.json';

export type CourseSection = {
  title: string;
  anchor: string;
  routeSlug: string;
  anchors: string[];
  file: string;
  content: string;
};
export type CourseWeek = { week: number; slug: string; title: string; sections: CourseSection[]; activity: CourseSection[]; worksheet: string[] };
export const weeks = courseData as CourseWeek[];
export const getWeek = (week: string | number) => weeks.find((item) => item.week === Number(week));
export const getWeekFromSlug = (slug: string) => getWeek(Number(slug.slice(0, 2)));
export const lectureSectionPath = (week: CourseWeek, sectionIndex = 0) => `/courses/math-for-designer/lectures/${week.slug}/${week.sections[sectionIndex]?.routeSlug ?? '01-section'}`;
export const weekAccent = ['#ff6b6b','#f49f38','#f3c623','#51b788','#15aabf','#4c6ef5','#7950f2','#be4bdb','#e64980','#e8590c','#2f9e44','#1971c2'];
