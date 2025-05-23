
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Users, Star } from "lucide-react";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeCard } from "@/components/RecipeCard";
import { FilterPanel } from "@/components/FilterPanel";
import { generateRecipe } from "@/utils/recipeGenerator";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: "",
    dietary: [],
    difficulty: "",
    cookingTime: ""
  });

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsGenerating(true);
    console.log("Generating recipe with ingredients:", selectedIngredients);
    console.log("Applied filters:", filters);
    
    try {
      const recipe = await generateRecipe(selectedIngredients, filters);
      setGeneratedRecipe(recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <ChefHat size={64} className="animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
            Recipe Generator
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Transform your ingredients into culinary masterpieces with AI-powered recipe suggestions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Input & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ChefHat className="text-orange-600" size={24} />
                  Your Ingredients
                </h2>
                <IngredientSelector
                  selectedIngredients={selectedIngredients}
                  onIngredientsChange={setSelectedIngredients}
                />
              </CardContent>
            </Card>

            <FilterPanel filters={filters} onFiltersChange={setFilters} />

            <Button
              onClick={handleGenerateRecipe}
              disabled={selectedIngredients.length === 0 || isGenerating}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Cooking up something delicious...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ChefHat size={20} />
                  Generate Recipe
                </div>
              )}
            </Button>
          </div>

          {/* Right Panel - Generated Recipe */}
          <div className="lg:col-span-2">
            {generatedRecipe ? (
              <RecipeCard recipe={generatedRecipe} />
            ) : (
              <Card className="border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50">
                <CardContent className="p-12 text-center">
                  <ChefHat size={64} className="mx-auto text-orange-400 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    Ready to Cook?
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Select your ingredients and filters, then click "Generate Recipe" to discover amazing dishes you can make!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { icon: ChefHat, label: "Recipes Generated", value: "10,000+" },
            { icon: Clock, label: "Avg Cook Time", value: "30 mins" },
            { icon: Users, label: "Happy Cooks", value: "5,000+" },
            { icon: Star, label: "Avg Rating", value: "4.8/5" }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <stat.icon className="mx-auto text-orange-600 mb-3" size={32} />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
