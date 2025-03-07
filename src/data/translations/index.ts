import { LanguageCode, TranslationDictionary, Translations, availableLanguages } from './types';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { ru } from './ru';
import { fr } from './fr';
import { de } from './de';
import { zh } from './zh';
import { hi } from './hi';
import { id } from './id';
import { ja } from './ja';

// Import all language translations
const translations: Translations = {
  en,
  es,
  pt,
  ru,
  fr,
  de,
  zh,
  hi,
  id,
  ja,
};

export { translations, availableLanguages };
export type { LanguageCode, TranslationDictionary, Translations };
