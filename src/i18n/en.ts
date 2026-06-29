import type { Translations } from './de'

const en: Translations = {
  // Step-by-Step Mode
  stepMode: {
    startCooking: 'Start cooking mode',
    startActivity: 'Start activity',
    step: 'Step',
    next: 'Next',
    back: 'Back',
    done: 'Done',
    stepDone: 'Completed',
    stepsCompleted: 'steps completed',
    finish: (stars: number) => `Done! Earn +${stars} stars`,
    alreadyCompleted: 'Already completed',
  },

  // Navigation
  nav: {
    home: 'Home',
    recipes: 'Recipes',
    activities: 'Activities',
    community: 'Community',
    profile: 'Profile',
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

  // Notifications
  notifications: {
    title: 'Notifications',
    markAllRead: 'Mark all read',
    footer: 'These are your latest updates',
    empty: 'No new notifications',
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

  seasonalTip: {
    spring: { emoji: '🌷', title: 'Spring tip', text: 'Head outside: puddles, first flowers and birdsong are wonderful discoveries. A light jacket is usually enough, the weather changes quickly.' },
    summer: { emoji: '🌡️', title: 'Heat tip for hot days', text: 'Offer your child water regularly, plan playtime in the shade and avoid the strong midday sun (around 11am-3pm). Light, airy clothing, a sun hat and a cool foot bath or paddling pool help against the heat.' },
    autumn: { emoji: '🍂', title: 'Autumn tip', text: 'Collecting colourful leaves, rustling through them and hunting for chestnuts is great fun. Dress in layers: chilly in the morning, often still warm at midday.' },
    winter: { emoji: '❄️', title: 'Winter tip', text: 'Fresh air does good even in the cold: wrap up warm and don\'t forget a hat. Indoors, active games help against cabin fever.' },
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
    done: 'Done',
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
    milestones: {
      m1: { title: 'First steps alone', description: 'Your child takes their first steps without help.' },
      m2: { title: 'Tower of 2-3 blocks', description: 'Can stack blocks and build a small tower.' },
      m3: { title: 'First words (5-10)', description: 'Deliberately says first words like mum, dad, ball, dog...' },
      m4: { title: 'Drinking from a cup', description: 'Can drink from an open cup with both hands.' },
      m5: { title: 'Climbing stairs (with help)', description: 'Goes up stairs while holding the railing or a hand.' },
      m6: { title: 'Two-word sentences', description: '"Mum there", "want ball", "more milk": first two-word combinations.' },
      m7: { title: 'Eating with a spoon', description: 'Can (mostly) eat with a spoon alone, even if it gets messy!' },
      m8: { title: 'Scribbling with a pen', description: 'Holds a pen and makes deliberate scribbles on paper.' },
      m9: { title: 'Running & jumping', description: 'Can run without falling and tries to jump.' },
      m10: { title: 'Naming colours', description: 'Recognises and names at least 3-4 basic colours.' },
      m11: { title: 'Getting dressed (partly)', description: 'Can put on and take off shoes, hat or jacket (partly) alone.' },
      m12: { title: 'Counting to 10', description: 'Counts (with or without mistakes) to at least 10.' },
      m13: { title: 'Cutting with scissors', description: 'Can cut along a line with child-safe scissors.' },
      m14: { title: 'Writing their own name', description: 'Writes their own name (maybe mirror-inverted).' },
      m15: { title: 'Making friends', description: 'Plays with specific children on purpose and calls them "friend".' },
      m16: { title: 'Retelling stories', description: 'Can retell a simple story in their own words.' },
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

  // Account Settings
  accountSettings: {
    title: 'Account Settings',
    profileSection: 'Profile',
    changeAvatar: 'Change avatar',
    tapToChange: 'Tap to change',
    displayName: 'Display name',
    namePlaceholder: 'Enter name',
    saveProfile: 'Save profile',
    emailSection: 'Email address',
    currentEmail: 'Current email',
    newEmail: 'New email',
    newEmailPlaceholder: 'new@email.com',
    changeEmail: 'Change email',
    emailSuccess: 'Confirmation email sent! Please check your inbox.',
    passwordSection: 'Password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    newPasswordPlaceholder: 'Min. 6 characters',
    confirmPassword: 'Confirm password',
    confirmPasswordPlaceholder: 'Enter again',
    changePassword: 'Change password',
    passwordSuccess: 'Password changed successfully!',
    passwordTooShort: 'Password must be at least 6 characters.',
    passwordMismatch: 'Passwords do not match.',
    logout: 'Log out',
    dangerZone: 'Danger zone',
    deleteWarning: 'Deleting your account will permanently remove all your data, favourites and progress.',
    deleteAccount: 'Delete account',
    deleteConfirmPrompt: 'Type "{word}" to confirm:',
    deleteConfirmWord: 'DELETE',
    deleteForever: 'Delete forever',
  },
  starShop: {
    title: 'Star Shop',
    all: 'All',
    badges: 'Badges',
    titles: 'Titles',
    activities: 'Activities',
    yourBalance: 'Your balance',
    totalEarned: 'Total earned',
    spent: 'Spent',
    redeemed: 'Redeemed!',
    owned: 'Owned',
    noStarsTitle: 'No stars yet',
    noStarsDesc: 'Complete recipes and activities to earn stars!',
    rewards: {
      'badge-chef': { name: 'Chef Badge', desc: 'Show your cooking talent' },
      'badge-star': { name: 'Superstar Badge', desc: 'You are a superstar' },
      'badge-rocket': { name: 'Rocket Badge', desc: 'Off to the stars' },
      'badge-crown': { name: 'Crown Badge', desc: 'King of the kitchen' },
      'badge-rainbow': { name: 'Rainbow Badge', desc: 'Cook colourfully' },
      'badge-heart': { name: 'Heart Badge', desc: 'Cooked with love' },
      'title-explorer': { name: 'Explorer Title', desc: 'New title for your profile' },
      'title-superchef': { name: 'Superchef Title', desc: 'The ultimate title' },
      'activity-baking': { name: 'Baking Adventure', desc: 'Unlock a bonus activity' },
      'activity-painting': { name: 'Painting Adventure', desc: 'Get creative' },
      'activity-garden': { name: 'Garden Adventure', desc: 'Discover plants' },
      'activity-music': { name: 'Music Adventure', desc: 'Experience rhythm' },
    } as Record<string, { name: string; desc: string }>,
  },
}

export default en
