'use client';
import { useState } from 'react';

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return <div className="space-y-2">{items.map((item) => <div key={item.q} className="rounded border border-white/10"><button className="w-full px-4 py-3 text-left" onClick={() => setOpen(open === item.q ? null : item.q)}>{item.q}</button>{open === item.q && <p className="px-4 pb-3 text-sm text-muted">{item.a}</p>}</div>)}</div>;
}
