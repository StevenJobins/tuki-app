export interface Activity {
  id: string
  title: string
  subtitle: string
  emoji: string
  image: string
  duration: number
  ageRange: [number, number]
  category: 'motorik' | 'sensorik' | 'kreativität' | 'sprache' | 'mathe' | 'natur'
  difficulty: 'leicht' | 'mittel' | 'fortgeschritten'
  materials: string[]
  steps: { text: string; tip?: string }[]
  learningGoals: string[]
  tukiTip: string
  season: ('frühling' | 'sommer' | 'herbst' | 'winter' | 'ganzjährig')[]
  stars: number
}

export const categoryInfo: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motorik', emoji: '🤸', color: 'bg-orange-100 text-orange-700' },
  sensorik: { label: 'Sensorik', emoji: '🖐️', color: 'bg-purple-100 text-purple-700' },
  kreativität: { label: 'Kreativität', emoji: '🎨', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Sprache', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  mathe: { label: 'Zahlen & Logik', emoji: '🔢', color: 'bg-green-100 text-green-700' },
  natur: { label: 'Natur & Wissen', emoji: '🌱', color: 'bg-emerald-100 text-emerald-700' },
}

export const activities: Activity[] = [
  {
    id: 'wasser-giessen',
    title: 'Wasser giessen & messen',
    subtitle: 'Spielerisch Mengen verstehen',
    emoji: '💧',
    image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b0?w=600&h=400&fit=crop',
    duration: 15,
    ageRange: [1, 4],
    category: 'sensorik',
    difficulty: 'leicht',
    materials: ['Verschiedene Becher & Gefässe', 'Wasser', 'Handtuch für Spritzer', 'Optional: Lebensmittelfarbe'],
    steps: [
      { text: 'Stelle verschiedene Becher und Schüsseln auf die Arbeitsfläche.' },
      { text: 'Fülle einen Krug mit Wasser (optional mit Lebensmittelfarbe).', tip: 'Farbe macht es spannender und hilft beim Beobachten!' },
      { text: 'Dein Kind giesst das Wasser von einem Gefäss ins andere.' },
      { text: 'Sprecht zusammen: Welches ist voll? Welches leer? Welches hat mehr?' },
    ],
    learningGoals: ['Feinmotorik & Koordination', 'Mengenverständnis (voll/leer/mehr/weniger)', 'Konzentration & Geduld', 'Sensorische Erfahrung'],
    tukiTip: 'Im Tuki steht dein Kind perfekt am Waschbecken oder an der Arbeitsfläche. Leg ein Handtuch unter — ein bisschen Matschen gehört dazu!',
    season: ['ganzjährig'],
    stars: 1,
  },
  {
    id: 'kräuter-garten',
    title: 'Kräuter-Garten am Fenster',
    subtitle: 'Säen, giessen, wachsen sehen',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
    duration: 30,
    ageRange: [2, 8],
    category: 'natur',
    difficulty: 'mittel',
    materials: ['Kleine Töpfe oder Eierkarton', 'Erde', 'Kräutersamen (Kresse, Basilikum, Schnittlauch)', 'Wasser & kleine Giesskanne', 'Löffel'],
    steps: [
      { text: 'Töpfe mit Erde füllen — Löffel für Löffel.', tip: 'Kinder lieben das Schaufeln. Zeitung unterlegen!' },
      { text: 'Samen auf die Erde streuen und leicht andrücken.' },
      { text: 'Vorsichtig giessen — nicht zu viel!' },
      { text: 'Ans Fensterbrett stellen und jeden Tag gemeinsam schauen, was passiert.' },
      { text: 'Wenn die Kräuter gewachsen sind: Zusammen ernten und in einem Rezept verwenden!' },
    ],
    learningGoals: ['Naturverständnis & Geduld', 'Verantwortung übernehmen', 'Beobachten & Dokumentieren', 'Zusammenhänge verstehen (Wasser → Wachstum)'],
    tukiTip: 'Am Küchenfenster im Tuki stehend kann dein Kind täglich sein Kräuterbeet pflegen. Macht ein Wachstums-Tagebuch zusammen!',
    season: ['frühling', 'sommer'],
    stars: 2,
  },
  {
    id: 'sortier-spiel',
    title: 'Das grosse Sortierspiel',
    subtitle: 'Farben, Formen & Grössen ordnen',
    emoji: '🔴',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop',
    duration: 15,
    ageRange: [1, 3],
    category: 'mathe',
    difficulty: 'leicht',
    materials: ['Schüsseln in verschiedenen Farben', 'Alltagsgegenstände zum Sortieren: Obst, Spielzeug, Wäscheklammern', 'Muffin-Form (optional)'],
    steps: [
      { text: 'Verschiedene Schüsseln auf die Arbeitsfläche stellen.' },
      { text: 'Gegenstände bereitstellen: Buntes Obst, Wäscheklammern, Bauklötze...' },
      { text: 'Sortieraufgabe geben: Alles Rote hierhin, alles Grüne dorthin!', tip: 'Beginne mit 2 Farben, steigere langsam auf 3-4.' },
      { text: 'Variante: Nach Grösse sortieren (gross/klein) oder nach Form (rund/eckig).' },
    ],
    learningGoals: ['Farberkennung', 'Kategorisieren & logisches Denken', 'Feinmotorik', 'Sprachentwicklung (Farbnamen, Adjektive)'],
    tukiTip: 'Die Küchenarbeitsfläche wird zum Lerntisch! Im Tuki hat dein Kind genug Platz und die richtige Höhe zum Sortieren.',
    season: ['ganzjährig'],
    stars: 1,
  },
  {
    id: 'knete-selber-machen',
    title: 'Knete selber machen',
    subtitle: 'Mischen, kneten, kreativ sein',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    duration: 25,
    ageRange: [2, 6],
    category: 'kreativität',
    difficulty: 'mittel',
    materials: ['200g Mehl', '100g Salz', '2 EL Öl', '200ml Wasser', 'Lebensmittelfarbe', 'Schüssel & Löffel'],
    steps: [
      { text: 'Mehl und Salz in einer grossen Schüssel mischen.' },
      { text: 'Öl und Wasser dazugeben.', tip: 'Dein Kind kann das Wasser abmessen — mit einem Messbecher!' },
      { text: 'Alles gut durchkneten bis ein glatter Teig entsteht.' },
      { text: 'Teig aufteilen und mit Lebensmittelfarbe einfärben.' },
      { text: 'Jetzt wird geformt! Tiere, Buchstaben, Fantasie-Figuren...', tip: 'Kekausstecher, Nudelholz und Gabel als Werkzeuge anbieten!' },
    ],
    learningGoals: ['Kreatives Gestalten', 'Feinmotorik & Handkraft', 'Abmessen & Zählen', 'Farben mischen & benennen'],
    tukiTip: 'Kneten auf Augenhöhe im Tuki — dein Kind hat die perfekte Arbeitshaltung. Die selbstgemachte Knete hält im Kühlschrank 2-3 Wochen!',
    season: ['ganzjährig'],
    stars: 2,
  },
  {
    id: 'haende-waschen-lied',
    title: 'Das Händewasch-Lied',
    subtitle: 'Hygiene spielerisch lernen',
    emoji: '🧼',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
    duration: 5,
    ageRange: [1, 4],
    category: 'sprache',
    difficulty: 'leicht',
    materials: ['Seife (kinderfreundlich)', 'Handtuch', 'Optional: Sanduhr (30 Sekunden)'],
    steps: [
      { text: 'Zusammen ans Waschbecken stellen — Tuki auf die richtige Höhe!' },
      { text: 'Hände nass machen und einseifen.' },
      { text: 'Während dem Waschen zusammen singen: "Hände waschen, Hände waschen, muss ein jedes Kind..."', tip: 'Das Lied dauert ca. 30 Sekunden — perfekt für gründliches Waschen!' },
      { text: 'Zwischen den Fingern, unter den Nägeln, die Daumen nicht vergessen!' },
      { text: 'Abspülen, abtrocknen und stolz sein!' },
    ],
    learningGoals: ['Hygiene-Routine aufbauen', 'Sprachentwicklung durch Singen', 'Selbstständigkeit', 'Körperbewusstsein'],
    tukiTip: 'Der Tuki am Waschbecken ist einer der häufigsten Einsätze! Dein Kind lernt Selbstständigkeit bei der täglichen Routine.',
    season: ['ganzjährig'],
    stars: 1,
  },
  {
    id: 'herbst-blätter',
    title: 'Herbstblätter-Kunstwerk',
    subtitle: 'Sammeln, pressen, gestalten',
    emoji: '🍂',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    duration: 45,
    ageRange: [2, 7],
    category: 'kreativität',
    difficulty: 'mittel',
    materials: ['Gesammelte Herbstblätter', 'Papier oder Karton', 'Kleber', 'Wachsmalstifte', 'Optional: Laminiergerät'],
    steps: [
      { text: 'Erst raus in die Natur: Verschiedene Blätter sammeln!', tip: 'Achtet auf verschiedene Farben, Formen und Grössen.' },
      { text: 'Blätter zwischen Büchern kurz pressen (1-2 Tage) oder direkt verwenden.' },
      { text: 'Auf Papier kleben und ein Bild gestalten: Tiere aus Blättern, Bäume, Mandalas...' },
      { text: 'Mit Wachsmalstiften ergänzen und Details malen.' },
      { text: 'Das Kunstwerk aufhängen und bewundern!' },
    ],
    learningGoals: ['Naturverständnis', 'Feinmotorik (Kleben, Malen)', 'Kreative Gestaltung', 'Farben & Formen in der Natur erkennen'],
    tukiTip: 'Im Tuki kann dein Kind bequem am Küchentisch oder an der Arbeitsfläche sein Blätter-Kunstwerk gestalten. Hängt es danach gemeinsam auf!',
    season: ['herbst'],
    stars: 2,
  },
  {
    id: 'zählen-beim-kochen',
    title: 'Zählen beim Kochen',
    subtitle: 'Mathe ganz natürlich lernen',
    emoji: '🔢',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    duration: 15,
    ageRange: [2, 5],
    category: 'mathe',
    difficulty: 'leicht',
    materials: ['Obst oder Gemüse zum Zählen', 'Schüsseln', 'Ein einfaches Rezept'],
    steps: [
      { text: 'Wählt zusammen ein einfaches Rezept aus.' },
      { text: 'Zutaten zählen: "Wir brauchen DREI Eier. Zählst du mit?"' },
      { text: 'Löffel abzählen: "Zwei Löffel Mehl — eins... zwei!"', tip: 'Übertrieben mitzählen und Begeisterung zeigen!' },
      { text: 'Ergebnis bestaunen: "Wow, aus 5 Zutaten haben wir etwas Leckeres gemacht!"' },
    ],
    learningGoals: ['Zahlverständnis (1-10)', 'Mengenvorstellung', 'Eins-zu-Eins-Zuordnung', 'Mathe im Alltag erleben'],
    tukiTip: 'Beim Kochen im Tuki ergibt sich Mathe ganz natürlich. Zählen, messen, vergleichen — alles Teil des Küchenerlebnisses.',
    season: ['ganzjährig'],
    stars: 1,
  },
  {
    id: 'geschichten-kochen',
    title: 'Geschichten-Küche',
    subtitle: 'Kochen & dabei Geschichten erzählen',
    emoji: '📖',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    duration: 20,
    ageRange: [3, 7],
    category: 'sprache',
    difficulty: 'mittel',
    materials: ['Ein einfaches Rezept', 'Fantasie!'],
    steps: [
      { text: 'Startet mit einem Rezept eurer Wahl.' },
      { text: 'Erfindet eine Geschichte zu jeder Zutat: "Die kleine Tomate rollte vom Berg ins Tal..."' },
      { text: 'Dein Kind erzählt weiter: Was passiert als nächstes?', tip: 'Es gibt kein Richtig oder Falsch — jede Geschichte ist toll!' },
      { text: 'Während dem Kochen wird die Geschichte fortgesetzt.' },
      { text: 'Am Ende: Die Geschichte beim Essen noch einmal zusammen nacherzählen.' },
    ],
    learningGoals: ['Wortschatz erweitern', 'Fantasie & Erzählkompetenz', 'Satzbau üben', 'Zusammenhänge herstellen'],
    tukiTip: 'Im Tuki auf Augenhöhe erzählt es sich am besten — dein Kind fühlt sich als gleichwertiger Geschichten-Partner!',
    season: ['ganzjährig'],
    stars: 2,
  },
]

export function getActivityById(id: string): Activity | undefined {
  return activities.find(a => a.id === id)
}

export function getActivitiesByCategory(category: string): Activity[] {
  return activities.filter(a => a.category === category)
}

export function getActivitiesByAge(age: number): Activity[] {
  return activities.filter(a => age >= a.ageRange[0] && age <= a.ageRange[1])
}
