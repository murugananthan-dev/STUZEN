import React from 'react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import BrandLogo from './BrandLogo';
import brandConfig from '../../config/brandConfig';

/**
 * Footer Component
 * Corporate dark-theme footer with brand mark, service pillars, and navigation shortcuts.
 */
export function Footer() {
  const { navigateTo, VIEWS } = useNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <BrandLogo
              variant="dark"
              width={160}
              alt={`${brandConfig.companyName} Logo`}
            />
            <div>
              <h3 className="footer-company-name">{brandConfig.companyName}</h3>
              <p className="footer-tagline">{brandConfig.tagline}</p>
            </div>
            <p className="footer-description">
              {brandConfig.description}
            </p>
          </div>

          {/* Core Service Pillars Column */}
          <div>
            <h4 className="footer-col-title">Core Service Pillars</h4>
            <div className="footer-pillars-text">
              <p style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Website Development | Custom Software | AI & Automation
              </p>
              <ul className="footer-links-list" style={{ marginTop: '0.75rem' }}>
                {brandConfig.servicePillars.map((pillar) => (
                  <li key={pillar.id} style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    • {pillar.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Navigation Shortcuts Column */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => navigateTo(VIEWS.AGENCY)}
                >
                  Agency Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => navigateTo(VIEWS.DISCOVERY)}
                >
                  Client Discovery Questionnaire
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => navigateTo(VIEWS.PRINT)}
                >
                  Formal Requirements Document (Print)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} {brandConfig.companyName}. All rights reserved.</p>
          <p>{brandConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

