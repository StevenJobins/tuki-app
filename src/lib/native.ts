// Alles, was nur im nativen App-Container laeuft (Capacitor).
// Im Browser sind alle Funktionen No-ops, die PWA bleibt unveraendert.

import { Capacitor } from '@capacitor/core'
import { App as CapApp } from '@capacitor/app'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { Share } from '@capacitor/share'
import { Network } from '@capacitor/network'
import { PushNotifications } from '@capacitor/push-notifications'
import { supabase } from './supabase'
import { refreshContent } from '../data/contentStore'

export const isNative = Capacitor.isNativePlatform()
export const platform = Capacitor.getPlatform() // 'ios' | 'android' | 'web'

export const OFFLINE_EVENT = 'tuki:offline-changed'

let offline = false
export function isOffline() {
  return offline
}

function setOffline(next: boolean) {
  if (next === offline) return
  offline = next
  window.dispatchEvent(new CustomEvent(OFFLINE_EVENT, { detail: next }))
}

/** Teilen: nativ ueber das System-Sheet, im Browser ueber die Web Share API. */
export async function share(data: { title: string; text: string; url: string }) {
  if (isNative) {
    await Share.share({ title: data.title, text: data.text, url: data.url, dialogTitle: 'Teilen' })
    return true
  }
  if (typeof navigator !== 'undefined' && navigator.share) {
    await navigator.share(data)
    return true
  }
  return false
}

export function canShare() {
  return isNative || (typeof navigator !== 'undefined' && !!navigator.share)
}

/** Push-Token registrieren und im Profil hinterlegen. */
export async function registerPush(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (!isNative) return 'unsupported'

  let permission = await PushNotifications.checkPermissions()
  if (permission.receive === 'prompt' || permission.receive === 'prompt-with-rationale') {
    permission = await PushNotifications.requestPermissions()
  }
  if (permission.receive !== 'granted') return 'denied'

  await PushNotifications.register()
  return 'granted'
}

async function saveToken(token: string) {
  try {
    const { data } = await supabase.auth.getUser()
    const userId = data?.user?.id
    if (!userId) return // ohne Konto kein Token, wird nach dem Login nachgeholt
    await supabase.from('push_subscriptions').upsert(
      {
        profile_id: userId,
        subscription: { kind: 'native', platform, token },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'profile_id' },
    )
  } catch (err) {
    console.warn('[push] Token konnte nicht gespeichert werden', err)
  }
}

/** Einmal beim App-Start aufrufen. */
export async function initNative() {
  // Netzstatus gilt auch im Browser, damit der Offline-Hinweis ueberall funktioniert
  try {
    const status = await Network.getStatus()
    setOffline(!status.connected)
    Network.addListener('networkStatusChange', s => {
      setOffline(!s.connected)
      if (s.connected) refreshContent()
    })
  } catch {
    // Im Browser ohne Plugin: auf die Standardereignisse ausweichen
    if (typeof window !== 'undefined') {
      setOffline(typeof navigator !== 'undefined' && navigator.onLine === false)
      window.addEventListener('online', () => { setOffline(false); refreshContent() })
      window.addEventListener('offline', () => setOffline(true))
    }
  }

  if (!isNative) return

  try {
    await StatusBar.setStyle({ style: Style.Light })
    if (platform === 'android') await StatusBar.setBackgroundColor({ color: '#FFFDF8' })
  } catch { /* Geraet ohne konfigurierbare Statusleiste */ }

  // Android: Zurueck-Taste navigiert, am Anfang schliesst sie die App
  CapApp.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack && window.history.length > 1) window.history.back()
    else CapApp.exitApp()
  })

  // Beim Zurueckkehren in die App nach neuen Inhalten schauen
  CapApp.addListener('appStateChange', ({ isActive }) => {
    if (isActive) refreshContent()
  })

  // Push-Ereignisse
  PushNotifications.addListener('registration', token => { saveToken(token.value) })
  PushNotifications.addListener('registrationError', err => console.warn('[push] Registrierung fehlgeschlagen', err))
  PushNotifications.addListener('pushNotificationActionPerformed', action => {
    const target = (action.notification.data || {}).route
    if (typeof target === 'string' && target.startsWith('/')) window.location.assign(target)
  })

  try {
    await SplashScreen.hide()
  } catch { /* kein Splash aktiv */ }
}
