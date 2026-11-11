/**
 * STUZEN TECHNOLOGIES - Phase 6 Test Suite & Verification Script
 * Validates formal black-and-white print document, export toolbar,
 * WhatsApp handover generation, and print CSS compliance.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import utilities and schema
import {
  generateWhatsAppMessage,
  getWhatsAppShareUrl
} from '../src/utils/whatsappHandover.js';

import {
  SECTIONS,
  QUESTIONS,
  MATERIALS_ITEMS,
  INSTRUCTION_BANNER_TEXT,
  ACKNOWLEDGEMENT_TEXT,
  FOOTER_TEXT,
  DEMO_DISCOVERY_DATA,
  createInitialDiscoveryState
} from '../src/data/questionnaireSchema.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('STUZEN TECHNOLOGIES — PHASE 6 VERIFICATION TEST');
console.log('====================================================\n');

// 1. Check required Phase 6 files exist
console.log('TEST SUITE 1: Required Phase 6 Files Presence');
const requiredFiles = [
  'src/utils/whatsappHandover.js',
  'src/components/discovery/ExportToolbar.jsx',
  'src/components/discovery/FormalPrintDocument.jsx',
  'src/pages/FormalPrintView.jsx',
  'src/styles/print.css'
];

requiredFiles.forEach((file) => {
  const fullPath = path.join(rootDir, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

// 2. WhatsApp Handover Generator Test
console.log('\nTEST SUITE 2: WhatsApp Handover Message Generation');
const demoMsg = generateWhatsAppMessage(DEMO_DISCOVERY_DATA);

assert(typeof demoMsg === 'string' && demoMsg.length > 100, 'WhatsApp message generated as non-empty string');
assert(demoMsg.includes('STUZEN TECHNOLOGIES'), 'WhatsApp message contains STUZEN TECHNOLOGIES');
assert(demoMsg.includes('*CLIENT & BUSINESS*'), 'Contains *CLIENT & BUSINESS* header');
assert(demoMsg.includes('GreenLeaf Organics'), 'Contains business name GreenLeaf Organics');
assert(demoMsg.includes('Marcus Vance'), 'Contains contact person Marcus Vance');
assert(demoMsg.includes('*PROJECT OVERVIEW*'), 'Contains *PROJECT OVERVIEW* section');
assert(demoMsg.includes('*INTEGRATIONS & TECHNICAL NEEDS*'), 'Contains *INTEGRATIONS & TECHNICAL NEEDS* section');
assert(demoMsg.includes('*TIMELINE & SUPPORT*'), 'Contains *TIMELINE & SUPPORT* section');
assert(demoMsg.includes('Learn. Build. Innovate.'), 'Contains company tagline');

// Verify Section F and confidential quotation numbers are strictly omitted
assert(!demoMsg.includes('summaryF'), 'Does not leak internal summaryF key');
assert(!demoMsg.includes('INTERNAL — FOR STUZEN'), 'Does not leak internal planning label');
assert(!demoMsg.toLowerCase().includes('profit margin'), 'Omits private profit margins');

// Test wa.me URL encoding
const waUrl = getWhatsAppShareUrl(DEMO_DISCOVERY_DATA);
assert(waUrl.startsWith('https://wa.me/?text='), 'WhatsApp share URL starts with https://wa.me/?text=');
assert(waUrl.includes('GreenLeaf%20Organics'), 'WhatsApp URL properly encodes parameters');

// Test Empty State WhatsApp generation
const emptyMsg = generateWhatsAppMessage(createInitialDiscoveryState());
assert(typeof emptyMsg === 'string' && emptyMsg.length > 50, 'Handles empty discovery state safely without errors');

// 3. Schema and Document Content Assertions
console.log('\nTEST SUITE 3: Document Content & Legal Text Integrity');
assert(SECTIONS.length === 10, 'Schema contains exactly 10 sections');
assert(QUESTIONS.length === 45, 'Schema contains exactly 45 questions');
assert(MATERIALS_ITEMS.length === 9, 'Checklist contains exactly 9 materials categories');

const formalPrintDocContent = fs.readFileSync(
  path.join(rootDir, 'src/components/discovery/FormalPrintDocument.jsx'),
  'utf-8'
);

assert(
  formalPrintDocContent.includes('WEBSITE PROJECT REQUIREMENTS DISCOVERY FORM — CLIENT INTERVIEW QUESTIONNAIRE'),
  'FormalPrintDocument has exact required document heading'
);

const expectedInstructionBanner =
  'HOW TO USE THIS FORM: Use this questionnaire during the first client meeting or discovery call. Ask the questions naturally, tick the relevant options and record the client\'s answers. Not every feature is needed for every project. Confirm the final scope, quotation and delivery schedule separately before development starts.';

assert(
  INSTRUCTION_BANNER_TEXT === expectedInstructionBanner,
  'Schema defines exact required instruction banner text'
);

assert(
  formalPrintDocContent.includes('INSTRUCTION_BANNER_TEXT'),
  'FormalPrintDocument binds INSTRUCTION_BANNER_TEXT'
);

assert(
  formalPrintDocContent.includes('print-instruction-banner'),
  'FormalPrintDocument contains print-instruction-banner container'
);

assert(
  formalPrintDocContent.includes('INTERNAL — FOR STUZEN PROJECT PLANNING'),
  'FormalPrintDocument clearly marks internal summary as INTERNAL — FOR STUZEN PROJECT PLANNING'
);

assert(
  formalPrintDocContent.includes('ACKNOWLEDGEMENT & SCOPE RECORD:'),
  'FormalPrintDocument contains ACKNOWLEDGEMENT & SCOPE RECORD section'
);

assert(
  formalPrintDocContent.includes('ACKNOWLEDGEMENT_TEXT'),
  'FormalPrintDocument binds ACKNOWLEDGEMENT_TEXT'
);

assert(
  formalPrintDocContent.includes('FOOTER_TEXT'),
  'FormalPrintDocument binds FOOTER_TEXT'
);

assert(
  formalPrintDocContent.includes('CLIENT AUTHORIZED REPRESENTATIVE'),
  'FormalPrintDocument contains Client signature block'
);

assert(
  formalPrintDocContent.includes('STUZEN TECHNOLOGIES REPRESENTATIVE'),
  'FormalPrintDocument contains Stuzen Representative signature block'
);

// 4. Print CSS Specification Assertions
console.log('\nTEST SUITE 4: Print Stylesheet & Media Query Rules');
const printCssContent = fs.readFileSync(
  path.join(rootDir, 'src/styles/print.css'),
  'utf-8'
);

assert(printCssContent.includes('@page'), 'print.css defines @page rules');
assert(printCssContent.includes('size: A4 portrait'), 'print.css specifies A4 portrait layout');
assert(printCssContent.includes('@media print'), 'print.css specifies @media print rules');
assert(printCssContent.includes('.no-print'), 'print.css hides .no-print elements during print');
assert(printCssContent.includes('break-inside: avoid') || printCssContent.includes('page-break-inside: avoid'), 'print.css defines break-inside avoidance rules');
assert(printCssContent.includes('.export-toolbar-container'), 'print.css styles export toolbar container');
assert(printCssContent.includes('.formal-document-sheet'), 'print.css styles formal document sheet');

// 5. Final Report
console.log('\n====================================================');
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL PHASE 6 VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
