import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, Layers, Lock } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { SECTIONS, QUESTIONS } from '../data/questionnaireSchema';
import DiscoveryWizardHeader from '../components/discovery/DiscoveryWizardHeader';
import MeetingMetadataBar from '../components/discovery/MeetingMetadataBar';
import DiscoverySectionNavigation from '../components/discovery/DiscoverySectionNavigation';
import DiscoveryQuestionRenderer from '../components/discovery/DiscoveryQuestionRenderer';
import WizardNavigation from '../components/discovery/WizardNavigation';

/**
 * DiscoveryWizardView (Phase 4)
 * Interactive Discovery Wizard — Part 1.
 * Provides meeting metadata management and interactive forms for
 * Questionnaire Sections 01–05 (Q01 to Q25).
 * Previews upcoming Sections 06–10 for Phase 5.
 */
export function DiscoveryWizardView() {
  const { navigateTo, VIEWS } = useNavigation();
  const [activeSectionId, setActiveSectionId] = useState('section_01');
  const sectionContentRef = useRef(null);

  // Implemented sections in Phase 4: Sections 01 to 05 (indices 0 to 4)
  const implementedSections = SECTIONS.slice(0, 5);
  const activeSectionIndex = implementedSections.findIndex((s) => s.id === activeSectionId);
  const currentSection = implementedSections[activeSectionIndex] || implementedSections[0];

  // Questions for the current active section (Q1 to Q25)
  const activeQuestions = QUESTIONS.filter((q) => q.sectionId === currentSection.id);

  const scrollToContentTop = () => {
    if (sectionContentRef.current) {
      sectionContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectSection = (sectionId) => {
    const targetIdx = implementedSections.findIndex((s) => s.id === sectionId);
    if (targetIdx !== -1) {
      setActiveSectionId(sectionId);
      scrollToContentTop();
    }
  };

  const handlePreviousSection = () => {
    if (activeSectionIndex > 0) {
      const prevSection = implementedSections[activeSectionIndex - 1];
      setActiveSectionId(prevSection.id);
      scrollToContentTop();
    }
  };

  const handleNextSection = () => {
    if (activeSectionIndex < implementedSections.length - 1) {
      const nextSection = implementedSections[activeSectionIndex + 1];
      setActiveSectionId(nextSection.id);
      scrollToContentTop();
    }
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
            activeSectionId={activeSectionId}
            onSelectSection={handleSelectSection}
          />

          {/* Active Section Question Content */}
          <main className="active-section-panel" aria-labelledby="active-section-heading">
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

            {/* Bottom Section Controls: Previous, Next, and Autosave Status */}
            <WizardNavigation
              activeSectionIndex={activeSectionIndex}
              totalImplemented={implementedSections.length}
              onPrevious={handlePreviousSection}
              onNext={handleNextSection}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryWizardView;
