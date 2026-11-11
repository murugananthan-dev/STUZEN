import React from 'react';
import { Compass, Sparkles, RefreshCw, Printer } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';
import { useNavigation } from '../../context/NavigationContext';

/**
 * DiscoveryWizardHeader Component
 * Client Project Discovery title, subtitle, overall progress bar,
 * demo data loader, and reset actions.
 */
export function DiscoveryWizardHeader() {
  const { completion, loadDemoData, resetDiscovery } = useDiscovery();
  const { navigateTo, VIEWS } = useNavigation();

  const handleLoadDemo = () => {
    const confirmed = window.confirm(
      'Load sample client data (GreenLeaf Organics)?\n\nThis will populate all 10 sections with realistic sample answers for demonstration and testing purposes.'
    );
    if (confirmed) {
      loadDemoData();
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset all questionnaire answers and metadata?\n\nThis will clear current progress and return to a blank form.'
    );
    if (confirmed) {
      resetDiscovery();
    }
  };

  return (
    <header className="discovery-header">
      <div className="discovery-header-top">
        <div className="discovery-header-info">
          <div className="discovery-header-kicker">
            <span className="badge badge-brand">
              <Compass size={13} aria-hidden="true" />
              Requirements Engineering Framework
            </span>
          </div>

          <h1 className="discovery-header-title">CLIENT PROJECT DISCOVERY</h1>

          <p className="discovery-header-subtitle">
            Let's understand your business, goals and requirements before planning your digital solution.
          </p>
        </div>

        {/* Global Actions */}
        <div className="discovery-header-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleLoadDemo}
            aria-label="Load Sample Client Data"
            title="Populate questionnaire with GreenLeaf Organics sample data"
          >
            <Sparkles size={14} color="var(--color-brand-secondary)" aria-hidden="true" />
            <span>Load Sample Client Data</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo(VIEWS.PRINT)}
            aria-label="View Formal Printable Document"
            title="Switch to formal black-and-white printable document"
          >
            <Printer size={14} aria-hidden="true" />
            <span>Formal Document</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleReset}
            aria-label="Reset Questionnaire to Blank Form"
            title="Clear all entered data"
          >
            <RefreshCw size={13} aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Box */}
      <div className="discovery-progress-box" aria-label="Questionnaire Completion Progress">
        <div className="discovery-progress-meta">
          <span>Overall Questionnaire Progress</span>
          <span className="discovery-progress-counts">
            {completion.answered} / {completion.total} questions completed ({completion.percentage}%)
          </span>
        </div>
        <div className="discovery-progress-bar-track">
          <div
            className="discovery-progress-bar-fill"
            style={{ width: `${completion.percentage}%` }}
            role="progressbar"
            aria-valuenow={completion.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </header>
  );
}

export default DiscoveryWizardHeader;

