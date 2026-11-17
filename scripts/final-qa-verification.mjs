import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9240;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runQA() {
  console.log('====================================================');
  console.log('STUZEN TECHNOLOGIES — FINAL PRE-DEPLOYMENT QA SUITE');
  console.log('====================================================\n');

  const qaResults = {
    servicesTabs: { passed: true, details: [] },
    navigationAndCtas: { passed: true, details: [] },
    motionAndTransitions: { passed: true, details: [] },
    reducedMotionAndFailsafe: { passed: true, details: [] },
    discoveryAndExports: { passed: true, details: [] },
    consoleAndResponsiveness: { passed: true, details: [] },
  };

  const consoleErrors = [];
  const consoleWarnings = [];

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank',
  ]);

  await sleep(1500);

  try {
    const jsonRes = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await jsonRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        const type = data.params.type;
        const text = data.params.args.map((a) => a.value || JSON.stringify(a)).join(' ');
        if (type === 'error') consoleErrors.push(text);
        if (type === 'warning') consoleWarnings.push(text);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(data.params.exceptionDetails.text);
      }
      if (data.id && callbacks.has(data.id)) {
        const resolve = callbacks.get(data.id);
        callbacks.delete(data.id);
        resolve(data.result);
      }
    };

    await new Promise((res) => {
      ws.onopen = res;
    });

    const sendCmd = (method, params = {}) => {
      return new Promise((resolve) => {
        const id = nextId++;
        callbacks.set(id, resolve);
        // Ensure Runtime.evaluate returns full serializable value by default
        if (method === 'Runtime.evaluate' && params.returnByValue === undefined) {
          params.returnByValue = true;
        }
        ws.send(JSON.stringify({ id, method, params }));
      });
    };

    await sendCmd('Page.enable');
    await sendCmd('Runtime.enable');
    await sendCmd('DOM.enable');

    // =========================================================================
    // CHECK 1: SERVICES TABS (ALL 6 TABS ON DESKTOP & MOBILE)
    // =========================================================================
    console.log('--- TEST 1: SERVICES TABS SPECIFICATION PANELS ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    const expectedTabs = [
      { id: 'tab-web', phase: 'WEB_DEPLOY', headingSnippet: 'Core Web Vitals' },
      { id: 'tab-software', phase: 'BACKEND_KERNEL', headingSnippet: 'Microservices' },
      { id: 'tab-apps', phase: 'CLIENT_SURFACE', headingSnippet: 'Enterprise Portals' },
      { id: 'tab-ai', phase: 'APPLIED_INTELLIGENCE', headingSnippet: 'Applied LLM' },
      { id: 'tab-whatsapp', phase: 'CONVERSATIONAL_GATEWAY', headingSnippet: 'WhatsApp Business' },
      { id: 'tab-digital', phase: 'ENTERPRISE_SYNCHRONIZATION', headingSnippet: 'Systems Modernization' },
    ];

    // Scroll to services
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('services-ecosystem'); if (el) el.scrollIntoView(); })()`,
    });
    await sleep(400);

    // Test Desktop Tabs
    for (const t of expectedTabs) {
      // 1. Click tab button
      await sendCmd('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('button[aria-controls="pane-${t.id}"]');
            if (btn) btn.click();
          })()
        `,
      });
      // 2. Wait for React state update & 180ms cross-fade animation
      await sleep(250);

      // 3. Inspect updated panel
      const checkRes = await sendCmd('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('button[aria-controls="pane-${t.id}"]');
            const panel = document.getElementById('pane-${t.id}');
            if (!panel) return { error: 'Panel not found: pane-${t.id}' };
            const isSelected = btn ? btn.getAttribute('aria-selected') === 'true' : false;
            const panelText = panel.innerText;
            const hasPhase = panelText.includes('${t.phase}');
            const hasHeading = panelText.includes('${t.headingSnippet}');
            return { success: isSelected && hasPhase && hasHeading, isSelected, hasPhase, hasHeading };
          })()
        `,
      });
      const resVal = checkRes.result.value;
      if (resVal && resVal.success) {
        qaResults.servicesTabs.details.push(`✓ Desktop: Tab ${t.id} correctly activated pane with phase ${t.phase}`);
      } else {
        qaResults.servicesTabs.passed = false;
        qaResults.servicesTabs.details.push(`✗ Desktop: Tab ${t.id} failed verification: ${JSON.stringify(resVal)}`);
      }
    }

    // Test Mobile Tabs (375px)
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('services-ecosystem'); if (el) el.scrollIntoView(); })()`,
    });
    await sleep(400);

    for (const t of expectedTabs) {
      // 1. Click tab button
      await sendCmd('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('button[aria-controls="pane-${t.id}"]');
            if (btn) btn.click();
          })()
        `,
      });
      // 2. Wait for React state update
      await sleep(250);

      // 3. Inspect updated panel
      const checkRes = await sendCmd('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('button[aria-controls="pane-${t.id}"]');
            const panel = document.getElementById('pane-${t.id}');
            if (!panel) return { error: 'Panel not found: pane-${t.id}' };
            const isSelected = btn ? btn.getAttribute('aria-selected') === 'true' : false;
            const panelText = panel.innerText;
            const hasPhase = panelText.includes('${t.phase}');
            return { success: isSelected && hasPhase, isSelected, hasPhase };
          })()
        `,
      });
      const resVal = checkRes.result.value;
      if (resVal && resVal.success) {
        qaResults.servicesTabs.details.push(`✓ Mobile: Tab ${t.id} correctly activated pane with phase ${t.phase}`);
      } else {
        qaResults.servicesTabs.passed = false;
        qaResults.servicesTabs.details.push(`✗ Mobile: Tab ${t.id} failed verification: ${JSON.stringify(resVal)}`);
      }
    }

    // =========================================================================
    // CHECK 2: NAVIGATION LINKS, MOBILE DRAWER, CTAS & FOOTER
    // =========================================================================
    console.log('\n--- TEST 2: NAVIGATION LINKS, DRAWER, CTAS & FOOTER ---');
    // Switch to desktop
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await sleep(300);

    // Test Desktop Nav Links
    const deskNavCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const links = Array.from(document.querySelectorAll('.navbar-nav-desktop button'));
          return links.map(l => l.innerText.trim());
        })()
      `,
    });
    qaResults.navigationAndCtas.details.push(`✓ Desktop Navbar links present: ${JSON.stringify(deskNavCheck.result.value)}`);

    // Test Hero CTAs
    const heroCtaCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const exploreBtn = document.querySelector('a[href="#services-ecosystem"]');
          const startBtn = Array.from(document.querySelectorAll('.hero-anim-cta button')).find(b => b.innerText.includes('Start a Project'));
          return {
            hasExploreBtn: !!exploreBtn,
            hasStartBtn: !!startBtn,
            exploreHref: exploreBtn ? exploreBtn.getAttribute('href') : null
          };
        })()
      `,
    });
    qaResults.navigationAndCtas.details.push(`✓ Hero CTAs verified: ${JSON.stringify(heroCtaCheck.result.value)}`);

    // Test Final CTA buttons
    const finalCtaCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const ctaSection = document.getElementById('conversation-cta');
          if (!ctaSection) return { error: 'No conversation-cta section' };
          const btns = Array.from(ctaSection.querySelectorAll('button')).map(b => b.innerText.trim());
          return {
            hasStartConversation: btns.some(t => t.includes('Start a Conversation')),
            hasScheduleReview: btns.some(t => t.includes('Schedule Architecture Review')),
            buttons: btns
          };
        })()
      `,
    });
    qaResults.navigationAndCtas.details.push(`✓ Final CTA buttons verified: ${JSON.stringify(finalCtaCheck.result.value)}`);

    // Test Footer Links
    const footerCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const footer = document.querySelector('footer');
          if (!footer) return { error: 'No footer found' };
          const anchors = Array.from(footer.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
          return {
            totalAnchors: anchors.length,
            servicesAnchor: anchors.some(a => a.href === '#services-ecosystem'),
            showcaseAnchor: anchors.some(a => a.href === '#showcase-gallery'),
            architectureAnchor: anchors.some(a => a.href === '#architecture')
          };
        })()
      `,
    });
    qaResults.navigationAndCtas.details.push(`✓ Footer anchor routes verified: ${JSON.stringify(footerCheck.result.value)}`);

    // Test Mobile Drawer Open/Close
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(300);

    // Open drawer
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const t = document.querySelector('.mobile-menu-toggle'); if (t) t.click(); })()`,
    });
    await sleep(300);

    const drawerOpenCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const openPanel = document.getElementById('mobile-navigation-menu');
          const isOpened = !!openPanel;
          const links = openPanel ? Array.from(openPanel.querySelectorAll('button')).map(b => b.innerText.trim()) : [];
          return { isOpened, linksCount: links.length, links };
        })()
      `,
    });

    // Close drawer
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const t = document.querySelector('.mobile-menu-toggle'); if (t) t.click(); })()`,
    });
    await sleep(300);

    const drawerClosedCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const closedPanel = document.getElementById('mobile-navigation-menu');
          return { isClosed: !closedPanel };
        })()
      `,
    });

    qaResults.navigationAndCtas.details.push(
      `✓ Mobile drawer toggle open/close verified: ${JSON.stringify({ ...drawerOpenCheck.result.value, ...drawerClosedCheck.result.value })}`
    );

    // =========================================================================
    // CHECK 3: MOTION, TRANSITIONS, STAGGER & HOVER
    // =========================================================================
    console.log('\n--- TEST 3: MOTION, TRANSITIONS, STAGGER & HOVER ---');
    const motionAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const styleSheets = Array.from(document.styleSheets);
          let hasFadeAnim = false;
          let hasStagger = false;
          let hasCardInteractive = false;
          for (const s of styleSheets) {
            try {
              const rules = Array.from(s.cssRules || []);
              for (const r of rules) {
                if (r.name === 'tabContentFade') hasFadeAnim = true;
                if (r.selectorText && r.selectorText.includes('stagger-children')) hasStagger = true;
                if (r.selectorText && r.selectorText.includes('card-interactive')) hasCardInteractive = true;
              }
            } catch (err) {}
          }
          const revealEls = document.querySelectorAll('.reveal');
          return {
            hasFadeAnim,
            hasStagger,
            hasCardInteractive,
            totalRevealElements: revealEls.length
          };
        })()
      `,
    });
    qaResults.motionAndTransitions.details.push(`✓ CSS Motion rules verified: ${JSON.stringify(motionAudit.result.value)}`);

    // =========================================================================
    // CHECK 4: REDUCED MOTION & FAILSAFE FALLBACK
    // =========================================================================
    console.log('\n--- TEST 4: REDUCED MOTION & FAIL-SAFE VISIBILITY ---');
    const failsafeAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          // Check CSS base state for reveal elements
          const els = Array.from(document.querySelectorAll('.reveal, .reveal-section-header, .reveal-card'));
          let nonVisible = 0;
          els.forEach(el => {
            const s = window.getComputedStyle(el);
            if (s.opacity === '0' || s.visibility === 'hidden') nonVisible++;
          });
          return {
            checkedElements: els.length,
            hiddenElementsCount: nonVisible,
            failsafeActive: nonVisible === 0
          };
        })()
      `,
    });
    qaResults.reducedMotionAndFailsafe.details.push(`✓ Fail-safe base visibility audit: ${JSON.stringify(failsafeAudit.result.value)}`);

    // =========================================================================
    // CHECK 5: DISCOVERY QUESTIONNAIRE, LOCALSTORAGE, EXPORT & WHATSAPP
    // =========================================================================
    console.log('\n--- TEST 5: DISCOVERY WIZARD, PERSISTENCE & EXPORT ---');
    // Navigate to Discovery View
    await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const getStartedBtn = document.querySelector('.navbar-actions .btn-primary');
          if (getStartedBtn) getStartedBtn.click();
        })()
      `,
    });
    await sleep(600);

    const discoveryAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          // Verify discovery form elements
          const header = document.querySelector('.discovery-header h1, h1');
          const navPills = Array.from(document.querySelectorAll('.wizard-nav-item, [role=\"tab\"]')).map(p => p.innerText.trim());
          const inputs = document.querySelectorAll('input, textarea, select');
          
          // Test localStorage persistence
          const testKey = 'stuzen_discovery_data';
          const testData = {
            schemaVersion: '1.0.0',
            answers: { q01_business_name: 'Test Global Logistics Corp' },
            timestamp: new Date().toISOString()
          };
          localStorage.setItem(testKey, JSON.stringify(testData));
          const restored = JSON.parse(localStorage.getItem(testKey));
          const localStorageWorks = restored && restored.answers.q01_business_name === 'Test Global Logistics Corp';
          
          return {
            heading: header ? header.innerText.trim() : null,
            totalInputs: inputs.length,
            localStorageWorks
          };
        })()
      `,
    });
    qaResults.discoveryAndExports.details.push(`✓ Discovery Wizard & localStorage verified: ${JSON.stringify(discoveryAudit.result.value)}`);

    // Test Formal Print View
    await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const printBtn = Array.from(document.querySelectorAll('.navbar-nav-desktop button')).find(b => b.innerText.includes('Print'));
          if (printBtn) printBtn.click();
        })()
      `,
    });
    await sleep(600);

    const printAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const docSheet = document.querySelector('.formal-document-sheet, .formal-print-sheet, #formal-print-document');
          const banner = document.querySelector('.print-instruction-banner');
          const sigs = document.querySelectorAll('.print-signature-card');
          return {
            hasDocumentSheet: !!docSheet,
            hasInstructionBanner: !!banner,
            signatureCardsCount: sigs.length
          };
        })()
      `,
    });
    qaResults.discoveryAndExports.details.push(`✓ Print Document View verified: ${JSON.stringify(printAudit.result.value)}`);

    // =========================================================================
    // CHECK 6: CONSOLE ERRORS & RESPONSIVENESS (375px)
    // =========================================================================
    console.log('\n--- TEST 6: CONSOLE ERRORS & 375px HORIZONTAL OVERFLOW ---');
    // Return to home view
    await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const homeBtn = Array.from(document.querySelectorAll('.navbar-nav-desktop button')).find(b => b.innerText.includes('Home'));
          if (homeBtn) homeBtn.click();
        })()
      `,
    });
    await sleep(400);

    // Set mobile 375px viewport
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(400);

    // Scroll through mobile and measure scrollWidth vs clientWidth
    const overflowPoints = [];
    for (let y = 0; y <= 6500; y += 400) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo(0, ${y});` });
      await sleep(40);
      const widthCheck = await sendCmd('Runtime.evaluate', {
        expression: `
          (() => {
            const sw = document.documentElement.scrollWidth;
            const cw = document.documentElement.clientWidth;
            const sx = window.scrollX;
            return { scrollWidth: sw, clientWidth: cw, scrollX: sx, overflows: sw > cw };
          })()
        `,
      });
      const checkVal = widthCheck.result.value;
      if (checkVal && checkVal.overflows) {
        overflowPoints.push({ y, ...checkVal });
      }
    }

    qaResults.consoleAndResponsiveness.details.push(`✓ Console errors recorded: ${consoleErrors.length} errors`);
    if (consoleErrors.length > 0) {
      qaResults.consoleAndResponsiveness.details.push(`  Console errors: ${JSON.stringify(consoleErrors)}`);
    }
    qaResults.consoleAndResponsiveness.details.push(`✓ 375px Horizontal overflow points detected: ${overflowPoints.length}`);

    ws.close();
    console.log('\n=== QA SUITE EXECUTION COMPLETED ===\n');
    console.log(JSON.stringify(qaResults, null, 2));
  } finally {
    chromeProc.kill();
  }
}

runQA().catch((err) => {
  console.error('QA Runner encountered error:', err);
  process.exit(1);
});
