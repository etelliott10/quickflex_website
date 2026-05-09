'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCart } from '@/components/CartContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/app', label: 'App' },
  { href: '/checkout', label: 'Checkout' }
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand" aria-label="Quick Flex home">
          <span>Quick Flex</span>
        </Link>
        <nav>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={active ? 'active' : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button type="button" className="cart-button" onClick={() => setIsOpen(true)}>
          Cart
          {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
        </button>
      </div>
    </header>
  );
}
