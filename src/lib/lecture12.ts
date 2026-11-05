export type Complex = { re: number; im: number };
export type ComplexOperation = 'add' | 'sub' | 'mul' | 'div' | 'conj';
export const magnitude = (z: Complex) => Math.hypot(z.re, z.im);
export const argument = (z: Complex): number | null => magnitude(z) === 0 ? null : Math.atan2(z.im, z.re) * 180 / Math.PI;
export const cis = (radius: number, degrees: number): Complex => {
  const clean = (v: number) => Math.abs(v) < 1e-15 ? 0 : v;
  return { re: radius * clean(Math.cos(degrees * Math.PI / 180)), im: radius * clean(Math.sin(degrees * Math.PI / 180)) };
};
export function calculate(a: Complex, b: Complex, op: ComplexOperation): Complex | null {
  let z: Complex;
  if (op === 'add') z = { re: a.re + b.re, im: a.im + b.im };
  else if (op === 'sub') z = { re: a.re - b.re, im: a.im - b.im };
  else if (op === 'conj') z = { re: a.re, im: -a.im };
  else if (op === 'mul') z = { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
  else {
    if (b.re === 0 && b.im === 0) return null;
    // Smith division avoids squaring tiny or very large denominator components.
    if (Math.abs(b.re) >= Math.abs(b.im)) {
      const ratio = b.im / b.re, denominator = b.re + b.im * ratio;
      z = { re: (a.re + a.im * ratio) / denominator, im: (a.im - a.re * ratio) / denominator };
    } else {
      const ratio = b.re / b.im, denominator = b.im + b.re * ratio;
      z = { re: (a.re * ratio + a.im) / denominator, im: (a.im * ratio - a.re) / denominator };
    }
  }
  return Number.isFinite(z.re) && Number.isFinite(z.im) ? z : null;
}
export const power = (z: Complex, n: number) => cis(magnitude(z) ** n, (argument(z) ?? 0) * n);
export function roots(z: Complex, n: number): Complex[] {
  if (!Number.isInteger(n) || n < 1 || n > 12) return [];
  if (magnitude(z) === 0) return [{ re: 0, im: 0 }];
  return Array.from({ length: n }, (_, k) => cis(magnitude(z) ** (1 / n), ((argument(z) ?? 0) + 360 * k) / n));
}
export function numberText(n: number): string {
  if (n === 0) return '0';
  return Number(n.toPrecision(6)).toString();
}
export function complexText(z: Complex): string {
  const tolerance = Math.max(Math.abs(z.re), Math.abs(z.im)) * 1e-12;
  const re = Math.abs(z.re) < tolerance ? 0 : z.re, im = Math.abs(z.im) < tolerance ? 0 : z.im;
  if (im === 0) return numberText(re);
  const term = `${Math.abs(im) === 1 ? '' : numberText(Math.abs(im))}i`;
  if (re === 0) return `${im < 0 ? '−' : ''}${term}`;
  return `${numberText(re)} ${im < 0 ? '−' : '+'} ${term}`;
}
export const die = (rng: () => number = Math.random) => 1 + Math.floor(rng() * 6);
export const rollDice = (n: number, rng: () => number = Math.random) => Array.from({ length: n }, () => die(rng));
export function riskProbability(attack: number, defend: number): number {
  return Array.from({ length: 6 }, (_, i) => {
    const k = i + 1;
    return ((k / 6) ** attack - ((k - 1) / 6) ** attack) * ((k - 1) / 6) ** defend;
  }).reduce((a, b) => a + b, 0);
}
export function bestKeep(dice: number[]): boolean[] {
  const counts = Array.from({ length: 6 }, (_, i) => dice.filter(v => v === i + 1).length);
  const face = counts.indexOf(Math.max(...counts)) + 1;
  return dice.map(v => v === face);
}
export function yahtzeeChance(dice: number[], keep: boolean[]): number {
  const held = dice.filter((_, i) => keep[i]);
  if (new Set(held).size > 1) return 0;
  return held.length === 0 ? 1 / 6 ** 4 : (1 / 6) ** (5 - held.length);
}
export const isYahtzee = (dice: number[]) => dice.length === 5 && dice.every(v => v === dice[0]);
let yahtzeeExact: number | undefined;
export function optimalYahtzeeProbability(): number {
  if (yahtzeeExact !== undefined) return yahtzeeExact;
  let total = 0;
  for (let code = 0; code < 6 ** 5; code++) {
    let rest = code;
    const dice = Array.from({ length: 5 }, () => { const v = rest % 6 + 1; rest = Math.floor(rest / 6); return v; });
    total += yahtzeeChance(dice, bestKeep(dice));
  }
  yahtzeeExact = total / 6 ** 5;
  return yahtzeeExact;
}
export const pairings = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]] as const;
export const pairTotals = (dice: number[]) => dice.length === 4 ? pairings.map(p => p.map(([a, b]) => dice[a] + dice[b])) : [];
export type PairOption = { pairing: number; sums: number[]; moves: number[] };
export function legalPairings(dice: number[], active: number[]): PairOption[] {
  const free = 3 - active.length;
  return pairTotals(dice).flatMap((sums, pairing) => {
    const newColumns = [...new Set(sums.filter(v => !active.includes(v)))];
    if (newColumns.length <= free) return [{ pairing, sums, moves: sums }];
    if (free === 1) return newColumns.map(v => ({ pairing, sums, moves: sums.filter(s => active.includes(s) || s === v) }));
    const moves = sums.filter(v => active.includes(v));
    return moves.length ? [{ pairing, sums, moves }] : [];
  });
}
export function pairProbability(target: number): number {
  let count = 0;
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let c = 1; c <= 6; c++) for (let d = 1; d <= 6; d++) {
    if (pairTotals([a, b, c, d]).some(sums => sums.includes(target))) count++;
  }
  return count / 1296;
}
export type WaitingMode = 'tail' | 'heads' | 'penalty';
export function waitingTrial(mode: WaitingMode, rng: () => number = Math.random, cap = 10000): { completed: boolean; value: number } {
  let previousHead = false, coins = 0;
  for (let count = 1; count <= cap; count++) {
    if (mode === 'penalty') {
      const value = die(rng);
      if (value === 6) coins -= 5;
      else return { completed: true, value: coins + value };
    } else {
      const head = rng() < 0.5;
      if ((mode === 'tail' && !head) || (mode === 'heads' && head && previousHead)) return { completed: true, value: count };
      previousHead = head;
    }
  }
  return { completed: false, value: 0 };
}
