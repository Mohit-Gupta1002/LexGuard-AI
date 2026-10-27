import React from 'react';
import Link from 'next/link';
import { Shield, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070A10] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">LexGuard AI</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-blue-300 border border-slate-700">
                Decision Support
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              LexGuard AI empowers Indian tenants, freelancers, employees, and small business owners to review agreements, decode dense legalese, and spot potential legal risks before signing.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Not a law firm. Does not provide legal advice or attorney representation.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/analyze" className="hover:text-blue-400 transition-colors">
                  Analyze a Contract
                </Link>
              </li>
              <li>
                <Link
                  href="/report/sample-rental-agreement"
                  className="hover:text-blue-400 transition-colors"
                >
                  Explore Sample Rental Report
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-blue-400 transition-colors">
                  Report History
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-blue-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Architecture
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms & Limitations
                </Link>
              </li>
              <li>
                <span className="text-slate-500">
                  Target Jurisdiction: India (State & Central Laws)
                </span>
              </li>
              <li>
                <span className="text-slate-500">
                  Ephemeral Document Processing
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 LexGuard AI. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed for transparent, accessible legal understanding in India.
          </p>
        </div>
      </div>
    </footer>
  );
};
