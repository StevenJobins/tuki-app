import { supabase } from './supabase'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

/**
 * Abgleich des App-Zustands mit Supabase.
 *
 * Bis August 2026 lagen Kinderprofile, Favoriten und Wochenplan ausschliesslich
 * im localStorage. Damit war ein Geraetewechsel gleichbedeutend mit Datenverlust,
 * und auswerten liess sich gar nichts: die Tabellen children und favorites waren
 * leer, obwohl Leute die App eingerichtet hatten.
 *
 * Seither gilt: der vollstaendige Zustand liegt als JSON in public.user_state,
 * damit nichts verloren geht. Kinder, Favoriten und erledigte Inhalte werden
 * zusaetzlich relational gespiegelt, damit sie abfragbar sind.
 *
 * Ohne Konto laeuft die App unveraendert weiter, nur eben lokal.
 */

type Liste = string[]

export interface ServerZustand {
  [key: string]: unknown
}

function alsListe(wert: unknown): Liste {
  return Array.isArray(wert) ? wert.filter(x => typeof x === 'string') : []
}

function vereinige(a: unknown, b: unknown): Liste {
  return Array.from(new Set([...alsListe(a), ...alsListe(b)]))
}

function sterneSumme(rezeptIds: Liste, aktivitaetIds: Liste): number {
  let total = 0
  for (const id of rezeptIds) {
    const r = recipes.find(x => x.id === id)
    total += r ? r.stars : 1
  }
  for (const id of aktivitaetIds) {
    const a = activities.find(x => x.id === id)
    total += a ? a.stars : 1
  }
  return total
}

function vereinigeWochenplan(a: unknown, b: unknown): Record<string, Liste> {
  const links = (a && typeof a === 'object' ? a : {}) as Record<string, unknown>
  const rechts = (b && typeof b === 'object' ? b : {}) as Record<string, unknown>
  const ergebnis: Record<string, Liste> = {}
  for (const tag of new Set([...Object.keys(links), ...Object.keys(rechts)])) {
    ergebnis[tag] = vereinige(links[tag], rechts[tag])
  }
  return ergebnis
}

function vereinigeKindDaten(a: unknown, b: unknown): Record<string, unknown> {
  const links = (a && typeof a === 'object' ? a : {}) as Record<string, any>
  const rechts = (b && typeof b === 'object' ? b : {}) as Record<string, any>
  const ergebnis: Record<string, unknown> = {}
  for (const id of new Set([...Object.keys(links), ...Object.keys(rechts)])) {
    const l = links[id] || {}
    const r = rechts[id] || {}
    const rezepte = vereinige(l.completedRecipes, r.completedRecipes)
    const akt = vereinige(l.completedActivities, r.completedActivities)
    ergebnis[id] = {
      favorites: vereinige(l.favorites, r.favorites),
      completedRecipes: rezepte,
      completedActivities: akt,
      weekPlan: vereinigeWochenplan(l.weekPlan, r.weekPlan),
      tukiStars: {
        total: sterneSumme(rezepte, akt),
        spent: Math.max(l.tukiStars?.spent || 0, r.tukiStars?.spent || 0),
        level: Math.max(l.tukiStars?.level || 0, r.tukiStars?.level || 0),
        levelName: r.tukiStars?.levelName || l.tukiStars?.levelName || 'Kleiner Entdecker',
      },
    }
  }
  return ergebnis
}

/**
 * Server- und Geraetezustand zusammenfuehren. Nichts wird verworfen: Listen
 * werden vereinigt, damit weder das Geraet noch der Server Daten verliert.
 * Sprache und Darstellung bleiben Geraeteeinstellungen, da gewinnt lokal.
 */
export function vereineZustaende(server: any, lokal: any): any {
  if (!server || typeof server !== 'object') return lokal

  const kinderNachId = new Map<string, any>()
  for (const kind of [...(server.children || []), ...(lokal.children || [])]) {
    if (kind && kind.id) kinderNachId.set(kind.id, { ...kinderNachId.get(kind.id), ...kind })
  }
  const kinder = Array.from(kinderNachId.values())

  const rezepte = vereinige(server.completedRecipes, lokal.completedRecipes)
  const akt = vereinige(server.completedActivities, lokal.completedActivities)

  return {
    ...server,
    ...lokal,
    children: kinder,
    activeChildId: lokal.activeChildId || server.activeChildId || (kinder[0]?.id ?? null),
    favorites: vereinige(server.favorites, lokal.favorites),
    completedRecipes: rezepte,
    completedActivities: akt,
    weekPlan: vereinigeWochenplan(server.weekPlan, lokal.weekPlan),
    childData: vereinigeKindDaten(server.childData, lokal.childData),
    redeemedRewards: vereinige(server.redeemedRewards, lokal.redeemedRewards),
    tukiStars: {
      total: sterneSumme(rezepte, akt),
      spent: Math.max(server.tukiStars?.spent || 0, lokal.tukiStars?.spent || 0),
      level: Math.max(server.tukiStars?.level || 0, lokal.tukiStars?.level || 0),
      levelName: lokal.tukiStars?.levelName || server.tukiStars?.levelName || 'Kleiner Entdecker',
    },
    isOnboarded: Boolean(server.isOnboarded || lokal.isOnboarded),
    language: lokal.language || server.language || 'de',
    darkMode: Boolean(lokal.darkMode),
  }
}

export async function ladeServerZustand(userId: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('user_state')
    .select('state')
    .eq('profile_id', userId)
    .maybeSingle()
  if (error) {
    console.warn('Zustand konnte nicht geladen werden:', error.message)
    return null
  }
  return data?.state ?? null
}

export async function speichereServerZustand(userId: string, state: any): Promise<void> {
  const { error } = await supabase
    .from('user_state')
    .upsert({ profile_id: userId, state, updated_at: new Date().toISOString() }, { onConflict: 'profile_id' })
  if (error) console.warn('Zustand konnte nicht gespeichert werden:', error.message)
}

/** Kinderprofile relational spiegeln, damit sie abfragbar sind. */
export async function spiegleKinder(userId: string, kinder: any[]): Promise<void> {
  try {
    if (kinder.length > 0) {
      const zeilen = kinder.map(k => ({
        profile_id: userId,
        client_id: k.id,
        name: k.name || 'Kind',
        birth_date: k.birthDate || null,
        avatar_emoji: k.avatarEmoji || '\u{1F476}',
        updated_at: new Date().toISOString(),
      }))
      const { error } = await supabase
        .from('children')
        .upsert(zeilen, { onConflict: 'profile_id,client_id' })
      if (error) {
        console.warn('Kinder konnten nicht gespeichert werden:', error.message)
        return
      }
    }
    const behalten = kinder.map(k => k.id)
    let loeschen = supabase.from('children').delete().eq('profile_id', userId)
    if (behalten.length > 0) {
      loeschen = loeschen.not('client_id', 'in', '(' + behalten.map(id => '"' + id + '"').join(',') + ')')
    }
    await loeschen
  } catch (e) {
    console.warn('Kinder-Abgleich fehlgeschlagen:', e)
  }
}

export async function spiegleFavoriten(userId: string, favoriten: Liste): Promise<void> {
  try {
    const { data } = await supabase.from('favorites').select('item_id').eq('profile_id', userId)
    const vorhanden = new Set((data || []).map(z => z.item_id))
    const neu = favoriten.filter(id => !vorhanden.has(id))
    if (neu.length > 0) {
      await supabase.from('favorites').insert(neu.map(id => ({ profile_id: userId, item_id: id })))
    }
    const entfernt = Array.from(vorhanden).filter(id => !favoriten.includes(id))
    if (entfernt.length > 0) {
      await supabase.from('favorites').delete().eq('profile_id', userId).in('item_id', entfernt)
    }
  } catch (e) {
    console.warn('Favoriten-Abgleich fehlgeschlagen:', e)
  }
}

export async function spiegleErledigte(userId: string, rezepte: Liste, aktivitaeten: Liste): Promise<void> {
  try {
    const { data } = await supabase.from('completed_items').select('item_id, item_type').eq('profile_id', userId)
    const vorhanden = new Set((data || []).map(z => z.item_type + ':' + z.item_id))
    const neu = [
      ...rezepte.map(id => ({ profile_id: userId, item_id: id, item_type: 'recipe' })),
      ...aktivitaeten.map(id => ({ profile_id: userId, item_id: id, item_type: 'activity' })),
    ].filter(z => !vorhanden.has(z.item_type + ':' + z.item_id))
    if (neu.length > 0) await supabase.from('completed_items').insert(neu)
  } catch (e) {
    console.warn('Abgleich erledigter Inhalte fehlgeschlagen:', e)
  }
}

/** Alle Favoriten ueber alle Kinder, fuer die relationale Spiegelung. */
export function alleFavoriten(state: any): Liste {
  const aus: Liste = [...alsListe(state.favorites)]
  for (const daten of Object.values(state.childData || {}) as any[]) {
    for (const id of alsListe(daten?.favorites)) if (!aus.includes(id)) aus.push(id)
  }
  return aus
}

export function alleErledigten(state: any): { rezepte: Liste; aktivitaeten: Liste } {
  let rezepte = alsListe(state.completedRecipes)
  let aktivitaeten = alsListe(state.completedActivities)
  for (const daten of Object.values(state.childData || {}) as any[]) {
    rezepte = vereinige(rezepte, daten?.completedRecipes)
    aktivitaeten = vereinige(aktivitaeten, daten?.completedActivities)
  }
  return { rezepte, aktivitaeten }
}
