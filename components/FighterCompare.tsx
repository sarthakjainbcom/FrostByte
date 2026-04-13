'use client';
import type { Fighter } from '@/lib/types';

export function FighterCompare({ left, right }: { left?: Fighter; right?: Fighter }) {
  if (!left || !right) return <p className="rounded border border-dashed border-white/20 p-4 text-sm text-muted">Select two fighters to compare.</p>;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[left, right].map((f) => <div key={f.id} className="rounded border border-white/10 p-4"><h4 className="font-bold">{f.codename}</h4><p className="text-sm">Mobility: {f.mobility}</p><p className="text-sm">Range: {f.range}</p><p className="text-sm">Difficulty: {f.difficulty}/5</p></div>)}
    </div>
  );
}
