# Quick Flex Website

Next.js + TypeScript website for the Quick Flex FOGO Cube.

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- CSS (global stylesheet)

## Pages

- `/` Home page (brand overview, testimonials, video, purchase CTAs)
- `/product` Product page (gallery, videos, reviews, purchase options)
- `/app` App page (data/graphs, workouts, drills, subscription details)
- `/checkout` Checkout page (cart summary, demo shipping/payment form, subscription toggle)

## Core Features

- Shopping cart drawer with quantity controls
- One-time product pricing + monthly subscription support
- Persistent cart state via `localStorage`
- Responsive layout for desktop and mobile

## Project Structure

- `app/` Route pages and global styles
- `components/` Reusable UI and cart components
- `lib/` Shared product data and utilities
- `public/` Static media assets

## Getting Started

```bash
cd quickflex_website
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Notes

- Checkout is currently demo-mode UI only.
- Connect Stripe/Shopify to process live payments.
