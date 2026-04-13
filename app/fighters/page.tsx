'use client';
import fightersData from '@/data/fighters.json';
import { FighterCard } from '@/components/FighterCard';
import { FighterCompare } from '@/components/FighterCompare';
import { FighterDetailModal } from '@/components/FighterDetailModal';
import type { Fighter } from '@/lib/types';
import { useMemo, useState } from 'react';

export default function FightersPage() {
  const fighters = fightersData as Fighter[];
  const [query, setQuery] = useState('');
  const [arch, setArch] = useState('All');
  const [selected, setSelected] = useState<Fighter | undefined>();
  const [compare, setCompare] = useState<Fighter[]>([]);
  const filtered = useMemo(() => fighters.filter((f) => f.codename.toLowerCase().includes(query.toLowerCase()) && (arch === 'All' || f.archetype === arch)), [fighters, query, arch]);
  return <div className="space-y-6"><h1 className="text-4xl font-black">Fighters</h1><div className="flex gap-3"><input aria-label="Search fighters" className="rounded bg-ocean/50 p-2" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} /><select className="rounded bg-ocean/50 p-2" value={arch} onChange={(e)=>setArch(e.target.value)}><option>All</option>{[...new Set(fighters.map((f)=>f.archetype))].map((a)=><option key={a}>{a}</option>)}</select></div>{filtered.length===0?<p className="text-muted">No fighters match your filters.</p>:<div className="grid gap-4 md:grid-cols-3">{filtered.map((f)=><div key={f.id} className="space-y-2"><FighterCard fighter={f} onSelect={setSelected} /><button className="text-sm text-cyan" onClick={()=>setCompare((prev)=>prev.find((p)=>p.id===f.id)?prev:prev.length<2?[...prev,f]:[prev[1],f])}>Compare</button></div>)}</div>}<FighterCompare left={compare[0]} right={compare[1]} /><FighterDetailModal fighter={selected} onClose={()=>setSelected(undefined)} /></div>;
}
