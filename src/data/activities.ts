import { Activity } from '../types';

export const activities: Activity[] = [
  {
    id: 'water-pouring',
    title: {
      de: "Wasser gießen",
      en: "Water Pouring",
      fr: "Verser de l'eau"
    },
    description: {
      de: "Das Kind übt, Wasser aus einem kleinen Krug in ein Glas zu gießen. Fördert Feinmotorik und Konzentration.",
      en: "The child practices pouring water from a small pitcher into a glass. Develops fine motor skills and concentration.",
      fr: "L'enfant pratique le versement d'eau d'une petite cruche dans un verre. Développe la motricité fine et la concentration."
    },
    ageRange: "2-4",
    category: "motor",
    image: "/assets/activity-water.jpg",
    materials: ["Kleiner Krug", "Glas", "Wasser", "Handtuch"],
    steps: {
      de: [
        "Stelle Krug und Glas bereit",
        "Zeige dem Kind, wie man den Krug anfasst",
        "Wasser langsam ins Glas gießen",
"Bei Überguss mit Handtuch aufwischen",
        "Prozess wiederholen"
      ],
      en: [
"Set up pitcher and glass",
        "Show child how to hold pitcher",
        "Slowly pour water into glass",
        "Wipe spills with towel",
        "Repeat the process"
      ],
      fr: [
        "Préparer la cruche et le verre",
        "Montrer à l'enfant comment tenir la cruche",
        "Verser lentement l'eau dans le verre",
        "Essuyer les déversements avec une serviette",
        "Répéter le processus"
      ]
    },
    benefits: {
      de: [
        "Verbessert Hand-Koordination",
        "Fördert Konzentration",
        "Lehrt Selbstständigkeit",
        "Stärkt Handmuskulatur"
      ],
      en: [
        "Improves hand coordination",
        "Develops concentration",
        "Teaches independence",
        "Strengthens hand muscles"
      ],
      fr: [
        "Améliore la coordination main-œil",
        "Développe la concentration",
        "Enseigne l'indépendance",
        "Renforce les muscles de la main"
      ]
    },
    variations: {
      de: [
        "Mit verschiedenen Krügen üben",
        "Trockenes Gießen mit Linsen",
        "Farbwasser mischen"
      ],
      en: [
        "Practice with different pitchers",
        "Dry pouring with lentils",
        "Mix colored water"
      ],
      fr: [
        "S'entraîner avec différentes cruches",
        "Verser à sec avec des lentilles",
        "Mélanger de l'eau colorée"
      ]
    },
    duration: "10-15 min",
    difficulty: "easy",
    skills: ["Feinmotorik", "Konzentration", "Selbstständigkeit"]
  },
  {
    id: 'sensory-rice',
    title: {
      de: "Sensorische Reisbox",
      en: "Sensory Rice Bin",
      fr: "Boîte sensorielle de riz"
    },
    description: {
      de: "Eine Box gefüllt mit Reis, versteckten Spielzeugen und Schaufeln für taktile Entdeckung.",
      en: "A box filled with rice, hidden toys and scoops for tactile discovery.",
      fr: "Une boîte remplie de riz, jouets cachés et pelles pour la découverte tactile."
    },
    ageRange: "0-2",
    category: "sensory",
    image: "/assets/activity-rice.jpg",
    materials: ["Plastikbox", "Reis", "Verschiedene Spielzeuge", "Schaufel", "Eimer"],
    steps: {
      de: [
        "Box mit ungefärbtem Reis füllen",
        "Spielzeuge im Reis verstecken",
        "Schaufel und Eimer bereitstellen",
        "Kind entdecken lassen",
        "Gemeinsam suchen und benennen"
      ],
      en: [
        "Fill box with plain rice",
        "Hide toys in the rice",
        "Provide scoop and bucket",
        "Let child explore freely",
        "Search and name together"
      ],
      fr: [
        "Remplir la boîte de riz nature",
        "Cacher des jouets dans le riz",
        "Fournir pelle et seau",
        "Laisser l'enfant explorer",
        "Chercher et nommer ensemble"
      ]
    },
    benefits: {
      de: [
        "Fordert taktile Sinne",
        "Fördert Entdeckungsfreude",
        "Verbessert Feingefühl",
        "Beruhigende Aktivität"
      ],
      en: [
        "Stimulates tactile senses",
        "Encourages discovery",
        "Improves fine touch",
        "Calming activity"
      ],
      fr: [
        "Stimule les sens tactiles",
        "Encourage la découverte",
        "Améliore le toucher fin",
        "Activité apaisante"
      ]
    },
    variations: {
      de: [
        "Reis einfärben",
        "Mit Pasta variieren",
        "Verschiedene Texturen mischen"
      ],
      en: [
        "Color the rice",
        "Try pasta instead",
        "Mix different textures"
      ],
      fr: [
        "Colorer le riz",
        "Essayer avec des pâtes",
        "Mélanger différentes textures"
      ]
    },
    duration: "20-30 min",
    difficulty: "easy",
    skills: ["Sensorik", "Feinmotorik", "Sprache"]
  },
  {
    id: 'button-sorting',
    title: {
      de: "Knöpfe sortieren",
      en: "Button Sorting",
      fr: "Tri de boutons"
    },
    description: {
      de: "Knöpfe nach Farbe, Grösse oder Form sortieren. Klassische Montessori-Aktivität.",
      en: "Sort buttons by color, size or shape. Classic Montessori activity.",
      fr: "Trier des boutons par couleur, taille ou forme. Activité Montessori classique."
    },
    ageRange: "2-4",
    category: "cognitive",
    image: "/assets/activity-buttons.jpg",
    materials: ["Verschiedene Knöpfe", "Sortierschalen", "Tisch"],
    steps: {
      de: [
        "Knöpfe und Schalen bereitstellen",
        "Eine Kategorie zeigen (z.B. Farbe)",
        "Kind sortieren lassen",
        "Neue Kategorien einführen",
        "Gemeinsam überprüfen"
      ],
      en: [
        "Provide buttons and bowls",
        "Show one category (e.g., color)",
        "Let child sort independently",
        "Introduce new categories",
        "Check together"
      ],
      fr: [
        "Fournir boutons et bols",
        "Montrer une catégorie (ex: couleur)",
        "Laisser l'enfant trier seul",
        "Introduire nouvelles catégories",
        "Vérifier ensemble"
      ]
    },
    benefits: {
      de: [
        "Fördert Kategorisierung",
        "Verbessert Farberkennung",
        "Entwickelt logisches Denken",
        "Stärkt Feinmotorik"
      ],
      en: [
        "Develops categorization",
        "Improves color recognition",
        "Builds logical thinking",
        "Strengthens fine motor"
      ],
      fr: [
        "Développe la catégorisation",
        "Améliore reconnaissance couleurs",
        "Construit pensée logique",
        "Renforce motricité fine"
      ]
    },
    variations: {
      de: [
        "Nach Lochanzahl sortieren",
        "Muster legen",
        "Faden durch Löcher"
      ],
      en: [
        "Sort by button holes",
        "Create patterns",
        "Thread through holes"
      ],
      fr: [
        "Trier par trous",
        "Créer des motifs",
        "Enfiler dans trous"
      ]
    },
    duration: "15-20 min",
    difficulty: "medium",
    skills: ["Kognitive Fähigkeiten", "Farben", "Logisches Denken"]
  },
  {
    id: 'counting-beads',
    title: {
      de: "Perlen zählen",
      en: "Counting Beads",
      fr: "Comptage de perles"
    },
    description: {
      de: "Perlen auf ein Band fädeln und dabei zählen. Frühe Mathematik spielerisch lernen.",
      en: "Thread beads onto a string while counting. Learn early math through play.",
      fr: "Enfiler des perles en comptant. Apprendre les mathématiques par le jeu."
    },
    ageRange: "4