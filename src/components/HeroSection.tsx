
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBrowseFood: () => void;
  onOrderNow: () => void;
}

const HeroSection = ({ onBrowseFood, onOrderNow }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-spicy-red via-spicy-orange to-spicy-yellow text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6 animate-pulse">Welcome to Spicy Eden Kitchen</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We're dedicated to helping people enjoy spicy food that delivers both bold flavor and heat. 
          Explore our fiery dishes that satisfy both spice lovers and flavor seekers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onBrowseFood}
            size="lg" 
            className="bg-white text-spicy-red hover:bg-gray-100 font-semibold px-8 py-3 text-lg transition-all transform hover:scale-105"
          >
            Browse Food 🔥
          </Button>
          <Button 
            onClick={onOrderNow}
            size="lg" 
            variant="outline" 
            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-spicy-red font-semibold px-8 py-3 text-lg transition-all transform hover:scale-105"
          >
            Order Now 🌶️
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
