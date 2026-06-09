const FALLBACK_IMAGES = [
  "/site/a-0820.jpg",
  "/site/a-0817.jpg",
  "/site/a-1326.jpg",
  "/site/a-0796.jpg",
  "/site/a-0933.jpg",
  "/site/a-0919.jpg",
  "/site/a-0795.jpg",
  "/site/a-1394.jpg",
  "/site/a-0738.jpg",
  "/site/a-1403.jpg"
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
