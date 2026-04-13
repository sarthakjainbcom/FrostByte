import fighters from '@/data/fighters.json';
import { CTASection } from '@/components/CTASection';
import { FighterCard } from '@/components/FighterCard';
import { HeroCinematic } from '@/components/HeroCinematic';
import { SectionHeading } from '@/components/SectionHeading';
import { SpeedLineDivider } from '@/components/SpeedLineDivider';

export default function HomePage() {
  return (
    <div className="space-y-14">
      <HeroCinematic />
      <section><SectionHeading title="Why It Slaps" subtitle="Accessible chaos. Deep mastery. Crew synergy. Party madness." /><div className="grid gap-4 md:grid-cols-4">{['Accessible Chaos','Deep Mastery','Crew Synergy','Party Madness'].map((p)=><div key={p} className="rounded border border-white/10 p-4">{p}</div>)}</div></section>
      <section><SectionHeading title="Featured Fighters" /><div className="grid gap-4 md:grid-cols-3">{fighters.slice(0,6).map((f)=><FighterCard key={f.id} fighter={f as any} />)}</div></section>
      <SpeedLineDivider />
      <section className="grid gap-4 md:grid-cols-5">{['Dodge','Edge Guard','Ultimate Burst','Crew Assist','Stage Hazards'].map((m)=><div key={m} className="rounded border border-white/10 p-3 text-center">{m}</div>)}</section>
      <section className="grid gap-4 md:grid-cols-2"><div className="aspect-video rounded border border-white/10 p-4">Trailer Placeholder</div><div className="rounded border border-white/10 p-4"><p>Wishlist Counter: 128,450</p><p>Newsletter Crew: 42,900</p></div></section>
      <CTASection />
    </div>
  );
}
