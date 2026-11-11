import React from 'react';
import { Check, FolderCheck, FileText } from 'lucide-react';
import { MATERIALS_ITEMS } from '../../data/questionnaireSchema';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * DiscoveryMaterialsChecklist Component
 * Tracks physical/digital documents, media, and credentials received from client.
 */
export function DiscoveryMaterialsChecklist() {
  const { materials, toggleMaterial, updateMaterialOther } = useDiscovery();
  const receivedList = materials?.received || [];
  const isOtherSelected = receivedList.includes('other');

  return (
    <section className="materials-panel" aria-labelledby="materials-heading">
      <div className="section-intro-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="section-intro-badge">
          <span className="badge badge-navy">
            <FolderCheck size={12} aria-hidden="true" />
            DISCOVERY CHECKLIST
          </span>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-brand-secondary)', fontWeight: 600 }}>
            {receivedList.length} of {MATERIALS_ITEMS.length} Categories Received
          </span>
        </div>
        <h2 id="materials-heading" className="section-intro-title">
          CLIENT MATERIALS RECEIVED
        </h2>
        <p className="section-intro-desc">
          Record the documents, brand assets and information received from the client during the discovery process.
        </p>
      </div>

      <div className="question-card">
        <div className="choice-grid two-cols" role="group" aria-label="Client Materials Received Options">
          {MATERIALS_ITEMS.map((item) => {
            const isSelected = receivedList.includes(item.id);
            return (
              <div
                key={item.id}
                className={`choice-item-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleMaterial(item.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleMaterial(item.id);
                  }
                }}
              >
                <div className="choice-custom-box" aria-hidden="true">
                  {isSelected && <Check size={13} strokeWidth={2.5} />}
                </div>
                <span className="choice-item-label">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Conditional Text for "Other: ___" */}
        {isOtherSelected && (
          <div className="conditional-field-wrapper">
            <label htmlFor="material-other-input" className="conditional-field-label">
              Please specify other materials received:
            </label>
            <input
              id="material-other-input"
              type="text"
              value={materials.otherText || ''}
              onChange={(e) => updateMaterialOther(e.target.value)}
              placeholder="e.g., API sandbox keys, typography licenses, trademark certificates"
              className="input-control"
              autoFocus
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default DiscoveryMaterialsChecklist;

