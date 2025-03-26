import { useState } from "react";
import { Facebook, Twitter, MessageCircle, Linkedin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton flottant pour ouvrir le menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {/* Popup avec les liens des réseaux sociaux */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white shadow-md rounded-lg p-4 w-52 text-center">
          <h3 className="text-lg font-bold mb-2">Discuter avec nous</h3>

          <div className="flex flex-col space-y-3">
            <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
              <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp
            </a>
            <a href="https://facebook.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
              <Facebook className="h-5 w-5 mr-2" /> Facebook
            </a>
            <a href="https://twitter.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              <Twitter className="h-5 w-5 mr-2" /> Twitter
            </a>
            <a href="https://www.tiktok.com/@YOUR_PAGE" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
              <FontAwesomeIcon icon={faTiktok} className="h-5 w-5 mr-2" /> TikTok
            </a>
            <a href="https://www.linkedin.com/in/YOUR_PAGE" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <Linkedin className="h-5 w-5 mr-2" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
