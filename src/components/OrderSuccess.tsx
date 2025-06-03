
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSuccessProps {
  onBackToHome: () => void;
}

const OrderSuccess = ({ onBackToHome }: OrderSuccessProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-spicy-red">
            🎉 Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl">🌶️</div>
          <h2 className="text-xl font-semibold">Your Spicy Feast is on the Way!</h2>
          <p className="text-gray-600">
            Thank you for your order! Your delicious spicy food will be delivered in 30-45 minutes.
          </p>
          <div className="bg-spicy-red/10 p-4 rounded-lg">
            <p className="text-sm text-spicy-dark">
              <strong>Order #SP{Math.floor(Math.random() * 10000)}</strong>
              <br />
              Estimated delivery: 30-45 minutes
            </p>
          </div>
          <Button 
            onClick={onBackToHome}
            className="w-full bg-spicy-red hover:bg-spicy-dark"
          >
            Back to Home 🏠
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
