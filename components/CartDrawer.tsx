'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useCart } from '@/components/CartContext';

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

export function CartDrawer() {
  const router = useRouter();
  const {
    isOpen,
    setIsOpen,
    items,
    updateQuantity,
    removeItem,
    clearCart,
    oneTimeTotal,
    monthlyTotal
  } = useCart();

  const hasItems = items.length > 0;

  const cartLabel = useMemo(() => {
    if (!hasItems) {
      return 'Your cart is empty.';
    }

    return `One-time total ${money(oneTimeTotal)}${
      monthlyTotal > 0 ? ` + ${money(monthlyTotal)}/mo` : ''
    }`;
  }, [hasItems, monthlyTotal, oneTimeTotal]);

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-head">
          <h2>Shopping Cart</h2>
          <button type="button" className="text-button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>

        <p className="cart-summary">{cartLabel}</p>

        <div className="cart-list">
          {hasItems ? (
            items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {money(item.price)} {item.billing === 'monthly' ? '/mo' : ''}
                  </p>
                </div>
                <div className="quantity-controls">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button type="button" className="text-button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </article>
            ))
          ) : (
            <p>Add a product to start your order.</p>
          )}
        </div>

        <div className="cart-foot">
          <button type="button" className="btn btn-secondary" onClick={clearCart} disabled={!hasItems}>
            Clear Cart
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!hasItems}
            onClick={() => {
              setIsOpen(false);
              router.push('/checkout');
            }}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
