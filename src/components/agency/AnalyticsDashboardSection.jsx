import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * AnalyticsDashboardSection (Section 4: Financial-Grade Data Terminal)
 * High-density system observability terminal with integrated metric ribbon,
 * high-precision throughput SVG curve, and execution efficiency telemetry.
 */
export function AnalyticsDashboardSection() {
  const headerRef = useScrollReveal();
  const metricRibbonRef = useScrollReveal({ stagger: true });
  const lineChartRef = useScrollReveal();
  const barChartRef = useScrollReveal();

  return (
    <section className="w-full bg-surface-container-low py-10 md:py-14 lg:py-20 relative border-b border-outline/10" id="analytics">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3 reveal-section-header" ref={headerRef}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-semibold uppercase tracking-wider mb-2 border border-outline/15 shadow-sm">
              <span>04 / System Observability</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-on-surface tracking-tight">
              Live Telemetry &amp; Throughput Metrics
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-outline max-w-sm">
            (Illustrative Sample Data — Dynamic System Demonstration)
          </p>
        </div>

        {/* Live Dashboard Container */}
        <div className="w-full rounded-2xl bg-surface-container-lowest p-4 sm:p-6 lg:p-7 shadow-sm space-y-6 border border-outline/20">
          {/* Integrated Horizontal Telemetry Ribbon */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-outline/15 rounded-xl border border-outline/20 bg-surface-container-low/40 overflow-hidden stagger-children"
            ref={metricRibbonRef}
          >
            {/* Metric 1 */}
            <div className="p-4 bg-surface-container-lowest/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>CLUSTER HEALTH</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
                99.9%
              </div>
              <div className="text-[11px] text-secondary font-medium">
                Simulated Target Availability
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 bg-surface-container-lowest/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>AVG INFERENCE LATENCY</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
                &lt;138ms
              </div>
              <div className="text-[11px] text-secondary font-medium">
                -32ms vs. previous month
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 bg-surface-container-lowest/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>CONVERSATION DISPATCH</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">forum</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
                1,842/min
              </div>
              <div className="text-[11px] text-secondary font-medium">
                Simulated Queue Throughput
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 bg-surface-container-lowest/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>PACKET RETENTION</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">
                99.9%
              </div>
              <div className="text-[11px] text-secondary font-medium">
                Sample Stream Integrity
              </div>
            </div>
          </div>

          {/* Charts Split: Processing Throughput Chart & Cloud Tier Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Line Chart: Processing Throughput */}
            <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-surface-container-low/60 border border-outline/15 space-y-3 reveal" ref={lineChartRef}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold font-headline text-on-surface">Processing Throughput Over Time</h3>
                  <p className="text-xs text-on-surface-variant">Continuous events per second across global edge workers</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="text-on-surface font-medium">Current Run</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                    <span className="text-outline">Historical Mean</span>
                  </div>
                </div>
              </div>

              {/* High-Precision SVG Chart */}
              <div className="w-full h-48 sm:h-52 pt-2">
                <svg className="w-full h-full text-secondary" fill="none" viewBox="0 0 700 220" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.1" x1="0" x2="700" y1="40" y2="40" />
                  <line stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.1" x1="0" x2="700" y1="90" y2="90" />
                  <line stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.1" x1="0" x2="700" y1="140" y2="140" />
                  <line stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.1" x1="0" x2="700" y1="190" y2="190" />

                  {/* Historical Baseline Path */}
                  <path d="M0,160 Q120,130 240,140 T480,110 T700,90" fill="none" opacity="0.3" stroke="#76777D" strokeDasharray="6 6" strokeWidth="2" />

                  {/* Active Run Path with Area Fill */}
                  <path d="M0,170 C100,120 180,180 280,80 C360,0 440,110 520,60 C600,20 650,40 700,15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M0,170 C100,120 180,180 280,80 C360,0 440,110 520,60 C600,20 650,40 700,15 L700,220 L0,220 Z" fill="currentColor" fillOpacity="0.06" />

                  {/* Live Waypoint Indicator */}
                  <circle cx="520" cy="60" fill="#006398" r="4" />
                  <circle cx="520" cy="60" fill="#5BB8FE" opacity="0.3" r="8" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-outline pt-1 border-t border-outline/10">
                <span>00:00 UTC</span>
                <span>06:00 UTC</span>
                <span>12:00 UTC</span>
                <span>18:00 UTC</span>
                <span>24:00 UTC</span>
              </div>
            </div>

            {/* Secondary: Cloud Resource Execution Efficiency */}
            <div className="lg:col-span-4 p-4 sm:p-5 rounded-xl bg-surface-container-low/60 border border-outline/15 space-y-3.5 flex flex-col justify-between reveal" ref={barChartRef}>
              <div>
                <h3 className="text-sm sm:text-base font-semibold font-headline text-on-surface">Execution Efficiency</h3>
                <p className="text-xs text-on-surface-variant">Resource allocation vs compute peak</p>
              </div>

              {/* Multi-Tier Bar Chart Representation */}
              <div className="space-y-3 py-1">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-on-surface font-medium">Edge Compute Workers</span>
                    <span className="text-secondary font-semibold">89%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full rounded-full bg-secondary" style={{ width: '89%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-on-surface font-medium">Postgres Query Pool</span>
                    <span className="text-secondary font-semibold">64%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full rounded-full bg-secondary-container" style={{ width: '64%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-on-surface font-medium">Meta Cloud Webhooks</span>
                    <span className="text-secondary font-semibold">97%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full rounded-full bg-secondary" style={{ width: '97%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-on-surface font-medium">LLM Token Cache</span>
                    <span className="text-secondary font-semibold">42%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full rounded-full bg-outline-variant" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-xs font-mono text-on-surface-variant flex items-center justify-between border border-outline/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Dynamic Autoscale</span>
                </span>
                <span className="text-secondary font-semibold">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDashboardSection;
