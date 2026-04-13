import type { Metadata } from 'next';

const base = 'https://grandlinerumble.example.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: 'GRAND LINE RUMBLE', template: '%s | GRAND LINE RUMBLE' },
  description: "Brawl for the King's Crest. Manga-styled platform fighter with chaotic crew battles.",
  openGraph: { title: 'GRAND LINE RUMBLE', description: "Brawl for the King's Crest.", url: base, siteName: 'GRAND LINE RUMBLE', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'GRAND LINE RUMBLE', description: "Brawl for the King's Crest." }
};

export const videoGameJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'GRAND LINE RUMBLE',
  genre: ['Fighting', 'Platform Fighter'],
  description: 'Manga-styled pirate arena fighter with crew rivalries and party modes.'
};
