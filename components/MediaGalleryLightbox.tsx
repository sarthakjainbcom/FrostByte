'use client';
import Image from 'next/image';
import { useState } from 'react';

export function MediaGalleryLightbox({ media }: { media: { id: string; src: string; title: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="columns-1 gap-4 space-y-4 md:columns-3">{media.map((m, i) => <button key={m.id} onClick={() => setActive(i)} className="w-full overflow-hidden rounded"><Image src={m.src} alt={m.title} width={800} height={600} className="h-auto w-full" /></button>)}</div>
      {active !== null && <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setActive(null)} role="dialog" aria-modal="true"><Image src={media[active].src} alt={media[active].title} width={1200} height={900} /><p>{media[active].title}</p></div>}
    </>
  );
}
