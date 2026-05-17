// English translations for activities

export const activitiesEn: Record<string, {
  title: string
  subtitle: string
  materials: string[]
  steps: { text: string; tip?: string }[]
  learningGoals: string[]
  tukiTip: string
}> = {
  'wasser-giessen': {
    title: 'Pouring & measuring water',
    subtitle: 'Understanding quantities through play',
    materials: ['Various cups & containers', 'Water', 'Towel for splashes', 'Optional: food colouring'],
    steps: [
      { text: 'Place different cups and bowls on the worktop.' },
      { text: 'Fill a jug with water (optionally with food colouring).', tip: 'Colour makes it more exciting and helps with observation!' },
      { text: 'Your child pours the water from one container to another.' },
      { text: 'Talk together: which one is full? Which is empty? Which has more?' },
    ],
    learningGoals: ['Fine motor skills & coordination', 'Understanding quantities (full/empty/more/less)', 'Concentration & patience', 'Sensory experience'],
    tukiTip: 'In the Tuki, your child stands perfectly at the sink or worktop. Put a towel underneath — a little mess is part of the fun!',
  },
  'kräuter-garten': {
    title: 'Window herb garden',
    subtitle: 'Sow, water, watch it grow',
    materials: ['Small pots or egg carton', 'Soil', 'Herb seeds (cress, basil, chives)', 'Water & small watering can', 'Spoon'],
    steps: [
      { text: 'Fill pots with soil — spoon by spoon.', tip: 'Children love scooping. Put newspaper underneath!' },
      { text: 'Scatter seeds on the soil and press down lightly.' },
      { text: 'Water gently — not too much!' },
      { text: 'Place on the windowsill and check together every day to see what happens.' },
      { text: 'When the herbs have grown: harvest together and use in a recipe!' },
    ],
    learningGoals: ['Understanding nature & patience', 'Taking responsibility', 'Observing & documenting', 'Understanding connections (water → growth)'],
    tukiTip: 'Standing in the Tuki at the kitchen window, your child can tend to their herb garden every day. Keep a growth journal together!',
  },
  'sortier-spiel': {
    title: 'The big sorting game',
    subtitle: 'Sorting colours, shapes & sizes',
    materials: ['Bowls in different colours', 'Everyday objects to sort: fruit, toys, clothes pegs', 'Muffin tin (optional)'],
    steps: [
      { text: 'Place different bowls on the worktop.' },
      { text: 'Prepare objects: colourful fruit, clothes pegs, building blocks...' },
      { text: 'Give a sorting task: everything red goes here, everything green goes there!', tip: 'Start with 2 colours, gradually increase to 3-4.' },
      { text: 'Variation: sort by size (big/small) or by shape (round/square).' },
    ],
    learningGoals: ['Colour recognition', 'Categorising & logical thinking', 'Fine motor skills', 'Language development (colour names, adjectives)'],
    tukiTip: 'The kitchen worktop becomes a learning table! In the Tuki, your child has enough space and the right height for sorting.',
  },
  'knete-selber-machen': {
    title: 'Make your own play dough',
    subtitle: 'Mix, knead, get creative',
    materials: ['200g flour', '100g salt', '2 tbsp oil', '200ml water', 'Food colouring', 'Bowl & spoon'],
    steps: [
      { text: 'Mix flour and salt in a large bowl.' },
      { text: 'Add oil and water.', tip: 'Your child can measure the water — with a measuring cup!' },
      { text: 'Knead well until you get a smooth dough.' },
      { text: 'Divide the dough and colour with food colouring.' },
      { text: 'Now start shaping! Animals, letters, fantasy figures...', tip: 'Offer cookie cutters, a rolling pin and a fork as tools!' },
    ],
    learningGoals: ['Creative expression', 'Fine motor skills & hand strength', 'Measuring & counting', 'Mixing & naming colours'],
    tukiTip: 'Kneading at eye level in the Tuki — your child has the perfect working posture. Homemade play dough keeps for 2-3 weeks in the fridge!',
  },
  'haende-waschen-lied': {
    title: 'The hand-washing song',
    subtitle: 'Learning hygiene through play',
    materials: ['Soap (child-friendly)', 'Towel', 'Optional: sand timer (30 seconds)'],
    steps: [
      { text: 'Stand together at the sink — adjust the Tuki to the right height!' },
      { text: 'Wet hands and lather up with soap.' },
      { text: 'Sing together while washing: "Wash your hands, wash your hands, every child must do..."', tip: 'The song lasts about 30 seconds — perfect for thorough washing!' },
      { text: 'Between the fingers, under the nails, don\'t forget the thumbs!' },
      { text: 'Rinse, dry and be proud!' },
    ],
    learningGoals: ['Building a hygiene routine', 'Language development through singing', 'Independence', 'Body awareness'],
    tukiTip: 'The Tuki at the sink is one of the most common uses! Your child learns independence in their daily routine.',
  },
  'herbst-blätter': {
    title: 'Autumn leaf artwork',
    subtitle: 'Collect, press, create',
    materials: ['Collected autumn leaves', 'Paper or cardboard', 'Glue', 'Wax crayons', 'Optional: laminator'],
    steps: [
      { text: 'First, head outdoors: collect different leaves!', tip: 'Look for different colours, shapes and sizes.' },
      { text: 'Press leaves between books briefly (1-2 days) or use directly.' },
      { text: 'Glue onto paper and create a picture: animals from leaves, trees, mandalas...' },
      { text: 'Add details with wax crayons.' },
      { text: 'Hang up the artwork and admire it!' },
    ],
    learningGoals: ['Understanding nature', 'Fine motor skills (gluing, painting)', 'Creative expression', 'Recognising colours & shapes in nature'],
    tukiTip: 'In the Tuki, your child can comfortably create their leaf artwork at the kitchen table or worktop. Hang it up together afterwards!',
  },
  'zählen-beim-kochen': {
    title: 'Counting while cooking',
    subtitle: 'Learning maths naturally',
    materials: ['Fruit or vegetables to count', 'Bowls', 'A simple recipe'],
    steps: [
      { text: 'Choose a simple recipe together.' },
      { text: 'Count the ingredients: "We need THREE eggs. Will you count along?"' },
      { text: 'Count the spoons: "Two spoons of flour — that\'s one... two!"', tip: 'Count in an exaggerated way and show enthusiasm!' },
      { text: 'Admire the result: "Wow, we made something delicious from 5 ingredients!"' },
    ],
    learningGoals: ['Number comprehension (1-10)', 'Understanding quantity', 'One-to-one correspondence', 'Experiencing maths in everyday life'],
    tukiTip: 'Cooking in the Tuki makes maths come naturally. Counting, measuring, comparing — it\'s all part of the kitchen experience.',
  },
  'geschichten-kochen': {
    title: 'Story kitchen',
    subtitle: 'Cook & tell stories along the way',
    materials: ['A simple recipe', 'Imagination!'],
    steps: [
      { text: 'Start with a recipe of your choice.' },
      { text: 'Invent a story for each ingredient: "The little tomato rolled from the mountain into the valley..."' },
      { text: 'Your child continues: what happens next?', tip: 'There\'s no right or wrong — every story is brilliant!' },
      { text: 'The story continues while you cook.' },
      { text: 'At the end: retell the story together while eating.' },
    ],
    learningGoals: ['Expanding vocabulary', 'Imagination & storytelling skills', 'Practising sentence construction', 'Making connections'],
    tukiTip: 'At eye level in the Tuki, stories are best told — your child feels like an equal storytelling partner!',
  },
}

// English category info
export const categoryInfoEn: Record<string, { label: string; emoji: string; color: string }> = {
  motorik: { label: 'Motor Skills', emoji: '🤸', color: 'bg-orange-100 text-orange-700' },
  sensorik: { label: 'Sensory', emoji: '🖐️', color: 'bg-purple-100 text-purple-700' },
  kreativität: { label: 'Creativity', emoji: '🎨', color: 'bg-pink-100 text-pink-700' },
  sprache: { label: 'Language', emoji: '💬', color: 'bg-blue-100 text-blue-700' },
  mathe: { label: 'Numbers & Logic', emoji: '🔢', color: 'bg-green-100 text-green-700' },
  natur: { label: 'Nature & Knowledge', emoji: '🌱', color: 'bg-emerald-100 text-emerald-700' },
}
