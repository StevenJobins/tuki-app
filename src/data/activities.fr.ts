// French translations for activities
// Keyed by activity ID, containing all translatable text fields

export const activitiesFr: Record<string, {
  title: string
  subtitle: string
  materials: string[]
  steps: { text: string; tip?: string }[]
  learningGoals: string[]
  tukiTip: string
}> = {
  'wasser-giessen': {
    title: 'Verser et mesurer l\'eau',
    subtitle: 'Comprendre les quantitÃ©s en jouant',
    materials: ['DiffÃ©rents gobelets et rÃ©cipients', 'Eau', 'Serviette pour les Ã©claboussures', 'Optionnel : colorant alimentaire'],
    steps: [
      { text: 'Place diffÃ©rents gobelets et bols sur le plan de travail.' },
      { text: 'Remplis un pichet d\'eau (optionnel : avec du colorant alimentaire).', tip: 'La couleur rend le jeu plus amusant et aide Ã  observer !' },
      { text: 'Ton enfant verse l\'eau d\'un rÃ©cipient Ã  l\'autre.' },
      { text: 'Parlez ensemble : lequel est plein ? Lequel est vide ? Lequel en a plus ?' },
    ],
    learningGoals: ['MotricitÃ© fine et coordination', 'ComprÃ©hension des quantitÃ©s (plein/vide/plus/moins)', 'Concentration et patience', 'ExpÃ©rience sensorielle'],
    tukiTip: 'Dans le Tuki, ton enfant se tient parfaitement devant l\'Ã©vier ou le plan de travail. Mets une serviette en dessous â un peu de barbouillage fait partie du jeu !',
  },
  'krÃ¤uter-garten': {
    title: 'Jardin d\'herbes au fenÃªtre',
    subtitle: 'Semer, arroser, regarder pousser',
    materials: ['Petits pots ou boÃ®te Ã  Åufs', 'Terre', 'Graines d\'herbes (cresson, basilic, ciboulette)', 'Eau et petit arrosoir', 'CuillÃ¨re'],
    steps: [
      { text: 'Remplir les pots de terre â cuillÃ¨re par cuillÃ¨re.', tip: 'Les enfants adorent pelleter. Mets du papier journal en dessous !' },
      { text: 'RÃ©pandre les graines sur la terre et presser lÃ©gÃ¨rement.' },
      { text: 'Arroser doucement â pas trop !' },
      { text: 'Placer sur le rebord de la fenÃªtre et regarder ensemble chaque jour ce qui se passe.' },
      { text: 'Quand les herbes ont poussÃ© : les rÃ©colter ensemble et les utiliser dans une recette !' },
    ],
    learningGoals: ['ComprÃ©hension de la nature et patience', 'Prendre des responsabilitÃ©s', 'Observer et documenter', 'Comprendre les liens (eau â croissance)'],
    tukiTip: 'Debout dans le Tuki devant la fenÃªtre de la cuisine, ton enfant peut entretenir son potager d\'herbes chaque jour. Faites un journal de croissance ensemble !',
  },
  'sortier-spiel': {
    title: 'Le grand jeu de tri',
    subtitle: 'Trier couleurs, formes et tailles',
    materials: ['Bols de diffÃ©rentes couleurs', 'Objets du quotidien Ã  trier : fruits, jouets, pinces Ã  linge', 'Moule Ã  muffins (optionnel)'],
    steps: [
      { text: 'Place diffÃ©rents bols sur le plan de travail.' },
      { text: 'PrÃ©pare les objets : fruits colorÃ©s, pinces Ã  linge, cubes...' },
      { text: 'Donne une consigne de tri : tout ce qui est rouge ici, tout ce qui est vert lÃ  !', tip: 'Commence avec 2 couleurs, augmente progressivement Ã  3-4.' },
      { text: 'Variante : trier par taille (grand/petit) ou par forme (rond/carrÃ©).' },
    ],
    learningGoals: ['Reconnaissance des couleurs', 'CatÃ©gorisation et raisonnement logique', 'MotricitÃ© fine', 'DÃ©veloppement du langage (noms des couleurs, adjectifs)'],
    tukiTip: 'Le plan de travail de la cuisine devient une table d\'apprentissage ! Dans le Tuki, ton enfant a assez de place et la bonne hauteur pour trier.',
  },
  'knete-selber-machen': {
    title: 'Fabriquer sa pÃ¢te Ã  modeler',
    subtitle: 'MÃ©langer, pÃ©trir, Ãªtre crÃ©atif',
    materials: ['200 g de farine', '100 g de sel', '2 c. Ã  s. d\'huile', '200 ml d\'eau', 'Colorant alimentaire', 'Bol et cuillÃ¨re'],
    steps: [
      { text: 'MÃ©langer la farine et le sel dans un grand bol.' },
      { text: 'Ajouter l\'huile et l\'eau.', tip: 'Ton enfant peut mesurer l\'eau â avec un verre doseur !' },
      { text: 'Bien pÃ©trir jusqu\'Ã  obtenir une pÃ¢te lisse.' },
      { text: 'Diviser la pÃ¢te et colorer avec du colorant alimentaire.' },
      { text: 'Maintenant on modÃ¨le ! Animaux, lettres, personnages imaginaires...', tip: 'Propose des emporte-piÃ¨ces, un rouleau Ã  pÃ¢tisserie et une fourchette comme outils !' },
    ],
    learningGoals: ['CrÃ©ation artistique', 'MotricitÃ© fine et force des mains', 'Mesurer et compter', 'MÃ©langer et nommer les couleurs'],
    tukiTip: 'Modeler Ã  hauteur des yeux dans le Tuki â ton enfant a la posture de travail parfaite. La pÃ¢te Ã  modeler maison se conserve 2-3 semaines au rÃ©frigÃ©rateur !',
  },
  'haende-waschen-lied': {
    title: 'La chanson du lavage de mains',
    subtitle: 'Apprendre l\'hygiÃ¨ne en jouant',
    materials: ['Savon (adaptÃ© aux enfants)', 'Serviette', 'Optionnel : sablier (30 secondes)'],
    steps: [
      { text: 'Se mettre ensemble devant le lavabo â ajuste le Tuki Ã  la bonne hauteur !' },
      { text: 'Mouiller les mains et savonner.' },
      { text: 'Chanter ensemble en se lavant : Â« On se lave les mains, on se lave les mains... Â»', tip: 'La chanson dure environ 30 secondes â parfait pour un lavage minutieux !' },
      { text: 'Entre les doigts, sous les ongles, ne pas oublier les pouces !' },
      { text: 'Rincer, sÃ©cher et Ãªtre fier !' },
    ],
    learningGoals: ['Construire une routine d\'hygiÃ¨ne', 'DÃ©veloppement du langage par le chant', 'Autonomie', 'Conscience corporelle'],
    tukiTip: 'Le Tuki au lavabo est l\'un des usages les plus frÃ©quents ! Ton enfant apprend l\'autonomie dans sa routine quotidienne.',
  },
  'herbst-blÃ¤tter': {
    title: 'Åuvre d\'art en feuilles d\'automne',
    subtitle: 'Ramasser, presser, crÃ©er',
    materials: ['Feuilles d\'automne ramassÃ©es', 'Papier ou carton', 'Colle', 'Crayons de cire', 'Optionnel : plastifieuse'],
    steps: [
      { text: 'D\'abord dehors dans la nature : ramasser diffÃ©rentes feuilles !', tip: 'Cherchez diffÃ©rentes couleurs, formes et tailles.' },
      { text: 'Presser les feuilles entre des livres briÃ¨vement (1-2 jours) ou les utiliser directement.' },
      { text: 'Coller sur du papier et crÃ©er une image : animaux en feuilles, arbres, mandalas...' },
      { text: 'ComplÃ©ter avec des crayons de cire et dessiner des dÃ©tails.' },
      { text: 'Accrocher l\'Åuvre d\'art et l\'admirer !' },
    ],
    learningGoals: ['ComprÃ©hension de la nature', 'MotricitÃ© fine (coller, peindre)', 'CrÃ©ation artistique', 'ReconnaÃ®tre couleurs et formes dans la nature'],
    tukiTip: 'Dans le Tuki, ton enfant peut crÃ©er confortablement son Åuvre en feuilles sur la table de cuisine ou le plan de travail. Accrochez-la ensemble ensuite !',
  },
  'zÃ¤hlen-beim-kochen': {
    title: 'Compter en cuisinant',
    subtitle: 'Apprendre les maths naturellement',
    materials: ['Fruits ou lÃ©gumes Ã  compter', 'Bols', 'Une recette simple'],
    steps: [
      { text: 'Choisissez ensemble une recette simple.' },
      { text: 'Compter les ingrÃ©dients : Â« Il nous faut TROIS Åufs. Tu comptes avec moi ? Â»' },
      { text: 'Compter les cuillÃ¨res : Â« Deux cuillÃ¨res de farine â un... deux ! Â»', tip: 'Compte de maniÃ¨re exagÃ©rÃ©e et montre de l\'enthousiasme !' },
      { text: 'Admirer le rÃ©sultat : Â« Wow, avec 5 ingrÃ©dients nous avons fait quelque chose de dÃ©licieux ! Â»' },
    ],
    learningGoals: ['ComprÃ©hension des nombres (1-10)', 'Notion de quantitÃ©', 'Correspondance un-Ã -un', 'Vivre les maths au quotidien'],
    tukiTip: 'En cuisinant dans le Tuki, les maths viennent naturellement. Compter, mesurer, comparer â tout fait partie de l\'expÃ©rience cuisine.',
  },
  'geschichten-kochen': {
    title: 'Cuisine Ã  histoires',
    subtitle: 'Cuisiner en racontant des histoires',
    materials: ['Une recette simple', 'De l\'imagination !'],
    steps: [
      { text: 'Commencez avec une recette de votre choix.' },
      { text: 'Inventez une histoire pour chaque ingrÃ©dient : Â« La petite tomate a roulÃ© de la montagne dans la vallÃ©e... Â»' },
      { text: 'Ton enfant continue : que se passe-t-il ensuite ?', tip: 'Il n\'y a ni juste ni faux â chaque histoire est gÃ©niale !' },
      { text: 'Pendant la cuisine, l\'histoire continue.' },
      { text: 'Ã la fin : raconter l\'histoire ensemble en mangeant.' },
    ],
    learningGoals: ['Enrichir le vocabulaire', 'Imagination et compÃ©tence narrative', 'Pratiquer la construction de phrases', 'Ãtablir des liens'],
    tukiTip: 'Dans le Tuki Ã  hauteur des yeux, les histoires se racontent le mieux â ton enfant se sent comme un partenaire d\'histoires Ã  part entiÃ¨re !',
  },
}

// French category info
export const categoryInfoFr: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'MotricitÃ©', emoji: 'ð¤¸', color: 'bg-orange-100 text-orange-700' },
  sensorik: { label: 'Sensoriel', emoji: 'ðï¸', color: 'bg-purple-100 text-purple-700' },
  kreativitÃ¤t: { label: 'CrÃ©ativitÃ©', emoji: 'ð¨', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Langage', emoji: 'ð¬', color: 'bg-blue-100 text-blue-700' },
  mathe: { label: 'Chiffres & Logique', emoji: 'ð¢', color: 'bg-green-100 text-green-700' },
  natur: { label: 'Nature & Savoir', emoji: 'ð±', color: 'bg-emerald-100 text-emerald-700' },
}
