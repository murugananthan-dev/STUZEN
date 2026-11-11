import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * InternalProjectSummary Component
 * Editable internal planning specification covering sections A through F.
 * Features automated generation for A–E and strict manual preservation of Section F.
 */
export function InternalProjectSummary() {
  const { internalSummary, updateInternalSummary, generateInternalSummary } = useDiscovery();
  const [justGenerated, setJustGenerated] = useState(false);

  const handleAutoGenerate = () => {
    // Check if user has already authored drafts in A–E
    const hasExisting = Boolean(
      internalSummary.summaryA ||
      internalSummary.summaryB ||
      internalSummary.summaryC ||
      internalSummary.summaryD ||
      internalSummary.summaryE
    );

    if (hasExisting) {
      const confirmed = window.confirm(
        'Regenerating the summary will replace the existing A–E drafts with content based on the latest questionnaire answers.\n\nSection F will remain unchanged.\n\nProceed with regeneration?'
      );
      if (!confirmed) return;
    }

    generateInternalSummary();
    setJustGenerated(true);
    setTimeout(() => setJustGenerated(false), 4000);
  };

  const summarySections = [
    {
      id: 'summaryA',
      letter: 'A',
      title: 'Recommended website type and project summary',
      placeholder: 'Draft overview of business goals, client profile, and recommended solution architecture...',
      isManualOnly: false
    },
    {
      id: 'summaryB',
      letter: 'B',
      title: 'Agreed pages and key features',
      placeholder: 'Summary of selected pages, special sections, functional features, and content readiness...',
      isManualOnly: false
    },
    {
      id: 'summaryC',
      letter: 'C',
      title: 'Integrations and external services / recurring costs',
      placeholder: 'Summary of WhatsApp workflows, payment gateways, CRM connections, hosting, and recurring provider fees...',
      isManualOnly: false
    },
    {
      id: 'summaryD',
      letter: 'D',
      title: 'Items excluded from scope or planned later',
      placeholder: 'Explicitly identify out-of-scope requirements, unconfirmed integrations, or deferred phases...',
      isManualOnly: false
    },
    {
      id: 'summaryE',
      letter: 'E',
      title: 'Estimated delivery milestones',
      placeholder: 'Target launch deadlines, approval milestones, and phase sequence...',
      isManualOnly: false
    },
    {
      id: 'summaryF',
      letter: 'F',
      title: 'Quotation and payment milestones (confirm separately)',
      placeholder: 'Enter formal quote amount, deposit percentage, milestone releases, and currency...',
      isManualOnly: true,
      helperNote: 'Complete this section manually after confirming the quotation and payment terms with the client.'
    }
  ];

  return (
    <section className="internal-summary-panel" aria-labelledby="internal-summary-heading">
      <div className="section-intro-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="section-intro-badge">
          <span className="badge badge-navy">
            <FileText size={12} aria-hidden="true" />
            STUZEN INTERNAL GOVERNANCE
          </span>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
            Confidential Architecture Matrix
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
          <div>
            <h2 id="internal-summary-heading" className="section-intro-title">
              INTERNAL PROJECT SUMMARY
            </h2>
            <p className="section-intro-desc">
              Complete this summary after the client interview to prepare the project proposal and confirm the delivery scope. This section is intended for the Stuzen team, not as an additional client questionnaire section.
            </p>
          </div>

          {/* Action: Trigger Automated Draft Generation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAutoGenerate}
              aria-label="Auto-Generate Internal Summary from Answers"
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Auto-Generate Internal Summary from Answers</span>
            </button>

            {justGenerated && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--font-xs)',
                  fontWeight: 600
                }}
                role="status"
              >
                <CheckCircle2 size={14} />
                <span>Sections A–E compiled successfully. Section F preserved.</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 6 Summary Field Textareas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {summarySections.map((sec) => {
          const val = internalSummary[sec.id] || '';
          return (
            <div
              key={sec.id}
              className="question-card"
              style={
                sec.isManualOnly
                  ? { borderLeft: '4px solid #f59e0b', backgroundColor: '#fffdfa' }
                  : {}
              }
            >
              <div className="question-header">
                <span
                  className="question-num-tag"
                  style={
                    sec.isManualOnly
                      ? { backgroundColor: '#fef3c7', color: '#92400e' }
                      : {}
                  }
                >
                  SEC {sec.letter}
                </span>
                <div className="question-label-wrap">
                  <label htmlFor={`field-${sec.id}`} className="question-label">
                    {sec.letter}. {sec.title}
                  </label>
                  {sec.helperNote && (
                    <p
                      className="question-helptext"
                      style={{ color: '#b45309', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <AlertTriangle size={12} aria-hidden="true" />
                      <span>{sec.helperNote}</span>
                    </p>
                  )}
                </div>
              </div>

              <textarea
                id={`field-${sec.id}`}
                rows={sec.isManualOnly ? 4 : 6}
                value={val}
                onChange={(e) => updateInternalSummary(sec.id, e.target.value)}
                placeholder={sec.placeholder}
                className="input-control"
                style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.875rem', lineHeight: '1.55' }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InternalProjectSummary;

