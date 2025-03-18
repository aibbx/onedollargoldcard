
export type LanguageCode = 'en' | 'es' | 'pt' | 'ru' | 'fr' | 'de' | 'zh' | 'zh-CN' | 'hi' | 'id' | 'ja';

export interface TranslationDictionary {
  [key: string]: string;
}

export interface Translations {
  [language: string]: TranslationDictionary;
}

export const availableLanguages: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '繁體中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ja', name: '日本語' },
];
