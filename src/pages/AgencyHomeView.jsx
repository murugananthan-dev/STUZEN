import React from 'react';
import { Globe, Code2, Cpu, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import brandConfig from '../config/brandConfig';

/**
 * AgencyHomeView
 * Phase 1 foundational landing view establishing agency presence,
 * core service pillars, and entry points into client discovery.
 */
export function AgencyHomeView() {
  const { navigateTo, VIEWS } = useNavigation();

  const pillarIcons = {
    'website-development': Globe,
    'custom-software': Code2,
    'ai-automation': Cpu
  };

  return (
    <div className="agency-home-view">
      {/* Hero Section */}
      <section className="view-hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="view-badge">
            <span className="badge badge-brand">
              <Sparkles size={12} />
              Enterprise Technology Agency
            </span>
          </div>

          <h1 id="hero-heading" className="view-title">
            Engineering Digital Excellence with <br />
            <span style={{ color: 'var(--color-brand-secondary)' }}>STUZEN TECHNOLOGIES</span>
          </h1>

          <p className="view-lead">
            {brandConfig.description}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
            >
              <span>Launch Client Discovery Wizard</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => navigateTo(VIEWS.PRINT)}
            >
              <span>View Requirements Document</span>
            </button>
          </div>
        </div>
      </section>

      {/* Service Pillars Section */}
      <section className="container" style={{ paddingBottom: 'var(--space-16)' }} aria-labelledby="pillars-heading">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span className="badge badge-navy">Core Capabilities</span>
          <h2 id="pillars-heading" style={{ marginTop: 'var(--space-2)' }}>
            Strategic Service Pillars
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px' }}>
            Transforming ambitious business concepts into scalable, production-hardened software systems.
          </p>
        </div>

        <div className="view-card-grid">
          {brandConfig.servicePillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id] || Code2;
            return (
              <article key={pillar.id} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{pillar.title}</h3>
                <p className="feature-description">{pillar.summary}</p>
                <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigateTo(VIEWS.DISCOVERY)}
                    style={{ paddingLeft: 0, color: 'var(--color-brand-secondary)' }}
                  >
                    <span>Define Requirements</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Architectural Milestone Notice */}
      <section className="container" style={{ paddingBottom: 'var(--space-20)' }}>
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ShieldCheck size={20} color="var(--color-success)" />
            <h3 style={{ fontSize: 'var(--font-base)', margin: 0 }}>
              Phase 1 Architecture Active & Operational
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
            The application shell, responsive navigation, tokenized corporate design system, and multi-view routing foundation are established. Subsequent phases will introduce the dynamic multi-step questionnaire wizard, real-time client state management, and formal print compilation.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> Brand Identity Configured
            </span>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> Local-First Routing
            </span>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> Print Engine Ready
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AgencyHomeView;
