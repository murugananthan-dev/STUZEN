import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, Layers, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { SECTIONS, QUESTIONS } from '../data/questionnaireSchema';
import DiscoveryWizardHeader from '../components/discovery/DiscoveryWizardHeader';
import MeetingMetadataBar from '../components/discovery/MeetingMetadataBar';
import DiscoverySectionNavigation from '../components/discovery/DiscoverySectionNavigation';
import DiscoveryQuestionRenderer from '../components/discovery/DiscoveryQuestionRenderer';
import WizardNavigation from '../components/discovery/WizardNavigation';
import DiscoveryMaterialsChecklist from '../components/discovery/DiscoveryMaterialsChecklist';
import InternalProjectSummary from '../components/discovery/InternalProjectSummary';
import DiscoveryAcknowledgement from '../components/discovery/DiscoveryAcknowledgement';
import LiveScopeEstimator from '../components/discovery/LiveScopeEstimator';

// Complete linear step order across all questionnaire sections and review modules
const STEP_SEQUENCE = [
  'section_01',
  'section_02',
  'section_03',
  'section_04',
  'section_05',
  'section_06',
  'section_07',
  'section_08',
  'section_09',
  'section_10',
  'materials',
  'summary',
  'signatures',
  'estimator'
];

/**
 * DiscoveryWizardView (Phase 5)
 * Complete Interactive Discovery Wizard supporting:
 * - Meeting Metadata
 * - All 10 Questionnaire Sections (Q01 to Q45)
 * - Client Materials Checklist
 * - Internal Project Summary (A–F) with Auto-Generation
 * - Discovery Acknowledgement & Signatures
 * - Live Scope Complexity Estimator
 */
export function DiscoveryWizardView() {
  const { navigateTo, VIEWS } = useNavigation();
  const [activeStepId, setActiveStepId] = useState('section_01');
  const sectionContentRef = useRef(null);

  const activeIndex = STEP_SEQUENCE.indexOf(activeStepId);
  const isQuestionnaireSection = activeStepId.startsWith('section_');
  const currentSection = isQuestionnaireSection
    ? SECTIONS.find((s) => s.id === activeStepId) || SECTIONS[0]
    : null;

  const activeQuestions = isQuestionnaireSection
    ? QUESTIONS.filter((q) => q.sectionId === currentSection.id)
    : [];

  const scrollToContentTop = () => {
    if (sectionContentRef.current) {
      sectionContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectStep = (stepId) => {
    if (STEP_SEQUENCE.includes(stepId)) {
      setActiveStepId(stepId);
      scrollToContentTop();
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveStepId(STEP_SEQUENCE[activeIndex - 1]);
      scrollToContentTop();
    }
  };

  const handleNext = () => {
    if (activeIndex < STEP_SEQUENCE.length - 1) {
      setActiveStepId(STEP_SEQUENCE[activeIndex + 1]);
      scrollToContentTop();
    } else {
      // Completed last step (Scope Estimator) -> offer preview print view
      navigateTo(VIEWS.PRINT);
    }
  };

  // Determine dynamic button labels based on current step
  const getPrevLabel = () => {
    if (activeIndex === 0) return 'Previous Section';
    const prevId = STEP_SEQUENCE[activeIndex - 1];
    if (prevId.startsWith('section_')) {
      const sec = SECTIONS.find((s) => s.id === prevId);
      return `Back to Sec ${sec?.number || ''}`;
    }
    if (prevId === 'materials') return 'Back to Materials';
    if (prevId === 'summary') return 'Back to Summary';
    if (prevId === 'signatures') return 'Back to Signatures';
    return 'Previous';
  };

  const getNextLabel = () => {
    if (activeIndex === STEP_SEQUENCE.length - 1) {
      return 'Preview Formal Document';
    }
    const nextId = STEP_SEQUENCE[activeIndex + 1];
    if (nextId.startsWith('section_')) {
      const sec = SECTIONS.find((s) => s.id === nextId);
      return `Next: Sec ${sec?.number || ''}`;
    }
    if (nextId === 'materials') return 'Next: Materials Checklist';
    if (nextId === 'summary') return 'Next: Internal Summary (A–F)';
    if (nextId === 'signatures') return 'Next: Signatures & Record';
    if (nextId === 'estimator') return 'Next: Live Scope Estimator';
    return 'Next Section';
  };

  // Render active step content
  const renderActiveStepContent = () => {
    if (activeStepId === 'materials') {
      return <DiscoveryMaterialsChecklist />;
    }
    if (activeStepId === 'summary') {
      return <InternalProjectSummary />;
    }
    if (activeStepId === 'signatures') {
      return <DiscoveryAcknowledgement />;
    }
    if (activeStepId === 'estimator') {
      return <LiveScopeEstimator />;
    }

    // Default: Questionnaire Section (Sections 01 to 10)
    return (
      <>
        {/* Section Overview Header */}
        <header className="section-intro-card">
          <div className="section-intro-badge">
            <span className="badge badge-navy">
              <Layers size={12} aria-hidden="true" />
              SECTION {currentSection.number}
            </span>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
              {activeQuestions.length} Questions
            </span>
          </div>
          <h2 id="active-section-heading" className="section-intro-title">
            {currentSection.title}
          </h2>
          <p className="section-intro-desc">{currentSection.description}</p>
        </header>

        {/* Questions List for Current Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {activeQuestions.map((question) => (
            <DiscoveryQuestionRenderer key={question.id} question={question} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="discovery-wizard-container">
      <div className="container">
        {/* Top Utility Bar: Return to Agency & Preview Print Document */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)',
            flexWrap: 'wrap',
            gap: 'var(--space-3)'
          }}
        >
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigateTo(VIEWS.AGENCY)}
            style={{ paddingLeft: 0 }}
            aria-label="Return to Agency Home"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Agency Home</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo(VIEWS.PRINT)}
            aria-label="Preview Formal Print Document"
          >
            <FileText size={15} aria-hidden="true" />
            <span>Preview Formal Document</span>
          </button>
        </div>

        {/* 1. Discovery Wizard Header with Overall Completion */}
        <DiscoveryWizardHeader />

        {/* 2. Meeting Metadata Panel */}
        <MeetingMetadataBar />

        {/* 3. Main Wizard Layout: 10-Section Navigation Sidebar + Active Section Form */}
        <div className="wizard-main-layout" ref={sectionContentRef}>
          {/* Section Roadmap Navigation */}
          <DiscoverySectionNavigation
            activeSectionId={activeStepId}
            onSelectSection={handleSelectStep}
          />

          {/* Active Step Panel */}
          <main className="active-section-panel" aria-labelledby="active-section-heading">
            {renderActiveStepContent()}

            {/* Bottom Section Controls: Previous, Next, and Autosave Status */}
            <WizardNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              canPrevious={activeIndex > 0}
              canNext={true}
              prevLabel={getPrevLabel()}
              nextLabel={getNextLabel()}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryWizardView;
