import React, { useEffect } from 'react';

const TermsConditions: React.FC = () => {
  // Ensure we start at the top of the page when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 px-6 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="text-xl text-neutral-400">Effective Date: April 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-neutral-300 leading-relaxed text-lg">
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing and interacting with the Shadow Forge website, you agree to be bound by these 
              Terms and Conditions. Shadow Forge operates as a solo entrepreneur web design agency, focused 
              on delivering bespoke digital experiences and leveraging cutting-edge, growing AI technologies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">2. AI Chat Widget and Service Bookings</h2>
            <p>
              Users have the ability to conveniently book services and request consultations using our 
              integrated AI Chat Widget. Please note the following regarding these automated systems:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-400">
              <li>
                <strong>Inquiries are Tentative:</strong> Submitting a request or receiving an automated 
                quote/timeline estimate via the AI widget constitutes an <em>initial inquiry</em>, not a legally binding contract.
              </li>
              <li>
                <strong>Data Processing completeness:</strong> All details captured by the chat widget are securely processed via 
                our Convex backend and directly dispatched to our inbox to follow up on your lead. 
              </li>
              <li>
                Formal engagement begins solely upon explicit mutual agreement of a comprehensive 
                Statement of Work (SOW) or invoice sent by the owner personally.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">3. Intellectual Property</h2>
            <p>
              Unless otherwise explicitly agreed upon in writing during the formal project kickoff, Shadow Forge 
              retains copyright and licensing rights to underlying source codes, proprietary design systems, and 
              AI deployment assets utilized during development. Final deliverables assigned to the client will only 
              transfer upon complete financial settlement of the project.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">4. Growing AI Technologies</h2>
            <p>
              We implement growing AI technologies for code scaffolding, copy generation, and data indexing 
              purposes. While we take every effort to ensure the highest output quality, AI-generated assets are 
              supplemental and carefully audited. By using our website, you agree not to exploit or attempt 
              injection attacks against any of our public-facing AI conversational endpoints.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">5. Limitation of Liability</h2>
            <p>
              Under no circumstances shall Shadow Forge or its solo operator be liable for any indirect, 
              consequential, or special damages stemming from your interactions with our public platform, 
              downtime related to service hosting, or backend disruptions involving our service partners.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
