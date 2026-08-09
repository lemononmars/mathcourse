"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("mfd-theme");
    const next = saved ? saved === "night" : matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(next);
    document.documentElement.dataset.theme = next ? "night" : "mfdlight";
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "night" : "mfdlight";
    localStorage.setItem("mfd-theme", next ? "night" : "mfdlight");
  };
  return (
    <button className="btn btn-ghost btn-circle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
