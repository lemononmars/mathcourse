import { notFound } from "next/navigation";
import { LectureExperience } from "../../../components/LectureExperience";
import { getWeek, weeks } from "../../../lib";

export function generateStaticParams() { return weeks.map((week) => ({ week: String(week.week) })); }

export default async function LecturePage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params;
  const courseWeek = getWeek(week);
  if (!courseWeek) notFound();
  return <LectureExperience courseWeek={courseWeek}/>;
}
