
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  spiceLevel: number;
  image: string;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

const FoodCard = ({ item, onAddToCart }: FoodCardProps) => {
  const getSpiceIndicator = (level: number) => {
    return "🌶️".repeat(level);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-spicy-orange">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-spicy-red text-white px-2 py-1 rounded-full text-sm font-bold">
          {getSpiceIndicator(item.spiceLevel)}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-spicy-dark">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <div className="text-2xl font-bold text-spicy-red">RM{item.price.toFixed(2)}</div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h4 className="font-semibold text-spicy-dark mb-2">Nutritional Facts</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Calories: <span className="font-bold">{item.calories}</span></div>
            <div>Protein: <span className="font-bold">{item.protein}g</span></div>
            <div>Carbs: <span className="font-bold">{item.carbs}g</span></div>
            <div>Fat: <span className="font-bold">{item.fat}g</span></div>
          </div>
        </div>
        <Button 
          onClick={() => onAddToCart(item)}
          className="w-full bg-spicy-red hover:bg-spicy-dark transition-colors font-semibold"
        >
          Add to Cart 🛒
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
