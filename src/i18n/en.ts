import type { Translations } from './de'

const en: Translations = {
  // Navigation
  nav: {
    home: 'Home',
    recipes: 'Recipes',
    activities: 'Activities',
    community: 'Community',
    profile: 'Profile',
        favorites: 'Favorites',
        weeklyPlan: 'Weekly Plan',
        fridgeCheck: 'Fridge Check',
        development: 'Development',
        starShop: 'Star Shop',
  },

  // Common
  common: {
    all: 'All',
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    delete: 'Delete',
    share: 'Share',
    min: 'min',
    years: 'years',
    yearsShort: 'yrs',
    stars: 'stars',
    showAll: 'Show all',
    noResults: 'No results found.',
    tryOtherFilter: 'Try a different filter!',
    recipe: 'Recipe',
    activity: 'Activity',
  },

  // Header
  header: {
    title: 'Tuki Family',
  },

  // Age Filter
  ageFilter: {
    all: 'All',
    ranges: ['1-2 yrs', '2-3 yrs', '3-5 yrs', '5-8 yrs'],
  },

  // Difficulty
  difficulty: {
    leicht: 'Easy',
    mittel: 'Medium',
    fortgeschritten: 'Advanced',
    filterAll: 'All',
    filterEasy: '⚡ Easy',
    filterMedium: '🔥 Medium',
    filterPro: '🌟 Pro',
  },

  // Home Page
  home: {
    greetings: {
      morning: 'Good morning',
      noon: 'Lunchtime',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    heroQuestion: (name: string) => `What will ${name} discover today?`,
    heroQuestionGeneric: 'What shall we discover together today?',
    starsLabel: 'stars',
    completedLabel: 'Completed',
    quickActions: {
      recipes: 'Recipes',
      activities: 'Activities',
      development: 'Development',
      community: 'Community',
    },
    seasonalRecipes: (season: string) => `${season} recipes`,
    seasonalIdeasFor: (count: number, name: string) => `${count} matching ideas for ${name}`,
    seasonalIdeasGeneric: (count: number) => `${count} seasonal ideas to discover`,
    recipesFor: (name: string) => `Recipes for ${name}`,
    popularRecipes: 'Popular recipes',
    activitiesFor: (name: string) => `Activities for ${name}`,
    activitiesToday: 'Activities for today',
    tipOfDay: 'Tuki tip of the day',
    levelProgress: (level: number) => `Level ${level}/5`,
    starsToNext: (count: number) => `${count} more stars to the next level`,
    addChild: 'Add child',
    addChildDesc: 'For personalised content & age recommendations',
  },

  // Seasons
  seasons: {
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter',
  },

  // Phase Insights
  phases: {
    discovery: {
      title: 'Discovery phase',
      text: 'Your baby is discovering the world with all their senses. Simple textures and flavours are perfect right now!',
    },
    littleSteps: {
      title: 'Little steps, big adventures',
      text: 'Your child is becoming more independent. Let them touch ingredients and take on simple tasks.',
    },
    creative: {
      title: 'Creative expression',
      text: 'Imagination is blooming! Stirring, kneading and decorating — your child loves to actively join in.',
    },
    explorer: {
      title: 'Little explorers',
      text: 'Why is that so? Your child asks lots of questions. Use cooking and crafting for playful learning.',
    },
    miniChef: {
      title: 'Mini chef in action',
      text: 'Your child can already really help out! Preparing simple recipes on their own builds confidence.',
    },
  },

  // Daily Tips
  dailyTips: [
    'Let your child fetch dinner ingredients from the fridge — in the Tuki they can reach everything at eye level.',
    'Children love rituals: a regular cooking time at weekends strengthens family bonds.',
    'Tip: Name colours and shapes while cooking — your child learns naturally along the way.',
    'Let your child set the table — it encourages counting, sorting and pride in their own achievement.',
    'Go grocery shopping together: let your child choose fruits and vegetables and use their senses.',
    'How about a picnic in the living room today? Children love creative eating spots!',
    'Let your child help decide what to cook today — it increases the joy of eating.',
  ],

  // Levels
  levels: [
    'Little Explorer',
    'Kitchen Helper',
    'Junior Chef',
    'Family Star',
    'Head Chef',
  ],

  // Recipes Page
  recipesPage: {
    title: 'Recipes',
    searchPlaceholder: 'Search recipes...',
    resultsCount: (count: number, name?: string) =>
      `${count} recipes ${name ? `for ${name} ` : ''}found`,
    noResults: 'No recipes found.',
  },

  // Recipe Detail
  recipeDetail: {
    notFound: 'Recipe not found',
    backToRecipes: 'Back to recipes',
    duration: 'Duration',
    age: 'Age',
    level: 'Level',
    servings: 'Servings',
    tukiTip: 'Tuki Tip',
    ingredients: '🛒 Ingredients',
    preparation: '👩‍🍳 Preparation',
    completed: (stars: number) => `Done! +${stars} stars earned`,
    completeButton: (stars: number) => `⭐ Recipe done — earn ${stars} stars`,
  },

  // Activities Page
  activitiesPage: {
    title: 'Activities',
    resultsCount: (count: number, name?: string) =>
      `${count} activities ${name ? `for ${name} ` : ''}found`,
    noResults: 'No activities found.',
  },

  // Activity Detail
  activityDetail: {
    notFound: 'Activity not found',
    backToActivities: 'Back to activities',
    stars: 'stars',
    tukiTip: 'Tuki Tip',
    learningGoals: '🎓 What your child learns',
    materials: '🧰 What you need',
    steps: '📋 How to do it',
    completed: (stars: number) => `Done! +${stars} stars earned`,
    completeButton: (stars: number) => `⭐ Activity done — earn ${stars} stars`,
  },

  // Activity Categories
  categories: {
    motorik: 'Motor Skills',
    sensorik: 'Sensory',
    kreativität: 'Creativity',
    sprache: 'Language',
    mathe: 'Numbers & Logic',
    natur: 'Nature & Knowledge',
  },

  // Development Page
  development: {
    title: 'Development',
    disclaimer: '📋 Every child develops at their own pace. These milestones serve as a guide — not a checklist. If you have questions, talk to your paediatrician.',
    achieved: (count: number, total: number) => `${count}/${total} achieved`,
    allAchieved: '🎉 All milestones of this phase achieved!',
    ageGroups: ['12-18 mo.', '18-24 mo.', '2-3 years', '3-5 years'],
    milestoneCategories: {
      motorik: 'Motor Skills',
      feinmotorik: 'Fine Motor Skills',
      sprache: 'Language',
      selbstständigkeit: 'Independence',
      kognition: 'Cognition',
      sozial: 'Social',
    },
  },

  // Community Page
  community: {
    title: 'Community',
    feedTab: '📱 Feed',
    clubTab: '🔒 Join Tuki Club',
    timeAgo: {
      hours: (n: number) => `${n}h ago`,
      days: (n: number) => n === 1 ? '1 day ago' : `${n} days ago`,
    },
    postTags: {
      rezept: 'Recipe',
      tipp: 'Tip',
      frage: 'Question',
      aktivität: 'Activity',
    } as Record<string, string>,
    share: 'Share',
    clubTitle: 'Tuki Family Club',
    clubDescription: 'Join our exclusive community! Connect with other Tuki families, receive exclusive recipes, early access to new products and much more.',
    clubFeatures: [
      'Private parent community',
      'Exclusive premium recipes',
      'Early access to new products',
      'Direct line to the Tuki team',
      'Monthly photo challenges',
    ],
    joinFree: 'Join for free',
    joinNote: 'Free for all Tuki owners. Registration with proof of purchase.',
    commentPlaceholder: 'Write a comment...',
    commentJustNow: 'just now',
  },

  // Profile Page
  profilePage: {
    title: 'Profile',
    ourChildren: 'Our children',
    addChild: 'Add child',
    editChild: 'Edit child',
    active: 'Active',
    current: 'Current',
    explorerLevel: 'Explorer level',
    tukiStars: 'Tuki Stars',
    completed: 'Completed',
    favorites: 'Favourites',
    myFavorites: 'My favourites',
    settings: 'Settings',
    language: 'Language',
    languageValue: 'English',
    notifications: 'Notifications',
    notificationsValue: 'On',
    appearance: 'Appearance',
    appearanceValue: 'Light',
    appVersion: 'App version',
    visitWebsite: 'Visit tuki.ch',
    deleteConfirmTitle: 'Remove child?',
    deleteConfirmText: 'All favourites and progress for this child will be deleted.',
    childAge: {
      months: 'months',
      year: 'year',
      years: 'years',
    },
    modal: {
      chooseAvatar: 'Choose avatar',
      name: 'Name',
      birthDate: 'Date of birth',
    },
  },
  starShop: {
    title: 'Star Shop',
    balance: 'Your Balance',
    stars: 'Stars',
    earned: 'Earned',
    spent: 'Spent',
    howToEarn: 'How to Earn Stars',
    completeActivity: 'Complete an activity',
    withPhoto: 'Share with photo',
    filterAll: 'All',
    filterProducts: '🎁 Products',
    filterDiscounts: '🏷️ Discounts',
    filterDigital: '📱 Digital',
    redeemedRewards: 'Redeemed Rewards',
    redeemed: 'Redeemed',
    redeem: 'Redeem',
    rewards: {
      stickerSet: { name: 'Tuki Sticker Set', description: '12 cute Tuki stickers for your child' },
      recipeBook: { name: 'Recipe Book Download', description: 'Digital cookbook with 20 kids recipes' },
      freeShipping: { name: 'Free Shipping', description: 'Free shipping on your next order' },
      snackBox: { name: 'Tuki Snack Box', description: 'Healthy snacks for the whole family' },
      discount10: { name: '10% Discount', description: 'On all Tuki products in the shop' },
      surprise: { name: 'Surprise Package', description: 'Get surprised with great Tuki products' },
    },
  },
}

export default en
