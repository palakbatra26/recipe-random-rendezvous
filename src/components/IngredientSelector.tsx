
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const commonIngredients = [
  "Chicken", "Beef", "Pork", "Fish", "Shrimp", "Eggs", "Tofu",
  "Rice", "Pasta", "Bread", "Potatoes", "Onions", "Garlic", "Tomatoes",
  "Bell Peppers", "Carrots", "Broccoli", "Spinach", "Mushrooms",
  "Cheese", "Milk", "Butter", "Olive Oil", "Salt", "Pepper",
  "Basil", "Oregano", "Thyme", "Parsley", "Ginger", "Lemon"
];

export const IngredientSelector = ({ selectedIngredients, onIngredientsChange }: IngredientSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const filtered = commonIngredients.filter(
        ingredient => 
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !selectedIngredients.includes(ingredient)
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      onIngredientsChange([...selectedIngredients, ingredient]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(selectedIngredients.filter(item => item !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addIngredient(inputValue.trim());
    }
  };

  const popularIngredients = commonIngredients.slice(0, 8).filter(
    ingredient => !selectedIngredients.includes(ingredient)
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type an ingredient..."
          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-orange-200 rounded-md shadow-lg z-10 mt-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addIngredient(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-orange-50 flex items-center gap-2"
              >
                <Plus size={16} className="text-orange-600" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Selected Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-orange-600"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-700 mb-2">Popular Ingredients:</h4>
        <div className="flex flex-wrap gap-2">
          {popularIngredients.map((ingredient, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => addIngredient(ingredient)}
              className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400"
            >
              <Plus size={14} className="mr-1" />
              {ingredient}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
