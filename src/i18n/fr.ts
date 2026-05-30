import type { Translations } from './de'

const fr: Translations = {
  // Step-by-Step Mode
  stepMode: {
    startCooking: 'Lancer le mode cuisine',
    startActivity: 'Commencer l\'activité',
    step: 'Étape',
    next: 'Suivant',
    back: 'Retour',
    done: 'Terminé',
    stepDone: 'Fait',
    stepsCompleted: 'étapes terminées',
    finish: (stars: number) => `Bravo ! +${stars} étoiles gagnées`,
    alreadyCompleted: 'Déjà terminé',
  },

  // Navigation
  nav: {
    home: 'Accueil',
    recipes: 'Recettes',
    activities: 'Activités',
    community: 'Communauté',
    profile: 'Profil',
    favorites: 'Favoris',
    weeklyPlan: 'Plan de la semaine',
    fridgeCheck: 'Check ingrédients',
    development: 'Développement',
    starShop: 'Boutique étoiles',
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
    stars: 'étoiles',
    showAll: 'Tout afficher',
    noResults: 'Aucun résultat trouvé.',
    tryOtherFilter: 'Essaie un autre filtre !',
    recipe: 'Recette',
    activity: 'Activité',
  },

  // Header
  header: {
    title: 'Tuki Family',
  },

  // Notifications
  notifications: {
    title: 'Notifications',
    markAllRead: 'Tout marquer comme lu',
    footer: 'Voici vos dernières mises à jour',
    empty: 'Aucune nouvelle notification',
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
    fortgeschritten: 'Avancé',
    filterAll: 'Tout',
    filterEasy: '⚡ Facile',
    filterMedium: '🔥 Moyen',
    filterPro: '🌟 Pro',
  },

  // Home Page
  home: {
    greetings: {
      morning: 'Bonjour',
      noon: 'Bon appétit',
      afternoon: 'Bon après-midi',
      evening: 'Bonsoir',
    },
    heroQuestion: (name: string) => `Que découvre ${name} aujourd'hui ?`,
    heroQuestionGeneric: 'Que découvrons-nous ensemble aujourd\'hui ?',
    starsLabel: 'étoiles',
    completedLabel: 'Terminés',
    quickActions: {
      recipes: 'Recettes',
      activities: 'Activités',
      development: 'Développement',
      community: 'Communauté',
    },
    seasonalRecipes: (season: string) => `Recettes de ${season.toLowerCase()}`,
    seasonalIdeasFor: (count: number, name: string) => `${count} idées adaptées pour ${name}`,
    seasonalIdeasGeneric: (count: number) => `${count} idées de saison à découvrir`,
    recipesFor: (name: string) => `Recettes pour ${name}`,
    popularRecipes: 'Recettes populaires',
    activitiesFor: (name: string) => `Activités pour ${name}`,
    activitiesToday: 'Activités du jour',
    tipOfDay: 'Astuce Tuki du jour',
    levelProgress: (level: number) => `Niveau ${level}/5`,
    starsToNext: (count: number) => `Encore ${count} étoiles avant le prochain niveau`,
    addChild: 'Ajouter un enfant',
    addChildDesc: 'Pour du contenu personnalisé et des recommandations par âge',
  },

  // Seasons
  seasons: {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver',
  },

  // Phase Insights
  phases: {
    discovery: {
      title: 'Phase de découverte',
      text: 'Ton bébé découvre le monde avec tous ses sens. Des textures et saveurs simples sont parfaites maintenant !',
    },
    littleSteps: {
      title: 'Petits pas, grandes aventures',
      text: 'Ton enfant devient de plus en plus autonome. Laisse-le toucher les ingrédients et prendre en charge des tâches simples.',
    },
    creative: {
      title: 'Épanouissement créatif',
      text: 'L\'imagination fleurit ! Remuer, pétrir et décorer — ton enfant adore participer activement.',
    },
    explorer: {
      title: 'Petits explorateurs',
      text: 'Pourquoi c\'est comme ça ? Ton enfant pose beaucoup de questions. Utilise la cuisine et le bricolage pour apprendre en jouant.',
    },
    miniChef: {
      title: 'Mini-chef en action',
      text: 'Ton enfant peut déjà bien aider ! Préparer des recettes simples renforce la confiance en soi.',
    },
  },

  // Daily Tips
  dailyTips: [
    'Laisse ton enfant chercher les ingrédients du dîner dans le réfrigérateur — dans le Tuki, tout est à hauteur de ses yeux.',
    'Les enfants adorent les rituels : un moment cuisine fixe le week-end renforce les liens familiaux.',
    'Astuce : nomme les couleurs et les formes en cuisinant — ton enfant apprend tout naturellement.',
    'Laisse ton enfant mettre la table — cela favorise le comptage, le tri et la fierté de ses réalisations.',
    'Faire les courses ensemble : laisse ton enfant choisir fruits et légumes et utiliser ses sens.',
    'Et si on faisait un pique-nique au salon ? Les enfants adorent les lieux de repas créatifs !',
    'Laisse ton enfant décider de ce qu\'on cuisine aujourd\'hui — cela augmente le plaisir de manger.',
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
      `${count} recettes ${name ? `pour ${name} ` : ''}trouvées`,
    noResults: 'Aucune recette trouvée.',
  },

  // Recipe Detail
  recipeDetail: {
    notFound: 'Recette introuvable',
    backToRecipes: 'Retour aux recettes',
    duration: 'Durée',
    age: 'Âge',
    level: 'Niveau',
    servings: 'Portions',
    tukiTip: 'Astuce Tuki',
    ingredients: '🛒 Ingrédients',
    preparation: '👩‍🍳 Préparation',
    completed: (stars: number) => `Bravo ! +${stars} étoiles gagnées`,
    completeButton: (stars: number) => `⭐ Recette terminée — gagner ${stars} étoiles`,
  },

  // Activities Page
  activitiesPage: {
    title: 'Activités',
    resultsCount: (count: number, name?: string) =>
      `${count} activités ${name ? `pour ${name} ` : ''}trouvées`,
    noResults: 'Aucune activité trouvée.',
  },

  // Activity Detail
  activityDetail: {
    notFound: 'Activité introuvable',
    backToActivities: 'Retour aux activités',
    stars: 'étoiles',
    tukiTip: 'Astuce Tuki',
    learningGoals: '🎓 Ce que ton enfant apprend',
    materials: '🧰 Ce dont tu as besoin',
    steps: '📋 Comment faire',
    completed: (stars: number) => `Bravo ! +${stars} étoiles gagnées`,
    completeButton: (stars: number) => `⭐ Activité terminée — gagner ${stars} étoiles`,
  },

  // Activity Categories
  categories: {
    motorik: 'Motricité',
    sensorik: 'Sensoriel',
    kreativität: 'Créativité',
    sprache: 'Langage',
    mathe: 'Chiffres & Logique',
    natur: 'Nature & Savoir',
  },

  // Development Page
  development: {
    title: 'Développement',
    disclaimer: '📋 Chaque enfant se développe à son propre rythme. Ces jalons servent d\'orientation — pas de liste de contrôle. En cas de questions, parlez-en à votre pédiatre.',
    achieved: (count: number, total: number) => `${count}/${total} atteints`,
    allAchieved: '🎉 Tous les jalons de cette phase sont atteints !',
    ageGroups: ['12-18 mois', '18-24 mois', '2-3 ans', '3-5 ans'],
    milestoneCategories: {
      motorik: 'Motricité',
      feinmotorik: 'Motricité fine',
      sprache: 'Langage',
      selbstständigkeit: 'Autonomie',
      kognition: 'Cognition',
      sozial: 'Social',
    },
  },

  // Community Page
  community: {
    title: 'Communauté',
    feedTab: '📱 Fil d\'actu',
    clubTab: '🔒 Rejoindre le Tuki Club',
    timeAgo: {
      hours: (n: number) => `il y a ${n} h`,
      days: (n: number) => n === 1 ? 'il y a 1 jour' : `il y a ${n} jours`,
    },
    postTags: {
      rezept: 'Recette',
      tipp: 'Astuce',
      frage: 'Question',
      aktivität: 'Activité',
    } as Record<string, string>,
    share: 'Partager',
    clubTitle: 'Tuki Family Club',
    clubDescription: 'Rejoins notre communauté exclusive ! Échange avec d\'autres familles Tuki, reçois des recettes exclusives, un accès anticipé aux nouveaux produits et bien plus encore.',
    clubFeatures: [
      'Communauté privée de parents',
      'Recettes premium exclusives',
      'Accès anticipé aux nouveaux produits',
      'Ligne directe avec l\'équipe Tuki',
      'Défis photo mensuels',
    ],
    joinFree: 'Rejoindre gratuitement',
    joinNote: 'Gratuit pour tous les propriétaires de Tuki. Inscription avec preuve d\'achat.',
    commentPlaceholder: 'Écrire un commentaire...',
    commentJustNow: 'à l\'instant',
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
    tukiStars: 'Étoiles Tuki',
    completed: 'Terminés',
    favorites: 'Favoris',
    myFavorites: 'Mes favoris',
    settings: 'Paramètres',
    language: 'Langue',
    languageValue: 'Français',
    notifications: 'Notifications',
    notificationsValue: 'Activées',
    appearance: 'Apparence',
    appearanceValue: 'Clair',
    appVersion: 'Version de l\'app',
    visitWebsite: 'Visiter tuki.ch',
    deleteConfirmTitle: 'Retirer l\'enfant ?',
    deleteConfirmText: 'Tous les favoris et la progression de cet enfant seront supprimés.',
    childAge: {
      months: 'mois',
      year: 'an',
      years: 'ans',
    },
    modal: {
      chooseAvatar: 'Choisir un avatar',
      name: 'Prénom',
      birthDate: 'Date de naissance',
    },
  },

  // Account Settings
  accountSettings: {
    title: 'Paramètres du compte',
    profileSection: 'Profil',
    changeAvatar: 'Changer l\'avatar',
    tapToChange: 'Appuyer pour changer',
    displayName: 'Nom d\'affichage',
    namePlaceholder: 'Entrer le nom',
    saveProfile: 'Enregistrer le profil',
    emailSection: 'Adresse e-mail',
    currentEmail: 'E-mail actuel',
    newEmail: 'Nouvel e-mail',
    newEmailPlaceholder: 'nouveau@email.ch',
    changeEmail: 'Changer l\'e-mail',
    emailSuccess: 'E-mail de confirmation envoyé ! Vérifie ta boîte de réception.',
    passwordSection: 'Mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    newPasswordPlaceholder: 'Min. 6 caractères',
    confirmPassword: 'Confirmer le mot de passe',
    confirmPasswordPlaceholder: 'Entrer à nouveau',
    changePassword: 'Changer le mot de passe',
    passwordSuccess: 'Mot de passe changé avec succès !',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères.',
    passwordMismatch: 'Les mots de passe ne correspondent pas.',
    logout: 'Se déconnecter',
    dangerZone: 'Zone de danger',
    deleteWarning: 'La suppression de ton compte effacera définitivement toutes tes données, favoris et progrès.',
    deleteAccount: 'Supprimer le compte',
    deleteConfirmPrompt: 'Tape "{word}" pour confirmer :',
    deleteConfirmWord: 'SUPPRIMER',
    deleteForever: 'Supprimer définitivement',
  },

  // Star Shop
  starShop: {
    title: 'Boutique étoiles',
    all: 'Tout',
    badges: 'Badges',
    titles: 'Titres',
    activities: 'Activités',
    yourBalance: 'Ton solde',
    totalEarned: 'Total gagné',
    spent: 'Dépensé',
    redeemed: 'Échangé !',
    owned: 'Obtenu',
    noStarsTitle: 'Pas encore d’étoiles',
    noStarsDesc: 'Complète des recettes et activités pour gagner des étoiles !',
    rewards: {
      'badge-chef': { name: 'Badge Chef', desc: 'Montre ton talent culinaire' },
      'badge-star': { name: 'Badge Superstar', desc: 'Tu es une superstar' },
      'badge-rocket': { name: 'Badge Fusée', desc: 'Direction les étoiles' },
      'badge-crown': { name: 'Badge Couronne', desc: 'Roi de la cuisine' },
      'badge-rainbow': { name: 'Badge Arc-en-ciel', desc: 'Cuisiner en couleurs' },
      'badge-heart': { name: 'Badge Cœur', desc: 'Cuisiné avec amour' },
      'title-explorer': { name: 'Titre Explorateur', desc: 'Nouveau titre pour ton profil' },
      'title-superchef': { name: 'Titre Superchef', desc: 'Le titre ultime' },
      'activity-baking': { name: 'Aventure Pâtisserie', desc: 'Débloquer une activité bonus' },
      'activity-painting': { name: 'Aventure Peinture', desc: 'Deviens créatif' },
      'activity-garden': { name: 'Aventure Jardin', desc: 'Découvrir les plantes' },
      'activity-music': { name: 'Aventure Musique', desc: 'Vivre le rythme' },
    } as Record<string, { name: string; desc: string }>,
  },
}

export default fr
