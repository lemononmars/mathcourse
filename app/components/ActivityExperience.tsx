import Link from "next/link";
import { ArrowLeft, Blocks, Users } from "lucide-react";
import type { CourseWeek } from "../lib";
import { SiteHeader } from "./SiteHeader";
import { ThingsInRings } from "./ThingsInRings";

export function ActivityExperience({ courseWeek }: { courseWeek: CourseWeek }) {
  return <main className="min-h-screen bg-base-200/50"><SiteHeader compact/><div className="mx-auto max-w-6xl px-5 py-10"><Link href="/course" className="btn btn-ghost btn-sm -ml-3 mb-6"><ArrowLeft size={16}/> Course</Link>{courseWeek.week === 1 ? <ThingsInRings/> : <section className="activity-placeholder"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary"><Blocks size={38}/></div><p className="eyebrow mt-6">Week {courseWeek.week} studio</p><h1 className="display-title mt-2 text-5xl font-black">{courseWeek.title} lab</h1><p className="mt-4 max-w-xl text-lg leading-8 text-base-content/65">A guided group activity that turns this week’s ideas into something you can move, test, and discuss together.</p><div className="alert mt-7 max-w-xl"><Users/><span>Activity instructions are ready for classroom facilitation. Interactive materials will be added in the next course release.</span></div></section>}</div></main>;
}
