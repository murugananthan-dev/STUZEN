import React, { useState } from 'react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';

/**
 * HeroSection Component (Section 1: Editorial Tech Statement)
 * Asymmetric editorial composition with bold typography, high-contrast living software window,
 * and clean mobile/desktop responsive docking.
 */
export function HeroSection() {
  const { navigateTo } = useNavigation();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleScrollToServices = (e) => {
    e.preventDefault();
    const target = document.getElementById('services-ecosystem');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = (e) => {
    e.preventDefault();
    navigateTo(VIEWS.DISCOVERY);
  };

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest py-10 md:py-14 lg:py-20 border-b border-outline/10">
      {/* Subtle, restrained ambient background tone */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-fixed-dim/20 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-surface-container-high/40 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter relative z-10">
        {/* Top Status Eyebrow Cluster */}
        <div className="hero-anim-eyebrow flex flex-wrap items-center gap-2 mb-4 md:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface border border-outline/15 text-[11px] font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            <span>Enterprise Digital Engineering</span>
          </div>
          <span className="text-[11px] text-outline font-mono">/</span>
          <span className="text-[11px] text-on-surface-variant font-medium">Architecture, High-Scale Web &amp; Applied AI</span>
        </div>

        {/* Hero Grid & Typographic Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4 md:space-y-5">
            <h1 className="hero-anim-headline text-3xl sm:text-5xl lg:text-6xl font-display text-primary tracking-tight leading-[1.08]">
              Technology That <br />
              <span className="italic font-display bg-gradient-to-r from-secondary via-secondary-container to-primary bg-clip-text text-transparent">
                Moves Your Business Forward.
              </span>
            </h1>

            <p className="hero-anim-para text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              We design and build powerful websites, custom software, and intelligent automation that help enterprises work smarter, compress operating cycle times, and scale sovereign digital capabilities.
            </p>

            {/* CTAs */}
            <div className="hero-anim-cta pt-2 md:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#services-ecosystem"
                onClick={handleScrollToServices}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary text-on-primary font-semibold text-sm shadow-sm hover:bg-inverse-surface transition-all duration-300 cursor-pointer"
              >
                <span>Explore Our Solutions</span>
                <span className="material-symbols-outlined ml-2 text-secondary-container text-[18px]">arrow_forward</span>
              </a>

              <button
                type="button"
                onClick={handleStartProject}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-surface-container-lowest text-on-surface border border-outline/20 font-semibold text-sm shadow-sm hover:bg-surface-container transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2 text-secondary text-[18px]">chat_bubble</span>
                <span>Start a Project</span>
              </button>
            </div>

            {/* Micro Metric Proof Ticker (Explicit Illustrative Architecture Targets) */}
            <div className="hero-anim-cta pt-4 md:pt-6">
              <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-2">
                Architecture Design Targets (Simulated Benchmarks)
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-lg">
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-bold text-on-surface font-headline">
                    &lt;1.0<span className="text-secondary text-xs font-normal">s</span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant uppercase tracking-wider mt-0.5">Target FCP</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-bold text-on-surface font-headline">
                    &lt;140<span className="text-secondary text-xs font-normal">ms</span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant uppercase tracking-wider mt-0.5">Edge Latency Target</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-bold text-on-surface font-headline">
                    Active
                  </div>
                  <div className="text-[11px] text-on-surface-variant uppercase tracking-wider mt-0.5">Failover Architecture</div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Software Canvas (Desktop Window + Responsive WhatsApp Module) */}
          <div className="hero-anim-visual lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Primary Desktop Browser Window */}
            <div className="w-full rounded-xl bg-surface-container-lowest shadow-md overflow-hidden relative z-10 border border-outline/20">
              {/* Browser Header Chrome */}
              <div className="bg-surface-container px-4 py-2.5 flex items-center justify-between border-b border-outline/15">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-surface-container-lowest border border-outline/15 text-[11px] font-mono text-outline truncate max-w-[210px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary">lock</span>
                  <span>portal.stuzen.io/telemetry</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px]">refresh</span>
                </div>
              </div>

              {/* SaaS Internal Application Canvas */}
              <div className="p-4 bg-surface-container-lowest space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center text-xs font-bold font-mono">ST</div>
                    <div>
                      <div className="text-sm font-semibold text-on-surface leading-tight font-headline">Quantum Stream Gateway</div>
                      <div className="text-[11px] font-mono text-secondary">Active Node: eu-west-1a</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] font-mono font-medium">9.4k req/s</span>
                </div>

                {/* Live Throughput Sparklines */}
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <span className="font-medium">Continuous Throughput Stream</span>
                    <span className="text-secondary font-mono text-[11px]">99.4% Valid</span>
                  </div>
                  <svg className="w-full h-14 text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 320 64">
                    <path d="M0,45 Q40,15 80,30 T160,20 T240,40 T320,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                    <path d="M0,45 Q40,15 80,30 T160,20 T240,40 T320,10 L320,64 L0,64 Z" fill="currentColor" fillOpacity="0.06" />
                  </svg>
                </div>

                {/* Architecture Orchestrator Mini Log */}
                <div className="rounded-lg bg-slate-950 p-3 text-slate-300 font-mono text-[11px] space-y-1 border border-slate-800">
                  <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800">
                    <span>RUNTIME ORCHESTRATION</span>
                    <span className="text-cyan-400">TLSv1.3</span>
                  </div>
                  <div className="text-emerald-400">› [DISPATCH] webhook_verified [META_CLOUD_API]</div>
                  <div className="text-cyan-300">› [LLM_PIPELINE] intent=&quot;quote_procurement&quot; (conf: 0.99)</div>
                  <div className="text-slate-400">› [POSTGRES] multi_region_replicate :: commit_ok (18ms)</div>
                </div>
              </div>
            </div>

            {/* Responsive WhatsApp Module (Cleanly Docked: floating on desktop, neatly stacked below on mobile) */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 w-full lg:w-72 rounded-xl bg-surface-container-lowest shadow-md p-3 z-20 border border-outline/20">
              {/* Phone Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container rounded p-1.5 border border-outline/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
                    <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-on-surface flex items-center gap-1 leading-none font-headline">
                      <span>Stuzen AI</span>
                      <span className="material-symbols-outlined text-secondary-container text-[14px]">verified</span>
                    </div>
                    <span className="text-[10px] text-secondary">Verified Assistant</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-outline">10:42 AM</span>
              </div>

              {/* WhatsApp Chat Stream */}
              <div className="space-y-2 text-xs">
                <div className="bg-surface-container-low rounded-lg p-2 max-w-[85%] text-on-surface border border-outline/10">
                  <p className="leading-snug">Hello! We need to automate our inbound B2B quotes.</p>
                  <div className="text-[9px] text-outline text-right mt-0.5">10:41 AM</div>
                </div>
                <div className="ml-auto bg-surface-container rounded-lg p-2 max-w-[90%] text-on-surface shadow-sm border border-outline/10">
                  <p className="font-semibold text-secondary text-[11px]">Autonomous Dispatch</p>
                  <p className="leading-snug mt-0.5">Routing complete. 2 architecture review slots available:</p>
                  <div className="mt-1.5 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(1)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] transition-colors cursor-pointer border ${
                        selectedSlot === 1
                          ? 'bg-secondary text-on-secondary border-secondary font-medium'
                          : 'bg-surface-container-lowest text-on-surface border-outline/15 hover:bg-surface-container'
                      }`}
                    >
                      14:00 UTC - Tech Architecture Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(2)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] transition-colors cursor-pointer border ${
                        selectedSlot === 2
                          ? 'bg-secondary text-on-secondary border-secondary font-medium'
                          : 'bg-surface-container-lowest text-on-surface border-outline/15 hover:bg-surface-container'
                      }`}
                    >
                      16:30 UTC - AI Scope &amp; Deliverables
                    </button>
                  </div>
                  <div className="text-[9px] text-outline text-right mt-1 flex items-center justify-end gap-1">
                    <span>10:42 AM</span>
                    <span className="material-symbols-outlined text-secondary text-[12px]">done_all</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
