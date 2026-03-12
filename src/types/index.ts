export type Language = 'de' | 'en' | 'fr';

export interface Translation {
  title: string;
  subtitle: string;
  price: string;
  shipping: string;
  cta: string;
  learnMore: string;
  activities: string;
  activitiesDesc: string;
  recipes: string;
  recipesDesc: string;
  development: string;
  developmentDesc: string;
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
