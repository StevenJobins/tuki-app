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
    subtitle: 'Comprendre les quantités en jouant',
    materials: ['Différents gobelets et récipients', 'Eau', 'Serviette pour les éclaboussures', 'Optionnel : colorant alimentaire'],
    steps: [
      { text: 'Place différents gobelets et bols sur le plan de travail.' },
      { text: 'Remplis un pichet d\'eau (optionnel : avec du colorant alimentaire).', tip: 'La couleur rend le jeu plus amusant et aide à observer !' },
      { text: 'Ton enfant verse l\'eau d\'un récipient à l\'autre.' },
      { text: 'Parlez ensemble : lequel est plein ? Lequel est vide ? Lequel en a plus ?' },
    ],
    learningGoals: ['Motricité fine et coordination', 'Compréhension des quantités (plein/vide/plus/moins)', 'Concentration et patience', 'Expérience sensorielle'],
    tukiTip: 'Dans le Tuki, ton enfant se tient parfaitement devant l\'évier ou le plan de travail. Mets une serviette en dessous — un peu de barbouillage fait partie du jeu !',
  },
  'kräuter-garten': {
    title: 'Jardin d\'herbes au fenêtre',
    subtitle: 'Semer, arroser, regarder pousser',
    materials: ['Petits pots ou boîte à œufs', 'Terre', 'Graines d\'herbes (cresson, basilic, ciboulette)', 'Eau et petit arrosoir', 'Cuillère'],
    steps: [
      { text: 'Remplir les pots de terre — cuillère par cuillère.', tip: 'Les enfants adorent pelleter. Mets du papier journal en dessous !' },
      { text: 'Répandre les graines sur la terre et presser légèrement.' },
      { text: 'Arroser doucement — pas trop !' },
      { text: 'Placer sur le rebord de la fenêtre et regarder ensemble chaque jour ce qui se passe.' },
      { text: 'Quand les herbes ont poussé : les récolter ensemble et les utiliser dans une recette !' },
    ],
    learningGoals: ['Compréhension de la nature et patience', 'Prendre des responsabilités', 'Observer et documenter', 'Comprendre les liens (eau → croissance)'],
    tukiTip: 'Debout dans le Tuki devant la fenêtre de la cuisine, ton enfant peut entretenir son potager d\'herbes chaque jour. Faites un journal de croissance ensemble !',
  },
  'sortier-spiel': {
    title: 'Le grand jeu de tri',
    subtitle: 'Trier couleurs, formes et tailles',
    materials: ['Bols de différentes couleurs', 'Objets du quotidien à trier : fruits, jouets, pinces à linge', 'Moule à muffins (optionnel)'],
    steps: [
      { text: 'Place différents bols sur le plan de travail.' },
      { text: 'Prépare les objets : fruits colorés, pinces à linge, cubes...' },
      { text: 'Donne une consigne de tri : tout ce qui est rouge ici, tout ce qui est vert là !', tip: 'Commence avec 2 couleurs, augmente progressivement à 3-4.' },
      { text: 'Variante : trier par taille (grand/petit) ou par forme (rond/carré).' },
    ],
    learningGoals: ['Reconnaissance des couleurs', 'Catégorisation et raisonnement logique', 'Motricité fine', 'Développement du langage (noms des couleurs, adjectifs)'],
    tukiTip: 'Le plan de travail de la cuisine devient une table d\'apprentissage ! Dans le Tuki, ton enfant a assez de place et la bonne hauteur pour trier.',
  },
  'knete-selber-machen': {
    title: 'Fabriquer sa pâte à modeler',
    subtitle: 'Mélanger, pétrir, être créatif',
    materials: ['200 g de farine', '100 g de sel', '2 c. à s. d\'huile', '200 ml d\'eau', 'Colorant alimentaire', 'Bol et cuillère'],
    steps: [
      { text: 'Mélanger la farine et le sel dans un grand bol.' },
      { text: 'Ajouter l\'huile et l\'eau.', tip: 'Ton enfant peut mesurer l\'eau — avec un verre doseur !' },
      { text: 'Bien pétrir jusqu\'à obtenir une pâte lisse.' },
      { text: 'Diviser la pâte et colorer avec du colorant alimentaire.' },
      { text: 'Maintenant on modèle ! Animaux, lettres, personnages imaginaires...', tip: 'Propose des emporte-pièces, un rouleau à pâtisserie et une fourchette comme outils !' },
    ],
    learningGoals: ['Création artistique', 'Motricité fine et force des mains', 'Mesurer et compter', 'Mélanger et nommer les couleurs'],
    tukiTip: 'Modeler à hauteur des yeux dans le Tuki — ton enfant a la posture de travail parfaite. La pâte à modeler maison se conserve 2-3 semaines au réfrigérateur !',
  },
  'haende-waschen-lied': {
    title: 'La chanson du lavage de mains',
    subtitle: 'Apprendre l\'hygiène en jouant',
    materials: ['Savon (adapté aux enfants)', 'Serviette', 'Optionnel : sablier (30 secondes)'],
    steps: [
      { text: 'Se mettre ensemble devant le lavabo — ajuste le Tuki à la bonne hauteur !' },
      { text: 'Mouiller les mains et savonner.' },
      { text: 'Chanter ensemble en se lavant : « On se lave les mains, on se lave les mains... »', tip: 'La chanson dure environ 30 secondes — parfait pour un lavage minutieux !' },
      { text: 'Entre les doigts, sous les ongles, ne pas oublier les pouces !' },
      { text: 'Rincer, sécher et être fier !' },
    ],
    learningGoals: ['Construire une routine d\'hygiène', 'Développement du langage par le chant', 'Autonomie', 'Conscience corporelle'],
    tukiTip: 'Le Tuki au lavabo est l\'un des usages les plus fréquents ! Ton enfant apprend l\'autonomie dans sa routine quotidienne.',
  },
  'herbst-blätter': {
    title: 'Œuvre d\'art en feuilles d\'automne',
    subtitle: 'Ramasser, presser, créer',
    materials: ['Feuilles d\'automne ramassées', 'Papier ou carton', 'Colle', 'Crayons de cire', 'Optionnel : plastifieuse'],
    steps: [
      { text: 'D\'abord dehors dans la nature : ramasser différentes feuilles !', tip: 'Cherchez différentes couleurs, formes et tailles.' },
      { text: 'Presser les feuilles entre des livres brièvement (1-2 jours) ou les utiliser directement.' },
      { text: 'Coller sur du papier et créer une image : animaux en feuilles, arbres, mandalas...' },
      { text: 'Compléter avec des crayons de cire et dessiner des détails.' },
      { text: 'Accrocher l\'œuvre d\'art et l\'admirer !' },
    ],
    learningGoals: ['Compréhension de la nature', 'Motricité fine (coller, peindre)', 'Création artistique', 'Reconnaître couleurs et formes dans la nature'],
    tukiTip: 'Dans le Tuki, ton enfant peut créer confortablement son œuvre en feuilles sur la table de cuisine ou le plan de travail. Accrochez-la ensemble ensuite !',
  },
  'zählen-beim-kochen': {
    title: 'Compter en cuisinant',
    subtitle: 'Apprendre les maths naturellement',
    materials: ['Fruits ou légumes à compter', 'Bols', 'Une recette simple'],
    steps: [
      { text: 'Choisissez ensemble une recette simple.' },
      { text: 'Compter les ingrédients : « Il nous faut TROIS œufs. Tu comptes avec moi ? »' },
      { text: 'Compter les cuillères : « Deux cuillères de farine — un... deux ! »', tip: 'Compte de manière exagérée et montre de l\'enthousiasme !' },
      { text: 'Admirer le résultat : « Wow, avec 5 ingrédients nous avons fait quelque chose de délicieux ! »' },
    ],
    learningGoals: ['Compréhension des nombres (1-10)', 'Notion de quantité', 'Correspondance un-à-un', 'Vivre les maths au quotidien'],
    tukiTip: 'En cuisinant dans le Tuki, les maths viennent naturellement. Compter, mesurer, comparer — tout fait partie de l\'expérience cuisine.',
  },
  'geschichten-kochen': {
    title: 'Cuisine à histoires',
    subtitle: 'Cuisiner en racontant des histoires',
    materials: ['Une recette simple', 'De l\'imagination !'],
    steps: [
      { text: 'Commencez avec une recette de votre choix.' },
      { text: 'Inventez une histoire pour chaque ingrédient : « La petite tomate a roulé de la montagne dans la vallée... »' },
      { text: 'Ton enfant continue : que se passe-t-il ensuite ?', tip: 'Il n\'y a ni juste ni faux — chaque histoire est géniale !' },
      { text: 'Pendant la cuisine, l\'histoire continue.' },
      { text: 'À la fin : raconter l\'histoire ensemble en mangeant.' },
    ],
    learningGoals: ['Enrichir le vocabulaire', 'Imagination et compétence narrative', 'Pratiquer la construction de phrases', 'Établir des liens'],
    tukiTip: 'Dans le Tuki à hauteur des yeux, les histoires se racontent le mieux — ton enfant se sent comme un partenaire d\'histoires à part entière !',
  },
}

// French category info
export const categoryInfoFr: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motricité', emoji: '🤸', color: 'bg-orange-100 text-orange-700' },
  sensorik: { label: 'Sensoriel', emoji: '🖐️', color: 'bg-purple-100 text-purple-700' },
  kreativität: { label: 'Créativité', emoji: '🎨', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Langage', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  mathe: { label: 'Chiffres & Logique', emoji: '🔢', color: 'bg-green-100 text-green-700' },
  natur: { label: 'Nature & Savoir', emoji: '🌱', color: 'bg-emerald-100 text-emerald-700' },
}
