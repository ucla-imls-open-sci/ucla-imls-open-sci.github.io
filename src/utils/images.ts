import type { ImageMetadata } from 'astro';
import defaultImg from '../assets/img/committee/default.jpeg';

// Eager-import all images from src/assets/img/ so Astro optimizes them at build time.
// Keys are absolute project-root paths: "/src/assets/img/staff/timdennis.jpeg"
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,jfif,JFIF,webp,WEBP}',
  { eager: true }
);

/**
 * Convert a YAML image path to an Astro-optimized ImageMetadata object.
 *
 * YAML paths look like  "/assets/img/staff/timdennis.jpeg"
 * Glob keys look like   "/src/assets/img/staff/timdennis.jpeg"
 *
 * Falls back to the original string path if the image isn't in src/assets/img/
 * (e.g. external URLs or files still in public/ only), so nothing breaks.
 */
export function resolveImage(path: string | undefined | null): ImageMetadata | string {
  if (!path) return defaultImg;

  // Normalize to "/assets/img/..." regardless of whether there's a leading slash
  const withSlash = path.startsWith('/') ? path : `/${path}`;

  // Map public path → src path for glob lookup
  const key = withSlash.startsWith('/assets/img/')
    ? withSlash.replace('/assets/img/', '/src/assets/img/')
    : withSlash;

  return imageModules[key]?.default ?? path;
}

export { defaultImg };
