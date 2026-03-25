export interface Recipe {
  id: string
  title: string
  subtitle: string
  emoji: string
  image: string
  duration: number
  difficulty: 'leicht' | 'mittel' | 'anspruchsvoll'
  ageRange: string
  season: string
  servings: string
  tags: string[]
  ingredients: { amount: string; name: string }[]
  steps: { text: string; tip?: string }[]
  tukiTip: string
  stars: number
}

export const recipes: Recipe[] = [
  {
    id: 'banana-pancakes',
    title: 'Bananen-Pancakes',
    subtitle: 'Fluffig, suess & nur 3 Zutaten',
    emoji: '🥞',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'ganzjaehrig',
    servings: '2-3 Portionen',
    tags: ['Fruehstueck', 'Schnell', 'Gesund'],
    ingredients: [
      { amount: '2', name: 'Reife Bananen' },
      { amount: '2', name: 'Eier' },
      { amount: '4 EL', name: 'Haferflocken (optional)' },
      { amount: '1 Prise', name: 'Zimt' },
      { amount: 'Etwas', name: 'Kokosoel zum Braten' }
    ],
    steps: [
      { text: 'Bananen in eine Schuessel geben und mit der Gabel zerdruecken.', tip: 'Dein Kind kann das super machen — je reifer die Banane, desto einfacher!' },
      { text: 'Eier dazugeben und gut verruehren.' },
      { text: 'Optional Haferflocken und Zimt unterruehren.' },
      { text: 'In einer Pfanne etwas Kokosoel erhitzen und kleine Pancakes braten (je 2 Min. pro Seite).' },
      { text: 'Mit frischen Beeren oder einem Klecks Joghurt servieren.' }
    ],
    tukiTip: 'Perfekt fuer kleine Haende: Dein Kind steht im Tuki und zerdrueckt die Bananen selbst. Das trainiert die Feinmotorik und macht riesig Spass!',
    stars: 1
  },
  {
    id: 'gemuese-muffins',
    title: 'Bunte Gemuese-Muffins',
    subtitle: 'Verstecktes Gemuese, das Kinder lieben',
    emoji: '🧁',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop',
    duration: 40,
    difficulty: 'mittel',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '12 Muffins',
    tags: ['Snack', 'Gemuese'],
    ingredients: [
      { amount: '200g', name: 'Mehl' },
      { amount: '2', name: 'Eier' },
      { amount: '100ml', name: 'Milch' },
      { amount: '1', name: 'Karotte, gerieben' },
      { amount: '1', name: 'Zucchini, gerieben' },
      { amount: '50g', name: 'Kaese, gerieben' },
      { amount: '1 TL', name: 'Backpulver' }
    ],
    steps: [
      { text: 'Ofen auf 180°C vorheizen und Muffinform vorbereiten.' },
      { text: 'Gemuese waschen und reiben lassen.', tip: 'Kinder lieben es, die Raspel zu bedienen — mit Hilfe natuerlich!' },
      { text: 'Trockene Zutaten mischen, dann Eier, Milch und Gemuese unterruehren.' },
      { text: 'Teig in die Foermchen fuellen und 25 Min. backen.' }
    ],
    tukiTip: 'Im Tuki stehend kann dein Kind die Zutaten direkt in die Schuessel geben und umruehren.',
    stars: 2
  },
  {
    id: 'energy-balls',
    title: 'Dattel-Energy-Balls',
    subtitle: 'Gesunder Snack ohne Zucker',
    emoji: '🟤',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '15 Stueck',
    tags: ['Snack', 'Zuckerfrei'],
    ingredients: [
      { amount: '150g', name: 'Datteln (entsteint)' },
      { amount: '100g', name: 'Haferflocken' },
      { amount: '2 EL', name: 'Kakao' },
      { amount: '2 EL', name: 'Kokosraspel' },
      { amount: '1 EL', name: 'Kokosoel' }
    ],
    steps: [
      { text: 'Alle Zutaten in einen Mixer geben und zu einer klebrigen Masse verarbeiten.' },
      { text: 'Kleine Kugeln formen.', tip: 'Perfekte Aufgabe fuer Kinderhaende!' },
      { text: 'In Kokosraspeln oder Kakao waelzen.' },
      { text: 'Mindestens 30 Min. im Kuehlschrank fest werden lassen.' }
    ],
    tukiTip: 'Kugeln rollen ist wie Knete spielen — im Tuki stehend die perfekte Hoehe fuer die Arbeitsflaeche!',
    stars: 1
  },
  {
    id: 'pizza-gesichter',
    title: 'Pizza-Gesichter',
    subtitle: 'Kreative Mini-Pizzen selbst belegen',
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    duration: 35,
    difficulty: 'mittel',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '4 Mini-Pizzen',
    tags: ['Mittagessen', 'Kreativ'],
    ingredients: [
      { amount: '1', name: 'Fertiger Pizzateig' },
      { amount: '4 EL', name: 'Tomatensauce' },
      { amount: '100g', name: 'Mozzarella' },
      { amount: 'Diverse', name: 'Gemuese zum Belegen (Oliven, Paprika, Mais)' }
    ],
    steps: [
      { text: 'Pizzateig in 4 kleine Kreise ausrollen.' },
      { text: 'Mit Tomatensauce bestreichen.' },
      { text: 'Gesichter mit Gemuese legen: Oliven als Augen, Paprika als Mund.', tip: 'Lass dein Kind kreativ werden — jedes Gesicht darf anders aussehen!' },
      { text: 'Mit Kaese bestreuen und bei 200°C ca. 12 Min. backen.' }
    ],
    tukiTip: 'Pizza belegen ist Kunst! Im Tuki kann dein Kind auf Arbeitshoehe kreativ werden.',
    stars: 2
  },
  {
    id: 'obstspiesse',
    title: 'Regenbogen-Obstspiesse',
    subtitle: 'Farben lernen & gesund snacken',
    emoji: '🌈',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: '1-5',
    season: 'Sommer',
    servings: '6 Spiesse',
    tags: ['Snack', 'Gesund'],
    ingredients: [
      { amount: '1', name: 'Erdbeeren (rot)' },
      { amount: '1', name: 'Mango (orange)' },
      { amount: '1', name: 'Banane (gelb)' },
      { amount: '1', name: 'Kiwi (gruen)' },
      { amount: '1 Handvoll', name: 'Blaubeeren (blau)' },
      { amount: '6', name: 'Holzspiesse' }
    ],
    steps: [
      { text: 'Obst waschen und in mundgerechte Stuecke schneiden.' },
      { text: 'In Regenbogen-Reihenfolge auf die Spiesse stecken.', tip: 'Farben benennen: Rot, Orange, Gelb, Gruen, Blau!' },
      { text: 'Sofort geniessen oder mit Joghurt-Dip servieren.' }
    ],
    tukiTip: 'Farben lernen beim Essen — im Tuki kann dein Kind die Fruechte selbst aufspiessen.',
    stars: 1
  },
  {
    id: 'weihnachtsguetzli',
    title: 'Weihnachts-Guetzli',
    subtitle: 'Klassische Schweizer Butterplaetzchen',
    emoji: '🎄',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop',
    duration: 60,
    difficulty: 'anspruchsvoll',
    ageRange: '2-8',
    season: 'Winter',
    servings: '30 Stueck',
    tags: ['Weihnachten', 'Backen'],
    ingredients: [
      { amount: '250g', name: 'Butter (weich)' },
      { amount: '200g', name: 'Zucker' },
      { amount: '1', name: 'Ei' },
      { amount: '500g', name: 'Mehl' },
      { amount: '1 Prise', name: 'Salz' },
      { amount: 'Nach Belieben', name: 'Zuckerguss & Streusel' }
    ],
    steps: [
      { text: 'Butter und Zucker schaumig schlagen.' },
      { text: 'Ei einruehren, dann Mehl und Salz dazugeben.' },
      { text: 'Teig 1 Stunde kuehlen.' },
      { text: 'Ausrollen und Formen ausstechen.', tip: 'Das Lieblings-Teil der Kinder! Sterne, Monde, Tannenbaum...' },
      { text: 'Bei 180°C ca. 10 Min. backen und verzieren.' }
    ],
    tukiTip: 'Guetzli ausstechen und verzieren — DIE Weihnachtstradition! Im Tuki ist die Arbeitsflaeche perfekt erreichbar.',
    stars: 3
  },
  {
    id: 'smoothie-bowl',
    title: 'Beeren-Smoothie-Bowl',
    subtitle: 'Bunt, gesund & kreativ dekoriert',
    emoji: '🫐',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: '1-6',
    season: 'ganzjaehrig',
    servings: '2 Bowls',
    tags: ['Fruehstueck', 'Gesund'],
    ingredients: [
      { amount: '200g', name: 'Gefrorene Beeren' },
      { amount: '1', name: 'Banane' },
      { amount: '100ml', name: 'Milch oder Haferdrink' },
      { amount: 'Zum Toppen', name: 'Granola, Kokosflocken, frisches Obst' }
    ],
    steps: [
      { text: 'Beeren, Banane und Milch im Mixer puerieren.' },
      { text: 'In Schuesseln giessen.' },
      { text: 'Kreativ mit Toppings dekorieren.', tip: 'Malt Gesichter oder Muster mit den Toppings!' }
    ],
    tukiTip: 'Toppings anordnen ist wie Malen — lass dein Kind im Tuki stehend kreativ werden!',
    stars: 1
  },
  {
    id: 'osterhasen-brot',
    title: 'Osterhasen-Brot',
    subtitle: 'Suesser Hefeteig in Hasenform',
    emoji: '🐰',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=300&fit=crop',
    duration: 90,
    difficulty: 'anspruchsvoll',
    ageRange: '3-8',
    season: 'Fruehling',
    servings: '4 Hasen',
    tags: ['Ostern', 'Backen'],
    ingredients: [
      { amount: '500g', name: 'Mehl' },
      { amount: '80g', name: 'Zucker' },
      { amount: '1 Wuerfel', name: 'Hefe' },
      { amount: '200ml', name: 'Warme Milch' },
      { amount: '80g', name: 'Butter' },
      { amount: '1', name: 'Ei' },
      { amount: '4', name: 'Rosinen (fuer die Augen)' }
    ],
    steps: [
      { text: 'Hefe in warmer Milch aufloesen und 10 Min. stehen lassen.' },
      { text: 'Mehl, Zucker, Butter und Ei mit der Hefemilch zu einem Teig kneten.' },
      { text: '1 Stunde gehen lassen.', tip: 'Erklaere deinem Kind, warum der Teig waechst!' },
      { text: 'Hasenformen formen und auf ein Blech legen.' },
      { text: 'Rosinen als Augen druecken. Mit Eigelb bestreichen.' },
      { text: 'Bei 180°C ca. 20 Min. backen.' }
    ],
    tukiTip: 'Teig kneten ist wie Knete spielen! Im Tuki hat dein Kind die perfekte Hoehe zum Mitkneten.',
    stars: 3
  },
  // === NEW RECIPES START HERE ===
  {
    id: 'haferbrei-gesichter',
    title: 'Porridge-Gesichter',
    subtitle: 'Warmes Fruehstueck, lustig dekoriert',
    emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: '1-4',
    season: 'ganzjaehrig',
    servings: '2 Portionen',
    tags: ['Fruehstueck', 'Schnell', 'Gesund'],
    ingredients: [
      { amount: '100g', name: 'Haferflocken' },
      { amount: '250ml', name: 'Milch oder Haferdrink' },
      { amount: '1', name: 'Banane' },
      { amount: 'Handvoll', name: 'Beeren' },
      { amount: '1 TL', name: 'Honig (ab 1 Jahr)' }
    ],
    steps: [
      { text: 'Haferflocken mit Milch aufkochen und 3 Min. koecheln lassen.' },
      { text: 'In Schuesseln fuellen und leicht abkuehlen lassen.' },
      { text: 'Mit Bananenscheiben und Beeren ein Gesicht legen.', tip: 'Augen aus Blaubeeren, Mund aus Bananenscheiben!' }
    ],
    tukiTip: 'Dein Kind dekoriert sein eigenes Fruehstueck — das schmeckt gleich doppelt so gut!',
    stars: 1
  },
  {
    id: 'gemuese-sticks-dip',
    title: 'Gemuese-Sticks mit Dip',
    subtitle: 'Knackig, bunt & zum Dippen',
    emoji: '🥕',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'ganzjaehrig',
    servings: '2 Portionen',
    tags: ['Snack', 'Gesund', 'Schnell'],
    ingredients: [
      { amount: '2', name: 'Karotten' },
      { amount: '1', name: 'Gurke' },
      { amount: '1', name: 'Paprika' },
      { amount: '150g', name: 'Naturjoghurt' },
      { amount: '1 EL', name: 'Kraeuter (Schnittlauch, Dill)' }
    ],
    steps: [
      { text: 'Gemuese waschen und in Sticks schneiden.' },
      { text: 'Joghurt mit Kraeutern mischen.', tip: 'Dein Kind kann die Kraeuter mit der Schere schneiden!' },
      { text: 'Gemuese-Sticks mit Dip servieren.' }
    ],
    tukiTip: 'Dippen macht Kindern riesig Spass — und sie essen so viel mehr Gemuese!',
    stars: 1
  },
  {
    id: 'apfelmus-selber',
    title: 'Apfelmus selber machen',
    subtitle: 'Suesser Klassiker ohne Zucker',
    emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=400&h=300&fit=crop',
    duration: 25,
    difficulty: 'leicht',
    ageRange: '1-6',
    season: 'Herbst',
    servings: '4 Portionen',
    tags: ['Snack', 'Zuckerfrei', 'Herbst'],
    ingredients: [
      { amount: '4', name: 'Aepfel (suesse Sorte)' },
      { amount: '100ml', name: 'Wasser' },
      { amount: '1 TL', name: 'Zimt' },
      { amount: '1 Spritzer', name: 'Zitronensaft' }
    ],
    steps: [
      { text: 'Aepfel schaelen, entkernen und in Stuecke schneiden.' },
      { text: 'Mit Wasser und Zimt aufkochen und 15 Min. weich kochen.' },
      { text: 'Mit der Gabel zerdruecken oder puerieren.', tip: 'Manche Kinder moegen es stueckig — frag deins!' }
    ],
    tukiTip: 'Aepfel schaelen geht mit dem Sparschaeler — im Tuki auf der richtigen Hoehe ein super Training!',
    stars: 1
  },
  {
    id: 'wraps-bunt',
    title: 'Bunte Wraps',
    subtitle: 'Rollen, fuellen, reinbeissen',
    emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '4 Wraps',
    tags: ['Mittagessen', 'Schnell'],
    ingredients: [
      { amount: '4', name: 'Tortilla-Wraps' },
      { amount: '4 EL', name: 'Frischkaese' },
      { amount: '1', name: 'Karotte, gerieben' },
      { amount: '1/2', name: 'Gurke, in Streifen' },
      { amount: '4 Blaetter', name: 'Salat' },
      { amount: 'Optional', name: 'Poulet oder Kaese' }
    ],
    steps: [
      { text: 'Wraps mit Frischkaese bestreichen.' },
      { text: 'Gemuese und Salat darauf verteilen.', tip: 'Kinder koennen ihre Wraps selbst belegen!' },
      { text: 'Fest einrollen und in der Mitte durchschneiden.' }
    ],
    tukiTip: 'Wraps selber rollen macht Kindern Spass und trainiert die Koordination!',
    stars: 1
  },
  {
    id: 'kartoffelsuppe',
    title: 'Cremige Kartoffelsuppe',
    subtitle: 'Waermend, satt & Seelenfutter',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    duration: 30,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'Winter',
    servings: '4 Portionen',
    tags: ['Mittagessen', 'Winter', 'Gemuese'],
    ingredients: [
      { amount: '500g', name: 'Kartoffeln' },
      { amount: '1', name: 'Zwiebel' },
      { amount: '1', name: 'Karotte' },
      { amount: '500ml', name: 'Gemuese-Bouillon' },
      { amount: '100ml', name: 'Rahm' }
    ],
    steps: [
      { text: 'Kartoffeln schaelen und wuerfeln.' },
      { text: 'Zwiebel und Karotte klein schneiden und anduensten.' },
      { text: 'Kartoffeln dazugeben, mit Bouillon aufgiessen.' },
      { text: '20 Min. kochen, dann puerieren und Rahm einruehren.', tip: 'Dein Kind kann mit dem Stabmixer helfen — Hand drueber halten!' }
    ],
    tukiTip: 'Kartoffeln schaelen und schneiden ist ein tolles Motorik-Training im Tuki!',
    stars: 1
  },
  {
    id: 'bananenbrot',
    title: 'Bananenbrot',
    subtitle: 'Saftig, suess & aus uebrigen Bananen',
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1605090930596-5310a8db4e1e?w=400&h=300&fit=crop',
    duration: 50,
    difficulty: 'mittel',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '1 Kastenbrot',
    tags: ['Snack', 'Backen', 'Zuckerfrei'],
    ingredients: [
      { amount: '3', name: 'Ueberreife Bananen' },
      { amount: '200g', name: 'Dinkelmehl' },
      { amount: '2', name: 'Eier' },
      { amount: '50ml', name: 'Kokosoel (fluessig)' },
      { amount: '1 TL', name: 'Backpulver' },
      { amount: '1 TL', name: 'Zimt' }
    ],
    steps: [
      { text: 'Ofen auf 175°C vorheizen.' },
      { text: 'Bananen zerdruecken — Kinder lieben das!', tip: 'Je brauner die Banane, desto suesser das Brot.' },
      { text: 'Eier und Kokosoel unterruehren.' },
      { text: 'Mehl, Backpulver und Zimt unterheben.' },
      { text: 'In eine Kastenform fuellen und 40 Min. backen.' }
    ],
    tukiTip: 'Bananen zermatschen ist die Lieblingsaufgabe aller Kinder — im Tuki auf Arbeitshoehe perfekt!',
    stars: 2
  },
  {
    id: 'reis-baellchen',
    title: 'Reis-Baellchen (Onigiri)',
    subtitle: 'Japanischer Snack fuer kleine Haende',
    emoji: '🍙',
    image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&h=300&fit=crop',
    duration: 25,
    difficulty: 'leicht',
    ageRange: '2-6',
    season: 'ganzjaehrig',
    servings: '8 Stueck',
    tags: ['Snack', 'Kreativ'],
    ingredients: [
      { amount: '300g', name: 'Sushi-Reis (gekocht)' },
      { amount: '1 EL', name: 'Reisessig' },
      { amount: 'Optional', name: 'Nori-Blaetter' },
      { amount: 'Optional', name: 'Sesam' }
    ],
    steps: [
      { text: 'Reis kochen und leicht abkuehlen lassen.' },
      { text: 'Haende befeuchten und kleine Baellchen oder Dreiecke formen.', tip: 'Wie Knetmasse — Kinder lieben es!' },
      { text: 'Optional mit Nori-Streifen umwickeln und mit Sesam bestreuen.' }
    ],
    tukiTip: 'Reis formen ist wie Sandburgen bauen — nur essbar! Perfekt im Tuki auf Arbeitshoehe.',
    stars: 1
  },
  {
    id: 'nudelsalat-bunt',
    title: 'Bunter Nudelsalat',
    subtitle: 'Kalt, bunt & der Renner bei jedem Fest',
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop',
    duration: 20,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'Sommer',
    servings: '4 Portionen',
    tags: ['Mittagessen', 'Sommer', 'Schnell'],
    ingredients: [
      { amount: '250g', name: 'Bunte Nudeln (Fusilli)' },
      { amount: '1', name: 'Paprika (rot)' },
      { amount: '100g', name: 'Mais' },
      { amount: '100g', name: 'Erbsen' },
      { amount: '3 EL', name: 'Olivenoel' },
      { amount: '1 EL', name: 'Zitronensaft' }
    ],
    steps: [
      { text: 'Nudeln nach Packungsanweisung kochen und abkuehlen lassen.' },
      { text: 'Gemuese waschen und klein schneiden.' },
      { text: 'Alles mischen und mit Olivenoel und Zitronensaft anmachen.', tip: 'Dein Kind kann alles zusammenkippen und mischen!' }
    ],
    tukiTip: 'Nudelsalat zusammenruehren koennen schon die Kleinsten — im Tuki stehend perfekt!',
    stars: 1
  },
  {
    id: 'fruechte-eis',
    title: 'Fruechte-Eis am Stiel',
    subtitle: '3 Zutaten, null Zucker, mega Spass',
    emoji: '🍦',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'Sommer',
    servings: '6 Stueck',
    tags: ['Snack', 'Sommer', 'Zuckerfrei'],
    ingredients: [
      { amount: '300g', name: 'Joghurt' },
      { amount: '200g', name: 'Beeren (gemischt)' },
      { amount: '1', name: 'Banane' }
    ],
    steps: [
      { text: 'Alles zusammen puerieren.' },
      { text: 'In Eisformen fuellen.', tip: 'Dein Kind giesst den Mix in die Foermchen!' },
      { text: 'Mindestens 4 Stunden einfrieren.' }
    ],
    tukiTip: 'Eis selber machen: Kinder sind stolz, wenn sie ihr eigenes Glace essen!',
    stars: 1
  },
  {
    id: 'broetchen-igel',
    title: 'Broetchen-Igel',
    subtitle: 'Lustige Broetchen mit Stacheloptik',
    emoji: '🦔',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    duration: 45,
    difficulty: 'mittel',
    ageRange: '3-8',
    season: 'Herbst',
    servings: '8 Stueck',
    tags: ['Backen', 'Herbst', 'Kreativ'],
    ingredients: [
      { amount: '300g', name: 'Mehl' },
      { amount: '1/2 Wuerfel', name: 'Hefe' },
      { amount: '150ml', name: 'Warme Milch' },
      { amount: '30g', name: 'Butter' },
      { amount: '1 Prise', name: 'Salz' },
      { amount: '16', name: 'Rosinen (fuer die Augen)' }
    ],
    steps: [
      { text: 'Hefe in warmer Milch aufloesen.' },
      { text: 'Alle Zutaten zu einem Teig kneten und 30 Min. gehen lassen.' },
      { text: 'Kleine Igelformen formen — vorne spitz, hinten rund.' },
      { text: 'Mit der Schere kleine Einschnitte fuer die Stacheln machen.', tip: 'Kinder koennen mit einer Kinderschere helfen!' },
      { text: 'Rosinen als Augen einsetzen und bei 180°C 15 Min. backen.' }
    ],
    tukiTip: 'Teigformen ist wie Basteln — im Tuki auf der richtigen Hoehe ein Riesenspass!',
    stars: 2
  },
  {
    id: 'muesli-riegel',
    title: 'Muesli-Riegel',
    subtitle: 'Der gesunde Znueni fuer unterwegs',
    emoji: '🥜',
    image: 'https://images.unsplash.com/photo-1490567674709-c4a386e37be7?w=400&h=300&fit=crop',
    duration: 30,
    difficulty: 'leicht',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '12 Riegel',
    tags: ['Snack', 'Gesund', 'Zuckerfrei'],
    ingredients: [
      { amount: '200g', name: 'Haferflocken' },
      { amount: '100g', name: 'Trocken-Fruechte' },
      { amount: '3 EL', name: 'Honig (ab 1 Jahr)' },
      { amount: '2 EL', name: 'Kokosoel' },
      { amount: '50g', name: 'Nuesse (optional, ab 3 J.)' }
    ],
    steps: [
      { text: 'Ofen auf 160°C vorheizen.' },
      { text: 'Alle Zutaten in einer Schuessel mischen.', tip: 'Kinder lieben es, alles zusammenzukippen!' },
      { text: 'Auf ein Blech druecken und 20 Min. backen.' },
      { text: 'Noch warm in Riegel schneiden und abkuehlen lassen.' }
    ],
    tukiTip: 'Selbstgemachte Riegel fuer den Spielplatz — im Tuki zusammengemischt!',
    stars: 1
  },
  {
    id: 'zopf-sonntagszopf',
    title: 'Sonntagszopf',
    subtitle: 'Schweizer Klassiker fuer die ganze Familie',
    emoji: '🫳',
    image: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=400&h=300&fit=crop',
    duration: 120,
    difficulty: 'anspruchsvoll',
    ageRange: '3-8',
    season: 'ganzjaehrig',
    servings: '1 Zopf',
    tags: ['Backen', 'Schweizer Klassiker'],
    ingredients: [
      { amount: '500g', name: 'Mehl' },
      { amount: '1 Wuerfel', name: 'Hefe' },
      { amount: '250ml', name: 'Milch' },
      { amount: '80g', name: 'Butter' },
      { amount: '1 TL', name: 'Salz' },
      { amount: '1', name: 'Eigelb zum Bestreichen' }
    ],
    steps: [
      { text: 'Hefe in lauwarmer Milch aufloesen.' },
      { text: 'Mehl, Salz, Butter und Hefemilch zu einem geschmeidigen Teig kneten.' },
      { text: '1.5 Stunden gehen lassen bis doppelt so gross.' },
      { text: 'Teig in 2 Straenge teilen und flechten.', tip: 'Zeig deinem Kind, wie man flechtet — wie bei Haaren!' },
      { text: 'Mit Eigelb bestreichen und bei 200°C 30 Min. backen.' }
    ],
    tukiTip: 'Zopf flechten ist eine Schweizer Tradition — im Tuki kann dein Kind den Teig mitkneten und formen!',
    stars: 3
  },
  {
    id: 'gurken-krokodil',
    title: 'Gurken-Krokodil',
    subtitle: 'Gemuese-Platte als Tierfigur',
    emoji: '🐊',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&h=300&fit=crop',
    duration: 15,
    difficulty: 'leicht',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '4 Portionen',
    tags: ['Snack', 'Kreativ', 'Gesund'],
    ingredients: [
      { amount: '1', name: 'Grosse Gurke' },
      { amount: '2', name: 'Kirschtomaten (Augen)' },
      { amount: 'Diverse', name: 'Gemuese-Sticks (Karotte, Paprika)' },
      { amount: '2', name: 'Zahnstocher' }
    ],
    steps: [
      { text: 'Gurke laengs halbieren — eine Haelfte wird der Koerper.' },
      { text: 'Vorne ein Maul einschneiden.' },
      { text: 'Kirschtomaten mit Zahnstochern als Augen befestigen.' },
      { text: 'Gemuese-Sticks als Stacheln in den Ruecken stecken.', tip: 'Kinder koennen die Sticks reinpieksen!' }
    ],
    tukiTip: 'Food Art macht Gemuese spannend — im Tuki auf Augenhoehe mit dem Krokodil!',
    stars: 1
  },
  {
    id: 'overnight-oats',
    title: 'Overnight Oats',
    subtitle: 'Abends vorbereiten, morgens geniessen',
    emoji: '🌙',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
    duration: 5,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'ganzjaehrig',
    servings: '2 Portionen',
    tags: ['Fruehstueck', 'Schnell', 'Gesund'],
    ingredients: [
      { amount: '100g', name: 'Haferflocken' },
      { amount: '200ml', name: 'Milch oder Haferdrink' },
      { amount: '100g', name: 'Joghurt' },
      { amount: '1 EL', name: 'Chiasamen' },
      { amount: 'Nach Wahl', name: 'Obst & Nuesse' }
    ],
    steps: [
      { text: 'Haferflocken, Milch, Joghurt und Chia mischen.' },
      { text: 'In Glaeser fuellen und ueber Nacht kuehlen.', tip: 'Dein Kind fuellt sein eigenes Glas!' },
      { text: 'Morgens mit frischem Obst toppen.' }
    ],
    tukiTip: 'Abends zusammen vorbereiten, morgens staunen — ein schoenes Ritual!',
    stars: 1
  },
  {
    id: 'spaghetti-nester',
    title: 'Spaghetti-Nester',
    subtitle: 'Mini-Nester aus dem Ofen',
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
    duration: 35,
    difficulty: 'mittel',
    ageRange: '2-8',
    season: 'ganzjaehrig',
    servings: '6 Nester',
    tags: ['Mittagessen', 'Kreativ'],
    ingredients: [
      { amount: '200g', name: 'Spaghetti' },
      { amount: '2', name: 'Eier' },
      { amount: '100g', name: 'Kaese, gerieben' },
      { amount: '100ml', name: 'Tomatensauce' },
      { amount: '1 Prise', name: 'Salz & Pfeffer' }
    ],
    steps: [
      { text: 'Spaghetti kochen und abkuehlen lassen.' },
      { text: 'Mit Eiern und Kaese mischen.' },
      { text: 'In Muffin-Foermchen druecken und Nester formen.', tip: 'Kinder koennen die Nudeln drehen und druecken!' },
      { text: 'Tomatensauce in die Mitte geben und bei 180°C 15 Min. backen.' }
    ],
    tukiTip: 'Nudeln in Foermchen druecken — eine lustige Alternative zu normalen Spaghetti!',
    stars: 2
  },
  {
    id: 'wassermelonen-pizza',
    title: 'Wassermelonen-Pizza',
    subtitle: 'Fruchtiger Sommer-Snack',
    emoji: '🍉',
    image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=300&fit=crop',
    duration: 10,
    difficulty: 'leicht',
    ageRange: '1-8',
    season: 'Sommer',
    servings: '4 Stueck',
    tags: ['Snack', 'Sommer', 'Gesund'],
    ingredients: [
      { amount: '1 grosse Scheibe', name: 'Wassermelone (rund)' },
      { amount: '2 EL', name: 'Joghurt' },
      { amount: 'Handvoll', name: 'Beeren' },
      { amount: '1 EL', name: 'Kokosraspel' },
      { amount: 'Optional', name: 'Minze' }
    ],
    steps: [
      { text: 'Wassermelone in runde Scheibe schneiden und in Stuecke teilen.' },
      { text: 'Joghurt als Sauce darauf verteilen.' },
      { text: 'Mit Beeren und Kokos belegen.', tip: 'Pizza belegen — nur mit Fruechten! Kinder lieben es.' }
    ],
    tukiTip: 'Fruechte-Pizza sieht aus wie echte Pizza — aber ist ein gesunder Sommer-Snack!',
    stars: 1
  }
]
