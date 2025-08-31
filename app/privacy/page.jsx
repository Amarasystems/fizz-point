// app/privacy/page.tsx
import React from "react";

export const metadata = {
  title: "Privacy Policy – Fizz Point",
  description: "How GN Beverages LLC collects, uses, and protects your data.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0d1a40] to-[#1443FF] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 h-1 w-20 rounded-full bg-[#1443FF]" />
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy – Fizz Point
          </h1>
          <p className="mt-3 text-sm text-white/80">
            Last updated: August 2025
          </p>
        </header>

        {/* Card */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur md:p-8">
          <p className="mb-8 text-white/90">
            <strong>GN Beverages LLC</strong>, operator of the “Fizz Point” app,
            respects and protects your privacy. This Privacy Policy explains how
            we collect, use, and safeguard your information.
          </p>

          <Section
            title="1. Data We Collect"
            items={[
              "Device or other IDs (e.g., Advertising ID, Android ID)",
              "Account information (phone number, email, name)",
              "Usage data (scanned codes, redeemed rewards)",
            ]}
          />

          <Section
            title="2. How We Use Data"
            items={[
              "To provide loyalty and rewards features",
              "To detect fraud and ensure security",
              "To improve app performance and user experience",
            ]}
          />

          <div className="mt-10">
            <h2 className="text-xl font-semibold">3. Data Sharing</h2>
            <p className="mt-3 text-white/90">
              We may share data with trusted third-party service providers such
              as <strong>Firebase Analytics</strong> and{" "}
              <strong>Crashlytics</strong> for analytics and crash reporting. We
              do not sell personal data to advertisers.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">4. User Rights</h2>
            <p className="mt-3 text-white/90">
              You may request data deletion or account removal by contacting us
              at{" "}
              <a
                href="mailto:info@gnbeverages.mn"
                className="underline decoration-[#1443FF] underline-offset-4 hover:decoration-white"
              >
                info@gnbeverages.mn
              </a>
              .
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">5. Security</h2>
            <p className="mt-3 text-white/90">
              All data is encrypted in transit. We take appropriate measures to
              protect your data.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">6. Contact Us</h2>
            <address className="mt-3 not-italic text-white/90">
              <div>
                <strong>GN Beverages LLC</strong>
              </div>
              <div>Ulaanbaatar, Mongolia</div>
              <div>
                Email:{" "}
                <a
                  href="mailto:info@gnbeverages.mn"
                  className="underline decoration-[#1443FF] underline-offset-4 hover:decoration-white"
                >
                  info@gnbeverages.mn
                </a>
              </div>
            </address>
          </div>
        </article>

        {/* Footer note */}
        <p className="mt-8 text-xs text-white/60">
          This policy is intended to be consistent with our Google Play Data
          Safety disclosures.
        </p>
      </div>
    </main>
  );
}

function Section({ title, items }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/90">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
