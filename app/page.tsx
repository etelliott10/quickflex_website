import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPrice, products } from '@/lib/products';

const testimonials = [
  {
    quote:
      'My starts are cleaner and faster because the cube forces me to react, not guess the whistle.',
    name: 'Dylan M.',
    role: 'NCAA Faceoff Midfielder',
    rating: 5
  },
  {
    quote:
      'I coach around this now. Players compete for reaction-time improvements every week.',
    name: 'Coach R. Patel',
    role: 'Club Program Director',
    rating: 5
  },
  {
    quote:
      'The app data keeps me consistent. I can actually see progress across weeks, not just feel it.',
    name: 'Logan S.',
    role: 'High School FOGO',
    rating: 4
  }
];

export default function HomePage() {
  const cube = products.cube;

  return (
    <>
      <section className="hero split">
        <div>
          <p className="eyebrow">About Quick Flex</p>
          <h1>Win the face off before the whistle blows</h1>
          <p className="lede">
            Quick Flex builds tools specifically for FOGO athletes who want measurable first-step speed,
            better clamp consistency, and a competitive edge at the stripe.
          </p>
          <div className="cta-row">
            <AddToCartButton product={cube} className="btn btn-primary" />
            <Link className="btn btn-secondary" href="/product">
              Explore the Full Product
            </Link>
            <Link className="btn btn-secondary" href="/app">
              Explore the App
            </Link>
          </div>
          <ul className="inline-metrics">
            <li>
              <span>{formatPrice(cube.price, cube.billing)}</span> One-time purchase
            </li>
            <li>
              <span>4.9/5</span> Average athlete review
            </li>
            <li>
              <span>7 weeks</span> Typical measurable improvement window
            </li>
          </ul>
        </div>

        <div className="media-card">
          <Image
            src="/cube-hero.svg"
            alt="Quick Flex FOGO Cube product image"
            width={1200}
            height={900}
            className="media-image"
            priority
          />
        </div>
      </section>

      <section>
        <h2>What We Are About</h2>
        <div className="card-grid">
          <article className="panel">
            <h3>Built for Faceoff Specialists</h3>
            <p>
              Every mode is designed around first movement and clamp timing, not generic reaction games.
            </p>
          </article>
          <article className="panel">
            <h3>Progress You Can Measure</h3>
            <p>From rep history to weekly trend lines, you can prove if your training is working.</p>
          </article>
          <article className="panel">
            <h3>Hardware + App System</h3>
            <p>
              The cube drives reps. The app creates accountability with records, graphs, and drills.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>Product In Action</h2>
        <div className="split">
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/11N8wR8xv0I"
              title="Quick Flex product in action"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="hero-card">
            <h3>Session Flow</h3>
            <ul>
              <li>Choose reaction mode and rep count</li>
              <li>Run game-speed starts with random cues</li>
              <li>Review results and compare week-over-week trends</li>
            </ul>
            <div className="cta-row">
              <Link className="btn btn-secondary" href="/product">
                View More Videos
              </Link>
              <Link className="btn btn-primary" href="/checkout">
                Checkout Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Testimonials and Reviews</h2>
        <div className="review-summary">
          <strong>4.9 / 5 athlete rating</strong>
          <span>Based on 126 verified product reviews</span>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((entry) => (
            <article className="testimonial" key={entry.name}>
              <p className="stars" aria-label={`${entry.rating} out of 5 stars`}>
                {'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}
              </p>
              <p>{entry.quote}</p>
              <p className="testimonial-meta">
                {entry.name} | {entry.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="checkout-banner">
        <div>
          <p className="eyebrow">Purchase options</p>
          <h2>Buy the cube now, then add the app subscription anytime.</h2>
        </div>
        <div className="cta-row compact">
          <AddToCartButton product={cube} className="btn btn-primary" />
          <Link className="btn btn-secondary" href="/checkout">
            Go To Checkout
          </Link>
        </div>
      </section>
    </>
  );
}
