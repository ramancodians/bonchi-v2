/**
 * Assets Module
 * Export utilities, constants, and asset files
 */

// Export utilities and constants
export * from './utils';
export * from './constants';

// Export asset files
export * from './files';

/**
 * Usage:
 * import { Logo, preloadImage, IMAGE_SIZES } from '@bonchi/shared/assets';
 *
 * To add more assets:
 * 1. Place files in appropriate subdirectories under ./files/
 * 2. Export them in ./files/index.ts
 * 3. They'll be available via '@bonchi/shared/assets'
 */
