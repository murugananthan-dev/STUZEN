import React from 'react';
import { Share2 } from 'lucide-react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import BrandLogo from './BrandLogo';
import brandConfig from '../../config/brandConfig';

/**
 * Footer Component
 * Stitch-approved enterprise footer layout with dark theme,
 * active section navigation, client gateway access, and security alignment badges.
 */
export function Footer() {
  const { currentView, navigateTo, openShareModal } = useNavigation();
  const currentYear = new Date().getFullYear();

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    if (currentView !== VIEWS.AGENCY) {
      navigateTo(VIEWS.AGENCY);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-primary-container text-surface-container-high border-t border-outline/20 relative overflow-hidden" role="contentinfo">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter py-10 md:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8 md:pb-10 border-b border-outline/20">
          {/* Brand Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-space-xs">
                <BrandLogo
                  variant="dark"
                  width={150}
                  alt={`${brandConfig.companyName} Logo`}
                />
                <span className="w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_#5bb8fe]"></span>
              </div>
              <p className="font-body-sm text-body-sm text-outline-variant max-w-sm">
                High-stakes digital engineering, enterprise conversational AI infrastructures, and resilient distributed architectures.
              </p>
            </div>

            <div className="pt-3">
              <div className="flex flex-wrap items-center gap-space-sm">
                <button
                  type="button"
                  onClick={openShareModal}
                  className="footer-share-badge-btn"
                  aria-label="Share STUZEN TECHNOLOGIES"
                >
                  <Share2 size={15} />
                  <span>Share STUZEN</span>
                </button>
                <div className="px-space-sm py-space-xs bg-inverse-surface border border-outline/30 rounded flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary-container">verified_user</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-bright">
                    Modern Security Standards
                  </span>
                </div>
                <div className="px-space-sm py-space-xs bg-inverse-surface border border-outline/30 rounded flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary-container">lock</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-bright">
                    Privacy-First Engineering
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <p className="font-label-md text-label-md uppercase tracking-wider text-surface-lowest font-medium">
              Capabilities
            </p>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-outline-variant">
              <li className="hover:text-surface-lowest transition-colors">
                <a
                  href="#services-ecosystem"
                  onClick={(e) => handleAnchorClick(e, 'services-ecosystem')}
                  className="hover:underline"
                >
                  Cloud Architectures
                </a>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <a
                  href="#ai-and-whatsapp"
                  onClick={(e) => handleAnchorClick(e, 'ai-and-whatsapp')}
                  className="hover:underline"
                >
                  Enterprise WhatsApp AI
                </a>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <a
                  href="#analytics"
                  onClick={(e) => handleAnchorClick(e, 'analytics')}
                  className="hover:underline"
                >
                  Telemetry &amp; Analytics
                </a>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <a
                  href="#architecture"
                  onClick={(e) => handleAnchorClick(e, 'architecture')}
                  className="hover:underline"
                >
                  Resilience Strategy
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <p className="font-label-md text-label-md uppercase tracking-wider text-surface-lowest font-medium">
              Company
            </p>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-outline-variant">
              <li className="hover:text-surface-lowest transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    navigateTo(VIEWS.AGENCY);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:underline text-outline-variant hover:text-surface-lowest"
                >
                  Overview &amp; Ethos
                </button>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <a
                  href="#showcase-gallery"
                  onClick={(e) => handleAnchorClick(e, 'showcase-gallery')}
                  className="hover:underline"
                >
                  Selected Works
                </a>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.DISCOVERY)}
                  className="text-left hover:underline text-outline-variant hover:text-surface-lowest"
                >
                  Discovery Questionnaire
                </button>
              </li>
              <li className="hover:text-surface-lowest transition-colors">
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.PRINT)}
                  className="text-left hover:underline text-outline-variant hover:text-surface-lowest"
                >
                  Formal Document (Print)
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Nodes Column */}
          <div className="lg:col-span-3 space-y-space-md">
            <p className="font-label-md text-label-md uppercase tracking-wider text-surface-lowest font-medium">
              Operational Nodes
            </p>
            <p className="font-body-sm text-body-sm text-outline-variant">
              Global distributed core. Direct encrypted inquiries via engineering gateways.
            </p>
            <div className="pt-space-xs">
              <button
                type="button"
                onClick={() => navigateTo(VIEWS.DISCOVERY)}
                className="inline-block px-space-md py-space-sm bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wide rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer"
              >
                Access Client Gateway
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-label-sm text-label-sm text-outline-variant text-center md:text-left">
            © {currentYear} {brandConfig.companyName}. All rights reserved. Sovereign digital operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-lg font-label-sm text-label-sm text-outline-variant">
            <button
              type="button"
              onClick={openShareModal}
              className="hover:text-surface-lowest text-secondary-container font-semibold transition-colors flex items-center gap-1.5"
              aria-label="Share STUZEN"
            >
              <Share2 size={13} />
              <span>Share STUZEN</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
              className="hover:text-surface-lowest transition-colors"
            >
              Start Discovery
            </button>
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.PRINT)}
              className="hover:text-surface-lowest transition-colors"
            >
              Requirements Spec
            </button>
            <a
              href="#architecture"
              onClick={(e) => handleAnchorClick(e, 'architecture')}
              className="hover:text-surface-lowest transition-colors"
            >
              Security Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
