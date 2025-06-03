
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you with spicy food recommendations and any questions you have. What can I assist you with today? 🌶️",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("recommend") || message.includes("suggestion")) {
      return "I'd recommend our Fire Dragon Wings if you love extreme heat! For something milder, try our Spicy Shrimp Bowl. What's your spice tolerance level? 🔥";
    }
    
    if (message.includes("spice") || message.includes("hot")) {
      return "Our spice levels range from 1-5 chili peppers! Level 3 is perfect for most people, while level 5 is for true spice warriors. Need help choosing? 🌶️";
    }
    
    if (message.includes("order") || message.includes("delivery")) {
      return "You can place an order by adding items to your cart and checking out. We deliver within 30-45 minutes! Any specific questions about your order? 🚚";
    }
    
    if (message.includes("ingredients") || message.includes("allergen")) {
      return "We're happy to provide ingredient lists and allergen information for any dish. Which item would you like to know more about? 📋";
    }
    
    if (message.includes("price") || message.includes("cost")) {
      return "Our dishes range from $12.99 to $22.99. We offer great value for authentic spicy cuisine made with premium ingredients! 💰";
    }
    
    return "That's a great question! I'm here to help with recommendations, spice levels, orders, and general questions. Is there something specific I can help you with? 😊";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getBotResponse(inputValue),
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 h-[80vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex justify-between items-center">
            <span>🌶️ Spicy Chat Assistant</span>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-spicy-red text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about our spicy food..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-spicy-red hover:bg-spicy-dark"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
