import React from 'react';
import { useTranslation } from '@bonchi/shared';
import { BonchiLogo } from '@bonchi/shared/assets';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src={BonchiLogo} alt="Bonchi Logo" className="h-8 w-auto" />

          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              {t('nav.home')}
            </a>
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
              {t('nav.dashboard')}
            </a>
            <a href="/profile" className="text-gray-700 hover:text-blue-600">
              {t('nav.profile')}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {t('auth.login')}
          </button>
        </div>
      </nav>
    </header>
  );
};
