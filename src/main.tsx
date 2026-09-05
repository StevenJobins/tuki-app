import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { applyCachedContent, refreshContent, CONTENT_UPDATED_EVENT } from './data/contentStore'
import { initNative } from './lib/native'
import './index.css'

// Alte Hash-Links (app.tuki.ch/#/rezepte) auf saubere Pfade umschreiben
if (window.location.hash.startsWith('#/')) {
  const target = window.location.hash.slice(1)
  window.history.replaceState(null, '', target)
}

function Root() {
  // Wird hochgezaehlt, wenn im Hintergrund neue Inhalte aus Supabase kamen.
  // Der key an <App> sorgt dafuer, dass die Seiten die neuen Daten lesen.
  const [contentVersion, setContentVersion] = useState(0)

  useEffect(() => {
    const onUpdate = () => setContentVersion(v => v + 1)
    window.addEventListener(CONTENT_UPDATED_EVENT, onUpdate)
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, onUpdate)
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <NotificationProvider>
            <App key={contentVersion} />
          </NotificationProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

function start() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  )
}

// Zwischengespeicherte Inhalte anwenden (synchron, kein Netz), dann sofort rendern.
// Der Start haengt damit nie am Netz: ohne Cache laufen die gebuendelten Inhalte,
// die frischen kommen im Hintergrund nach.
applyCachedContent()
start()
refreshContent()
initNative()

// Register Service Worker (im nativen App-Container nicht noetig)
const isNative = typeof (window as any).Capacitor !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()
if ('serviceWorker' in navigator && !isNative) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
