import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2026-04-22.dahlia' as any,
});

export async function POST(req: NextRequest) {
  const { priceId, mode } = (await req.json()) as {
    priceId: string;
    mode: 'payment' | 'subscription';
  };

  if (!priceId) {
    return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/checkout/success`,
    cancel_url: `${siteUrl}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}
