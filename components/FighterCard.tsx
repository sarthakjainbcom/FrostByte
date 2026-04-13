import type { Fighter } from '@/lib/types';

export function FighterCard({ fighter, onSelect }: { fighter: Fighter; onSelect?: (f: Fighter) => void }) {
  return (
    <button onClick={() => onSelect?.(fighter)} className="w-full rounded-lg border border-white/10 bg-ocean/40 p-4 text-left hover:border-cyan">
      <p className="text-xs text-cyan">{fighter.archetype}</p>
      <h3 className="text-xl font-bold">{fighter.codename}</h3>
      <p className="text-sm text-muted">{fighter.blurb}</p>
      <p className="mt-2 text-sm">Ultimate: {fighter.ultimateMove}</p>
    </button>
  );
}
