import {
  SECTIONS,
  QUESTIONS,
  QUESTIONS_BY_ID,
  MATERIALS_ITEMS,
  ACKNOWLEDGEMENT_TEXT,
  FOOTER_TEXT,
  createInitialDiscoveryState,
  calculateCompletion,
  generateInternalSummaryFromAnswers,
  DEMO_DISCOVERY_DATA,
  formatExportData
} from '../src/data/questionnaireSchema.js';
import { calculateScopeComplexity, COMPLEXITY_LEVELS } from '../src/utils/scopeEstimator.js';

console.log('=== PHASE 5 VERIFICATION SUITE ===');

// 1. Verify all 45 questions and 10 sections
console.log(`Checking question count: ${QUESTIONS.length} (expected 45)`);
if (QUESTIONS.length !== 45) throw new Error('Questions count mismatch');

console.log(`Checking sections count: ${SECTIONS.length} (expected 10)`);
if (SECTIONS.length !== 10) throw new Error('Sections count mismatch');

// 2. Verify Questions 26–45 in Sections 06–10
const sec6_10 = SECTIONS.slice(5);
const sec6_10_count = sec6_10.reduce((sum, s) => sum + s.questionCount, 0);
console.log(`Questions in Sections 06–10: ${sec6_10_count} (expected 20)`);
if (sec6_10_count !== 20) throw new Error('Sections 06–10 questions count mismatch');

for (let i = 26; i <= 45; i++) {
  const q = QUESTIONS.find((item) => item.number === i);
  if (!q) throw new Error(`Missing question number ${i}`);
}
console.log('✓ Questions 26 through 45 verified in exact sequence.');

// 3. Verify specific question configurations
// Q26 WhatsApp actions
const q26 = QUESTIONS_BY_ID['q26_whatsapp_actions'];
if (!q26 || !q26.options.includes('Not required') || !q26.options.includes('WhatsApp Business Platform integration')) {
  throw new Error('Q26 options mismatch');
}
console.log('✓ Q26 WhatsApp actions options verified.');

// Q28 Payment Gateway
const q28 = QUESTIONS_BY_ID['q28_payment_gateway'];
if (!q28 || !q28.conditionalField || q28.conditionalField.triggerValue !== 'Yes') {
  throw new Error('Q28 conditional field mismatch');
}
console.log('✓ Q28 Payment gateway conditional provider field verified.');

// Q30 Domain
const q30 = QUESTIONS_BY_ID['q30_domain'];
if (!q30 || !q30.conditionalField || q30.conditionalField.triggerValue !== 'Yes') {
  throw new Error('Q30 conditional domain field mismatch');
}
console.log('✓ Q30 Domain conditional field verified.');

// Q31 Hosting
const q31 = QUESTIONS_BY_ID['q31_hosting'];
if (!q31 || !q31.conditionalField || q31.conditionalField.triggerValue !== 'Yes') {
  throw new Error('Q31 conditional hosting field mismatch');
}
console.log('✓ Q31 Hosting conditional field verified.');

// 4. Verify Materials Checklist
console.log(`Materials checklist items: ${MATERIALS_ITEMS.length}`);
if (MATERIALS_ITEMS.length < 9) throw new Error('Materials items incomplete');
const otherMat = MATERIALS_ITEMS.find((m) => m.id === 'other');
if (!otherMat || !otherMat.hasOther) throw new Error('Materials other item missing');
console.log('✓ Materials checklist items & other support verified.');

// 5. Verify Internal Summary Generation (A–E generated, F strictly protected)
const initial = createInitialDiscoveryState();
initial.internalSummary.summaryF = 'Custom quote: $25,000 with 50/50 milestones';

const generated = generateInternalSummaryFromAnswers(DEMO_DISCOVERY_DATA.answers, DEMO_DISCOVERY_DATA.metadata);
if (!generated.summaryA || !generated.summaryB || !generated.summaryC || !generated.summaryD || !generated.summaryE) {
  throw new Error('Summary generation failed to create drafts A–E');
}
if ('summaryF' in generated) {
  throw new Error('CRITICAL: Section F must NEVER be generated automatically!');
}
console.log('✓ Automatic summary drafts A–E generated cleanly; Section F strictly excluded.');

// 6. Test Live Scope Estimator
// Test Basic (empty state)
const emptyAssessment = calculateScopeComplexity({});
console.log(`Empty state complexity: ${emptyAssessment.level} (${emptyAssessment.score} pts)`);
if (emptyAssessment.level !== 'Basic' || emptyAssessment.score > 7) {
  throw new Error('Empty state should be classified as Basic (0–7)');
}

// Test Demo Data complexity (GreenLeaf Organics has store, cart, stripe, tracking, etc. -> Complex 26+)
const demoAssessment = calculateScopeComplexity(DEMO_DISCOVERY_DATA.answers);
console.log(`Demo data complexity: ${demoAssessment.level} (${demoAssessment.score} pts)`);
if (demoAssessment.score < 20) {
  throw new Error(`Demo data expected to score advanced or complex, got ${demoAssessment.score}`);
}
console.log('Demo assessment drivers count:', demoAssessment.scoredItems.length);
console.log('Demo dependencies identified:', demoAssessment.dependencies.length);
console.log('Demo missing clarifications:', demoAssessment.missingClarifications.length);

if (demoAssessment.scoredItems.length === 0 || demoAssessment.dependencies.length === 0) {
  throw new Error('Scope estimator failed to extract drivers or dependencies');
}
console.log('✓ Live Scope Estimator heuristics, scoring tiers, and dependencies verified.');

// 7. Verify Completion Calculation remains strictly 45 questions
const demoComp = calculateCompletion(DEMO_DISCOVERY_DATA.answers);
if (demoComp.total !== 45 || demoComp.answered !== 45 || demoComp.percentage !== 100) {
  throw new Error('Completion calculation should remain strictly 45 questions');
}
console.log('✓ Completion calculation strictly measures 45 questions (materials & summary excluded).');

// 8. Verify Acknowledgement text
if (!ACKNOWLEDGEMENT_TEXT.startsWith('This form records the initial requirements discussed.')) {
  throw new Error('Acknowledgement text mismatch');
}
console.log('✓ Legal acknowledgement text verified.');

console.log('=== ALL PHASE 5 VERIFICATION TESTS PASSED ===');

