import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice, getProductImageUrl } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate({ to: '/checkout' });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[var(--rose-gold)]" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-serif text-lg text-muted-foreground">Your cart is empty</p>
            <p className="font-body text-sm text-muted-foreground">
              Add some beautiful products to get started
            </p>
            <Button
              variant="outline"
              onClick={() => {
                closeCart();
                navigate({ to: '/catalog', search: { category: undefined } });
              }}
              className="mt-2"
            >
              Browse Catalog
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id.toString()}
                  className="flex gap-3 p-3 bg-[var(--cream)] rounded-xl"
                >
                  <img
                    src={getProductImageUrl(item.product.imageUrl, item.product.category)}
                    alt={item.product.name}
                    className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </p>
                    <p className="font-body text-sm text-[var(--rose-gold)] font-medium mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-[var(--cream-dark)] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-body text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-[var(--cream-dark)] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-serif text-lg font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Shipping calculated at checkout
              </p>
              <Button
                className="w-full bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
