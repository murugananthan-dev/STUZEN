/**
 * STUZEN TECHNOLOGIES - Live Project Scope & Complexity Estimator
 * Deterministic scoring engine evaluating architectural complexity from client answers.
 * 
 * NOTE: Preliminary planning heuristic only. Does NOT provide monetary quotes or delivery promises.
 */

export const COMPLEXITY_LEVELS = {
  BASIC: {
    level: 'Basic',
    range: '0–7',
    color: '#059669', // Emerald
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    description: 'A clean, standard informational or landing experience with minimal custom workflows and standard CMS structure.'
  },
  STANDARD: {
    level: 'Standard',
    range: '8–15',
    color: '#0284c7', // Azure / Brand Blue
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
    description: 'A multi-page corporate or service platform with structured content, interactive forms, and essential digital touchpoints.'
  },
  ADVANCED: {
    level: 'Advanced',
    range: '16–25',
    color: '#d97706', // Amber
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    description: 'A sophisticated digital product requiring e-commerce, user authentication, customer portals, or third-party business integrations.'
  },
  COMPLEX: {
    level: 'Complex',
    range: '26+',
    color: '#7c3aed', // Purple
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    description: 'An enterprise-scale platform with distributed roles, payment workflows, automated pipelines, database migrations, or high-security criteria.'
  }
};

/**
 * Calculates project scope complexity metrics from questionnaire answers
 * @param {Object} answers - Current dictionary of 45 answers
 * @returns {Object} Deterministic complexity assessment
 */
export function calculateScopeComplexity(answers = {}) {
  let score = 0;
  const scoredItems = [];
  const dependencies = [];
  const missingClarifications = [];

  const types = Array.isArray(answers.q12_website_type) ? answers.q12_website_type : [];
  const features = Array.isArray(answers.q22_features) ? answers.q22_features : [];
  const whatsapp = Array.isArray(answers.q26_whatsapp_actions) ? answers.q26_whatsapp_actions : [];
  const tools = typeof answers.q27_business_tools === 'string' ? answers.q27_business_tools.trim() : '';
  const payment = typeof answers.q28_payment_gateway === 'string' ? answers.q28_payment_gateway.trim() : '';
  const automations = typeof answers.q29_other_automation === 'string' ? answers.q29_other_automation.trim() : '';
  const migrations = typeof answers.q33_migrations === 'string' ? answers.q33_migrations.trim() : '';
  const security = typeof answers.q34_security_requirements === 'string' ? answers.q34_security_requirements.trim() : '';
  const multiLang = answers.q21_multiple_languages === 'Yes';

  // 1. Foundation Scoring
  if (types.includes('Web application / customer portal')) {
    score += 4;
    scoredItems.push('Web application / customer portal (+4)');
    dependencies.push('Custom backend APIs & state management');
  } else if (types.includes('E-commerce / online store')) {
    score += 3;
    scoredItems.push('E-commerce / online store (+3)');
    dependencies.push('Product catalogue & transaction pipeline');
  } else if (types.includes('Booking website')) {
    score += 3;
    scoredItems.push('Booking website (+3)');
    dependencies.push('Calendar scheduling engine');
  } else if (types.includes('Blog / news website')) {
    score += 2;
    scoredItems.push('Blog / news website (+2)');
  } else if (
    types.includes('Business / corporate website') ||
    types.includes('Service-based website') ||
    types.includes('Portfolio website') ||
    types.includes('Landing page')
  ) {
    score += 1;
    scoredItems.push('Standard web presence (+1)');
  } else {
    missingClarifications.push('Primary website type not yet selected (Q12)');
  }

  // 2. Feature Scoring
  if (features.includes('Shopping cart and checkout')) {
    score += 3;
    scoredItems.push('Cart & Checkout (+3)');
    dependencies.push('Secure payment session tokenization');
  }
  if (features.includes('Online payment gateway') || payment === 'Yes') {
    score += 3;
    scoredItems.push('Online payment gateway (+3)');
    dependencies.push('Merchant payment gateway integration (Stripe / PayPal)');
  }
  if (features.includes('Appointment / booking system')) {
    score += 3;
    scoredItems.push('Booking system (+3)');
  }
  if (features.includes('Customer login / registration')) {
    score += 3;
    scoredItems.push('User authentication (+3)');
    dependencies.push('Auth provider & session cookies');
  }
  if (features.includes('Product / inventory management')) {
    score += 3;
    scoredItems.push('Inventory management (+3)');
  }
  if (features.includes('Order tracking')) {
    score += 3;
    scoredItems.push('Order tracking (+3)');
  }
  if (features.includes('User roles and permissions')) {
    score += 3;
    scoredItems.push('Role-based access control (+3)');
  }
  if (features.includes('Admin dashboard')) {
    score += 2;
    scoredItems.push('Admin dashboard (+2)');
  }
  if (features.includes('Search and filters')) {
    score += 2;
    scoredItems.push('Search & faceted filters (+2)');
  }
  if (features.includes('Blog / content management')) {
    score += 2;
    scoredItems.push('Content management (+2)');
  }
  if (features.includes('Email notifications') || features.includes('SMS notifications')) {
    score += 2;
    scoredItems.push('Transactional notifications (+2)');
    dependencies.push('SMTP / SMS messaging gateway');
  }
  if (features.includes('Live chat / chatbot')) {
    score += 2;
    scoredItems.push('Chat experience (+2)');
  }
  if (features.includes('Multi-language support') || multiLang) {
    score += 2;
    scoredItems.push('Multi-language architecture (+2)');
    dependencies.push('i18n locale localization tables');
  }
  if (features.includes('File upload / download')) {
    score += 2;
    scoredItems.push('Asset upload handling (+2)');
    dependencies.push('Cloud object storage (S3 / Cloudflare R2)');
  }
  if (features.includes('Reports / analytics')) {
    score += 2;
    scoredItems.push('Reporting & data analytics (+2)');
  }
  if (features.includes('Contact / enquiry form')) {
    score += 1;
    scoredItems.push('Contact / enquiry form (+1)');
  }
  if (features.includes('WhatsApp chat button')) {
    score += 1;
    scoredItems.push('WhatsApp chat trigger (+1)');
  }

  // 3. Integrations & Technical Complexity
  if (whatsapp.includes('WhatsApp Business Platform integration')) {
    score += 3;
    scoredItems.push('WhatsApp Business API integration (+3)');
    dependencies.push('Meta Cloud API & webhook listener');
  } else if (
    whatsapp.includes('Approved automated replies') ||
    whatsapp.includes('Human agent handover')
  ) {
    score += 2;
    scoredItems.push('WhatsApp automated routing (+2)');
  }

  if (tools.length > 5 || automations.length > 5) {
    score += 2;
    scoredItems.push('Third-party API connections (+2)');
    dependencies.push('External webhooks & API credentials');
  }

  if (migrations.length > 10) {
    score += 3;
    scoredItems.push('Database / content migration (+3)');
    dependencies.push('Data transformation & schema mapping');
  }

  if (security.length > 10) {
    score += 3;
    scoredItems.push('Advanced security & governance (+3)');
    dependencies.push('Audit logging, 2FA & compliance controls');
  }

  // Missing Information Clarifications
  if (!answers.q1_client_name || answers.q1_client_name.trim().length === 0) {
    missingClarifications.push('Client contact person not yet identified (Q1)');
  }
  if (!answers.q2_business_name || answers.q2_business_name.trim().length === 0) {
    missingClarifications.push('Business / brand name not yet recorded (Q2)');
  }
  if (!answers.q15_existing_content) {
    missingClarifications.push('Content readiness status undecided (Q15)');
  }
  if (!answers.q30_domain) {
    missingClarifications.push('Domain registration status unconfirmed (Q30)');
  }
  if (!answers.q31_hosting) {
    missingClarifications.push('Hosting infrastructure preference unconfirmed (Q31)');
  }
  if (!answers.q39_target_date) {
    missingClarifications.push('Target launch deadline not established (Q39)');
  }
  if (!answers.q41_budget_range || answers.q41_budget_range.trim().length === 0) {
    missingClarifications.push('Budget expectations not yet shared (Q41)');
  }

  // Determine Complexity Classification
  let levelObj = COMPLEXITY_LEVELS.BASIC;
  if (score >= 26) {
    levelObj = COMPLEXITY_LEVELS.COMPLEX;
  } else if (score >= 16) {
    levelObj = COMPLEXITY_LEVELS.ADVANCED;
  } else if (score >= 8) {
    levelObj = COMPLEXITY_LEVELS.STANDARD;
  }

  // Count active integrations
  let integrationsCount = 0;
  if (tools.length > 5) integrationsCount += 1;
  if (automations.length > 5) integrationsCount += 1;
  if (payment === 'Yes') integrationsCount += 1;
  if (whatsapp.length > 0 && !whatsapp.includes('Not required')) integrationsCount += 1;

  return {
    score,
    level: levelObj.level,
    range: levelObj.range,
    color: levelObj.color,
    bgColor: levelObj.bgColor,
    borderColor: levelObj.borderColor,
    description: levelObj.description,
    majorFeaturesCount: features.length,
    integrationsCount,
    scoredItems,
    dependencies: Array.from(new Set(dependencies)),
    missingClarifications
  };
}

export default {
  calculateScopeComplexity,
  COMPLEXITY_LEVELS
};
