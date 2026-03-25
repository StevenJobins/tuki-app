export interface Milestone {
  id: string
  title: string
  emoji: string
  ageMonths: [number, number]
  category: 'motorik' | 'feinmotorik' | 'sprache' | 'kognition' | 'sozial' | 'selbststaendigkeit'
  description: string
  expertTip: string
  expertName: string
  expertTitle: string
  linkedRecipes: string[]   // recipe IDs
  linkedActivities: string[] // activity IDs
  suggestedProducts: string[] // product suggestion descriptions
}

export interface AgePhase {
  id: string
  label: string
  range: [number, number] // months
  title: string
  description: string
  focusAreas: string[]
  boxName: string
  boxDescription: string
  boxItems: string[]
}

export const categoryInfo: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motorik', emoji: '🏃', color: 'bg-orange-100 text-orange-700' },
  feinmotorik: { label: 'Feinmotorik', emoji: '✋', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Sprache', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  kognition: { label: 'Kognition', emoji: '🧠', color: 'bg-purple-100 text-purple-700' },
  sozial: { label: 'Sozial', emoji: '🤝', color: 'bg-green-100 text-green-700' },
  selbststaendigkeit: { label: 'Selbstständigkeit', emoji: '⭐', color: 'bg-yellow-100 text-yellow-700' },
}

export const agePhases: AgePhase[] = [
  {
    id: 'baby',
    label: '12–18 Mon.',
    range: [12, 18],
    title: 'Kleine Entdecker',
    description: 'Dein Kind entdeckt die Welt auf zwei Beinen! Erste Schritte, erste Wörter — alles ist neu und aufregend.',
    focusAreas: ['Grobmotorik (Laufen, Klettern)', 'Erste Wörter & Sprachverständnis', 'Essen mit Händen & Becher', 'Einfaches Stapeln & Sortieren'],
    boxName: 'Entdecker-Box',
    boxDescription: 'Alles für die ersten Küchenabenteuer: Sichere Becher, weiche Löffel, Stapelschüsseln und sensorisches Spielzeug.',
    boxItems: ['Trinkbecher mit Griffen', 'Weicher Silikon-Löffel', 'Stapelbare Messbecher', 'Sensorik-Ball', 'Bilderbuch "Mein erstes Essen"'],
  },
  {
    id: 'toddler-early',
    label: '18–24 Mon.',
    range: [18, 24],
    title: 'Ich kann das selbst!',
    description: 'Die Selbstständigkeit explodiert — dein Kind will alles selbst machen. Perfekt, um es in der Küche einzubinden!',
    focusAreas: ['Selbst essen mit Besteck', 'Zwei-Wort-Sätze', 'Treppensteigen', 'Erste Rollenspiele'],
    boxName: 'Selbermacher-Box',
    boxDescription: 'Werkzeuge für kleine Selbermacher: Kindersicheres Besteck, Rührschüssel mit Saugnapf, Knetset und Sprachspiele.',
    boxItems: ['Kinderbesteck-Set', 'Rührschüssel mit Saugnapf', 'Knete-Set (natürliche Farben)', 'Bildkarten Tiere & Essen', 'Schürze mit Namen'],
  },
  {
    id: 'toddler-late',
    label: '2–3 Jahre',
    range: [24, 36],
    title: 'Kleine Küchenhelfer',
    description: 'Farben, Zahlen, Geschichten — die kognitive Entwicklung macht Riesensprünge. In der Küche wird gezählt, sortiert und gelernt.',
    focusAreas: ['Farben & Formen erkennen', 'Zählen bis 10', 'Sich teilweise selbst anziehen', 'Rennen & Hüpfen'],
    boxName: 'Küchenhelfer-Box',
    boxDescription: 'Echte Küchentools in Kindergrösse: Wellenform-Messer, Messbecher mit Zahlen, Backset und Farbsortierspiel.',
    boxItems: ['Kindermesser (wellenförmig)', 'Messbecher-Set mit Zahlen', 'Backförmchen-Set (Tiere)', 'Farbsortier-Schüsseln', 'Rezeptkarten mit Bildern'],
  },
  {
    id: 'preschool',
    label: '3–5 Jahre',
    range: [36, 60],
    title: 'Mini-Köche & Forscher',
    description: 'Schneiden, messen, wiegen — dein Kind kann jetzt richtig mitkochen. Experimente und Geschichten machen jede Mahlzeit zum Abenteuer.',
    focusAreas: ['Mit Schere & Messer schneiden', 'Buchstaben & Namen schreiben', 'Freundschaften pflegen', 'Geschichten erzählen'],
    boxName: 'Forscher-Box',
    boxDescription: 'Für kleine Wissenschaftler: Kinderschere, Waage, Experimentier-Set, Gewürz-Entdecker-Kit und Geschichten-Würfel.',
    boxItems: ['Kinderschere (abgerundet)', 'Mini-Küchenwaage', 'Gewürz-Entdecker-Set (6 Aromen)', 'Geschichten-Würfel', 'Rezeptbuch zum Selbstgestalten'],
  },
  {
    id: 'school',
    label: '5–8 Jahre',
    range: [60, 96],
    title: 'Junge Chefköche',
    description: 'Selbstständiges Kochen, eigene Rezepte erfinden, Freunde einladen — die Küche wird zum Lieblingsort.',
    focusAreas: ['Rezepte lesen & befolgen', 'Mengen & Gewichte verstehen', 'Verantwortung übernehmen', 'Teamarbeit & Teilen'],
    boxName: 'Chefkoch-Box',
    boxDescription: 'Echte Kochtools für echte Chefköche: Eigenes Kochmesser, Schürze, Rezeptordner und Zutaten für ein Signature Dish.',
    boxItems: ['Kochmesser (altersgerecht)', 'Personalisierte Schürze', 'Mein Rezeptbuch (leer)', 'Gewürzset zum Experimentieren', 'Zutaten für Signature Dish'],
  },
]

export const milestones: Milestone[] = [
  // 12-18 Monate
  {
    id: 'm1', title: 'Erste Schritte alleine', emoji: '🚶',
    ageMonths: [12, 18], category: 'motorik',
    description: 'Dein Kind läuft die ersten Schritte ohne Hilfe — wackelig, aber stolz!',
    expertTip: 'Der Tuki Learning Tower gibt Sicherheit: Dein Kind steht stabil und kann die Welt von oben entdecken, während es Gleichgewicht und Beinmuskulatur trainiert.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['bananen-pancakes', 'apfel-hafer-kekse'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Tuki Learning Tower', 'Rutschfeste Socken'],
  },
  {
    id: 'm2', title: 'Turm aus 2-3 Klötzen', emoji: '🧱',
    ageMonths: [12, 18], category: 'feinmotorik',
    description: 'Kann Bauklötze stapeln und einen kleinen Turm bauen.',
    expertTip: 'Stapeln ist eine der wichtigsten Vorläuferfertigkeiten für spätere Feinmotorik. In der Küche: Lass dein Kind Becher stapeln, Dosen sortieren — gleiche Übung, doppelter Spass!',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['mini-pizzen'],
    linkedActivities: ['sortier-spiel'],
    suggestedProducts: ['Stapelbare Messbecher', 'Holzbauklötze'],
  },
  {
    id: 'm3', title: 'Erste Wörter (5-10)', emoji: '💬',
    ageMonths: [12, 18], category: 'sprache',
    description: 'Sagt bewusst erste Wörter wie Mama, Papa, Ball, Hund.',
    expertTip: 'Beim Kochen ist jedes Lebensmittel ein neues Wort! "Schau, eine To-ma-te. Die ist rot!" Benenne alles übertrieben deutlich — dein Kind saugt Sprache auf wie ein Schwamm.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Kinderernährung & Logopädie',
    linkedRecipes: ['gemuesesticks-hummus', 'frucht-joghurt-pops'],
    linkedActivities: ['haende-waschen-lied'],
    suggestedProducts: ['Bildkarten Lebensmittel', 'Fühlbuch Küche'],
  },
  {
    id: 'm4', title: 'Aus Becher trinken', emoji: '🥤',
    ageMonths: [12, 18], category: 'selbststaendigkeit',
    description: 'Kann mit beiden Händen aus einem offenen Becher trinken.',
    expertTip: 'Offene Becher trainieren die Mundmotorik besser als Schnabelbecher! Im Tuki steht dein Kind sicher an der Arbeitsplatte und kann selbst einschenken üben.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['smoothie-bowl'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Trinkbecher mit Griffen', 'Mini-Karaffe zum Einschenken'],
  },
  // 18-24 Monate
  {
    id: 'm5', title: 'Treppe steigen (mit Hilfe)', emoji: '🪜',
    ageMonths: [18, 24], category: 'motorik',
    description: 'Geht Treppen hoch, hält sich am Geländer oder an der Hand.',
    expertTip: 'Das Treppensteigen zeigt: Die Koordination beider Körperhälften entwickelt sich. Der Tuki-Aufstieg ist perfektes Übungsfeld — sicher und mit Erfolgserlebnis oben angekommen!',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['bananen-pancakes'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Tuki Learning Tower', 'Tritthocker mit Haltegriff'],
  },
  {
    id: 'm6', title: '2-Wort-Sätze', emoji: '🗣️',
    ageMonths: [18, 24], category: 'sprache',
    description: '"Mama da", "Ball haben" — erste Zwei-Wort-Kombinationen.',
    expertTip: 'Die Sprachexplosion beginnt! Kommentiere beim Kochen alles: "Wir rühren. Rühr, rühr, rühr! Jetzt giessen wir." Handlungsbegleitendes Sprechen ist der stärkste Sprachbooster.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Kinderernährung & Logopädie',
    linkedRecipes: ['overnight-oats', 'gemuesesuppe'],
    linkedActivities: ['geschichten-kochen', 'haende-waschen-lied'],
    suggestedProducts: ['Bildkarten Verben', 'Sprachspiel-Set'],
  },
  {
    id: 'm7', title: 'Mit Löffel essen', emoji: '🥄',
    ageMonths: [18, 24], category: 'selbststaendigkeit',
    description: 'Kann selbst mit dem Löffel essen — auch wenn es kleckert!',
    expertTip: 'Kleckern gehört dazu und ist sogar wichtig! Die Hand-Mund-Koordination wird bei jedem Versuch besser. Tipp: Dickflüssige Speisen (Brei, Joghurt) sind einfacher als Suppe.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['smoothie-bowl', 'overnight-oats', 'risotto-erbsen'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Ergonomischer Kinderlöffel', 'Saugnapf-Schüssel', 'Silikon-Lätzchen'],
  },
  {
    id: 'm8', title: 'Kritzeln mit Stift', emoji: '✏️',
    ageMonths: [18, 24], category: 'feinmotorik',
    description: 'Hält einen Stift und macht bewusste Kritzelstriche.',
    expertTip: 'Der Griff entwickelt sich vom Faustgriff zum Drei-Finger-Griff. Lass dein Kind auch mit Finger in Mehl malen — gleiche motorische Übung, null Druck!',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['knete-kekse'],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Wachsmalstifte (dick)', 'Fingerfarben-Set'],
  },
  // 2-3 Jahre
  {
    id: 'm9', title: 'Rennen & Hüpfen', emoji: '🏃',
    ageMonths: [24, 36], category: 'motorik',
    description: 'Kann rennen ohne hinzufallen und versucht zu hüpfen.',
    expertTip: 'Bewegung und Kochen verbinden: "Spring zum Kühlschrank und hol die Milch!" macht aus Helfen ein Spiel und trainiert gleichzeitig die Grobmotorik.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['energy-balls', 'bananen-pancakes'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Hüpfball', 'Bewegungskarten-Set'],
  },
  {
    id: 'm10', title: 'Farben benennen', emoji: '🎨',
    ageMonths: [24, 36], category: 'kognition',
    description: 'Erkennt und benennt mindestens 3-4 Grundfarben.',
    expertTip: 'Die Küche ist ein Farbenlabor! Sortiert Obst nach Farben, besprecht die Farbe jeder Zutat. "Welche Farbe hat die Paprika?" verbindet Wissen mit Erlebnis.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['regenbogen-spiesse', 'gemuesesticks-hummus'],
    linkedActivities: ['sortier-spiel'],
    suggestedProducts: ['Farbsortier-Schüsseln', 'Regenbogen-Backförmchen'],
  },
  {
    id: 'm11', title: 'Sich teilweise anziehen', emoji: '👕',
    ageMonths: [24, 36], category: 'selbststaendigkeit',
    description: 'Kann Schuhe, Mütze oder Jacke teilweise an- und ausziehen.',
    expertTip: 'Selbstständigkeit in der Küche überträgt sich aufs Anziehen! Wer alleine rühren darf, will auch alleine Schuhe anziehen. Schürze selbst an- und ausziehen ist perfekte Übung.',
    expertName: 'Thomas Huber', expertTitle: 'Familientherapeut',
    linkedRecipes: [],
    linkedActivities: [],
    suggestedProducts: ['Kinderschürze mit Klettverschluss', 'Kochmütze'],
  },
  {
    id: 'm12', title: 'Bis 10 zählen', emoji: '🔢',
    ageMonths: [24, 36], category: 'kognition',
    description: 'Zählt (mit oder ohne Fehler) bis mindestens 10.',
    expertTip: 'Kochen ist angewandte Mathematik: "Drei Eier, bitte!" "Wir brauchen fünf Erdbeeren." Dein Kind lernt Zählen nebenbei, weil es einen echten Zweck hat.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Kinderernährung & Logopädie',
    linkedRecipes: ['mini-pizzen', 'guetzli'],
    linkedActivities: ['zaehlen-beim-kochen'],
    suggestedProducts: ['Messbecher mit Zahlen', 'Zahlen-Ausstechformen'],
  },
  // 3-5 Jahre
  {
    id: 'm13', title: 'Mit Schere schneiden', emoji: '✂️',
    ageMonths: [36, 60], category: 'feinmotorik',
    description: 'Kann mit einer Kinderschere entlang einer Linie schneiden.',
    expertTip: 'Vom Schneiden mit Schere zum Schneiden mit Messer — der gleiche motorische Ablauf! Weiche Lebensmittel (Banane, Gurke) mit dem Kindermesser sind der perfekte Übergang.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['gemuesesticks-hummus', 'regenbogen-spiesse', 'wrap-rolle'],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Kindermesser-Set (Wellenform)', 'Kinderschere (abgerundet)', 'Schneidebrett mit Rand'],
  },
  {
    id: 'm14', title: 'Namen schreiben', emoji: '📝',
    ageMonths: [36, 60], category: 'kognition',
    description: 'Schreibt (vielleicht spiegelverkehrt) den eigenen Namen.',
    expertTip: 'Buchstaben mit Keksteig formen, den Namen in Mehl schreiben — Schreiben lernen wird multisensorisch und macht Spass statt Druck.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['guetzli', 'knete-kekse'],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Buchstaben-Ausstechformen', 'Rezeptbuch zum Selbstgestalten'],
  },
  {
    id: 'm15', title: 'Freundschaften schliessen', emoji: '🤝',
    ageMonths: [36, 60], category: 'sozial',
    description: 'Spielt gezielt mit bestimmten Kindern und nennt sie "Freund".',
    expertTip: 'Gemeinsam kochen ist die beste Teamübung! Ladet Freunde zum Pizza-backen ein — teilen, abwechseln, zusammen etwas erschaffen stärkt soziale Kompetenzen.',
    expertName: 'Thomas Huber', expertTitle: 'Familientherapeut',
    linkedRecipes: ['mini-pizzen', 'popcorn-gewuerz'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: ['Koch-Party-Set (4 Schürzen)', 'Pizza-Bastel-Set'],
  },
  {
    id: 'm16', title: 'Geschichten erzählen', emoji: '📖',
    ageMonths: [36, 60], category: 'sprache',
    description: 'Kann eine einfache Geschichte in eigenen Worten nacherzählen.',
    expertTip: 'Jedes Rezept ist eine Geschichte: "Erst kam das Mehl, dann die Eier, dann haben wir gerührt und gerührt..." Nach dem Kochen: "Erzähl mal Papa, was wir gemacht haben!"',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Kinderernährung & Logopädie',
    linkedRecipes: ['overnight-oats', 'gemuesesuppe'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: ['Geschichten-Würfel', 'Rezeptkarten mit Bildern'],
  },
  // 5-8 Jahre
  {
    id: 'm17', title: 'Rezept lesen & befolgen', emoji: '📋',
    ageMonths: [60, 96], category: 'kognition',
    description: 'Kann ein einfaches Bildrezept selbstständig lesen und die Schritte befolgen.',
    expertTip: 'Lesen lernen mit Rezepten ist unschlagbar motivierend — es gibt ein leckeres Ergebnis! Bildrezepte sind der perfekte Übergang von Bild- zu Textverständnis.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['mini-pizzen', 'bananen-pancakes', 'guetzli'],
    linkedActivities: ['geschichten-kochen', 'zaehlen-beim-kochen'],
    suggestedProducts: ['Mein erstes Kochbuch', 'Rezeptordner zum Selbstfüllen'],
  },
  {
    id: 'm18', title: 'Mengen abmessen', emoji: '⚖️',
    ageMonths: [60, 96], category: 'kognition',
    description: 'Versteht Gramm, Milliliter und kann mit Waage und Messbecher umgehen.',
    expertTip: 'Backen ist angewandte Mathematik auf höchstem Niveau: Brüche (halber Becher), Gewichte (200g), Zeitrechnung (25 Minuten). Und am Ende gibt es Kuchen!',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['guetzli', 'bananen-pancakes'],
    linkedActivities: ['zaehlen-beim-kochen'],
    suggestedProducts: ['Mini-Küchenwaage', 'Messbecher-Set transparent'],
  },
  {
    id: 'm19', title: 'Verantwortung übernehmen', emoji: '💪',
    ageMonths: [60, 96], category: 'selbststaendigkeit',
    description: 'Übernimmt kleine Aufgaben zuverlässig: Tisch decken, aufräumen, Haustier füttern.',
    expertTip: 'Ein fester "Küchendienst" gibt Kindern das Gefühl, gebraucht zu werden. "Du bist heute Chef-Abwäscher!" — Verantwortung mit Stolz verbinden.',
    expertName: 'Thomas Huber', expertTitle: 'Familientherapeut',
    linkedRecipes: [],
    linkedActivities: [],
    suggestedProducts: ['Aufgabentafel Küche', 'Personalisierte Schürze'],
  },
  {
    id: 'm20', title: 'Teamwork & Teilen', emoji: '🤲',
    ageMonths: [60, 96], category: 'sozial',
    description: 'Kann mit anderen Kindern zusammenarbeiten und fair teilen.',
    expertTip: 'Koch-Projekte zu zweit oder dritt sind die beste Teamwork-Übung: Einer rührt, einer misst, einer dekoriert. Jeder hat eine wichtige Rolle.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['mini-pizzen', 'regenbogen-spiesse'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: ['Koch-Party-Set', 'Teamwork-Rezeptkarten'],
  },
]

export function getMilestonesForAge(ageMonths: number): Milestone[] {
  return milestones.filter(m => ageMonths >= m.ageMonths[0] && ageMonths < m.ageMonths[1])
}

export function getPhaseForAge(ageMonths: number): AgePhase | undefined {
  return agePhases.find(p => ageMonths >= p.range[0] && ageMonths < p.range[1])
}

export function getNextMilestones(ageMonths: number, achieved: string[]): Milestone[] {
  const current = getMilestonesForAge(ageMonths)
  return current.filter(m => !achieved.includes(m.id))
}
