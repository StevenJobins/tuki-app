import de from './de'
import fr from './fr'
import en from './en'
import type { Translations } from './de'

export const translations: Record<string, Translations> = { de, fr, en }

export type { Translations }
export { de, fr, en }
