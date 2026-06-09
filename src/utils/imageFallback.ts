const FALLBACK_IMAGES = [
  "/site/a-0820.avif",
  "/site/a-0817.avif",
  "/site/a-1326.avif",
  "/site/a-0796.avif",
  "/site/a-0933.avif",
  "/site/a-0919.avif",
  "/site/a-0795.avif",
  "/site/a-1394.avif",
  "/site/a-0738.avif",
  "/site/a-1403.avif"
];

export function getFallbackImage(path: string): string {
  if (!path) return FALLBACK_IMAGES[0];
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    hash = path.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[index];
}
