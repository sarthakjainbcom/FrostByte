import roadmap from '@/data/roadmap.json';
import { TimelineRoadmap } from '@/components/TimelineRoadmap';

export default function RoadmapPage() {
  return <div className="space-y-6"><h1 className="text-4xl font-black">Roadmap</h1><TimelineRoadmap items={roadmap as any} /></div>;
}
