const FALLBACK_IMAGES = [
  "/properties/61371781dd3aba13ffd87ddda7c9e377.jpg",
  "/properties/80a902b709dfd9c8920763eb046059a3.jpg",
  "/properties/cb07d5615ecd6b9cd932c0249170d23a.jpg",
  "/properties/cde55e9ae6ea308ded14e008b681b464.jpg",
  "/properties/ef3c0d804e1fc0d3f60f9a9090a1241d.jpg",
  "/properties/05131e7e366e211566d36a4d7859d244.jpg",
  "/properties/6728f7f72e397076ef2453247130a25d.jpg",
  "/properties/c7f59fb7205e12f5979f1fcf2081cd09.jpg",
  "/properties/d7f90df5bcda29cff5744a1e231cddb9.jpg",
  "/properties/01137e329dca2874d7f12b5a644f2741.jpg"
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
