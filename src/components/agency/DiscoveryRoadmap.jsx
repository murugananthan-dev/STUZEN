import React from 'react';
import { Compass, ArrowRight, UserCheck, Target, Layout, Palette, Settings, MessageSquare, Server, BarChart3, Clock, CheckSquare } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

/**
 * DiscoveryRoadmap Component
 * Presents the 10-stage interactive project discovery framework used to scope client work.
 */
export function DiscoveryRoadmap() {
  const { navigateTo, VIEWS } = useNavigation();

  const stages = [
    {
      num: '01',
      title: 'Client & Business Details',
      desc: 'Understand the company, contact person, industry and decision-makers.',
      icon: UserCheck
    },
    {
      num: '02',
      title: 'Project Goals & Audience',
      desc: 'Identify business objectives, target customers and expected outcomes.',
      icon: Target
    },
    {
      num: '03',
      title: 'Website Type & Page Structure',
      desc: 'Determine the required website type, pages, content and structure.',
      icon: Layout
    },
    {
      num: '04',
      title: 'Design & Brand Direction',
      desc: 'Understand visual preferences, branding and design references.',
      icon: Palette
    },
    {
      num: '05',
      title: 'Features & Functionality',
      desc: 'Identify the website features, workflows and required capabilities.',
      icon: Settings
    },
    {
      num: '06',
      title: 'WhatsApp, Integrations & Automation',
      desc: 'Discover communication workflows, business integrations and automation requirements.',
      icon: MessageSquare
    },
    {
      num: '07',
      title: 'Technical & Operational Requirements',
      desc: 'Review domain, hosting, email, migration and security requirements.',
      icon: Server
    },
    {
      num: '08',
      title: 'SEO, Analytics & Marketing',
      desc: 'Identify search visibility, analytics and marketing requirements.',
      icon: BarChart3
    },
    {
      num: '09',
      title: 'Timeline, Budget & Support',
      desc: 'Discuss delivery expectations, budget and post-launch support.',
      icon: Clock
    },
    {
      num: '10',
      title: 'Final Notes & Project Scope',
      desc: 'Confirm priorities, outstanding requirements and project expectations.',
      icon: CheckSquare
    }
  ];

  return (
    <section id="discovery-process" className="agency-section discovery-roadmap-section" aria-labelledby="roadmap-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <span className="section-kicker badge badge-brand">
            <Compass size={13} aria-hidden="true" />
            Discovery Framework
          </span>
          <h2 id="roadmap-heading" className="section-title">
            A Clear Process From Idea to Implementation.
          </h2>
          <p className="section-subtitle">
            Every successful digital project begins with understanding the business, defining the right solution and agreeing on a practical scope.
          </p>
        </div>

        {/* 10 Stages Grid */}
        <div className="roadmap-grid">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.num} className="roadmap-card">
                <div className="roadmap-card-number-badge">
                  <span>{stage.num}</span>
                </div>
                <div className="roadmap-card-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <Icon size={16} color="var(--color-brand-secondary)" aria-hidden="true" />
                    <h3 className="roadmap-card-title">{stage.title}</h3>
                  </div>
                  <p className="roadmap-card-desc">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner after Roadmap */}
        <div className="roadmap-cta-banner">
          <div className="roadmap-cta-text">
            <h3>Ready to walk through this 10-stage process?</h3>
            <p>
              Experience our structured discovery wizard to clarify your digital vision, determine accurate technical requirements, and prepare a formal specification.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-accent btn-lg"
            onClick={() => navigateTo(VIEWS.DISCOVERY)}
            aria-label="Begin Your Project Discovery in the interactive wizard"
          >
            <span>Begin Your Project Discovery</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiscoveryRoadmap;
