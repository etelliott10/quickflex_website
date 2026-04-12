'use client';

import { useCart } from '@/components/CartContext';
import type { Product } from '@/lib/products';

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      className={className ?? 'btn btn-primary'}
      type="button"
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          billing: product.billing,
          price: product.price
        })
      }
    >
      {product.cta}
    </button>
  );
}
