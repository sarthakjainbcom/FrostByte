import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ocean/50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <div><p className="font-bold text-gold">GRAND LINE RUMBLE</p><p className="text-sm text-muted">Brawl for the King's Crest.</p></div>
        <div className="flex gap-3"><Link href="/community">Discord</Link><Link href="/media">Media</Link><Link href="/legal">Legal</Link></div>
        <div><label className="text-sm">Language</label><select aria-label="Language" className="ml-2 bg-ink"><option>EN</option></select></div>
      </div>
    </footer>
  );
}
