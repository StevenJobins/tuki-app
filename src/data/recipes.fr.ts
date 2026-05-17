// French translations for recipes
// Keyed by recipe ID, containing all translatable text fields

export const recipesFr: Record<string, {
  title: string
  subtitle: string
  tags: string[]
  ingredients: { amount: string; item: string }[]
  steps: { text: string; tip?: string }[]
  tukiTip: string
}> = {
  'banana-pancakes': {
    title: 'Pancakes à la banane',
    subtitle: 'Moelleux, sucrés et seulement 3 ingrédients',
    tags: ['Petit-déjeuner', 'Rapide', 'Sain'],
    ingredients: [
      { amount: '2', item: 'Bananes mûres' },
      { amount: '2', item: 'Œufs' },
      { amount: '4 c. à s.', item: 'Flocons d\'avoine (optionnel)' },
      { amount: '1 pincée', item: 'Cannelle' },
      { amount: 'Un peu', item: 'Huile de coco pour la cuisson' },
    ],
    steps: [
      { text: 'Mettre les bananes dans un bol et les écraser à la fourchette.', tip: 'Ton enfant peut très bien le faire — plus la banane est mûre, plus c\'est facile !' },
      { text: 'Ajouter les œufs et bien mélanger.' },
      { text: 'Optionnel : incorporer les flocons d\'avoine et la cannelle.' },
      { text: 'Chauffer un peu d\'huile de coco dans une poêle et faire cuire de petits pancakes (2 min de chaque côté).' },
      { text: 'Servir avec des baies fraîches ou une cuillère de yaourt.' },
    ],
    tukiTip: 'Parfait pour les petites mains : ton enfant se tient dans le Tuki et écrase les bananes tout seul. Ça entraîne la motricité fine !',
  },
  'gemüse-muffins': {
    title: 'Muffins aux légumes colorés',
    subtitle: 'Des légumes cachés que les enfants adorent',
    tags: ['Goûter', 'Légumes', 'Meal Prep'],
    ingredients: [
      { amount: '200 g', item: 'Farine' },
      { amount: '1 c. à c.', item: 'Levure chimique' },
      { amount: '2', item: 'Œufs' },
      { amount: '100 ml', item: 'Lait' },
      { amount: '80 ml', item: 'Huile d\'olive' },
      { amount: '1', item: 'Courgette (râpée)' },
      { amount: '1', item: 'Carotte (râpée)' },
      { amount: '50 g', item: 'Fromage (râpé)' },
      { amount: '1 pincée', item: 'Sel et poivre' },
    ],
    steps: [
      { text: 'Préchauffer le four à 180 °C. Préparer le moule à muffins.' },
      { text: 'Laver et râper les légumes.', tip: 'À partir de 3 ans, ton enfant peut aider avec une râpe pour enfants !' },
      { text: 'Mélanger les ingrédients secs dans un bol.' },
      { text: 'Battre les œufs, le lait et l\'huile et les ajouter.' },
      { text: 'Incorporer les légumes râpés et le fromage.' },
      { text: 'Remplir le moule à muffins et cuire 25 min.' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant peut merveilleusement remuer et verser la pâte dans les moules. Comptez ensemble : un, deux, trois muffins !',
  },
  'energy-balls': {
    title: 'Energy Balls aux dattes',
    subtitle: 'Goûter sain sans sucre ajouté',
    tags: ['Goûter', 'Sans sucre', 'Pas de cuisine nécessaire'],
    ingredients: [
      { amount: '150 g', item: 'Dattes Medjool (dénoyautées)' },
      { amount: '100 g', item: 'Flocons d\'avoine' },
      { amount: '2 c. à s.', item: 'Noix de coco râpée' },
      { amount: '2 c. à s.', item: 'Cacao en poudre' },
      { amount: '1 c. à s.', item: 'Beurre de cacahuète' },
    ],
    steps: [
      { text: 'Mettre tous les ingrédients dans un bol.' },
      { text: 'Bien pétrir avec les mains jusqu\'à obtenir une masse collante.', tip: 'C\'est le moment fort pour les enfants — on a le droit de se salir !' },
      { text: 'Former de petites boules (environ 15 pièces).' },
      { text: 'Rouler dans la noix de coco râpée.' },
      { text: 'Mettre 30 min au réfrigérateur — c\'est prêt !' },
    ],
    tukiTip: 'Former des boules est un entraînement parfait de motricité fine. Ton enfant se tient dans le Tuki à hauteur de travail et peut vraiment aider.',
  },
  'pizza-gesichter': {
    title: 'Visages de pizza',
    subtitle: 'Mini-pizzas créatives à garnir soi-même',
    tags: ['Déjeuner', 'Créatif', 'Favori de la famille'],
    ingredients: [
      { amount: '1', item: 'Pâte à pizza prête (ou faite maison)' },
      { amount: '200 ml', item: 'Sauce tomate' },
      { amount: '200 g', item: 'Mozzarella' },
      { amount: 'Divers', item: 'Légumes pour garnir : olives, poivrons, maïs, tomates cerises' },
    ],
    steps: [
      { text: 'Préchauffer le four à 220 °C.' },
      { text: 'Former la pâte en 4 galettes rondes.', tip: 'Les enfants adorent presser et former la pâte !' },
      { text: 'Étaler la sauce tomate.' },
      { text: 'Maintenant, place à la créativité : faire des visages amusants avec les légumes !', tip: 'Des yeux en olives, une bouche en poivron, un nez en maïs — pas de limites à l\'imagination.' },
      { text: 'Cuire 12-15 minutes jusqu\'à ce que le fromage soit doré.' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant atteint parfaitement le plan de travail et peut créer son propre visage de pizza. Ça favorise la créativité et l\'autonomie !',
  },
  'obstspiesse': {
    title: 'Brochettes de fruits arc-en-ciel',
    subtitle: 'Apprendre les couleurs et grignoter sainement',
    tags: ['Goûter', 'Sain', 'Apprendre les couleurs'],
    ingredients: [
      { amount: '1 poignée', item: 'Fraises (rouge)' },
      { amount: '1', item: 'Mandarine (orange)' },
      { amount: '1', item: 'Banane (jaune)' },
      { amount: '1 poignée', item: 'Tranches de kiwi (vert)' },
      { amount: '1 poignée', item: 'Myrtilles (bleu)' },
      { amount: '4', item: 'Pics en bois (sans pointe !)' },
    ],
    steps: [
      { text: 'Laver les fruits et les couper en morceaux adaptés.' },
      { text: 'Trier les couleurs et les nommer : rouge, orange, jaune, vert, bleu.', tip: 'Profitez-en pour apprendre les couleurs ensemble !' },
      { text: 'Enfiler les fruits sur les pics dans l\'ordre arc-en-ciel.' },
      { text: 'Déguster immédiatement !' },
    ],
    tukiTip: 'Ton enfant se tient dans le Tuki et trie les couleurs lui-même sur la brochette. Ça entraîne la motricité fine, la reconnaissance des couleurs et c\'est super amusant !',
  },
  'weihnachtsguetzli': {
    title: 'Biscuits de Noël',
    subtitle: 'Sablés au beurre classiques suisses',
    tags: ['Noël', 'Pâtisserie', 'Tradition'],
    ingredients: [
      { amount: '300 g', item: 'Farine' },
      { amount: '200 g', item: 'Beurre (froid, en dés)' },
      { amount: '100 g', item: 'Sucre glace' },
      { amount: '1', item: 'Œuf' },
      { amount: '1 pincée', item: 'Sel' },
      { amount: '1 c. à c.', item: 'Extrait de vanille' },
      { amount: 'Selon envie', item: 'Glaçage, paillettes, glaçage au chocolat' },
    ],
    steps: [
      { text: 'Mélanger la farine, le sucre et le sel. Ajouter le beurre froid et travailler en sable.' },
      { text: 'Ajouter l\'œuf et la vanille, pétrir en une pâte lisse.' },
      { text: 'Emballer la pâte dans du film et réfrigérer 30 min.' },
      { text: 'Étaler la pâte et découper avec des emporte-pièces.', tip: 'Le moment préféré de tous les enfants ! Étoiles, cœurs, sapins...' },
      { text: 'Cuire à 180 °C environ 10-12 min (pas trop doré !).' },
      { text: 'Laisser refroidir et décorer à volonté.' },
    ],
    tukiTip: 'Faire des biscuits dans le Tuki, c\'est une tradition familiale suisse ! Ton enfant étale, découpe et décore — tout à la hauteur parfaite.',
  },
  'smoothie-bowl': {
    title: 'Bowl de smoothie aux baies',
    subtitle: 'Coloré, sain et décoré avec créativité',
    tags: ['Petit-déjeuner', 'Sain', 'Rapide'],
    ingredients: [
      { amount: '200 g', item: 'Baies surgelées' },
      { amount: '1', item: 'Banane' },
      { amount: '100 ml', item: 'Yaourt' },
      { amount: 'Pour le topping', item: 'Granola, flocons de coco, baies fraîches' },
    ],
    steps: [
      { text: 'Mixer les baies surgelées, la banane et le yaourt au blender.' },
      { text: 'Verser dans deux bols.' },
      { text: 'Maintenant, place à la décoration ! Granola, flocons de coco et baies fraîches par-dessus.', tip: 'Ton enfant choisit les toppings et les place — comme une petite œuvre d\'art !' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant a la vue parfaite sur son bowl et peut décorer avec créativité. Chaque bowl est unique !',
  },
  'osterhasen-brot': {
    title: 'Pain lapin de Pâques',
    subtitle: 'Brioche sucrée en forme de lapin',
    tags: ['Pâques', 'Pâtisserie', 'Saisonnier'],
    ingredients: [
      { amount: '500 g', item: 'Farine' },
      { amount: '80 g', item: 'Sucre' },
      { amount: '1 cube', item: 'Levure fraîche' },
      { amount: '200 ml', item: 'Lait tiède' },
      { amount: '80 g', item: 'Beurre (mou)' },
      { amount: '1', item: 'Œuf + 1 jaune pour dorer' },
      { amount: '1 pincée', item: 'Sel' },
      { amount: '4', item: 'Raisins secs pour les yeux' },
    ],
    steps: [
      { text: 'Dissoudre la levure dans le lait tiède et laisser reposer 10 min.' },
      { text: 'Mélanger la farine, le sucre, le sel, l\'œuf et le beurre. Ajouter le lait levuré et pétrir 10 min.' },
      { text: 'Laisser lever la pâte 1 heure sous un linge.' },
      { text: 'Diviser la pâte en 4 parts. Former des lapins : corps ovale, deux longues oreilles.', tip: 'Les enfants adorent le modelage — montre-leur comment rouler les oreilles !' },
      { text: 'Enfoncer les raisins secs pour les yeux. Badigeonner de jaune d\'œuf.' },
      { text: 'Cuire à 180 °C pendant 20-25 min jusqu\'à doré.' },
    ],
    tukiTip: 'Pétrir la pâte, former les lapins, placer les yeux — dans le Tuki, ton enfant participe à hauteur des yeux. Une expérience de Pâques inoubliable !',
  },
}
