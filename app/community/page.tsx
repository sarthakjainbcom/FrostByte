import faq from '@/data/faq.json';
import { FAQAccordion } from '@/components/FAQAccordion';

export default function CommunityPage() {
  return <div className="space-y-6"><h1 className="text-4xl font-black">Community</h1><a className="inline-block rounded bg-indigo-500 px-4 py-2" href="#">Join Discord</a><div className="rounded border border-white/10 p-4">Events Calendar Mock + Tournament Kit Downloads</div><FAQAccordion items={faq as any} /><section className="rounded border border-white/10 p-4"><h2 className="font-bold">Code of Conduct</h2><p className="text-sm text-muted">Respect players, report abuse, celebrate fair competition.</p></section></div>;
}
