import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ArchitectureSection (Section 6: Systems Topology Blueprint)
 * 5-tier architectural topography schematic with horizontal data busline,
 * monospace component matrices, and an institutional security boundary.
 */
export function ArchitectureSection() {
  const headerRef = useScrollReveal();
  const tiersRef = useScrollReveal({ stagger: true });
  const boundaryRef = useScrollReveal();

  const tiers = [
    {
      tierNumber: 'TIER 01',
      title: 'Client Edge',
      description: 'Global CDN PoPs, edge rendering, and sub-10ms asset delivery.',
      stack: 'Next.js 14 · Cloudflare · TLS 1.3',
    },
    {
      tierNumber: 'TIER 02',
      title: 'Service Logic',
      description: 'Stateless containerized services with gRPC binary communication.',
      stack: 'Golang · Node.js · K8s Clusters',
    },
    {
      tierNumber: 'TIER 03',
      title: 'Persistence',
      description: 'Multi-region active shards with point-in-time cryptographic recovery.',
      stack: 'PostgreSQL · Redis · pgvector',
    },
    {
      tierNumber: 'TIER 04',
      title: 'Integrations',
      description: 'Resilient webhook retry matrices with exponential backoff.',
      stack: 'Meta Cloud · Stripe · ERP Gateways',
    },
    {
      tierNumber: 'TIER 05',
      title: 'Autonomous AI',
      description: 'Asynchronous worker pool processing semantic embeddings and dispatch.',
      stack: 'BullMQ · Celery · LLM Guardrails',
    },
  ];

  return (
    <section className="w-full bg-surface-container-low py-10 md:py-14 lg:py-20 relative border-b border-outline/10" id="architecture">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 md:mb-8 reveal-section-header" ref={headerRef}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-semibold uppercase tracking-wider mb-2 border border-outline/15 shadow-sm">
            <span>06 / System Topography</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-on-surface tracking-tight">
            Battle-Tested Technical Architecture
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            Engineered for technical leaders requiring zero single points of failure, deterministic latency, and uncompromised cryptographic boundaries.
          </p>
        </div>

        {/* Connected Visual Node Graph Architecture */}
        <div className="w-full rounded-2xl bg-surface-container-lowest p-4 sm:p-6 lg:p-7 shadow-sm border border-outline/20">
          <div className="relative">
            {/* Desktop Horizontal Data Busline */}
            <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-outline/15 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10 stagger-children" ref={tiersRef}>
              {tiers.map((tier) => (
                <div
                  key={tier.tierNumber}
                  className="card-interactive rounded-xl bg-surface-container-low/70 p-3.5 space-y-2.5 flex flex-col justify-between border border-outline/15 hover:border-secondary/40 shadow-sm"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-outline/10">
                      <span className="text-[10px] font-mono font-bold text-secondary tracking-wider">
                        {tier.tierNumber}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    </div>
                    <h3 className="text-sm font-semibold font-headline text-on-surface">{tier.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{tier.description}</p>
                  </div>
                  <div className="rounded bg-surface-container-lowest p-2 text-[10px] font-mono text-outline border border-outline/10">
                    {tier.stack}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Cryptographic Boundary Bar */}
          <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline/10 reveal" ref={boundaryRef}>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-surface-container text-secondary border border-outline/10">
                <span className="material-symbols-outlined text-[16px]">security</span>
              </span>
              <div>
                <div className="text-xs font-semibold font-headline text-on-surface">End-to-End Cryptographic Boundary</div>
                <div className="text-[11px] font-mono text-outline">mTLS inter-service authentication · Zero-Trust Topology</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface border border-outline/10">
                Modern Security Standards
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface border border-outline/10">
                Encrypted Data in Transit
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface border border-outline/10">
                Data Privacy Best Practices
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchitectureSection;
