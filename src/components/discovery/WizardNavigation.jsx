import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SaveStatusIndicator from './SaveStatusIndicator';

/**
 * WizardNavigation Component
 * Bottom controls for moving across all questionnaire sections and review panels.
 */
export function WizardNavigation({
  onPrevious,
  onNext,
  canPrevious = true,
  canNext = true,
  prevLabel = 'Previous Section',
  nextLabel = 'Next Section'
}) {
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
          disabled={!canPrevious}
          aria-label={prevLabel}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{prevLabel}</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canNext}
          aria-label={nextLabel}
        >
          <span>{nextLabel}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default WizardNavigation;
