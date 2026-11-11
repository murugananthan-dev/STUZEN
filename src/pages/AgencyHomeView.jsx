import React from 'react';
import HeroSection from '../components/agency/HeroSection';
import ServicesSection from '../components/agency/ServicesSection';
import DiscoveryRoadmap from '../components/agency/DiscoveryRoadmap';
import ProcessSection from '../components/agency/ProcessSection';
import WhyStuzenSection from '../components/agency/WhyStuzenSection';
import FinalCTASection from '../components/agency/FinalCTASection';

/**
 * AgencyHomeView (Phase 2)
 * Complete, conversion-focused corporate landing page for STUZEN TECHNOLOGIES.
 * Introduces the agency, showcases 3 core service pillars, explains the 10-stage
 * discovery methodology, highlights delivery philosophy, and directs visitors to
 * the interactive discovery questionnaire.
 */
export function AgencyHomeView() {
  return (
    <div className="agency-home-view">
      {/* 1. First-Screen Hero Section */}
      <HeroSection />

      {/* 2. Three Core Service Pillars */}
      <ServicesSection />

      {/* 3. 10-Stage Project Discovery Roadmap */}
      <DiscoveryRoadmap />

      {/* 4. How We Work (4-Step Delivery Lifecycle) */}
      <ProcessSection />

      {/* 5. Why Choose STUZEN TECHNOLOGIES Value Propositions */}
      <WhyStuzenSection />

      {/* 6. High-Contrast Final Call To Action */}
      <FinalCTASection />
    </div>
  );
}

export default AgencyHomeView;
