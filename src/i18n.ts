import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

const resources = {
  de: { translation: de },
  en: { translation: en },
  fr: { translation: fr },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'tuki-language',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
