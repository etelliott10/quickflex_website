import Link from 'next/link';

export default function SuccessPage() {
  return (
    <section style={{ textAlign: 'center', padding: '80px 24px' }}>
      <p className="eyebrow">Order confirmed</p>
      <h1>You're all set!</h1>
      <p className="lede" style={{ maxWidth: 480, margin: '16px auto 32px' }}>
        Check your email for your receipt. Download the FOGOQuickFlex app to start training and
        manage your subscription.
      </p>
      <div className="cta-row" style={{ justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
        <Link href="/app" className="btn btn-secondary">View App Plans</Link>
      </div>
    </section>
  );
}
