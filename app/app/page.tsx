import Image from 'next/image';
import Link from 'next/link';

import { formatPrice, products } from '@/lib/products';

const workouts = [
  {
    name: 'Explosive Start Ladder',
    focus: 'Reaction speed under randomized light cues',
    volume: '4 rounds x 12 reps'
  },
  {
    name: 'Whistle Delay Scramble',
    focus: 'Clamp commitment without guessing cadence',
    volume: '3 rounds x 10 reps'
  },
  {
    name: 'Fatigue Finish Set',
    focus: 'Late-session consistency and recovery control',
    volume: '2 rounds x 15 reps'
  }
];

export default function AppMembershipPage() {
  const athlete = products.athlete;
  const coach = products.coach;

  return (
    <>
      <section className="hero split app-hero">
        <div>
          <p className="eyebrow">Quick Flex App</p>
          <h1>Records, Graphs, Workouts, and Drill Tracking</h1>
          <p className="lede">
            The app logs session data automatically and turns reps into graphs you can actually coach from.
            Choose the plan that fits your role.
          </p>
          <div className="cta-row">
            <span className="price-chip">{formatPrice(athlete.price, athlete.billing)} Athlete</span>
            <span className="price-chip">{formatPrice(coach.price, coach.billing)} Coach</span>
          </div>
          <div className="cta-row" style={{ marginTop: 16 }}>
            <Link href="/checkout" className="btn btn-primary">Get Started</Link>
          </div>
        </div>

        <div className="media-card">
          <Image
            src="/app-dashboard.svg"
            alt="Quick Flex app dashboard with graphs and drill records"
            width={1400}
            height={900}
            className="media-image"
            priority
          />
        </div>
      </section>

      <section>
        <h2>Recorded Data and Graphs</h2>
        <div className="split">
          <div className="panel">
            <h3>Sample Weekly Progress</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Avg Reaction</th>
                  <th>Best Time</th>
                  <th>Rep Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>W1</td>
                  <td>0.30s</td>
                  <td>0.26s</td>
                  <td>130</td>
                </tr>
                <tr>
                  <td>W3</td>
                  <td>0.27s</td>
                  <td>0.24s</td>
                  <td>154</td>
                </tr>
                <tr>
                  <td>W5</td>
                  <td>0.25s</td>
                  <td>0.22s</td>
                  <td>168</td>
                </tr>
                <tr>
                  <td>W7</td>
                  <td>0.23s</td>
                  <td>0.20s</td>
                  <td>176</td>
                </tr>
              </tbody>
            </table>
          </div>
          <aside className="chart-card">
            <h3>Trend Chart</h3>
            <div className="bars" aria-hidden="true">
              <div style={{ height: '84%' }}>
                <span>W1</span>
              </div>
              <div style={{ height: '76%' }}>
                <span>W2</span>
              </div>
              <div style={{ height: '70%' }}>
                <span>W3</span>
              </div>
              <div style={{ height: '62%' }}>
                <span>W4</span>
              </div>
              <div style={{ height: '56%' }}>
                <span>W5</span>
              </div>
              <div style={{ height: '48%' }}>
                <span>W6</span>
              </div>
              <div style={{ height: '42%' }}>
                <span>W7</span>
              </div>
            </div>
            <p>Reaction time trend is clear and visible every week.</p>
          </aside>
        </div>
      </section>

      <section>
        <h2>Workouts and Drills</h2>
        <div className="testimonial-grid">
          {workouts.map((workout) => (
            <article key={workout.name} className="testimonial">
              <h3>{workout.name}</h3>
              <p>{workout.focus}</p>
              <p className="testimonial-meta">{workout.volume}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>App In Action</h2>
        <div className="video-frame">
          <iframe
            src="https://www.youtube.com/embed/X8jP8Q6c2Nk"
            title="App walkthrough and drill review"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="checkout-banner">
        <div>
          <p className="eyebrow">App subscription</p>
          <h2>Athlete $6.99/mo · Coach $19.99/mo · Free to start</h2>
          <p style={{ marginTop: 8, opacity: 0.85 }}>
            Subscriptions are managed inside the FOGOQuickFlex app after download.
          </p>
        </div>
        <div className="cta-row compact">
          <Link href="/checkout" className="btn btn-primary">Get the Cube</Link>
          <Link href="/" className="btn btn-secondary">View All Plans</Link>
        </div>
      </section>
    </>
  );
}
