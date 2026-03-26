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
  suggestedProducts: string[] // product suggestion descriptions — only when truly relevant
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
    focusAreas: ['Laufen & Klettern', 'Erste Wörter', 'Greifen & Stapeln', 'Selbst essen & trinken'],
    boxName: 'Entdecker-Box',
    boxDescription: 'Sorgfältig ausgewählte Materialien für die ersten grossen Schritte — Sinne anregen, Motorik fördern, Neugier wecken.',
    boxItems: ['Tuki Learning Tower (Naturholz)', 'Regenbogen-Stapler aus Lindenholz', 'Montessori Greiflinge aus Buchenholz', 'Sensorik-Spieltuch aus Bio-Baumwolle', 'Trinkbecher-Set (BPA-frei, ergonomisch)'],
  },
  {
    id: 'toddler-early',
    label: '18–24 Mon.',
    range: [18, 24],
    title: 'Ich kann das selbst!',
    description: 'Die Selbstständigkeit explodiert — dein Kind will alles alleine machen. Zeit, ihm die richtigen Werkzeuge zu geben.',
    focusAreas: ['Selbstständig essen', 'Zwei-Wort-Sätze', 'Treppensteigen', 'Erste Rollenspiele'],
    boxName: 'Selbermacher-Box',
    boxDescription: 'Alles, damit dein Kind selbst aktiv werden kann — vom eigenen Besteck bis zum ersten Kreativset.',
    boxItems: ['Montessori Kinderbesteck aus Edelstahl', 'Bienenwachs-Kreidestifte (ergonomisch)', 'Pflanzliche Spielknete aus Naturfarben', 'Montessori Einsteckpuzzle aus Holz', 'Montessori Bildkarten-Set (real-fotografisch)'],
  },
  {
    id: 'toddler-late',
    label: '2–3 Jahre',
    range: [24, 36],
    title: 'Kleine Forscher',
    description: 'Farben, Zahlen, Geschichten — die kognitive Entwicklung macht Riesensprünge. Jeder Tag bringt neue Entdeckungen.',
    focusAreas: ['Farben & Formen', 'Zählen lernen', 'Anziehen üben', 'Rennen & Hüpfen'],
    boxName: 'Forscher-Box',
    boxDescription: 'Materialien zum Sortieren, Entdecken und Staunen — alles auf natürliche Entwicklung abgestimmt.',
    boxItems: ['Montessori Farbsortierbrett aus Eschenholz', 'Montessori Büchergestell (Wandregal)', 'Holz-Lupe & Natursammelbox', 'Zahlenstangen aus Buchenholz (1–10)', 'Jahreszeiten-Puzzle aus Holz'],
  },
  {
    id: 'preschool',
    label: '3–5 Jahre',
    range: [36, 60],
    title: 'Kreative Köpfe',
    description: 'Schneiden, basteln, Geschichten erfinden — dein Kind entwickelt echte Kompetenzen und will zeigen, was es kann.',
    focusAreas: ['Schneiden & Basteln', 'Buchstaben entdecken', 'Freundschaften pflegen', 'Geschichten erzählen'],
    boxName: 'Kreativ-Box',
    boxDescription: 'Werkzeuge für kleine Kreative: Basteln, Experimentieren, Lesen — alles, was die Vorschulzeit bereichert.',
    boxItems: ['Montessori Kinderschere (echtes Schneiden)', 'Natur-Experimentierset mit Holzzubehör', 'Geschichten-Würfel aus Holz', 'Montessori Sandpapier-Buchstaben', 'Aquarell-Malset mit Naturpigmenten'],
  },
  {
    id: 'school',
    label: '5–8 Jahre',
    range: [60, 96],
    title: 'Selbstbewusste Macher',
    description: 'Lesen, planen, Verantwortung übernehmen — dein Kind wird immer eigenständiger und will ernst genommen werden.',
    focusAreas: ['Lesen & Schreiben', 'Mengen & Messen', 'Verantwortung übernehmen', 'Teamarbeit'],
    boxName: 'Macher-Box',
    boxDescription: 'Für Kinder, die selbst entscheiden wollen: Echte Werkzeuge, spannende Projekte, eigene Verantwortung.',
    boxItems: ['Leder-Tagebuch mit Holzstift', 'Montessori Wochenplaner für Kinder', 'MINT-Experimentierset (Holz & Glas)', 'Weltkarte aus Holz (Montessori-Stil)', 'Tuki Kindermesser aus Edelstahl'],
  },
]

export const milestones: Milestone[] = [
  // 12-18 Monate
  {
    id: 'm1', title: 'Erste Schritte alleine', emoji: '🚶',
    ageMonths: [12, 18], category: 'motorik',
    description: 'Dein Kind läuft die ersten Schritte ohne Hilfe — wackelig, aber stolz!',
    expertTip: 'Barfusslaufen auf verschiedenen Untergründen (Gras, Sand, Teppich) stärkt die Fussmuskulatur und das Gleichgewicht. Der Tuki Learning Tower gibt zusätzlich Sicherheit beim Stehen und Entdecken auf Augenhöhe.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['bananen-pancakes'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Tuki Learning Tower'],
  },
  {
    id: 'm2', title: 'Turm aus 2-3 Klötzen', emoji: '🧱',
    ageMonths: [12, 18], category: 'feinmotorik',
    description: 'Kann Bauklötze stapeln und einen kleinen Turm bauen.',
    expertTip: 'Stapeln trainiert räumliches Denken und Auge-Hand-Koordination gleichzeitig. Biete verschiedene Materialien an: Holzklötze, Becher, Dosen — Vielfalt macht den Unterschied.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: [],
    linkedActivities: ['sortier-spiel'],
    suggestedProducts: ['Regenbogen-Stapler aus Lindenholz'],
  },
  {
    id: 'm3', title: 'Erste Wörter (5-10)', emoji: '💬',
    ageMonths: [12, 18], category: 'sprache',
    description: 'Sagt bewusst erste Wörter wie Mama, Papa, Ball, Hund.',
    expertTip: 'Benenne alles im Alltag langsam und deutlich: beim Essen, Spazieren, Baden. Jede Alltagssituation ist ein Sprachbad. Bilderbücher mit echten Fotos sind besonders wirkungsvoll.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Logopädin & Sprachtherapeutin',
    linkedRecipes: [],
    linkedActivities: ['haende-waschen-lied'],
    suggestedProducts: ['Montessori Bildkarten-Set (real-fotografisch)'],
  },
  {
    id: 'm4', title: 'Aus Becher trinken', emoji: '🥤',
    ageMonths: [12, 18], category: 'selbststaendigkeit',
    description: 'Kann mit beiden Händen aus einem offenen Becher trinken.',
    expertTip: 'Offene Becher fördern die Mundmotorik viel besser als Schnabelbecher. Starte mit wenig Flüssigkeit und einem kleinen, leichten Becher mit zwei Griffen.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['smoothie-bowl'],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Trinkbecher-Set (BPA-frei, ergonomisch)'],
  },
  // 18-24 Monate
  {
    id: 'm5', title: 'Treppe steigen (mit Hilfe)', emoji: '🪜',
    ageMonths: [18, 24], category: 'motorik',
    description: 'Geht Treppen hoch, hält sich am Geländer oder an der Hand.',
    expertTip: 'Treppensteigen zeigt, dass die Koordination beider Körperhälften wächst. Lass dein Kind üben, aber immer mit Sicherung. Der Tuki Learning Tower bietet ähnliches Klettertraining in sicherer Umgebung.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: [],
    linkedActivities: ['wasser-giessen'],
    suggestedProducts: ['Tuki Learning Tower'],
  },
  {
    id: 'm6', title: '2-Wort-Sätze', emoji: '🗣️',
    ageMonths: [18, 24], category: 'sprache',
    description: '"Mama da", "Ball haben" — erste Zwei-Wort-Kombinationen.',
    expertTip: 'Die Sprachexplosion beginnt! Handlungsbegleitendes Sprechen ist der stärkste Booster: "Wir waschen die Hände. Wir ziehen die Schuhe an." Kommentiere deinen Alltag.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Logopädin & Sprachtherapeutin',
    linkedRecipes: ['overnight-oats'],
    linkedActivities: ['geschichten-kochen', 'haende-waschen-lied'],
    suggestedProducts: [],
  },
  {
    id: 'm7', title: 'Mit Löffel essen', emoji: '🥄',
    ageMonths: [18, 24], category: 'selbststaendigkeit',
    description: 'Kann selbst mit dem Löffel essen — auch wenn es kleckert!',
    expertTip: 'Kleckern gehört dazu und ist sogar wichtig! Die Hand-Mund-Koordination wird mit jedem Versuch besser. Dickflüssige Speisen sind einfacher als Suppe — starte damit.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['smoothie-bowl', 'overnight-oats'],
    linkedActivities: [],
    suggestedProducts: ['Montessori Kinderbesteck aus Edelstahl'],
  },
  {
    id: 'm8', title: 'Kritzeln mit Stift', emoji: '✏️',
    ageMonths: [18, 24], category: 'feinmotorik',
    description: 'Hält einen Stift und macht bewusste Kritzelstriche.',
    expertTip: 'Der Griff entwickelt sich vom Faustgriff zum Drei-Finger-Griff. Biete verschiedene Materialien an: dicke Wachsmalstifte, Fingerfarben, mit dem Finger in Sand malen.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: [],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Bienenwachs-Kreidestifte (ergonomisch)'],
  },
  // 2-3 Jahre
  {
    id: 'm9', title: 'Rennen & Hüpfen', emoji: '🏃',
    ageMonths: [24, 36], category: 'motorik',
    description: 'Kann rennen ohne hinzufallen und versucht zu hüpfen.',
    expertTip: 'Kinder brauchen mindestens 3 Stunden Bewegung täglich. Baue Bewegung in den Alltag ein: "Spring zum Briefkasten!", "Wer ist schneller im Bad?" — Spiel statt Sport.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['energy-balls'],
    linkedActivities: [],
    suggestedProducts: ['Balancierbrett aus Buchenholz'],
  },
  {
    id: 'm10', title: 'Farben benennen', emoji: '🎨',
    ageMonths: [24, 36], category: 'kognition',
    description: 'Erkennt und benennt mindestens 3-4 Grundfarben.',
    expertTip: 'Farben lernt man am besten im Alltag: Obst sortieren, Socken nach Farben ordnen, "Ich sehe was, was du nicht siehst" spielen. Kein Drill — nur spielerisches Benennen.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['regenbogen-spiesse'],
    linkedActivities: ['sortier-spiel'],
    suggestedProducts: ['Montessori Farbsortierbrett aus Eschenholz'],
  },
  {
    id: 'm11', title: 'Bücher selbst aussuchen', emoji: '📚',
    ageMonths: [24, 36], category: 'selbststaendigkeit',
    description: 'Wählt Bücher eigenständig aus und "liest" sie alleine oder bringt sie zum Vorlesen.',
    expertTip: 'Selbst wählen zu können stärkt die Eigeninitiative enorm. Bücher auf Kinderhöhe präsentieren — mit dem Cover nach vorn — macht sie einladend und zugänglich.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: [],
    linkedActivities: [],
    suggestedProducts: ['Tuki Montessori Büchergestell'],
  },
  {
    id: 'm12', title: 'Bis 10 zählen', emoji: '🔢',
    ageMonths: [24, 36], category: 'kognition',
    description: 'Zählt (mit oder ohne Fehler) bis mindestens 10.',
    expertTip: 'Zählen lernt man am besten mit echtem Zweck: Treppenstufen, Äpfel im Korb, Finger an der Hand. Kochen bietet endlose Zählanlässe — "Drei Eier, bitte!"',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Logopädin & Sprachtherapeutin',
    linkedRecipes: ['mini-pizzen', 'guetzli'],
    linkedActivities: ['zaehlen-beim-kochen'],
    suggestedProducts: ['Zahlenstangen aus Buchenholz (1–10)'],
  },
  // 3-5 Jahre
  {
    id: 'm13', title: 'Mit Schere schneiden', emoji: '✂️',
    ageMonths: [36, 60], category: 'feinmotorik',
    description: 'Kann mit einer Kinderschere entlang einer Linie schneiden.',
    expertTip: 'Schneiden ist eine Schlüsselkompetenz für die Feinmotorik. Starte mit dickem Papier und breiten Linien. Das Prinzip gilt überall: Banane mit dem Kindermesser schneiden trainiert denselben Ablauf.',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['gemuesesticks-hummus', 'wrap-rolle'],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Montessori Kinderschere (echtes Schneiden)'],
  },
  {
    id: 'm14', title: 'Namen schreiben', emoji: '📝',
    ageMonths: [36, 60], category: 'kognition',
    description: 'Schreibt (vielleicht spiegelverkehrt) den eigenen Namen.',
    expertTip: 'Buchstaben multisensorisch erleben: in Sand schreiben, aus Knete formen, mit dem Finger in der Luft malen. Je mehr Sinne beteiligt sind, desto besser verankert sich das Wissen.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['guetzli'],
    linkedActivities: ['knete-selber-machen'],
    suggestedProducts: ['Montessori Sandpapier-Buchstaben'],
  },
  {
    id: 'm15', title: 'Freundschaften schliessen', emoji: '🤝',
    ageMonths: [36, 60], category: 'sozial',
    description: 'Spielt gezielt mit bestimmten Kindern und nennt sie "Freund".',
    expertTip: 'Gemeinsame Projekte stärken Freundschaften: zusammen kochen, bauen, basteln. Teilen, abwechseln, Kompromisse finden — das lernt man nur im echten Miteinander.',
    expertName: 'Thomas Huber', expertTitle: 'Familientherapeut',
    linkedRecipes: ['mini-pizzen'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: [],
  },
  {
    id: 'm16', title: 'Geschichten erzählen', emoji: '📖',
    ageMonths: [36, 60], category: 'sprache',
    description: 'Kann eine einfache Geschichte in eigenen Worten nacherzählen.',
    expertTip: 'Lass dein Kind den Tag nacherzählen: "Was haben wir heute gemacht?" Nicht korrigieren, nur zuhören und nachfragen. Geschichten-Würfel sind ein tolles Werkzeug dafür.',
    expertName: 'Dr. Sarah Keller', expertTitle: 'Logopädin & Sprachtherapeutin',
    linkedRecipes: [],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: ['Geschichten-Würfel aus Holz'],
  },
  // 5-8 Jahre
  {
    id: 'm17', title: 'Selbstständig lesen', emoji: '📋',
    ageMonths: [60, 96], category: 'kognition',
    description: 'Kann einfache Texte, Anleitungen oder Bildrezepte selbstständig lesen und verstehen.',
    expertTip: 'Lesen wird motivierend, wenn es einen echten Zweck hat: ein Rezept nachkochen, eine Bauanleitung befolgen, einen Brief an Oma schreiben. Sinn vor Übung!',
    expertName: 'Lisa Brunner', expertTitle: 'Montessori-Pädagogin',
    linkedRecipes: ['mini-pizzen', 'bananen-pancakes', 'guetzli'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: [],
  },
  {
    id: 'm18', title: 'Mengen & Messen verstehen', emoji: '⚖️',
    ageMonths: [60, 96], category: 'kognition',
    description: 'Versteht Konzepte wie Gramm, Milliliter, "halb" und "doppelt".',
    expertTip: 'Kochen und Backen sind angewandte Mathematik: Brüche, Gewichte, Zeitrechnung. Aber auch Bastelprojekte und Experimente fördern das Verständnis für Mengen und Masse.',
    expertName: 'Prof. Martin Weber', expertTitle: 'Entwicklungspsychologe',
    linkedRecipes: ['guetzli', 'bananen-pancakes'],
    linkedActivities: ['zaehlen-beim-kochen'],
    suggestedProducts: [],
  },
  {
    id: 'm19', title: 'Verantwortung übernehmen', emoji: '💪',
    ageMonths: [60, 96], category: 'selbststaendigkeit',
    description: 'Übernimmt kleine Aufgaben zuverlässig: Tisch decken, Zimmer aufräumen, Pflanze giessen.',
    expertTip: 'Feste Aufgaben geben Kindern das Gefühl, gebraucht zu werden. Wichtig: Die Aufgabe muss altersgerecht und machbar sein. Lob die Verlässlichkeit, nicht die Perfektion.',
    expertName: 'Thomas Huber', expertTitle: 'Familientherapeut',
    linkedRecipes: [],
    linkedActivities: [],
    suggestedProducts: [],
  },
  {
    id: 'm20', title: 'Im Team arbeiten', emoji: '🤲',
    ageMonths: [60, 96], category: 'sozial',
    description: 'Kann mit anderen Kindern an einem Projekt zusammenarbeiten und Aufgaben verteilen.',
    expertTip: 'Gemeinsame Projekte sind die beste Schule: zusammen kochen, ein Baumhaus planen, ein Theaterstück erfinden. Jedes Kind bekommt eine Rolle — so lernt man Teamwork.',
    expertName: 'Dr. Julia Meier', expertTitle: 'Kinderärztin',
    linkedRecipes: ['mini-pizzen'],
    linkedActivities: ['geschichten-kochen'],
    suggestedProducts: [],
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
