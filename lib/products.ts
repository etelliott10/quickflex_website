export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: 'one-time' | 'monthly';
  cta: string;
};

export const products: Record<string, Product> = {
  cube: {
    id: 'cube',
    name: 'Quick Flex FOGO Cube',
    description:
      'Random cue trainer for faster first-step reaction, cleaner clamps, and repeatable reps.',
    price: 49.95,
    billing: 'one-time',
    cta: 'Add Cube to Cart'
  },
  appMembership: {
    id: 'appMembership',
    name: 'Quick Flex App Membership',
    description:
      'Weekly trend charts, mode-by-mode history, and progress tracking to keep players accountable.',
    price: 5,
    billing: 'monthly',
    cta: 'Add Membership'
  }
};

export const formatPrice = (price: number, billing: Product['billing']) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  return billing === 'monthly' ? `${formatted}/mo` : formatted;
};
