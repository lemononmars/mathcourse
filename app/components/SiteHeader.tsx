import Link from "next/link";
import { Sigma } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`navbar z-30 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur md:px-7 ${compact ? "sticky top-0" : ""}`}>
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost gap-2 px-2 text-lg font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-content"><Sigma size={19} /></span>
          <span>Math for Designer</span>
        </Link>
      </div>
      <div className="navbar-end gap-1">
        <Link href="/course" className="btn btn-ghost btn-sm hidden sm:inline-flex">Course</Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
