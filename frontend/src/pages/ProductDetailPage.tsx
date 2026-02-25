import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetProduct } from '@/hooks/useQueries';
import { useCart } from '@/context/CartContext';
import { formatPrice, getCategoryLabel, getProductImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import QuantitySelector from '@/components/QuantitySelector';
import { ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams({ from: '/product/$id' });
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const productId = id ? BigInt(id) : null;
  const { data: product, isLoading, isError } = useGetProduct(productId);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="font-serif text-xl text-muted-foreground mb-4">
          Product not found
        </p>
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/catalog', search: { category: undefined } })}
        >
          Back to Catalog
        </Button>
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity <= 0n;
  const imageUrl = getProductImageUrl(product.imageUrl, product.category);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 font-body text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/catalog"
          search={{ category: undefined }}
          className="hover:text-foreground transition-colors"
        >
          Catalog
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-square shadow-card">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="font-body text-sm font-semibold text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <Badge
            variant="secondary"
            className="w-fit mb-3 font-body text-xs"
          >
            {getCategoryLabel(product.category)}
          </Badge>

          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            {product.name}
          </h1>

          <p className="font-serif text-2xl font-semibold text-[var(--rose-gold)] mb-4">
            {formatPrice(product.price)}
          </p>

          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs bg-[var(--cream-dark)] text-muted-foreground px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <div
              className={`h-2 w-2 rounded-full ${
                isOutOfStock ? 'bg-destructive' : 'bg-green-500'
              }`}
            />
            <span className="font-body text-sm text-muted-foreground">
              {isOutOfStock
                ? 'Out of stock'
                : `${product.stockQuantity.toString()} in stock`}
            </span>
          </div>

          {!isOutOfStock && (
            <div className="mb-6">
              <p className="font-body text-sm text-muted-foreground mb-2">Quantity</p>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={Number(product.stockQuantity)}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <Button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="flex-1 bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body gap-2"
            >
              {added ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/catalog', search: { category: undefined } })}
              className="font-body gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
