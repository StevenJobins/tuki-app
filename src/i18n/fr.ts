import type { Translations } from './de'

const fr: Translations = {
  // Navigation
  nav: {
    home: 'Accueil',
    recipes: 'Recettes',
    activities: 'ActivitÃ©s',
    community: 'CommunautÃ©',
    profile: 'Profil',
  },

  // Common
  common: {
    all: 'Tout',
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    add: 'Ajouter',
    delete: 'Supprimer',
    share: 'Partager',
    min: 'min',
    years: 'ans',
    yearsShort: 'ans',
    stars: 'Ã©toiles',
    showAll: 'Tout afficher',
    noResults: 'Aucun rÃ©sultat trouvÃ©.',
    tryOtherFilter: 'Essaie un autre filtre !',
    recipe: 'Recette',
    activity: 'ActivitÃ©',
  },

  // Header
  header: {
    title: 'Tuki Family',
  },

  // Age Filter
  ageFilter: {
    all: 'Tout',
    ranges: ['1-2 ans', '2-3 ans', '3-5 ans', '5-8 ans'],
  },

  // Difficulty
  difficulty: {
    leicht: 'Facile',
    mittel: 'Moyen',
    fortgeschritten: 'AvancÃ©',
    filterAll: 'Tout',
    filterEasy: 'â¡ Facile',
    filterMedium: 'ð¥ Moyen',
    filterPro: 'ð Pro',
  },

  // Home Page
  home: {
    greetings: {
      morning: 'Bonjour',
      noon: 'Bon appÃ©tit',
      afternoon: 'Bon aprÃ¨s-midi',
      evening: 'Bonsoir',
    },
    heroQuestion: (name: string) => `Que dÃ©couvre ${name} aujourd'hui ?`,
    heroQuestionGeneric: 'Que dÃ©couvrons-nous ensemble aujourd\'hui ?',
    starsLabel: 'Ã©toiles',
    completedLabel: 'TerminÃ©s',
    quickActions: {
      recipes: 'Recettes',
      activities: 'ActivitÃ©s',
      development: 'DÃ©veloppement',
      community: 'CommunautÃ©',
    },
    seasonalRecipes: (season: string) => `Recettes de ${season.toLowerCase()}`,
    seasonalIdeasFor: (count: number, name: string) => `${count} idÃ©es adaptÃ©es pour ${name}`,
    seasonalIdeasGeneric: (count: number) => `${count} idÃ©es de saison Ã  dÃ©couvrir`,
    recipesFor: (name: string) => `Recettes pour ${name}`,
    popularRecipes: 'Recettes populaires',
    activitiesFor: (name: string) => `ActivitÃ©s pour ${name}`,
    activitiesToday: 'ActivitÃ©s du jour',
    tipOfDay: 'Astuce Tuki du jour',
    levelProgress: (level: number) => `Niveau ${level}/5`,
    starsToNext: (count: number) => `Encore ${count} Ã©toiles avant le prochain niveau`,
    addChild: 'Ajouter un enfant',
    addChildDesc: 'Pour du contenu personnalisÃ© et des recommandations par Ã¢ge',
  },

  // Seasons
  seasons: {
    spring: 'Printemps',
    summer: 'ÃtÃ©',
    autumn: 'Automne',
    winter: 'Hiver',
  },

  // Phase Insights
  phases: {
    discovery: {
      title: 'Phase de dÃ©couverte',
      text: 'Ton bÃ©bÃ© dÃ©couvre le monde avec tous ses sens. Des textures et saveurs simples sont parfaites maintenant !',
    },
    littleSteps: {
      title: 'Petits pas, grandes aventures',
      text: 'Ton enfant devient de plus en plus autonome. Laisse-le toucher les ingrÃ©dients et prendre en charge des tÃ¢ches simples.',
    },
    creative: {
      title: 'Ãpanouissement crÃ©atif',
      text: 'L\'imagination fleurit ! Remuer, pÃ©trir et dÃ©corer â ton enfant adore participer activement.',
    },
    explorer: {
      title: 'Petits explorateurs',
      text: 'Pourquoi c\'est comme Ã§a ? Ton enfant pose beaucoup de questions. Utilise la cuisine et le bricolage pour apprendre en jouant.',
    },
    miniChef: {
      title: 'Mini-chef en action',
      text: 'Ton enfant peut dÃ©jÃ  bien aider ! PrÃ©parer des recettes simples renforce la confiance en soi.',
    },
  },

  // Daily Tips
  dailyTips: [
    'Laisse ton enfant chercher les ingrÃ©dients du dÃ®ner dans le rÃ©frigÃ©rateur â dans le Tuki, tout est Ã  hauteur de ses yeux.',
    'Les enfants adorent les rituels : un moment cuisine fixe le week-end renforce les liens familiaux.',
    'Astuce : nomme les couleurs et les formes en cuisinant â ton enfant apprend tout naturellement.',
    'Laisse ton enfant mettre la table â cela favorise le comptage, le tri et la fiertÃ© de ses rÃ©alisations.',
    'Faire les courses ensemble : laisse ton enfant choisir fruits et lÃ©gumes et utiliser ses sens.',
    'Et si on faisait un pique-nique au salon ? Les enfants adorent les lieux de repas crÃ©atifs !',
    'Laisse ton enfant dÃ©cider de ce qu\'on cuisine aujourd\'hui â cela augmente le plaisir de manger.',
  ],

  // Levels
  levels: [
    'Petit explorateur',
    'Aide-cuisinier',
    'Apprenti cuisinier',
    'Star de la famille',
    'Chef cuisinier',
  ],

  // Recipes Page
  recipesPage: {
    title: 'Recettes',
    searchPlaceholder: 'Chercher une recette...',
    resultsCount: (count: number, name?: string) =>
      `${count} recettes ${name ? `pour ${name} ` : ''}trouvÃ©es`,
    noResults: 'Aucune recette trouvÃ©e.',
  },

  // Recipe Detail
  recipeDetail: {
    notFound: 'Recette introuvable',
    backToRecipes: 'Retour aux recettes',
    duration: 'DurÃ©e',
    age: 'Ãge',
    level: 'Niveau',
    servings: 'Portions',
    tukiTip: 'Astuce Tuki',
    ingredients: 'ð IngrÃ©dients',
    preparation: 'ð©âð³ PrÃ©paration',
    completed: (stars: number) => `Bravo ! +${stars} Ã©toiles gagnÃ©es`,
    completeButton: (stars: number) => `â­ Recette terminÃ©e â gagner ${stars} Ã©toiles`,
  },

  // Activities Page
  activitiesPage: {
    title: 'ActivitÃ©s',
    resultsCount: (count: number, name?: string) =>
      `${count} activitÃ©s ${name ? `pour ${name} ` : ''}trouvÃ©es`,
    noResults: 'Aucune activitÃ© trouvÃ©e.',
  },

  // Activity Detail
  activityDetail: {
    notFound: 'ActivitÃ© introuvable',
    backToActivities: 'Retour aux activitÃ©s',
    stars: 'Ã©toiles',
    tukiTip: 'Astuce Tuki',
    learningGoals: 'ð Ce que ton enfant apprend',
    materials: 'ð§° Ce dont tu as besoin',
    steps: 'ð Comment faire',
    completed: (stars: number) => `Bravo ! +${stars} Ã©toiles gagnÃ©es`,
    completeButton: (stars: number) => `â­ ActivitÃ© terminÃ©e â gagner ${stars} Ã©toiles`,
  },

  // Activity Categories
  categories: {
    motorik: 'MotricitÃ©',
    sensorik: 'Sensoriel',
    kreativitÃ¤t: 'CrÃ©ativitÃ©',
    sprache: 'Langage',
    mathe: 'Chiffres & Logique',
    natur: 'Nature & Savoir',
  },

  // Development Page
  development: {
    title: 'DÃ©veloppement',
    disclaimer: 'ð Chaque enfant se dÃ©veloppe Ã  son propre rythme. Ces jalons servent d\'orientation â pas de liste de contrÃ´le. En cas de questions, parlez-en Ã  votre pÃ©diatre.',
    achieved: (count: number, total: number) => `${count}/${total} atteints`,
    allAchieved: 'ð Tous les jalons de cette phase sont atteints !',
    ageGroups: ['12-18 mois', '18-24 mois', '2-3 ans', '3-5 ans'],
    milestoneCategories: {
      motorik: 'MotricitÃ©',
      feinmotorik: 'MotricitÃ© fine',
      sprache: 'Langage',
      selbststÃ¤ndigkeit: 'Autonomie',
      kognition: 'Cognition',
      sozial: 'Social',
    },
  },

  // Community Page
  community: {
    title: 'CommunautÃ©',
    feedTab: 'ð± Fil d\'actu',
    clubTab: 'ð Rejoindre le Tuki Club',
    timeAgo: {
      hours: (n: number) => `il y a ${n} h`,
      days: (n: number) => n === 1 ? 'il y a 1 jour' : `il y a ${n} jours`,
    },
    postTags: {
      rezept: 'Recette',
      tipp: 'Astuce',
      frage: 'Question',
      aktivitÃ¤t: 'ActivitÃ©',
    } as Record<string, string>,
    share: 'Partager',
    clubTitle: 'Tuki Family Club',
    clubDescription: 'Rejoins notre communautÃ© exclusive ! Ãchange avec d\'autres familles Tuki, reÃ§ois des recettes exclusives, un accÃ¨s anticipÃ© aux nouveaux produits et bien plus encore.',
    clubFeatures: [
      'CommunautÃ© privÃ©e de parents',
      'Recettes premium exclusives',
      'AccÃ¨s anticipÃ© aux nouveaux produits',
      'Ligne directe avec l\'Ã©quipe Tuki',
      'DÃ©fis photo mensuels',
    ],
    joinFree: 'Rejoindre gratuitement',
    joinNote: 'Gratuit pour tous les propriÃ©taires de Tuki. Inscription avec preuve d\'achat.',
  },

  // Profile Page
  profilePage: {
    title: 'Profil',
    ourChildren: 'Nos enfants',
    addChild: 'Ajouter un enfant',
    editChild: 'Modifier l\'enfant',
    active: 'Actif',
    current: 'Actuel',
    explorerLevel: 'Niveau explorateur',
    tukiStars: 'Ãtoiles Tuki',
    completed: 'TerminÃ©s',
    favorites: 'Favoris',
    myFavorites: 'Mes favoris',
    settings: 'ParamÃ¨tres',
    language: 'Langue',
    languageValue: 'FranÃ§ais',
    notifications: 'Notifications',
    notificationsValue: 'ActivÃ©es',
    appearance: 'Apparence',
    appearanceValue: 'Clair',
    appVersion: 'Version de l\'app',
    visitWebsite: 'Visiter tuki.ch',
    deleteConfirmTitle: 'Retirer l\'enfant ?',
    deleteConfirmText: 'Tous les favoris et la progression de cet enfant seront supprimÃ©s.',
    childAge: {
      months: 'mois',
      year: 'an',
      years: 'ans',
    },
    modal: {
      chooseAvatar: 'Choisir un avatar',
      name: 'PrÃ©nom',
      birthDate: 'Date de naissance',
    },
  },
}

export default fr
