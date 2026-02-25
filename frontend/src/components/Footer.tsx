import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'parvati-pretty-lab'
  );

  return (
    <footer className="bg-[var(--cream-dark)] border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/logo-icon.dim_256x256.png"
                alt="Parvati Pretty Lab"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-serif text-base font-semibold text-foreground">
                Parvati Pretty Lab
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Elevate your elegance with our curated collection of premium nails and jewellery.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  search={{ category: undefined }}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  search={{ category: 'nails' }}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nails
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  search={{ category: 'jewellery' }}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jewellery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="about">
            <h3 className="font-serif text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Questions? Reach us on WhatsApp:
            </p>
            <a
              href="https://wa.me/919898047431"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-[var(--rose-gold)] hover:text-[var(--rose-gold-dark)] transition-colors font-medium"
            >
              +91 98980 47431
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-muted-foreground">
            © {year} Parvati Pretty Lab. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground flex items-center gap-1">
            Built with{' '}
            <Heart className="h-3 w-3 fill-[var(--rose-gold)] text-[var(--rose-gold)]" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--rose-gold)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
