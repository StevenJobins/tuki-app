import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 'banana-pancakes',
    title: {
      de: "Banana Pancakes",
      en: "Banana Pancakes",
      fr: "Pancakes à la banane"
    },
    description: {
      de: "Gesunde, kinderfreundliche Pfannkuchen aus nur wenigen Zutaten. Perfekt zum gemeinsamen Kochen!",\n      en: "Healthy, child-friendly pancakes with just a few ingredients. Perfect for cooking together!",
      fr: "Pancakes sains et adaptés aux enfants avec seulement quelques ingrédients. Parfait pour cuisiner ensemble!"
    },
    ageRange: "2+",
    category: "breakfast",
    image: "/assets/recipe-pancakes.jpg",
    prepTime: "20 min",
    ingredients: {
      de: [
        "2 reife Bananen",
        "2 Eier",
        "80g Hafermehl",
        "1 TL Backpulver",
        "Öl zum Braten"
      ],
      en: [
        "2 ripe bananas",
        "2 eggs",
        "80g oat flour",
        "1 tsp baking powder",
        "Oil for frying"
      ],
      fr: [
        "2 bananes mûres",
        "2 œufs",
        "80g farine d'avoine",
        "1 cc levure chimique",
        "Huile pour la cuisson"
      ]
    },
    steps: {
      de: [
        "Bananen mit einer Gabel zerdrücken",
        "Eier hinzufügen und verrühren",
        "Hafermehl und Backpulver mischen",
        "Teig ca. 5 Minuten quellen lassen",
        "In einer Pfanne portionsweise ausbacken"
      ],
      en: [
        "Mash bananas with a fork",
        "Add eggs and whisk together",
        "Mix oat flour and baking powder",
        "Let dough rest 5 minutes",
        "Cook portions in a pan"
      ],
      fr: [
        "Écraser les bananes avec une fourchette",
        "Ajouter les œufs et fouetter",
        "Mélanger farine et levure",
        "Laisser reposer la pâte 5 minutes",
        "Cuire des portions dans une poêle"
      ]
    },
    difficulty: "easy",
    allergens: ["Ei", "Gluten"],
    nutrients: {
      de: ["Eiweiss", "Ballaststoffe", "Kalium"],
      en: ["Protein", "Fiber", "Potassium"],
      fr: ["Protéines", "Fibres", "Potassium"]
    }
  },
  {
    id: 'veggie-sticks',
    title: {
      de: "Gemüsesticks mit Hummus",
      en: "Veggie Sticks with Hummus",
      fr: "Bâtonnets de légumes avec houmous"
    },
    description: {
      de: "Knackige Gemüsesticks mit selbstgemachtem Hummus. Ein gesunder Snack voller Energie.",
      en: "Crunchy vegetable sticks with homemade hummus. A healthy snack full of energy.",
      fr: "Bâtonnets de légumes croquants avec houmous maison. Une collation saine pleine d'énergie."
    },
    ageRange: "1+",
    category: "snack",
    image: "/assets/recipe-veggie.jpg",
    prepTime: "15 min",
    ingredients: {
      de: [
        "1 Dose Kichererbsen",
        "2 EL Tahin",
        "1 Zitrone (Saft)",
        "Knoblauchzehe",
        "Olivenöl",
        "Karotten, Gurken, Paprika"
      ],
      en: [
        "1 can chickpeas",
        "2 tbsp tahini",
        "1 lemon (juice)",
        "Garlic clove",
        "Olive oil",
        "Carrots, cucumber, peppers"
      ],
      fr: [
        "1 boîte pois chiches",
        "2 cs tahini",
        "1 citron (jus)",
        "Gousse d'ail",
        "Huile d'olive",
        "Carottes, concombre, poivrons"
      ]
    },
    steps: {
      de: [
        "Kichererbsen abtropfen lassen",
        "Kichererbsen mit Tahin pürieren",
        "Zitronensaft und Knoblauch hinzufügen",
        "Mit Salz und Öl abschmecken",
        "Gemüse in Sticks schneiden"
      ],
      en: [
        "Drain chickpeas",
        "Blend chickpeas with tahini",
        "Add lemon juice and garlic",
        "Season with salt and oil",
        "Cut vegetables into sticks"
      ],
      fr: [
        "Égoutter les pois chiches",
        "Mixer pois chiches et tahini",
        "Ajouter jus de citron et ail",
        "Assaisonner avec sel et huile",
        "Couper légumes en bâtonnets"
      ]
    },
    difficulty: "easy",
    allergens: ["Sesam"],
    nutrients: {
      de: ["Eiweiss", "Ballaststoffe", "Vitamin C"],
      en: ["Protein", "Fiber", "Vitamin C"],
      fr: ["Protéines", "Fibres", "Vitamine C"]
    }
  },
  {
    id: 'rainbow-pasta',
    title: {
      de: "Regenbogen-Nudeln",
      en: "Rainbow Pasta",
      fr: "Pâtes arc-en-ciel"
    },
    description: {
      de: "Bunte Nudeln mit frischem Gemüse. Kinder lieben die Farben!
    },
    ageRange: "2+",
    category: "lunch",
    image: "/assets/recipe-pasta.jpg",
    prepTime: "25 min",
    ingredients: {
      de: [
        "250g Pasta",
        "1 Zucchini",
        "1 Karotte",
        "100g Erbsen",
        "100g Kirschtomaten",
        "Parmesan"
      ],
      en: [
        "250g pasta",
        "1 zucchini",
        "1 carrot",
        "100g peas",
        "100g cherry tomatoes",
        "Parmesan"
      ],
      fr: [
        "250g pâtes",
        "1 courgette",
        "1 carotte",
        "100g petits pois",
        "100g tomates cerises",
        "Parmesan"
      ]
    },
    steps: {
      de: [
        "Pasta kochen",
        "Gemüse in kleine Stücke schneiden",
        "Gemüse dünsten",
        "Alles vermischen",
        "Mit Parmesan servieren"
      ],
      en: [
        "Cook pasta",
        "Cut vegetables into small pieces",
        "Sauté vegetables",
        "Mix everything",
        "Serve with Parmesan"
      ],
      fr: [
        "Cuire les pâtes",
        "Couper légumes en petits morceaux",
        "Faire revenir les légumes",
        "Tout mélanger",
        "Servir avec Parmesan"
      ]
    },
    difficulty: "easy",
    allergens: ["Gluten", "Milch"],
    nutrients: {
      de: [["Kohlenhydrate