export type BillingCycle = 'one-time' | 'monthly';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: BillingCycle;
  cta: string;
  stripePriceEnvKey?: string; // env var holding the Stripe Price ID
};

export const products: Record<string, Product> = {
  cube: {
    id: 'cube',
    name: 'Quick Flex FOGO Cube',
    description:
      'Random cue trainer for faster first-step reaction, cleaner clamps, and repeatable reps.',
    price: 49.95,
    billing: 'one-time',
    cta: 'Add Cube to Cart',
    stripePriceEnvKey: 'STRIPE_CUBE_PRICE_ID',
  },
  athlete: {
    id: 'athlete',
    name: 'Athlete Plan',
    description:
      'All ball colors, unlimited session history, CSV export, and global leaderboard access.',
    price: 6.99,
    billing: 'monthly',
    cta: 'Get Athlete Plan',
    stripePriceEnvKey: 'STRIPE_ATHLETE_PRICE_ID',
  },
  coach: {
    id: 'coach',
    name: 'Coach Plan',
    description:
      'Everything in Athlete plus team management, player roster stats, and team leaderboards.',
    price: 19.99,
    billing: 'monthly',
    cta: 'Get Coach Plan',
    stripePriceEnvKey: 'STRIPE_COACH_PRICE_ID',
  },
};

// Keep legacy key working for existing checkout references
export const appMembership = products.athlete;

export const formatPrice = (price: number, billing: BillingCycle) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  return billing === 'monthly' ? `${formatted}/mo` : formatted;
};
