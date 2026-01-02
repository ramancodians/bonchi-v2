/**
 * Common translations used across the application
 * This file combines all individual language translation files
 */

import type { LanguageCode } from '../config';
import type { TranslationKeys } from './types';

// Import individual language translations
import { en } from './en';
import { hi } from './hi';
import { ta } from './ta';
import { te } from './te';
import { bn } from './bn';
import { mr } from './mr';
import { gu } from './gu';
import { kn } from './kn';

// Export types
export type { TranslationKeys };

// Combine all translations
export const commonTranslations: Record<LanguageCode, TranslationKeys> = {
  en,
  hi,
  ta,
  te,
  bn,
  mr,
  gu,
  kn,
};
