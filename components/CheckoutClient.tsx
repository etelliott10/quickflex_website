'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';

import { useCart } from '@/components/CartContext';
import { products } from '@/lib/products';

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

export function CheckoutClient() {
  const {
    items,
    addItem,
    removeItem,
    oneTimeTotal,
    monthlyTotal,
    updateQuantity,
    itemCount,
    clearCart
  } = useCart();

  const [status, setStatus] = useState<string>('');

  const membership = products.appMembership;
  const membershipInCart = items.some((item) => item.id === membership.id);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      setStatus('Your cart is empty. Add the product first.');
      return;
    }
    setStatus(
      'Order submitted in demo mode. Connect Stripe or Shopify checkout to process real payments.'
    );
    clearCart();
  };

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
              <Link href="/product" className="btn btn-primary">
                View Product
              </Link>
              <Link href="/app" className="btn btn-secondary">
                View App Membership
              </Link>
            </div>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={onSubmit}>
            <fieldset>
              <legend>Contact</legend>
              <label>
                Email
                <input type="email" name="email" required placeholder="you@example.com" />
              </label>
              <label>
                Full name
                <input type="text" name="name" required placeholder="Athlete Name" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Shipping</legend>
              <label>
                Address
                <input type="text" name="address" required placeholder="Street address" />
              </label>
              <div className="form-row form-row-shipping">
                <label>
                  City
                  <input type="text" name="city" required placeholder="City" />
                </label>
                <label>
                  State
                  <input type="text" name="state" required placeholder="State" />
                </label>
                <label>
                  ZIP
                  <input type="text" name="zip" required placeholder="ZIP" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Payment (Demo)</legend>
              <label>
                Card number
                <input type="text" required placeholder="4242 4242 4242 4242" />
              </label>
              <div className="form-row form-row-payment">
                <label>
                  Expiration
                  <input type="text" required placeholder="MM/YY" />
                </label>
                <label>
                  CVC
                  <input type="text" required placeholder="123" />
                </label>
              </div>
            </fieldset>

            <label className="subscription-toggle">
              <input
                type="checkbox"
                checked={membershipInCart}
                onChange={(event) => {
                  if (event.target.checked && !membershipInCart) {
                    addItem({
                      id: membership.id,
                      name: membership.name,
                      billing: membership.billing,
                      price: membership.price
                    });
                  }
                  if (!event.target.checked && membershipInCart) {
                    removeItem(membership.id);
                  }
                }}
              />
              <span>
                Add {membership.name} for {money(membership.price)}/month to track records, graphs,
                workouts, and drills.
              </span>
            </label>

            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
            {status ? <p className="status-message">{status}</p> : null}
          </form>
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
            </article>
          ))}
        </div>

        <div className="summary-totals">
          <p>
            <span>One-time total</span>
            <strong>{money(oneTimeTotal)}</strong>
          </p>
          <p>
            <span>Monthly subscription</span>
            <strong>{monthlyTotal > 0 ? `${money(monthlyTotal)}/mo` : '$0.00'}</strong>
          </p>
          <p>
            <span>Total at checkout</span>
            <strong>{money(subtotal)}</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
