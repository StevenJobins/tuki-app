export type Language = 'de' | 'en' | 'fr';

export interface Translation {
  title: string;
  subtitle: string;
  price: string;
  shipping: string;
  cta: string;
  learnMore: string;
  explore: string;
  login: string;
  guest: string;
  activities: string;
  activitiesDesc: string;
  recipes: string;
  recipesDesc: string;
  development: string;
  developmentDesc: string;
  myFavorites: string;
  myProgress: string;
  achievements: string;
  recentlyViewed: string;
  completed: string;
  inProgress: string;
  notStarted: string;
  markComplete: string;
  markFavorite: string;
  removeFavorite: string;
  iCookedThis: string;
  features: {
    freeShipping: string;
    warranty: string;
    adjustableHeight: string;
  };
  footer: {
    tagline: string;
    contact: string;
    support: string;
    privacy: string;
  };
  meta: {
    description: string;
    ogImage: string;
  };
}

export type Translations = Record<Language, Translation>;

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
}

export interface NavItem {
  path: string;
  label: string;
}

// VALUE Platform Types
export interface Activity {
  id: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  age: string;
  image: string;
  completed: boolean;
  lastAttempted?: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  title: Record<Language, string>;
  time: string;
  difficulty: Record<Language, string>;
  image: string;
  isFavorite: boolean;
  cookedCount: number;
  lastCooked?: string;
}

export interface Milestone {
  age: string;
  months: Record<Language, string>;
  items: Record<Language, string[]>;
  completed: boolean;
  completedDate?: string;
}
