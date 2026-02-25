import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useGetAllProducts } from '@/hooks/useQueries';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedProducts() {
  const { data: products, isLoading } = useGetAllProducts();
  const featured = products?.slice(0, 4) ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Our most loved pieces
          </p>
        </div>
        <Link
          to="/catalog"
          search={{ category: undefined }}
          className="hidden sm:flex items-center gap-1 font-body text-sm text-[var(--rose-gold)] hover:text-[var(--rose-gold-dark)] transition-colors"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex justify-between items-center pt-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : featured.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-body text-muted-foreground">No products available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id.toString()} product={product} />
          ))}
        </div>
      )}

      <div className="sm:hidden mt-6 text-center">
        <Link
          to="/catalog"
          search={{ category: undefined }}
          className="inline-flex items-center gap-1 font-body text-sm text-[var(--rose-gold)] hover:text-[var(--rose-gold-dark)] transition-colors"
        >
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
