
import { Button } from "@/components/ui/button";

interface FooterProps {
  onChatClick: () => void;
}

const Footer = ({ onChatClick }: FooterProps) => {
  return (
    <footer className="bg-spicy-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">🌶️</span>
              Spicy Eden Kitchen
            </h3>
            <p className="text-gray-300">
              Delivering bold flavors and heat to spice lovers everywhere.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 hello@spicyeden.com</p>
              <p>📞 (555) 123-SPICE</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-spicy-orange transition-colors">Facebook</a>
                <a href="#" className="hover:text-spicy-orange transition-colors">Instagram</a>
                <a href="#" className="hover:text-spicy-orange transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Need Help?</h4>
            <p className="text-gray-300 mb-4">
              Our chat assistant is here to help with recommendations and questions!
            </p>
            <Button 
              onClick={onChatClick}
              className="bg-spicy-orange hover:bg-spicy-red transition-colors"
            >
              Chat with Us 💬
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Spicy Eden Kitchen. All rights reserved. Made with 🔥 and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
