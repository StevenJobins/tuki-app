const de = {
  // Navigation
  nav: {
    home: 'Home',
    recipes: 'Rezepte',
    activities: 'AktivitÃ¤ten',
    community: 'Community',
    profile: 'Profil',
        favorites: 'Favoriten',
        weeklyPlan: 'Wochenplan',
        fridgeCheck: 'KÃ¼hlschrank-Check',
        development: 'Entwicklung',
        starShop: 'Sterne-Shop',
  },

  // Common
  common: {
    all: 'Alle',
    back: 'ZurÃ¼ck',
    cancel: 'Abbrechen',
    save: 'Speichern',
    add: 'HinzufÃ¼gen',
    delete: 'LÃ¶schen',
    share: 'Teilen',
    min: 'Min.',
    years: 'Jahre',
    yearsShort: 'J.',
    stars: 'Sterne',
    showAll: 'Alle anzeigen',
    noResults: 'Keine Ergebnisse gefunden.',
    tryOtherFilter: 'Versuch einen anderen Filter!',
    recipe: 'Rezept',
    activity: 'AktivitÃ¤t',
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
    filterEasy: 'â¡ Leicht',
    filterMedium: 'ð¥ Mittel',
    filterPro: 'ð Pro',
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
      activities: 'AktivitÃ¤ten',
      development: 'Entwicklung',
      community: 'Community',
    },
    seasonalRecipes: (season: string) => `${season}s-Rezepte`,
    seasonalIdeasFor: (count: number, name: string) => `${count} passende Ideen fÃ¼r ${name}`,
    seasonalIdeasGeneric: (count: number) => `${count} saisonale Ideen fÃ¼r euch entdecken`,
    recipesFor: (name: string) => `Rezepte fÃ¼r ${name}`,
    popularRecipes: 'Beliebte Rezepte',
    activitiesFor: (name: string) => `AktivitÃ¤ten fÃ¼r ${name}`,
    activitiesToday: 'AktivitÃ¤ten fÃ¼r heute',
    tipOfDay: 'Tuki-Tipp des Tages',
    levelProgress: (level: number) => `Level ${level}/5`,
    starsToNext: (count: number) => `Noch ${count} Sterne bis zum nÃ¤chsten Level`,
    addChild: 'Kind hinzufÃ¼gen',
    addChildDesc: 'FÃ¼r personalisierte Inhalte & Altersempfehlungen',
  },

  // Seasons
  seasons: {
    spring: 'FrÃ¼hling',
    summer: 'Sommer',
    autumn: 'Herbst',
    winter: 'Winter',
  },

  // Phase Insights
  phases: {
    discovery: {
      title: 'Entdeckungsphase',
      text: 'Dein Baby entdeckt die Welt mit allen Sinnen. Einfache Texturen und GeschmÃ¤cker sind jetzt perfekt!',
    },
    littleSteps: {
      title: 'Kleine Schritte, grosse Abenteuer',
      text: 'Dein Kind wird immer selbststÃ¤ndiger. Lass es Zutaten anfassen und einfache Aufgaben Ã¼bernehmen.',
    },
    creative: {
      title: 'Kreative Entfaltung',
      text: 'Die Fantasie blÃ¼ht! RÃ¼hren, kneten und dekorieren â dein Kind liebt es, aktiv mitzumachen.',
    },
    explorer: {
      title: 'Kleine Forscher',
      text: 'Warum ist das so? Dein Kind stellt viele Fragen. Nutze Kochen und Basteln zum spielerischen Lernen.',
    },
    miniChef: {
      title: 'Mini-Chef im Einsatz',
      text: 'Dein Kind kann schon richtig mithelfen! Einfache Rezepte selbst zubereiten stÃ¤rkt das Selbstvertrauen.',
    },
  },

  // Daily Tips
  dailyTips: [
    'Lass dein Kind die Zutaten fÃ¼r das Abendessen aus dem KÃ¼hlschrank holen â im Tuki erreicht es alles auf AugenhÃ¶he.',
    'Kinder lieben Rituale: Eine feste Koch-Zeit am Wochenende stÃ¤rkt die Familienbindung.',
    'Tipp: Benenne Farben und Formen beim Kochen â so lernt dein Kind ganz nebenbei.',
    'Lass dein Kind den Tisch decken â das fÃ¶rdert ZÃ¤hlen, Sortieren und Stolz auf die eigene Leistung.',
    'Gemeinsam einkaufen gehen: Lass dein Kind Obst und GemÃ¼se auswÃ¤hlen und dabei die Sinne nutzen.',
    'Heute mal ein Picknick im Wohnzimmer? Kinder lieben kreative Essorte!',
    'Lass dein Kind mitbestimmen, was heute gekocht wird â das steigert die Freude am Essen.',
  ],

  // Levels
  levels: [
    'Kleiner Entdecker',
    'KÃ¼chenhelfer',
    'Nachwuchskoch',
    'Familien-Star',
    'KÃ¼chenchef',
  ],

  // Recipes Page
  recipesPage: {
    title: 'Rezepte',
    searchPlaceholder: 'Rezept suchen...',
    resultsCount: (count: number, name?: string) =>
      `${count} Rezepte ${name ? `fÃ¼r ${name} ` : ''}gefunden`,
    noResults: 'Keine Rezepte gefunden.',
  },

  // Recipe Detail
  recipeDetail: {
    notFound: 'Rezept nicht gefunden',
    backToRecipes: 'ZurÃ¼ck zu Rezepten',
    duration: 'Dauer',
    age: 'Alter',
    level: 'Level',
    servings: 'Portionen',
    tukiTip: 'Tuki-Tipp',
    ingredients: 'ð Zutaten',
    preparation: 'ð©âð³ Zubereitung',
    completed: (stars: number) => `Geschafft! +${stars} Sterne verdient`,
    completeButton: (stars: number) => `â­ Rezept geschafft â ${stars} Sterne verdienen`,
  },

  // Activities Page
  activitiesPage: {
    title: 'AktivitÃ¤ten',
    resultsCount: (count: number, name?: string) =>
      `${count} AktivitÃ¤ten ${name ? `fÃ¼r ${name} ` : ''}gefunden`,
    noResults: 'Keine AktivitÃ¤ten gefunden.',
  },

  // Activity Detail
  activityDetail: {
    notFound: 'AktivitÃ¤t nicht gefunden',
    backToActivities: 'ZurÃ¼ck zu AktivitÃ¤ten',
    stars: 'Sterne',
    tukiTip: 'Tuki-Tipp',
    learningGoals: 'ð Das lernt dein Kind',
    materials: 'ð§° Das brauchst du',
    steps: 'ð So geht\'s',
    completed: (stars: number) => `Geschafft! +${stars} Sterne verdient`,
    completeButton: (stars: number) => `â­ AktivitÃ¤t geschafft â ${stars} Sterne verdienen`,
  },

  // Activity Categories
  categories: {
    motorik: 'Motorik',
    sensorik: 'Sensorik',
    kreativitÃ¤t: 'KreativitÃ¤t',
    sprache: 'Sprache',
    mathe: 'Zahlen & Logik',
    natur: 'Natur & Wissen',
  },

  // Development Page
  development: {
    title: 'Entwicklung',
    disclaimer: 'ð Jedes Kind entwickelt sich in seinem eigenen Tempo. Diese Meilensteine dienen als Orientierung â nicht als Checkliste. Bei Fragen sprecht mit eurer KinderÃ¤rztin.',
    achieved: (count: number, total: number) => `${count}/${total} erreicht`,
    allAchieved: 'ð Alle Meilensteine dieser Phase erreicht!',
    ageGroups: ['12-18 Mon.', '18-24 Mon.', '2-3 Jahre', '3-5 Jahre'],
    milestoneCategories: {
      motorik: 'Motorik',
      feinmotorik: 'Feinmotorik',
      sprache: 'Sprache',
      selbststÃ¤ndigkeit: 'SelbststÃ¤ndigkeit',
      kognition: 'Kognition',
      sozial: 'Sozial',
    },
  },

  // Community Page
  community: {
    title: 'Community',
    feedTab: 'ð± Feed',
    clubTab: 'ð Tuki Club beitreten',
    timeAgo: {
      hours: (n: number) => `vor ${n} Std.`,
      days: (n: number) => n === 1 ? 'vor 1 Tag' : `vor ${n} Tagen`,
    },
    postTags: {
      rezept: 'Rezept',
      tipp: 'Tipp',
      frage: 'Frage',
      aktivitÃ¤t: 'AktivitÃ¤t',
    } as Record<string, string>,
    share: 'Teilen',
    clubTitle: 'Tuki Family Club',
    clubDescription: 'Werde Teil unserer exklusiven Community! Tausche dich mit anderen Tuki-Familien aus, erhalte exklusive Rezepte, frÃ¼hzeitigen Zugang zu neuen Produkten und vieles mehr.',
    clubFeatures: [
      'Private Eltern-Community',
      'Exklusive Premium-Rezepte',
      'FrÃ¼hzeitiger Zugang zu neuen Produkten',
      'Direkte Linie zum Tuki-Team',
      'Monatliche Foto-Challenges',
    ],
    joinFree: 'Kostenlos beitreten',
    joinNote: 'FÃ¼r alle Tuki-Besitzer kostenlos. Registrierung mit Kaufbeleg.',
  },

  // Profile Page
  profilePage: {
    title: 'Profil',
    ourChildren: 'Unsere Kinder',
    addChild: 'Kind hinzufÃ¼gen',
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
    deleteConfirmText: 'Alle Favoriten und Fortschritte dieses Kindes werden gelÃ¶scht.',
    childAge: {
      months: 'Monate',
      year: 'Jahr',
      years: 'Jahre',
    },
    modal: {
      chooseAvatar: 'Avatar wÃ¤hlen',
      name: 'Name',
      birthDate: 'Geburtsdatum',
    },
  },
  starShop: {
    title: 'Sterne-Shop',
    balance: 'Dein Guthaben',
    stars: 'Sterne',
    earned: 'Verdient',
    spent: 'Ausgegeben',
    howToEarn: 'So sammelst du Sterne',
    completeActivity: 'Aktivität abschliessen',
    withPhoto: 'Mit Foto teilen',
    filterAll: 'Alle',
    filterProducts: '🎁 Produkte',
    filterDiscounts: '🏷️ Rabatte',
    filterDigital: '📱 Digital',
    redeemedRewards: 'Eingelöste Belohnungen',
    redeemed: 'Eingelöst',
    redeem: 'Einlösen',
    rewards: {
      stickerSet: { name: 'Tuki Sticker-Set', description: '12 süsse Tuki-Sticker für dein Kind' },
      recipeBook: { name: 'Rezeptbuch Download', description: 'Digitales Kochbuch mit 20 Kinderrezepten' },
      freeShipping: { name: 'Gratis Versand', description: 'Kostenloser Versand für deine nächste Bestellung' },
      snackBox: { name: 'Tuki Snack-Box', description: 'Gesunde Snacks für die ganze Familie' },
      discount10: { name: '10% Rabatt', description: 'Auf alle Tuki-Produkte im Shop' },
      surprise: { name: 'Überraschungspaket', description: 'Lass dich überraschen mit tollen Tuki-Produkten' },
    },
  },
}

export type Translations = typeof de
export default de
