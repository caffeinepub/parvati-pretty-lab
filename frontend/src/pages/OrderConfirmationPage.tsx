import { useSearch, Link } from '@tanstack/react-router';
import { CheckCircle, Home, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nextSteps = [
  {
    icon: CheckCircle,
    title: 'Order Received',
    desc: 'Your order has been successfully placed in our system.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Contact',
    desc: 'Our team will contact you on WhatsApp to confirm your order.',
  },
  {
    icon: ShoppingBag,
    title: 'Preparation',
    desc: 'We will carefully prepare and package your items.',
  },
  {
    icon: Home,
    title: 'Delivery',
    desc: 'Your order will be delivered to your doorstep.',
  },
];

export default function OrderConfirmationPage() {
  const search = useSearch({ from: '/order-confirmation' });
  const orderId = (search as any).orderId;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-[var(--blush)] flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-[var(--rose-gold)]" />
        </div>
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        Order Confirmed!
      </h1>
      <p className="font-body text-sm text-muted-foreground mb-2">
        Thank you for shopping with Parvati Pretty Lab
      </p>

      {orderId && (
        <div className="inline-block bg-[var(--cream-dark)] rounded-xl px-6 py-3 mb-8 border border-border">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Order Reference
          </p>
          <p className="font-serif text-xl font-bold text-[var(--rose-gold)]">
            #{orderId}
          </p>
        </div>
      )}

      {/* What Happens Next */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-8 text-left">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-5 text-center">
          What Happens Next?
        </h2>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div key={step.title} className="flex gap-4 items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--blush)] flex items-center justify-center">
                <span className="font-body text-xs font-bold text-[var(--rose-gold)]">
                  {index + 1}
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-[var(--cream)] rounded-2xl p-5 border border-border mb-8">
        <p className="font-body text-sm text-muted-foreground mb-3">
          Have questions about your order? Contact us directly on WhatsApp!
        </p>
        <a
          href="https://wa.me/919898047431"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white font-body gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </Button>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/">
          <Button
            variant="outline"
            className="font-body gap-2 border-[var(--rose-gold)] text-[var(--rose-gold)] hover:bg-[var(--blush)] w-full sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
        <Link to="/catalog" search={{ category: undefined }}>
          <Button className="bg-[var(--rose-gold)] hover:bg-[var(--rose-gold-dark)] text-white font-body gap-2 w-full sm:w-auto">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
