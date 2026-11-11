import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import brandConfig from '../../config/brandConfig';

/**
 * FinalCTASection Component
 * High-contrast conversion section closing the landing page and directing
 * visitors to begin their project requirements discovery.
 */
export function FinalCTASection() {
  const { navigateTo, VIEWS } = useNavigation();

  return (
    <section id="contact-cta" className="agency-section final-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="final-cta-container">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(2, 132, 199, 0.2)',
                color: '#38bdf8',
                border: '1px solid rgba(2, 132, 199, 0.4)'
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              START YOUR JOURNEY
            </span>
          </div>

          <h2 id="cta-heading" className="final-cta-headline">
            Have a Digital Project in Mind?
          </h2>

          <p className="final-cta-description">
            Let's understand your business, explore your requirements and identify the right digital solution.
          </p>

          <div className="final-cta-button-wrap">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
              aria-label="Start Your Project Discovery interactive questionnaire"
              style={{
                backgroundColor: '#0284c7',
                borderColor: '#0284c7',
                boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.5)'
              }}
            >
              <span>Start Your Project Discovery</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="final-cta-tagline">
            <span>{brandConfig.tagline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
