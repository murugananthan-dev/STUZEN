import React from 'react';
import { useDiscovery } from '../../context/DiscoveryContext';
import BrandLogo from '../layout/BrandLogo';
import brandConfig from '../../config/brandConfig';
import {
  SECTIONS,
  QUESTIONS,
  MATERIALS_ITEMS,
  INSTRUCTION_BANNER_TEXT,
  ACKNOWLEDGEMENT_TEXT,
  FOOTER_TEXT
} from '../../data/questionnaireSchema';

/**
 * FormalPrintDocument Component
 * Official black-and-white printable specification document.
 * Strictly formatted for A4 portrait printing and formal client handovers.
 * 
 * Features:
 * - Stuzen Technologies formal black logo & typography
 * - Meeting metadata block (Date, Mode, Representative)
 * - Required usage instruction banner
 * - All 10 discovery sections and all 45 questions
 * - Formatted checkbox glyphs [✓] / [ ] for options
 * - Client Materials Received checklist (9 items)
 * - Internal Project Summary (Sections A–F) labeled for internal planning
 * - Formal legal acknowledgement text & ink signature lines
 * - Official Stuzen Technologies footer
 */
export function FormalPrintDocument() {
  const {
    metadata = {},
    answers = {},
    materials = { received: [], otherText: '' },
    internalSummary = {},
    signatures = {}
  } = useDiscovery();

  // Helper to safely format answers
  const formatValue = (val) => {
    if (typeof val === 'string') return val.trim();
    if (Array.isArray(val)) return val.join(', ');
    return '';
  };

  // Group questions by section
  const questionsBySection = React.useMemo(() => {
    const map = {};
    SECTIONS.forEach((s) => {
      map[s.id] = [];
    });
    QUESTIONS.forEach((q) => {
      if (map[q.sectionId]) {
        map[q.sectionId].push(q);
      }
    });
    return map;
  }, []);

  return (
    <article className="formal-document-sheet" aria-label="Official Client Requirements Discovery Form">
      {/* 1. DOCUMENT HEADER */}
      <header className="print-doc-header print-avoid-break">
        <div className="print-header-top">
          <div className="print-header-brand">
            <BrandLogo
              variant="print"
              width={180}
              alt={`${brandConfig.companyName} Official Logo`}
              className="print-header-logo"
            />
            <p className="print-brand-tagline">{brandConfig.tagline}</p>
          </div>

          <div className="print-header-org">
            <div className="print-org-name">{brandConfig.companyName}</div>
            <div className="print-org-division">Enterprise Architecture & Software Division</div>
            <div className="print-org-doc-type">Official Discovery Specification</div>
          </div>
        </div>

        <div className="print-title-block">
          <h1 className="print-doc-title">
            WEBSITE PROJECT REQUIREMENTS DISCOVERY FORM — CLIENT INTERVIEW QUESTIONNAIRE
          </h1>
          <p className="print-doc-subtitle">
            Client Discovery Architecture & Technical Scope Specification
          </p>
        </div>

        {/* Meeting Metadata Table */}
        <table className="print-meta-table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: '22%' }}>Interview Date:</th>
              <td style={{ width: '28%' }}>{metadata.interviewDate || 'Not specified'}</td>
              <th scope="row" style={{ width: '22%' }}>Meeting Mode:</th>
              <td style={{ width: '28%' }}>{metadata.meetingMode || 'Not specified'}</td>
            </tr>
            <tr>
              <th scope="row">Stuzen Representative:</th>
              <td>{metadata.stuzenRepresentative || 'Not specified'}</td>
              <th scope="row">Classification:</th>
              <td>CLIENT SPECIFICATION / CONFIDENTIAL</td>
            </tr>
          </tbody>
        </table>

        {/* Mandatory Usage Instruction Banner */}
        <div className="print-instruction-banner">
          {INSTRUCTION_BANNER_TEXT}
        </div>
      </header>

      {/* 2. ALL 10 QUESTIONNAIRE SECTIONS & 45 QUESTIONS */}
      <div className="print-sections-body">
        {SECTIONS.map((section) => {
          const sectionQuestions = questionsBySection[section.id] || [];

          return (
            <section key={section.id} className="print-section-block">
              {/* Section Header */}
              <div className="print-section-header print-avoid-break">
                <span className="print-section-num">SECTION {section.number}</span>
                <span className="print-section-separator">—</span>
                <h2 className="print-section-title">{section.title}</h2>
              </div>
              <p className="print-section-desc">{section.description}</p>

              {/* Questions in Section */}
              <div className="print-questions-list">
                {sectionQuestions.map((q) => {
                  const val = answers[q.id];
                  const qNum = String(q.number).padStart(2, '0');

                  return (
                    <div key={q.id} className="print-question-block print-avoid-break">
                      <div className="print-question-header">
                        <span className="print-q-num">Q{qNum}.</span>
                        <span className="print-q-label">{q.label}</span>
                        {q.required && <span className="print-q-required" title="Required">*</span>}
                      </div>

                      {q.helpText && (
                        <p className="print-q-helptext">{q.helpText}</p>
                      )}

                      {/* Render question content based on type */}
                      <div className="print-q-answer-area">
                        {/* Type A: Contact subfields (Q4) */}
                        {q.type === 'contact' && (
                          <div className="print-contact-block">
                            <table className="print-sub-table">
                              <tbody>
                                <tr>
                                  <th style={{ width: '30%' }}>Phone / WhatsApp:</th>
                                  <td>{val?.phone || 'Not provided'}</td>
                                </tr>
                                <tr>
                                  <th>Email Address:</th>
                                  <td>{val?.email || 'Not provided'}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Type B: Multiple Choice Options with Checkboxes */}
                        {q.type === 'multiple' && (
                          <div className="print-options-grid">
                            {(q.options || []).map((opt) => {
                              const isOther = opt.startsWith('Other:');
                              const selectedList = Array.isArray(val) ? val : [];
                              const isSelected = selectedList.includes(opt);
                              const otherVal = q.otherKey ? answers[q.otherKey] : '';

                              return (
                                <div key={opt} className={`print-checkbox-item ${isSelected ? 'is-selected' : ''}`}>
                                  <span className="print-checkbox-glyph" aria-hidden="true">
                                    {isSelected ? '[✓]' : '[  ]'}
                                  </span>
                                  <span className="print-checkbox-label">
                                    {isOther ? (
                                      <>
                                        Other: <span className="print-underline-text">{otherVal || '________________________'}</span>
                                      </>
                                    ) : (
                                      opt
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Type C: Single Choice Options */}
                        {q.type === 'single' && (
                          <div className="print-single-options">
                            <div className="print-options-grid">
                              {(q.options || []).map((opt) => {
                                const isSelected = val === opt;
                                return (
                                  <div key={opt} className={`print-checkbox-item ${isSelected ? 'is-selected' : ''}`}>
                                    <span className="print-checkbox-glyph" aria-hidden="true">
                                      {isSelected ? '[✓]' : '[  ]'}
                                    </span>
                                    <span className="print-checkbox-label">{opt}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Conditional detail field if triggered */}
                            {q.conditionalField && val === q.conditionalField.triggerValue && (
                              <div className="print-conditional-response">
                                <strong>{q.conditionalField.label}</strong>{' '}
                                <span className="print-conditional-val">
                                  {answers[q.conditionalField.key] || 'Not specified'}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Type D: Text & Date Inputs */}
                        {(q.type === 'text' || q.type === 'date') && (
                          <div className="print-text-answer">
                            {formatValue(val) ? (
                              <div className="print-answer-filled">{formatValue(val)}</div>
                            ) : (
                              <div className="print-answer-empty">Not provided</div>
                            )}
                          </div>
                        )}

                        {/* Type E: Textarea Multiline Inputs */}
                        {q.type === 'textarea' && (
                          <div className="print-textarea-answer">
                            {formatValue(val) ? (
                              <div className="print-answer-multiline">{formatValue(val)}</div>
                            ) : (
                              <div className="print-answer-empty">Not provided</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. CLIENT MATERIALS RECEIVED CHECKLIST */}
      <section className="print-materials-section print-avoid-break">
        <div className="print-section-header">
          <span className="print-section-num">APPENDIX A</span>
          <span className="print-section-separator">—</span>
          <h2 className="print-section-title">CLIENT MATERIALS RECEIVED CHECKLIST</h2>
        </div>
        <p className="print-section-desc">
          Inventory of brand assets, textual content, media and access credentials delivered by the client.
        </p>

        <table className="print-materials-table">
          <thead>
            <tr>
              <th style={{ width: '12%', textAlign: 'center' }}>Received</th>
              <th style={{ width: '48%' }}>Material Description</th>
              <th style={{ width: '40%' }}>Details / Notes</th>
            </tr>
          </thead>
          <tbody>
            {MATERIALS_ITEMS.map((item) => {
              const isReceived = (materials?.received || []).includes(item.id);
              const isOther = item.id === 'other';

              return (
                <tr key={item.id} className={isReceived ? 'is-received' : ''}>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <span className="print-checkbox-glyph">
                      {isReceived ? '[✓]' : '[  ]'}
                    </span>
                  </td>
                  <td>
                    {isOther ? (
                      <>
                        Other:{' '}
                        <span className="print-underline-text">
                          {materials?.otherText || '____________________'}
                        </span>
                      </>
                    ) : (
                      item.label
                    )}
                  </td>
                  <td>
                    {isReceived ? 'Received during discovery' : 'Pending from client'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* 4. INTERNAL PROJECT SUMMARY (A–F) */}
      <section className="print-summary-section print-avoid-break">
        <div className="print-section-header">
          <span className="print-section-num">APPENDIX B</span>
          <span className="print-section-separator">—</span>
          <h2 className="print-section-title">INTERNAL — FOR STUZEN PROJECT PLANNING</h2>
        </div>
        <div className="print-confidential-notice">
          <strong>CONFIDENTIAL NOTICE:</strong> This internal planning summary is prepared exclusively for Stuzen Technologies engineering, architecture, and project management. Section F commercial terms and quotation details are strictly manual.
        </div>

        <div className="print-summary-grid">
          {/* Summary A */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">A. Recommended Website Type & Project Summary</h3>
            <div className="print-summary-content">
              {internalSummary?.summaryA || 'Not generated yet. Run internal summary generator or enter planning notes.'}
            </div>
          </div>

          {/* Summary B */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">B. Agreed Pages & Key Features</h3>
            <div className="print-summary-content">
              {internalSummary?.summaryB || 'Not generated yet. Run internal summary generator or enter planning notes.'}
            </div>
          </div>

          {/* Summary C */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">C. Integrations & External Services / Recurring Costs</h3>
            <div className="print-summary-content">
              {internalSummary?.summaryC || 'Not generated yet. Run internal summary generator or enter planning notes.'}
            </div>
          </div>

          {/* Summary D */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">D. Items Excluded from Scope or Planned Later</h3>
            <div className="print-summary-content">
              {internalSummary?.summaryD || 'Not generated yet. Run internal summary generator or enter planning notes.'}
            </div>
          </div>

          {/* Summary E */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">E. Estimated Delivery Milestones</h3>
            <div className="print-summary-content">
              {internalSummary?.summaryE || 'Not generated yet. Run internal summary generator or enter planning notes.'}
            </div>
          </div>

          {/* Summary F (Strictly Manual) */}
          <div className="print-summary-item print-avoid-break">
            <h3 className="print-summary-heading">F. Tentative Price / Quotation Range & Payment Milestones (Manual)</h3>
            <div className="print-summary-content print-summary-manual">
              {internalSummary?.summaryF ? (
                internalSummary.summaryF
              ) : (
                <div className="print-manual-placeholder">
                  <em>[Internal Manual Entry: Confidential quotation figures, payment milestones, and commercial clauses are recorded directly by Stuzen Technologies management and are omitted from client-facing exports.]</em>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEGAL ACKNOWLEDGEMENT & PHYSICAL SIGNATURES */}
      <section className="print-signatures-section print-avoid-break">
        {/* Exact Legal Acknowledgement Text */}
        <div className="print-acknowledgement-box">
          <p className="print-acknowledgement-text">
            <strong>ACKNOWLEDGEMENT & SCOPE RECORD:</strong> {ACKNOWLEDGEMENT_TEXT}
          </p>
        </div>

        {/* Two-Column Physical Signature Block */}
        <div className="print-signature-grid">
          {/* Client Sign-off */}
          <div className="print-signature-card">
            <div className="print-sign-role">CLIENT AUTHORIZED REPRESENTATIVE</div>
            <div className="print-sign-canvas-area">
              {signatures?.client?.signature ? (
                <div className="print-captured-sign">{signatures.client.signature}</div>
              ) : (
                <div className="print-sign-empty-space" />
              )}
            </div>
            <div className="print-sign-line" />
            <div className="print-sign-details">
              <div>Authorized Client Signature</div>
              <div className="print-sign-date-row">
                <span>Date:</span>
                <span className="print-sign-date-val">
                  {signatures?.client?.date || '________________________'}
                </span>
              </div>
            </div>
          </div>

          {/* Stuzen Technologies Sign-off */}
          <div className="print-signature-card">
            <div className="print-sign-role">STUZEN TECHNOLOGIES REPRESENTATIVE</div>
            <div className="print-sign-canvas-area">
              {signatures?.stuzen?.signature ? (
                <div className="print-captured-sign">{signatures.stuzen.signature}</div>
              ) : (
                <div className="print-sign-empty-space" />
              )}
            </div>
            <div className="print-sign-line" />
            <div className="print-sign-details">
              <div>
                Representative: <strong>{metadata?.stuzenRepresentative || 'Lead Solutions Architect'}</strong>
              </div>
              <div className="print-sign-date-row">
                <span>Date:</span>
                <span className="print-sign-date-val">
                  {signatures?.stuzen?.date || metadata?.interviewDate || '________________________'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFFICIAL FOOTER */}
      <footer className="print-doc-footer print-avoid-break">
        <p className="print-footer-text">{FOOTER_TEXT}</p>
        <div className="print-footer-sub">
          <span>Official Discovery Document • Version 1.0.0</span>
          <span>•</span>
          <span>Confidential & Proprietary</span>
        </div>
      </footer>
    </article>
  );
}

export default FormalPrintDocument;
