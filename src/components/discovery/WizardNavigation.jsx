import React from 'react';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import SaveStatusIndicator from './SaveStatusIndicator';

/**
 * WizardNavigation Component
 * Bottom controls for moving between implemented sections (01 to 05),
 * showing autosave status, and indicating upcoming Phase 5 boundary.
 */
export function WizardNavigation({
  activeSectionIndex,
  totalImplemented = 5,
  onPrevious,
  onNext
}) {
  const isFirst = activeSectionIndex === 0;
  const isLastImplemented = activeSectionIndex === totalImplemented - 1;

  return (
    <div className="wizard-footer-bar">
      {/* Real-time persistence status */}
      <SaveStatusIndicator />

      {/* Navigation Buttons */}
      <div className="wizard-footer-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrevious}
          disabled={isFirst}
          aria-label="Navigate to previous section"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Previous Section</span>
        </button>

        {isLastImplemented ? (
          <button
            type="button"
            className="btn btn-secondary"
            disabled
            title="Sections 06–10 will be available in Phase 5"
            style={{ opacity: 0.7 }}
          >
            <Lock size={14} aria-hidden="true" />
            <span>Sections 06–10 (Phase 5)</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
            aria-label="Navigate to next section"
          >
            <span>Next Section</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default WizardNavigation;
