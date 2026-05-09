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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <SiteHeader />
          <div className="site-shell">
            <main>{children}</main>
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
