import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, Globe, Code2, Cpu } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import BrandLogo from '../layout/BrandLogo';
import brandConfig from '../../config/brandConfig';

/**
 * HeroSection Component
 * Conversion-focused first screen establishing brand presence, value proposition,
 * and entry points into discovery and services.
 */
export function HeroSection() {
  const { navigateTo, VIEWS } = useNavigation();

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-wrapper" aria-labelledby="hero-main-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Core Value Proposition & Conversion CTAs */}
          <div className="hero-content">
            <div className="hero-eyebrow hero-anim-eyebrow">
              <span className="badge badge-brand">
                <Sparkles size={13} aria-hidden="true" />
                DIGITAL SOLUTIONS FOR AMBITIOUS BUSINESSES
              </span>
            </div>

            <h1 id="hero-main-heading" className="hero-headline hero-anim-headline">
              Build Your Digital Future With <span className="highlight">Stuzen Technologies.</span>
            </h1>

            <p className="hero-paragraph hero-anim-para">
              From professional websites and custom software to intelligent AI-powered automation, we help businesses turn ideas into practical digital solutions.
            </p>

            <div className="hero-tagline-badge hero-anim-tagline">
              <span>{brandConfig.tagline}</span>
            </div>

            <div className="hero-actions hero-anim-cta">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigateTo(VIEWS.DISCOVERY)}
                aria-label="Start Your Project Discovery questionnaire"
              >
                <span>Start Your Project Discovery</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleScrollToServices}
                aria-label="Explore our digital services"
              >
                <span>Explore Our Services</span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Technology Architecture Visual */}
          <div className="hero-visual hero-anim-visual" aria-hidden="true">
            <div className="hero-visual-card">
              <div className="hero-visual-header">
                <div className="hero-visual-dots">
                  <div className="hero-visual-dot red" />
                  <div className="hero-visual-dot yellow" />
                  <div className="hero-visual-dot green" />
                </div>
                <div className="hero-visual-status">
                  <span className="hero-visual-status-dot" />
                  <span>Stuzen Solution Engine Active</span>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <BrandLogo variant="light" width={130} alt="" />
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-subtle)', borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-3)' }}>
                  Enterprise Delivery Framework
                </span>
              </div>

              <div className="hero-visual-pillars">
                <div className="hero-visual-pillar-item">
                  <div className="hero-visual-pillar-left">
                    <div className="hero-visual-pillar-icon">
                      <Globe size={18} />
                    </div>
                    <div>
                      <div className="hero-visual-pillar-name">Website Development</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Corporate & Web Platforms</div>
                    </div>
                  </div>
                  <span className="hero-visual-pillar-tag">Pillar 01</span>
                </div>

                <div className="hero-visual-pillar-item">
                  <div className="hero-visual-pillar-left">
                    <div className="hero-visual-pillar-icon">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <div className="hero-visual-pillar-name">Custom Software</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tailored Business Applications</div>
                    </div>
                  </div>
                  <span className="hero-visual-pillar-tag">Pillar 02</span>
                </div>

                <div className="hero-visual-pillar-item">
                  <div className="hero-visual-pillar-left">
                    <div className="hero-visual-pillar-icon">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <div className="hero-visual-pillar-name">AI & Automation</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Intelligent Workflows & Chat</div>
                    </div>
                  </div>
                  <span className="hero-visual-pillar-tag">Pillar 03</span>
                </div>
              </div>

              <div className="hero-visual-footer-note">
                <span>Direct Client Requirements Scoping</span>
                <strong style={{ color: 'var(--color-brand-secondary)', fontWeight: 600 }}>10-Stage Discovery Ready</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

