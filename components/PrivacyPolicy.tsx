import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  // Ensure we start at the top of the page when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 px-6 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-neutral-400">Effective Date: April 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-neutral-300 leading-relaxed text-lg">
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to Shadow Forge. This Privacy Policy applies to our website and details how 
              we operating as a solo entrepreneur web design agency collect, use, and protect your 
              information. We are committed to transparency and safeguarding your privacy while leveraging 
              growing AI technologies to deliver premium digital solutions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">2. Information Collection via AI Chat Widget</h2>
            <p>
              Our website features a custom-built AI Chat Agent to streamline communication and service 
              inquiries. You can interact with this widget to instantly book discovery calls or securely outline 
              project parameters. 
            </p>
            <p>
              When you book a service or submit information through our AI chat widget, we temporarily 
              collect the following personal details provided by you during the conversation:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-400">
              <li>Name and Business Name</li>
              <li>Email address and Phone number</li>
              <li>Estimated budget and timeline requirements</li>
              <li>Project details and specifications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">3. How Your Data is Handled and Transmitted</h2>
            <p>
              We prioritize the secure transmission of your data. When your details are successfully 
              collected via the AI Chat Agent, the information is immediately transferred, processed, and validated securely 
              by our serverless backend provider, Convex. 
            </p>
            <p>
              Convex securely routes your submitted inquiry to generate a summary ticket, which is then 
              automatically transmitted directly to our official email inbox. We do not unnecessarily retain 
              open copies of your raw conversations in long-term public databases independent of active project scopes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">4. Use of AI Technologies</h2>
            <p>
              Shadow Forge integrates growing AI capabilities to assist in conversational booking, prototype generation, 
              and website optimization. Please be aware that your interaction with our conversational agents processes prompts 
              strictly for the functional goal of understanding your service request. Do not type or submit sensitive 
              personal identifiers (e.g., Social Security numbers, banking details) into the chat interface.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">5. Your Consent</h2>
            <p>
              By using our website and submitting service requests through the AI chat interfaces, you consent to the 
              collection and use of your information exactly as described in this operational framework.
            </p>
          </section>

          <section className="space-y-4 mt-12 p-8 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl font-semibold text-white mb-2">Have questions about your data?</h2>
            <p className="text-neutral-400">
              If you have any questions or concern regarding how we handle your personal data across our architecture, 
              please contact us directly via the contact form on the home page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
