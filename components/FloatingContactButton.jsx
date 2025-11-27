// components/FloatingContactButton.jsx
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContactButton() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3">
      {/* واتساپ */}
      <a
        href="https://wa.me/989146075334" // ← شماره واقعی رو بذار
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transform hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="تماس با واتساپ"
      >
        <MessageCircle size={28} />
      </a>

      {/* تلفن */}
      <a
        href="tel:+989146075334" // ← شماره واقعی رو بذار
        className="flex items-center justify-center w-14 h-14 bg-amber-500 text-white rounded-full shadow-2xl hover:bg-amber-600 transform hover:scale-110 transition-all duration-300 animate-bounce delay-100"
        aria-label="تماس تلفنی"
      >
        <Phone size={28} />
      </a>
    </div>
  );
}