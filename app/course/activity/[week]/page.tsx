import { notFound } from "next/navigation";
import { ActivityExperience } from "../../../components/ActivityExperience";
import { getWeek, weeks } from "../../../lib";

export function generateStaticParams() { return weeks.map((week) => ({ week: String(week.week) })); }
export default async function ActivityPage({ params }: { params: Promise<{ week: string }> }) { const { week } = await params; const courseWeek = getWeek(week); if (!courseWeek) notFound(); return <ActivityExperience courseWeek={courseWeek}/>; }
