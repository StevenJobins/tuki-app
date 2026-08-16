import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { syncProfileToKlaviyo } from '../lib/klaviyo'

/**
 * Haelt das Klaviyo-Profil mit den Kinderdaten aus der App in Sync.
 *
 * Laeuft, sobald jemand eingeloggt und das Onboarding durch ist, und danach
 * immer dann, wenn ein Kind dazukommt, sich das Geburtsdatum aendert oder die
 * Sprache umgestellt wird. Die Entprellung steckt in `syncProfileToKlaviyo`.
 */
export function useKlaviyoSync() {
  const { user } = useAuth()
  const { children, language, isOnboarded } = useApp()
  const inFlight = useRef(false)

  const fingerprint = children.map(c => `${c.name}:${c.birthDate}`).join('|')

  useEffect(() => {
    const email = user?.email
    if (!email || !isOnboarded || children.length === 0) return
    if (inFlight.current) return

    inFlight.current = true
    const timer = setTimeout(() => {
      syncProfileToKlaviyo({
        email,
        children: children.map(c => ({ name: c.name, birthDate: c.birthDate })),
        language,
      }).finally(() => {
        inFlight.current = false
      })
    }, 2000) // erst laufen lassen, wenn die App steht

    return () => {
      clearTimeout(timer)
      inFlight.current = false
    }
  }, [user?.email, isOnboarded, fingerprint, language, children.length])
}
