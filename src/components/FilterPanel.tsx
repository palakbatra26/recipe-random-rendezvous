
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterPanelProps {
  filters: {
    cuisine: string;
    dietary: string[];
    difficulty: string;
    cookingTime: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const cuisineTypes = [
    "Italian", "Mexican", "Asian", "Indian", "Mediterranean", 
    "American", "French", "Thai", "Japanese", "Chinese"
  ];

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", 
    "Keto", "Paleo", "Low-Carb", "High-Protein"
  ];

  const handleDietaryChange = (option: string, checked: boolean) => {
    const newDietary = checked
      ? [...filters.dietary, option]
      : filters.dietary.filter(item => item !== option);
    
    onFiltersChange({ ...filters, dietary: newDietary });
  };

  return (
    <Card className="border-2 border-green-200 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700">Cuisine Type</Label>
            <Select value={filters.cuisine} onValueChange={(value) => 
              onFiltersChange({ ...filters, cuisine: value })
            }>
              <SelectTrigger className="mt-1 border-green-300 focus:border-green-500">
                <SelectValue placeholder="Any cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any cuisine</SelectItem>
                {cuisineTypes.map(cuisine => (
                  <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Dietary Preferences</Label>
            <div className="mt-2 space-y-2">
              {dietaryOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={filters.dietary.includes(option)}
                    onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                    className="border-green-400 data-[state=checked]:bg-green-600"
                  />
                  <Label htmlFor={option} className="text-sm text-gray-700">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Difficulty Level</Label>
            <Select value={filters.difficulty} onValueChange={(value) => 
              onFiltersChange({ ...filters, difficulty: value })
            }>
              <SelectTrigger className="mt-1 border-green-300 focus:border-green-500">
                <SelectValue placeholder="Any difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any difficulty</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Cooking Time</Label>
            <Select value={filters.cookingTime} onValueChange={(value) => 
              onFiltersChange({ ...filters, cookingTime: value })
            }>
              <SelectTrigger className="mt-1 border-green-300 focus:border-green-500">
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any time</SelectItem>
                <SelectItem value="15">Under 15 minutes</SelectItem>
                <SelectItem value="30">Under 30 minutes</SelectItem>
                <SelectItem value="60">Under 1 hour</SelectItem>
                <SelectItem value="120">Under 2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
