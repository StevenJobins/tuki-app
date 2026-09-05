import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ch.tuki.family',
  appName: 'Tuki Family',
  webDir: 'dist',
  // Die Inhalte werden mitgeliefert, die App laedt KEINE Website nach.
  // Das ist Voraussetzung fuer Apple Richtlinie 4.2 und fuer den Offline-Zustand.
  android: {
    allowMixedContent: false,
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
