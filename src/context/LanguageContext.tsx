
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, LanguageCode } from '../data/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: { code: LanguageCode; name: string }[];
}

const availableLanguages: { code: LanguageCode; name: string }[] = [
  { code: 'en' as LanguageCode, name: 'English' },
  { code: 'es' as LanguageCode, name: 'Español' },
  { code: 'pt' as LanguageCode, name: 'Português' },
  { code: 'ru' as LanguageCode, name: 'Русский' },
  { code: 'fr' as LanguageCode, name: 'Français' },
  { code: 'de' as LanguageCode, name: 'Deutsch' },
  { code: 'zh' as LanguageCode, name: '繁體中文' },
  { code: 'hi' as LanguageCode, name: 'हिन्दी' },
  { code: 'id' as LanguageCode, name: 'Bahasa Indonesia' },
  { code: 'ja' as LanguageCode, name: '日本語' },
];

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  availableLanguages,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language') as LanguageCode;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem('language', code);
    document.documentElement.lang = code;
  };

  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      // Fall back to English if translation not found
      return translations.en[key] || key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
