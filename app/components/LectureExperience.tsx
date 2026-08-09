"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, LockKeyhole, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CourseWeek } from "../lib";
import { MathText } from "./MathText";
import { ProgressRing } from "./ProgressRing";
import { ThemeToggle } from "./ThemeToggle";
import { InteractiveGraph } from "./InteractiveGraph";

export function LectureExperience({ courseWeek }: { courseWeek: CourseWeek }) {
  const [active, setActive] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [menu, setMenu] = useState(false);
  const sections = courseWeek.sections;
  const progress = Math.round(((unlocked + 1) / sections.length) * 100);
  const choices = useMemo(() => {
    const correct = sections[active].title;
    const others = sections.map((section) => section.title).filter((title) => title !== correct).slice(0, 3);
    const generic = ["A different mathematical model", "Historical background", "Visual composition"];
    return [correct, ...others, ...generic].slice(0, 3).sort((a, b) => (a.charCodeAt(0) + active) % 3 - (b.charCodeAt(0) + active) % 3);
  }, [active, sections]);

  useEffect(() => {
    const saved = Number(localStorage.getItem(`mfd-progress-${courseWeek.week}`) || 0);
    setUnlocked(Math.min(saved, sections.length - 1));
    setActive(Math.min(saved, sections.length - 1));
  }, [courseWeek.week, sections.length]);

  const go = (index: number) => {
    if (index > unlocked) return;
    setActive(index); setSelected(null); setFeedback(null); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const check = () => {
    if (!selected) return;
    const correct = selected === sections[active].title;
    setFeedback(correct ? "correct" : "wrong");
    if (correct && active < sections.length - 1) {
      const next = Math.max(unlocked, active + 1);
      setUnlocked(next); localStorage.setItem(`mfd-progress-${courseWeek.week}`, String(next));
    }
  };
  const next = () => { if (feedback === "correct" && active < sections.length - 1) go(active + 1); };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-base-300"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }}/></div>
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-base-300 bg-base-100/95 px-3 backdrop-blur md:px-5">
        <button className="btn btn-ghost btn-circle lg:hidden" onClick={() => setMenu(true)} aria-label="Open section menu"><Menu/></button>
        <Link className="btn btn-ghost gap-2" href="/course"><ChevronLeft size={18}/><span className="hidden sm:inline">Course</span></Link>
        <div className="min-w-0 flex-1 text-center"><p className="truncate text-xs font-bold uppercase tracking-[.14em] text-base-content/45">Week {courseWeek.week}</p><h1 className="truncate font-extrabold">{courseWeek.title}</h1></div>
        <div className="flex items-center gap-2"><ProgressRing value={progress}/><ThemeToggle/></div>
      </header>
      <div className="mx-auto flex max-w-[1500px]">
        <aside className={`lesson-sidebar ${menu ? "is-open" : ""}`}>
          <div className="flex items-center justify-between p-5 lg:hidden"><b>Sections</b><button className="btn btn-ghost btn-circle" onClick={() => setMenu(false)}><X/></button></div>
          <div className="p-5"><p className="eyebrow">In this lecture</p><nav className="mt-3 space-y-1">
            {sections.map((section, index) => <button key={section.title} className={`section-link ${active === index ? "active" : ""}`} disabled={index > unlocked} onClick={() => go(index)}><span>{index < unlocked ? <Check size={15}/> : index > unlocked ? <LockKeyhole size={14}/> : index + 1}</span><span>{section.title}</span></button>)}
          </nav></div>
          <div className="mt-auto border-t border-base-300 p-5"><div className="text-sm font-semibold">Need more practice?</div><Link className="link link-primary mt-1 text-sm" href={`/course/worksheet/${courseWeek.week}`}>Open the worksheet →</Link></div>
        </aside>
        {menu && <button className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMenu(false)} aria-label="Close menu"/>}
        <main className="min-w-0 flex-1 px-5 py-9 md:px-10 lg:px-16">
          <article className="mx-auto max-w-[760px]">
            <div className="mb-8"><p className="eyebrow">Section {active + 1} of {sections.length}</p><h2 className="display-title mt-2 text-4xl font-black tracking-[-.035em] md:text-5xl">{sections[active].title}</h2></div>
            <MathText content={sections[active].content}/>
            {courseWeek.week >= 3 && courseWeek.week <= 8 && active === 0 && <InteractiveGraph week={courseWeek.week}/>} 
            <section className="checkpoint mt-12">
              <div className="mb-1 text-sm font-black uppercase tracking-[.14em] text-primary">Checkpoint</div>
              <h3 className="text-2xl font-extrabold">What was the central idea of this section?</h3>
              <div className="mt-5 grid gap-3">{choices.map((choice) => <button key={choice} onClick={() => { setSelected(choice); setFeedback(null); }} className={`answer-choice ${selected === choice ? "selected" : ""}`}>{choice}</button>)}</div>
              {feedback && <div className={`alert mt-4 ${feedback === "correct" ? "alert-success" : "alert-error"}`}><span>{feedback === "correct" ? "Exactly — the next section is now open." : "Not quite. Revisit the heading and try once more."}</span></div>}
              <div className="mt-5 flex justify-between"><button className="btn btn-ghost" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft/> Back</button>{feedback === "correct" && active < sections.length - 1 ? <button className="btn btn-primary rounded-full px-6" onClick={next}>Continue <ArrowRight/></button> : active === sections.length - 1 && feedback === "correct" ? <Link className="btn btn-primary rounded-full" href={`/course/worksheet/${courseWeek.week}`}>Start worksheet <ArrowRight/></Link> : <button className="btn btn-primary rounded-full px-6" disabled={!selected} onClick={check}>Check answer</button>}</div>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
