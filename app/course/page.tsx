import Link from "next/link";
import { ArrowRight, BookOpen, Gamepad2, PenLine } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { weeks, weekAccent } from "../lib";

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-base-200/50">
      <SiteHeader compact />
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="badge badge-primary badge-outline mb-4 font-bold">MTH 101 · 12 weeks</div>
          <h1 className="display-title max-w-3xl text-5xl font-black tracking-[-.045em] md:text-7xl">Math for Designer</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/65">Build mathematical intuition through visual explanations, interactive models, worksheets, and collaborative play.</p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm">
            <div className="stat-card"><BookOpen/> Interactive lessons</div>
            <div className="stat-card"><PenLine/> Fresh worksheets</div>
            <div className="stat-card"><Gamepad2/> Weekly activities</div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-7 flex items-end justify-between"><div><p className="eyebrow">Course syllabus</p><h2 className="text-3xl font-extrabold">Your 12-week path</h2></div><p className="hidden text-sm text-base-content/50 md:block">Lecture · worksheet · activity</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          {weeks.map((week, index) => (
            <article className="week-card group" key={week.week} style={{ "--week-color": weekAccent[index] } as React.CSSProperties}>
              <div className="week-number">{String(week.week).padStart(2, "0")}</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-base-content/45">Week {week.week}</p>
                <h3 className="mt-1 text-xl font-extrabold leading-tight">{week.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link className="btn btn-sm rounded-full" href={`/course/lecture/${week.week}`}>Learn <ArrowRight size={14}/></Link>
                  <Link className="btn btn-sm btn-ghost rounded-full" href={`/course/worksheet/${week.week}`}>Worksheet</Link>
                  <Link className="btn btn-sm btn-ghost rounded-full" href={`/course/activity/${week.week}`}>Activity</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
