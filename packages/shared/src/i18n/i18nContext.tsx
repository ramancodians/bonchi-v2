/**
 * i18n Context for React applications
 * Provides language state and translation functions
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  LanguageCode,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isValidLanguageCode,
} from './config';
import { TranslationKeys, commonTranslations } from './translations';

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: LanguageCode;
}

/**
 * Get the stored language from localStorage
 */
const getStoredLanguage = (): LanguageCode => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isValidLanguageCode(stored)) {
      return stored;
    }
  } catch (error) {
    console.error('Error reading language from storage:', error);
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Store language preference in localStorage
 */
const storeLanguage = (lang: LanguageCode): void => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.error('Error storing language:', error);
  }
};

/**
 * i18n Provider Component
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  defaultLanguage = DEFAULT_LANGUAGE,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return getStoredLanguage() || defaultLanguage;
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    storeLanguage(lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  const t = (key: keyof TranslationKeys): string => {
    return commonTranslations[language][key] || key;
  };

  useEffect(() => {
    // Set initial HTML lang attribute
    document.documentElement.lang = language;
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * Hook to use i18n context
 */
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

/**
 * Hook to get translation function
 */
export const useTranslation = () => {
  const { t, language } = useI18n();
  return { t, language };
};
