import React from 'react';
import { Monitor, Code2, Bot, Check, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

/**
 * ServicesSection Component
 * Detailed presentation of STUZEN TECHNOLOGIES' 3 core service pillars.
 */
export function ServicesSection() {
  const { navigateTo, VIEWS } = useNavigation();

  const services = [
    {
      number: '01',
      pillar: 'WEBSITE DEVELOPMENT',
      title: 'Professional Websites That Build Trust.',
      description:
        'We design and develop responsive, modern websites that communicate your brand, showcase your services and turn visitors into potential customers.',
      icon: Monitor,
      capabilities: [
        'Corporate websites.',
        'Business websites.',
        'Landing pages.',
        'Portfolio websites.',
        'E-commerce websites.',
        'Responsive website design.',
        'Website redesigns.'
      ]
    },
    {
      number: '02',
      pillar: 'CUSTOM SOFTWARE',
      title: 'Software Built Around Your Workflow.',
      description:
        'We develop tailored software experiences that simplify business operations, improve productivity and support your unique processes.',
      icon: Code2,
      capabilities: [
        'Custom web applications.',
        'Customer portals.',
        'Admin dashboards.',
        'Booking systems.',
        'Business management tools.',
        'Workflow applications.',
        'Data management interfaces.'
      ]
    },
    {
      number: '03',
      pillar: 'AI & AUTOMATION',
      title: 'Smarter Workflows Through Automation.',
      description:
        'We help businesses reduce repetitive work and improve efficiency through practical automation and AI-powered digital experiences.',
      icon: Bot,
      capabilities: [
        'Business process automation.',
        'AI-assisted workflows.',
        'WhatsApp automation planning.',
        'Intelligent chat experiences.',
        'Third-party integrations.',
        'Lead management workflows.',
        'Operational automation.'
      ]
    }
  ];

  return (
    <section id="services" className="agency-section agency-services" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <span className="section-kicker badge badge-navy">
            Core Service Pillars
          </span>
          <h2 id="services-heading" className="section-title">
            Digital Solutions Designed Around Your Business.
          </h2>
          <p className="section-subtitle">
            We combine strategy, thoughtful design and practical technology to help businesses grow.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.number} className="service-card">
                <div className="service-card-top">
                  <div className="service-card-icon-box" aria-hidden="true">
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <span className="service-card-number">{service.number}</span>
                </div>

                <div className="service-card-pillar-label">{service.pillar}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                <div className="service-card-capabilities-heading">Core Capabilities</div>
                <ul className="service-capabilities-list">
                  {service.capabilities.map((capability, idx) => (
                    <li key={idx} className="service-capability-item">
                      <Check size={14} className="service-capability-icon" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-action">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm service-card-btn"
                    onClick={() => navigateTo(VIEWS.DISCOVERY)}
                    aria-label={`Start discovery for ${service.pillar}`}
                  >
                    <span>Define {service.pillar.toLowerCase()} requirements</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

