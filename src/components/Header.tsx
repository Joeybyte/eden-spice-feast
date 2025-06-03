
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl animate-flame">🌶️</span>
          <h1 className="text-2xl font-bold text-spicy-red">Spicy Eden Kitchen</h1>
        </div>
        <Button 
          onClick={onCartClick}
          variant="outline" 
          className="relative border-spicy-red text-spicy-red hover:bg-spicy-red hover:text-white transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-spicy-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
