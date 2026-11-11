import React from 'react';
import { Check, FolderCheck, FileText, PenTool, Cpu } from 'lucide-react';
import { SECTIONS } from '../../data/questionnaireSchema';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * DiscoverySectionNavigation Component
 * Complete 10-section sidebar roadmap plus review panels
 * (Materials Checklist, Internal Summary, Signatures, and Scope Estimator).
 */
export function DiscoverySectionNavigation({ activeSectionId, onSelectSection }) {
  const { completion, materials, internalSummary, signatures } = useDiscovery();

  const additionalPanels = [
    {
      id: 'materials',
      icon: FolderCheck,
      title: 'Materials Checklist',
      badge: materials?.received?.length > 0 ? `${materials.received.length} items` : null
    },
    {
      id: 'summary',
      icon: FileText,
      title: 'Internal Summary (A–F)',
      badge: internalSummary?.summaryA ? 'Drafted' : null
    },
    {
      id: 'signatures',
      icon: PenTool,
      title: 'Signatures & Record',
      badge: signatures?.client?.signature ? 'Signed' : null
    },
    {
      id: 'estimator',
      icon: Cpu,
      title: 'Live Scope Estimator',
      badge: 'Active'
    }
  ];

  return (
    <aside className="section-nav-sidebar" aria-label="Questionnaire Section Navigation">
      <div className="section-nav-heading">
        <span>Questionnaire Sections</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-brand-secondary)', fontWeight: 700 }}>
          10 of 10 Unlocked
        </span>
      </div>

      <nav>
        <ul className="section-nav-list">
          {SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            const progress = completion.sectionBreakdown?.[sec.id] || {
              answered: 0,
              total: sec.questionCount,
              percentage: 0
            };
            const isComplete = progress.answered === progress.total && progress.total > 0;

            return (
              <li key={sec.id}>
                <button
                  type="button"
                  className={`section-nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(sec.id)}
                  aria-current={isActive ? 'step' : undefined}
                  title={`${sec.number}. ${sec.title} (${progress.answered}/${progress.total} answered)`}
                >
                  <div className="section-nav-left">
                    <span className="section-nav-num">{sec.number}</span>
                    <span className="section-nav-title">{sec.title}</span>
                  </div>

                  {isComplete ? (
                    <span className="section-nav-badge complete" title="Section Complete">
                      <Check size={11} aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="section-nav-badge in-progress">
                      {progress.answered}/{progress.total}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Governance & Architecture Review Section */}
        <div
          className="section-nav-heading"
          style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)' }}
        >
          <span>Planning & Governance</span>
        </div>

        <ul className="section-nav-list">
          {additionalPanels.map((panel) => {
            const Icon = panel.icon;
            const isActive = activeSectionId === panel.id;
            return (
              <li key={panel.id}>
                <button
                  type="button"
                  className={`section-nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(panel.id)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className="section-nav-left">
                    <Icon size={14} color="var(--color-brand-secondary)" aria-hidden="true" />
                    <span className="section-nav-title">{panel.title}</span>
                  </div>

                  {panel.badge && (
                    <span
                      className="section-nav-badge in-progress"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {panel.badge}
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
