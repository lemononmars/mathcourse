"use client";

import { Eye, EyeOff, RefreshCw, Users, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

type Puzzle = { categories: string[]; objects: { name: string; rings: number[] }[] };
const puzzles: Puzzle[] = [
  { categories: ["Can fly", "Is alive", "Is usually red"], objects: [
    { name: "Robin", rings: [0,1,2] }, { name: "Airplane", rings: [0] }, { name: "Rose", rings: [1,2] }, { name: "Ladybird", rings: [0,1,2] }, { name: "Brick", rings: [2] }, { name: "Penguin", rings: [1] }, { name: "Red kite", rings: [0,2] }, { name: "Spoon", rings: [] },
  ]},
  { categories: ["Found in a kitchen", "Contains a circle", "Made of metal"], objects: [
    { name: "Frying pan", rings: [0,1,2] }, { name: "Clock", rings: [1] }, { name: "Fork", rings: [0,2] }, { name: "Coin", rings: [1,2] }, { name: "Towel", rings: [0] }, { name: "Bicycle", rings: [1,2] }, { name: "Whisk", rings: [0,1,2] }, { name: "Cloud", rings: [] },
  ]},
  { categories: ["Has four legs", "Can be sat on", "Has a pattern"], objects: [
    { name: "Striped chair", rings: [0,1,2] }, { name: "Zebra", rings: [0,2] }, { name: "Stool", rings: [0,1] }, { name: "Beanbag", rings: [1] }, { name: "Wallpaper", rings: [2] }, { name: "Table", rings: [0] }, { name: "Picnic blanket", rings: [1,2] }, { name: "Moon", rings: [] },
  ]},
];

function regionLabel(rings: number[], categories: string[]) { return rings.length ? rings.map((ring) => categories[ring]).join(" + ") : "Outside all rings"; }

export function ThingsInRings() {
  const [mode, setMode] = useState<"solo"|"host">("solo");
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [guess, setGuess] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const puzzle = puzzles[puzzleIndex];
  const card = puzzle.objects[cardIndex];
  const placements = useMemo(() => [[], [0], [1], [2], [0,1], [0,2], [1,2], [0,1,2]], []);
  const newPuzzle = () => { setPuzzleIndex((value) => (value + 1) % puzzles.length); setCardIndex(0); setGuess([]); setMessage(""); setRevealed(false); };
  const submit = () => {
    const correct = [...card.rings].sort().join() === [...guess].sort().join();
    setMessage(correct ? "Correct placement — good deduction!" : "That card belongs somewhere else. Use the examples and try again.");
    if (correct) setTimeout(() => { setCardIndex((value) => (value + 1) % puzzle.objects.length); setGuess([]); setMessage(""); }, 850);
  };
  return (
    <section className="rings-game">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Week 1 activity</p><h2 className="display-title text-4xl font-black tracking-[-.04em]">Things in Rings</h2></div><div className="tabs tabs-box"><button className={`tab gap-2 ${mode === "solo" ? "tab-active" : ""}`} onClick={() => setMode("solo")}><UserRound size={16}/> Solo</button><button className={`tab gap-2 ${mode === "host" ? "tab-active" : ""}`} onClick={() => setMode("host")}><Users size={16}/> Host</button></div></div>
      <p className="mt-3 max-w-2xl text-base-content/65">{mode === "solo" ? "Deduce the three hidden rules from the object cards, then place the next card in the correct region." : "Generate category cards, then guide a group as they suggest objects and discover how the rings overlap."}</p>
      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <div className="game-panel">
          <div className="flex items-center justify-between"><h3 className="font-extrabold">Category cards</h3><button className="btn btn-ghost btn-sm" onClick={() => setRevealed(!revealed)}>{revealed || mode === "host" ? <EyeOff size={16}/> : <Eye size={16}/>} {revealed || mode === "host" ? "Hide" : "Reveal"}</button></div>
          <div className="mt-4 space-y-3">{puzzle.categories.map((category, index) => <div key={category} className={`category-card ring-${index}`}><span>Ring {String.fromCharCode(65 + index)}</span><b>{revealed || mode === "host" ? category : "???"}</b></div>)}</div>
          <button className="btn mt-4 w-full rounded-full" onClick={newPuzzle}><RefreshCw size={16}/> New categories</button>
        </div>
        <div className="game-panel">
          {mode === "solo" ? <>
            <div className="object-card"><span>Place this object</span><strong>{card.name}</strong></div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{placements.map((placement) => <button key={placement.join("-") || "out"} onClick={() => { setGuess(placement); setMessage(""); }} className={`placement-btn ${guess.join() === placement.join() ? "selected" : ""}`}>{regionLabel(placement, ["A","B","C"])}</button>)}</div>
            <button className="btn btn-primary mt-4 w-full rounded-full" disabled={guess === null} onClick={submit}>Check placement</button>
            {message && <div className={`alert mt-3 ${message.startsWith("Correct") ? "alert-success" : "alert-warning"}`}>{message}</div>}
            <div className="mt-5"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-base-content/45">Clue cards already placed</p><div className="flex flex-wrap gap-2">{puzzle.objects.filter((_, index) => index !== cardIndex).slice(0,4).map((object) => <span className="badge badge-lg" key={object.name}>{object.name} · {regionLabel(object.rings, ["A","B","C"])}</span>)}</div></div>
          </> : <>
            <h3 className="text-xl font-extrabold">Object deck</h3><p className="mt-1 text-sm text-base-content/55">Use these ready-made examples, or invite players to suggest their own.</p><div className="mt-5 grid grid-cols-2 gap-3">{puzzle.objects.map((object) => <div className="host-object" key={object.name}><b>{object.name}</b><span>{regionLabel(object.rings, ["A","B","C"])}</span></div>)}</div>
          </>}
        </div>
      </div>
    </section>
  );
}
