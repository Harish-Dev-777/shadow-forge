import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer: React.FC = () => {
  const links = ["Services", "Work", "Process", "About", "Contact"];

  return (
    <footer
      id="sticky-footer"
      className="fixed bottom-0 left-0 w-full -z-10 bg-neutral-950 text-white pt-24 pb-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-16 mb-24">
          {/* Brand Section */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              Shadow Forge <br />
              <span className="text-neutral-600">AI Web Design Agency</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
              Designing intelligent, high-performing digital experiences for
              modern brands.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="group flex items-center gap-4 text-2xl md:text-3xl font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {link}
                <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-500 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm font-medium">
            © 2026 Shadow Forge AI Agency. All rights reserved.
          </p>

          {/* Social / Legal (Optional addition for balance) */}
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
