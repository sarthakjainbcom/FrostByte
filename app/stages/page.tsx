import stages from '@/data/stages.json';
import { StageCard } from '@/components/StageCard';

export default function StagesPage() {
  return <div className="space-y-6"><h1 className="text-4xl font-black">Stages</h1><div className="grid gap-4 md:grid-cols-3">{stages.map((s)=><StageCard key={s.id} stage={s as any} />)}</div><div className="rounded border border-white/10 p-4">Interactive Mini-map Mockup: animated hazard icons coming in production.</div></div>;
}
