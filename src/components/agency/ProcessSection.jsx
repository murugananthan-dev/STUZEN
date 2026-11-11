import React from 'react';
import { Search, Compass, Cpu, LifeBuoy } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ProcessSection Component ("How We Work")
 * High-level 4-step delivery philosophy: Discover, Define, Design & Develop, Deliver & Support.
 */
export function ProcessSection() {
  const headerRef = useScrollReveal();
  const stepsRef = useScrollReveal({ threshold: 0.1 });

  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your business, goals, audience and requirements.',
      icon: Search
    },
    {
      step: '02',
      title: 'Define',
      desc: 'Establish the project structure, scope, features and priorities.',
      icon: Compass
    },
    {
      step: '03',
      title: 'Design & Develop',
      desc: 'Translate the agreed requirements into a practical digital solution.',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Deliver & Support',
      desc: 'Prepare the final delivery and discuss ongoing support arrangements.',
      icon: LifeBuoy
    }
  ];

  return (
    <section id="how-we-work" className="agency-section how-we-work-section" aria-labelledby="process-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered reveal-section-header" ref={headerRef}>
          <span className="section-kicker badge badge-navy">
            Delivery Lifecycle
          </span>
          <h2 id="process-heading" className="section-title">
            Thoughtful Planning. Better Digital Outcomes.
          </h2>
          <p className="section-subtitle">
            A reliable, transparent workflow focused on engineering clarity and mutual alignment.
          </p>
        </div>

        {/* 4 Process Steps Row */}
        <div className="process-steps-row stagger-children" ref={stepsRef}>
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="process-step-item">
                <div className="process-step-header">
                  <span className="process-step-num">STEP {item.step}</span>
                  <div className="process-step-icon" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="process-step-title">{item.title}</h3>
                <p className="process-step-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;

