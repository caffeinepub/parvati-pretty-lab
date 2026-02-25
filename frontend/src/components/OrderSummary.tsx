import { useCart } from '@/context/CartContext';
import { formatPrice, getProductImageUrl } from '@/lib/utils';

export default function OrderSummary() {
  const { items, subtotal } = useCart();

  return (
    <div className="bg-[var(--cream)] rounded-2xl p-6 border border-border">
      <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.product.id.toString()} className="flex gap-3 items-center">
            <img
              src={getProductImageUrl(item.product.imageUrl, item.product.category)}
              alt={item.product.name}
              className="h-12 w-12 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-medium text-foreground truncate">
                {item.product.name}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="font-body text-sm font-medium text-foreground flex-shrink-0">
              {formatPrice(Number(item.product.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-muted-foreground">Subtotal</span>
          <span className="font-body text-sm text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-muted-foreground">Shipping</span>
          <span className="font-body text-sm text-[var(--rose-gold)] font-medium">Free</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="font-serif text-base font-semibold text-foreground">Total</span>
          <span className="font-serif text-lg font-bold text-[var(--rose-gold)]">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
