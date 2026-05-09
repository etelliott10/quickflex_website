'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useCart } from '@/components/CartContext';
import { products } from '@/lib/products';

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const PRICE_IDS: Record<string, string> = {
  cube:    process.env.NEXT_PUBLIC_CUBE_PRICE_ID    ?? '',
  athlete: process.env.NEXT_PUBLIC_ATHLETE_PRICE_ID ?? '',
  coach:   process.env.NEXT_PUBLIC_COACH_PRICE_ID   ?? '',
};

export function CheckoutClient() {
  const { items, addItem, removeItem, oneTimeTotal, monthlyTotal, updateQuantity, itemCount } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const athlete = products.athlete;
  const athleteInCart = items.some((item) => item.id === athlete.id);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  async function handleCheckout() {
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    setLoading(true);
    setError('');

    // Use the first item's price ID (cube is always one-time; subscriptions go via the app)
    const item = items[0];
    const priceId = PRICE_IDS[item.id];
    const mode = item.billing === 'monthly' ? 'subscription' : 'payment';

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      });
      const { url, error: apiError } = await res.json();
      if (apiError) throw new Error(apiError);
      window.location.href = url;
    } catch (e: any) {
      setError(e.message ?? 'Checkout failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="checkout-layout">
      <section>
        <p className="eyebrow">Secure checkout</p>
        <h1>Complete your Quick Flex order</h1>
        <p className="lede">
          Purchase the hardware now and choose whether to include the app subscription today.
        </p>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <div className="cta-row">
              <Link href="/product" className="btn btn-primary">View Product</Link>
              <Link href="/app" className="btn btn-secondary">View App Plans</Link>
            </div>
          </div>
        ) : (
          <div>
            <label className="subscription-toggle">
              <input
                type="checkbox"
                checked={athleteInCart}
                onChange={(e) => {
                  if (e.target.checked && !athleteInCart) {
                    addItem({ id: athlete.id, name: athlete.name, billing: athlete.billing, price: athlete.price });
                  }
                  if (!e.target.checked && athleteInCart) {
                    removeItem(athlete.id);
                  }
                }}
              />
              <span>
                Add Athlete plan for {money(athlete.price)}/month — all ball colors, unlimited
                history, CSV export.
              </span>
            </label>

            {error && <p className="status-message" style={{ color: 'red' }}>{error}</p>}

            <button
              className="btn btn-primary"
              style={{ marginTop: 24, width: '100%' }}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Redirecting to Stripe…' : 'Proceed to Checkout'}
            </button>
            <p style={{ fontSize: 13, color: '#666', marginTop: 8 }}>
              Powered by Stripe — your card details are never stored on our servers.
            </p>
          </div>
        )}
      </section>

      <section className="summary-section">
        <h2>Order Summary</h2>
        <p className="summary-count">{itemCount} item(s)</p>

        <div className="summary-list">
          {items.map((item) => (
            <article className="summary-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{money(item.price)}{item.billing === 'monthly' ? '/mo' : ''}</p>
              </div>
              <div className="quantity-controls">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </article>
          ))}
        </div>

        <div className="summary-totals">
          <p><span>One-time total</span><strong>{money(oneTimeTotal)}</strong></p>
          <p><span>Monthly subscription</span><strong>{monthlyTotal > 0 ? `${money(monthlyTotal)}/mo` : '$0.00'}</strong></p>
          <p><span>Due today</span><strong>{money(subtotal)}</strong></p>
        </div>
      </section>
    </div>
  );
}
