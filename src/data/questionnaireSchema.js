/**
 * STUZEN TECHNOLOGIES - Questionnaire Data Schema & Engine (Phase 3)
 * Complete specification of all 10 questionnaire sections, 45 questions,
 * meeting metadata, materials checklist, internal summary, and demo data.
 */

export const SCHEMA_VERSION = '1.0.0';
export const STORAGE_KEY = 'stuzen_discovery_v1';

// Exact Legal & Formal Brand Copy Constants
export const ACKNOWLEDGEMENT_TEXT =
  'This form records the initial requirements discussed. It is not a final contract or fixed quotation. Final deliverables, revisions, payment terms, delivery dates, third-party fees, hosting, licences, support and exclusions must be documented and approved separately.';

export const FOOTER_TEXT =
  'STUZEN TECHNOLOGIES • Learn. Build. Innovate. Thank you for considering Stuzen Technologies for your digital project.';

// Meeting Metadata Definitions
export const METADATA_FIELDS = [
  {
    id: 'interviewDate',
    label: 'Interview Date',
    type: 'date',
    placeholder: 'YYYY-MM-DD',
    required: true
  },
  {
    id: 'meetingMode',
    label: 'Meeting Mode',
    type: 'single',
    options: ['In person', 'Phone', 'Video call'],
    required: true
  },
  {
    id: 'stuzenRepresentative',
    label: 'Stuzen Representative',
    type: 'text',
    placeholder: 'Lead Consultant / Architect name',
    required: true
  }
];

// Client Materials Received Checklist Items
export const MATERIALS_ITEMS = [
  { id: 'logo', label: 'Logo' },
  { id: 'brandGuidelines', label: 'Brand guidelines' },
  { id: 'textContent', label: 'Text / content' },
  { id: 'media', label: 'Images / videos' },
  { id: 'catalogue', label: 'Product catalogue' },
  { id: 'existingSite', label: 'Existing website details' },
  { id: 'domainHosting', label: 'Domain / hosting details' },
  { id: 'referenceSites', label: 'Reference websites' },
  { id: 'other', label: 'Other: ___', hasOther: true }
];

// 10 Questionnaire Sections
export const SECTIONS = [
  {
    id: 'section_01',
    number: '01',
    title: 'CLIENT & BUSINESS DETAILS',
    description: 'Understand the company, contact person, industry and decision-makers.',
    questionCount: 7
  },
  {
    id: 'section_02',
    number: '02',
    title: 'PROJECT GOALS & AUDIENCE',
    description: 'Identify business objectives, target customers and expected outcomes.',
    questionCount: 4
  },
  {
    id: 'section_03',
    number: '03',
    title: 'WEBSITE TYPE & PAGE STRUCTURE',
    description: 'Determine the required website type, pages, content and structure.',
    questionCount: 5
  },
  {
    id: 'section_04',
    number: '04',
    title: 'DESIGN & BRAND DIRECTION',
    description: 'Understand visual preferences, branding and design references.',
    questionCount: 5
  },
  {
    id: 'section_05',
    number: '05',
    title: 'FEATURES & FUNCTIONALITY',
    description: 'Identify the website features, workflows and required capabilities.',
    questionCount: 4
  },
  {
    id: 'section_06',
    number: '06',
    title: 'WHATSAPP, INTEGRATIONS & AUTOMATION',
    description: 'Discover communication workflows, business integrations and automation requirements.',
    questionCount: 4
  },
  {
    id: 'section_07',
    number: '07',
    title: 'TECHNICAL & OPERATIONAL REQUIREMENTS',
    description: 'Review domain, hosting, email, migration and security requirements.',
    questionCount: 5
  },
  {
    id: 'section_08',
    number: '08',
    title: 'SEO, ANALYTICS & MARKETING',
    description: 'Identify search visibility, analytics and marketing requirements.',
    questionCount: 4
  },
  {
    id: 'section_09',
    number: '09',
    title: 'TIMELINE, BUDGET & SUPPORT',
    description: 'Discuss delivery expectations, budget and post-launch support.',
    questionCount: 5
  },
  {
    id: 'section_10',
    number: '10',
    title: 'FINAL NOTES & PROJECT SCOPE',
    description: 'Confirm priorities, outstanding requirements and project expectations.',
    questionCount: 2
  }
];

// All 45 Questions Defined in Exact Sequence
export const QUESTIONS = [
  // SECTION 01 — CLIENT & BUSINESS DETAILS (Q1 - Q7)
  {
    id: 'q1_client_name',
    number: 1,
    sectionId: 'section_01',
    label: 'Client / contact person name.',
    type: 'text',
    placeholder: 'e.g., Sarah Jenkins, Marcus Vance',
    required: true
  },
  {
    id: 'q2_business_name',
    number: 2,
    sectionId: 'section_01',
    label: 'Business / brand name.',
    type: 'text',
    placeholder: 'e.g., GreenLeaf Organics',
    required: true
  },
  {
    id: 'q3_industry_category',
    number: 3,
    sectionId: 'section_01',
    label: 'Industry / business category.',
    type: 'text',
    placeholder: 'e.g., Organic Foods, Healthcare, Legal Services, Fintech'
  },
  {
    id: 'q4_contact_details',
    number: 4,
    sectionId: 'section_01',
    label: 'Phone / WhatsApp number and email.',
    type: 'contact',
    subfields: [
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+1 (555) 000-0000' },
      { key: 'email', label: 'Email address', type: 'email', placeholder: 'contact@example.com' }
    ]
  },
  {
    id: 'q5_existing_links',
    number: 5,
    sectionId: 'section_01',
    label: 'Current website and social media links (if any).',
    type: 'textarea',
    placeholder: 'List existing URLs, Instagram, LinkedIn, Facebook or portfolio profiles...'
  },
  {
    id: 'q6_business_description',
    number: 6,
    sectionId: 'section_01',
    label: 'Briefly describe your business and the products or services you offer.',
    type: 'textarea',
    placeholder: 'Core products, services, value proposition, operational scope...'
  },
  {
    id: 'q7_decision_maker',
    number: 7,
    sectionId: 'section_01',
    label: 'Who is the main decision-maker for this project?',
    type: 'text',
    placeholder: 'Names, roles, and signing authorities'
  },

  // SECTION 02 — PROJECT GOALS & AUDIENCE (Q8 - Q11)
  {
    id: 'q8_main_purpose',
    number: 8,
    sectionId: 'section_02',
    label: 'Main purpose website?',
    type: 'multiple',
    options: [
      'Showcase company and services',
      'Generate enquiries / leads',
      'Sell products online',
      'Accept bookings / appointments',
      'Build brand credibility',
      'Customer or member portal',
      'Publish information / content',
      'Other: ___'
    ],
    hasOther: true,
    otherKey: 'q8_main_purpose_other'
  },
  {
    id: 'q9_target_customers',
    number: 9,
    sectionId: 'section_02',
    label: 'Target customers?',
    helpText: 'Mention customer type, location, age group or audience profile.',
    type: 'textarea',
    placeholder: 'Demographics, commercial clients vs consumers, geographic markets...'
  },
  {
    id: 'q10_visitor_actions',
    number: 10,
    sectionId: 'section_02',
    label: 'What should visitors do on website?',
    helpText: 'Examples: call, WhatsApp, submit form, buy, book, request quote.',
    type: 'textarea',
    placeholder: 'Key desired visitor conversion steps and calls-to-action...'
  },
  {
    id: 'q11_business_problem',
    number: 11,
    sectionId: 'section_02',
    label: 'What business problem should website solve?',
    type: 'textarea',
    placeholder: 'Operational bottlenecks, low lead conversion, lack of online sales...'
  },

  // SECTION 03 — WEBSITE TYPE & PAGE STRUCTURE (Q12 - Q16)
  {
    id: 'q12_website_type',
    number: 12,
    sectionId: 'section_03',
    label: 'Website type?',
    type: 'multiple',
    options: [
      'Business / corporate website',
      'Service-based website',
      'Portfolio website',
      'Landing page',
      'E-commerce / online store',
      'Web application / customer portal',
      'Booking website',
      'Blog / news website',
      'Other: ___'
    ],
    hasOther: true,
    otherKey: 'q12_website_type_other'
  },
  {
    id: 'q13_pages',
    number: 13,
    sectionId: 'section_03',
    label: 'Pages?',
    type: 'multiple',
    options: [
      'Home',
      'About us',
      'Our services',
      'Service detail pages',
      'Products / shop',
      'Product detail pages',
      'Portfolio / projects',
      'Gallery',
      'Testimonials / reviews',
      'Pricing / plans',
      'FAQ',
      'Blog / articles',
      'Careers',
      'Contact us',
      'Privacy policy / terms',
      'Login / user dashboard',
      'Other: ___'
    ],
    hasOther: true,
    otherKey: 'q13_pages_other'
  },
  {
    id: 'q14_additional_pages',
    number: 14,
    sectionId: 'section_03',
    label: 'Additional pages or special sections?',
    type: 'textarea',
    placeholder: 'Custom calculators, interactive maps, member zones, resource libraries...'
  },
  {
    id: 'q15_existing_content',
    number: 15,
    sectionId: 'section_03',
    label: 'Existing website content?',
    type: 'single',
    options: [
      'Yes, ready',
      'Some content',
      'No, need help preparing it'
    ]
  },
  {
    id: 'q16_content_provider',
    number: 16,
    sectionId: 'section_03',
    label: 'Who provides text, photos, videos and product details?',
    type: 'text',
    placeholder: 'Internal marketing team, copywriters, Stuzen content services...'
  },

  // SECTION 04 — DESIGN & BRAND DIRECTION (Q17 - Q21)
  {
    id: 'q17_brand_guidelines',
    number: 17,
    sectionId: 'section_04',
    label: 'Logo and brand guidelines?',
    type: 'multiple',
    options: [
      'Logo ready',
      'Brand colours ready',
      'Fonts selected',
      'Need branding help'
    ]
  },
  {
    id: 'q18_design_style',
    number: 18,
    sectionId: 'section_04',
    label: 'Design style?',
    type: 'multiple',
    options: [
      'Minimal / clean',
      'Modern / premium',
      'Corporate / professional',
      'Creative / colourful',
      'Luxury / elegant',
      'Bold / futuristic',
      'Similar to a reference website',
      'Need Stuzen to recommend'
    ]
  },
  {
    id: 'q19_reference_websites',
    number: 19,
    sectionId: 'section_04',
    label: 'Share 2–3 websites you like and what you like about them.',
    type: 'textarea',
    placeholder: 'URLs with notes on specific layout, typography, navigation or features...'
  },
  {
    id: 'q20_styles_to_avoid',
    number: 20,
    sectionId: 'section_04',
    label: 'Colours, layouts or styles to avoid?',
    type: 'textarea',
    placeholder: 'Disliked color palettes, busy animations, specific layouts...'
  },
  {
    id: 'q21_multiple_languages',
    number: 21,
    sectionId: 'section_04',
    label: 'Multiple languages?',
    type: 'single',
    options: ['No', 'Yes'],
    conditionalField: {
      triggerValue: 'Yes',
      key: 'q21_multiple_languages_detail',
      label: 'Please specify required languages:',
      placeholder: 'e.g., English, Spanish, Arabic, French'
    }
  },

  // SECTION 05 — FEATURES & FUNCTIONALITY (Q22 - Q25)
  {
    id: 'q22_features',
    number: 22,
    sectionId: 'section_05',
    label: 'Features?',
    type: 'multiple',
    options: [
      'Contact / enquiry form',
      'WhatsApp chat button',
      'Click-to-call button',
      'Google Maps / location',
      'Image / video gallery',
      'Search and filters',
      'Blog / content management',
      'Appointment / booking system',
      'Shopping cart and checkout',
      'Online payment gateway',
      'Product / inventory management',
      'Order tracking',
      'Customer login / registration',
      'Admin dashboard',
      'User roles and permissions',
      'Email notifications',
      'SMS notifications',
      'Live chat / chatbot',
      'Multi-language support',
      'File upload / download',
      'Reports / analytics',
      'Other: ___'
    ],
    hasOther: true,
    otherKey: 'q22_features_other'
  },
  {
    id: 'q23_workflow_steps',
    number: 23,
    sectionId: 'section_05',
    label: "Explain special feature workflow step by step from user's POV.",
    type: 'textarea',
    placeholder: 'Step 1: User visits page... Step 2: Fills form... Step 3: Receives email...'
  },
  {
    id: 'q24_admin_access',
    number: 24,
    sectionId: 'section_05',
    label: 'Who needs admin panel access?',
    type: 'multiple',
    options: [
      'Owner',
      'Staff',
      'Multiple roles',
      'Customers / members'
    ]
  },
  {
    id: 'q25_post_launch_updates',
    number: 25,
    sectionId: 'section_05',
    label: 'Need to update content after launch?',
    type: 'single',
    options: [
      'Yes, through admin panel',
      'No, Stuzen can manage it',
      'Discuss later'
    ]
  },

  // SECTION 06 — WHATSAPP, INTEGRATIONS & AUTOMATION (Q26 - Q29)
  {
    id: 'q26_whatsapp_actions',
    number: 26,
    sectionId: 'section_06',
    label: 'WhatsApp customer actions?',
    type: 'multiple',
    options: [
      'Simple click-to-chat',
      'Pre-filled enquiry message',
      'Send lead details to staff',
      'Order / booking notifications',
      'Approved automated replies',
      'WhatsApp Business Platform integration',
      'Human agent handover',
      'Not required'
    ]
  },
  {
    id: 'q27_business_tools',
    number: 27,
    sectionId: 'section_06',
    label: 'Existing business tools to connect.',
    helpText: 'Examples: CRM, billing, inventory, Google Sheets, email, booking software.',
    type: 'textarea',
    placeholder: 'e.g., Salesforce, HubSpot, Zoho, QuickBooks, Google Sheets, Mailchimp...'
  },
  {
    id: 'q28_payment_gateway',
    number: 28,
    sectionId: 'section_06',
    label: 'Payment gateway integration?',
    type: 'single',
    options: ['No', 'Yes', 'Not sure'],
    conditionalField: {
      triggerValue: 'Yes',
      key: 'q28_payment_gateway_detail',
      label: 'Preferred payment gateway provider(s):',
      placeholder: 'e.g., Stripe, PayPal, Razorpay, Square'
    }
  },
  {
    id: 'q29_other_automation',
    number: 29,
    sectionId: 'section_06',
    label: 'Other automation or third-party integrations?',
    type: 'textarea',
    placeholder: 'Zapier, Make.com, custom webhook pipelines, AI chatbots, SMS gateways...'
  },

  // SECTION 07 — TECHNICAL & OPERATIONAL REQUIREMENTS (Q30 - Q34)
  {
    id: 'q30_domain',
    number: 30,
    sectionId: 'section_07',
    label: 'Own domain?',
    type: 'single',
    options: ['Yes', 'No, need assistance'],
    conditionalField: {
      triggerValue: 'Yes',
      key: 'q30_domain_detail',
      label: 'Enter your domain name:',
      placeholder: 'e.g., yourcompany.com'
    }
  },
  {
    id: 'q31_hosting',
    number: 31,
    sectionId: 'section_07',
    label: 'Website hosting?',
    type: 'single',
    options: ['Yes', 'No, need recommendation'],
    conditionalField: {
      triggerValue: 'Yes',
      key: 'q31_hosting_detail',
      label: 'Enter your hosting provider / server environment:',
      placeholder: 'e.g., AWS, Vercel, Hostinger, Cloudflare'
    }
  },
  {
    id: 'q32_business_email',
    number: 32,
    sectionId: 'section_07',
    label: 'Professional business email?',
    type: 'single',
    options: [
      'Yes',
      'No',
      'Need details'
    ]
  },
  {
    id: 'q33_migrations',
    number: 33,
    sectionId: 'section_07',
    label: 'Existing systems, databases or websites to migrate?',
    type: 'textarea',
    placeholder: 'WordPress posts, Shopify products, customer database, existing SEO URLs...'
  },
  {
    id: 'q34_security_requirements',
    number: 34,
    sectionId: 'section_07',
    label: 'Security, user-access or data protection requirements?',
    helpText: 'Examples: admin-only areas, staff roles, customer data, backups.',
    type: 'textarea',
    placeholder: '2FA, GDPR compliance, automated daily backups, IP whitelisting...'
  },

  // SECTION 08 — SEO, ANALYTICS & MARKETING (Q35 - Q38)
  {
    id: 'q35_seo_support',
    number: 35,
    sectionId: 'section_08',
    label: 'SEO support?',
    type: 'single',
    options: [
      'Basic SEO setup',
      'Ongoing SEO service',
      'Discuss options'
    ]
  },
  {
    id: 'q36_search_terms_locations',
    number: 36,
    sectionId: 'section_08',
    label: 'Important locations / search terms?',
    type: 'textarea',
    placeholder: 'Target geographic regions, priority organic search keywords...'
  },
  {
    id: 'q37_analytics_tracking',
    number: 37,
    sectionId: 'section_08',
    label: 'Google Analytics, Search Console or conversion tracking?',
    type: 'single',
    options: [
      'Yes',
      'No',
      'Need recommendation'
    ]
  },
  {
    id: 'q38_marketing_campaigns',
    number: 38,
    sectionId: 'section_08',
    label: 'Google Ads or social campaigns linking to website?',
    type: 'textarea',
    placeholder: 'Paid search campaigns, Meta / Instagram ads, influencer promotions...'
  },

  // SECTION 09 — TIMELINE, BUDGET & SUPPORT (Q39 - Q43)
  {
    id: 'q39_target_date',
    number: 39,
    sectionId: 'section_09',
    label: 'Preferred website launch date / deadline.',
    type: 'date',
    placeholder: 'YYYY-MM-DD'
  },
  {
    id: 'q40_deadline_reason',
    number: 40,
    sectionId: 'section_09',
    label: 'Event / business reason for deadline?',
    type: 'textarea',
    placeholder: 'Trade exhibition, product launch, marketing campaign, investor pitch...'
  },
  {
    id: 'q41_budget_range',
    number: 41,
    sectionId: 'section_09',
    label: 'Expected project budget range?',
    type: 'text',
    placeholder: 'e.g., $10,000 – $20,000 (enter anticipated investment range)'
  },
  {
    id: 'q42_post_launch_support',
    number: 42,
    sectionId: 'section_09',
    label: 'Post-launch support?',
    type: 'single',
    options: [
      'Monthly maintenance',
      'On-demand support',
      'No support',
      'Discuss'
    ]
  },
  {
    id: 'q43_approval_person',
    number: 43,
    sectionId: 'section_09',
    label: 'Who approves design, content and final delivery?',
    type: 'text',
    placeholder: 'Key stakeholder names and sign-off hierarchy'
  },

  // SECTION 10 — FINAL NOTES & PROJECT SCOPE (Q44 - Q45)
  {
    id: 'q44_key_priority',
    number: 44,
    sectionId: 'section_10',
    label: 'Most important thing website must get right?',
    type: 'textarea',
    placeholder: 'Top non-negotiable success criterion for this project...'
  },
  {
    id: 'q45_additional_notes',
    number: 45,
    sectionId: 'section_10',
    label: 'Any requirements not discussed?',
    type: 'textarea',
    placeholder: 'Any special considerations, constraints, or unique requests...'
  }
];

// Quick lookup index of questions by ID
export const QUESTIONS_BY_ID = QUESTIONS.reduce((acc, q) => {
  acc[q.id] = q;
  return acc;
}, {});

// Initial Empty Discovery State Generator
export function createInitialDiscoveryState() {
  const initialAnswers = {};

  QUESTIONS.forEach((q) => {
    if (q.type === 'multiple') {
      initialAnswers[q.id] = [];
      if (q.hasOther && q.otherKey) {
        initialAnswers[q.otherKey] = '';
      }
    } else if (q.type === 'contact') {
      initialAnswers[q.id] = { phone: '', email: '' };
    } else {
      initialAnswers[q.id] = '';
      if (q.conditionalField) {
        initialAnswers[q.conditionalField.key] = '';
      }
    }
  });

  return {
    version: SCHEMA_VERSION,
    metadata: {
      interviewDate: '',
      meetingMode: '',
      stuzenRepresentative: ''
    },
    answers: initialAnswers,
    materials: {
      received: [],
      otherText: ''
    },
    internalSummary: {
      summaryA: '',
      summaryB: '',
      summaryC: '',
      summaryD: '',
      summaryE: '',
      summaryF: '' // STRICTLY MANUAL — Never auto-generated
    },
    signatures: {
      client: {
        signature: '',
        date: ''
      },
      stuzen: {
        signature: '',
        date: ''
      }
    }
  };
}

/**
 * Checks whether an answer contains meaningful non-empty data
 * Counts each question exactly once.
 */
export function isQuestionAnswered(question, answers) {
  if (!question || !answers) return false;
  const val = answers[question.id];

  if (question.type === 'multiple') {
    return Array.isArray(val) && val.length > 0;
  }

  if (question.type === 'contact') {
    if (!val || typeof val !== 'object') return false;
    const hasPhone = typeof val.phone === 'string' && val.phone.trim().length > 0;
    const hasEmail = typeof val.email === 'string' && val.email.trim().length > 0;
    return hasPhone || hasEmail;
  }

  if (typeof val === 'string') {
    return val.trim().length > 0;
  }

  return false;
}

/**
 * Calculates overall and per-section completion percentage
 * Exactly 45 questions counted.
 */
export function calculateCompletion(answers = {}) {
  const total = QUESTIONS.length; // Exactly 45
  let answered = 0;

  const sectionBreakdown = {};

  SECTIONS.forEach((section) => {
    sectionBreakdown[section.id] = {
      sectionId: section.id,
      sectionNumber: section.number,
      title: section.title,
      total: 0,
      answered: 0,
      percentage: 0
    };
  });

  QUESTIONS.forEach((q) => {
    const isDone = isQuestionAnswered(q, answers);
    if (isDone) {
      answered += 1;
    }

    if (sectionBreakdown[q.sectionId]) {
      sectionBreakdown[q.sectionId].total += 1;
      if (isDone) {
        sectionBreakdown[q.sectionId].answered += 1;
      }
    }
  });

  // Calculate percentages
  Object.values(sectionBreakdown).forEach((sec) => {
    sec.percentage = sec.total > 0 ? Math.round((sec.answered / sec.total) * 100) : 0;
  });

  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;
  const remaining = Math.max(0, total - answered);

  return {
    answered,
    total,
    percentage: Math.min(100, Math.max(0, percentage)),
    remaining,
    sectionBreakdown
  };
}

/**
 * Generates structured Internal Project Summary drafts for sections A–E
 * Section F is NEVER modified or generated.
 */
export function generateInternalSummaryFromAnswers(answers = {}, metadata = {}) {
  const getVal = (id, fallback = 'Not specified') => {
    const v = answers[id];
    if (typeof v === 'string') return v.trim() || fallback;
    if (Array.isArray(v)) return v.length > 0 ? v.join(', ') : fallback;
    if (typeof v === 'object' && v !== null) {
      const parts = [];
      if (v.phone) parts.push(`Tel: ${v.phone}`);
      if (v.email) parts.push(`Email: ${v.email}`);
      return parts.length > 0 ? parts.join(' | ') : fallback;
    }
    return fallback;
  };

  const clientName = getVal('q1_client_name');
  const businessName = getVal('q2_business_name');
  const industry = getVal('q3_industry_category');
  const bizDesc = getVal('q6_business_description');
  const decisionMaker = getVal('q7_decision_maker');
  const websiteTypes = getVal('q12_website_type');
  const mainPurpose = getVal('q8_main_purpose');
  const targetAudience = getVal('q9_target_customers');
  const keyPriority = getVal('q44_key_priority');

  // Section A: Recommended website type and project summary
  const summaryA = [
    `PROJECT OVERVIEW & CORE RECOMMENDATION:`,
    `Client: ${clientName} | Entity: ${businessName} (${industry})`,
    `Decision Maker(s): ${decisionMaker}`,
    ``,
    `Primary Objectives: ${mainPurpose}`,
    `Recommended Solution Architecture: ${websiteTypes}`,
    `Business Focus: ${bizDesc}`,
    `Target Audience: ${targetAudience}`,
    `Primary Success Criterion: ${keyPriority}`
  ].join('\n');

  // Section B: Agreed pages and key features
  const pages = getVal('q13_pages');
  const specialSections = getVal('q14_additional_pages', 'None specified');
  const features = getVal('q22_features');
  const workflow = getVal('q23_workflow_steps', 'Standard interaction flows');
  const contentReadiness = getVal('q15_existing_content');
  const contentProvider = getVal('q16_content_provider');
  const adminAccess = getVal('q24_admin_access');
  const postLaunch = getVal('q25_post_launch_updates');

  const summaryB = [
    `INFORMATION ARCHITECTURE & CORE FUNCTIONALITY:`,
    `Pages Included: ${pages}`,
    `Special Sections & Custom Layouts: ${specialSections}`,
    ``,
    `Key Functional Capabilities: ${features}`,
    `Custom Workflow Implementation: ${workflow}`,
    `Content Status: ${contentReadiness} (Provided by: ${contentProvider})`,
    `Administrative Access: ${adminAccess} | Post-Launch Update Model: ${postLaunch}`
  ].join('\n');

  // Section C: Integrations and external services / recurring costs
  const whatsappActions = getVal('q26_whatsapp_actions');
  const businessTools = getVal('q27_business_tools', 'None specified');
  const paymentGateway = getVal('q28_payment_gateway');
  const paymentProvider = answers.q28_payment_gateway_detail ? ` (${answers.q28_payment_gateway_detail})` : '';
  const otherAutomation = getVal('q29_other_automation', 'None specified');
  const domainStatus = getVal('q30_domain');
  const domainDetail = answers.q30_domain_detail ? ` [Domain: ${answers.q30_domain_detail}]` : '';
  const hostingStatus = getVal('q31_hosting');
  const hostingDetail = answers.q31_hosting_detail ? ` [Host: ${answers.q31_hosting_detail}]` : '';
  const businessEmail = getVal('q32_business_email');

  const summaryC = [
    `INTEGRATIONS & INFRASTRUCTURE TOPOLOGY:`,
    `WhatsApp Integration: ${whatsappActions}`,
    `Business Tools & API Connections: ${businessTools}`,
    `Payment Gateway: ${paymentGateway}${paymentProvider}`,
    `Additional Automations: ${otherAutomation}`,
    `Domain: ${domainStatus}${domainDetail}`,
    `Cloud Hosting: ${hostingStatus}${hostingDetail}`,
    `Business Email Setup: ${businessEmail}`,
    ``,
    `NOTICE ON RECURRING EXPENSES:`,
    `Third-party API licensing, transaction processing fees, domain renewals, email suite seats, and cloud hosting infrastructure fees are external recurring expenses managed directly with their respective providers.`
  ].join('\n');

  // Section D: Items excluded from scope or planned later
  const migrations = getVal('q33_migrations', 'No data migration specified');
  const additionalNotes = getVal('q45_additional_notes', 'None recorded');
  const multiLang = getVal('q21_multiple_languages');

  const summaryD = [
    `SCOPE BOUNDARIES & DEFERRED REQUIREMENTS:`,
    `Migration Scope: ${migrations}`,
    `Multi-Language Expansion: ${multiLang === 'Yes' ? 'Included per Q21' : 'Excluded from initial release'}`,
    `Additional Deferred Notes: ${additionalNotes}`,
    ``,
    `EXCLUSION NOTICE:`,
    `Any functional capability, third-party integration, content creation, or external service not explicitly documented in Sections A–C is excluded from this baseline project scope and will require a separate change request.`
  ].join('\n');

  // Section E: Estimated delivery milestones
  const launchDeadline = getVal('q39_target_date', 'To be scheduled');
  const deadlineReason = getVal('q40_deadline_reason', 'Standard delivery timeline');
  const budget = getVal('q41_budget_range', 'To be finalized');
  const approvalPerson = getVal('q43_approval_person');
  const supportTier = getVal('q42_post_launch_support');

  const summaryE = [
    `ESTIMATED DELIVERY HORIZON & GOVERNANCE:`,
    `Target Launch Window: ${launchDeadline} (Driver: ${deadlineReason})`,
    `Client Approver: ${approvalPerson}`,
    `Budget Framework: ${budget}`,
    `Post-Launch Governance: ${supportTier}`,
    ``,
    `PROJECT PHASE SEQUENCE:`,
    `Phase 1: Architecture, Brand System & Requirements Finalization`,
    `Phase 2: UI/UX Wireframing & Interactive Prototype Sign-off`,
    `Phase 3: Core Frontend Engineering & Functional Modules`,
    `Phase 4: Integrations, Automations & Third-Party Gateways`,
    `Phase 5: User Acceptance Testing, Security Audit & Content Injection`,
    `Phase 6: Production Deployment & Knowledge Handover`
  ].join('\n');

  return {
    summaryA,
    summaryB,
    summaryC,
    summaryD,
    summaryE
    // Section F is deliberately excluded to protect manual entry
  };
}

/**
 * Realistic Fictional Demo Dataset for "GreenLeaf Organics"
 */
export const DEMO_DISCOVERY_DATA = {
  version: SCHEMA_VERSION,
  metadata: {
    interviewDate: '2026-11-10',
    meetingMode: 'Video call',
    stuzenRepresentative: 'Murugan (Lead Solutions Architect)'
  },
  answers: {
    q1_client_name: 'Marcus Vance, Operations Director',
    q2_business_name: 'GreenLeaf Organics',
    q3_industry_category: 'Organic Foods & Sustainable Agriculture',
    q4_contact_details: {
      phone: '+1 (555) 234-8901',
      email: 'marcus.vance@greenleaforganics.example'
    },
    q5_existing_links:
      'https://instagram.com/greenleaforganics.example\nhttps://linkedin.com/company/greenleaf-organics-example',
    q6_business_description:
      'We are an artisanal organic farm and sustainable food cooperative producing certified organic produce, cold-pressed oils, and pantry staples distributed to local markets and retail stores.',
    q7_decision_maker:
      'Marcus Vance (Operations Director) and Elena Rostova (Managing Partner)',
    q8_main_purpose: [
      'Showcase company and services',
      'Generate enquiries / leads',
      'Sell products online',
      'Build brand credibility'
    ],
    q8_main_purpose_other: '',
    q9_target_customers:
      'Health-conscious consumers, home chefs, and regional organic grocery retailers aged 25–55 seeking verified sustainable and pesticide-free pantry goods.',
    q10_visitor_actions:
      'Explore farm certifications, browse organic product collections, place online wholesale inquiries, purchase retail sampler bundles, and subscribe to harvest updates.',
    q11_business_problem:
      'Our current order processing relies on manual email and phone orders, causing fulfillment bottlenecks and lack of real-time inventory visibility for wholesale buyers.',
    q12_website_type: [
      'Business / corporate website',
      'E-commerce / online store',
      'Service-based website'
    ],
    q12_website_type_other: '',
    q13_pages: [
      'Home',
      'About us',
      'Our services',
      'Products / shop',
      'Product detail pages',
      'Gallery',
      'Testimonials / reviews',
      'FAQ',
      'Blog / articles',
      'Contact us',
      'Privacy policy / terms'
    ],
    q13_pages_other: '',
    q14_additional_pages:
      'Seasonal Harvest Calendar and Wholesale Partner Inquiry portal.',
    q15_existing_content: 'Some content',
    q16_content_provider:
      'Marcus will provide product specifications and certification documents; professional photography package will be commissioned.',
    q17_brand_guidelines: [
      'Logo ready',
      'Brand colours ready',
      'Fonts selected'
    ],
    q18_design_style: [
      'Minimal / clean',
      'Modern / premium',
      'Corporate / professional'
    ],
    q19_reference_websites:
      'https://patagonia.com/provisions (clean visual storytelling and ingredient sourcing)\nhttps://seed.com (minimal premium science-backed design)',
    q20_styles_to_avoid:
      'Cluttered layouts, neon colors, excessive popups, or overly cartoonish farm graphics.',
    q21_multiple_languages: 'No',
    q21_multiple_languages_detail: '',
    q22_features: [
      'Contact / enquiry form',
      'WhatsApp chat button',
      'Google Maps / location',
      'Image / video gallery',
      'Search and filters',
      'Shopping cart and checkout',
      'Online payment gateway',
      'Product / inventory management',
      'Order tracking',
      'Customer login / registration',
      'Admin dashboard',
      'Email notifications',
      'Reports / analytics'
    ],
    q22_features_other: '',
    q23_workflow_steps:
      'Wholesale buyer navigates to Wholesale section, inputs business tax registration, views tiered volume pricing, selects pallet quantities, and submits order for automated verification.',
    q24_admin_access: ['Owner', 'Staff'],
    q25_post_launch_updates: 'Yes, through admin panel',
    q26_whatsapp_actions: [
      'Simple click-to-chat',
      'Pre-filled enquiry message',
      'Send lead details to staff',
      'Order / booking notifications'
    ],
    q27_business_tools:
      'QuickBooks Online for accounting, Mailchimp for newsletter subscribers, and Google Sheets for farm harvest scheduling.',
    q28_payment_gateway: 'Yes',
    q28_payment_gateway_detail: 'Stripe for cards and Apple Pay / Google Pay',
    q29_other_automation:
      'Automated order confirmation emails via SendGrid and weekly inventory low-stock alerts sent to inventory manager via Slack.',
    q30_domain: 'Yes',
    q30_domain_detail: 'greenleaforganics.example',
    q31_hosting: 'No, need recommendation',
    q31_hosting_detail: '',
    q32_business_email: 'Yes',
    q33_migrations:
      'Migrate customer contact list of ~1,200 emails from CSV into Mailchimp; migrate 45 product SKUs and image assets.',
    q34_security_requirements:
      'Admin two-factor authentication, SSL/TLS encryption for payments, role-based access for warehouse staff, and daily automated database backups.',
    q35_seo_support: 'Basic SEO setup',
    q36_search_terms_locations:
      '"Organic produce supplier Pacific Northwest", "certified organic pantry staples", "sustainable wholesale farm products".',
    q37_analytics_tracking: 'Yes',
    q38_marketing_campaigns:
      'Planning seasonal Google Search ads and targeted Instagram campaigns during spring harvest launch.',
    q39_target_date: '2026-12-15',
    q40_deadline_reason:
      'To align with our Annual Holiday Gift Box campaign and regional agricultural summit.',
    q41_budget_range: '$12,000 – $18,000 initial phase',
    q42_post_launch_support: 'Monthly maintenance',
    q43_approval_person:
      'Elena Rostova (Managing Partner) for creative design, Marcus Vance for functional specifications and final sign-off.',
    q44_key_priority:
      'Fast loading speed, crystal-clear mobile checkout, and authentic brand storytelling that reinforces our organic purity.',
    q45_additional_notes:
      'Potential future Phase 2 expansion for recurring weekly farm-box subscriptions.'
  },
  materials: {
    received: ['logo', 'brandGuidelines', 'textContent', 'media', 'domainHosting'],
    otherText: ''
  },
  internalSummary: {
    summaryA:
      'PROJECT OVERVIEW & CORE RECOMMENDATION:\nClient: Marcus Vance, Operations Director | Entity: GreenLeaf Organics (Organic Foods & Sustainable Agriculture)\nDecision Maker(s): Marcus Vance (Operations Director) and Elena Rostova (Managing Partner)\n\nPrimary Objectives: Showcase company and services, Generate enquiries / leads, Sell products online, Build brand credibility\nRecommended Solution Architecture: Business / corporate website, E-commerce / online store, Service-based website\nBusiness Focus: We are an artisanal organic farm and sustainable food cooperative producing certified organic produce, cold-pressed oils, and pantry staples distributed to local markets and retail stores.\nTarget Audience: Health-conscious consumers, home chefs, and regional organic grocery retailers aged 25–55 seeking verified sustainable and pesticide-free pantry goods.\nPrimary Success Criterion: Fast loading speed, crystal-clear mobile checkout, and authentic brand storytelling that reinforces our organic purity.',
    summaryB:
      'INFORMATION ARCHITECTURE & CORE FUNCTIONALITY:\nPages Included: Home, About us, Our services, Products / shop, Product detail pages, Gallery, Testimonials / reviews, FAQ, Blog / articles, Contact us, Privacy policy / terms\nSpecial Sections & Custom Layouts: Seasonal Harvest Calendar and Wholesale Partner Inquiry portal.\n\nKey Functional Capabilities: Contact / enquiry form, WhatsApp chat button, Google Maps / location, Image / video gallery, Search and filters, Shopping cart and checkout, Online payment gateway, Product / inventory management, Order tracking, Customer login / registration, Admin dashboard, Email notifications, Reports / analytics\nCustom Workflow Implementation: Wholesale buyer navigates to Wholesale section, inputs business tax registration, views tiered volume pricing, selects pallet quantities, and submits order for automated verification.\nContent Status: Some content (Provided by: Marcus will provide product specifications and certification documents; professional photography package will be commissioned.)\nAdministrative Access: Owner, Staff | Post-Launch Update Model: Yes, through admin panel',
    summaryC:
      'INTEGRATIONS & INFRASTRUCTURE TOPOLOGY:\nWhatsApp Integration: Simple click-to-chat, Pre-filled enquiry message, Send lead details to staff, Order / booking notifications\nBusiness Tools & API Connections: QuickBooks Online for accounting, Mailchimp for newsletter subscribers, and Google Sheets for farm harvest scheduling.\nPayment Gateway: Yes (Stripe for cards and Apple Pay / Google Pay)\nAdditional Automations: Automated order confirmation emails via SendGrid and weekly inventory low-stock alerts sent to inventory manager via Slack.\nDomain: Yes [Domain: greenleaforganics.example]\nCloud Hosting: No, need recommendation\nBusiness Email Setup: Yes\n\nNOTICE ON RECURRING EXPENSES:\nThird-party API licensing, transaction processing fees, domain renewals, email suite seats, and cloud hosting infrastructure fees are external recurring expenses managed directly with their respective providers.',
    summaryD:
      'SCOPE BOUNDARIES & DEFERRED REQUIREMENTS:\nMigration Scope: Migrate customer contact list of ~1,200 emails from CSV into Mailchimp; migrate 45 product SKUs and image assets.\nMulti-Language Expansion: Excluded from initial release\nAdditional Deferred Notes: Potential future Phase 2 expansion for recurring weekly farm-box subscriptions.\n\nEXCLUSION NOTICE:\nAny functional capability, third-party integration, content creation, or external service not explicitly documented in Sections A–C is excluded from this baseline project scope and will require a separate change request.',
    summaryE:
      'ESTIMATED DELIVERY HORIZON & GOVERNANCE:\nTarget Launch Window: 2026-12-15 (Driver: To align with our Annual Holiday Gift Box campaign and regional agricultural summit.)\nClient Approver: Elena Rostova (Managing Partner) for creative design, Marcus Vance for functional specifications and final sign-off.\nBudget Framework: $12,000 – $18,000 initial phase\nPost-Launch Governance: Monthly maintenance\n\nPROJECT PHASE SEQUENCE:\nPhase 1: Architecture, Brand System & Requirements Finalization\nPhase 2: UI/UX Wireframing & Interactive Prototype Sign-off\nPhase 3: Core Frontend Engineering & Functional Modules\nPhase 4: Integrations, Automations & Third-Party Gateways\nPhase 5: User Acceptance Testing, Security Audit & Content Injection\nPhase 6: Production Deployment & Knowledge Handover',
    summaryF:
      'Total Project Estimate: $14,800 USD (Subject to final scope freeze)\nDeposit Milestone (40%): $5,920 upon contract execution & prototype approval\nDevelopment Milestone (40%): $5,920 upon functional UAT completion\nFinal Milestone (20%): $2,960 upon production launch and handover'
  },
  signatures: {
    client: {
      signature: 'Marcus Vance (SAMPLE DATA - GREENLEAF ORGANICS)',
      date: '2026-11-10'
    },
    stuzen: {
      signature: 'Murugan (SAMPLE DATA - STUZEN TECHNOLOGIES)',
      date: '2026-11-10'
    }
  }
};

/**
 * Prepares complete structured JSON export payload
 */
export function formatExportData(state) {
  const completion = calculateCompletion(state.answers);

  return {
    schemaVersion: SCHEMA_VERSION,
    exportTimestamp: new Date().toISOString(),
    acknowledgement: ACKNOWLEDGEMENT_TEXT,
    footer: FOOTER_TEXT,
    metadata: { ...state.metadata },
    completion,
    answers: { ...state.answers },
    materials: { ...state.materials },
    internalSummary: { ...state.internalSummary },
    signatures: { ...state.signatures }
  };
}

