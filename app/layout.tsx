import type { Metadata } from 'next';

import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartContext';
import { SiteHeader } from '@/components/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Quick Flex | FOGO Training System',
    template: '%s | Quick Flex'
  },
  description:
    'Quick Flex FOGO website with product media, testimonials, app analytics features, and checkout with optional subscription.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="site-shell">
            <SiteHeader />
            <main>{children}</main>
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
