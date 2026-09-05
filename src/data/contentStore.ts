// Inhalte kommen aus Supabase (Tabellen content_*), die gebuendelten TS-Dateien
// bleiben als Startwert und Offline-Fallback bestehen.
//
// Der Trick: die exportierten Arrays und Objekte werden IN PLACE ersetzt.
// Dadurch muss keine einzige Seite angefasst werden, alle bestehenden Importe
// (`import { recipes } from '../data/recipes'`) zeigen weiterhin auf dieselben
// Objekte und sehen die neuen Inhalte.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase'
import { recipes, Recipe } from './recipes'
import { recipesEn } from './recipes.en'
import { recipesFr } from './recipes.fr'
import { activities, Activity, categoryInfo as activityCategoryInfo, capabilityInfo } from './activities'
import { activitiesEn, categoryInfoEn } from './activities.en'
import { activitiesFr, categoryInfoFr } from './activities.fr'
import { milestones, agePhases, categoryInfo as milestoneCategoryInfo, Milestone, AgePhase } from './milestones'

const CACHE_KEY = 'tuki-content-cache-v1'
export const CONTENT_UPDATED_EVENT = 'tuki:content-updated'

// Unter dieser Zahl gilt eine Antwort als kaputt und wird verworfen,
// damit ein halber Response nie die gebuendelten Inhalte ueberschreibt.
const MIN_RECIPES = 10
const MIN_ACTIVITIES = 5

export interface ContentPayload {
  recipes: any[]
  activities: any[]
  milestones: any[]
  phases: any[]
  taxonomy: any[]
}

type Dict<T> = Record<string, T>

function replaceArray<T>(target: T[], next: T[]) {
  target.length = 0
  target.push(...next)
}

function replaceDict(target: Dict<any>, next: Dict<any>) {
  for (const key of Object.keys(target)) delete target[key]
  Object.assign(target, next)
}

// ---------------------------------------------------------------- anwenden

function applyRecipes(rows: any[]) {
  const de: Recipe[] = []
  const en: Dict<any> = {}
  const fr: Dict<any> = {}

  for (const row of rows) {
    const translations: any[] = row.content_recipe_translations || []
    const t = (locale: string) => translations.find(x => x.locale === locale)
    const d = t('de')
    if (!d) continue

    de.push({
      id: row.id,
      title: d.title,
      subtitle: d.subtitle,
      emoji: row.emoji,
      image: row.image,
      duration: row.duration,
      difficulty: row.difficulty,
      ageRange: [row.age_min, row.age_max],
      season: row.season,
      servings: row.servings,
      tags: d.tags,
      diet: row.diet,
      ingredients: d.ingredients,
      steps: d.steps,
      tukiTip: d.tuki_tip,
      stars: row.stars,
    } as Recipe)

    for (const locale of ['en', 'fr']) {
      const x = t(locale)
      if (!x) continue
      const entry = {
        title: x.title,
        subtitle: x.subtitle,
        tags: x.tags,
        ingredients: x.ingredients,
        steps: x.steps,
        tukiTip: x.tuki_tip,
      }
      if (locale === 'en') en[row.id] = entry
      else fr[row.id] = entry
    }
  }

  if (de.length < MIN_RECIPES) return false
  replaceArray(recipes, de)
  replaceDict(recipesEn as Dict<any>, en)
  replaceDict(recipesFr as Dict<any>, fr)
  return true
}

function applyActivities(rows: any[]) {
  const de: Activity[] = []
  const en: Dict<any> = {}
  const fr: Dict<any> = {}

  for (const row of rows) {
    const translations: any[] = row.content_activity_translations || []
    const t = (locale: string) => translations.find(x => x.locale === locale)
    const d = t('de')
    if (!d) continue

    de.push({
      id: row.id,
      title: d.title,
      subtitle: d.subtitle,
      emoji: row.emoji,
      image: row.image,
      duration: row.duration,
      ageRange: [row.age_min, row.age_max],
      category: row.category,
      difficulty: row.difficulty,
      capabilities: row.capabilities,
      materials: d.materials,
      steps: d.steps,
      learningGoals: d.learning_goals,
      tukiTip: d.tuki_tip,
      season: row.season,
      stars: row.stars,
    } as Activity)

    for (const locale of ['en', 'fr']) {
      const x = t(locale)
      if (!x) continue
      const entry = {
        title: x.title,
        subtitle: x.subtitle,
        materials: x.materials,
        steps: x.steps,
        learningGoals: x.learning_goals,
        tukiTip: x.tuki_tip,
      }
      if (locale === 'en') en[row.id] = entry
      else fr[row.id] = entry
    }
  }

  if (de.length < MIN_ACTIVITIES) return false
  replaceArray(activities, de)
  replaceDict(activitiesEn as Dict<any>, en)
  replaceDict(activitiesFr as Dict<any>, fr)
  return true
}

function applyMilestones(rows: any[]) {
  const next: Milestone[] = []
  for (const row of rows) {
    const translations: any[] = row.content_milestone_translations || []
    const d = translations.find(x => x.locale === 'de')
    if (!d) continue
    next.push({
      id: row.id,
      title: d.title,
      emoji: row.emoji,
      ageMonths: [row.age_months_min, row.age_months_max],
      category: row.category,
      description: d.description,
      expertTip: d.expert_tip,
      expertName: d.expert_name,
      expertTitle: d.expert_title,
      linkedRecipes: row.linked_recipes,
      linkedActivities: row.linked_activities,
      suggestedProducts: d.suggested_products,
    } as Milestone)
  }
  if (!next.length) return false
  replaceArray(milestones, next)
  return true
}

function applyPhases(rows: any[]) {
  const next: AgePhase[] = []
  for (const row of rows) {
    const translations: any[] = row.content_age_phase_translations || []
    const d = translations.find(x => x.locale === 'de')
    if (!d) continue
    next.push({
      id: row.id,
      label: d.label,
      range: [row.range_min_months, row.range_max_months],
      title: d.title,
      description: d.description,
      focusAreas: d.focus_areas,
      boxName: d.box_name,
      boxDescription: d.box_description,
      boxItems: d.box_items,
    } as AgePhase)
  }
  if (!next.length) return false
  replaceArray(agePhases, next)
  return true
}

function applyTaxonomy(rows: any[]) {
  const build = (kind: string, locale: string) => {
    const out: Dict<any> = {}
    for (const row of rows.filter(r => r.kind === kind)) {
      const translations: any[] = row.content_taxonomy_translations || []
      const tr = translations.find(x => x.locale === locale)
      if (!tr) continue
      out[row.key] = { label: tr.label, emoji: row.emoji, color: row.color }
    }
    return out
  }

  const catDe = build('activity_category', 'de')
  if (!Object.keys(catDe).length) return false

  replaceDict(activityCategoryInfo as Dict<any>, catDe)
  replaceDict(categoryInfoEn as Dict<any>, build('activity_category', 'en'))
  replaceDict(categoryInfoFr as Dict<any>, build('activity_category', 'fr'))

  const caps = build('capability', 'de')
  if (Object.keys(caps).length) replaceDict(capabilityInfo as Dict<any>, caps)

  const ms = build('milestone_category', 'de')
  if (Object.keys(ms).length) replaceDict(milestoneCategoryInfo as Dict<any>, ms)
  return true
}

function applyPayload(p: ContentPayload) {
  try {
    applyRecipes(p.recipes || [])
    applyActivities(p.activities || [])
    applyMilestones(p.milestones || [])
    applyPhases(p.phases || [])
    applyTaxonomy(p.taxonomy || [])
    return true
  } catch (err) {
    console.warn('[content] konnte Inhalte nicht anwenden, bleibe beim Fallback', err)
    return false
  }
}

// ------------------------------------------------------------------ laden

const REST = SUPABASE_URL + '/rest/v1'

async function get(path: string, timeoutMs: number): Promise<any> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(REST + path, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY },
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(path + ' -> ' + res.status)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

async function fetchVersion(): Promise<string | null> {
  const rows = await get('/content_version?select=updated_at&limit=1', 6000)
  return rows?.[0]?.updated_at ? String(rows[0].updated_at) : null
}

async function fetchPayload(): Promise<ContentPayload> {
  const [recipeRows, activityRows, milestoneRows, phaseRows, taxonomyRows] = await Promise.all([
    get('/content_recipes?select=*,content_recipe_translations(*)&published=eq.true&order=sort_order', 20000),
    get('/content_activities?select=*,content_activity_translations(*)&published=eq.true&order=sort_order', 20000),
    get('/content_milestones?select=*,content_milestone_translations(*)&published=eq.true&order=sort_order', 20000),
    get('/content_age_phases?select=*,content_age_phase_translations(*)&published=eq.true&order=sort_order', 20000),
    get('/content_taxonomy?select=*,content_taxonomy_translations(*)&order=sort_order', 20000),
  ])
  return {
    recipes: recipeRows || [],
    activities: activityRows || [],
    milestones: milestoneRows || [],
    phases: phaseRows || [],
    taxonomy: taxonomyRows || [],
  }
}

function readCache(): { version: string; payload: ContentPayload } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.payload?.recipes) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(version: string, payload: ContentPayload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ version, payload }))
  } catch {
    // Speicher voll oder gesperrt: dann wird eben jedes Mal neu geladen
  }
}

let cachedVersion: string | null = null

/**
 * Synchron, ohne Netz: wendet zwischengespeicherte Inhalte an.
 * Wird VOR dem ersten Rendern aufgerufen, damit der Start nie blockiert.
 */
export function applyCachedContent(): boolean {
  const cached = readCache()
  if (!cached) return false
  cachedVersion = cached.version
  return applyPayload(cached.payload)
}

/**
 * Holt im Hintergrund frische Inhalte. Aendert sich nichts, passiert nichts.
 * Jeder Fehler ist folgenlos: dann bleiben Cache oder gebuendelte Inhalte stehen.
 */
export async function refreshContent(): Promise<void> {
  try {
    const version = await fetchVersion()
    if (version && version === cachedVersion) return
    const payload = await fetchPayload()
    if (!applyPayload(payload)) return
    if (version) {
      cachedVersion = version
      writeCache(version, payload)
    }
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT))
  } catch (err) {
    console.warn('[content] Aktualisierung fehlgeschlagen, nutze vorhandene Inhalte', err)
  }
}
