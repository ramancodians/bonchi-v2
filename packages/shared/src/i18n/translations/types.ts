/**
 * Translation key types
 * Define all translation keys here to ensure type safety across all languages
 */

export type TranslationKeys = {
  // Common Actions
  'common.submit': string;
  'common.cancel': string;
  'common.save': string;
  'common.delete': string;
  'common.edit': string;
  'common.search': string;
  'common.filter': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.yes': string;
  'common.no': string;
  'common.confirm': string;
  'common.back': string;
  'common.next': string;
  'common.previous': string;
  'common.close': string;

  // Auth
  'auth.login': string;
  'auth.logout': string;
  'auth.register': string;
  'auth.forgotPassword': string;
  'auth.resetPassword': string;
  'auth.email': string;
  'auth.password': string;
  'auth.confirmPassword': string;
  'auth.rememberMe': string;

  // Navigation
  'nav.home': string;
  'nav.dashboard': string;
  'nav.profile': string;
  'nav.settings': string;

  // Messages
  'message.welcome': string;
  'message.goodbye': string;
  'message.sessionExpired': string;
  'message.networkError': string;
  'message.unknownError': string;

  // Page Titles
  'page.login': string;
  'page.register': string;
  'page.forgotPassword': string;
  'page.notFound': string;
  'page.home': string;
  'page.appointments': string;
  'page.support': string;
  'page.dashboard': string;
};
