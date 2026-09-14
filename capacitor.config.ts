import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ch.tuki.family',
  appName: 'Tuki Family',
  webDir: 'dist',
  // Die Inhalte werden mitgeliefert, die App laedt KEINE Website nach.
  // Das ist Voraussetzung fuer Apple Richtlinie 4.2 und fuer den Offline-Zustand.
  android: {
    allowMixedContent: false,
    // Ab Android 15 erzwingt das System Edge-to-Edge. 'auto' setzt die
    // noetigen Abstaende, damit die Ansicht nicht unter Status- und
    // Navigationsleiste rutscht.
    adjustMarginsForEdgeToEdge: 'auto',
  },
  ios: {
    contentInset: 'always',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 600,
      backgroundColor: '#FFFDF8',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
  },
}

export default config
