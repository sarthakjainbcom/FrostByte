'use client';
import Link from 'next/link';

export function MobileNavSheet({ open, onOpenChange, links }: { open: boolean; onOpenChange: (v: boolean) => void; links: string[] }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/95 p-6 md:hidden">
      <button className="mb-4" onClick={() => onOpenChange(false)}>Close</button>
      <div className="flex flex-col gap-4">
        {links.map((href) => <Link key={href} href={`/${href}`} onClick={() => onOpenChange(false)}>{href}</Link>)}
        <Link href="/playtest" onClick={() => onOpenChange(false)} className="rounded bg-red px-3 py-2">Join Playtest</Link>
      </div>
    </div>
  );
}
