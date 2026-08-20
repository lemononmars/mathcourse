import mathForDesignerData from './course-data.json';
import probAndStatData from './prob-and-stat-data.json';
import calc1Data from './course-data-calc1.json';
import calc2Data from './course-data-calc2.json';
import calc3Data from './course-data-calc3.json';

export type CourseSection = {
  title: string;
  anchor: string;
  routeSlug: string;
  anchors: string[];
  file: string;
  content: string;
};

export type CourseWeek = {
  week: number;
  slug: string;
  title: string;
  sections: CourseSection[];
  activity: CourseSection[];
  worksheet: string[];
};

export type CourseInfo = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  code: string;
  weeksCount: number;
  lang: 'en' | 'th';
  devOnly?: boolean;
  description: string;
  weeks: CourseWeek[];
};

export const mathForDesignerWeeks = mathForDesignerData as CourseWeek[];
export const probAndStatWeeks = probAndStatData as CourseWeek[];
export const calc1Weeks = calc1Data as CourseWeek[];
export const calc2Weeks = calc2Data as CourseWeek[];
export const calc3Weeks = calc3Data as CourseWeek[];

export const courses: CourseInfo[] = [
  {
    id: 'math-for-designer',
    slug: 'math-for-designer',
    title: 'Math for Designer',
    shortTitle: 'Math for Designer',
    code: 'DD211',
    weeksCount: 12,
    lang: 'en',
    devOnly: false,
    description: 'Build mathematical intuition through visual explanations, interactive models, and collaborative game mechanics.',
    weeks: mathForDesignerWeeks
  },
  {
    id: 'prob-and-stat-for-gad',
    slug: 'prob-and-stat-for-gad',
    title: 'Probability & Statistics for Game & Animation Design',
    shortTitle: 'Prob & Stat for GAD',
    code: 'DDG131',
    weeksCount: 12,
    lang: 'en',
    devOnly: true,
    description: 'Master probability, distributions, player data analytics, loot drops, and statistical hypothesis testing for game balancing.',
    weeks: probAndStatWeeks
  },
  {
    id: 'calculus-1-for-engineers',
    slug: 'calculus-1-for-engineers',
    title: 'Calculus 1 for Engineers (แคลคูลัส 1 สำหรับวิศวกร)',
    shortTitle: 'Calculus 1',
    code: 'MTH 101',
    weeksCount: 15,
    lang: 'th',
    devOnly: true,
    description: 'ฟังก์ชัน ลิมิตและความต่อเนื่อง อนุพันธ์ กฎลูกโซ่ การประยุกต์อนุพันธ์ ปริพันธ์จำกัดเขต และการหาพื้นที่/ปริมาตรการหมุน',
    weeks: calc1Weeks
  },
  {
    id: 'calculus-2-for-engineers',
    slug: 'calculus-2-for-engineers',
    title: 'Calculus 2 for Engineers (แคลคูลัส 2 สำหรับวิศวกร)',
    shortTitle: 'Calculus 2',
    code: 'MTH 102',
    weeksCount: 15,
    lang: 'th',
    devOnly: true,
    description: 'เทคนิคการอินทิเกรตขั้นสูง ฟังก์ชันค่าเวกเตอร์ เวกเตอร์สัมผัส/ความโค้ง ฟังก์ชันหลายตัวแปร อนุพันธ์ย่อย เกรเดียนต์ และค่าสุดขีด',
    weeks: calc2Weeks
  },
  {
    id: 'calculus-3-for-engineers',
    slug: 'calculus-3-for-engineers',
    title: 'Calculus 3 for Engineers (แคลคูลัส 3 สำหรับวิศวกร)',
    shortTitle: 'Calculus 3',
    code: 'MTH 201',
    weeksCount: 15,
    lang: 'th',
    devOnly: true,
    description: 'สมการเชิงอนุพันธ์อันดับ 1 และอันดับ $n$ ปริพันธ์เชิงตัวเลข ปริพันธ์ไม่ตรงแบบ ปริพันธ์ตามเส้น อุปนัยทางคณิตศาสตร์ ลำดับ และอนุกรมอนันต์',
    weeks: calc3Weeks
  }
];

export const getCourse = (slug = 'math-for-designer') =>
  courses.find((c) => c.slug === slug || c.id === slug) ?? courses[0];

export const getCourseWeeks = (courseSlug = 'math-for-designer') =>
  getCourse(courseSlug).weeks;

export const getCourseWeek = (courseSlug: string, week: string | number) =>
  getCourseWeeks(courseSlug).find((item) => item.week === Number(week));

export const getCourseWeekFromSlug = (courseSlug: string, slug: string) =>
  getCourseWeek(courseSlug, Number(slug.slice(0, 2)));

// Backward-compatible helpers for math-for-designer
export const weeks = mathForDesignerWeeks;
export const getWeek = (week: string | number) => getCourseWeek('math-for-designer', week);
export const getWeekFromSlug = (slug: string) => getCourseWeekFromSlug('math-for-designer', slug);

export const lectureSectionPath = (courseSlugOrWeek: string | CourseWeek, weekOrSectionIndex?: CourseWeek | number, sectionIndex = 0) => {
  if (typeof courseSlugOrWeek === 'string') {
    const cSlug = courseSlugOrWeek;
    const w = weekOrSectionIndex as CourseWeek;
    return `/courses/${cSlug}/lectures/${w.slug}/${w.sections[sectionIndex]?.routeSlug ?? '01-section'}`;
  } else {
    const w = courseSlugOrWeek;
    const idx = (weekOrSectionIndex as number) ?? 0;
    return `/courses/math-for-designer/lectures/${w.slug}/${w.sections[idx]?.routeSlug ?? '01-section'}`;
  }
};

export const weekAccent = [
  '#ff6b6b', '#f49f38', '#f3c623', '#51b788', '#15aabf', '#4c6ef5',
  '#7950f2', '#be4bdb', '#e64980', '#e8590c', '#2f9e44', '#1971c2',
  '#d9480f', '#0ca678', '#7048e8'
];
