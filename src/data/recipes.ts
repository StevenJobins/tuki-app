export interface Recipe {
  id: string
  title: string
  subtitle: string
  emoji: string
  image: string
  duration: number
  difficulty: 'leicht' | 'mittel' | 'fortgeschritten'
  ageRange: [number, number]
  season: ('frühling' | 'sommer' | 'herbst' | 'winter' | 'ganzjährig')[]
  servings: number
  tags: string[]
  ingredients: { amount: string; item: string }[]
  steps: { text: string; tip?: string }[]
  tukiTip: string
  stars: number
}

export const recipes: Recipe[] = [
  {
    id: 'banana-pancakes',
    title: 'Bananen-Pancakes',
    subtitle: 'Fluffig, süss & nur 3 Zutaten',
    emoji: '🥞',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: [1, 8],
    season: ['ganzjährig'],
    servings: 2,
    tags: ['Frühstück', 'Schnell', 'Gesund'],
    ingredients: [
      { amount: '2', item: 'Reife Bananen' },
      { amount: '2', item: 'Eier' },
      { amount: '4 EL', item: 'Haferflocken (optional)' },
      { amount: '1 Prise', item: 'Zimt' },
      { amount: 'Etwas', item: 'Kokosöl zum Braten' },
    ],
    steps: [
      { text: 'Bananen in eine Schüssel geben und mit der Gabel zerdrücken.', tip: 'Dein Kind kann das super machen — je reifer die Banane, desto einfacher!' },
      { text: 'Eier dazugeben und gut verrühren.' },
      { text: 'Optional Haferflocken und Zimt unterrühren.' },
      { text: 'In einer Pfanne etwas Kokosöl erhitzen und kleine Pancakes braten (je 2 Min. pro Seite).' },
      { text: 'Mit frischen Beeren oder einem Klecks Joghurt servieren.' },
    ],
    tukiTip: 'Perfekt für kleine Hände: Dein Kind steht im Tuki und zerdrückt die Bananen selbst. Das trainiert die Feinmotorik!',
    stars: 1,
  },
  {
    id: 'gemüse-muffins',
    title: 'Bunte Gemüse-Muffins',
    subtitle: 'Verstecktes Gemüse, das Kinder lieben',
    emoji: '🧁',
    image: 'https://images.unsplash.com/photo-1558303022-8d45f7e1c4c8?w=600&h=400&fit=crop',
    duration: 40,
    difficulty: 'mittel',
    ageRange: [2, 8],
    season: ['ganzjährig'],
    servings: 12,
    tags: ['Snack', 'Gemüse', 'Meal Prep'],
    ingredients: [
      { amount: '200g', item: 'Mehl' },
      { amount: '1 TL', item: 'Backpulver' },
      { amount: '2', item: 'Eier' },
      { amount: '100ml', item: 'Milch' },
      { amount: '80ml', item: 'Olivenöl' },
      { amount: '1', item: 'Zucchini (geraspelt)' },
      { amount: '1', item: 'Karotte (geraspelt)' },
      { amount: '50g', item: 'Käse (gerieben)' },
      { amount: '1 Prise', item: 'Salz & Pfeffer' },
    ],
    steps: [
      { text: 'Ofen auf 180°C vorheizen. Muffinform vorbereiten.' },
      { text: 'Gemüse waschen und raspeln.', tip: 'Ab 3 Jahren kann dein Kind mit einer Kinderreibe helfen!' },
      { text: 'Trockene Zutaten in einer Schüssel mischen.' },
      { text: 'Eier, Milch und Öl verquirlen und dazugeben.' },
      { text: 'Geraspeltes Gemüse und Käse unterheben.' },
      { text: 'In die Muffinform füllen und 25 Min. backen.' },
    ],
    tukiTip: 'Im Tuki kann dein Kind wunderbar rühren und den Teig in die Förmchen löffeln. Zählt zusammen: Eins, zwei, drei Muffins!',
    stars: 2,
  },
  {
    id: 'energy-balls',
    title: 'Dattel-Energy-Balls',
    subtitle: 'Gesunder Snack ohne Zucker',
    emoji: '🟤',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: [2, 8],
    season: ['ganzjährig'],
    servings: 15,
    tags: ['Snack', 'Zuckerfrei', 'Keine Küche nötig'],
    ingredients: [
      { amount: '150g', item: 'Medjool-Datteln (entsteint)' },
      { amount: '100g', item: 'Haferflocken' },
      { amount: '2 EL', item: 'Kokosraspeln' },
      { amount: '2 EL', item: 'Kakaopulver' },
      { amount: '1 EL', item: 'Erdnussbutter' },
    ],
    steps: [
      { text: 'Alle Zutaten in eine Schüssel geben.' },
      { text: 'Mit den Händen gut durchkneten, bis eine klebrige Masse entsteht.', tip: 'Das ist das Highlight für Kinder — Matschen erlaubt!' },
      { text: 'Kleine Kugeln formen (ca. 15 Stück).' },
      { text: 'In Kokosraspeln wälzen.' },
      { text: '30 Min. in den Kühlschrank stellen — fertig!' },
    ],
    tukiTip: 'Kugeln formen ist perfektes Feinmotorik-Training. Dein Kind steht im Tuki auf Arbeitshöhe und kann richtig mithelfen.',
    stars: 1,
  },
  {
    id: 'pizza-gesichter',
    title: 'Pizza-Gesichter',
    subtitle: 'Kreative Mini-Pizzen selbst belegen',
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    duration: 35,
    difficulty: 'mittel',
    ageRange: [2, 8],
    season: ['ganzjährig'],
    servings: 4,
    tags: ['Mittagessen', 'Kreativ', 'Familienfavorit'],
    ingredients: [
      { amount: '1', item: 'Fertiger Pizzateig (oder selbst gemacht)' },
      { amount: '200ml', item: 'Tomatensauce' },
      { amount: '200g', item: 'Mozzarella' },
      { amount: 'Verschiedene', item: 'Gemüse zum Belegen: Oliven, Paprika, Mais, Kirschtomaten' },
    ],
    steps: [
      { text: 'Ofen auf 220°C vorheizen.' },
      { text: 'Teig in 4 runde Fladen formen.', tip: 'Kinder lieben es, den Teig zu drücken und zu formen!' },
      { text: 'Tomatensauce verteilen.' },
      { text: 'Jetzt wird es kreativ: Lustige Gesichter mit dem Gemüse legen!', tip: 'Oliven-Augen, Paprika-Mund, Mais-Nase — der Fantasie sind keine Grenzen gesetzt.' },
      { text: '12-15 Minuten backen bis der Käse goldbraun ist.' },
    ],
    tukiTip: 'Im Tuki erreicht dein Kind die Arbeitsfläche perfekt und kann sein eigenes Pizza-Gesicht kreieren. Fördert Kreativität und Selbstständigkeit!',
    stars: 2,
  },
  {
    id: 'obstspiesse',
    title: 'Regenbogen-Obstspiesse',
    subtitle: 'Farben lernen & gesund snacken',
    emoji: '🌈',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: [1, 5],
    season: ['sommer', 'frühling'],
    servings: 4,
    tags: ['Snack', 'Gesund', 'Farben lernen'],
    ingredients: [
      { amount: '1 Handvoll', item: 'Erdbeeren (rot)' },
      { amount: '1', item: 'Mandarine (orange)' },
      { amount: '1', item: 'Banane (gelb)' },
      { amount: '1 Handvoll', item: 'Kiwi-Scheiben (grün)' },
      { amount: '1 Handvoll', item: 'Blaubeeren (blau)' },
      { amount: '4', item: 'Holzspiesse (ohne Spitze!)' },
    ],
    steps: [
      { text: 'Obst waschen und in mundgerechte Stücke schneiden.' },
      { text: 'Farben sortieren und benennen: Rot, Orange, Gelb, Grün, Blau.', tip: 'Nutzt die Gelegenheit, zusammen die Farben zu lernen!' },
      { text: 'Obst in Regenbogen-Reihenfolge auf die Spiesse stecken.' },
      { text: 'Sofort geniessen!' },
    ],
    tukiTip: 'Dein Kind steht im Tuki und sortiert die Farben selbst auf den Spiess. Das trainiert Feinmotorik, Farberkennung und macht riesig Spass!',
    stars: 1,
  },
  {
    id: 'weihnachtsguetzli',
    title: 'Weihnachts-Guetzli',
    subtitle: 'Klassische Schweizer Butterplätzchen',
    emoji: '🎄',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop',
    duration: 60,
    difficulty: 'mittel',
    ageRange: [2, 8],
    season: ['winter'],
    servings: 40,
    tags: ['Weihnachten', 'Backen', 'Tradition'],
    ingredients: [
      { amount: '300g', item: 'Mehl' },
      { amount: '200g', item: 'Butter (kalt, gewürfelt)' },
      { amount: '100g', item: 'Puderzucker' },
      { amount: '1', item: 'Ei' },
      { amount: '1 Prise', item: 'Salz' },
      { amount: '1 TL', item: 'Vanilleextrakt' },
      { amount: 'Nach Wunsch', item: 'Zuckerguss, Streusel, Schokoglasur' },
    ],
    steps: [
      { text: 'Mehl, Zucker und Salz mischen. Kalte Butter dazugeben und zu Streuseln verarbeiten.' },
      { text: 'Ei und Vanille dazugeben, zu einem glatten Teig kneten.' },
      { text: 'Teig in Folie wickeln und 30 Min. kühlen.' },
      { text: 'Teig ausrollen und mit Förmchen ausstechen.', tip: 'Das Lieblingsmoment aller Kinder! Sterne, Herzen, Tannenbäume...' },
      { text: 'Bei 180°C ca. 10-12 Min. backen (nicht zu braun!).' },
      { text: 'Abkühlen lassen und nach Lust verzieren.' },
    ],
    tukiTip: 'Guetzli-Backen im Tuki ist Schweizer Familientradition! Dein Kind rollt aus, sticht aus und verziert — alles auf der perfekten Höhe.',
    stars: 3,
  },
  {
    id: 'smoothie-bowl',
    title: 'Beeren-Smoothie-Bowl',
    subtitle: 'Bunt, gesund & kreativ dekoriert',
    emoji: '🫐',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: [1, 6],
    season: ['sommer', 'frühling'],
    servings: 2,
    tags: ['Frühstück', 'Gesund', 'Schnell'],
    ingredients: [
      { amount: '200g', item: 'Gefrorene Beeren' },
      { amount: '1', item: 'Banane' },
      { amount: '100ml', item: 'Joghurt' },
      { amount: 'Zum Topping', item: 'Granola, Kokosflocken, frische Beeren' },
    ],
    steps: [
      { text: 'Gefrorene Beeren, Banane und Joghurt im Mixer pürieren.' },
      { text: 'In zwei Schalen füllen.' },
      { text: 'Jetzt dekorieren! Granola, Kokosflocken und frische Beeren drauf.', tip: 'Dein Kind wählt die Toppings und legt sie auf — wie ein kleines Kunstwerk!' },
    ],
    tukiTip: 'Im Tuki hat dein Kind den perfekten Blick auf seine Bowl und kann kreativ dekorieren. Jede Bowl wird ein Unikat!',
    stars: 1,
  },
  {
    id: 'osterhasen-brot',
    title: 'Osterhasen-Brot',
    subtitle: 'Süsses Hefebrot in Hasenform',
    emoji: '🐰',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&h=400&fit=crop',
    duration: 90,
    difficulty: 'fortgeschritten',
    ageRange: [3, 8],
    season: ['frühling'],
    servings: 4,
    tags: ['Ostern', 'Backen', 'Saisonal'],
    ingredients: [
      { amount: '500g', item: 'Mehl' },
      { amount: '80g', item: 'Zucker' },
      { amount: '1 Würfel', item: 'Frische Hefe' },
      { amount: '200ml', item: 'Warme Milch' },
      { amount: '80g', item: 'Butter (weich)' },
      { amount: '1', item: 'Ei + 1 Eigelb zum Bestreichen' },
      { amount: '1 Prise', item: 'Salz' },
      { amount: '4', item: 'Rosinen für die Augen' },
    ],
    steps: [
      { text: 'Hefe in warmer Milch auflösen und 10 Min. stehen lassen.' },
      { text: 'Mehl, Zucker, Salz, Ei und Butter vermengen. Hefemilch dazu und 10 Min. kneten.' },
      { text: 'Teig 1 Stunde zugedeckt gehen lassen.' },
      { text: 'Teig in 4 Teile teilen. Hasenformen formen: ovaler Körper, zwei lange Ohren.', tip: 'Kinder lieben das Formen — zeig ihnen wie man Ohren rollt!' },
      { text: 'Rosinen als Augen eindrücken. Mit Eigelb bestreichen.' },
      { text: 'Bei 180°C 20-25 Min. goldbraun backen.' },
    ],
    tukiTip: 'Teig kneten, Hasen formen, Augen setzen — im Tuki ist dein Kind auf Augenhöhe dabei. Ein Oster-Erlebnis das bleibt!',
    stars: 3,
  },
]

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id)
}

export function getRecipesByAge(age: number): Recipe[] {
  return recipes.filter(r => age >= r.ageRange[0] && age <= r.ageRange[1])
}

export function getSeasonalRecipes(): Recipe[] {
  const month = new Date().getMonth()
  let season: string
  if (month >= 2 && month <= 4) season = 'frühling'
  else if (month >= 5 && month <= 7) season = 'sommer'
  else if (month >= 8 && month <= 10) season = 'herbst'
  else season = 'winter'
  return recipes.filter(r => r.season.includes(season as any) || r.season.includes('ganzjährig'))
}
