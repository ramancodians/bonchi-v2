/**
 * i18n Utility Functions
 * Helper functions for internationalization
 */

import { LanguageCode, languages } from './config';
import { commonTranslations, TranslationKeys } from './translations';

/**
 * Get translation for a specific key and language
 */
export const translate = (
  key: keyof TranslationKeys,
  language: LanguageCode
): string => {
  return commonTranslations[language][key] || key;
};

/**
 * Format number based on locale
 */
export const formatNumber = (
  value: number,
  language: LanguageCode,
  options?: Intl.NumberFormatOptions
): string => {
  const locale = getLocaleFromLanguageCode(language);
  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * Format currency based on locale
 */
export const formatCurrency = (
  value: number,
  language: LanguageCode,
  currency: string = 'INR'
): string => {
  const locale = getLocaleFromLanguageCode(language);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format date based on locale
 */
export const formatDate = (
  date: Date | string | number,
  language: LanguageCode,
  options?: Intl.DateTimeFormatOptions
): string => {
  const locale = getLocaleFromLanguageCode(language);
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Convert language code to locale string
 */
export const getLocaleFromLanguageCode = (language: LanguageCode): string => {
  const localeMap: Record<LanguageCode, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
  };
  return localeMap[language] || 'en-IN';
};

/**
 * Get browser's preferred language
 */
export const getBrowserLanguage = (): LanguageCode => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0] as LanguageCode;

  // Check if the browser language is one of our supported languages
  if (langCode in languages) {
    return langCode;
  }

  return 'en'; // Default to English
};

/**
 * Pluralization helper
 */
export const pluralize = (
  count: number,
  singular: string,
  plural: string
): string => {
  return count === 1 ? singular : plural;
};

/**
 * Get language direction (for future RTL support)
 */
export const getLanguageDirection = (language: LanguageCode): 'ltr' | 'rtl' => {
  return languages[language].direction;
};

/**
 * Validate and sanitize language code
 */
export const sanitizeLanguageCode = (code: string): LanguageCode => {
  const normalized = code.toLowerCase().split('-')[0] as LanguageCode;
  return normalized in languages ? normalized : 'en';
};
