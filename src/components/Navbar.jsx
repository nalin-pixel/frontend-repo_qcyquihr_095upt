import { ShoppingCart } from "lucide-react";

function Navbar({ onCartClick, cartCount }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold text-lg">Flames Shop</span>
        </a>
        <button onClick={onCartClick} className="relative inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
          <ShoppingCart size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
