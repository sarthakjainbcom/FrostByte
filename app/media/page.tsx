import media from '@/data/media.json';
import { MediaGalleryLightbox } from '@/components/MediaGalleryLightbox';

export default function MediaPage() {
  return <div className="space-y-6"><h1 className="text-4xl font-black">Media</h1><div className="aspect-video rounded border border-white/10 p-4">Trailer player placeholder</div><a href="#" className="inline-block rounded bg-cyan px-4 py-2 text-ink">Download Press Kit</a><MediaGalleryLightbox media={media as any} /></div>;
}
