import {
  QUESTIONS,
  SECTIONS,
  METADATA_FIELDS,
  MATERIALS_ITEMS,
  ACKNOWLEDGEMENT_TEXT,
  FOOTER_TEXT,
  createInitialDiscoveryState,
  calculateCompletion,
  generateInternalSummaryFromAnswers,
  DEMO_DISCOVERY_DATA,
  formatExportData
} from '../src/data/questionnaireSchema.js';

console.log('=== PHASE 3 VERIFICATION SUITE ===');

// 1. Question count test
console.log(`Checking question count: expected 45, found ${QUESTIONS.length}`);
if (QUESTIONS.length !== 45) {
  throw new Error(`Expected 45 questions, but got ${QUESTIONS.length}`);
}

// 2. Question number sequence test
const numbers = QUESTIONS.map((q) => q.number);
for (let i = 1; i <= 45; i++) {
  if (!numbers.includes(i)) {
    throw new Error(`Missing question number ${i}`);
  }
}
console.log('✓ All 45 question numbers 1..45 exist in exact sequence.');

// 3. Section count & question distribution test
console.log(`Checking sections count: expected 10, found ${SECTIONS.length}`);
if (SECTIONS.length !== 10) {
  throw new Error(`Expected 10 sections, but got ${SECTIONS.length}`);
}

const totalSectionQuestions = SECTIONS.reduce((sum, s) => sum + s.questionCount, 0);
console.log(`Total questions across sections: ${totalSectionQuestions}`);
if (totalSectionQuestions !== 45) {
  throw new Error(`Sum of section question counts is ${totalSectionQuestions}, expected 45`);
}
console.log('✓ All 10 sections correctly map to exactly 45 questions.');

// 4. Test initial discovery state
const initial = createInitialDiscoveryState();
console.log(`Initial state answers count: ${Object.keys(initial.answers).length}`);
const initialComp = calculateCompletion(initial.answers);
console.log('Initial completion:', initialComp);
if (initialComp.answered !== 0 || initialComp.percentage !== 0 || initialComp.total !== 45 || initialComp.remaining !== 45) {
  throw new Error('Initial completion calculation failed');
}
console.log('✓ Initial state has 0% completion out of 45 questions.');

// 5. Test Demo Data completion
const demoComp = calculateCompletion(DEMO_DISCOVERY_DATA.answers);
console.log('Demo completion:', demoComp);
if (demoComp.answered !== 45 || demoComp.percentage !== 100 || demoComp.remaining !== 0) {
  throw new Error(`Demo data completion expected 45/45 (100%), got ${demoComp.answered}/45 (${demoComp.percentage}%)`);
}
console.log('✓ Demo data satisfies 100% completion across all 45 questions.');

// 6. Test Automatic Summary Generation
const summary = generateInternalSummaryFromAnswers(DEMO_DISCOVERY_DATA.answers, DEMO_DISCOVERY_DATA.metadata);
console.log('Generated summary keys:', Object.keys(summary));
if (!summary.summaryA || !summary.summaryB || !summary.summaryC || !summary.summaryD || !summary.summaryE) {
  throw new Error('Summary generation failed to produce sections A-E');
}
if ('summaryF' in summary) {
  throw new Error('CRITICAL: Section F must NEVER be automatically generated!');
}
console.log('✓ Summary generates sections A-E and strictly excludes Section F.');

// 7. Test Export Data Format
const exportData = formatExportData(DEMO_DISCOVERY_DATA);
console.log('Export data keys:', Object.keys(exportData));
const requiredExportKeys = [
  'schemaVersion',
  'exportTimestamp',
  'acknowledgement',
  'footer',
  'metadata',
  'completion',
  'answers',
  'materials',
  'internalSummary',
  'signatures'
];
for (const key of requiredExportKeys) {
  if (!(key in exportData)) {
    throw new Error(`Export data missing key: ${key}`);
  }
}
console.log('✓ Export data structure contains all mandatory groups.');

// 8. Test Acknowledgement and Footer Text
if (!ACKNOWLEDGEMENT_TEXT.includes('This form records the initial requirements discussed')) {
  throw new Error('Acknowledgement text mismatch');
}
if (!FOOTER_TEXT.includes('STUZEN TECHNOLOGIES • Learn. Build. Innovate.')) {
  throw new Error('Footer text mismatch');
}
console.log('✓ Legal acknowledgement and formal footer text verified.');

console.log('=== ALL PHASE 3 VERIFICATIONS PASSED ===');

