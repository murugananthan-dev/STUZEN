import React, { useState } from 'react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ServicesEcosystemSection Component (Section 2: Interactive Engineering Workbench)
 * Technical specification workbench with a vertical discipline index and dynamic architecture spec sheet.
 */
export function ServicesEcosystemSection() {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('tab-web');

  const headerRef = useScrollReveal();
  const tabsRef = useScrollReveal({ stagger: true });
  const stageRef = useScrollReveal();

  const tabs = [
    {
      id: 'tab-web',
      code: '01_WEB',
      icon: 'web',
      title: 'Website Development',
      subtitle: 'Headless, Sub-second Edge Next.js Hubs'
    },
    {
      id: 'tab-software',
      code: '02_SOFTWARE',
      icon: 'terminal',
      title: 'Custom Software',
      subtitle: 'Distributed Systems, Event Streaming & APIs'
    },
    {
      id: 'tab-apps',
      code: '03_APPS',
      icon: 'devices',
      title: 'Web Applications',
      subtitle: 'Role-Based Portals, Multi-Tenant SaaS Engines'
    },
    {
      id: 'tab-ai',
      code: '04_AI',
      icon: 'psychology',
      title: 'AI Automation',
      subtitle: 'LLM Routing, Vector Indexing, Doc Parsing'
    },
    {
      id: 'tab-whatsapp',
      code: '05_WHATSAPP',
      icon: 'chat',
      title: 'WhatsApp Automation',
      subtitle: 'Meta Cloud BSP, CRM Connectors & Chatbots'
    },
    {
      id: 'tab-digital',
      code: '06_DIGITAL',
      icon: 'hub',
      title: 'Business Digital Solutions',
      subtitle: 'ERP Integrations, Governance & Cloud Migration'
    }
  ];

  return (
    <section className="w-full bg-surface-container-low py-10 md:py-14 lg:py-20 relative border-b border-outline/10" id="services-ecosystem">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 md:mb-8 reveal-section-header" ref={headerRef}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-semibold uppercase tracking-wider mb-2 border border-outline/15">
            <span>02 / Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-on-surface tracking-tight">
            Precision Engineering Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            Select an operational discipline to examine its technical stack composition, target outputs, and verified execution artifacts.
          </p>
        </div>

        {/* Technical Workbench: Discipline Selector Index + Dynamic Specification Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Discipline Index Selector */}
          <div
            className="lg:col-span-5 flex flex-col gap-2 stagger-children"
            ref={tabsRef}
            role="tablist"
            aria-label="Engineering Disciplines"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`pane-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-150 cursor-pointer border relative overflow-hidden ${
                    isActive
                      ? 'bg-surface-container-lowest border-outline/25 shadow-sm'
                      : 'bg-surface-container-lowest/60 border-outline/10 hover:bg-surface-container-lowest hover:border-outline/20'
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors border ${
                          isActive
                            ? 'bg-secondary text-on-secondary border-secondary'
                            : 'bg-surface-container text-on-surface border-outline/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-secondary font-semibold uppercase">{tab.code}</span>
                          <h3 className="text-sm font-semibold text-on-surface font-headline">{tab.title}</h3>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">{tab.subtitle}</p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[16px] transition-transform ${
                        isActive ? 'text-secondary translate-x-0.5' : 'text-outline-variant'
                      }`}
                    >
                      arrow_forward_ios
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Specification Sheet */}
          <div
            className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm min-h-[460px] flex flex-col justify-between reveal border border-outline/20"
            ref={stageRef}
          >
            {/* Dynamic Content Pane with Smooth 180ms Cross-fade */}
            <div key={activeTab} className="tab-pane-enter space-y-4">
              {/* Content Pane 1: Website Development */}
              {activeTab === 'tab-web' && (
                <div className="space-y-4" id="pane-tab-web" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: WEB_DEPLOY
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Active Edge Network</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Engineered for 100/100 Core Web Vitals &amp; Continuous Scale
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    We replace sluggish legacy templates with high-performance headless web hubs using React Server Components, Next.js, and multi-region edge caches. Zero hydration lag, sovereign security posture, and deep semantic accessibility out of the box.
                  </p>

                  {/* Technical Specification Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Stack Composition</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Next.js Edge Runtime, TypeScript, Tailwind, Cloudflare Workers</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Target Output</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">&lt;0.8s First Contentful Paint, Enterprise security-aligned CMS</div>
                    </div>
                  </div>

                  {/* Code Telemetry Snippet */}
                  <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                    <div className="text-slate-500">// Edge Route Configuration</div>
                    <div className="text-emerald-400">export const runtime = 'edge';</div>
                    <div className="text-cyan-300">export const revalidate = 3600; // multi-region ISR cache</div>
                  </div>
                </div>
              )}

              {/* Content Pane 2: Custom Software */}
              {activeTab === 'tab-software' && (
                <div className="space-y-4" id="pane-tab-software" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: BACKEND_KERNEL
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Zero-Trust Topology</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Event-Driven Microservices &amp; Distributed Backend Systems
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Custom operational software designed to run mission-critical business processes without downtime. Engineered with clean API boundaries, transactional integrity, and horizontal scalability.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Execution Engine</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Golang, Node.js (NestJS), PostgreSQL, Redis Pub/Sub, Kafka</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">High Throughput Design</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Deterministic sub-50ms API response, automated failover shards</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                    <div className="text-slate-500">// Distributed Transaction Boundary</div>
                    <div className="text-emerald-400">BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;</div>
                    <div className="text-cyan-300">INSERT INTO ledger_entries (...) RETURNING transaction_id;</div>
                  </div>
                </div>
              )}

              {/* Content Pane 3: Web Applications */}
              {activeTab === 'tab-apps' && (
                <div className="space-y-4" id="pane-tab-apps" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: CLIENT_SURFACE
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Role-Based Access Enforced</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Intuitive Enterprise Portals &amp; Multi-Tenant SaaS Engines
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Interactive dashboards, workflow tools, and client portals built with fluid responsive interactions. Designed for high data density, real-time sync, and rigorous permission trees.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Frontend Architecture</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">React 18+, TanStack Query, Tailwind, WebSockets, Zod</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Security Boundary</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">JWT/mTLS, Row-Level Security (RLS), Encrypted Local State</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Pane 4: AI Automation */}
              {activeTab === 'tab-ai' && (
                <div className="space-y-4" id="pane-tab-ai" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: APPLIED_INTELLIGENCE
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Semantic Pipeline</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Applied LLM Routing, Document Extraction &amp; Workflows
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Turn messy business inputs into structured database entries. We integrate private LLM inferences, semantic search indexing, and automated validation guardrails into your existing processes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">AI Tooling Suite</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">OpenAI / Claude / Gemini API, pgvector, LangChain, Instructor</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Verification Guarantee</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Zod structured JSON schemas, hallucination mitigation buffers</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Pane 5: WhatsApp Automation */}
              {activeTab === 'tab-whatsapp' && (
                <div className="space-y-4" id="pane-tab-whatsapp" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: CONVERSATIONAL_GATEWAY
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Meta BSP Connected</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Official WhatsApp Business Cloud Solutions &amp; CRM Sync
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Direct integration with Meta Cloud API. Build automated lead intake channels, instant payment receipts, order notifications, and two-way CRM customer handshakes that eliminate manual response delays.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Integration Surface</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Meta Cloud API, Webhooks, HubSpot, Salesforce, Zoho, Custom REST</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Operational Velocity</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">&lt;1s webhook dispatch, automated calendar appointment booking</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Pane 6: Business Digital Solutions */}
              {activeTab === 'tab-digital' && (
                <div className="space-y-4" id="pane-tab-digital" role="tabpanel">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-outline/10">
                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-mono font-semibold uppercase">
                      ARCHITECTURE_PHASE: ENTERPRISE_SYNCHRONIZATION
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      <span>Modern Security Standards</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-headline tracking-tight">
                    Holistic Systems Modernization &amp; Operational Integration
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Bridging disparate legacy accounting, inventory, and fulfillment software with modern cloud services. We eliminate manual duplicate entry and establish a singular sovereign data plane for leadership.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Enterprise Connectors</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">SAP, NetSuite, QuickBooks, Stripe, AWS Graviton Clusters</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline/10">
                      <div className="text-[11px] font-mono text-secondary uppercase font-semibold">Governance</div>
                      <div className="text-xs text-on-surface mt-1 font-medium">Zero-Trust Network Access (ZTNA) &amp; full audit trails</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stage Footer Anchor */}
            <div className="pt-4 mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline/10 text-xs">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
                <span>Production-proven architecture patterns</span>
              </div>
              <button
                type="button"
                onClick={() => navigateTo(VIEWS.DISCOVERY)}
                className="inline-flex items-center font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <span>Request Architecture Brief</span>
                <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesEcosystemSection;
