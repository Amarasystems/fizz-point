// app/privacy/page.tsx
import React from "react";

export const metadata = {
  title: "Privacy Policy – Fizz Point",
  description: "GN Beverages LLC Privacy Policy",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0d1a40] to-[#1443FF] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 h-1 w-20 rounded-full bg-[#1443FF]" />
          <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-white/80">
            Last updated: August 31, 2025
          </p>
        </header>

        {/* Card with shadow */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur md:p-10 leading-relaxed space-y-6 text-white/90">
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy. This Privacy
            Policy has been created with the help of the Privacy Policy
            Generator.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            Interpretation and Definitions
          </h2>
          <h3 className="text-lg font-semibold mt-4">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="text-lg font-semibold mt-4">Definitions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account</strong> means a unique account created for You to
              access our Service or parts of our Service.
            </li>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party…
            </li>
            <li>
              <strong>Application</strong> refers to Fizzpoint, the software
              program provided by the Company.
            </li>
            <li>
              <strong>Company</strong> refers to Gnbeverages LLC, Ulaanbaatar.
            </li>
            <li>
              <strong>Country</strong> refers to: Mongolia
            </li>
            <li>
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </li>
            <li>
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual.
            </li>
            <li>
              <strong>Service</strong> refers to the Application.
            </li>
            <li>
              <strong>Service Provider</strong> means any natural or legal
              person who processes the data on behalf of the Company…
            </li>
            <li>
              <strong>Usage Data</strong> refers to data collected
              automatically…
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the
              Service…
            </li>
          </ul>

          {/* --- Insert all other long policy sections here, in the same pattern --- */}
          {/* Use <h2>, <h3>, <p>, <ul> just like above to break text into readable blocks */}

          <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              By visiting this page on our website:{" "}
              <a
                href="https://fizzpoint/privacy"
                className="underline decoration-[#1443FF] underline-offset-4 hover:decoration-white"
              >
                https://fizzpoint/privacy
              </a>
            </li>
          </ul>
          <p className="text-xs text-white/60 mt-6">
            Generated using TermsFeed Privacy Policy Generator
          </p>
        </article>
      </div>
    </main>
  );
}
