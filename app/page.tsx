import Link from "next/link";
import { ArrowRight, CircleDot, MoveUpRight, Sparkles } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-base-100">
      <SiteHeader />
      <section className="hero-grid relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-bold text-primary"><Sparkles size={17} /> Interactive mathematics</div>
          <h1 className="display-title text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">See the pattern.<br/><span className="text-primary">Shape the idea.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-base-content/70">A visual, hands-on math course for creative thinkers. Explore each idea, play with it, and prove you understand it before moving forward.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="btn btn-primary btn-lg rounded-full px-7" href="/course">Explore the course <ArrowRight size={19} /></Link>
            <span className="flex items-center px-3 text-sm text-base-content/55">12 weeks · self-paced</span>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[8%] rounded-[36%_64%_63%_37%/47%_40%_60%_53%] bg-primary/10 rotate-6" />
          <div className="absolute left-[11%] top-[16%] grid h-[42%] w-[42%] place-items-center rounded-full border-[14px] border-secondary/80 bg-base-100/70 text-7xl font-black shadow-xl backdrop-blur">π</div>
          <div className="absolute right-[8%] top-[26%] h-[38%] w-[38%] rotate-12 rounded-3xl bg-primary p-7 text-primary-content shadow-2xl"><MoveUpRight className="h-full w-full" strokeWidth={1.2}/></div>
          <div className="absolute bottom-[8%] left-[28%] flex h-[30%] w-[58%] items-center justify-center gap-3 rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
            {[18, 48, 74].map((left, index) => <CircleDot key={left} className="text-accent" size={44 + index * 8} style={{ transform: `translateY(${index % 2 ? -10 : 8}px)` }} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
