import { useEffect } from 'react';
import { useGetAllProducts, useSeedProducts } from '@/hooks/useQueries';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryNavigation from '@/components/CategoryNavigation';
import { Shield, Truck, Star, Heart } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    title: 'Quality Assured',
    desc: 'Every product is carefully curated for premium quality',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Quick and safe delivery right to your doorstep',
  },
  {
    icon: Star,
    title: 'Top Rated',
    desc: 'Loved by thousands of happy customers',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    desc: 'Handcrafted with passion and attention to detail',
  },
];

export default function HomePage() {
  const { data: products, isLoading } = useGetAllProducts();
  const seedMutation = useSeedProducts();

  useEffect(() => {
    if (!isLoading && products && products.length === 0 && !seedMutation.isPending) {
      seedMutation.mutate();
    }
  }, [isLoading, products]);

  return (
    <>
      <HeroSection />

      {/* Trust Badges */}
      <section className="bg-[var(--cream-dark)] border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-[var(--blush)] flex items-center justify-center">
                  <badge.icon className="h-5 w-5 text-[var(--rose-gold)]" />
                </div>
                <h3 className="font-serif text-sm font-semibold text-foreground">
                  {badge.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <CategoryNavigation />

      {/* Tagline Banner */}
      <section className="bg-[var(--rose-gold)] py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-white/70 mb-3">
            Our Promise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Beauty is not a luxury,<br />it's a right.
          </h2>
          <p className="font-body text-sm text-white/80">
            We believe every woman deserves to feel beautiful every day.
          </p>
        </div>
      </section>
    </>
  );
}
