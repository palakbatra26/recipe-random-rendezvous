
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Star } from "lucide-react";

interface Recipe {
  name: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden shadow-xl border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">{recipe.name}</h2>
            <p className="text-orange-100 text-lg">{recipe.description}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Star className="text-yellow-300 fill-current" size={20} />
            <span className="font-semibold">4.8</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <Clock size={18} />
            <span>{recipe.cookingTime} mins</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <Users size={18} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <ChefHat size={18} />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm">1</div>
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm">2</div>
              Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <ChefHat size={18} />
              Chef's Tips
            </h4>
            <ul className="space-y-1">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="text-green-700 text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recipe.nutrition && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3">Nutrition Information (per serving)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{recipe.nutrition.calories}</p>
                <p className="text-sm text-blue-600">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{recipe.nutrition.protein}</p>
                <p className="text-sm text-blue-600">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{recipe.nutrition.carbs}</p>
                <p className="text-sm text-blue-600">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{recipe.nutrition.fat}</p>
                <p className="text-sm text-blue-600">Fat</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          <Badge className="bg-orange-100 text-orange-800">{recipe.cuisine}</Badge>
          <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
          <Badge className="bg-amber-100 text-amber-800">{recipe.cookingTime} min cook</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
