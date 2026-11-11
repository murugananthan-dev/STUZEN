import { SECTIONS, QUESTIONS } from '../src/data/questionnaireSchema.js';

console.log('=== PHASE 4 VERIFICATION SUITE ===');

// 1. Verify Sections 01 to 05 question distribution
const sec1_5 = SECTIONS.slice(0, 5);
const sec1_5_count = sec1_5.reduce((sum, s) => sum + s.questionCount, 0);
console.log(`Sections 01–05 total expected questions: 25, calculated: ${sec1_5_count}`);
if (sec1_5_count !== 25) {
  throw new Error(`Expected 25 questions in Sections 01–05, got ${sec1_5_count}`);
}

// 2. Verify questions mapped to sections 01–05
const activeQuestions = QUESTIONS.filter((q) => {
  const secNum = parseInt(q.sectionId.replace('section_', ''), 10);
  return secNum >= 1 && secNum <= 5;
});
console.log(`Active questions found in schema for sections 01–05: ${activeQuestions.length}`);
if (activeQuestions.length !== 25) {
  throw new Error(`Expected exactly 25 questions, got ${activeQuestions.length}`);
}

// 3. Verify numbers 1 to 25
const numbers = activeQuestions.map((q) => q.number);
for (let i = 1; i <= 25; i++) {
  if (!numbers.includes(i)) {
    throw new Error(`Missing question number ${i} in Sections 01–05`);
  }
}
console.log('✓ Questions 1 through 25 exist in exact sequence for Phase 4.');

// 4. Verify question types in Phase 4
const typeMap = {};
activeQuestions.forEach((q) => {
  typeMap[q.type] = (typeMap[q.type] || 0) + 1;
});
console.log('Question types in Sections 01–05:', typeMap);

// 5. Verify conditional questions
const q8 = QUESTIONS.find((q) => q.id === 'q8_main_purpose');
const q12 = QUESTIONS.find((q) => q.id === 'q12_website_type');
const q13 = QUESTIONS.find((q) => q.id === 'q13_pages');
const q21 = QUESTIONS.find((q) => q.id === 'q21_multiple_languages');
const q22 = QUESTIONS.find((q) => q.id === 'q22_features');

if (!q8.hasOther || !q8.otherKey) throw new Error('Q8 missing hasOther configuration');
if (!q12.hasOther || !q12.otherKey) throw new Error('Q12 missing hasOther configuration');
if (!q13.hasOther || !q13.otherKey) throw new Error('Q13 missing hasOther configuration');
if (!q21.conditionalField) throw new Error('Q21 missing conditionalField configuration');
if (!q22.hasOther || !q22.otherKey) throw new Error('Q22 missing hasOther configuration');

console.log('✓ All conditional and other fields properly defined.');

console.log('=== ALL PHASE 4 VERIFICATIONS PASSED ===');

