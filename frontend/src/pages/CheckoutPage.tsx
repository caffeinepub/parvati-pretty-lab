import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '@/context/CartContext';
import { useCreateOrder } from '@/hooks/useQueries';
import { OrderItem } from '@/backend';
import { formatPrice } from '@/lib/utils';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MessageCircle, ShoppingBag } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Invalid email address';
  if (!data.street.trim()) errors.street = 'Street address is required';
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.state.trim()) errors.state = 'State is required';
  if (!data.postalCode.trim()) errors.postalCode = 'Postal code is required';
  return errors;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const buildOrderItems = (): OrderItem[] =>
    items.map((item) => ({
      productId: item.product.id,
      quantity: BigInt(item.quantity),
    }));

  const saveOrderToBackend = async (): Promise<bigint> => {
    return createOrderMutation.mutateAsync({
      customerName: form.name,
      email: form.email,
      shippingAddress: {
        street: form.street,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
      },
      items: buildOrderItems(),
    });
  };

  const handleWhatsApp = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) return;

    try {
      const orderId = await saveOrderToBackend();
      clearCart();

      const itemLines = items
        .map((item) => `• ${item.product.name} x${item.quantity} — ${formatPrice(Number(item.product.price) * item.quantity)}`)
        .join('\n');

      const message = encodeURIComponent(
        `Hello! I'd like to place an order:\n\n` +
        `*Order #${orderId.toString()}*\n\n` +
        `*Items:*\n${itemLines}\n\n` +
        `*Total: ${formatPrice(subtotal)}*\n\n` +
        `*Shipping to:*\n${form.name}\n${form.street}, ${form.city}, ${form.state} - ${form.postalCode}\n\n` +
        `Email: ${form.email}`
      );

      window.open(`https://wa.me/919898047431?text=${message}`, '_blank');
      navigate({ to: '/order-confirmation', search: { orderId: orderId.toString() } });
    } catch {
      // error handled by mutation state
    }
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) return;

    try {
      const orderId = await saveOrderToBackend();
      clearCart();
      navigate({ to: '/order-confirmation', search: { orderId: orderId.toString() } });
    } catch {
      // error handled by mutation state
    }
  };

  if (items.length === 0 && !createOrderMutation.isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Add some products before checking out.
        </p>
        <Button
          onClick={() => navigate({ to: '/catalog', search: { category: undefined } })}
          className="bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body"
        >
          Browse Catalog
        </Button>
      </div>
    );
  }

  const isSubmitting = createOrderMutation.isPending;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-5">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-body text-sm">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  className={`mt-1 font-body ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="font-body text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="font-body text-sm">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className={`mt-1 font-body ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="font-body text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-5">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="street" className="font-body text-sm">
                  Street Address *
                </Label>
                <Input
                  id="street"
                  value={form.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  placeholder="123 Main Street"
                  className={`mt-1 font-body ${errors.street ? 'border-destructive' : ''}`}
                />
                {errors.street && (
                  <p className="font-body text-xs text-destructive mt-1">{errors.street}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="font-body text-sm">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Mumbai"
                    className={`mt-1 font-body ${errors.city ? 'border-destructive' : ''}`}
                  />
                  {errors.city && (
                    <p className="font-body text-xs text-destructive mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state" className="font-body text-sm">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="Maharashtra"
                    className={`mt-1 font-body ${errors.state ? 'border-destructive' : ''}`}
                  />
                  {errors.state && (
                    <p className="font-body text-xs text-destructive mt-1">{errors.state}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode" className="font-body text-sm">
                  Postal Code *
                </Label>
                <Input
                  id="postalCode"
                  value={form.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder="400001"
                  className={`mt-1 font-body ${errors.postalCode ? 'border-destructive' : ''}`}
                />
                {errors.postalCode && (
                  <p className="font-body text-xs text-destructive mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {createOrderMutation.isError && (
            <p className="font-body text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
              Failed to place order. Please try again.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleWhatsApp}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-body gap-2 h-12"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
              Pay via WhatsApp
            </Button>
            <Button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              variant="outline"
              className="w-full font-body gap-2 h-12 border-[var(--rose-gold)] text-[var(--rose-gold)] hover:bg-[var(--blush)]"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
              Place Order
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
