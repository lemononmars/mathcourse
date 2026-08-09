"use client";

import Link from "next/link";
import { ArrowLeft, Dices, Printer, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import type { CourseWeek } from "../lib";
import { MathText } from "./MathText";
import { SiteHeader } from "./SiteHeader";

function varyNumbers(text: string, seed: number) {
  let index = 0;
  return text.replace(/\b([2-9]|[1-9]\d)\b/g, (match) => {
    index += 1;
    const number = Number(match);
    return String(Math.max(1, number + ((seed * 7 + index * 3) % 7) - 3));
  });
}

export function WorksheetExperience({ courseWeek }: { courseWeek: CourseWeek }) {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => courseWeek.worksheet.map((question) => varyNumbers(question, seed)), [courseWeek.worksheet, seed]);
  return (
    <main className="min-h-screen bg-base-200/60">
      <SiteHeader compact/>
      <section className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <Link href="/course" className="btn btn-ghost btn-sm -ml-3 mb-5"><ArrowLeft size={16}/> Course</Link>
        <div className="worksheet-head">
          <div><p className="eyebrow">Week {courseWeek.week} worksheet</p><h1 className="display-title mt-2 text-4xl font-black tracking-[-.04em] md:text-6xl">{courseWeek.title}</h1><p className="mt-3 text-base-content/60">Problem set {seed + 1} · {questions.length} questions</p></div>
          <Dices className="hidden h-24 w-24 text-primary/25 md:block"/>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden"><button className="btn btn-primary rounded-full" onClick={() => setSeed((value) => value + 1)}><RefreshCw size={17}/> Generate a different set</button><button className="btn rounded-full" onClick={() => window.print()}><Printer size={17}/> Print</button></div>
        <div className="mt-8 space-y-4">
          {questions.map((question, index) => <article className="worksheet-question" key={`${seed}-${index}`}><div className="question-number">{index + 1}</div><div className="min-w-0 flex-1"><MathText content={question}/><div className="answer-space"/></div></article>)}
        </div>
      </section>
    </main>
  );
}
