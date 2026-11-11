/**
 * STUZEN TECHNOLOGIES - Centralized Brand Configuration
 * Single source of truth for company brand identity, logos, pillars, and metadata.
 */

export const brandConfig = {
  companyName: 'STUZEN TECHNOLOGIES',
  legalName: 'STUZEN TECHNOLOGIES LLC',
  shortName: 'STUZEN',
  tagline: 'Learn. Build. Innovate.',
  description:
    'STUZEN TECHNOLOGIES delivers high-impact digital engineering, custom software platforms, and intelligent AI automation systems designed for modern enterprise growth.',
  documentTitle: 'STUZEN TECHNOLOGIES | Learn. Build. Innovate.',
  officialDocumentHeading: 'STUZEN TECHNOLOGIES — CLIENT REQUIREMENTS DISCOVERY SPECIFICATION',
  
  servicePillars: [
    {
      id: 'website-development',
      title: 'Website Development',
      summary: 'High-performance corporate web platforms, web applications, and headless architectures with superior UX.',
      icon: 'Globe'
    },
    {
      id: 'custom-software',
      title: 'Custom Software',
      summary: 'Tailored enterprise software, API integrations, distributed microservices, and business-critical tooling.',
      icon: 'Code'
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      summary: 'Custom AI agents, intelligent workflow automation, data pipelines, and predictive algorithms.',
      icon: 'Cpu'
    }
  ],

  // Logo asset paths relative to public root
  logos: {
    // Standard full logos
    transparent: '/assets/logos/STUZEN_Logo_Transparent.png',
    white: '/assets/logos/STUZEN_Logo_White.png',
    black: '/assets/logos/STUZEN_Logo_Black.png',
    monochromeBlue: '/assets/logos/STUZEN_Logo_Monochrome_Blue.png',
    // Compact symbol/icon-only marks
    iconOnly: '/assets/logos/STUZEN_Icon_Only.png',
    iconWhite: '/assets/logos/STUZEN_Icon_White.png'
  },

  // Semantic variant mapping for context-aware display
  logoVariants: {
    lightHeader: '/assets/logos/STUZEN_Logo_Transparent.png',
    darkHeader: '/assets/logos/STUZEN_Logo_White.png',
    footer: '/assets/logos/STUZEN_Logo_White.png',
    formalPrint: '/assets/logos/STUZEN_Logo_Black.png',
    brandAccent: '/assets/logos/STUZEN_Logo_Monochrome_Blue.png',
    lightCompactIcon: '/assets/logos/STUZEN_Icon_Only.png',
    darkCompactIcon: '/assets/logos/STUZEN_Icon_White.png'
  },

  favicon: '/assets/logos/STUZEN_Icon_Only.png',

  contact: {
    email: 'contact@stuzen.tech',
    supportEmail: 'solutions@stuzen.tech',
    website: 'https://stuzen.tech'
  }
};

export default brandConfig;
