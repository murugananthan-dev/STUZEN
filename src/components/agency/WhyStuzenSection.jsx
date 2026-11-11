import React from 'react';
import { Briefcase, Layers, Compass, Wrench, Smartphone, FileCheck, ShieldCheck } from 'lucide-react';

/**
 * WhyStuzenSection Component
 * Authentic, grounded value propositions highlighting engineering discipline and clarity.
 */
export function WhyStuzenSection() {
  const points = [
    {
      title: 'Business-first thinking.',
      desc: 'We start by understanding your commercial objectives and user needs rather than jumping directly into technical hype.',
      icon: Briefcase
    },
    {
      title: 'Tailored digital solutions.',
      desc: 'Software and websites designed around your specific business processes and workflows, avoiding rigid cookie-cutter limitations.',
      icon: Layers
    },
    {
      title: 'Clear project discovery.',
      desc: 'Our structured 10-stage discovery process identifies edge cases early, ensuring realistic roadmaps and mutual alignment.',
      icon: Compass
    },
    {
      title: 'Practical technology choices.',
      desc: 'We select dependable, maintainable, modern technology stacks matched to your scale and long-term operating budget.',
      icon: Wrench
    },
    {
      title: 'Responsive and modern experiences.',
      desc: 'Every interface is engineered for crisp performance, semantic accessibility, and fluid responsiveness across all screens.',
      icon: Smartphone
    },
    {
      title: 'Transparent project scope.',
      desc: 'Clearly documented functional specifications, defined milestones, and explicit deliverables with zero ambiguity.',
      icon: FileCheck
    },
    {
      title: 'Focus on long-term usability.',
      desc: 'Clean codebase architecture, intuitive administration, and maintainable systems built to support your evolving business.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="why-stuzen" className="agency-section why-stuzen-section" aria-labelledby="why-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <span className="section-kicker badge badge-brand">
            Agency Philosophy
          </span>
          <h2 id="why-heading" className="section-title">
            Why Choose STUZEN TECHNOLOGIES
          </h2>
          <p className="section-subtitle">
            A collaborative engineering partnership committed to architectural integrity, clarity, and dependable delivery.
          </p>
        </div>

        {/* Value Proposition Cards Grid */}
        <div className="why-grid">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-card-icon-wrap" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyStuzenSection;
