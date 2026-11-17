import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * AiWhatsAppSection (Section 5: Sequential Execution Timeline & Interactive Simulation)
 * Asymmetric pipeline schematic showing the 6-step Meta Cloud flow paired with a high-fidelity
 * interactive smartphone chat simulation.
 */
export function AiWhatsAppSection() {
  const [selectedStack, setSelectedStack] = useState(null);

  const headerRef = useScrollReveal();
  const workflowRef = useScrollReveal({ stagger: true });
  const phoneRef = useScrollReveal();

  const handleSelectStack = (stackName) => {
    setSelectedStack(stackName);
  };

  const steps = [
    {
      num: '01',
      title: 'Customer Enquiry',
      desc: 'Inbound lead triggered via website CTA, QR code, or campaign link.',
      badgeBg: 'bg-primary text-on-primary'
    },
    {
      num: '02',
      title: 'Instant Dispatch',
      desc: 'Meta Cloud API triggers sub-second branded welcome handshake.',
      badgeBg: 'bg-secondary text-on-secondary'
    },
    {
      num: '03',
      title: 'Enquiry Collection',
      desc: 'Interactive quick-reply buttons capture requirements and timeline.',
      badgeBg: 'bg-primary text-on-primary'
    },
    {
      num: '04',
      title: 'AI Classification',
      desc: 'LLM intent classification parses budget, intent, and urgency flags.',
      badgeBg: 'bg-secondary-container text-on-secondary-container font-bold'
    },
    {
      num: '05',
      title: 'Dynamic Routing',
      desc: 'Automated meeting booking link with auto-generated initial scope brief.',
      badgeBg: 'bg-primary text-on-primary'
    },
    {
      num: '06',
      title: 'Team Notification',
      desc: 'Real-time webhook sync into Slack channels and enterprise HubSpot CRM.',
      badgeBg: 'bg-secondary text-on-secondary'
    }
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-10 md:py-14 lg:py-20 relative border-b border-outline/10" id="ai-and-whatsapp">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8 reveal-section-header" ref={headerRef}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-semibold uppercase tracking-wider mb-2 border border-outline/15 shadow-sm">
            <span>05 / Omnichannel Conversational Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-on-surface tracking-tight">
            Enterprise WhatsApp &amp; AI Workflow Pipeline
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            Deploy an end-to-end autonomous customer triage system. Eliminate dead inquiries with instant conversational qualification, intelligent calendar routing, and deep CRM sync.
          </p>
        </div>

        {/* Split Container: 6-Step Workflow Pipeline + Interactive Smartphone Chat Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 6-Step Sequential Pipeline */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-2">
              Sequential Execution Flow (Meta Cloud BSP Architecture)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-children" ref={workflowRef}>
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="card-interactive p-3.5 sm:p-4 rounded-xl bg-surface-container-low/80 border border-outline/15 shadow-sm space-y-1 relative"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${step.badgeBg}`}>
                      {step.num}
                    </span>
                    <h3 className="text-sm font-semibold text-on-surface font-headline">{step.title}</h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed pl-7">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Realistic Smartphone WhatsApp Simulation */}
          <div className="lg:col-span-5 flex justify-center reveal" ref={phoneRef}>
            <div className="w-full max-w-sm rounded-[2rem] bg-surface-container-lowest p-3.5 shadow-md space-y-2.5 border border-outline/25">
              {/* Smartphone Top Speaker & Camera Notch */}
              <div className="flex justify-center mb-0.5">
                <div className="w-20 h-3.5 bg-surface-container-high rounded-full"></div>
              </div>

              {/* Chat App Header */}
              <div className="flex items-center justify-between pb-2 px-1 border-b border-outline/15">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs font-mono">
                    ST
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-on-surface flex items-center gap-1 font-headline">
                      <span>Stuzen Solutions</span>
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                    </div>
                    <div className="text-[10px] text-secondary font-mono">Typically replies in 1s</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span className="material-symbols-outlined text-[16px]">more_vert</span>
                </div>
              </div>

              {/* Simulated Chat History */}
              <div className="space-y-2.5 bg-surface-container-low/70 rounded-xl p-3 min-h-[320px] flex flex-col justify-end border border-outline/10">
                {/* Customer Message */}
                <div className="bg-surface-container-lowest text-on-surface rounded-xl p-2.5 max-w-[85%] self-start shadow-sm border border-outline/10 space-y-0.5">
                  <p className="text-xs leading-snug">
                    Hi, we need to integrate our ERP inventory with WhatsApp order automation for 20,000 retail clients.
                  </p>
                  <div className="text-[9px] font-mono text-outline text-right">09:14 AM</div>
                </div>

                {/* AI Automated System Response */}
                <div className="bg-surface-container text-on-surface rounded-xl p-2.5 max-w-[92%] self-end shadow-sm border border-outline/10 space-y-1.5">
                  <div className="flex items-center gap-1 text-secondary text-[10px] font-mono">
                    <span className="material-symbols-outlined text-[12px]">smart_toy</span>
                    <span>Autonomous Engineer</span>
                  </div>
                  <p className="text-xs leading-snug">
                    Welcome to Stuzen. High-volume ERP synchronization is supported natively via our REST and Meta Cloud queues.
                  </p>
                  <p className="text-xs font-semibold font-headline">Which ERP stack are you deploying?</p>

                  {/* Interactive Quick Reply Chips */}
                  <div className="flex flex-col gap-1 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleSelectStack('SAP S/4HANA / NetSuite')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-center cursor-pointer border ${
                        selectedStack === 'SAP S/4HANA / NetSuite'
                          ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                          : 'bg-surface-container-lowest text-secondary border-outline/15 hover:bg-surface-container'
                      }`}
                    >
                      SAP S/4HANA / NetSuite
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectStack('Custom REST / PostgreSQL')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-center cursor-pointer border ${
                        selectedStack === 'Custom REST / PostgreSQL'
                          ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                          : 'bg-surface-container-lowest text-secondary border-outline/15 hover:bg-surface-container'
                      }`}
                    >
                      Custom REST / PostgreSQL
                    </button>
                  </div>

                  <div className="text-[9px] font-mono text-outline text-right flex items-center justify-end gap-1">
                    <span>09:14 AM · Sub-second dispatch</span>
                    <span className="material-symbols-outlined text-secondary text-[11px]">done_all</span>
                  </div>
                </div>

                {/* Simulated instant confirmation if clicked */}
                {selectedStack && (
                  <div className="bg-surface-container-lowest text-on-surface rounded-xl p-2.5 max-w-[85%] self-start shadow-sm border border-outline/10 space-y-0.5 tab-pane-enter">
                    <div className="text-[10px] font-mono text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[11px]">check_circle</span>
                      <span>Configured: {selectedStack}</span>
                    </div>
                    <p className="text-xs leading-snug">
                      Connector matched. Initializing automated sandbox webhook bridge...
                    </p>
                    <div className="text-[9px] font-mono text-outline text-right">09:15 AM</div>
                  </div>
                )}
              </div>

              {/* Simulated Input Field */}
              <div className="flex items-center gap-2 pt-0.5 px-0.5">
                <div className="flex-1 bg-surface-container-low rounded-full px-3 py-1.5 text-xs text-outline flex items-center justify-between border border-outline/10">
                  <span>Type message...</span>
                  <span className="material-symbols-outlined text-[14px]">attach_file</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-on-secondary cursor-pointer hover:bg-secondary-container hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-[14px]">send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiWhatsAppSection;
