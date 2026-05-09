import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPrice, products } from '@/lib/products';

const reviews = [
  {
    author: 'Mason L.',
    title: 'Improved faceoff timing in two weeks',
    body: 'The random cue mode exposed my slow starts. I dropped my average reaction quickly.',
    score: 5
  },
  {
    author: 'Coach Avery',
    title: 'Best add-on to our faceoff station',
    body: 'Easy to run in team sessions and competitive enough to keep athletes focused.',
    score: 5
  },
  {
    author: 'Caleb N.',
    title: 'Durable and easy to set up',
    body: 'I toss it in my bag and train anywhere. The app sync works every session.',
    score: 4
  }
];

export default function ProductPage() {
  const cube = products.cube;
  const membership = products.athlete;

  return (
    <>
      <section className="hero split">
        <div>
          <p className="eyebrow">Quick Flex FOGO Cube</p>
          <h1>Complete Product Overview</h1>
          <p className="lede">
            Everything you need to evaluate the hardware: images, video demos, athlete feedback, and
            purchase options.
          </p>
          <div className="price-chip">{formatPrice(cube.price, cube.billing)}</div>
          <div className="cta-row">
            <AddToCartButton product={cube} className="btn btn-primary" />
            <Link href="/checkout" className="btn btn-secondary">
              Buy Now
            </Link>
          </div>
        </div>
        <div className="media-card">
          <Image
            src="/cube-angle.svg"
            alt="Angled view of Quick Flex FOGO Cube"
            width={1200}
            height={900}
            className="media-image"
            priority
          />
        </div>
      </section>

      <section>
        <h2>Photo Gallery</h2>
        <div className="media-grid">
          <div className="media-card">
            <Image
              src="/cube-hero.svg"
              alt="Front product image of Quick Flex cube"
              width={1200}
              height={900}
              className="media-image"
            />
          </div>
          <div className="media-card">
            <Image
              src="/cube-angle.svg"
              alt="Side angle product image"
              width={1200}
              height={900}
              className="media-image"
            />
          </div>
          <div className="media-card">
            <Image
              src="/app-dashboard.svg"
              alt="Companion app dashboard"
              width={1400}
              height={900}
              className="media-image"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Video Demos</h2>
        <div className="media-grid two-up">
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/11N8wR8xv0I"
              title="FOGO cube drill demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/Mh7-8sQ72m0"
              title="Faceoff technique and reaction training"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Product Reviews</h2>
        <div className="testimonial-grid">
          {reviews.map((review) => (
            <article key={review.author} className="testimonial">
              <p className="stars" aria-label={`${review.score} out of 5 stars`}>
                {'★'.repeat(review.score)}{'☆'.repeat(5 - review.score)}
              </p>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <p className="testimonial-meta">{review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Buy Hardware + Optional Membership</h2>
        <div className="card-grid">
          <article className="panel">
            <h3>Hardware</h3>
            <p>{cube.description}</p>
            <p className="price-note">{formatPrice(cube.price, cube.billing)}</p>
            <AddToCartButton product={cube} className="btn btn-primary" />
          </article>
          <article className="panel">
            <h3>App Subscription</h3>
            <p>{membership.description}</p>
            <p className="price-note">{formatPrice(membership.price, membership.billing)}</p>
            <AddToCartButton product={membership} className="btn btn-secondary" />
          </article>
          <article className="panel">
            <h3>Ready to Purchase</h3>
            <p>
              Use checkout to add shipping and payment details. Include membership now or add it later.
            </p>
            <Link href="/checkout" className="btn btn-primary">
              Go To Checkout
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
