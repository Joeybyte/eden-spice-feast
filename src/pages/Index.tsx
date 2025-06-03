
import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FoodSection from "@/components/FoodSection";
import Footer from "@/components/Footer";
import Cart, { CartItem } from "@/components/Cart";
import Checkout from "@/components/Checkout";
import Chatbot from "@/components/Chatbot";
import OrderSuccess from "@/components/OrderSuccess";
import { FoodItem } from "@/components/FoodCard";
import { useToast } from "@/hooks/use-toast";

type AppState = 'home' | 'cart' | 'checkout' | 'success';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const foodSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addToCart = (item: FoodItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const scrollToFood = () => {
    foodSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      scrollToFood();
    } else {
      setCurrentView('cart');
    }
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentView('success');
    toast({
      title: "Order Placed! 🎉",
      description: "Your spicy feast is being prepared!",
    });
  };

  const resetToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'success') {
    return <OrderSuccess onBackToHome={resetToHome} />;
  }

  if (currentView === 'checkout') {
    return (
      <Checkout
        items={cartItems}
        onOrderComplete={handleOrderComplete}
        onBack={() => setCurrentView('cart')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCurrentView('cart')}
      />
      
      <HeroSection 
        onBrowseFood={scrollToFood}
        onOrderNow={handleOrderNow}
      />
      
      <div ref={foodSectionRef}>
        <FoodSection onAddToCart={addToCart} />
      </div>
      
      <Footer onChatClick={() => setShowChatbot(true)} />

      {currentView === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={() => setCurrentView('checkout')}
          onClose={resetToHome}
        />
      )}

      {showChatbot && (
        <Chatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
};

export default Index;
