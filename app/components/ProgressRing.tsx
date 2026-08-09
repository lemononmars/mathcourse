export function ProgressRing({ value }: { value: number }) {
  return <div className="radial-progress text-primary" style={{ "--value": value, "--size": "3rem", "--thickness": "4px" } as React.CSSProperties} role="progressbar" aria-label={`${value}% complete`}><span className="text-xs font-bold">{value}%</span></div>;
}
