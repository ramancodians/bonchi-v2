/**
 * i18n Configuration for Indian Languages
 * Supports 8 major Indian languages with extensibility for more
 */

export type LanguageCode =
  | 'en' // English
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'bn' // Bengali
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'kn'; // Kannada

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  enabled: boolean;
}

export const languages: Record<LanguageCode, Language> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    enabled: true,
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    enabled: true,
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    direction: 'ltr',
    enabled: true,
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    direction: 'ltr',
    enabled: true,
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    direction: 'ltr',
    enabled: true,
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    direction: 'ltr',
    enabled: true,
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    direction: 'ltr',
    enabled: true,
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    direction: 'ltr',
    enabled: true,
  },
};

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const LANGUAGE_STORAGE_KEY = 'bonchi_app_language';

/**
 * Get list of enabled languages
 */
export const getEnabledLanguages = (): Language[] => {
  return Object.values(languages).filter((lang) => lang.enabled);
};

/**
 * Check if a language code is valid
 */
export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return code in languages;
};

/**
 * Get language by code
 */
export const getLanguage = (code: LanguageCode): Language => {
  return languages[code];
};
