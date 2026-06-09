const FALLBACK_IMAGES = [
  "/site-images/photo-1600210492486-724fe5c67fb0.avif", // Modern living room
  "/site-images/photo-1600607687920-4e2a09cf159d.jpg", // Upscale kitchen/living
  "/site-images/photo-1600566753376-12c8ab7fb75b.avif", // High-end design living room
  "/site-images/photo-1545324418-cc1a3fa10c00.jpg", // Architecture exterior building
  "/site-images/photo-1613490493576-7fde63acd811.jpg", // Contemporary luxury villa/apartment
  "/site-images/photo-1600585154340-be6161a56a0c.avif", // Modern house interior
  "/site-images/photo-1512917774080-9991f1c4c750.jpg", // Luxury house exterior/patio
  "/site-images/photo-1600596542815-ffad4c1539a9.jpg", // Modern estate
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
