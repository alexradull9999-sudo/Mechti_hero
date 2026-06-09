const FALLBACK_IMAGES = [
  "/catalog/a-0820.jpg",
  "/catalog/a-0817.jpg",
  "/catalog/a-1326.jpg",
  "/catalog/a-0796.jpg",
  "/catalog/a-0933.jpg",
  "/catalog/a-0919.jpg",
  "/catalog/a-0795.jpg",
  "/catalog/a-1394.jpg",
  "/catalog/a-0738.jpg",
  "/catalog/a-1403.jpg"
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
