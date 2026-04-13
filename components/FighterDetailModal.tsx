'use client';
import type { Fighter } from '@/lib/types';

export function FighterDetailModal({ fighter, onClose }: { fighter?: Fighter; onClose: () => void }) {
  if (!fighter) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="max-w-lg rounded-lg bg-ink p-6">
        <button className="float-right" onClick={onClose}>Close</button>
        <h3 className="text-2xl font-bold">{fighter.codename}</h3>
        <p className="mt-2 text-muted">{fighter.blurb}</p>
        <p className="mt-2">Signature: {fighter.signatureMove}</p>
        <ul className="mt-2 list-disc pl-5 text-sm">{fighter.comboTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </div>
    </div>
  );
}
