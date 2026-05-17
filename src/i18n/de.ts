const de = {
  // Navigation
  nav: {
    home: 'Home',
    recipes: 'Rezepte',
    activities: 'Aktivitäten',
    community: 'Community',
    profile: 'Profil',
  },

  // Common
  common: {
    all: 'Alle',
    back: 'Zurück',
    cancel: 'Abbrechen',
    save: 'Speichern',
    add: 'Hinzufügen',
    delete: 'Löschen',
    share: 'Teilen',
    min: 'Min.',
    years: 'Jahre',
    yearsShort: 'J.',
    stars: 'Sterne',
    showAll: 'Alle anzeigen',
    noResults: 'Keine Ergebnisse gefunden.',
    tryOtherFilter: 'Versuch einen anderen Filter!',
    recipe: 'Rezept',
    activity: 'Aktivität',
  },

  // Header
  header: {
    title: 'Tuki Family',
  },

  // Age Filter
  ageFilter: {
    all: 'Alle',
    ranges: ['1-2 J.', '2-3 J.', '3-5 J.', '5-8 J.'],
  },

  // Difficulty
  difficulty: {
    leicht: 'Leicht',
    mittel: 'Mittel',
    fortgeschritten: 'Fortgeschritten',
    filterAll: 'Alle',
    filterEasy: '⚡ Leicht',
    filterMedium: '🔥 Mittel',
    filterPro: '🌟 Pro',
  },

  // Home Page
  home: {
    greetings: {
      morning: 'Guten Morgen',
      noon: 'Mahlzeit',
      afternoon: 'Guten Nachmittag',
      evening: 'Guten Abend',
    },
    heroQuestion: (name: string) => `Was entdeckt ${name} heute?`,
    heroQuestionGeneric: 'Was entdecken wir heute zusammen?',
    starsLabel: 'Sterne',
    completedLabel: 'Abgeschlossen',
    quickActions: {
      recipes: 'Rezepte',
      activities: 'Aktivitäten',
      development: 'Entwicklung',
      community: 'Community',
    },
    seasonalRecipes: (season: string) => `${season}s-Rezepte`,
    seasonalIdeasFor: (count: number, name: string) => `${count} passende Ideen für ${name}`,
    seasonalIdeasGeneric: (count: number) => `${count} saisonale Ideen für euch entdecken`,
    recipesFor: (name: string) => `Rezepte für ${name}`,
    popularRecipes: 'Beliebte Rezepte',
    activitiesFor: (name: string) => `Aktivitäten für ${name}`,
    activitiesToday: 'Aktivitäten für heute',
    tipOfDay: 'Tuki-Tipp des Tages',
    levelProgress: (level: number) => `Level ${level}/5`,
    starsToNext: (count: number) => `Noch ${count} Sterne bis zum nächsten Level`,
    addChild: 'Kind hinzufügen',
    addChildDesc: 'Für personalisierte Inhalte & Altersempfehlungen',
  },

  // Seasons
  seasons: {
    spring: 'Frühling',
    summer: 'Sommer',
    autumn: 'Herbst',
    winter: 'Winter',
  },

  // Phase Insights
  phases: {
    discovery: {
      title: 'Entdeckungsphase',
      text: 'Dein Baby entdeckt die Welt mit allen Sinnen. Einfache Texturen und Geschmäcker sind jetzt perfekt!',
    },
    littleSteps: {
      title: 'Kleine Schritte, grosse Abenteuer',
      text: 'Dein Kind wird immer selbstständiger. Lass es Zutaten anfassen und einfache Aufgaben übernehmen.',
    },
    creative: {
      title: 'Kreative Entfaltung',
      text: 'Die Fantasie blüht! Rühren, kneten und dekorieren — dein Kind liebt es, aktiv mitzumachen.',
    },
    explorer: {
      title: 'Kleine Forscher',
      text: 'Warum ist das so? Dein Kind stellt viele Fragen. Nutze Kochen und Basteln zum spielerischen Lernen.',
    },
    miniChef: {
      title: 'Mini-Chef im Einsatz',
      text: 'Dein Kind kann schon richtig mithelfen! Einfache Rezepte selbst zubereiten stärkt das Selbstvertrauen.',
    },
  },

  // Daily Tips
  dailyTips: [
    'Lass dein Kind die Zutaten für das Abendessen aus dem Kühlschrank holen — im Tuki erreicht es alles auf Augenhöhe.',
    'Kinder lieben Rituale: Eine feste Koch-Zeit am Wochenende stärkt die Familienbindung.',
    'Tipp: Benenne Farben und Formen beim Kochen — so lernt dein Kind ganz nebenbei.',
    'Lass dein Kind den Tisch decken — das fördert Zählen, Sortieren und Stolz auf die eigene Leistung.',
    'Gemeinsam einkaufen gehen: Lass dein Kind Obst und Gemüse auswählen und dabei die Sinne nutzen.',
    'Heute mal ein Picknick im Wohnzimmer? Kinder lieben kreative Essorte!',
    'Lass dein Kind mitbestimmen, was heute gekocht wird — das steigert die Freude am Essen.',
  ],

  // Levels
  levels: [
    'Kleiner Entdecker',
    'Küchenhelfer',
    'Nachwuchskoch',
    'Familien-Star',
    'Küchenchef',
  ],

  // Recipes Page
  recipesPage: {
    title: 'Rezepte',
    searchPlaceholder: 'Rezept suchen...',
    resultsCount: (count: number, name?: string) =>
      `${count} Rezepte ${name ? `für ${name} ` : ''}gefunden`,
    noResults: 'Keine Rezepte gefunden.',
  },

  // Recipe Detail
  recipeDetail: {
    notFound: 'Rezept nicht gefunden',
    backToRecipes: 'Zurück zu Rezepten',
    duration: 'Dauer',
    age: 'Alter',
    level: 'Level',
    servings: 'Portionen',
    tukiTip: 'Tuki-Tipp',
    ingredients: '🛒 Zutaten',
    preparation: '👩‍🍳 Zubereitung',
    completed: (stars: number) => `Geschafft! +${stars} Sterne verdient`,
    completeButton: (stars: number) => `⭐ Rezept geschafft — ${stars} Sterne verdienen`,
  },

  // Activities Page
  activitiesPage: {
    title: 'Aktivitäten',
    resultsCount: (count: number, name?: string) =>
      `${count} Aktivitäten ${name ? `für ${name} ` : ''}gefunden`,
    noResults: 'Keine Aktivitäten gefunden.',
  },

  // Activity Detail
  activityDetail: {
    notFound: 'Aktivität nicht gefunden',
    backToActivities: 'Zurück zu Aktivitäten',
    stars: 'Sterne',
    tukiTip: 'Tuki-Tipp',
    learningGoals: '🎓 Das lernt dein Kind',
    materials: '🧰 Das brauchst du',
    steps: '📋 So geht\'s',
    completed: (stars: number) => `Geschafft! +${stars} Sterne verdient`,
    completeButton: (stars: number) => `⭐ Aktivität geschafft — ${stars} Sterne verdienen`,
  },

  // Activity Categories
  categories: {
    motorik: 'Motorik',
    sensorik: 'Sensorik',
    kreativität: 'Kreativität',
    sprache: 'Sprache',
    mathe: 'Zahlen & Logik',
    natur: 'Natur & Wissen',
  },

  // Development Page
  development: {
    title: 'Entwicklung',
    disclaimer: '📋 Jedes Kind entwickelt sich in seinem eigenen Tempo. Diese Meilensteine dienen als Orientierung — nicht als Checkliste. Bei Fragen sprecht mit eurer Kinderärztin.',
    achieved: (count: number, total: number) => `${count}/${total} erreicht`,
    allAchieved: '🎉 Alle Meilensteine dieser Phase erreicht!',
    ageGroups: ['12-18 Mon.', '18-24 Mon.', '2-3 Jahre', '3-5 Jahre'],
    milestoneCategories: {
      motorik: 'Motorik',
      feinmotorik: 'Feinmotorik',
      sprache: 'Sprache',
      selbstständigkeit: 'Selbstständigkeit',
      kognition: 'Kognition',
      sozial: 'Sozial',
    },
  },

  // Community Page
  community: {
    title: 'Community',
    feedTab: '📱 Feed',
    clubTab: '🔒 Tuki Club beitreten',
    timeAgo: {
      hours: (n: number) => `vor ${n} Std.`,
      days: (n: number) => n === 1 ? 'vor 1 Tag' : `vor ${n} Tagen`,
    },
    postTags: {
      rezept: 'Rezept',
      tipp: 'Tipp',
      frage: 'Frage',
      aktivität: 'Aktivität',
    } as Record<string, string>,
    share: 'Teilen',
    clubTitle: 'Tuki Family Club',
    clubDescription: 'Werde Teil unserer exklusiven Community! Tausche dich mit anderen Tuki-Familien aus, erhalte exklusive Rezepte, frühzeitigen Zugang zu neuen Produkten und vieles mehr.',
    clubFeatures: [
      'Private Eltern-Community',
      'Exklusive Premium-Rezepte',
      'Frühzeitiger Zugang zu neuen Produkten',
      'Direkte Linie zum Tuki-Team',
      'Monatliche Foto-Challenges',
    ],
    joinFree: 'Kostenlos beitreten',
    joinNote: 'Für alle Tuki-Besitzer kostenlos. Registrierung mit Kaufbeleg.',
  },

  // Profile Page
  profilePage: {
    title: 'Profil',
    ourChildren: 'Unsere Kinder',
    addChild: 'Kind hinzufügen',
    editChild: 'Kind bearbeiten',
    active: 'Aktiv',
    current: 'Aktuell',
    explorerLevel: 'Entdecker-Level',
    tukiStars: 'Tuki-Sterne',
    completed: 'Abgeschlossen',
    favorites: 'Favoriten',
    myFavorites: 'Meine Favoriten',
    settings: 'Einstellungen',
    language: 'Sprache',
    languageValue: 'Deutsch',
    notifications: 'Benachrichtigungen',
    notificationsValue: 'An',
    appearance: 'Erscheinungsbild',
    appearanceValue: 'Hell',
    appVersion: 'App-Version',
    visitWebsite: 'tuki.ch besuchen',
    deleteConfirmTitle: 'Kind entfernen?',
    deleteConfirmText: 'Alle Favoriten und Fortschritte dieses Kindes werden gelöscht.',
    childAge: {
      months: 'Monate',
      year: 'Jahr',
      years: 'Jahre',
    },
    modal: {
      chooseAvatar: 'Avatar wählen',
      name: 'Name',
      birthDate: 'Geburtsdatum',
    },
  },
}

export type Translations = typeof de
export default de
