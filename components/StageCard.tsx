import type { Stage } from '@/lib/types';
import { HazardMeter } from './HazardMeter';

export function StageCard({ stage }: { stage: Stage }) {
  return <article className="rounded border border-white/10 p-4"><h3 className="font-bold">{stage.name}</h3><p className="text-sm text-muted">{stage.theme}</p><HazardMeter value={stage.hazardIntensity} /><p className="mt-2 text-sm">Hazards: {stage.hazards.join(', ')}</p></article>;
}
