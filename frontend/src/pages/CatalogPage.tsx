import { useSearch, useNavigate } from '@tanstack/react-router';
import { useGetAllProducts, useGetProductsByCategory } from '@/hooks/useQueries';
import { ProductCategory } from '@/backend';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'nails' | 'jewellery';

export default function CatalogPage() {
  const search = useSearch({ from: '/catalog' });
  const navigate = useNavigate();
  const activeFilter: FilterType = (search as any).category ?? 'all';

  const allProductsQuery = useGetAllProducts();
  const nailsQuery = useGetProductsByCategory(ProductCategory.nails);
  const jewelleryQuery = useGetProductsByCategory(ProductCategory.jewellery);

  const isLoading =
    activeFilter === 'all'
      ? allProductsQuery.isLoading
      : activeFilter === 'nails'
      ? nailsQuery.isLoading
      : jewelleryQuery.isLoading;

  const products =
    activeFilter === 'all'
      ? allProductsQuery.data ?? []
      : activeFilter === 'nails'
      ? nailsQuery.data ?? []
      : jewelleryQuery.data ?? [];

  const setFilter = (filter: FilterType) => {
    navigate({
      to: '/catalog',
      search: { category: filter === 'all' ? undefined : filter },
    });
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Nails', value: 'nails' },
    { label: 'Jewellery', value: 'jewellery' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
          Our Collection
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Discover premium nails and jewellery crafted for you
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-10">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={activeFilter === f.value ? 'default' : 'outline'}
            onClick={() => setFilter(f.value)}
            className={
              activeFilter === f.value
                ? 'bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body'
                : 'font-body border-[var(--rose-gold)] text-[var(--rose-gold)] hover:bg-[var(--blush)]'
            }
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-muted-foreground mb-2">
            No products found
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Try a different category or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id.toString()} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
