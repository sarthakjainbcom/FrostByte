'use client';
import { useState } from 'react';

const groups = {
  Beginner: ['Damage builds knockback over time.', 'Recovery moves return you from off-stage.'],
  Intermediate: ['Parry windows open punish opportunities.', 'Meter management decides ultimate timing.'],
  Pro: ['DI and drift alter survival paths.', 'Crew assists enable route extensions and kill confirms.'],
};

export default function MechanicsPage() {
  const [tab, setTab] = useState<keyof typeof groups>('Beginner');
  return <div className="space-y-6"><h1 className="text-4xl font-black">Mechanics</h1><div className="flex gap-2">{Object.keys(groups).map((k)=><button key={k} className={`rounded px-3 py-2 ${tab===k?'bg-red':'bg-ocean/60'}`} onClick={()=>setTab(k as keyof typeof groups)}>{k}</button>)}</div><ul className="list-disc space-y-2 rounded border border-white/10 p-4 pl-8">{groups[tab].map((g)=><li key={g}>{g}</li>)}</ul></div>;
}
