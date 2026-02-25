import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ProductCategory } from '@/backend';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: bigint | number): string {
  const numPrice = typeof price === 'bigint' ? Number(price) : price;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function getCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.nails:
      return 'Nails';
    case ProductCategory.jewellery:
      return 'Jewellery';
    default:
      return 'Other';
  }
}

export function getProductImageUrl(
  imageUrl: string,
  category: ProductCategory
): string {
  if (
    imageUrl &&
    imageUrl.trim() !== '' &&
    !imageUrl.includes('example.com')
  ) {
    return imageUrl;
  }
  if (category === ProductCategory.nails) {
    return '/assets/generated/placeholder-nails.dim_600x600.png';
  }
  return '/assets/generated/placeholder-jewellery.dim_600x600.png';
}
