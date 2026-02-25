import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/logo-icon.dim_256x256.png"
              alt="Parvati Pretty Lab"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-serif text-lg font-semibold text-[var(--rose-gold-dark)] hidden sm:block">
              Parvati Pretty Lab
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              search={{ category: undefined }}
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors"
            >
              Catalog
            </Link>
            <a
              href="#about"
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors"
            >
              About
            </a>
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative text-[var(--rose-gold-dark)] hover:text-[var(--rose-gold)] hover:bg-[var(--blush)]"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--rose-gold)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-body font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[var(--rose-gold-dark)] hover:text-[var(--rose-gold)] hover:bg-[var(--blush)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border py-4 flex flex-col gap-4 animate-fade-in">
            <Link
              to="/"
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors px-2"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              search={{ category: undefined }}
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors px-2"
              onClick={() => setMobileOpen(false)}
            >
              Catalog
            </Link>
            <a
              href="#about"
              className="font-body text-sm text-muted-foreground hover:text-[var(--rose-gold)] transition-colors px-2"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
