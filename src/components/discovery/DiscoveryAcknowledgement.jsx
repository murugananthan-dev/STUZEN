import React from 'react';
import { PenTool, Calendar, ShieldCheck, UserCheck } from 'lucide-react';
import { ACKNOWLEDGEMENT_TEXT } from '../../data/questionnaireSchema';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * DiscoveryAcknowledgement Component
 * Formal legal acknowledgement text and signature capture fields for Client & Stuzen representatives.
 */
export function DiscoveryAcknowledgement() {
  const { signatures, updateSignature } = useDiscovery();
  const clientSig = signatures?.client || { signature: '', date: '' };
  const stuzenSig = signatures?.stuzen || { signature: '', date: '' };

  return (
    <section className="acknowledgement-panel" aria-labelledby="ack-heading">
      <div className="section-intro-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="section-intro-badge">
          <span className="badge badge-navy">
            <ShieldCheck size={12} aria-hidden="true" />
            FORMAL RECORD
          </span>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
            Mutual Scoping Record
          </span>
        </div>
        <h2 id="ack-heading" className="section-intro-title">
          DISCOVERY ACKNOWLEDGEMENT & SIGNATURES
        </h2>
        <div
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderLeft: '4px solid var(--color-brand-secondary)',
            padding: 'var(--space-4) var(--space-5)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            marginTop: 'var(--space-3)'
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-sm)',
              color: 'var(--color-text-primary)',
              lineHeight: '1.6',
              margin: 0,
              fontStyle: 'italic'
            }}
          >
            "{ACKNOWLEDGEMENT_TEXT}"
          </p>
        </div>
      </div>

      {/* Signature Inputs Grid */}
      <div className="question-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
          {/* Client Representative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <UserCheck size={18} color="var(--color-brand-secondary)" aria-hidden="true" />
              <h3 style={{ fontSize: 'var(--font-base)', margin: 0, color: 'var(--color-brand-primary)' }}>
                Client / Authorized Representative
              </h3>
            </div>

            <div>
              <label htmlFor="sig-client-name" className="metadata-label">
                <PenTool size={13} aria-hidden="true" />
                <span>Signee Full Name / Acknowledgement</span>
              </label>
              <input
                id="sig-client-name"
                type="text"
                value={clientSig.signature || ''}
                onChange={(e) => updateSignature('client', 'signature', e.target.value)}
                placeholder="e.g., Marcus Vance, Operations Director"
                className="input-control"
              />
            </div>

            <div>
              <label htmlFor="sig-client-date" className="metadata-label">
                <Calendar size={13} aria-hidden="true" />
                <span>Date Signed</span>
              </label>
              <input
                id="sig-client-date"
                type="date"
                value={clientSig.date || ''}
                onChange={(e) => updateSignature('client', 'date', e.target.value)}
                className="input-control"
              />
            </div>
          </div>

          {/* Stuzen Representative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ShieldCheck size={18} color="var(--color-brand-secondary)" aria-hidden="true" />
              <h3 style={{ fontSize: 'var(--font-base)', margin: 0, color: 'var(--color-brand-primary)' }}>
                STUZEN TECHNOLOGIES Representative
              </h3>
            </div>

            <div>
              <label htmlFor="sig-stuzen-name" className="metadata-label">
                <PenTool size={13} aria-hidden="true" />
                <span>Lead Architect / Consultant Name</span>
              </label>
              <input
                id="sig-stuzen-name"
                type="text"
                value={stuzenSig.signature || ''}
                onChange={(e) => updateSignature('stuzen', 'signature', e.target.value)}
                placeholder="e.g., Murugan (Lead Solutions Architect)"
                className="input-control"
              />
            </div>

            <div>
              <label htmlFor="sig-stuzen-date" className="metadata-label">
                <Calendar size={13} aria-hidden="true" />
                <span>Date Recorded</span>
              </label>
              <input
                id="sig-stuzen-date"
                type="date"
                value={stuzenSig.date || ''}
                onChange={(e) => updateSignature('stuzen', 'date', e.target.value)}
                className="input-control"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoveryAcknowledgement;
