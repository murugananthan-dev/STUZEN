import React from 'react';
import { Check, Lock } from 'lucide-react';
import { SECTIONS } from '../../data/questionnaireSchema';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * DiscoverySectionNavigation Component
 * Sidebar navigation displaying all 10 discovery sections with completion status.
 * Sections 01–05 are active and functional; Sections 06–10 are flagged as upcoming (Phase 5).
 */
export function DiscoverySectionNavigation({ activeSectionId, onSelectSection }) {
  const { completion } = useDiscovery();

  return (
    <aside className="section-nav-sidebar" aria-label="Questionnaire Section Navigation">
      <div className="section-nav-heading">
        <span>Questionnaire Roadmap</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-brand-secondary)' }}>
          Part 1: Sec 01–05
        </span>
      </div>

      <nav>
        <ul className="section-nav-list">
          {SECTIONS.map((sec, idx) => {
            const isImplemented = idx < 5; // Sections 01 to 05 (indices 0 to 4)
            const isActive = activeSectionId === sec.id;
            const progress = completion.sectionBreakdown?.[sec.id] || { answered: 0, total: sec.questionCount, percentage: 0 };
            const isComplete = progress.answered === progress.total && progress.total > 0;

            return (
              <li key={sec.id}>
                <button
                  type="button"
                  className={`section-nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => isImplemented && onSelectSection(sec.id)}
                  disabled={!isImplemented}
                  aria-current={isActive ? 'step' : undefined}
                  title={
                    isImplemented
                      ? `${sec.number}. ${sec.title} (${progress.answered}/${progress.total} answered)`
                      : `${sec.title} — Scheduled for Phase 5`
                  }
                >
                  <div className="section-nav-left">
                    <span className="section-nav-num">{sec.number}</span>
                    <span className="section-nav-title">{sec.title}</span>
                  </div>

                  {isImplemented ? (
                    isComplete ? (
                      <span className="section-nav-badge complete" title="Section Complete">
                        <Check size={11} aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="section-nav-badge in-progress">
                        {progress.answered}/{progress.total}
                      </span>
                    )
                  ) : (
                    <span className="section-nav-badge upcoming" title="Upcoming in Phase 5">
                      <Lock size={10} style={{ marginRight: '2px' }} aria-hidden="true" />
                      Phase 5
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default DiscoverySectionNavigation;
