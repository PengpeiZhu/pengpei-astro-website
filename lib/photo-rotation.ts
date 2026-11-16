const rotationStart = Date.UTC(2026, 10, 16);
const fortnight = 14 * 24 * 60 * 60 * 1000;
const featuredCount = 4;

export function getPhotoRotation(now: number) {
  const period = Math.max(0, Math.floor((now - rotationStart) / fortnight));
  const nextRotation = rotationStart + (period + 1) * fortnight;
  return { period, delay: Math.min(fortnight, nextRotation - now) };
}

export function groupGalleryPhotos<T>(photos: readonly T[], period: number) {
  if (photos.length <= featuredCount) return { featured: photos, more: [] };

  const start = (period * featuredCount) % photos.length;
  const ordered = [...photos.slice(start), ...photos.slice(0, start)];
  const featured = ordered.slice(0, featuredCount);
  const more = photos.filter(photo => !featured.includes(photo));
  return { featured, more };
}
