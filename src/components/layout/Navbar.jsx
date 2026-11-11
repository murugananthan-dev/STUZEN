import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Compass, Printer, ArrowRight } from 'lucide-react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import BrandLogo from './BrandLogo';
import brandConfig from '../../config/brandConfig';

/**
 * Navbar Component
 * Responsive, accessible enterprise navigation header with mobile drawer.
 */
export function Navbar() {
  const { currentView, navigateTo, VIEWS } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleNavClick = (view) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: VIEWS.AGENCY,
      label: 'Home',
      icon: Home
    },
    {
      id: VIEWS.DISCOVERY,
      label: 'Discovery Form',
      icon: Compass
    },
    {
      id: VIEWS.PRINT,
      label: 'Print Document',
      icon: Printer
    }
  ];

  return (
    <header className="site-header" ref={navRef}>
      <div className="container">
        <div className="navbar-container">
          {/* Brand Logo & Title Link */}
          <button
            type="button"
            className="navbar-brand-link"
            onClick={() => handleNavClick(VIEWS.AGENCY)}
            aria-label={`${brandConfig.companyName} - Home`}
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <BrandLogo
              variant="light"
              width={150}
              alt={brandConfig.companyName}
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav-desktop" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="navbar-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleNavClick(VIEWS.DISCOVERY)}
              aria-label="Start Discovery Questionnaire"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="mobile-nav-panel"
          role="region"
          aria-label="Mobile Navigation"
        >
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
