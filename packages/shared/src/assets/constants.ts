/**
 * Common asset paths and constants
 */

export const ASSET_PATHS = {
  images: '/images',
  icons: '/icons',
  logos: '/logos',
  fonts: '/fonts',
  styles: '/styles',
  videos: '/videos',
  audio: '/audio',
  documents: '/documents',
} as const;

export const IMAGE_FORMATS = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  ico: 'image/x-icon',
} as const;

export const SUPPORTED_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
] as const;

export const SUPPORTED_VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'] as const;

export const SUPPORTED_AUDIO_EXTENSIONS = [
  '.mp3',
  '.wav',
  '.flac',
  '.ogg',
] as const;

export const SUPPORTED_FONT_EXTENSIONS = [
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
] as const;

export const SUPPORTED_STYLE_EXTENSIONS = [
  '.css',
  '.scss',
  '.sass',
  '.less',
] as const;

/**
 * Asset quality presets for optimization
 */
export const IMAGE_QUALITY = {
  low: 50,
  medium: 75,
  high: 90,
  max: 100,
} as const;

/**
 * Common responsive breakpoints
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  ultrawide: 1920,
} as const;

/**
 * Image size presets
 */
export const IMAGE_SIZES = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 1200,
  xlarge: 1920,
} as const;
