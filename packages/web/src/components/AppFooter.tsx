import React from 'react';
import { useI18n } from '@bonchi/shared';

const AppFooter: React.FC = () => {
  const { language, setLanguage } = useI18n();

  const languages = [
    { code: 'en', name: 'English (UK)' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ];

  const changeLanguage = (languageCode: string) => {
    setLanguage(languageCode as 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn');
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto pt-4">
        {/* Language Selector */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-600">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`hover:underline ${
                language === lang.code ? 'font-semibold' : ''
              }`}
            >
              {lang.name}
            </button>
          ))}
          <button className="px-2 border border-gray-300 hover:bg-gray-50 rounded">
            +
          </button>
        </div>

        <hr className="border-gray-200 mb-2" />
      </div>
    </footer>
  );
};

export default AppFooter;
