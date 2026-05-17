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
    title: 'Pouring & Measuring Water',
    subtitle: 'Pour, splash & discover',
    materials: [
      '2–3 different cups',
      'Measuring cup',
      'Water bowl',
      'Towel',
    ],
    steps: [
      { text: 'Place the water bowl and cups on the table.' },
      { text: 'Show your child how to pour water from one cup into another.', tip: 'Start with a small amount of water — it builds confidence!' },
      { text: 'Let them try it on their own and experiment.' },
      { text: 'Observe together: Which cup is full? Which one is empty?' },
    ],
    learningGoals: ['Fine motor skills', 'Understanding quantities', 'Hand-eye coordination'],
    tukiTip: 'In the Tuki your child is at the perfect height for pouring. A towel underneath catches any spills!',
  },

  'kräuter-garten': {
    title: 'Windowsill Herb Garden',
    subtitle: 'Plant seeds & watch them grow',
    materials: [
      'Small pots or yoghurt cups',
      'Soil',
      'Herb seeds (cress, basil)',
      'Watering cup',
    ],
    steps: [
      { text: 'Fill the pots with soil.' },
      { text: 'Sprinkle seeds onto the soil.', tip: 'Cress sprouts especially fast — perfect for impatient little ones!' },
      { text: 'Cover lightly with soil and water gently.' },
      { text: 'Place on the windowsill and water and observe daily.' },
    ],
    learningGoals: ['Understanding nature', 'Patience', 'Responsibility'],
    tukiTip: 'Check together every day to see if anything has sprouted. After 3 days cress appears — the excitement is huge!',
  },

  'sortier-spiel': {
    title: 'The Big Sorting Game',
    subtitle: 'Sorting colours, shapes & sizes',
    materials: [
      'Colourful objects (building blocks, buttons, fruit)',
      'Bowls for sorting',
    ],
    steps: [
      { text: 'Spread a variety of objects on the table.' },
      { text: 'Set out bowls — one for each colour or size.' },
      { text: "Sort together: 'All the red ones go here, all the blue ones over there.'", tip: 'Start with 2 colours and gradually increase!' },
      { text: 'Count together: How many are in each bowl?' },
    ],
    learningGoals: ['Colour recognition', 'Categorising', 'Counting'],
    tukiTip: 'Sorting is hands-on maths! In the Tuki your child can reach every bowl easily.',
  },

  'knete-selber-machen': {
    title: 'Make Your Own Play Dough',
    subtitle: 'Squish, shape & get creative',
    materials: [
      '200 g flour',
      '100 g salt',
      '200 ml water',
      '1 tbsp oil',
      'Food colouring',
    ],
    steps: [
      { text: 'Mix flour and salt in a large bowl.' },
      { text: 'Add water and oil, then knead well.', tip: 'Let kids dig in with both hands — the messier the better!' },
      { text: 'Knead in food colouring to make colourful dough.' },
      { text: 'Done! Now shape, press and let creativity flow.' },
    ],
    learningGoals: ['Fine motor skills', 'Creativity', 'Sensory awareness'],
    tukiTip: 'Making play dough is double the fun: first you create it, then you play with it! Stored in a container it lasts for weeks.',
  },

  'haende-waschen-lied': {
    title: 'The Hand-Washing Song',
    subtitle: 'Sing along & learn good hygiene',
    materials: [
      'Soap',
      'Water',
      'Towel',
    ],
    steps: [
      { text: 'Stand together at the sink.' },
      { text: "Sing the song: 'Wash your hands, wash your hands, every child must do…'" },
      { text: 'Lather up and wash for 20 seconds while singing.', tip: 'The song lasts exactly as long as you should be washing!' },
      { text: "Dry off and admire your hands: 'Now they're all clean!'" },
    ],
    learningGoals: ['Language development', 'Hygiene routine', 'Sense of rhythm'],
    tukiTip: 'Rituals with songs really stick! In the Tuki your child can reach the sink all by themselves.',
  },

  'herbst-blätter': {
    title: 'Autumn Leaf Art',
    subtitle: 'Collect, press & glue',
    materials: [
      'Collected autumn leaves',
      'Paper',
      'Craft glue',
      'Wax crayons',
    ],
    steps: [
      { text: 'Go outside together and collect colourful leaves.', tip: 'Look for different shapes and colours — like a treasure hunt!' },
      { text: 'At home, lay the leaves on paper and arrange them.' },
      { text: 'Fix them in place with glue.' },
      { text: 'Use wax crayons to draw animals or patterns around them.' },
    ],
    learningGoals: ['Creativity', 'Connection with nature', 'Fine motor skills'],
    tukiTip: 'From a walk to a work of art — children learn to appreciate the seasons and express their own creativity.',
  },

  'zaehlen-beim-kochen': {
    title: 'Counting While Cooking',
    subtitle: 'Maths on the side',
    materials: [
      'Cooking ingredients (apples, eggs, spoons)',
      'A recipe with quantities',
    ],
    steps: [
      { text: 'Choose a simple recipe.' },
      { text: "Count the ingredients together: 'We need 3 eggs. Count with me!'", tip: 'Point to each egg as you count — one-to-one correspondence is key!' },
      { text: 'Your child sets out the counted ingredients.' },
      { text: "Keep counting while cooking: 'Two spoons of flour, three spoons of sugar…'" },
    ],
    learningGoals: ['Counting', 'Understanding quantities', 'One-to-one correspondence'],
    tukiTip: 'Cooking is hands-on maths! Every recipe is a counting opportunity — in the Tuki your child is right in the middle of it.',
  },

  'geschichten-kochen': {
    title: 'Story Kitchen',
    subtitle: 'Cooking meets storytelling',
    materials: [
      'A picture book',
      'Ingredients that match the story',
    ],
    steps: [
      { text: 'Read or tell a story together.' },
      { text: 'Think about it: What might the characters cook or eat?' },
      { text: 'Cook a matching dish together.', tip: "It doesn't have to be a perfect match — imagination is what counts!" },
      { text: 'Retell the story while eating.' },
    ],
    learningGoals: ['Language development', 'Creativity', 'Storytelling'],
    tukiTip: 'Stories + cooking = double the experience! Your child connects imagination with real action.',
  },

  'schatzsuche-natur': {
    title: 'Nature Treasure Hunt',
    subtitle: 'Explore outdoors & collect treasures',
    materials: [
      'Egg carton as a collecting box',
      'Picture checklist (leaf, stone, flower, stick)',
    ],
    steps: [
      { text: 'Prepare a picture checklist: What do we want to find?' },
      { text: 'Head outside — garden, park or forest.' },
      { text: 'Search for treasures together and place them in the egg carton.', tip: 'Each compartment gets a different treasure!' },
      { text: 'At home, look at your finds, name them and sort them by size.' },
    ],
    learningGoals: ['Understanding nature', 'Categorising', 'Fine motor skills'],
    tukiTip: 'From nature to the house — collecting treasures combines movement, language and a spirit of discovery.',
  },

  'fingerfarben-malen': {
    title: 'Finger Paint Masterpiece',
    subtitle: 'Squish, mix & marvel',
    materials: [
      'Finger paints',
      'Large sheet of paper',
      'Apron',
      'Washcloth',
    ],
    steps: [
      { text: "Tape paper to the table so it doesn't slide." },
      { text: 'Dab small blobs of finger paint onto the paper.' },
      { text: 'Paint with fingers, hands and even feet!', tip: 'No right or wrong — every mark is art!' },
      { text: 'Watch the colours mix: What happens when red meets blue?' },
    ],
    learningGoals: ['Sensory awareness', 'Colour understanding', 'Creativity'],
    tukiTip: 'Finger painting is a pure sensory experience! Apron on, paper out, and off you go on a colourful adventure.',
  },

  'hindernisparcours': {
    title: 'Living Room Obstacle Course',
    subtitle: 'Climb, crawl & balance',
    materials: [
      'Cushions',
      'Blankets',
      'Chairs',
      'Masking tape for a line on the floor',
    ],
    steps: [
      { text: 'Build an obstacle course out of cushions and chairs.' },
      { text: 'Set up stations: climb over cushions, crawl under chairs.', tip: 'Let your child help build — that is half the activity already!' },
      { text: 'Run through the course together.' },
      { text: 'Increase the difficulty: hop on one leg, walk backwards…' },
    ],
    learningGoals: ['Gross motor skills', 'Balance', 'Spatial awareness'],
    tukiTip: 'Indoor movement is totally possible! An obstacle course builds body awareness and is perfect for rainy days.',
  },

  'schattentheater': {
    title: 'Shadow Puppet Theatre',
    subtitle: 'Craft figures & put on a show',
    materials: [
      'Torch / flashlight',
      'Cardboard',
      'Sticks',
      'Scissors',
      'White sheet / bedsheet',
    ],
    steps: [
      { text: 'Cut figures out of cardboard (animals, people, trees).' },
      { text: 'Attach them to sticks.' },
      { text: 'Hang up the white sheet and place the torch behind it.' },
      { text: 'Hold the figures between the light and the sheet and act out a story.', tip: 'The shadows grow bigger when you move closer to the light — fascinating!' },
    ],
    learningGoals: ['Creativity', 'Storytelling', 'Fine motor skills'],
    tukiTip: 'Shadow theatre combines crafting, imagination and physics. Every show becomes a one-of-a-kind adventure!',
  },

  'balancieren-lernen': {
    title: 'Balance Master',
    subtitle: 'Playful balance training',
    materials: [
      'Masking tape or rope',
      'Cushions',
      'Books for balancing on your head',
    ],
    steps: [
      { text: 'Stick a line of masking tape on the floor.' },
      { text: 'Balance along the line — as if walking a tightrope!', tip: 'Spreading your arms out helps with balance!' },
      { text: 'Level up: balance a book on your head.' },
      { text: 'Who can go the furthest without stepping off?' },
    ],
    learningGoals: ['Balance', 'Body awareness', 'Concentration'],
    tukiTip: 'Balance exercises strengthen core muscles and boost concentration — and they are really fun too!',
  },

  'musik-instrumente': {
    title: 'Music Workshop',
    subtitle: 'Build instruments from household items',
    materials: [
      'Empty tins',
      'Rice or lentils',
      'Rubber bands',
      'Wooden spoons',
      'Empty bottles',
    ],
    steps: [
      { text: 'Fill rice into empty tins or bottles — shaker!' },
      { text: 'Stretch rubber bands around a box — guitar!' },
      { text: 'Two spoons together — rhythm sticks!', tip: 'Every child builds their own instrument — no right or wrong!' },
      { text: 'Play a song together and sing along.' },
    ],
    learningGoals: ['Sense of rhythm', 'Creativity', 'Fine motor skills'],
    tukiTip: "Making music from everyday objects sparks creativity and shows: you don't need much for loads of fun!",
  },

  'buchstaben-suchen': {
    title: 'Letter Detective',
    subtitle: 'Spot letters in everyday life',
    materials: [
      'Packaging, books, signs',
      'Paper and pens',
    ],
    steps: [
      { text: "Choose a letter — for example the first letter of your child's name." },
      { text: 'Search at home or outside: Where is the letter hiding?' },
      { text: 'Celebrate every find and write it down.', tip: 'On packaging, number plates, books — letters are everywhere!' },
      { text: 'Count at the end: How many did we find?' },
    ],
    learningGoals: ['Letter recognition', 'Attention', 'Pre-school preparation'],
    tukiTip: 'Letter hunting turns everyday life into a learning game. Your child becomes a detective and discovers language all around!',
  },

  'fuehlen-raten': {
    title: 'Guess-by-Touch Game',
    subtitle: 'Feel objects without looking',
    materials: [
      'Cloth bag or box with a hole',
      'Various objects (ball, spoon, fruit, stone)',
    ],
    steps: [
      { text: 'Place different objects in the bag.' },
      { text: 'Your child reaches in blindly and feels one object.' },
      { text: "Describe it: 'It's round, soft, smooth…'", tip: "Help with questions: 'Is it hard or soft? Big or small?'" },
      { text: 'Guess what it is — then pull it out and check!' },
    ],
    learningGoals: ['Tactile perception', 'Vocabulary', 'Describing'],
    tukiTip: 'Feeling without seeing sharpens the senses enormously. And the guessing is always a hilarious moment!',
  },

  'experiment-vulkan': {
    title: 'Baking Soda Volcano',
    subtitle: 'Science that wows',
    materials: [
      'Baking soda',
      'Vinegar',
      'Food colouring',
      'Glass or bowl',
      'Tray',
    ],
    steps: [
      { text: 'Place the glass on a tray (to catch overflow!).' },
      { text: 'Put 2–3 tablespoons of baking soda into the glass.' },
      { text: 'Add food colouring for the lava effect.' },
      { text: 'Pour vinegar over it and watch in awe!', tip: 'It foams and fizzes! Safe to touch and completely harmless.' },
    ],
    learningGoals: ['Natural science', 'Cause and effect', 'Sense of wonder'],
    tukiTip: 'The volcano effect amazes every child! A simple experiment that shows: science is magical.',
  },

  'memory-selber-machen': {
    title: 'Make Your Own Memory Game',
    subtitle: 'Draw, cut out & play',
    materials: [
      'Cardboard',
      'Scissors',
      'Pens',
      'Ruler',
    ],
    steps: [
      { text: 'Cut the cardboard into equal-sized rectangles (at least 12 pieces).' },
      { text: 'Draw matching pairs: animals, shapes, colours.', tip: 'Let your child choose the motifs — the more personal, the more fun!' },
      { text: 'Turn the cards face-down and shuffle.' },
      { text: 'Play memory: flip two cards at a time — who finds the most pairs?' },
    ],
    learningGoals: ['Memory', 'Fine motor skills', 'Concentration'],
    tukiTip: 'A homemade memory game is more special than a shop-bought one! Your child draws, crafts and plays — triple the learning.',
  },

  'yoga-tiere': {
    title: 'Animal Yoga for Kids',
    subtitle: 'Stretch, breathe & mimic animals',
    materials: [
      'Yoga mat or blanket',
      'Comfortable clothing',
    ],
    steps: [
      { text: 'Stand on the mat and take deep breaths together.' },
      { text: 'Cat: Get on all fours, arch your back and stretch.' },
      { text: 'Dog: Hands and feet on the floor, bottom up in the air.' , tip: 'Make the animal sounds too — it makes it so much funnier!' },
      { text: 'Flamingo: Stand on one leg and spread your arms.' },
      { text: 'To finish: lie on your back and feel your breath.' },
    ],
    learningGoals: ['Body awareness', 'Balance', 'Relaxation'],
    tukiTip: 'Animal yoga brings movement and calm together. Perfect as a morning ritual or before bedtime!',
  },

  'messbecher-experiment': {
    title: 'Measuring Cup Explorer',
    subtitle: 'Full, half, empty — understanding quantities',
    materials: [
      'Measuring cups (different sizes)',
      'Water',
      'Bowls',
      'Sponge for wiping up',
    ],
    steps: [
      { text: 'Line up different measuring cups side by side.' },
      { text: "Ask questions: 'Which one is bigger? Which one is smaller?'" },
      { text: "Measure water: 'Fill the cup up to the red line.'", tip: "Introduce concepts like 'full', 'half full' and 'empty'!" },
      { text: 'Experiment: Do 2 small cups fit into the big one?' },
    ],
    learningGoals: ['Understanding quantities', 'Comparing', 'Logical thinking'],
    tukiTip: 'Measuring is hands-on maths! Your child learns concepts like full, half and empty in a completely natural way.',
  },

  'ostereier-faerben': {
    title: 'Dyeing Easter Eggs',
    subtitle: 'Colour eggs with natural dyes',
    materials: [
      'Hard-boiled eggs',
      'Food colouring or natural dyes',
      'Vinegar',
      'Containers',
      'Brushes',
      'Stickers',
    ],
    steps: [
      { text: 'Prepare the dye bath: mix water with food colouring and a splash of vinegar.' },
      { text: 'Carefully dip the eggs into the dye and leave for 5–10 minutes.', tip: 'The longer the egg stays in the dye bath, the richer the colour!' },
      { text: 'Let the eggs dry.' },
      { text: 'Decorate with stickers, wax crayons or a brush.' },
    ],
    learningGoals: ['Colour understanding', 'Fine motor skills', 'Creativity'],
    tukiTip: 'Dyeing Easter eggs is the ultimate spring classic! In the Tuki your child can reach the dye cups perfectly.',
  },

  'fruehlings-blumen-pflanzen': {
    title: 'Planting Spring Flowers',
    subtitle: 'Seeds into soil & watch them grow',
    materials: [
      'Small pots',
      'Potting soil',
      'Sunflower or cress seeds',
      'Watering cup',
      'Small shovel',
    ],
    steps: [
      { text: 'Fill pots with soil — your child scoops it themselves!' },
      { text: 'Place seeds on the soil and press down gently.', tip: "Don't go too deep — seeds need light to germinate!" },
      { text: 'Water carefully.' },
      { text: 'Put in a sunny spot and observe daily.' },
    ],
    learningGoals: ['Understanding nature', 'Responsibility', 'Patience'],
    tukiTip: 'Water and check together every day — after just a few days the first shoots appear. Wonder guaranteed!',
  },

  'oster-schatzsuche': {
    title: 'Easter Treasure Hunt',
    subtitle: 'Search for eggs & treats in the garden',
    materials: [
      'Colourful Easter eggs (plastic or real)',
      'Basket',
      'Small surprises',
      'Optional: picture clue cards',
    ],
    steps: [
      { text: "While your child isn't looking, hide eggs in the garden or around the house." },
      { text: 'Hand over a basket and send them off!', tip: 'For little ones: hide eggs in plain sight. For older kids: trickier hiding spots!' },
      { text: 'Count together: How many eggs did we find?' },
      { text: 'Open the eggs and marvel at the surprises.' },
    ],
    learningGoals: ['Movement', 'Counting', 'Spatial orientation'],
    tukiTip: 'After the hunt, unpack, sort and count the treasures in the Tuki — maths and movement in one!',
  },

  'schmetterlinge-beobachten': {
    title: 'Watching Butterflies',
    subtitle: 'Discover spring visitors & draw them',
    materials: [
      'Magnifying glass',
      'Drawing paper',
      'Coloured pencils',
      'Picture book about butterflies',
    ],
    steps: [
      { text: 'In the garden or park, keep an eye out for butterflies.' },
      { text: 'Observe with the magnifying glass: What colours does the butterfly have?', tip: 'Be quiet — butterflies are shy!' },
      { text: 'At home, draw the butterfly from memory.' },
      { text: 'Look it up in the picture book: What species was it?' },
    ],
    learningGoals: ['Nature observation', 'Concentration', 'Drawing'],
    tukiTip: 'Back home your child draws and browses the book in the Tuki. Inspired by nature!',
  },

  'vogelhaus-bauen': {
    title: 'Build a Bird Feeder',
    subtitle: 'Make a home for the birds',
    materials: [
      'Empty milk carton (clean & dry)',
      'Paints',
      'Brushes',
      'Scissors',
      'String',
      'Bird seed',
    ],
    steps: [
      { text: 'Rinse out the milk carton and let it dry.' },
      { text: 'Cut a hole (entrance) in the side.', tip: 'Adults cut — children decorate!' },
      { text: 'Paint the carton in bright colours and let it dry.' },
      { text: 'Attach string at the top and hang it outside.' },
      { text: 'Fill with bird seed and watch which birds come to visit!' },
    ],
    learningGoals: ['Creativity', 'Understanding animals', 'Responsibility'],
    tukiTip: 'In the Tuki your child paints the bird feeder and fills in the seed. Then watch together from the window!',
  },

  'fruehlingsblumen-pressen': {
    title: 'Pressing Spring Flowers',
    subtitle: 'Collect, press & craft with flowers',
    materials: [
      'Daisies, violets, clover',
      'Heavy book or flower press',
      'Paper',
      'Glue',
    ],
    steps: [
      { text: 'Collect spring flowers outside (daisies, clover, violets).', tip: 'Only pick where it is allowed — meadows, not flower beds!' },
      { text: 'Place flowers between sheets of paper inside a heavy book.' },
      { text: 'Wait a few days until they are dry and flat.' },
      { text: 'Glue the dried flowers onto cards or pictures.' },
    ],
    learningGoals: ['Understanding nature', 'Patience', 'Fine motor skills'],
    tukiTip: 'Sort and glue flowers in the Tuki — your child creates their very own spring picture!',
  },

  'oster-memory': {
    title: 'Easter Memory Game',
    subtitle: 'Craft your own card game with Easter motifs',
    materials: [
      'Cardboard',
      'Scissors',
      'Coloured pencils',
      'Ruler',
      'Stickers',
    ],
    steps: [
      { text: 'Cut cardboard into equal-sized cards (at least 12 pieces).' },
      { text: 'Draw matching pairs: Easter bunny, egg, chick, flower, nest, butterfly.', tip: 'Easter motifs are easy to draw — simple round shapes are enough!' },
      { text: 'Let the cards dry and turn them face-down.' },
      { text: 'Play memory: Who finds the most pairs?' },
    ],
    learningGoals: ['Memory', 'Fine motor skills', 'Concentration'],
    tukiTip: 'Draw and cut out the cards in the Tuki, then play together at the table. Homemade beats shop-bought!',
  },

  'barfusspfad-fruehling': {
    title: 'Spring Barefoot Trail',
    subtitle: 'Feel nature with bare feet',
    materials: [
      'Grass',
      'Stones',
      'Sand',
      'Water',
      'Moss',
      'Different ground textures',
    ],
    steps: [
      { text: 'Set up different stations in the garden: grass, stones, sand, water.' },
      { text: 'Take off shoes and socks!' },
      { text: 'Walk barefoot from station to station.', tip: 'Closing your eyes makes it even more exciting!' },
      { text: 'Describe the feeling: Warm? Cold? Soft? Prickly?' },
    ],
    learningGoals: ['Sensory awareness', 'Vocabulary', 'Body awareness'],
    tukiTip: 'After the barefoot trail, wash your feet in the Tuki and talk about it: What felt the nicest?',
  },

  'regenwurm-beobachtung': {
    title: 'Earthworm Research',
    subtitle: 'Discover tiny creatures in the soil',
    materials: [
      'Small shovel',
      'Magnifying glass',
      'Clear container',
      'Soil',
      'Spray bottle with water',
    ],
    steps: [
      { text: 'Search the garden after a rainy day — earthworms come out then!' },
      { text: 'Gently place a worm into the container with some soil.' },
      { text: 'Observe with the magnifying glass: How does it move? Does it have eyes?', tip: 'Earthworms are harmless — be brave and touch one!' },
      { text: 'After observing, put the worm back in the garden.' },
    ],
    learningGoals: ['Understanding nature', 'Observation', 'Respect for animals'],
    tukiTip: 'Marvel at the worm under the magnifying glass in the Tuki. Children learn: tiny creatures are important for nature!',
  },

  'osterhasen-huepfspiel': {
    title: 'Easter Bunny Hopping Game',
    subtitle: 'Hop like an Easter bunny',
    materials: [
      'Masking tape or chalk',
      'Carrots (as a goal)',
      'Bunny ears (crafted or bought)',
    ],
    steps: [
      { text: 'Stick or draw circles / hopping squares on the floor.' },
      { text: "Put on bunny ears — now you're bunnies!" },
      { text: 'Hop from square to square — just like a real bunny!', tip: 'Who can hop the furthest? Who can hop backwards?' },
      { text: 'A carrot waits at the finish line as a reward.' },
    ],
    learningGoals: ['Gross motor skills', 'Balance', 'Joy of movement'],
    tukiTip: 'After all that hopping, prepare the carrot reward together in the Tuki — movement and cooking combined!',
  },
}

export const categoryInfoEn: Record<string, { label: string }> = {
  motorik: { label: 'Motor Skills' },
  sensorik: { label: 'Sensory' },
  kreativität: { label: 'Creativity' },
  sprache: { label: 'Language' },
  mathe: { label: 'Numbers & Logic' },
  natur: { label: 'Nature & Science' },
}
