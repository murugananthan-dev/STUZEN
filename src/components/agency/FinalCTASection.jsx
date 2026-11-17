import React from 'react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * FinalCTASection (Section 7: Executive Conversion Console)
 * High-contrast institutional invitation console with confident typography,
 * direct discovery triggers, and transparent technical collaboration.
 */
export function FinalCTASection() {
  const { navigateTo } = useNavigation();
  const ctaRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden bg-slate-950 text-white border-t border-slate-900"
      id="conversation-cta"
    >
      {/* Subtle, restrained ambient background glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter relative z-10">
        <div
          className="rounded-3xl bg-slate-900/90 backdrop-blur-md p-6 sm:p-10 lg:p-12 text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 border border-slate-800 shadow-sm reveal"
          ref={ctaRef}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-[11px] font-mono font-semibold uppercase tracking-wider border border-cyan-800/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Initiate Digital Engagement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline tracking-tight text-white leading-tight">
            Let's Build What's Next.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have a business idea, legacy system constraint, or digital automation challenge? Turn it into a resilient, sovereign technology solution engineered for scale.
          </p>

          {/* CTA Buttons Row */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-sm shadow-sm hover:bg-cyan-400 transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">send</span>
              <span>Start a Conversation</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm hover:bg-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined mr-2 text-[18px] text-cyan-400">calendar_month</span>
              <span>Schedule Architecture Review</span>
            </button>
          </div>

          {/* Consultation Principles */}
          <div className="pt-4 sm:pt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-cyan-400">schedule</span>
              <span>Dedicated Discovery Session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-cyan-400">lock</span>
              <span>Confidential Project Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-cyan-400">verified</span>
              <span>Direct Technical Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
