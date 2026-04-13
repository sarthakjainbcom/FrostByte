import modes from '@/data/modes.json';
import { ModeCard } from '@/components/ModeCard';

export default function ModesPage() {
  return <div className="space-y-6"><h1 className="text-4xl font-black">Modes</h1><div className="grid gap-4 md:grid-cols-3">{modes.map((m)=> <ModeCard key={m.name} mode={m as any} />)}</div></div>;
}
