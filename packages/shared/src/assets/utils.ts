/**
 * Asset utilities and helpers
 */

/**
 * Get the full URL for an asset
 * Useful for assets served from CDN or static paths
 */
export const getAssetUrl = (path: string, baseUrl?: string): string => {
  const base = baseUrl || '';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Preload an image
 * Returns a promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (sources: string[]): Promise<void> => {
  await Promise.all(sources.map((src) => preloadImage(src)));
};

/**
 * Get responsive image srcSet string
 */
export const getResponsiveSrcSet = (
  basePath: string,
  sizes: number[]
): string => {
  return sizes
    .map((size) => {
      const path = basePath.replace(/\.(jpg|jpeg|png|webp)$/i, `@${size}w.$1`);
      return `${path} ${size}w`;
    })
    .join(', ');
};

/**
 * Asset type checker
 */
export const isImage = (filename: string): boolean => {
  return /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(filename);
};

export const isVideo = (filename: string): boolean => {
  return /\.(mp4|webm|ogg)$/i.test(filename);
};

export const isAudio = (filename: string): boolean => {
  return /\.(mp3|wav|flac|ogg)$/i.test(filename);
};

export const isFont = (filename: string): boolean => {
  return /\.(woff|woff2|ttf|eot|otf)$/i.test(filename);
};

export const isStyle = (filename: string): boolean => {
  return /\.(css|scss|sass|less)$/i.test(filename);
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Get MIME type from filename
 */
export const getMimeType = (filename: string): string => {
  const ext = getFileExtension(filename);
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    ico: 'image/x-icon',

    // Videos
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',

    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    flac: 'audio/flac',

    // Fonts
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    otf: 'font/otf',
    eot: 'application/vnd.ms-fontobject',

    // Styles
    css: 'text/css',

    // Documents
    pdf: 'application/pdf',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    txt: 'text/plain',
    md: 'text/markdown',
  };

  return mimeTypes[ext] || 'application/octet-stream';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
