export function HazardMeter({ value }: { value: number }) {
  return <div aria-label={`Hazard intensity ${value} of 5`} className="h-2 rounded bg-white/10"><div className="h-2 rounded bg-red" style={{ width: `${(value / 5) * 100}%` }} /></div>;
}
