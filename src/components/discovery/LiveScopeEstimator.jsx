import React, { useMemo } from 'react';
import { Cpu, Layers, HelpCircle, AlertCircle, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';
import { calculateScopeComplexity } from '../../utils/scopeEstimator';

/**
 * LiveScopeEstimator Component
 * Real-time architectural complexity planning assessment based on selected questionnaire answers.
 */
export function LiveScopeEstimator() {
  const { answers } = useDiscovery();

  // Re-calculate derived complexity on answer changes
  const assessment = useMemo(() => {
    return calculateScopeComplexity(answers);
  }, [answers]);

  return (
    <section className="scope-estimator-panel" aria-labelledby="estimator-heading">
      <div className="section-intro-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="section-intro-badge">
          <span className="badge badge-brand">
            <Cpu size={12} aria-hidden="true" />
            ENGINEERING HEURISTICS
          </span>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
            Real-Time Scope Analysis
          </span>
        </div>
        <h2 id="estimator-heading" className="section-intro-title">
          LIVE PROJECT SCOPE ESTIMATOR
        </h2>
        <p className="section-intro-desc">
          A preliminary planning indicator based on the features and requirements selected during the discovery interview. Final project scope, quotation and delivery schedule must be confirmed separately.
        </p>
      </div>

      {/* Main Complexity Metric Card */}
      <div className="question-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'center',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {/* Metric 1: Complexity Level & Score */}
          <div>
            <div style={{ fontSize: 'var(--font-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              Complexity Classification
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: assessment.bgColor,
                  color: assessment.color,
                  border: `1.5px solid ${assessment.borderColor}`,
                  fontSize: 'var(--font-base)',
                  fontWeight: 700
                }}
              >
                {assessment.level} ({assessment.range})
              </span>
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Index: <strong>{assessment.score} pts</strong>
              </span>
            </div>
          </div>

          {/* Metric 2: Major Features */}
          <div>
            <div style={{ fontSize: 'var(--font-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              Selected Capabilities
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {assessment.majorFeaturesCount} <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--color-text-muted)' }}>features active</span>
            </div>
          </div>

          {/* Metric 3: Active Integrations */}
          <div>
            <div style={{ fontSize: 'var(--font-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              External Integrations
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--color-brand-secondary)' }}>
              {assessment.integrationsCount} <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--color-text-muted)' }}>services linked</span>
            </div>
          </div>
        </div>

        {/* Narrative Description of Classification */}
        <div style={{ paddingTop: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
            <strong>Assessment Rationale:</strong> {assessment.description}
          </p>
        </div>
      </div>

      {/* Grid of Key Drivers, Dependencies, and Clarifications */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Scored Capability Drivers */}
        <div className="question-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <Layers size={16} color="var(--color-brand-secondary)" aria-hidden="true" />
            <h3 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, margin: 0 }}>
              Primary Architectural Drivers
            </h3>
          </div>
          {assessment.scoredItems.length > 0 ? (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {assessment.scoredItems.map((item, idx) => (
                <li key={idx} style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={12} color="var(--color-brand-accent)" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
              No complex features selected yet. Complete Sections 03 and 05 to evaluate drivers.
            </p>
          )}
        </div>

        {/* Potential Technical Dependencies */}
        <div className="question-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <Wrench size={16} color="var(--color-brand-secondary)" aria-hidden="true" />
            <h3 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, margin: 0 }}>
              Technical Dependencies Identified
            </h3>
          </div>
          {assessment.dependencies.length > 0 ? (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {assessment.dependencies.map((dep, idx) => (
                <li key={idx} style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-brand-secondary)', fontWeight: 'bold' }}>•</span>
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
              No specialized technical dependencies detected based on current answers.
            </p>
          )}
        </div>

        {/* Missing Clarifications Tracker */}
        <div className="question-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <HelpCircle size={16} color="var(--color-warning)" aria-hidden="true" />
            <h3 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, margin: 0 }}>
              Clarifications Needed ({assessment.missingClarifications.length})
            </h3>
          </div>
          {assessment.missingClarifications.length > 0 ? (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {assessment.missingClarifications.map((item, idx) => (
                <li key={idx} style={{ fontSize: 'var(--font-xs)', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#d97706', fontWeight: 'bold' }}>!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-success)', fontWeight: 600, margin: 0 }}>
              ✓ All primary discovery fields have preliminary responses recorded.
            </p>
          )}
        </div>
      </div>

      {/* Mandatory Disclaimer Note */}
      <div
        style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          backgroundColor: 'rgba(10, 37, 64, 0.04)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
          <strong>Notice:</strong> Preliminary planning estimate only. Final complexity, scope, quotation and delivery timeline are subject to technical review and written approval.
        </p>
      </div>
    </section>
  );
}

export default LiveScopeEstimator;

