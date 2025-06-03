
import FoodCard, { FoodItem } from "./FoodCard";

interface FoodSectionProps {
  onAddToCart: (item: FoodItem) => void;
}

const FoodSection = ({ onAddToCart }: FoodSectionProps) => {
  const spicyFoods: FoodItem[] = [
    {
      id: 1,
      name: "Fire Dragon Wings",
      description: "Crispy wings glazed with our signature ghost pepper sauce",
      price: 14.99,
      calories: 520,
      protein: 45,
      carbs: 8,
      fat: 32,
      spiceLevel: 5,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Volcanic Pasta",
      description: "Spicy arrabbiata with jalapeños and crushed red pepper",
      price: 16.99,
      calories: 680,
      protein: 22,
      carbs: 85,
      fat: 24,
      spiceLevel: 3,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Inferno Tacos",
      description: "Three soft tacos with habanero-marinated chicken and spicy salsa",
      price: 12.99,
      calories: 450,
      protein: 38,
      carbs: 42,
      fat: 18,
      spiceLevel: 4,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Devil's Curry",
      description: "Authentic Thai red curry with extra chilies and coconut milk",
      price: 18.99,
      calories: 620,
      protein: 35,
      carbs: 45,
      fat: 35,
      spiceLevel: 4,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Blazing BBQ Ribs",
      description: "Tender ribs smothered in our Carolina reaper BBQ sauce",
      price: 22.99,
      calories: 780,
      protein: 55,
      carbs: 25,
      fat: 48,
      spiceLevel: 5,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Spicy Shrimp Bowl",
      description: "Cajun-spiced shrimp over rice with jalapeño and bell peppers",
      price: 19.99,
      calories: 540,
      protein: 42,
      carbs: 55,
      fat: 15,
      spiceLevel: 3,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="food" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-spicy-dark mb-12">
          Our Fiery Menu 🔥
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spicyFoods.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodSection;
