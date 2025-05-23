
// Mock recipe generator - in a real app, this would call an AI API
export const generateRecipe = async (ingredients: string[], filters: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Sample recipes based on common ingredients
  const sampleRecipes = [
    {
      name: "Mediterranean Chicken Bowl",
      description: "A healthy and flavorful bowl with Mediterranean spices and fresh vegetables",
      cookingTime: 25,
      servings: 4,
      difficulty: "Easy",
      cuisine: "Mediterranean",
      ingredients: [
        "2 lbs chicken breast, diced",
        "1 large onion, sliced",
        "3 cloves garlic, minced",
        "2 bell peppers, chopped",
        "2 cups cherry tomatoes",
        "1/4 cup olive oil",
        "2 tsp oregano",
        "1 tsp thyme",
        "Salt and pepper to taste",
        "1/2 cup feta cheese",
        "Fresh parsley for garnish"
      ],
      instructions: [
        "Heat olive oil in a large skillet over medium-high heat",
        "Season chicken with salt, pepper, oregano, and thyme",
        "Cook chicken pieces until golden brown and cooked through, about 6-8 minutes",
        "Add onions and garlic, cook until fragrant, about 2 minutes",
        "Add bell peppers and tomatoes, cook until vegetables are tender",
        "Sprinkle with feta cheese and fresh parsley before serving",
        "Serve over rice or with pita bread"
      ],
      tips: [
        "For extra flavor, marinate the chicken for 30 minutes before cooking",
        "Add a squeeze of lemon juice before serving for brightness",
        "This dish tastes even better the next day!"
      ],
      nutrition: {
        calories: 320,
        protein: "28g",
        carbs: "12g",
        fat: "18g"
      }
    },
    {
      name: "Creamy Mushroom Pasta",
      description: "Rich and creamy pasta dish with sautéed mushrooms and fresh herbs",
      cookingTime: 20,
      servings: 4,
      difficulty: "Easy",
      cuisine: "Italian",
      ingredients: [
        "1 lb pasta (fettuccine or penne)",
        "8 oz mixed mushrooms, sliced",
        "3 cloves garlic, minced",
        "1 medium onion, diced",
        "1 cup heavy cream",
        "1/2 cup white wine (optional)",
        "1/4 cup olive oil",
        "1/2 cup parmesan cheese, grated",
        "Fresh thyme and parsley",
        "Salt and black pepper to taste"
      ],
      instructions: [
        "Cook pasta according to package directions until al dente",
        "Heat olive oil in a large pan over medium heat",
        "Sauté onions until translucent, about 3 minutes",
        "Add garlic and mushrooms, cook until mushrooms are golden",
        "Add white wine and let it reduce by half",
        "Pour in cream and simmer until slightly thickened",
        "Add cooked pasta and toss with the sauce",
        "Stir in parmesan cheese and fresh herbs",
        "Season with salt and pepper, serve immediately"
      ],
      tips: [
        "Use a mix of different mushrooms for more complex flavor",
        "Reserve some pasta water to thin the sauce if needed",
        "Don't let the cream boil or it may curdle"
      ],
      nutrition: {
        calories: 485,
        protein: "16g",
        carbs: "52g",
        fat: "24g"
      }
    },
    {
      name: "Asian Stir-Fry Bowl",
      description: "Quick and healthy stir-fry with fresh vegetables and aromatic ginger",
      cookingTime: 15,
      servings: 3,
      difficulty: "Easy",
      cuisine: "Asian",
      ingredients: [
        "2 cups mixed vegetables (broccoli, carrots, bell peppers)",
        "1 tbsp fresh ginger, minced",
        "3 cloves garlic, minced",
        "2 tbsp soy sauce",
        "1 tbsp sesame oil",
        "2 tbsp vegetable oil",
        "1 tsp honey",
        "2 green onions, sliced",
        "1 tbsp sesame seeds",
        "Cooked rice for serving"
      ],
      instructions: [
        "Heat vegetable oil in a large wok or skillet over high heat",
        "Add ginger and garlic, stir-fry for 30 seconds until fragrant",
        "Add harder vegetables first (carrots, broccoli) and stir-fry for 2 minutes",
        "Add softer vegetables (bell peppers) and continue cooking",
        "Mix soy sauce, sesame oil, and honey in a small bowl",
        "Pour sauce over vegetables and toss to coat",
        "Garnish with green onions and sesame seeds",
        "Serve immediately over steamed rice"
      ],
      tips: [
        "Keep vegetables crisp-tender for the best texture",
        "Have all ingredients prepped before you start cooking",
        "Add protein like tofu or chicken for a complete meal"
      ],
      nutrition: {
        calories: 180,
        protein: "6g",
        carbs: "22g",
        fat: "8g"
      }
    }
  ];

  // Select a recipe based on ingredients (simplified logic)
  let selectedRecipe = sampleRecipes[0];
  
  if (ingredients.some(ing => ing.toLowerCase().includes('pasta'))) {
    selectedRecipe = sampleRecipes[1];
  } else if (ingredients.some(ing => ['ginger', 'soy sauce', 'broccoli'].includes(ing.toLowerCase()))) {
    selectedRecipe = sampleRecipes[2];
  }

  // Apply filters to modify the recipe
  if (filters.cuisine && filters.cuisine !== selectedRecipe.cuisine) {
    selectedRecipe = { 
      ...selectedRecipe, 
      cuisine: filters.cuisine,
      name: `${filters.cuisine} Style ${selectedRecipe.name.split(' ').slice(1).join(' ')}`
    };
  }

  if (filters.difficulty) {
    selectedRecipe = { ...selectedRecipe, difficulty: filters.difficulty };
  }

  // Filter out ingredients not selected by user and add user ingredients
  const userIngredients = ingredients.map(ing => {
    const amount = ["1 cup", "2 tbsp", "1 tsp", "1 lb", "2 cloves"][Math.floor(Math.random() * 5)];
    return `${amount} ${ing.toLowerCase()}`;
  });

  selectedRecipe = {
    ...selectedRecipe,
    ingredients: [...userIngredients, ...selectedRecipe.ingredients.slice(userIngredients.length)]
  };

  return selectedRecipe;
};
