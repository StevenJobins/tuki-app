import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const VAPID_PUBLIC_KEY = 'BG89SIUwDKguddpp125gYZDT7XdL600DzEnScYBTe0k-MzPorKnVrvi9IBtGQipZBQbuzXpA3UD7mM3ASvKBnCI'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function NotificationPrompt() {
  const { user } = useAuth()
  const [show, setShow] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    // Only show if notifications are supported and not yet asked
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return
    if (Notification.permission !== 'default') return

    // Show prompt after 30 seconds of app usage
    const timer = setTimeout(() => setShow(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const handleEnable = async () => {
    setSubscribing(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setShow(false)
        return
      }

      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      })

      // Save subscription to Supabase
      if (user) {
        await supabase.from('push_subscriptions').upsert({
          profile_id: user.id,
          subscription: JSON.parse(JSON.stringify(subscription)),
          created_at: new Date().toISOString()
        }, { onConflict: 'profile_id' })
      }

      setShow(false)
    } catch (e) {
      console.error('Push subscription failed:', e)
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-tuki-mint flex items-center justify-center shrink-0">
          <span className="text-2xl">{'🔔'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-800">T\u00e4gliche Erinnerung</p>
          <p className="text-xs text-gray-500 mt-0.5">Erhalte morgens deinen Tuki-Tagesplan</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setShow(false)}
            className="text-xs text-gray-400 px-2 py-1.5"
          >
            Sp\u00e4ter
          </button>
          <button
            onClick={handleEnable}
            disabled={subscribing}
            className="text-xs font-semibold text-white bg-tuki-rot px-3 py-1.5 rounded-lg disabled:opacity-50"
          >
            {subscribing ? '...' : 'Aktivieren'}
          </button>
        </div>
      </div>
    </div>
  )
}