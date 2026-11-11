import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Monitor, Layers, Compass, Printer, ArrowRight } from 'lucide-react';
import { useNavigation, VIEWS } from '../../context/NavigationContext';
import BrandLogo from './BrandLogo';
import brandConfig from '../../config/brandConfig';

/**
 * Navbar Component
 * Responsive, accessible enterprise navigation header with mobile drawer,
 * integrated section scrolling, and view routing.
 */
export function Navbar() {
  const { currentView, navigateTo, VIEWS } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
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

  const handleNavAction = (item) => {
    setIsMobileMenuOpen(false);

    if (item.id === 'home') {
      setActiveSection('');
      if (currentView !== VIEWS.AGENCY) {
        navigateTo(VIEWS.AGENCY);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (item.sectionId) {
      setActiveSection(item.sectionId);
      if (currentView !== VIEWS.AGENCY) {
        navigateTo(VIEWS.AGENCY);
        setTimeout(() => {
          const el = document.getElementById(item.sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(item.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (item.view) {
      setActiveSection('');
      navigateTo(item.view);
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      view: VIEWS.AGENCY,
      icon: Home
    },
    {
      id: 'services',
      label: 'Services',
      sectionId: 'services',
      icon: Monitor
    },
    {
      id: 'process',
      label: 'Our Process',
      sectionId: 'how-we-work',
      icon: Layers
    },
    {
      id: 'discovery',
      label: 'Discovery Form',
      view: VIEWS.DISCOVERY,
      icon: Compass
    },
    {
      id: 'print',
      label: 'Print Document',
      view: VIEWS.PRINT,
      icon: Printer
    }
  ];

  const getIsActive = (item) => {
    if (item.view && currentView === item.view && !activeSection) {
      return true;
    }
    if (item.sectionId && currentView === VIEWS.AGENCY && activeSection === item.sectionId) {
      return true;
    }
    if (item.id === 'home' && currentView === VIEWS.AGENCY && !activeSection) {
      return true;
    }
    return false;
  };

  return (
    <header className="site-header" ref={navRef}>
      <div className="container">
        <div className="navbar-container">
          {/* Brand Logo & Title Link */}
          <button
            type="button"
            className="navbar-brand-link"
            onClick={() => handleNavAction({ id: 'home' })}
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
              const isActive = getIsActive(item);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavAction(item)}
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
              onClick={() => handleNavAction({ id: 'discovery', view: VIEWS.DISCOVERY })}
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
              const isActive = getIsActive(item);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavAction(item)}
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
