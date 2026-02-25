import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export default function CategoryNavigation() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Shop by Category
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Discover our curated collections
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Nails */}
        <Link
          to="/catalog"
          search={{ category: 'nails' }}
          className="group relative overflow-hidden rounded-3xl aspect-[4/3] block"
        >
          <img
            src="/assets/generated/placeholder-nails.dim_600x600.png"
            alt="Nails collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--rose-gold-dark)]/80 via-[var(--rose-gold)]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[var(--rose-gold-light)] mb-1">
                Collection
              </p>
              <h3 className="font-serif text-2xl font-bold text-[var(--cream)]">Nails</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-[var(--rose-gold)] flex items-center justify-center group-hover:bg-[var(--rose-gold-dark)] transition-colors">
              <ArrowRight className="h-5 w-5 text-[var(--cream)]" />
            </div>
          </div>
        </Link>

        {/* Jewellery */}
        <Link
          to="/catalog"
          search={{ category: 'jewellery' }}
          className="group relative overflow-hidden rounded-3xl aspect-[4/3] block"
        >
          <img
            src="/assets/generated/placeholder-jewellery.dim_600x600.png"
            alt="Jewellery collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--rose-gold-dark)]/80 via-[var(--rose-gold)]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[var(--rose-gold-light)] mb-1">
                Collection
              </p>
              <h3 className="font-serif text-2xl font-bold text-[var(--cream)]">Jewellery</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-[var(--rose-gold)] flex items-center justify-center group-hover:bg-[var(--rose-gold-dark)] transition-colors">
              <ArrowRight className="h-5 w-5 text-[var(--cream)]" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
