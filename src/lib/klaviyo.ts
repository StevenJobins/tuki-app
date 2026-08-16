/**
 * Klaviyo-Bruecke der Tuki Family App.
 *
 * Schreibt das Geburtsdatum des Kindes als Profil-Eigenschaft nach Klaviyo,
 * damit Segmente wie «Kind 12-30 Monate» ohne Umweg gebaut werden koennen.
 *
 * WICHTIG: Hier wird ausschliesslich die oeffentliche Client-API benutzt
 * (company_id = oeffentlicher Klaviyo-Key, steht ohnehin im Shop-Theme).
 * Es wird KEIN Marketing-Einverstaendnis gesetzt und niemand wird auf eine
 * Liste gesetzt. Wer nicht schon anderswo zugestimmt hat, bekommt weiterhin
 * keine Werbemails - das Profil traegt nur die Eigenschaften.
 */

const COMPANY_ID = 'VxJfX7'
const ENDPOINT = 'https://a.klaviyo.com/api/identify'

/**
 * Warum dieser Endpunkt und nicht die neuere /client/profiles-API:
 * Letztere verlangt einen `revision`-Header, dadurch schickt der Browser einen
 * Preflight - und Klaviyo antwortet dort mit `Allow-Methods: OPTIONS`. Der POST
 * wird also blockiert. `/api/identify` erlaubt GET aus fremden Quellen und ist
 * genau fuer den Browser gedacht. Getestet am 16.08.2026.
 */

/** btoa kann kein UTF-8, deshalb der Umweg ueber TextEncoder (Umlaute in Namen!). */
function encodePayload(payload: unknown): string {
  const json = JSON.stringify(payload)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  bytes.forEach(b => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

const STORAGE_KEY = 'tuki-klaviyo-sync'
const MIN_INTERVAL_MS = 12 * 60 * 60 * 1000 // hoechstens zweimal pro Tag

export interface KlaviyoChild {
  name: string
  birthDate: string
}

export interface KlaviyoSyncInput {
  email: string
  children: KlaviyoChild[]
  language: string
}

function monthsSince(birthDate: string): number | null {
  const birth = new Date(birthDate)
  if (isNaN(birth.getTime())) return null
  const now = new Date()
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  return months >= 0 ? months : null
}

/** Das juengste Kind bestimmt das Kit, deshalb ist es die Leitgroesse. */
function youngest(children: KlaviyoChild[]): KlaviyoChild | null {
  const valid = children.filter(c => c.birthDate && !isNaN(new Date(c.birthDate).getTime()))
  if (valid.length === 0) return null
  return valid.reduce((a, b) => (new Date(a.birthDate) > new Date(b.birthDate) ? a : b))
}

export function buildProperties(input: KlaviyoSyncInput): Record<string, unknown> | null {
  const lead = youngest(input.children)
  if (!lead) return null

  const props: Record<string, unknown> = {
    Kind_Geburtsdatum: lead.birthDate,
    Kind_Name: lead.name || '',
    Anzahl_Kinder: input.children.length,
    App_Nutzer: true,
    App_Sprache: input.language,
    App_Letzte_Synchronisation: new Date().toISOString().slice(0, 10),
  }

  const age = monthsSince(lead.birthDate)
  if (age !== null) props.Kind_Alter_Monate = age

  if (input.children.length > 1) {
    props.Kinder_Geburtsdaten = input.children.map(c => c.birthDate).filter(Boolean)
  }

  return props
}

/** Nur senden, wenn sich etwas geaendert hat oder der letzte Versand alt genug ist. */
function shouldSync(fingerprint: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return true
    const last = JSON.parse(raw) as { fingerprint?: string; at?: number }
    if (last.fingerprint !== fingerprint) return true
    return !last.at || Date.now() - last.at > MIN_INTERVAL_MS
  } catch {
    return true
  }
}

function remember(fingerprint: string) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fingerprint, at: Date.now() }))
  } catch {
    /* Speicher voll oder gesperrt: dann eben beim naechsten Mal wieder */
  }
}

/**
 * Schickt das Profil an Klaviyo. Schlaegt bewusst leise fehl:
 * die App darf daran nie haengen bleiben.
 */
export async function syncProfileToKlaviyo(input: KlaviyoSyncInput): Promise<boolean> {
  if (!input.email) return false

  const properties = buildProperties(input)
  if (!properties) return false

  const fingerprint = [
    input.email,
    input.language,
    ...input.children.map(c => `${c.name}:${c.birthDate}`),
  ].join('|')

  if (!shouldSync(fingerprint)) return false

  const data = encodePayload({
    token: COMPANY_ID,
    properties: {
      $email: input.email,
      ...properties,
    },
  })

  try {
    const res = await fetch(`${ENDPOINT}?data=${encodeURIComponent(data)}`, { method: 'GET' })
    if (!res.ok) return false
    remember(fingerprint)
    return true
  } catch {
    return false
  }
}
