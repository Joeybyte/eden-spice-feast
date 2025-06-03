
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "./FoodCard";

export interface CartItem extends FoodItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout, onClose }: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.06; // 6% SST in Malaysia
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Your Cart
              <Button variant="ghost" onClick={onClose}>×</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            <Button onClick={onClose} className="w-full">Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Your Cart 🛒
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">RM{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>RM{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>SST (6%):</span>
              <span>RM{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-spicy-red">RM{total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            onClick={onCheckout} 
            className="w-full mt-6 bg-spicy-red hover:bg-spicy-dark"
          >
            Proceed to Checkout 💳
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
