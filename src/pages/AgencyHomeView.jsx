import React from 'react';
import HeroSection from '../components/agency/HeroSection';
import ServicesEcosystemSection from '../components/agency/ServicesEcosystemSection';
import ShowcaseGallerySection from '../components/agency/ShowcaseGallerySection';
import AnalyticsDashboardSection from '../components/agency/AnalyticsDashboardSection';
import AiWhatsAppSection from '../components/agency/AiWhatsAppSection';
import ArchitectureSection from '../components/agency/ArchitectureSection';
import FinalCTASection from '../components/agency/FinalCTASection';

/**
 * AgencyHomeView
 * STUZEN TECHNOLOGIES corporate agency landing page.
 * Implements the approved Stitch design specifications across 7 core sections:
 * 1. Cinematic Hero Section (#hero)
 * 2. Signature Interactive Service Ecosystem (#services-ecosystem)
 * 3. Product Showcase Gallery (#showcase-gallery)
 * 4. Visual Analytics & Live Telemetry Dashboard (#analytics)
 * 5. Enterprise WhatsApp & AI Workflow Pipeline (#ai-and-whatsapp)
 * 6. Battle-Tested Engineering & Technology Architecture (#architecture)
 * 7. Memorable High-Contrast Closing Final CTA (#conversation-cta)
 */
export function AgencyHomeView() {
  return (
    <div className="agency-home-view">
      {/* SECTION 1: CINEMATIC HERO SECTION */}
      <HeroSection />

      {/* SECTION 2: SIGNATURE INTERACTIVE SERVICE ECOSYSTEM */}
      <ServicesEcosystemSection />

      {/* SECTION 3: PRODUCT SHOWCASE GALLERY (REALISTIC INTERFACES) */}
      <ShowcaseGallerySection />

      {/* SECTION 4: VISUAL ANALYTICS AND GRAPHS DASHBOARD PREVIEW */}
      <AnalyticsDashboardSection />

      {/* SECTION 5: AI & WHATSAPP AUTOMATION SHOWCASE */}
      <AiWhatsAppSection />

      {/* SECTION 6: ENGINEERING & TECHNOLOGY ARCHITECTURE VISUAL STORY */}
      <ArchitectureSection />

      {/* SECTION 7: MEMORABLE COLOURFUL CLOSING FINAL CTA */}
      <FinalCTASection />
    </div>
  );
}

export default AgencyHomeView;
