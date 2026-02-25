import { Link } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/backend';
import { formatPrice, getCategoryLabel, getProductImageUrl } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const isOutOfStock = product.stockQuantity <= 0n;
  const imageUrl = getProductImageUrl(product.imageUrl, product.category);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      <Link to="/product/$id" params={{ id: product.id.toString() }} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="font-body text-sm font-semibold text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="font-body text-xs bg-background/90 text-foreground"
          >
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to="/product/$id" params={{ id: product.id.toString() }}>
          <h3 className="font-serif text-base font-medium text-foreground hover:text-[var(--rose-gold)] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-serif text-lg font-semibold text-[var(--rose-gold)]">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            disabled={isOutOfStock}
            onClick={() => addItem(product)}
            className="bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body text-xs gap-1"
          >
            <ShoppingBag className="h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
