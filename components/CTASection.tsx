import Link from 'next/link';

export function CTASection({ title = 'Sail into the Arena' }: { title?: string }) {
  return <section className="rounded-xl bg-gradient-to-r from-red to-gold p-8 text-ink"><h3 className="text-3xl font-black uppercase">{title}</h3><p className="mt-2">Claim your slot in the next closed playtest.</p><Link href="/playtest" className="mt-4 inline-block rounded bg-ink px-4 py-2 text-ivory">Enter the Arena</Link></section>;
}
