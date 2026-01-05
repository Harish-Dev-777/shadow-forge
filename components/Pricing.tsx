import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                The best work solution, <br/> for the best price.
            </h2>
            
            <div className="inline-flex bg-neutral-100 p-1 rounded-full mt-6">
                <button className="px-6 py-2 rounded-full text-sm font-medium text-neutral-500 hover:text-neutral-900">Monthly</button>
                <button className="px-6 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-neutral-900">Yearly</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free Plan */}
            <div className="p-8 border border-neutral-200 rounded-2xl bg-white">
                <h3 className="text-xl font-bold text-neutral-900">Free Forever</h3>
                <p className="text-sm text-neutral-500 mt-1 mb-6">Free</p>
                <button className="w-full py-3 bg-neutral-900 text-white rounded-lg font-medium text-sm hover:bg-black transition-colors">Get Started</button>
                
                <div className="mt-8 space-y-4">
                    <p className="text-xs font-semibold text-neutral-400 tracking-wider">KEY FEATURES:</p>
                    {['60MB Storage', 'Unlimited Tasks', 'Unlimited Free Plan Members', 'Two-Factor Authentication'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                            <Check size={14} className="text-neutral-900" /> {item}
                        </div>
                    ))}
                </div>
            </div>

             {/* Unlimited Plan */}
             <div className="p-8 border border-neutral-200 rounded-2xl bg-white">
                <h3 className="text-xl font-bold text-neutral-900">Unlimited</h3>
                <p className="text-sm text-neutral-500 mt-1 mb-6">$7 USD / month</p>
                <button className="w-full py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">Get Started</button>
                
                <div className="mt-8 space-y-4">
                    <p className="text-xs font-semibold text-neutral-400 tracking-wider">EVERYTHING IN FREE +</p>
                    {['Unlimited Storage', 'Unlimited Integrations', 'Unlimited Dashboards', 'Guests with Permissions'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                            <Check size={14} className="text-neutral-900" /> {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Business Plan (Highlighted) */}
            <div className="p-8 border border-neutral-900 rounded-2xl bg-neutral-900 text-white transform md:-translate-y-4 relative shadow-xl">
                 <div className="absolute top-0 right-0 bg-neutral-200 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase">Popular</div>
                <h3 className="text-xl font-bold">Business</h3>
                <p className="text-sm text-neutral-400 mt-1 mb-6">$12 USD / month</p>
                <button className="w-full py-3 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-100 transition-colors">Get Started</button>
                
                <div className="mt-8 space-y-4">
                    <p className="text-xs font-semibold text-neutral-500 tracking-wider">EVERYTHING IN UNLIMITED +</p>
                    {['Google SSO', 'Unlimited Teams', 'Advanced Public Sharing', 'Advanced Automation'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                            <Check size={14} className="text-white" /> {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 border border-neutral-200 rounded-2xl bg-white">
                <h3 className="text-xl font-bold text-neutral-900">Enterprise</h3>
                <p className="text-sm text-neutral-500 mt-1 mb-6">Contact Sales</p>
                <button className="w-full py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">Contact Sales</button>
                
                <div className="mt-8 space-y-4">
                    <p className="text-xs font-semibold text-neutral-400 tracking-wider">EVERYTHING IN BUSINESS +</p>
                    {['White Labeling', 'Enterprise API', 'Single Sign-On (SSO)', 'HIPAA Available'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                            <Check size={14} className="text-neutral-900" /> {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;