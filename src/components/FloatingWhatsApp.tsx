import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const WHATSAPP_NUMBER = '2349032975386';
  const message = 'Hello Al Ishbeeliy Gadgets! I need some help.';
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-pulse"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="animate-bounce" />
    </a>
  );
}
