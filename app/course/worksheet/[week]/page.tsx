import { notFound } from "next/navigation";
import { WorksheetExperience } from "../../../components/WorksheetExperience";
import { getWeek, weeks } from "../../../lib";

export function generateStaticParams() { return weeks.map((week) => ({ week: String(week.week) })); }
export default async function WorksheetPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params; const courseWeek = getWeek(week); if (!courseWeek) notFound();
  return <WorksheetExperience courseWeek={courseWeek}/>;
}
