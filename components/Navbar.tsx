'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileNavSheet } from './MobileNavSheet';

const links = ['fighters', 'stages', 'modes', 'mechanics', 'roadmap', 'media', 'community', 'runtime'];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main navigation">
        <Link href="/" className="font-black text-gold">GRAND LINE RUMBLE</Link>
        <div className="hidden items-center gap-4 md:flex">
          {links.map((href) => <Link key={href} className={pathname?.startsWith('/' + href) ? 'text-cyan' : 'text-ivory'} href={`/${href}`}>{href}</Link>)}
          <Link href="/playtest" className="rounded bg-red px-3 py-2 font-bold">Join Playtest</Link>
        </div>
        <button aria-label="Open menu" className="md:hidden" onClick={() => setOpen(true)}><Menu /></button>
      </nav>
      <MobileNavSheet open={open} onOpenChange={setOpen} links={links} />
    </header>
  );
}
