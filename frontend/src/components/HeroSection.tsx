import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--cream)]">
      {/* Two side-by-side images */}
      <div className="grid grid-cols-2 h-[420px] sm:h-[520px] lg:h-[600px]">
        <div className="relative overflow-hidden">
          <img
            src="/assets/generated/hero-nails.dim_800x600.png"
            alt="Beautiful nail art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        </div>
        <div className="relative overflow-hidden">
          <img
            src="/assets/generated/hero-jewellery.dim_800x600.png"
            alt="Elegant jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-transparent" />
        </div>
      </div>

      {/* Centered overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-background/75 backdrop-blur-sm rounded-3xl px-6 py-8 sm:px-10 sm:py-10 max-w-lg mx-auto shadow-card">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--rose-gold)] mb-2">
            Premium Beauty
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
            Elevate Your<br />
            <span className="text-[var(--rose-gold)]">Elegance</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Handcrafted nails & jewellery for the modern woman
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/catalog" search={{ category: undefined }}>
              <Button className="bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body gap-2 w-full sm:w-auto">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/catalog" search={{ category: 'jewellery' }}>
              <Button variant="outline" className="font-body w-full sm:w-auto border-[var(--rose-gold)] text-[var(--rose-gold)] hover:bg-[var(--blush)]">
                View Jewellery
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
