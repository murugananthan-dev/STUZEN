/**
 * STUZEN TECHNOLOGIES - WhatsApp Discovery Handover Utility
 * Generates a clean, professional client discovery summary for WhatsApp sharing.
 * 
 * STRICT RULES:
 * - Omits internal summary Section F and confidential quotation notes.
 * - Uses only actual saved answers; omits empty fields without fabricating data.
 * - Safely encodes text for wa.me sharing.
 */

/**
 * Compiles a structured, readable WhatsApp message from discovery data
 * @param {Object} discoveryData - Complete discovery state or export payload
 * @returns {string} Plain text WhatsApp handover message
 */
export function generateWhatsAppMessage(discoveryData = {}) {
  const answers = discoveryData.answers || {};
  const metadata = discoveryData.metadata || {};

  const clean = (val) => {
    if (typeof val === 'string') return val.trim();
    if (Array.isArray(val)) return val.filter(Boolean).join(', ');
    return '';
  };

  const clientName = clean(answers.q1_client_name);
  const businessName = clean(answers.q2_business_name);
  const industry = clean(answers.q3_industry_category);

  // Phone & Email
  const contact = answers.q4_contact_details || {};
  const contactParts = [];
  if (contact.phone) contactParts.push(`Phone: ${contact.phone}`);
  if (contact.email) contactParts.push(`Email: ${contact.email}`);
  const contactDetails = contactParts.join(' | ');

  const mainPurpose = clean(answers.q8_main_purpose);
  const websiteTypes = clean(answers.q12_website_type);
  const targetAudience = clean(answers.q9_target_customers);
  const pages = clean(answers.q13_pages);
  const features = clean(answers.q22_features);

  const whatsappActions = clean(answers.q26_whatsapp_actions);
  const paymentGateway = clean(answers.q28_payment_gateway);
  const paymentDetail = answers.q28_payment_gateway_detail ? ` (${answers.q28_payment_gateway_detail})` : '';
  const businessTools = clean(answers.q27_business_tools);
  const otherAutomation = clean(answers.q29_other_automation);

  // Domain & Hosting
  const domain = clean(answers.q30_domain);
  const domainDetail = answers.q30_domain_detail ? ` (${answers.q30_domain_detail})` : '';
  const hosting = clean(answers.q31_hosting);
  const hostingDetail = answers.q31_hosting_detail ? ` (${answers.q31_hosting_detail})` : '';
  const domainHostingStatus = [
    domain ? `Domain: ${domain}${domainDetail}` : '',
    hosting ? `Hosting: ${hosting}${hostingDetail}` : ''
  ].filter(Boolean).join(' | ');

  const launchDate = clean(answers.q39_target_date);
  const budgetRange = clean(answers.q41_budget_range);
  const supportTier = clean(answers.q42_post_launch_support);

  const keyPriority = clean(answers.q44_key_priority);
  const additionalNotes = clean(answers.q45_additional_notes);

  const lines = [
    'Hello,',
    '',
    'Here is the initial website project discovery summary recorded with STUZEN TECHNOLOGIES.',
    ''
  ];

  // Client & Business
  lines.push('*CLIENT & BUSINESS*');
  if (clientName) lines.push(`• Contact person: ${clientName}`);
  if (businessName) lines.push(`• Business name: ${businessName}`);
  if (industry) lines.push(`• Industry: ${industry}`);
  if (contactDetails) lines.push(`• Contact details: ${contactDetails}`);
  if (metadata.interviewDate) lines.push(`• Discovery date: ${metadata.interviewDate}`);
  lines.push('');

  // Project Overview
  lines.push('*PROJECT OVERVIEW*');
  if (mainPurpose) lines.push(`• Main website objective: ${mainPurpose}`);
  if (websiteTypes) lines.push(`• Recommended website type: ${websiteTypes}`);
  if (targetAudience) lines.push(`• Target audience: ${targetAudience}`);
  if (pages) lines.push(`• Key pages: ${pages}`);
  if (features) lines.push(`• Main requested features: ${features}`);
  lines.push('');

  // Integrations & Technical Needs
  lines.push('*INTEGRATIONS & TECHNICAL NEEDS*');
  if (whatsappActions) lines.push(`• WhatsApp requirements: ${whatsappActions}`);
  if (paymentGateway) lines.push(`• Payment gateway: ${paymentGateway}${paymentDetail}`);
  if (businessTools || otherAutomation) {
    const combinedIntegrations = [businessTools, otherAutomation].filter(Boolean).join('; ');
    lines.push(`• Other integrations: ${combinedIntegrations}`);
  }
  if (domainHostingStatus) lines.push(`• Domain / hosting status: ${domainHostingStatus}`);
  lines.push('');

  // Timeline & Support
  lines.push('*TIMELINE & SUPPORT*');
  if (launchDate) lines.push(`• Preferred launch date: ${launchDate}`);
  if (budgetRange) lines.push(`• Budget range provided: ${budgetRange}`);
  if (supportTier) lines.push(`• Post-launch support: ${supportTier}`);
  lines.push('');

  // Project Notes
  if (keyPriority || additionalNotes) {
    lines.push('*PROJECT NOTES*');
    if (keyPriority) lines.push(`• Most important requirement: ${keyPriority}`);
    if (additionalNotes) lines.push(`• Additional notes: ${additionalNotes}`);
    lines.push('');
  }

  lines.push('Thank you for considering STUZEN TECHNOLOGIES.');
  lines.push('');
  lines.push('Learn. Build. Innovate.');

  return lines.join('\n');
}

/**
 * Encodes the WhatsApp handover message into an official wa.me share URL
 * @param {Object} discoveryData
 * @returns {string} Encoded WhatsApp URL
 */
export function getWhatsAppShareUrl(discoveryData = {}) {
  const message = generateWhatsAppMessage(discoveryData);
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default {
  generateWhatsAppMessage,
  getWhatsAppShareUrl
};

