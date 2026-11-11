import React, { useState } from 'react';
import { Compass, FileText, ArrowRight, ArrowLeft, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import brandConfig from '../config/brandConfig';

/**
 * DiscoveryWizardView
 * Usable functional placeholder for the upcoming Discovery Questionnaire Wizard (Phase 2+).
 */
export function DiscoveryWizardView() {
  const { navigateTo, VIEWS } = useNavigation();
  const [selectedPillar, setSelectedPillar] = useState('website-development');

  const roadmapSteps = [
    { step: '01', title: 'Project Scope & Objectives', desc: 'Identify target audience, key deliverables, and functional specifications.' },
    { step: '02', title: 'Technical Architecture', desc: 'Evaluate frontend, backend, database, and cloud hosting infrastructure.' },
    { step: '03', title: 'Integrations & AI Tools', desc: 'Specify third-party APIs, authentication providers, and automation pipelines.' },
    { step: '04', title: 'Timeline & Milestone Budget', desc: 'Estimate delivery horizon, development phases, and resource allocation.' }
  ];

  return (
    <div className="discovery-wizard-view view-wrapper">
      <div className="container">
        {/* Navigation Breadcrumb / Return */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigateTo(VIEWS.AGENCY)}
            style={{ paddingLeft: 0 }}
          >
            <ArrowLeft size={16} />
            <span>Back to Agency Home</span>
          </button>
        </div>

        {/* View Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'var(--space-10)' }}>
          <span className="badge badge-brand" style={{ marginBottom: 'var(--space-3)' }}>
            <Compass size={14} /> Discovery Engine
          </span>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>
            Client Requirements Discovery Wizard
          </h1>
          <p style={{ fontSize: 'var(--font-lg)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            A structured framework designed to capture your exact business objectives, technical constraints, and architectural requirements for seamless execution.
          </p>
        </div>

        {/* Interactive Pillar Selector (Preview) */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-10)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 style={{ fontSize: 'var(--font-xl)', marginBottom: 'var(--space-3)' }}>
            Select Primary Focus Pillar
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)', marginBottom: 'var(--space-6)' }}>
            Choose an area of interest to view targeted discovery pathways:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-8)'
            }}
          >
            {brandConfig.servicePillars.map((pillar) => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected
                      ? '2px solid var(--color-brand-secondary)'
                      : '1px solid var(--color-border)',
                    backgroundColor: isSelected
                      ? 'var(--color-brand-accent-light)'
                      : 'var(--color-bg-surface)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPillar(pillar.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-brand-primary)' }}>
                      {pillar.title}
                    </span>
                    {isSelected && <CheckCircle2 size={18} color="var(--color-brand-secondary)" />}
                  </div>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                    {pillar.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Module Pipeline Roadmap */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--font-base)', marginBottom: 'var(--space-4)' }}>
              Discovery Framework Structure
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)'
              }}
            >
              {roadmapSteps.map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-xs)',
                      fontWeight: 700,
                      color: 'var(--color-brand-accent)',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    PHASE {item.step}
                  </span>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Transition Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigateTo(VIEWS.PRINT)}
          >
            <FileText size={16} />
            <span>Preview Formal Document Template</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigateTo(VIEWS.AGENCY)}
          >
            <span>Return to Agency Overview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryWizardView;
