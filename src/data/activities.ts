export interface Activity {
  id: string
  title: string
  subtitle: string
  emoji: string
  image: string
  duration: number
  ageRange: [number, number]
  category: string
  difficulty: 'leicht' | 'mittel' | 'anspruchsvoll'
  materials: string[]
  steps: { text: string; tip?: string }[]
  learningGoals: string[]
  tukiTip: string
  season: string
  stars: number
  motorik?: number
  sensorik?: number
  sprache?: number
  mathe?: number
  natur?: number
  kreativitaet?: number
}

export const categoryInfo: Record<string, { emoji: string; color: string; label: string }> = {
  'Sensorik': { emoji: '🖐️', color: 'bg-purple-50 text-purple-700', label: 'Sensorik' },
  'Natur & Wissen': { emoji: '🌱', color: 'bg-green-50 text-green-700', label: 'Natur & Wissen' },
  'Zahlen & Logik': { emoji: '🔢', color: 'bg-blue-50 text-blue-700', label: 'Zahlen & Logik' },
  'Kreativitaet': { emoji: '🎨', color: 'bg-pink-50 text-pink-700', label: 'Kreativitaet' },
  'Motorik': { emoji: '🏃', color: 'bg-orange-50 text-orange-700', label: 'Motorik' },
  'Sprache': { emoji: '📖', color: 'bg-yellow-50 text-yellow-700', label: 'Sprache' },
  'Musik': { emoji: '🎵', color: 'bg-indigo-50 text-indigo-700', label: 'Musik' },
  'Alltag': { emoji: '🏠', color: 'bg-teal-50 text-teal-700', label: 'Alltag' }
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(a => a.id === id)
}

export const activities: Activity[] = [
  {
    id: 'wasser-giessen',
    title: 'Wasser giessen & messen',
    subtitle: 'Spielerisch Mengen verstehen',
    emoji: '💧',
    image: 'https://images.unsplash.com/photo-1564429238961-bf8f8758a564?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [1, 4],
    category: 'Sensorik',
    difficulty: 'leicht',
    materials: ['Verschiedene Becher und Gefaesse', 'Wasser', 'Lebensmittelfarbe (optional)', 'Handtuch'],
    steps: [
      { text: 'Verschiedene Becher und Gefaesse auf einem Tablett bereitstellen.' },
      { text: 'Wasser von einem Gefaess ins andere giessen lassen.', tip: 'Starte mit grossen Gefaessen, dann immer kleinere!' },
      { text: 'Optional Lebensmittelfarbe ins Wasser geben fuer Farb-Experimente.' },
      { text: 'Welches Gefaess haelt mehr? Welches weniger? Vergleichen!' }
    ],
    learningGoals: ['Mengenverstaendnis', 'Feinmotorik', 'Konzentration'],
    tukiTip: 'Im Tuki stehend am Kuechenspuelbecken — die perfekte Wasserstation!',
    season: 'ganzjaehrig',
    stars: 1,
    sensorik: 5,
    motorik: 3,
    mathe: 4
  },
  {
    id: 'kraeuter-garten',
    title: 'Kraeuter-Garten am Fenster',
    subtitle: 'Saeen, giessen, wachsen sehen',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    duration: 30,
    ageRange: [2, 8],
    category: 'Natur & Wissen',
    difficulty: 'leicht',
    materials: ['Kleine Toepfe oder Joghurtbecher', 'Erde', 'Kraeutersamen (Kresse, Basilikum)', 'Giesskaennchen'],
    steps: [
      { text: 'Toepfe mit Erde fuellen.' },
      { text: 'Samen einstreuen und leicht mit Erde bedecken.', tip: 'Kresse keimt schon nach 2-3 Tagen — perfekt fuer ungeduldige Kinder!' },
      { text: 'Vorsichtig giessen.' },
      { text: 'Taeglich beobachten und giessen. Wachstumsfortschritt dokumentieren!' }
    ],
    learningGoals: ['Naturverstaendnis', 'Verantwortung', 'Geduld'],
    tukiTip: 'Vom Tuki aus perfekt zum Kuechenfenster — der eigene Mini-Garten!',
    season: 'Fruehling',
    stars: 2,
    natur: 5,
    motorik: 2
  },
  {
    id: 'sortier-spiel',
    title: 'Das grosse Sortierspiel',
    subtitle: 'Farben, Formen & Groessen ordnen',
    emoji: '🔴',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [1, 3],
    category: 'Zahlen & Logik',
    difficulty: 'leicht',
    materials: ['Bunte Knoepe oder Bausteine', 'Schuessel oder Muffinform', 'Farbige Pappe als Sortiervorlage'],
    steps: [
      { text: 'Verschiedene Gegenstaende auf dem Tisch ausbreiten.' },
      { text: 'Nach Farben sortieren: Alle roten in eine Schuessel, alle blauen in eine andere.', tip: 'Starte mit 2 Farben, steigere auf 4-5!' },
      { text: 'Dann nach Groesse sortieren: klein, mittel, gross.' },
      { text: 'Zum Schluss nach Form sortieren: rund, eckig, lang.' }
    ],
    learningGoals: ['Kategorisierung', 'Farbkenntnis', 'Logisches Denken'],
    tukiTip: 'Am Kuechentisch im Tuki stehend — alles auf Augenhoehe und griffbereit!',
    season: 'ganzjaehrig',
    stars: 1,
    mathe: 5,
    sensorik: 3
  },
  {
    id: 'knete-selber-machen',
    title: 'Knete selber machen',
    subtitle: 'Mischen, kneten, kreativ sein',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&h=300&fit=crop',
    duration: 25,
    ageRange: [2, 6],
    category: 'Kreativitaet',
    difficulty: 'leicht',
    materials: ['200g Mehl', '100g Salz', '2 EL Oel', '200ml Wasser', 'Lebensmittelfarbe'],
    steps: [
      { text: 'Mehl und Salz in einer Schuessel mischen.' },
      { text: 'Wasser, Oel und Lebensmittelfarbe dazugeben.', tip: 'Verschiedene Farben fuer verschiedene Portionen!' },
      { text: 'Kraeftig kneten bis ein geschmeidiger Teig entsteht.' },
      { text: 'Formen, rollen, schneiden — der Kreativitaet sind keine Grenzen gesetzt!' }
    ],
    learningGoals: ['Feinmotorik', 'Kreativitaet', 'Sensorische Erfahrung'],
    tukiTip: 'Knete machen in der Kueche — im Tuki stehend die perfekte Arbeitshoehe!',
    season: 'ganzjaehrig',
    stars: 2,
    kreativitaet: 5,
    motorik: 4,
    sensorik: 4
  },
  {
    id: 'haende-waschen-lied',
    title: 'Haende-Wasch-Lied',
    subtitle: 'Singen, waschen, Spass haben',
    emoji: '🧼',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop',
    duration: 5,
    ageRange: [1, 4],
    category: 'Alltag',
    difficulty: 'leicht',
    materials: ['Seife', 'Wasser', 'Handtuch'],
    steps: [
      { text: 'Zum Waschbecken gehen und Haende nass machen.' },
      { text: 'Seife nehmen und einseifen — dabei singen!', tip: 'Singt "Haendewaschen" auf die Melodie von "Happy Birthday" — das dauert genau lang genug!' },
      { text: 'Alle Stellen waschen: Handflaechen, Ruecken, zwischen den Fingern.' },
      { text: 'Gruendlich abspuelen und abtrocknen.' }
    ],
    learningGoals: ['Hygiene', 'Routine', 'Selbststaendigkeit'],
    tukiTip: 'Im Tuki perfekt am Waschbecken — Haendewaschen wird zum Highlight!',
    season: 'ganzjaehrig',
    stars: 1,
    sprache: 3,
    motorik: 2
  },
  {
    id: 'herbst-blaetter',
    title: 'Blaetter sammeln & pressen',
    subtitle: 'Herbstfarben entdecken',
    emoji: '🍂',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    duration: 45,
    ageRange: [2, 8],
    category: 'Natur & Wissen',
    difficulty: 'leicht',
    materials: ['Korb oder Tuete', 'Schwere Buecher zum Pressen', 'Papier', 'Kleber'],
    steps: [
      { text: 'Nach draussen gehen und verschiedene Blaetter sammeln.' },
      { text: 'Blaetter nach Farben, Formen und Groessen sortieren.', tip: 'Wie viele verschiedene Farben findet ihr?' },
      { text: 'Zwischen Buchseiten pressen und einige Tage trocknen lassen.' },
      { text: 'Gepresste Blaetter auf Papier kleben und beschriften.' }
    ],
    learningGoals: ['Naturkenntnis', 'Feinmotorik', 'Beobachtung'],
    tukiTip: 'Nach dem Spaziergang: Im Tuki am Kuechentisch die Blaetter sortieren und aufkleben!',
    season: 'Herbst',
    stars: 1,
    natur: 5,
    kreativitaet: 3
  },
  {
    id: 'zaehlen-beim-kochen',
    title: 'Zaehlen beim Kochen',
    subtitle: 'Mathe in der Kueche',
    emoji: '🔢',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [2, 5],
    category: 'Zahlen & Logik',
    difficulty: 'leicht',
    materials: ['Gemuese oder Obst', 'Messbecher', 'Loeffel'],
    steps: [
      { text: 'Zutaten auf den Tisch legen: Wie viele Aepfel sind es?' },
      { text: 'Gemeinsam zaehlen: 3 Loeffel Mehl, 2 Eier...', tip: 'Laut mitzaehlen — das verankert die Zahlen!' },
      { text: 'Vergleichen: Was ist mehr — 3 Loeffel oder 5?' },
      { text: 'Beim Kochen weiter zaehlen: Wie viele Stuecke hat die Gurke?' }
    ],
    learningGoals: ['Zaehlen', 'Mengenverstaendnis', 'Zahlen benennen'],
    tukiTip: 'Kochen ist Mathe! Im Tuki kann dein Kind alles mitzaehlen und abmessen.',
    season: 'ganzjaehrig',
    stars: 1,
    mathe: 5,
    sprache: 3
  },
  {
    id: 'geschichten-kochen',
    title: 'Koch-Geschichten erzaehlen',
    subtitle: 'Fantasie trifft Kueche',
    emoji: '📖',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [3, 8],
    category: 'Sprache',
    difficulty: 'leicht',
    materials: ['Kochzutaten', 'Fantasie'],
    steps: [
      { text: 'Waehrend ihr kocht, erfindet zusammen eine Geschichte ueber die Zutaten.' },
      { text: 'Die Karotte ist eine Prinzessin, die Kartoffel ein Ritter...', tip: 'Lass dein Kind die Hauptfigur waehlen!' },
      { text: 'Was passiert, wenn sie in den Topf kommen? Ein Abenteuer!' },
      { text: 'Die Geschichte beim naechsten Kochen weiterspinnen.' }
    ],
    learningGoals: ['Sprachentwicklung', 'Fantasie', 'Erzaehlfaehigkeit'],
    tukiTip: 'Im Tuki stehend sieht dein Kind alles, was passiert — perfekt zum Geschichten erfinden!',
    season: 'ganzjaehrig',
    stars: 1,
    sprache: 5,
    kreativitaet: 4
  },
  // === NEW ACTIVITIES START HERE ===
  {
    id: 'fingerfarben-malen',
    title: 'Fingerfarbenbild',
    subtitle: 'Klecksen, tupfen, staunen',
    emoji: '🖌️',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [1, 4],
    category: 'Kreativitaet',
    difficulty: 'leicht',
    materials: ['Fingerfarben', 'Grosses Papier', 'Unterlage/Zeitung', 'Feuchte Tuecher'],
    steps: [
      { text: 'Arbeitsflaeche abdecken und grosses Papier auslegen.' },
      { text: 'Fingerfarben in kleinen Portionen bereitstellen.' },
      { text: 'Mit Fingern, Haenden oder Schwamm malen.', tip: 'Keine Regeln — alles ist erlaubt!' },
      { text: 'Trocknen lassen und aufhaengen.' }
    ],
    learningGoals: ['Kreativitaet', 'Feinmotorik', 'Farberkennung'],
    tukiTip: 'Im Tuki stehend am Kuechentisch — perfekte Hoehe und leicht abwischbar danach!',
    season: 'ganzjaehrig',
    stars: 1,
    kreativitaet: 5,
    sensorik: 4,
    motorik: 3
  },
  {
    id: 'turm-bauen',
    title: 'Turm-Bau-Challenge',
    subtitle: 'Wer baut den hoechsten Turm?',
    emoji: '🏗️',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [1, 4],
    category: 'Motorik',
    difficulty: 'leicht',
    materials: ['Baukloeztze oder Becher', 'Schachteln', 'Buechsen'],
    steps: [
      { text: 'Verschiedene stapelbare Gegenstaende sammeln.' },
      { text: 'Gemeinsam so hoch wie moeglich stapeln.', tip: 'Zaehlt die Etagen laut mit!' },
      { text: 'Wenn er umfaellt: Nochmal! Hoeher!', tip: 'Das Umfallen ist der beste Teil — Kinder lieben es!' },
      { text: 'Variante: Wer baut den breitesten Turm?' }
    ],
    learningGoals: ['Feinmotorik', 'Geduld', 'Raeumliches Denken'],
    tukiTip: 'Im Tuki auf Tischhoehe bauen — kein Buecken, mehr Konzentration!',
    season: 'ganzjaehrig',
    stars: 1,
    motorik: 5,
    mathe: 3
  },
  {
    id: 'musik-kueche',
    title: 'Kuechenkonzert',
    subtitle: 'Musik mit Toepfen & Loeffeln',
    emoji: '🥁',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [1, 4],
    category: 'Musik',
    difficulty: 'leicht',
    materials: ['Toepfe', 'Holzloeffel', 'Schuessel', 'Plastikdosen mit Reis'],
    steps: [
      { text: 'Verschiedene "Instrumente" aus der Kueche bereitstellen.' },
      { text: 'Ausprobieren: Was klingt wie? Laut/leise? Hoch/tief?' },
      { text: 'Gemeinsam einen Rhythmus klopfen.', tip: 'Klatsche vor, dein Kind klopft nach!' },
      { text: 'Ein Lieblingslied begleiten.' }
    ],
    learningGoals: ['Rhythmusgefuehl', 'Hoerwahrnehmung', 'Kreativitaet'],
    tukiTip: 'Im Tuki stehend auf Topf-Hoehe — das Kuechenkonzert kann beginnen!',
    season: 'ganzjaehrig',
    stars: 1,
    kreativitaet: 4,
    motorik: 3,
    sensorik: 4
  },
  {
    id: 'schatzsuche-kueche',
    title: 'Kuechen-Schatzsuche',
    subtitle: 'Finden, suchen, entdecken',
    emoji: '🔍',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [2, 6],
    category: 'Sprache',
    difficulty: 'leicht',
    materials: ['Alltagsgegenstaende aus der Kueche', 'Korb zum Sammeln'],
    steps: [
      { text: 'Aufgaben stellen: Bring mir etwas Rotes! Etwas Rundes! Etwas das kalt ist!' },
      { text: 'Kind sucht und bringt den passenden Gegenstand.', tip: 'Steigere die Schwierigkeit: Etwas, das mit B anfaengt!' },
      { text: 'Gemeinsam besprechen: Warum hast du das gewaehlt?' },
      { text: 'Rollen tauschen: Kind gibt Aufgaben!' }
    ],
    learningGoals: ['Wortschatz', 'Kategorisierung', 'Beschreiben'],
    tukiTip: 'Von Tuki aus die Kueche erkunden — alles in Sicht und Griffweite!',
    season: 'ganzjaehrig',
    stars: 1,
    sprache: 5,
    mathe: 2,
    motorik: 2
  },
  {
    id: 'reis-sensorik',
    title: 'Reis-Sensorik-Wanne',
    subtitle: 'Fuehlen, schuetten, vergraben',
    emoji: '🫗',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [1, 3],
    category: 'Sensorik',
    difficulty: 'leicht',
    materials: ['500g Reis', 'Flache Wanne/Backblech', 'Kleine Becher/Loeffel', 'Versteckte Figuren'],
    steps: [
      { text: 'Reis in eine flache Wanne schuetten.' },
      { text: 'Kleine Figuren oder Gegenstaende im Reis verstecken.' },
      { text: 'Kind grabt mit Haenden und Loeffeln nach den Schaetzen.', tip: 'Augen zu und nur mit den Haenden fuehlen!' },
      { text: 'Reis von einem Becher in den anderen schuetten — Giess-Uebung!' }
    ],
    learningGoals: ['Tastwahrnehmung', 'Feinmotorik', 'Konzentration'],
    tukiTip: 'Im Tuki am Kuechentisch — der Reis bleibt in der Wanne statt auf dem Boden!',
    season: 'ganzjaehrig',
    stars: 1,
    sensorik: 5,
    motorik: 4
  },
  {
    id: 'tisch-decken',
    title: 'Tisch decken lernen',
    subtitle: 'Alltagsheld in der Kueche',
    emoji: '🍽️',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    duration: 10,
    ageRange: [2, 6],
    category: 'Alltag',
    difficulty: 'leicht',
    materials: ['Teller', 'Besteck', 'Becher', 'Servietten'],
    steps: [
      { text: 'Zeige, wo alles hingehoert: Teller in die Mitte, Gabel links, Messer rechts.' },
      { text: 'Kind deckt einen Platz alleine.', tip: 'Lege eine Vorlage auf Papier — das hilft!' },
      { text: 'Zaehlen: Wie viele Personen essen mit? So viele Teller brauchen wir!' },
      { text: 'Gemeinsam kontrollieren: Haben alle alles?' }
    ],
    learningGoals: ['Selbststaendigkeit', 'Zaehlen', 'Raeumliche Zuordnung'],
    tukiTip: 'Vom Tuki aus sind Schubladen und Arbeitsflaeche erreichbar — selbststaendig helfen!',
    season: 'ganzjaehrig',
    stars: 1,
    mathe: 3,
    motorik: 3
  },
  {
    id: 'stempel-kartoffel',
    title: 'Kartoffeldruck',
    subtitle: 'Stempeln mit Gemuese',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1560421741-50d16ae97d63?w=400&h=300&fit=crop',
    duration: 25,
    ageRange: [2, 6],
    category: 'Kreativitaet',
    difficulty: 'leicht',
    materials: ['Kartoffeln (halbiert)', 'Farbe', 'Papier', 'Messer (nur fuer Erwachsene)'],
    steps: [
      { text: 'Kartoffeln halbieren und Muster einschnitzen (Erwachsene).' },
      { text: 'Kartoffelhaeflte in Farbe tauchen.' },
      { text: 'Auf Papier stempeln.', tip: 'Verschiedene Farben fuer verschiedene Kartoffeln — Regenbogen-Effekt!' },
      { text: 'Trocknen lassen und als Geschenkpapier oder Karte verwenden.' }
    ],
    learningGoals: ['Kreativitaet', 'Muster erkennen', 'Feinmotorik'],
    tukiTip: 'Kartoffeldruck am Kuechentisch — im Tuki auf perfekter Arbeitshoehe!',
    season: 'ganzjaehrig',
    stars: 1,
    kreativitaet: 5,
    motorik: 3
  },
  {
    id: 'pusten-spiel',
    title: 'Pustespiel',
    subtitle: 'Watteball ueber den Tisch pusten',
    emoji: '💨',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop',
    duration: 10,
    ageRange: [2, 5],
    category: 'Motorik',
    difficulty: 'leicht',
    materials: ['Wattebaeaellchen', 'Strohhalm', 'Tisch'],
    steps: [
      { text: 'Wattebaellchen auf den Tisch legen.' },
      { text: 'Mit dem Strohhalm das Baellchen ueber den Tisch pusten.', tip: 'Wer schafft es ins Tor (2 Becher)?' },
      { text: 'Parcours bauen mit Hindernissen (Stifte, Becher).' },
      { text: 'Wettrennen: Wer ist schneller am anderen Ende?' }
    ],
    learningGoals: ['Mundmotorik', 'Atemkontrolle', 'Konzentration'],
    tukiTip: 'Im Tuki auf Tischhoehe — perfekte Position zum Pusten und Staunen!',
    season: 'ganzjaehrig',
    stars: 1,
    motorik: 4,
    sensorik: 2
  },
  {
    id: 'obst-schmecken',
    title: 'Obst-Blindverkostung',
    subtitle: 'Augen zu — was schmeckst du?',
    emoji: '👅',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [2, 8],
    category: 'Sensorik',
    difficulty: 'leicht',
    materials: ['5-6 verschiedene Obstsorten', 'Augenbinde oder Tuch'],
    steps: [
      { text: 'Verschiedene Obstsorten in mundgerechte Stuecke schneiden.' },
      { text: 'Augen verbinden oder schliessen lassen.' },
      { text: 'Ein Stueck Obst probieren — was ist das?', tip: 'Erst riechen, dann schmecken — nutzt alle Sinne!' },
      { text: 'Rollen tauschen: Eltern probieren auch blind!' }
    ],
    learningGoals: ['Geschmackssinn', 'Wortschatz', 'Wahrnehmung'],
    tukiTip: 'Am Kuechentisch im Tuki — Schmeck-Abenteuer auf Augenhoehe!',
    season: 'ganzjaehrig',
    stars: 1,
    sensorik: 5,
    sprache: 3,
    natur: 2
  },
  {
    id: 'abmessen-lernen',
    title: 'Abmessen wie ein Profi',
    subtitle: 'Messbecher, Waage & Loeffel',
    emoji: '⚖️',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [3, 6],
    category: 'Zahlen & Logik',
    difficulty: 'mittel',
    materials: ['Kuechenwaage', 'Messbecher', 'Verschiedene Zutaten (Mehl, Zucker, Reis)'],
    steps: [
      { text: 'Kuechenwaage aufstellen und erklaeren.' },
      { text: 'Kind abwiegen lassen: Wie viel wiegt ein Apfel?', tip: 'Erst schaetzen, dann wiegen — Ueberraschung!' },
      { text: 'Messbecher nutzen: 200ml Milch abmessen.' },
      { text: 'Loeffel zaehlen: 3 Essloeeffel Mehl — genau richtig!' }
    ],
    learningGoals: ['Zahlenverstaendnis', 'Mengen & Gewichte', 'Genauigkeit'],
    tukiTip: 'Im Tuki stehend die Waage bedienen — Mathe zum Anfassen!',
    season: 'ganzjaehrig',
    stars: 2,
    mathe: 5,
    motorik: 3,
    natur: 2
  },
  {
    id: 'farben-mischen',
    title: 'Farben-Misch-Experiment',
    subtitle: 'Welche Farbe entsteht?',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    duration: 15,
    ageRange: [2, 5],
    category: 'Natur & Wissen',
    difficulty: 'leicht',
    materials: ['Lebensmittelfarbe (Rot, Blau, Gelb)', 'Becher mit Wasser', 'Pipette oder Loeffel'],
    steps: [
      { text: '3 Becher mit Wasser fuellen und je eine Grundfarbe dazugeben.' },
      { text: 'Fragen: Was passiert, wenn wir Rot und Blau mischen?', tip: 'Erst raten lassen, dann ausprobieren!' },
      { text: 'Mischen und staunen: Lila! Orange! Gruen!' },
      { text: 'Alle moeglichen Kombinationen ausprobieren.' }
    ],
    learningGoals: ['Farblehre', 'Experimentieren', 'Ursache & Wirkung'],
    tukiTip: 'Farben mischen am Kuechentisch — im Tuki stehend wie ein kleiner Forscher!',
    season: 'ganzjaehrig',
    stars: 1,
    natur: 4,
    kreativitaet: 4,
    sensorik: 3
  },
  {
    id: 'formen-ausstechen',
    title: 'Formen ausstechen',
    subtitle: 'Teig, Knete oder Sand',
    emoji: '⭐',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [1, 4],
    category: 'Motorik',
    difficulty: 'leicht',
    materials: ['Knete oder Salzteig', 'Ausstechformen', 'Nudelholz'],
    steps: [
      { text: 'Knete oder Salzteig ausrollen.' },
      { text: 'Verschiedene Formen ausstechen.', tip: 'Benenne die Formen: Stern, Herz, Kreis, Mond...' },
      { text: 'Formen sortieren und zaehlen.' },
      { text: 'Figuren daraus zusammensetzen.' }
    ],
    learningGoals: ['Feinmotorik', 'Formerkennung', 'Hand-Auge-Koordination'],
    tukiTip: 'Auf der Arbeitsflaeche im Tuki — ausstechen und kreativ sein!',
    season: 'ganzjaehrig',
    stars: 1,
    motorik: 5,
    kreativitaet: 3,
    mathe: 2
  },
  {
    id: 'memory-gegenstaende',
    title: 'Kuechentisch-Memory',
    subtitle: 'Was fehlt? Gedaechtnis-Spiel',
    emoji: '🧠',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=300&fit=crop',
    duration: 10,
    ageRange: [2, 6],
    category: 'Zahlen & Logik',
    difficulty: 'leicht',
    materials: ['5-8 Alltagsgegenstaende', 'Tuch zum Abdecken'],
    steps: [
      { text: '5 Gegenstaende auf den Tisch legen und benennen.' },
      { text: 'Kind schliesst die Augen, einen Gegenstand entfernen.' },
      { text: 'Augen auf: Was fehlt?', tip: 'Mit 3 Gegenstaenden starten, langsam steigern!' },
      { text: 'Rollen tauschen — Kinder lieben es, die Erwachsenen zu testen!' }
    ],
    learningGoals: ['Gedaechtnis', 'Konzentration', 'Benennen'],
    tukiTip: 'Am Kuechentisch im Tuki — alles im Blick fuer kleine Detektive!',
    season: 'ganzjaehrig',
    stars: 1,
    mathe: 3,
    sprache: 3,
    sensorik: 2
  },
  {
    id: 'wochen-kalender',
    title: 'Wochenplan-Kalender',
    subtitle: 'Tage und Wetter verstehen',
    emoji: '📅',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
    duration: 10,
    ageRange: [3, 8],
    category: 'Sprache',
    difficulty: 'leicht',
    materials: ['Papier/Karton', 'Stifte', 'Magnete oder Kleber', 'Wetter-Symbole'],
    steps: [
      { text: 'Einfachen Wochenplan basteln mit den 7 Tagen.' },
      { text: 'Taeglich gemeinsam besprechen: Welcher Tag ist heute?', tip: 'Wetter-Symbol dazukleben: Sonne, Wolke, Regen...' },
      { text: 'Was passiert heute? Kinderkrippe, Spielplatz, Oma besuchen?' },
      { text: 'Zur Routine machen: Jeden Morgen den Kalender aktualisieren.' }
    ],
    learningGoals: ['Zeitverstaendnis', 'Wochentage', 'Routine'],
    tukiTip: 'Kalender am Kuehlschrank auf Tuki-Augenhoehe — taeglich selbst umstecken!',
    season: 'ganzjaehrig',
    stars: 2,
    sprache: 4,
    mathe: 3,
    natur: 2
  },
  {
    id: 'spiegelbild-spiel',
    title: 'Spiegelbild-Spiel',
    subtitle: 'Mach nach, was ich mache!',
    emoji: '🪞',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=300&fit=crop',
    duration: 10,
    ageRange: [2, 5],
    category: 'Motorik',
    difficulty: 'leicht',
    materials: ['Kein Material noetig'],
    steps: [
      { text: 'Gegenueber stehen und erklaeren: Du bist mein Spiegel!' },
      { text: 'Langsame Bewegungen machen, Kind spiegelt.', tip: 'Start mit einfachen Armbewegungen!' },
      { text: 'Schneller werden und lustige Grimassen einbauen.' },
      { text: 'Rollen tauschen: Kind fuehrt, Elternteil spiegelt!' }
    ],
    learningGoals: ['Koerperwahrnehmung', 'Aufmerksamkeit', 'Koordination'],
    tukiTip: 'Vom Tuki aus auf Augenhoehe — perfektes Spiegeln gegenueber am Kuechentisch!',
    season: 'ganzjaehrig',
    stars: 1,
    motorik: 4,
    sensorik: 3,
    kreativitaet: 2
  },
  {
    id: 'schneemann-winter',
    title: 'Indoor-Schneemann',
    subtitle: 'Schneemann basteln ohne Schnee',
    emoji: '⛄',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [2, 6],
    category: 'Kreativitaet',
    difficulty: 'leicht',
    materials: ['Socke (weiss)', 'Reis zum Fuellen', 'Gummibaender', 'Knoepfe', 'Stoffreste'],
    steps: [
      { text: 'Weisse Socke mit Reis fuellen.' },
      { text: 'Mit Gummiband einen Kopf abteilen.' },
      { text: 'Knoepfe als Augen und Bauch aufkleben.', tip: 'Stoffrest als Schal umbinden!' },
      { text: 'Fuer die Nase: Ein oranges Stueck Filz.' }
    ],
    learningGoals: ['Feinmotorik', 'Kreativitaet', 'Schritte befolgen'],
    tukiTip: 'Basteln am Kuechentisch im Tuki — alles griffbereit und auf der richtigen Hoehe!',
    season: 'Winter',
    stars: 2,
    kreativitaet: 5,
    motorik: 4
  },
  {
    id: 'fruehlings-samen',
    title: 'Fruehlings-Aussaat',
    subtitle: 'Samen pflanzen & beobachten',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    duration: 20,
    ageRange: [2, 8],
    category: 'Natur & Wissen',
    difficulty: 'leicht',
    materials: ['Eierkarton', 'Erde', 'Samen (Sonnenblume, Kresse)', 'Spruehflasche'],
    steps: [
      { text: 'Eierkarton mit Erde fuellen.' },
      { text: 'In jede Mulde 1-2 Samen legen.', tip: 'Sonnenblumensamen sind gross genug fuer kleine Finger!' },
      { text: 'Mit Erde bedecken und leicht befeuchten.' },
      { text: 'Ans Fenster stellen und taeglich sprühen. Beobachten!' }
    ],
    learningGoals: ['Pflanzenwachstum', 'Verantwortung', 'Geduld'],
    tukiTip: 'Vom Tuki am Kuechenfenster — den eigenen Garten pflegen!',
    season: 'Fruehling',
    stars: 2,
    natur: 5,
    motorik: 2
  }
]
