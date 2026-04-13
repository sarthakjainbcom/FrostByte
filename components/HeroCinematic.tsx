'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NoiseTextureOverlay } from './NoiseTextureOverlay';

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ocean to-ink p-8">
      <NoiseTextureOverlay />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-cyan">Manga Platform Fighter</p>
        <h1 className="mt-2 text-5xl font-black uppercase text-ivory">GRAND LINE RUMBLE</h1>
        <p className="mt-2 max-w-xl text-muted">Brawl for the King's Crest.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/playtest" className="rounded bg-red px-4 py-3 font-bold">Join Playtest</Link>
          <Link href="/media" className="rounded border border-cyan px-4 py-3">Watch Trailer</Link>
        </div>
      </motion.div>
    </section>
  );
}
