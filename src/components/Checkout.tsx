import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartItem } from "./Cart";

interface CheckoutProps {
  items: CartItem[];
  onOrderComplete: () => void;
  onBack: () => void;
}

const Checkout = ({ items, onOrderComplete, onBack }: CheckoutProps) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.06; // 6% SST in Malaysia
  const delivery = 8.99;
  
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 4.99,
      description: "5% discount on all orders, Free delivery on orders above RM50",
      features: ["5% discount", "Free delivery (RM50+)", "Basic customer support"]
    },
    {
      id: "premium",
      name: "Premium Plan", 
      price: 9.99,
      description: "10% discount on all orders, Free delivery, Priority support",
      features: ["10% discount", "Free delivery", "Priority support", "Exclusive recipes"]
    },
    {
      id: "spice-master",
      name: "Spice Master Plan",
      price: 14.99,
      description: "15% discount, Free delivery, Early access to new dishes",
      features: ["15% discount", "Free delivery", "Early access", "Personal spice consultant", "Monthly spice box"]
    }
  ];

  const planDiscount = selectedPlan === "basic" ? 0.05 : selectedPlan === "premium" ? 0.10 : selectedPlan === "spice-master" ? 0.15 : 0;
  const discountAmount = subtotal * planDiscount;
  const adjustedDelivery = selectedPlan && (selectedPlan !== "basic" || subtotal >= 50) ? 0 : delivery;
  const total = subtotal - discountAmount + tax + adjustedDelivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { shippingInfo, paymentMethod, items, total, selectedPlan });
    onOrderComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button onClick={onBack} variant="outline" className="mb-6">
          ← Back to Cart
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Plans */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Choose a Subscription Plan (Optional) 🔥</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan || ""} onValueChange={setSelectedPlan}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                      <Label 
                        htmlFor={plan.id} 
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPlan === plan.id ? 'border-spicy-red bg-spicy-red/5' : 'border-gray-200 hover:border-spicy-orange'
                        }`}
                      >
                        <div className="font-semibold text-lg">{plan.name}</div>
                        <div className="text-2xl font-bold text-spicy-red">RM{plan.price}/month</div>
                        <div className="text-sm text-gray-600 mt-2">{plan.description}</div>
                        <ul className="mt-3 space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </Label>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPlan(null)}
                  className="mt-4"
                >
                  No Subscription (One-time order)
                </Button>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Shipping Information 📦</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Postcode</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label>Payment Method 💳</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="grabpay" id="grabpay" />
                      <Label htmlFor="grabpay">GrabPay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tng" id="tng" />
                      <Label htmlFor="tng">Touch 'n Go eWallet</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-spicy-red hover:bg-spicy-dark text-lg py-3 mt-6"
                >
                  Complete Order 🍽️
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary 📋</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">RM{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>RM{subtotal.toFixed(2)}</span>
                  </div>
                  {selectedPlan && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({(planDiscount * 100).toFixed(0)}%):</span>
                      <span>-RM{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>SST (6%):</span>
                    <span>RM{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className={adjustedDelivery === 0 ? "text-green-600" : ""}>
                      {adjustedDelivery === 0 ? "FREE" : `RM${adjustedDelivery.toFixed(2)}`}
                    </span>
                  </div>
                  {selectedPlan && (
                    <div className="flex justify-between text-spicy-red">
                      <span>Monthly Subscription:</span>
                      <span>RM{subscriptionPlans.find(p => p.id === selectedPlan)?.price.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-spicy-red">RM{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
