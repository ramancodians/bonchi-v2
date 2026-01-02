/**
 * Language Switcher Component
 * Dropdown component for switching between languages
 */

import React from 'react';
import { useI18n, getEnabledLanguages } from '@bonchi/shared';
import type { LanguageCode } from '@bonchi/shared';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();
  const enabledLanguages = getEnabledLanguages();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as LanguageCode);
  };

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select Language"
      >
        {enabledLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};
