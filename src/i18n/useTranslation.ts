import { useApp } from '../context/AppContext'
import { translations } from './index'

export function useTranslation() {
  const { language } = useApp()
  const t = translations[language] || translations.de
  return { t, language }
}
