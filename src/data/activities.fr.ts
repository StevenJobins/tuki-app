// French translations for activities
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
    subtitle: 'Transvaser, verser et s\'émerveiller',
    materials: ['2-3 gobelets différents', 'Verre doseur', 'Bassine d\'eau', 'Serviette'],
    steps: [
      { text: 'Poser la bassine et les gobelets sur la table.' },
      { text: 'Montre à ton enfant comment verser l\'eau d\'un gobelet à l\'autre.', tip: 'Commence avec peu d\'eau — ça rassure !' },
      { text: 'Laisse-le essayer et expérimenter tout seul.' },
      { text: 'Observez ensemble : quel gobelet est plein ? Lequel est vide ?' },
    ],
    learningGoals: ['Motricité fine', 'Notion de quantité', 'Coordination oeil-main'],
    tukiTip: 'Dans le Tuki, ton enfant est à la hauteur parfaite pour verser. La serviette en dessous attrape les petites éclaboussures !',
  },

  'kräuter-garten': {
    title: 'Jardin d\'herbes aromatiques sur le rebord de fenêtre',
    subtitle: 'Semer des graines et les voir pousser',
    materials: ['Petits pots ou pots de yaourt', 'Terreau', 'Graines d\'herbes aromatiques (cresson, basilic)', 'Petit arrosoir'],
    steps: [
      { text: 'Remplir les pots de terreau.' },
      { text: 'Saupoudrer les graines sur la terre.', tip: 'Le cresson germe très vite — parfait pour les petits impatients !' },
      { text: 'Recouvrir légèrement de terre et arroser.' },
      { text: 'Placer au bord de la fenêtre, arroser et observer chaque jour.' },
    ],
    learningGoals: ['Compréhension de la nature', 'Patience', 'Responsabilité'],
    tukiTip: 'Regarder ensemble chaque jour si quelque chose pousse. Après 3 jours, le cresson apparaît — l\'enthousiasme est garanti !',
  },

  'sortier-spiel': {
    title: 'Le grand jeu de tri',
    subtitle: 'Trier par couleurs, formes et tailles',
    materials: ['Objets de différentes couleurs (cubes, boutons, fruits)', 'Bols pour trier'],
    steps: [
      { text: 'Disposer différents objets sur la table.' },
      { text: 'Préparer les bols — un par couleur ou par taille.' },
      { text: 'Trier ensemble : « Tous les rouges ici, tous les bleus là-bas. »', tip: 'Commence avec 2 couleurs et augmente petit à petit !' },
      { text: 'Compter ensemble : combien y en a-t-il dans chaque bol ?' },
    ],
    learningGoals: ['Reconnaissance des couleurs', 'Catégorisation', 'Compter'],
    tukiTip: 'Trier, c\'est des maths à portée de main ! Dans le Tuki, ton enfant a tous les bols à portée de main.',
  },

  'knete-selber-machen': {
    title: 'Fabriquer sa pâte à modeler',
    subtitle: 'Pétrir, modeler et laisser libre cours à sa créativité',
    materials: ['200 g de farine', '100 g de sel', '200 ml d\'eau', '1 c. à soupe d\'huile', 'Colorant alimentaire'],
    steps: [
      { text: 'Mélanger la farine et le sel dans un grand bol.' },
      { text: 'Ajouter l\'eau et l\'huile, puis bien pétrir.', tip: 'Les enfants peuvent plonger les deux mains dans le bol sans hésiter !' },
      { text: 'Incorporer le colorant alimentaire pour obtenir une pâte colorée.' },
      { text: 'C\'est prêt ! Maintenant, on modèle, on presse et on crée.' },
    ],
    learningGoals: ['Motricité fine', 'Créativité', 'Perception sensorielle'],
    tukiTip: 'Fabriquer sa pâte à modeler, c\'est deux fois plus de plaisir : d\'abord la préparer, puis jouer avec ! Dans une boîte, elle se conserve pendant des semaines.',
  },

  'haende-waschen-lied': {
    title: 'La chanson du lavage de mains',
    subtitle: 'Chanter et apprendre l\'hygiène',
    materials: ['Savon', 'Eau', 'Serviette'],
    steps: [
      { text: 'Se mettre ensemble devant le lavabo.' },
      { text: 'Chanter la chanson : « Je me lave les mains, je me lave les mains, comme un grand... »' },
      { text: 'Pendant la chanson, savonner et frotter les mains pendant 20 secondes.', tip: 'La chanson dure exactement le temps qu\'il faut pour bien se laver !' },
      { text: 'Sécher les mains et les regarder : « Maintenant elles sont toutes propres ! »' },
    ],
    learningGoals: ['Développement du langage', 'Routine d\'hygiène', 'Sens du rythme'],
    tukiTip: 'Les rituels avec des chansons marquent les esprits ! Dans le Tuki, ton enfant atteint le lavabo tout seul.',
  },

  'herbst-blätter': {
    title: 'Oeuvre d\'art en feuilles d\'automne',
    subtitle: 'Ramasser, presser et coller',
    materials: ['Feuilles d\'automne ramassées', 'Papier', 'Colle de bricolage', 'Crayons de cire'],
    steps: [
      { text: 'Ramasser ensemble de belles feuilles colorées dehors.', tip: 'Cherchez différentes formes et couleurs — comme une chasse au trésor !' },
      { text: 'À la maison, disposer les feuilles sur le papier et créer un arrangement.' },
      { text: 'Fixer avec de la colle.' },
      { text: 'Dessiner des animaux ou des motifs autour avec les crayons de cire.' },
    ],
    learningGoals: ['Créativité', 'Lien avec la nature', 'Motricité fine'],
    tukiTip: 'De la promenade à l\'oeuvre d\'art — les enfants apprennent à apprécier les saisons et à exprimer leur créativité.',
  },

  'zaehlen-beim-kochen': {
    title: 'Compter en cuisinant',
    subtitle: 'Les maths tout naturellement',
    materials: ['Ingrédients de cuisine (pommes, oeufs, cuillères)', 'Recette avec des quantités'],
    steps: [
      { text: 'Choisir une recette simple.' },
      { text: 'Compter ensemble les ingrédients : « Il nous faut 3 oeufs. Compte avec moi ! »', tip: 'Montre chaque oeuf en comptant — la correspondance un-à-un est la clé !' },
      { text: 'Ton enfant prépare les ingrédients comptés.' },
      { text: 'Continuer à compter en cuisinant : « Deux cuillères de farine, trois cuillères de sucre... »' },
    ],
    learningGoals: ['Compter', 'Notion de quantité', 'Correspondance un-à-un'],
    tukiTip: 'Cuisiner, c\'est des maths concrètes ! Chaque recette offre des occasions de compter — dans le Tuki, ton enfant participe pleinement.',
  },

  'geschichten-kochen': {
    title: 'La cuisine des histoires',
    subtitle: 'Cuisiner et raconter en même temps',
    materials: ['Un livre illustré', 'Ingrédients en lien avec l\'histoire'],
    steps: [
      { text: 'Lire ou raconter ensemble une histoire.' },
      { text: 'Réfléchir : que pourraient cuisiner ou manger les personnages ?' },
      { text: 'Préparer ensemble un plat en rapport avec l\'histoire.', tip: 'Pas besoin que ça colle parfaitement — c\'est l\'imagination qui compte !' },
      { text: 'Pendant le repas, raconter à nouveau l\'histoire.' },
    ],
    learningGoals: ['Développement du langage', 'Créativité', 'Art de raconter'],
    tukiTip: 'Histoires + cuisine = double plaisir ! Ton enfant relie l\'imaginaire à une activité concrète.',
  },

  'schatzsuche-natur': {
    title: 'Chasse au trésor dans la nature',
    subtitle: 'Explorer dehors et collectionner',
    materials: ['Boîte à oeufs comme boîte de collection', 'Liste illustrée (feuille, pierre, fleur, bâton)'],
    steps: [
      { text: 'Préparer la liste illustrée : qu\'est-ce qu\'on veut trouver ?' },
      { text: 'Partir dans la nature — jardin, parc ou forêt.' },
      { text: 'Chercher ensemble les trésors et les placer dans la boîte à oeufs.', tip: 'Chaque compartiment reçoit un trésor différent !' },
      { text: 'À la maison, observer les trouvailles, les nommer et les trier par taille.' },
    ],
    learningGoals: ['Compréhension de la nature', 'Catégorisation', 'Motricité fine'],
    tukiTip: 'De la nature à la maison — collectionner des trésors combine mouvement, langage et esprit de découverte.',
  },

  'fingerfarben-malen': {
    title: 'Peinture aux doigts',
    subtitle: 'Patouiller, mélanger et s\'émerveiller',
    materials: ['Peinture aux doigts', 'Grand papier', 'Tablier', 'Gant de toilette'],
    steps: [
      { text: 'Coller le papier sur la table (pour qu\'il ne glisse pas).' },
      { text: 'Déposer de petites touches de peinture aux doigts sur le papier.' },
      { text: 'Peindre avec les doigts, les mains et même les pieds !', tip: 'Pas de bon ou de mauvais — chaque trace est de l\'art !' },
      { text: 'Observer les mélanges de couleurs : que se passe-t-il quand le rouge rencontre le bleu ?' },
    ],
    learningGoals: ['Perception sensorielle', 'Compréhension des couleurs', 'Créativité'],
    tukiTip: 'La peinture aux doigts est une expérience sensorielle pure ! Tablier enfilé, papier sorti, et c\'est parti pour l\'aventure colorée.',
  },

  'hindernisparcours': {
    title: 'Parcours d\'obstacles au salon',
    subtitle: 'Grimper, ramper et garder l\'équilibre',
    materials: ['Coussins', 'Couvertures', 'Chaises', 'Ruban adhésif pour tracer une ligne au sol'],
    steps: [
      { text: 'Construire un parcours avec des coussins et des chaises.' },
      { text: 'Définir les étapes : grimper par-dessus les coussins, ramper sous les chaises.', tip: 'Laisse ton enfant participer à la construction — c\'est déjà la moitié de l\'activité !' },
      { text: 'Parcourir le circuit ensemble.' },
      { text: 'Augmenter la difficulté : sauter sur un pied, marcher en arrière...' },
    ],
    learningGoals: ['Motricité globale', 'Équilibre', 'Perception de l\'espace'],
    tukiTip: 'Bouger à l\'intérieur, c\'est possible ! Un parcours favorise la conscience corporelle et fait un bien fou les jours de pluie.',
  },

  'schattentheater': {
    title: 'Théâtre d\'ombres',
    subtitle: 'Fabriquer des personnages et jouer',
    materials: ['Lampe de poche', 'Carton', 'Bâtonnets', 'Ciseaux', 'Drap blanc'],
    steps: [
      { text: 'Découper des silhouettes dans le carton (animaux, personnages, arbres).' },
      { text: 'Les fixer sur des bâtonnets.' },
      { text: 'Accrocher le drap blanc et placer la lampe de poche derrière.' },
      { text: 'Tenir les silhouettes entre la lumière et le drap, et jouer une histoire.', tip: 'Les ombres grandissent quand on s\'approche de la lumière — fascinant !' },
    ],
    learningGoals: ['Créativité', 'Art de raconter', 'Motricité fine'],
    tukiTip: 'Le théâtre d\'ombres réunit bricolage, imagination et physique. Chaque représentation devient une aventure unique !',
  },

  'balancieren-lernen': {
    title: 'Maître de l\'équilibre',
    subtitle: 'Travailler l\'équilibre en s\'amusant',
    materials: ['Ruban adhésif ou corde', 'Coussins', 'Livres à poser sur la tête'],
    steps: [
      { text: 'Coller une ligne de ruban adhésif sur le sol.' },
      { text: 'Avancer en équilibre le long de la ligne — comme sur un fil !', tip: 'Écarter les bras aide à garder l\'équilibre !' },
      { text: 'Niveau supérieur : tenir un livre en équilibre sur la tête.' },
      { text: 'Qui réussit à aller le plus loin sans sortir de la ligne ?' },
    ],
    learningGoals: ['Équilibre', 'Conscience corporelle', 'Concentration'],
    tukiTip: 'Les exercices d\'équilibre renforcent la posture et favorisent la concentration — et c\'est vraiment amusant !',
  },

  'musik-instrumente': {
    title: 'Atelier musique',
    subtitle: 'Fabriquer des instruments avec des objets du quotidien',
    materials: ['Boîtes de conserve vides', 'Riz ou lentilles', 'Élastiques', 'Cuillères en bois', 'Bouteilles vides'],
    steps: [
      { text: 'Remplir de riz les boîtes ou bouteilles vides → maracas !' },
      { text: 'Tendre des élastiques autour d\'une boîte → guitare !' },
      { text: 'Deux cuillères ensemble → claves !', tip: 'Chaque enfant fabrique son propre instrument — pas de bon ou de mauvais !' },
      { text: 'Jouer une chanson tous ensemble et chanter en même temps.' },
    ],
    learningGoals: ['Sens du rythme', 'Créativité', 'Motricité fine'],
    tukiTip: 'Faire de la musique avec des objets du quotidien — ça stimule la créativité et montre qu\'on n\'a pas besoin de grand-chose pour s\'amuser !',
  },

  'buchstaben-suchen': {
    title: 'Détective des lettres',
    subtitle: 'Découvrir les lettres au quotidien',
    materials: ['Emballages, livres, panneaux', 'Papier et crayons'],
    steps: [
      { text: 'Choisir une lettre — par exemple l\'initiale du prénom de l\'enfant.' },
      { text: 'Chercher à la maison ou dehors : où se cache cette lettre ?' },
      { text: 'Fêter chaque découverte et la noter.', tip: 'Sur les emballages, les plaques d\'immatriculation, les livres — les lettres sont partout !' },
      { text: 'À la fin, compter : combien en avons-nous trouvé ?' },
    ],
    learningGoals: ['Reconnaissance des lettres', 'Attention', 'Préparation à l\'école'],
    tukiTip: 'La chasse aux lettres transforme le quotidien en jeu éducatif. Ton enfant devient détective et découvre le langage dans son environnement !',
  },

  'fuehlen-raten': {
    title: 'Le jeu des devinettes tactiles',
    subtitle: 'Reconnaître des objets les yeux fermés',
    materials: ['Sac en tissu ou carton avec un trou', 'Différents objets (balle, cuillère, fruit, pierre)'],
    steps: [
      { text: 'Mettre différents objets dans le sac.' },
      { text: 'L\'enfant plonge la main dans le sac à l\'aveugle et touche un objet.' },
      { text: 'Décrire : « C\'est rond, doux, lisse... »', tip: 'Aide avec des questions : « C\'est dur ou mou ? Grand ou petit ? »' },
      { text: 'Deviner ce que c\'est — puis le sortir pour vérifier !' },
    ],
    learningGoals: ['Perception tactile', 'Vocabulaire', 'Capacité à décrire'],
    tukiTip: 'Toucher sans voir aiguise les sens. Et deviner, c\'est toujours un moment de rigolade !',
  },

  'experiment-vulkan': {
    title: 'Le volcan au bicarbonate',
    subtitle: 'De la science fascinante',
    materials: ['Bicarbonate de soude', 'Vinaigre', 'Colorant alimentaire', 'Verre ou bol', 'Plateau'],
    steps: [
      { text: 'Poser le verre sur un plateau (pour protéger la table !).' },
      { text: 'Mettre 2-3 cuillères à soupe de bicarbonate dans le verre.' },
      { text: 'Ajouter du colorant alimentaire pour l\'effet lave.' },
      { text: 'Verser du vinaigre par-dessus et s\'émerveiller !', tip: 'Ça mousse et ça pétille ! C\'est sans danger et on peut toucher.' },
    ],
    learningGoals: ['Sciences naturelles', 'Cause et effet', 'Émerveillement'],
    tukiTip: 'L\'effet volcan fascine chaque enfant ! Une expérience simple qui montre que la science, c\'est magique.',
  },

  'memory-selber-machen': {
    title: 'Fabriquer son propre Memory',
    subtitle: 'Dessiner, découper et jouer',
    materials: ['Carton', 'Ciseaux', 'Crayons', 'Règle'],
    steps: [
      { text: 'Découper le carton en rectangles de taille égale (au moins 12 cartes).' },
      { text: 'Dessiner le même motif sur 2 cartes à chaque fois : animaux, formes, couleurs.', tip: 'Ton enfant choisit les motifs — plus c\'est personnel, plus c\'est amusant !' },
      { text: 'Retourner et mélanger les cartes.' },
      { text: 'Jouer au Memory : retourner 2 cartes à chaque tour — qui trouve les paires ?' },
    ],
    learningGoals: ['Mémoire', 'Motricité fine', 'Concentration'],
    tukiTip: 'Un Memory fait maison a plus de valeur qu\'un Memory acheté ! Ton enfant dessine, bricole et joue — triple effet éducatif.',
  },

  'yoga-tiere': {
    title: 'Yoga des animaux pour les enfants',
    subtitle: 'S\'étirer, respirer et imiter les animaux',
    materials: ['Tapis de yoga ou couverture', 'Vêtements confortables'],
    steps: [
      { text: 'Se mettre sur le tapis et respirer profondément ensemble.' },
      { text: 'Le chat : à quatre pattes, arrondir le dos puis l\'étirer.' },
      { text: 'Le chien : mains et pieds au sol, fesses en l\'air.' ,tip: 'Faites les bruits des animaux en même temps — c\'est encore plus drôle !' },
      { text: 'Le flamant rose : se tenir sur un pied et écarter les bras.' },
      { text: 'Pour finir : s\'allonger sur le dos et sentir sa respiration.' },
    ],
    learningGoals: ['Conscience corporelle', 'Équilibre', 'Relaxation'],
    tukiTip: 'Le yoga des animaux allie mouvement et calme. Parfait comme rituel du matin ou avant le coucher !',
  },

  'messbecher-experiment': {
    title: 'Petit chercheur au verre doseur',
    subtitle: 'Plein, à moitié, vide — comprendre les quantités',
    materials: ['Verres doseurs (de différentes tailles)', 'Eau', 'Bols', 'Éponge pour essuyer'],
    steps: [
      { text: 'Aligner les différents verres doseurs côte à côte.' },
      { text: 'Poser des questions : « Lequel est le plus grand ? Lequel est le plus petit ? »' },
      { text: 'Mesurer l\'eau : « Remplis le verre jusqu\'au trait rouge. »', tip: 'Introduire les notions de « plein », « à moitié plein » et « vide » !' },
      { text: 'Expérimenter : est-ce que 2 petits verres remplissent le grand ?' },
    ],
    learningGoals: ['Notion de quantité', 'Comparer', 'Raisonnement logique'],
    tukiTip: 'Mesurer, c\'est des maths concrètes ! Ton enfant apprend les notions de plein, à moitié et vide tout naturellement.',
  },

  'ostereier-faerben': {
    title: 'Colorer des oeufs de Pâques',
    subtitle: 'Peindre des oeufs avec des couleurs naturelles',
    materials: ['Oeufs durs', 'Colorant alimentaire ou teintures naturelles', 'Vinaigre', 'Récipients', 'Pinceaux', 'Autocollants'],
    steps: [
      { text: 'Préparer le bain de couleur : mélanger l\'eau avec le colorant alimentaire et un filet de vinaigre.' },
      { text: 'Plonger délicatement les oeufs dans la teinture et les laisser 5 à 10 minutes.', tip: 'Plus l\'oeuf reste longtemps dans le bain, plus la couleur sera intense !' },
      { text: 'Laisser sécher les oeufs.' },
      { text: 'Décorer avec des autocollants, des crayons de cire ou un pinceau.' },
    ],
    learningGoals: ['Compréhension des couleurs', 'Motricité fine', 'Créativité'],
    tukiTip: 'Colorer des oeufs de Pâques, c\'est le grand classique du printemps ! Dans le Tuki, ton enfant atteint parfaitement les pots de couleur.',
  },

  'fruehlings-blumen-pflanzen': {
    title: 'Planter des fleurs de printemps',
    subtitle: 'Mettre des graines en terre et les voir grandir',
    materials: ['Petits pots', 'Terreau', 'Graines de tournesol ou de cresson', 'Petit arrosoir', 'Pelle'],
    steps: [
      { text: 'Remplir les pots de terreau — ton enfant pellette lui-même !' },
      { text: 'Poser les graines sur la terre et appuyer légèrement.', tip: 'Pas trop profond — les graines ont besoin de lumière pour germer !' },
      { text: 'Arroser doucement.' },
      { text: 'Placer dans un endroit ensoleillé et observer chaque jour.' },
    ],
    learningGoals: ['Compréhension de la nature', 'Responsabilité', 'Patience'],
    tukiTip: 'Arroser et observer ensemble chaque jour — après quelques jours, les premières pousses apparaissent. Émerveillement garanti !',
  },

  'oster-schatzsuche': {
    title: 'Chasse aux oeufs de Pâques',
    subtitle: 'Chercher des oeufs et des surprises dans le jardin',
    materials: ['Oeufs de Pâques colorés (en plastique ou vrais)', 'Panier', 'Petites surprises', 'Optionnel : indices illustrés'],
    steps: [
      { text: 'Pendant que l\'enfant ne regarde pas, cacher les oeufs dans le jardin ou dans l\'appartement.' },
      { text: 'Donner le panier et c\'est parti !', tip: 'Pour les petits : cacher les oeufs bien en vue. Pour les grands : des cachettes plus malignes !' },
      { text: 'Compter ensemble : combien d\'oeufs avons-nous trouvés ?' },
      { text: 'Ouvrir les oeufs et admirer les surprises.' },
    ],
    learningGoals: ['Mouvement', 'Compter', 'Orientation spatiale'],
    tukiTip: 'Après la chasse, déballer les trésors dans le Tuki, les trier et les compter — maths et mouvement en un seul jeu !',
  },

  'schmetterlinge-beobachten': {
    title: 'Observer les papillons',
    subtitle: 'Découvrir les messagers du printemps et les dessiner',
    materials: ['Loupe', 'Papier à dessin', 'Crayons de couleur', 'Livre illustré sur les papillons'],
    steps: [
      { text: 'Dans le jardin ou au parc, guetter les papillons.' },
      { text: 'Les observer à la loupe : quelles couleurs a le papillon ?', tip: 'Rester bien silencieux — les papillons sont craintifs !' },
      { text: 'À la maison, dessiner le papillon de mémoire.' },
      { text: 'Chercher dans le livre illustré : de quelle espèce s\'agissait-il ?' },
    ],
    learningGoals: ['Observation de la nature', 'Concentration', 'Dessin'],
    tukiTip: 'De retour à la maison, on dessine dans le Tuki et on feuillette le livre. Inspiré par la nature !',
  },

  'vogelhaus-bauen': {
    title: 'Fabriquer une mangeoire à oiseaux',
    subtitle: 'Construire un petit abri pour les oiseaux',
    materials: ['Brique de lait (vide et propre)', 'Peinture', 'Pinceaux', 'Ciseaux', 'Ficelle', 'Graines pour oiseaux'],
    steps: [
      { text: 'Rincer et sécher la brique de lait.' },
      { text: 'Découper un trou (l\'entrée) sur le côté.', tip: 'Les adultes découpent — les enfants décorent !' },
      { text: 'Peindre la brique de belles couleurs et laisser sécher.' },
      { text: 'Fixer une ficelle en haut et accrocher dehors.' },
      { text: 'Remplir de graines et observer quels oiseaux viennent !' },
    ],
    learningGoals: ['Créativité', 'Connaissance des animaux', 'Responsabilité'],
    tukiTip: 'Dans le Tuki, ton enfant peint la mangeoire et remplit les graines. Ensuite, observer ensemble à la fenêtre !',
  },

  'fruehlingsblumen-pressen': {
    title: 'Presser des fleurs de printemps',
    subtitle: 'Cueillir, presser et bricoler avec des fleurs',
    materials: ['Pâquerettes, violettes, trèfle', 'Gros livre ou presse à fleurs', 'Papier', 'Colle'],
    steps: [
      { text: 'Cueillir des fleurs de printemps dehors (pâquerettes, trèfle, violettes).', tip: 'Ne cueillez que là où c\'est autorisé — dans les prés, pas dans les parterres !' },
      { text: 'Placer les fleurs entre deux feuilles de papier dans un gros livre.' },
      { text: 'Attendre quelques jours jusqu\'à ce qu\'elles soient sèches et plates.' },
      { text: 'Coller les fleurs séchées sur des cartes ou des dessins.' },
    ],
    learningGoals: ['Compréhension de la nature', 'Patience', 'Motricité fine'],
    tukiTip: 'Trier et coller les fleurs dans le Tuki — ton enfant crée sa propre image de printemps !',
  },

  'oster-memory': {
    title: 'Fabriquer un Memory de Pâques',
    subtitle: 'Créer son propre jeu de cartes avec des motifs de Pâques',
    materials: ['Carton', 'Ciseaux', 'Crayons de couleur', 'Règle', 'Autocollants'],
    steps: [
      { text: 'Découper le carton en cartes de taille égale (au moins 12 cartes).' },
      { text: 'Dessiner le même motif sur 2 cartes à chaque fois : lapin de Pâques, oeuf, poussin, fleur, nid, papillon.', tip: 'Les motifs de Pâques sont faciles à dessiner — des formes arrondies suffisent !' },
      { text: 'Laisser sécher les cartes et les retourner.' },
      { text: 'Jouer au Memory : qui trouve le plus de paires ?' },
    ],
    learningGoals: ['Mémoire', 'Motricité fine', 'Concentration'],
    tukiTip: 'Dessiner et découper les cartes dans le Tuki, puis jouer ensemble à table. Le fait maison bat le tout fait !',
  },

  'barfusspfad-fruehling': {
    title: 'Sentier pieds nus de printemps',
    subtitle: 'Sentir la nature sous ses pieds nus',
    materials: ['Herbe', 'Cailloux', 'Sable', 'Eau', 'Mousse', 'Différentes surfaces'],
    steps: [
      { text: 'Installer différentes stations dans le jardin : herbe, cailloux, sable, eau.' },
      { text: 'Enlever chaussures et chaussettes !' },
      { text: 'Marcher pieds nus de station en station.', tip: 'Fermer les yeux rend l\'expérience encore plus palpitante !' },
      { text: 'Décrire : comment ça fait ? Chaud ? Froid ? Doux ? Ça pique ?' },
    ],
    learningGoals: ['Perception sensorielle', 'Vocabulaire', 'Conscience corporelle'],
    tukiTip: 'Après le sentier pieds nus, on se lave les pieds dans le Tuki et on en parle : qu\'est-ce qui était le plus agréable ?',
  },

  'regenwurm-beobachtung': {
    title: 'À la découverte des vers de terre',
    subtitle: 'Découvrir les petites bêtes du sol',
    materials: ['Petite pelle', 'Loupe', 'Récipient transparent', 'Terre', 'Vaporisateur d\'eau'],
    steps: [
      { text: 'Après un jour de pluie, chercher dans le jardin — les vers de terre sortent à ce moment-là !' },
      { text: 'Placer délicatement un ver dans le récipient avec de la terre.' },
      { text: 'Observer à la loupe : comment se déplace-t-il ? A-t-il des yeux ?', tip: 'Les vers de terre sont inoffensifs — osez les toucher !' },
      { text: 'Après l\'observation, remettre le ver dans le jardin.' },
    ],
    learningGoals: ['Compréhension de la nature', 'Observation', 'Respect des animaux'],
    tukiTip: 'Admirer le ver à la loupe dans le Tuki. Les enfants apprennent que les petites bêtes sont importantes pour la nature !',
  },

  'osterhasen-huepfspiel': {
    title: 'Jeu de sauts du lapin de Pâques',
    subtitle: 'Sauter comme un lapin de Pâques',
    materials: ['Ruban adhésif ou craie', 'Carottes (comme but)', 'Oreilles de lapin (bricolées ou achetées)'],
    steps: [
      { text: 'Dessiner ou coller des cercles ou des cases au sol.' },
      { text: 'Mettre les oreilles de lapin — maintenant, vous êtes des lapins !' },
      { text: 'Sauter de case en case — comme un vrai lapin !', tip: 'Qui peut sauter le plus loin ? Qui saute en arrière ?' },
      { text: 'Au bout du parcours, une carotte attend en récompense.' },
    ],
    learningGoals: ['Motricité globale', 'Équilibre', 'Plaisir de bouger'],
    tukiTip: 'Après avoir sauté, préparer ensemble la récompense-carotte dans le Tuki — mouvement et cuisine réunis !',
  },
}

export const categoryInfoFr: Record<string, { label: string }> = {
  motorik: { label: 'Motricité' },
  sensorik: { label: 'Sensoriel' },
  kreativität: { label: 'Créativité' },
  sprache: { label: 'Langage' },
  mathe: { label: 'Chiffres & Logique' },
  natur: { label: 'Nature & Science' },
}
