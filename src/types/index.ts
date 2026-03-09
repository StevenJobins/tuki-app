export type Language = 'de' | 'en' | 'fr';

export interface Activity {
  id: string;
  title: {
    de: string;
    en: string;
    fr: string;
  };
  description: {
    de: string;
    en: string;
    fr: string;
  };
  ageRange: string;
  category: ActivityCategory;
  image: string;
  materials: string[];
  steps: {
    de: string[];
    en: string[];
    fr: string[];
  };
  benefits: {
    de: string[];
    en: string[];
    fr: string[];
  };
  variations?: {
    de: string[];
    en: string[];
    fr: string[];
  };
  duration?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
}

export type ActivityCategory = 
  | 'sensory'
  | 'motor'
  | 'cognitive'
  | 'creative'
  | 'language'
  | 'math';

export interface Recipe {
  id: string;
  title: {
    de: string;
    en: string;
    fr: string;
  };
  description: {
    de: string;
    en: string;
    fr: string;
  };
  ageRange: string;
  category: 'breakfast' | 'snack' | 'lunch' | 'dinner' | 'dessert';
  image: string;
  prepTime: string;
  ingredients: {
    de: string[];
    en: string[];
    fr: string[];
  };
  steps: {
    de: string[];
    en: string[];
    fr: string[];
  };
  difficulty: 'easy' | 'medium' | 'hard';
  allergens?: string[];
  nutrients?: {
    de: string[];
    en: string[];
    fr: string[];
  };
}

export interface Milestone {
  id: string;
  ageRange: string;
  category: 'motor' | 'cognitive' | 'social' | 'language' | 'sensory';
  title: {
    de: string;
    en: string;
    fr: string;
  };
  description: {
    de: string;
    en: string;
    fr: string;
  };
  indicators: {
    de: string[];
    en: string[];
    fr: string[];
  };
}

export interface ProductFeature {
  id: string;
  icon: string;
  title: {
    de: string;
    en: string;
    fr: string;
  };
  description: {
    de: string;
    en: string;
    fr: string;
  };
}
