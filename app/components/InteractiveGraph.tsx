"use client";

import { useEffect, useId, useRef, useState } from "react";

export function InteractiveGraph({ week }: { week: number }) {
  const id = `jxg-${useId().replace(/:/g, "")}`;
  const boardRef = useRef<any>(null);
  const [value, setValue] = useState(1);

  useEffect(() => {
    let alive = true;
    import("jsxgraph").then((module) => {
      if (!alive || boardRef.current) return;
      const JXG = (module as any).default || module;
      const board = JXG.JSXGraph.initBoard(id, { boundingbox: [-6, 6, 6, -6], axis: true, showCopyright: false, showNavigation: false, pan: { enabled: true }, zoom: { wheel: true } });
      boardRef.current = board;
      if (week === 6) {
        board.create("functiongraph", [(x: number) => Math.sin(x), -6, 6], { strokeColor: "#7950f2", strokeWidth: 4 });
        const p = board.create("glider", [1, 0, board.defaultAxes.x], { color: "#ff6b6b", size: 5 });
        board.create("point", [() => p.X(), () => Math.sin(p.X())], { color: "#ff6b6b", size: 5, name: "sin(x)" });
      } else if (week >= 7 && week <= 8) {
        const p = board.create("point", [2, 2], { color: "#ff6b6b", name: "drag me", size: 5 });
        board.create("arrow", [[0, 0], [() => p.X(), () => p.Y()]], { strokeColor: "#15aabf", strokeWidth: 4 });
        board.create("point", [() => -p.Y(), () => p.X()], { color: "#7950f2", name: "rotated", size: 5 });
      } else {
        board.create("functiongraph", [(x: number) => value * x * x / 4 - 2, -5, 5], { strokeColor: "#4c6ef5", strokeWidth: 4 });
      }
    });
    return () => { alive = false; };
  }, [id, week]);

  useEffect(() => { boardRef.current?.update(); }, [value]);

  return (
    <div className="interactive-card">
      <div className="mb-3 flex items-center justify-between"><div><span className="eyebrow">Interactive lab</span><h3 className="text-xl font-extrabold">Drag, zoom, discover</h3></div><span className="badge badge-secondary">JSXGraph</span></div>
      <div id={id} className="jxgbox !h-[300px] !w-full rounded-2xl border-0" />
      {week >= 3 && week <= 5 && <label className="mt-4 flex items-center gap-3 text-sm font-semibold">Shape <input className="range range-primary range-sm" type="range" min="-2" max="2" step=".1" value={value} onChange={(event) => setValue(Number(event.target.value))}/><span className="w-9">{value}</span></label>}
    </div>
  );
}
