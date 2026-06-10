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

  'zählen-beim-kochen': {
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
  "seifenblasen-fangen": {
    title: "Attraper des bulles",
    subtitle: "Sauter, attraper, s'émerveiller",
    materials: ["Set à bulles de savon", "Un peu d'espace (intérieur ou extérieur)"],
    steps: [
      { text: "Souffle lentement de grandes bulles." },
      { text: "Ton enfant essaie de les attraper avec les mains.", tip: "Souffle haut puis bas – ça stimule le mouvement !" },
      { text: "Comptez ensemble combien il en attrape." },
    ],
    learningGoals: ["Motricité globale", "Coordination œil-main", "Concentration"],
    tukiTip: "À l'intérieur, au-dessus d'une surface lavable – dans le Tuki, ton enfant se tient en sécurité et attrape vers le haut.",
  },
  "becher-stapeln": {
    title: "Empiler et renverser des gobelets",
    subtitle: "Construire, renverser, rire",
    materials: ["5–6 gobelets solides ou en carton"],
    steps: [
      { text: "Construisez ensemble une tour de gobelets." },
      { text: "Ton enfant la renverse – quelle joie !", tip: "Renverser est aussi important que construire." },
      { text: "Reconstruire et recommencer." },
    ],
    learningGoals: ["Motricité fine", "Comprendre cause & effet", "Patience"],
    tukiTip: "Dans le Tuki à hauteur de table, empiler est encore plus amusant.",
  },
  "barfuss-fuehlpfad": {
    title: "Parcours sensoriel pieds nus",
    subtitle: "Ressentir avec les pieds",
    materials: ["Différentes matières : serviette, éponge, feuilles, cailloux, herbe"],
    steps: [
      { text: "Dispose les matières en parcours." },
      { text: "Ton enfant marche dessus pieds nus.", tip: "Tiens-lui la main au début – ça rassure." },
      { text: "Parlez-en : doux, dur, froid, ça chatouille ?" },
    ],
    learningGoals: ["Perception sensorielle", "Équilibre", "Vocabulaire des sensations"],
    tukiTip: "À l'intérieur, le parcours se monte à tout moment – parfait les jours de pluie.",
  },
  "reis-schuettstation": {
    title: "Station à transvaser le riz",
    subtitle: "Verser, puiser, ressentir",
    materials: ["Grand saladier de riz (ou lentilles)", "Gobelets, cuillères, petits récipients"],
    steps: [
      { text: "Remplis un grand saladier de riz." },
      { text: "Ton enfant puise et transvase d'un récipient à l'autre.", tip: "Une couverture en dessous récupère l'essentiel." },
      { text: "Cachez de petits objets à retrouver." },
    ],
    learningGoals: ["Motricité fine", "Expérience sensorielle", "Découvrir les quantités"],
    tukiTip: "Dans le Tuki au plan de travail, le riz reste dans le saladier.",
  },
  "farben-sortieren": {
    title: "Trier par couleurs",
    subtitle: "Classer & nommer les couleurs",
    materials: ["Objets colorés (cubes, pompons, couvercles)", "Bols aux couleurs correspondantes"],
    steps: [
      { text: "Mélange des objets colorés dans un bol." },
      { text: "Ton enfant les trie par couleur dans les bols.", tip: "Nommez les couleurs à voix haute." },
      { text: "Pour finir : quelle couleur a le plus ?" },
    ],
    learningGoals: ["Reconnaître les couleurs", "Trier & catégoriser", "Premières notions de quantité"],
    tukiTip: "À sa hauteur dans le Tuki, ton enfant trie tout seul – ça renforce l'autonomie.",
  },
  "muster-legen": {
    title: "Créer & continuer des motifs",
    subtitle: "Reconnaître et poursuivre des suites",
    materials: ["Cubes colorés, boutons ou cailloux"],
    steps: [
      { text: "Pose une suite simple : rouge, bleu, rouge, bleu …" },
      { text: "Ton enfant continue le motif.", tip: "Commence simple, complique petit à petit." },
      { text: "Laisse ton enfant inventer son propre motif." },
    ],
    learningGoals: ["Pensée logique", "Reconnaître des motifs", "Pré-requis mathématiques"],
    tukiTip: "Dans le Tuki à table, ton enfant voit tout et se concentre bien.",
  },
  "tiergeraeusche-raten": {
    title: "Deviner les cris d'animaux",
    subtitle: "Écouter, imiter, nommer",
    materials: ["Images ou figurines d'animaux (facultatif)"],
    steps: [
      { text: "Imite un cri d'animal : « Meuh ! »" },
      { text: "Ton enfant devine de quel animal il s'agit.", tip: "Imiter fort, c'est le plus drôle !" },
      { text: "Inversez les rôles – ton enfant imite." },
    ],
    learningGoals: ["Développement du langage", "Écoute", "Nommer les animaux"],
    tukiTip: "Parfait en déplacement ou en cuisinant dans le Tuki – sans matériel.",
  },
  "reim-spiel": {
    title: "Jeu de rimes",
    subtitle: "Trouver des mots qui riment",
    materials: ["Juste vos voix"],
    steps: [
      { text: "Dis un mot, par ex. « chat »." },
      { text: "Ton enfant trouve une rime : « rat », « plat ».", tip: "Les mots rigolos comptent aussi – l'important, c'est que ça rime !" },
      { text: "Inventez ensemble un petit vers." },
    ],
    learningGoals: ["Sens de la langue", "Conscience phonologique", "Vocabulaire"],
    tukiTip: "À jouer en mettant la table dans le Tuki – le langage grandit au quotidien.",
  },
  "fingerfarben-kunst": {
    title: "Œuvre à la peinture au doigt",
    subtitle: "Patouiller, peindre, s'émerveiller",
    materials: ["Peinture au doigt non toxique", "Grande feuille", "Tablier & protection"],
    steps: [
      { text: "Prépare la feuille et les peintures." },
      { text: "Ton enfant peint librement avec les doigts.", tip: "C'est l'expérience qui compte, pas le résultat." },
      { text: "Accrochez l'œuvre pour la faire sécher." },
    ],
    learningGoals: ["Créativité", "Motricité fine", "Expérience sensorielle"],
    tukiTip: "Debout au plan de travail dans le Tuki, ton enfant peint avec tout son corps.",
  },
  "natur-mandala": {
    title: "Mandala de nature",
    subtitle: "Collecter & disposer joliment",
    materials: ["Matériaux naturels : feuilles, cailloux, fleurs, pommes de pin"],
    steps: [
      { text: "Récoltez ensemble des matériaux naturels." },
      { text: "Disposez un motif rond, de l'intérieur vers l'extérieur.", tip: "Pas de bonne façon – chaque mandala est unique." },
      { text: "Prenez une photo souvenir." },
    ],
    learningGoals: ["Créativité", "Motricité fine", "Lien avec la nature"],
    tukiTip: "Trier les trésors se fait avec concentration à la hauteur du Tuki.",
  },
  "eis-schmelz-experiment": {
    title: "Expérience : la glace fond",
    subtitle: "Explorer ce qui arrive à la glace",
    materials: ["Glaçons", "Eau chaude, sel, cuillère", "Petites figurines (à congeler, facultatif)"],
    steps: [
      { text: "Mets des glaçons dans un bol." },
      { text: "Testez : qu'est-ce qui fait fondre la glace plus vite – la main, l'eau chaude ou le sel ?", tip: "Demandez ensemble : pourquoi ?" },
      { text: "Observez et parlez du résultat." },
    ],
    learningGoals: ["Première démarche scientifique", "Cause & effet", "Vocabulaire : fondre, froid, liquide"],
    tukiTip: "Explorer en sécurité au plan de travail dans le Tuki, tout près de l'action.",
  },
  "bohne-einpflanzen": {
    title: "Planter un haricot",
    subtitle: "Semer & voir pousser",
    materials: ["Haricots secs", "Petit pot & terreau", "Eau, endroit ensoleillé"],
    steps: [
      { text: "Remplis le pot de terreau." },
      { text: "Ton enfant enfonce le haricot et arrose.", tip: "Une photo par jour montre joliment la croissance." },
      { text: "Observez chaque jour ce qui se passe." },
    ],
    learningGoals: ["Responsabilité", "Patience", "Comprendre la nature & la croissance"],
    tukiTip: "Planter se fait sans basculer à la hauteur du Tuki – et arroser devient un rituel quotidien.",
  },
  "balancier-linie": {
    title: "Ligne d'équilibre",
    subtitle: "Marcher en équilibre sur la ligne",
    materials: ["Ruban adhésif ou une corde pour une ligne au sol"],
    steps: [
      { text: "Colle une ligne droite (ou courbe) au sol." },
      { text: "Ton enfant marche dessus, bras tendus.", tip: "En avant, puis en arrière – ça augmente la difficulté." },
      { text: "Variante : porter un objet en marchant." },
    ],
    learningGoals: ["Équilibre", "Motricité globale", "Contrôle du corps"],
    tukiTip: "Idéal à l'intérieur – développe l'équilibre, utile aussi pour se tenir dans le Tuki.",
  },
  "weiches-obst-schneiden": {
    title: "Couper des fruits mous",
    subtitle: "Premières coupes au couteau enfant",
    materials: ["Fruits mous (banane, fraise, kiwi)", "Couteau adapté aux enfants", "Planche à découper"],
    steps: [
      { text: "Montre comment tenir le couteau en sécurité." },
      { text: "Ton enfant coupe les fruits mous en morceaux.", tip: "Reste toujours à côté pour aider." },
      { text: "Savourez ensemble le snack coupé maison." },
    ],
    learningGoals: ["Motricité fine", "Autonomie", "Compétences de la vie quotidienne"],
    tukiTip: "À hauteur de travail dans le Tuki, ton enfant coupe en sécurité – une vraie participation.",
  },
  "memory-alltag": {
    title: "Memory avec des objets du quotidien",
    subtitle: "Mémoriser & trouver les paires",
    materials: ["2 objets identiques du quotidien (cuillères, chaussettes, couvercles)"],
    steps: [
      { text: "Posez 4–6 paires face cachée sur la table." },
      { text: "Retournez deux objets à tour de rôle et cherchez les paires.", tip: "Commence avec peu de paires, augmente doucement." },
      { text: "Celui qui trouve une paire rejoue." },
    ],
    learningGoals: ["Mémoire", "Concentration", "Paires & quantités"],
    tukiTip: "À la table du Tuki, ton enfant participe à hauteur égale – équitable et concentré.",
  },
  "waesche-helfer": {
    title: "Trier & plier le linge",
    subtitle: "Vie pratique façon Montessori",
    materials: ["Linge fraîchement lavé", "Panier à linge"],
    steps: [
      { text: "Ton enfant trie le linge : par couleurs ou par membre de la famille." },
      { text: "Chercher les paires de chaussettes – un vrai jeu de memory.", tip: "Commencer avec 2-3 paires et augmenter peu à peu." },
      { text: "Plier les pièces simples comme les gants de toilette ou les t-shirts." },
      { text: "Ranger ensemble les piles terminées dans l'armoire." },
    ],
    learningGoals: ["Motricité fine", "Comprendre catégories & ordre", "Autonomie au quotidien"],
    tukiTip: "Les vraies tâches rendent fier : ce que ton enfant a plié lui-même, il le range avec joie. Le plan de travail du Tuki est la table à plier parfaite.",
  },
  "bewegungs-parcours": {
    title: "Parcours de motricité",
    subtitle: "Dessus, dessous, autour",
    materials: ["Coussins & couvertures", "Chaises", "Une corde ou du ruban adhésif", "Un peu d'espace"],
    steps: [
      { text: "Construisez ensemble un parcours : coussins à escalader, chaise sous laquelle ramper, corde pour faire l'équilibriste." },
      { text: "Montre une fois, puis c'est au tour de ton enfant.", tip: "En arrière ou sur la pointe des pieds, c'est plus difficile." },
      { text: "Comptez les tours ensemble – qui en réussit trois ?" },
      { text: "À la fin, ton enfant aide à démonter le parcours." },
    ],
    learningGoals: ["Motricité globale & équilibre", "Conscience du corps", "Endurance & confiance en soi"],
    tukiTip: "Les jours de pluie deviennent des jours de gym. Ensuite, le goûter bien mérité – préparé soi-même dans le Tuki, bien sûr.",
  },
  "stoff-fuehl-spiel": {
    title: "Jeu tactile des tissus",
    subtitle: "Doux, rugueux, douillet – qu'est-ce que c'est ?",
    materials: ["4-6 tissus différents (laine, éponge, soie, jean, polaire)", "Un foulard pour cacher"],
    steps: [
      { text: "Posez les tissus côte à côte et touchez-les ensemble : lequel est doux ? Lequel gratte ?" },
      { text: "Ton enfant ferme les yeux et devine quel tissu il tient dans la main.", tip: "Laisser trouver ses propres mots : douillet, glissant, qui gratte …" },
      { text: "Triez les tissus : du plus doux au plus rugueux." },
      { text: "Jeu de recherche : trouvez-vous dans la maison d'autres choses avec la même texture ?" },
    ],
    learningGoals: ["Affiner le toucher", "Vocabulaire (adjectifs)", "Comparer & classer"],
    tukiTip: "Sur le plan de travail du Tuki, tous les tissus sont à hauteur des yeux – parfait pour toucher en pleine concentration.",
  },
  "duft-memory": {
    title: "Memory des odeurs",
    subtitle: "Sentir, deviner, s'émerveiller",
    materials: ["6-8 petits pots ou gobelets", "Échantillons : cannelle, café, citron, cacao, herbes", "Foulards pour couvrir"],
    steps: [
      { text: "Remplissez ensemble les pots avec les échantillons – toujours deux avec le même contenu." },
      { text: "Ton enfant sent les yeux fermés : qu'est-ce que ça pourrait être ?", tip: "Commencer avec 3-4 odeurs connues, p.ex. citron et cacao." },
      { text: "Variante memory : trouvez les paires d'odeurs rien qu'avec le nez." },
      { text: "Parlez-en : quelle odeur préfères-tu ? À quoi te fait-elle penser ?" },
    ],
    learningGoals: ["Entraîner l'odorat", "Mémoire", "Relier langage & souvenirs"],
    tukiTip: "Ton enfant connaît les épices de la cuisine pour avoir aidé dans le Tuki – maintenant il les redécouvre avec le nez.",
  },
  "bilderbuch-detektiv": {
    title: "Détective du livre d'images",
    subtitle: "Chercher, trouver, raconter",
    materials: ["Un livre d'images préféré avec plein de détails"],
    steps: [
      { text: "Ouvrez une page bien remplie : « Qui trouve l'oiseau rouge en premier ? »" },
      { text: "Échange de rôles : ton enfant te donne des missions de recherche.", tip: "Décrire au lieu de montrer – un vrai défi pour le vocabulaire." },
      { text: "Corser les missions : « Trouves-tu quelque chose qui se mange ? »" },
      { text: "Inventez ensemble la suite de l'histoire sur la page." },
    ],
    learningGoals: ["Vocabulaire & construction de phrases", "Observation précise", "Imagination & plaisir de raconter"],
    tukiTip: "Les pauses détective s'invitent partout – même pendant que le goûter se prépare dans le Tuki : « Trouves-tu dans le livre quelque chose de jaune comme notre banane ? »",
  },
  "fluesterpost": {
    title: "Téléphone arabe",
    subtitle: "Qu'est-ce qui sortira à la fin ?",
    materials: ["Au moins 3 joueurs (la famille compte !)"],
    steps: [
      { text: "Chuchote un mot à l'oreille de ton enfant – il le chuchote au suivant." },
      { text: "La dernière personne dit tout haut ce qui est arrivé. En général : grands éclats de rire !", tip: "Commencer avec des mots simples (banane), puis essayer de courtes phrases." },
      { text: "Maintenant, c'est ton enfant qui invente un mot et lance le tour." },
      { text: "Variante : que des mots d'animaux, que des mots de nourriture – les tours à thème pimentent le jeu." },
    ],
    learningGoals: ["Écoute attentive", "Articulation claire", "Jeu social"],
    tukiTip: "Parfait en attendant que le gâteau soit prêt : téléphone arabe autour de la table, ton enfant au milieu dans le Tuki.",
  },
  "kartoffel-stempel": {
    title: "Tampons de pomme de terre",
    subtitle: "Imprimer avec des légumes",
    materials: ["2-3 grosses pommes de terre", "Peinture à doigts ou aquarelle", "Papier", "Assiette comme palette", "Tablier"],
    steps: [
      { text: "Couper les pommes de terre en deux et y sculpter des formes simples : cœur, étoile, cercle (tâche d'adulte)." },
      { text: "Ton enfant trempe le tampon dans la peinture et imprime.", tip: "D'abord essayer sur du brouillon – pour apprendre la bonne quantité de peinture." },
      { text: "Imprimer des motifs : en alternance étoile, cœur, étoile, cœur …" },
      { text: "Laisser sécher les œuvres – et voilà du papier cadeau ou une carte de vœux !" },
    ],
    learningGoals: ["Créativité", "Motricité fine & dosage de la force", "Reconnaître formes & motifs"],
    tukiTip: "Tamponner debout marche le mieux : dans le Tuki, ton enfant a la hauteur d'impression idéale et toi une surface lavable.",
  },
  "musik-schuettler": {
    title: "Fabriquer des maracas",
    subtitle: "Du riz devient un instrument",
    materials: ["Bouteilles vides ou boîtes avec couvercle", "Riz, lentilles, haricots secs", "Ruban adhésif", "En option : autocollants pour décorer"],
    steps: [
      { text: "Ton enfant verse du riz ou des lentilles dans les bouteilles – chaque remplissage sonne différemment.", tip: "Un entonnoir ou une cuillère aide à viser. Ce qui se renverse fait partie du jeu !" },
      { text: "Bien fermer le couvercle et le sécuriser avec du ruban adhésif." },
      { text: "Concert de maracas : doucement comme une souris, fort comme un orage." },
      { text: "Secouer en rythme sur les chansons préférées." },
    ],
    learningGoals: ["Sens du rythme", "Motricité fine (verser & viser)", "Cause & effet : remplissage = son"],
    tukiTip: "Verser, c'est de toute façon l'activité préférée dans le Tuki – ici, ça devient tout de suite un orchestre.",
  },
  "nudel-faedeln": {
    title: "Colliers de pâtes",
    subtitle: "Enfiler, compter, créer des motifs",
    materials: ["Pâtes tubes (penne, rigatoni)", "Une ficelle solide", "En option : colorant alimentaire"],
    steps: [
      { text: "Rigidifier le bout de la ficelle avec du ruban adhésif – plus facile à enfiler." },
      { text: "Ton enfant enfile les pâtes une à une sur la ficelle.", tip: "Pour les plus petits, prendre des rigatoni – le grand trou facilite les choses." },
      { text: "Comptez à voix haute en enfilant : un, deux, trois …" },
      { text: "Créer des motifs : deux claires, une foncée, deux claires … Qu'est-ce qui vient ensuite ?" },
      { text: "Nouer les extrémités – le collier de pâtes est prêt !" },
    ],
    learningGoals: ["Motricité fine & coordination œil-main", "Compter & quantités", "Reconnaître et continuer des motifs"],
    tukiTip: "Enfiler avec concentration marche super bien debout – dans le Tuki, aucune pâte ne roule par terre, tout reste à hauteur des yeux.",
  },
  "vogelfutter-anhaenger": {
    title: "Suspensions pour oiseaux",
    subtitle: "Fait maison pour les invités affamés",
    materials: ["250 g de graisse de coco", "300 g de mélange de graines pour oiseaux", "Emporte-pièces ou tasses", "Ficelle", "Paille (pour le trou)"],
    steps: [
      { text: "Faire fondre la graisse de coco à feu doux (tâche d'adulte)." },
      { text: "Ton enfant mélange les graines à la graisse.", tip: "Remuer quand c'est légèrement refroidi – ça n'éclabousse pas." },
      { text: "Verser dans les moules et planter un bout de paille pour le trou." },
      { text: "Mettre au frais, démouler et passer une ficelle." },
      { text: "Suspendre dehors et observer depuis la fenêtre : qui vient en visite ?" },
    ],
    learningGoals: ["Découvrir nature & animaux", "Prendre des responsabilités", "Patience & observation"],
    tukiTip: "On mélange et on remplit dans le Tuki – et l'observation des oiseaux devient ensuite le rituel quotidien à la fenêtre.",
  },

}

export const categoryInfoFr: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motricité', emoji: '🏃', color: 'bg-orange-100 text-orange-700' },
  sensorik: { label: 'Sensoriel', emoji: '👐', color: 'bg-purple-100 text-purple-700' },
  kreativität: { label: 'Créativité', emoji: '🎨', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Langage', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  mathe: { label: 'Chiffres & Logique', emoji: '🔢', color: 'bg-green-100 text-green-700' },
  natur: { label: 'Nature & Science', emoji: '🌿', color: 'bg-emerald-100 text-emerald-700' },
}
