// English translations for recipes

export const recipesEn: Record<string, {
  title: string
  subtitle: string
  tags: string[]
  ingredients: { amount: string; item: string }[]
  steps: { text: string; tip?: string }[]
  tukiTip: string
}> = {
  'banana-pancakes': {
    title: 'Banana Pancakes',
    subtitle: 'Fluffy, sweet & only 3 ingredients',
    tags: ['Breakfast', 'Quick', 'Healthy'],
    ingredients: [
      { amount: '2', item: 'Ripe bananas' },
      { amount: '2', item: 'Eggs' },
      { amount: '4 tbsp', item: 'Oats (optional)' },
      { amount: '1 pinch', item: 'Cinnamon' },
      { amount: 'A little', item: 'Coconut oil for frying' },
    ],
    steps: [
      { text: 'Put the bananas in a bowl and mash with a fork.', tip: 'Your child can do this really well â the riper the banana, the easier!' },
      { text: 'Add the eggs and mix well.' },
      { text: 'Optionally stir in the oats and cinnamon.' },
      { text: 'Heat some coconut oil in a pan and cook small pancakes (2 min each side).' },
      { text: 'Serve with fresh berries or a dollop of yoghurt.' },
    ],
    tukiTip: 'Perfect for little hands: your child stands in the Tuki and mashes the bananas themselves. Great for fine motor skills!',
  },
  'gemÃ¼se-muffins': {
    title: 'Colourful veggie muffins',
    subtitle: 'Hidden vegetables that kids love',
    tags: ['Snack', 'Vegetables', 'Meal Prep'],
    ingredients: [
      { amount: '200g', item: 'Flour' },
      { amount: '1 tsp', item: 'Baking powder' },
      { amount: '2', item: 'Eggs' },
      { amount: '100ml', item: 'Milk' },
      { amount: '80ml', item: 'Olive oil' },
      { amount: '1', item: 'Courgette (grated)' },
      { amount: '1', item: 'Carrot (grated)' },
      { amount: '50g', item: 'Cheese (grated)' },
      { amount: '1 pinch', item: 'Salt & pepper' },
    ],
    steps: [
      { text: 'Preheat oven to 180Â°C. Prepare the muffin tin.' },
      { text: 'Wash and grate the vegetables.', tip: 'From age 3, your child can help with a children\'s grater!' },
      { text: 'Mix the dry ingredients in a bowl.' },
      { text: 'Whisk the eggs, milk and oil and add.' },
      { text: 'Fold in the grated vegetables and cheese.' },
      { text: 'Fill the muffin tin and bake for 25 min.' },
    ],
    tukiTip: 'In the Tuki, your child can wonderfully stir and spoon the batter into the cases. Count together: one, two, three muffins!',
  },
  'energy-balls': {
    title: 'Date energy balls',
    subtitle: 'Healthy snack with no added sugar',
    tags: ['Snack', 'Sugar-free', 'No cooking needed'],
    ingredients: [
      { amount: '150g', item: 'Medjool dates (pitted)' },
      { amount: '100g', item: 'Oats' },
      { amount: '2 tbsp', item: 'Desiccated coconut' },
      { amount: '2 tbsp', item: 'Cocoa powder' },
      { amount: '1 tbsp', item: 'Peanut butter' },
    ],
    steps: [
      { text: 'Put all ingredients in a bowl.' },
      { text: 'Knead well with your hands until you get a sticky mixture.', tip: 'This is the highlight for kids â getting messy is allowed!' },
      { text: 'Roll into small balls (about 15 pieces).' },
      { text: 'Roll in desiccated coconut.' },
      { text: 'Refrigerate for 30 min â done!' },
    ],
    tukiTip: 'Rolling balls is perfect fine motor skills training. Your child stands in the Tuki at working height and can really help.',
  },
  'pizza-gesichter': {
    title: 'Pizza faces',
    subtitle: 'Creative mini pizzas to decorate yourself',
    tags: ['Lunch', 'Creative', 'Family favourite'],
    ingredients: [
      { amount: '1', item: 'Ready-made pizza dough (or homemade)' },
      { amount: '200ml', item: 'Tomato sauce' },
      { amount: '200g', item: 'Mozzarella' },
      { amount: 'Various', item: 'Vegetables for topping: olives, peppers, sweetcorn, cherry tomatoes' },
    ],
    steps: [
      { text: 'Preheat oven to 220Â°C.' },
      { text: 'Shape the dough into 4 round bases.', tip: 'Children love pressing and shaping the dough!' },
      { text: 'Spread the tomato sauce.' },
      { text: 'Now get creative: make funny faces with the vegetables!', tip: 'Olive eyes, pepper mouth, sweetcorn nose â the sky\'s the limit.' },
      { text: 'Bake for 12-15 minutes until the cheese is golden brown.' },
    ],
    tukiTip: 'In the Tuki, your child can perfectly reach the worktop and create their own pizza face. It encourages creativity and independence!',
  },
  'obstspiesse': {
    title: 'Rainbow fruit skewers',
    subtitle: 'Learn colours & snack healthily',
    tags: ['Snack', 'Healthy', 'Learn colours'],
    ingredients: [
      { amount: '1 handful', item: 'Strawberries (red)' },
      { amount: '1', item: 'Mandarin (orange)' },
      { amount: '1', item: 'Banana (yellow)' },
      { amount: '1 handful', item: 'Kiwi slices (green)' },
      { amount: '1 handful', item: 'Blueberries (blue)' },
      { amount: '4', item: 'Wooden skewers (blunt-ended!)' },
    ],
    steps: [
      { text: 'Wash the fruit and cut into bite-sized pieces.' },
      { text: 'Sort the colours and name them: red, orange, yellow, green, blue.', tip: 'Use the opportunity to learn colours together!' },
      { text: 'Thread the fruit onto the skewers in rainbow order.' },
      { text: 'Enjoy straight away!' },
    ],
    tukiTip: 'Your child stands in the Tuki and sorts the colours onto the skewer themselves. It trains fine motor skills, colour recognition and is super fun!',
  },
  'weihnachtsguetzli': {
    title: 'Christmas biscuits',
    subtitle: 'Classic Swiss butter cookies',
    tags: ['Christmas', 'Baking', 'Tradition'],
    ingredients: [
      { amount: '300g', item: 'Flour' },
      { amount: '200g', item: 'Butter (cold, cubed)' },
      { amount: '100g', item: 'Icing sugar' },
      { amount: '1', item: 'Egg' },
      { amount: '1 pinch', item: 'Salt' },
      { amount: '1 tsp', item: 'Vanilla extract' },
      { amount: 'As desired', item: 'Icing, sprinkles, chocolate glaze' },
    ],
    steps: [
      { text: 'Mix flour, sugar and salt. Add cold butter and rub into breadcrumbs.' },
      { text: 'Add egg and vanilla, knead into a smooth dough.' },
      { text: 'Wrap dough in cling film and chill for 30 min.' },
      { text: 'Roll out the dough and cut with cookie cutters.', tip: 'Every child\'s favourite moment! Stars, hearts, Christmas trees...' },
      { text: 'Bake at 180Â°C for about 10-12 min (don\'t overbrown!).' },
      { text: 'Let cool and decorate as you like.' },
    ],
    tukiTip: 'Baking biscuits in the Tuki is a Swiss family tradition! Your child rolls, cuts and decorates â all at the perfect height.',
  },
  'smoothie-bowl': {
    title: 'Berry smoothie bowl',
    subtitle: 'Colourful, healthy & creatively decorated',
    tags: ['Breakfast', 'Healthy', 'Quick'],
    ingredients: [
      { amount: '200g', item: 'Frozen berries' },
      { amount: '1', item: 'Banana' },
      { amount: '100ml', item: 'Yoghurt' },
      { amount: 'For topping', item: 'Granola, coconut flakes, fresh berries' },
    ],
    steps: [
      { text: 'Blend the frozen berries, banana and yoghurt in a blender.' },
      { text: 'Pour into two bowls.' },
      { text: 'Now decorate! Granola, coconut flakes and fresh berries on top.', tip: 'Your child chooses the toppings and places them â like a little work of art!' },
    ],
    tukiTip: 'In the Tuki, your child has the perfect view of their bowl and can decorate creatively. Every bowl is unique!',
  },
  'osterhasen-brot': {
    title: 'Easter bunny bread',
    subtitle: 'Sweet bread rolls shaped like bunnies',
    tags: ['Easter', 'Baking', 'Seasonal'],
    ingredients: [
      { amount: '500g', item: 'Flour' },
      { amount: '80g', item: 'Sugar' },
      { amount: '1 cube', item: 'Fresh yeast' },
      { amount: '200ml', item: 'Warm milk' },
      { amount: '80g', item: 'Butter (soft)' },
      { amount: '1', item: 'Egg + 1 yolk for glazing' },
      { amount: '1 pinch', item: 'Salt' },
      { amount: '4', item: 'Raisins for the eyes' },
    ],
    steps: [
      { text: 'Dissolve the yeast in warm milk and leave for 10 min.' },
      { text: 'Mix flour, sugar, salt, egg and butter. Add the yeast milk and knead for 10 min.' },
      { text: 'Cover the dough and leave to rise for 1 hour.' },
      { text: 'Divide dough into 4 pieces. Shape into bunnies: oval body, two long ears.', tip: 'Children love shaping â show them how to roll the ears!' },
      { text: 'Press in raisins for eyes. Brush with egg yolk.' },
      { text: 'Bake at 180Â°C for 20-25 min until golden.' },
    ],
    tukiTip: 'Kneading dough, shaping bunnies, placing eyes â in the Tuki, your child joins in at eye level. An Easter experience to remember!',
  },
}
