import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ShowcaseGallerySection Component (Section 3: Case Study Portfolio)
 * Engineered artifacts portfolio presenting 4 verified production systems with authentic software viewports.
 */
export function ShowcaseGallerySection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });

  const showcaseItems = [
    {
      category: 'Web Engineering',
      metric: 'Core Vitals 100',
      title: 'Global Logistics & Freight Infrastructure Hub',
      description: 'Edge-rendered responsive portal processing cargo tracking queries across 34 countries with zero layout shift.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKzdEx-qWXX6swxu3RCaMNytFiHjtsHBx3YUQCuFnofksB-5oXAlbOzDxUVqX0y4QP1IReVFzxAhHyj0jJEF4zzuWh9V48zahn5KtIbiyyp-lVdU9Ikwo44fFwwr0CedUBHHfMeUWU7xYK1b8ZmJO_B2MFAlLKdTJ50V2ZefQbSz6zRDE1DaSO8AgaXXo_neHKQKhliwKfm6y-2NmaGfbv-FfI89xM7IXGUKyx5r0',
      badgeLeft: 'NEXT.JS 14',
      badgeRight: 'FID: 12ms',
      caption: 'Autonomous Dispatch Routing Portal',
      footerLeft: 'Multi-Region CDN',
      footerRight: '100% Mobile Fluid Grid'
    },
    {
      category: 'Enterprise SaaS',
      metric: 'RBAC Enforced',
      title: 'Executive Pipeline & Capital Triage Console',
      description: 'Centralized corporate financial orchestrator with strict audit logs and multi-tiered manager approval matrices.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC48lulrgTulN_NnXStpKkuYxsvKlpw19SL_MyintYiiZuFA975deb60nAUQx_G774aibW_tNnwjb8-z4UBbHRXsgmNQx0tEHYv_Q5AC7RW7cAGOOSzrB46M3dDIDoleyzEAvKEWllc4rXPgO7Hz9PFSL6cU6H_T1Lu705fr547qO2r7PLkjAvttliYc1gVo1DL2qMTjcuMIKngDTdsa5DzJiXmzD_LJUCxTTN7ui0',
      badgeLeft: 'POSTGRES RLS',
      badgeRight: 'Audit Ready',
      caption: 'Capital Ledger & Live Settlement Ledger',
      footerLeft: 'Active Sessions: 1,420',
      footerRight: 'Encrypted at Rest'
    },
    {
      category: 'Native Mobile',
      metric: 'iOS & Android Sync',
      title: 'Field Operations & Inspection Telemetry',
      description: 'Offline-first mobile application designed for utility engineers conducting critical infrastructure surveys.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYIQZ5TpqsUHZgE_69McPDIJdwugs9J8vX3hT-0JYqnpXUH41BDj-hVAW4tryYxWfE3TuSbp8cgedAIuJicEi8_TIFWoW_BoU4g6vRQQ_f2qrEfZcbQzHZHNS2LEOpFpL77couUhSa3-YC8AEI_Qawz9DkoHiRQ6TqBu2N6KUnam4drdf9Sp7j2Z8s09-M5plq5-8G9pP9JpV5a9GaIqmFeErHbZK4EvqJIxcECJU',
      badgeLeft: 'OFFLINE CACHING',
      badgeRight: 'SQLite Sync',
      caption: 'Substation Diagnostic Grid Interface',
      footerLeft: '60 FPS Fluid Interface',
      footerRight: 'Zero-Loss Cloud Queue'
    },
    {
      category: 'Event Workflow',
      metric: 'Active Orchestrator',
      title: 'Intelligent Document Ingestion Engine',
      description: 'Autonomous ingestion pipeline extracting contractual clauses, converting legal forms into structured JSON records.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDItRdjmvc-oFfTM77rGWetKV25T9qMMC5FHj8aemnGXZF3RHMHWehhrEaDhyXxx5ujstiz4nrnzoZsTstgSs4nKEy2vN7Sm53wzkPx5FUD3CTS3p1LHTXhL_1zgt6F8CXo6LcBGGamCX2dQuP6bHTYcndui2Z5QRVW8Gwhul4AohVy1cIrG6izIBft2yek0bKVGFJHoHZmkhPpKPAtNyKohe-hmuhPdOuy0KLEruM',
      badgeLeft: 'SCHEMA VALIDATED',
      badgeRight: '99.8% Precision',
      caption: 'Automated Procurement Parser',
      footerLeft: 'Async Processing Engine',
      footerRight: 'REST & Webhook Ready'
    }
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-10 md:py-14 lg:py-20 relative border-b border-outline/10" id="showcase-gallery">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3 reveal-section-header" ref={headerRef}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-semibold uppercase tracking-wider mb-2 border border-outline/15 shadow-sm">
              <span>03 / Production Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-on-surface tracking-tight">
              Selected Engineered Artifacts
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            A portfolio of deployed systems, responsive client portals, and automation workflows engineered for maximum reliability.
          </p>
        </div>

        {/* 2-Column Responsive Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 stagger-children" ref={gridRef}>
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="card-interactive rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-sm flex flex-col justify-between group border border-outline/20"
            >
              <div className="space-y-3">
                {/* Meta Eyebrow & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-semibold text-secondary">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-outline">
                    <span className="w-2 h-2 rounded-full bg-secondary-container" />
                    <span>{item.metric}</span>
                  </div>
                </div>

                {/* Application Window Bezel Viewport */}
                <div className="rounded-xl overflow-hidden bg-slate-900 border border-outline/20 shadow-sm relative">
                  {/* Subtle Window Chrome */}
                  <div className="bg-slate-950 px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">{item.caption}</span>
                    <span className="w-2" />
                  </div>

                  <div className="h-44 sm:h-52 w-full relative overflow-hidden">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                      src={item.imageUrl}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Dark Glassmorphic Badges */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-white border border-white/10 font-medium">
                        {item.badgeLeft}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary-container text-black font-semibold">
                        {item.badgeRight}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-headline text-on-surface group-hover:text-secondary transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Meta Badges */}
              <div className="mt-4 pt-3 flex items-center justify-between border-t border-outline/10 text-xs font-mono text-outline">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                  <span>{item.footerLeft}</span>
                </div>
                <span>{item.footerRight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShowcaseGallerySection;
