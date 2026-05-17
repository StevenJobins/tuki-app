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
    title: 'Pancakes Ã  la banane',
    subtitle: 'Moelleux, sucrÃ©s et seulement 3 ingrÃ©dients',
    tags: ['Petit-dÃ©jeuner', 'Rapide', 'Sain'],
    ingredients: [
      { amount: '2', item: 'Bananes mÃ»res' },
      { amount: '2', item: 'Åufs' },
      { amount: '4 c. Ã  s.', item: 'Flocons d\'avoine (optionnel)' },
      { amount: '1 pincÃ©e', item: 'Cannelle' },
      { amount: 'Un peu', item: 'Huile de coco pour la cuisson' },
    ],
    steps: [
      { text: 'Mettre les bananes dans un bol et les Ã©craser Ã  la fourchette.', tip: 'Ton enfant peut trÃ¨s bien le faire â plus la banane est mÃ»re, plus c\'est facile !' },
      { text: 'Ajouter les Åufs et bien mÃ©langer.' },
      { text: 'Optionnel : incorporer les flocons d\'avoine et la cannelle.' },
      { text: 'Chauffer un peu d\'huile de coco dans une poÃªle et faire cuire de petits pancakes (2 min de chaque cÃ´tÃ©).' },
      { text: 'Servir avec des baies fraÃ®ches ou une cuillÃ¨re de yaourt.' },
    ],
    tukiTip: 'Parfait pour les petites mains : ton enfant se tient dans le Tuki et Ã©crase les bananes tout seul. Ãa entraÃ®ne la motricitÃ© fine !',
  },
  'gemÃ¼se-muffins': {
    title: 'Muffins aux lÃ©gumes colorÃ©s',
    subtitle: 'Des lÃ©gumes cachÃ©s que les enfants adorent',
    tags: ['GoÃ»ter', 'LÃ©gumes', 'Meal Prep'],
    ingredients: [
      { amount: '200 g', item: 'Farine' },
      { amount: '1 c. Ã  c.', item: 'Levure chimique' },
      { amount: '2', item: 'Åufs' },
      { amount: '100 ml', item: 'Lait' },
      { amount: '80 ml', item: 'Huile d\'olive' },
      { amount: '1', item: 'Courgette (rÃ¢pÃ©e)' },
      { amount: '1', item: 'Carotte (rÃ¢pÃ©e)' },
      { amount: '50 g', item: 'Fromage (rÃ¢pÃ©)' },
      { amount: '1 pincÃ©e', item: 'Sel et poivre' },
    ],
    steps: [
      { text: 'PrÃ©chauffer le four Ã  180 Â°C. PrÃ©parer le moule Ã  muffins.' },
      { text: 'Laver et rÃ¢per les lÃ©gumes.', tip: 'Ã partir de 3 ans, ton enfant peut aider avec une rÃ¢pe pour enfants !' },
      { text: 'MÃ©langer les ingrÃ©dients secs dans un bol.' },
      { text: 'Battre les Åufs, le lait et l\'huile et les ajouter.' },
      { text: 'Incorporer les lÃ©gumes rÃ¢pÃ©s et le fromage.' },
      { text: 'Remplir le moule Ã  muffins et cuire 25 min.' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant peut merveilleusement remuer et verser la pÃ¢te dans les moules. Comptez ensemble : un, deux, trois muffins !',
  },
  'energy-balls': {
    title: 'Energy Balls aux dattes',
    subtitle: 'GoÃ»ter sain sans sucre ajoutÃ©',
    tags: ['GoÃ»ter', 'Sans sucre', 'Pas de cuisine nÃ©cessaire'],
    ingredients: [
      { amount: '150 g', item: 'Dattes Medjool (dÃ¨noyautÃ©es)' },
      { amount: '100 g', item: 'Flocons d\'avoine' },
      { amount: '2 c. Ã  s.', item: 'Noix de coco rÃ¢pÃ©e' },
      { amount: '2 c. Ã  s.', item: 'Cacao en poudre' },
      { amount: '1 c. Ã  s.', item: 'Beurre de cacahuÃ¨te' },
    ],
    steps: [
      { text: 'Mettre tous les ingrÃ©dients dans un bol.' },
      { text: 'Bien pÃ©trir avec les mains jusqu\'Ã  obtenir une masse collante.', tip: 'C\'est le moment fort pour les enfants â on a le droit de se salir !' },
      { text: 'Former de petites boules (environ 15 piÃ¨ces).' },
      { text: 'Rouler dans la noix de coco rÃ¢pÃ©e.' },
      { text: 'Mettre 30 min au rÃ©frigÃ©rateur â c\'est prÃªt !' },
    ],
    tukiTip: 'Former des boules est un entraÃ®nement parfait de motricitÃ© fine. Ton enfant se tient dans le Tuki Ã  hauteur de travail et peut vraiment aider.',
  },
  'pizza-gesichter': {
    title: 'Visages de pizza',
    subtitle: 'Mini-pizzas crÃ©atives Ã  garnir soi-mÃªme',
    tags: ['DÃ©jeuner', 'CrÃ©atif', 'Favori de la famille'],
    ingredients: [
      { amount: '1', item: 'PÃ¢te Ã  pizza prÃªte (ou faite maison)' },
      { amount: '200 ml', item: 'Sauce tomate' },
      { amount: '200 g', item: 'Mozzarella' },
      { amount: 'Divers', item: 'LÃ©gumes pour garnir : olives, poivrons, maÃ¯s, tomates cerises' },
    ],
    steps: [
      { text: 'PrÃ©chauffer le four Ã  220 Â°C.' },
      { text: 'Former la pÃ¢te en 4 galettes rondes.', tip: 'Les enfants adorent presser et former la pÃ¢te !' },
      { text: 'Ãtaler la sauce tomate.' },
      { text: 'Maintenant, place Ã  la crÃ©ativitÃ© : faire des visages amusants avec les lÃ©gumes !', tip: 'Des yeux en olives, une bouche en poivron, un nez en maÃ¯s â pas de limites Ã  l\'imagination.' },
      { text: 'Cuire 12-15 minutes jusqu\'Ã  ce que le fromage soit dorÃ©.' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant atteint parfaitement le plan de travail et peut crÃ©er son propre visage de pizza. Ãa favorise la crÃ©ativitÃ© et l\'autonomie !',
  },
  'obstspiesse': {
    title: 'Brochettes de fruits arc-en-ciel',
    subtitle: 'Apprendre les couleurs et grignoter sainement',
    tags: ['GoÃ»ter', 'Sain', 'Apprendre les couleurs'],
    ingredients: [
      { amount: '1 poignÃ©e', item: 'Fraises (rouge)' },
      { amount: '1', item: 'Mandarine (orange)' },
      { amount: '1', item: 'Banane (jaune)' },
      { amount: '1 poignÃ©e', item: 'Tranches de kiwi (vert)' },
      { amount: '1 poignÃ©e', item: 'Myrtilles (bleu)' },
      { amount: '4', item: 'Pics en bois (sans pointe !)' },
    ],
    steps: [
      { text: 'Laver les fruits et les couper en morceaux adaptÃ©s.' },
      { text: 'Trier les couleurs et les nommer : rouge, orange, jaune, vert, bleu.', tip: 'Profitez-en pour apprendre les couleurs ensemble !' },
      { text: 'Enfiler les fruits sur les pics dans l\'ordre arc-en-ciel.' },
      { text: 'DÃ©guster immÃ©diatement !' },
    ],
    tukiTip: 'Ton enfant se tient dans le Tuki et trie les couleurs lui-mÃªme sur la brochette. Ãa entraÃ®ne la motricitÃ© fine, la reconnaissance des couleurs et c\'est super amusant !',
  },
  'weihnachtsguetzli': {
    title: 'Biscuits de NoÃ«l',
    subtitle: 'SablÃ©s au beurre classiques suisses',
    tags: ['NoÃ«l', 'PÃ¢tisserie', 'Tradition'],
    ingredients: [
      { amount: '300 g', item: 'Farine' },
      { amount: '200 g', item: 'Beurre (froid, en dÃ©s)' },
      { amount: '100 g', item: 'Sucre glace' },
      { amount: '1', item: 'Åuf' },
      { amount: '1 pincÃ©e', item: 'Sel' },
      { amount: '1 c. Ã  c.', item: 'Extrait de vanille' },
      { amount: 'Selon envie', item: 'GlaÃ§age, paillettes, glaÃ§age au chocolat' },
    ],
    steps: [
      { text: 'MÃ©langer la farine, le sucre et le sel. Ajouter le beurre froid et travailler en sable.' },
      { text: 'Ajouter l\'Åuf et la vanille, pÃ©trir en une pÃ¢te lisse.' },
      { text: 'Emballer la pÃ¢te dans du film et rÃ©frigÃ©rer 30 min.' },
      { text: 'Ãtaler la pÃ¢te et dÃ©couper avec des emporte-piÃ¨ces.', tip: 'Le moment prÃ©fÃ©rÃ© de tous les enfants ! Ãtoiles, cÅurs, sapins...' },
      { text: 'Cuire Ã  180 Â°C environ 10-12 min (pas trop dorÃ© !).' },
      { text: 'Laisser refroidir et dÃ©corer Ã  volontÃ©.' },
    ],
    tukiTip: 'Faire des biscuits dans le Tuki, c\'est une tradition familiale suisse ! Ton enfant Ã©tale, dÃ©coupe et dÃ©core â tout Ã  la hauteur parfaite.',
  },
  'smoothie-bowl': {
    title: 'Bowl de smoothie aux baies',
    subtitle: 'ColorÃ©, sain et dÃ©corÃ© avec crÃ©ativitÃ©',
    tags: ['Petit-dÃ©jeuner', 'Sain', 'Rapide'],
    ingredients: [
      { amount: '200 g', item: 'Baies surgelÃ©es' },
      { amount: '1', item: 'Banane' },
      { amount: '100 ml', item: 'Yaourt' },
      { amount: 'Pour le topping', item: 'Granola, flocons de coco, baies fraÃ®ches' },
    ],
    steps: [
      { text: 'Mixer les baies surgelÃ©es, la banane et le yaourt au blender.' },
      { text: 'Verser dans deux bols.' },
      { text: 'Maintenant, place Ã  la dÃ©coration ! Granola, flocons de coco et baies fraÃ®ches par-dessus.', tip: 'Ton enfant choisit les toppings et les place â comme une petite Åuvre d\'art !' },
    ],
    tukiTip: 'Dans le Tuki, ton enfant a la vue parfaite sur son bowl et peut dÃ©corer avec crÃ©ativitÃ©. Chaque bowl est unique !',
  },
  'osterhasen-brot': {
    title: 'Pain lapin de PÃ¢ques',
    subtitle: 'Brioche sucrÃ©e en forme de lapin',
    tags: ['PÃ¢ques', 'PÃ¢tisserie', 'Saisonnier'],
    ingredients: [
      { amount: '500 g', item: 'Farine' },
      { amount: '80 g', item: 'Sucre' },
      { amount: '1 cube', item: 'Levure fraÃ®che' },
      { amount: '200 ml', item: 'Lait tiÃ¨de' },
      { amount: '80 g', item: 'Beurre (mou)' },
      { amount: '1', item: 'Åuf + 1 jaune pour dorer' },
      { amount: '1 pincÃ©e', item: 'Sel' },
      { amount: '4', item: 'Raisins secs pour les yeux' },
    ],
    steps: [
      { text: 'Dissoudre la levure dans le lait tiÃ¨de et laisser reposer 10 min.' },
      { text: 'MÃ©langer la farine, le sucre, le sel, l\'Åuf et le beurre. Ajouter le lait levurÃ© et pÃ©trir 10 min.' },
      { text: 'Laisser lever la pÃ¢te 1 heure sous un linge.' },
      { text: 'Diviser la pÃ¢te en 4 parts. Former des lapins : corps ovale, deux longues oreilles.', tip: 'Les enfants adorent le modelage â montre-leur comment rouler les oreilles !' },
      { text: 'Enfoncer les raisins secs pour les yeux. Badigeonner de jaune d\'Åuf.' },
      { text: 'Cuire Ã  180 Â°C pendant 20-25 min jusqu\'Ã  dorÃ©.' },
    ],
    tukiTip: 'PÃ©trir la pÃ¢te, former les lapins, placer les yeux â dans le Tuki, ton enfant participe Ã  hauteur des yeux. Une expÃ©rience de PÃ¢ques inoubliable !',
  },
}
