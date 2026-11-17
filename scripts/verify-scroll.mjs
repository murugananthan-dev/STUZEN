import { spawn } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\murug\\.gemini\\antigravity\\brain\\f0009ece-df6f-432e-84d5-de82eab6365d';
const port = 9225;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runVerification() {
  console.log('--- STARTING CHROME AUTOMATION VIA CDP ---');

  // Spawn Chrome with debugging port
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await sleep(1500);

  try {
    const jsonRes = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await jsonRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    console.log('Connected to Chrome WebSocket:', wsUrl);

    const ws = new WebSocket(wsUrl);

    let nextId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
        ws.send(JSON.stringify({ id, method, params }));
      });
    };

    await sendCmd('Page.enable');
    await sendCmd('Runtime.enable');
    await sendCmd('DOM.enable');

    // =========================================================================
    // TEST 1: MOBILE SCROLLING VERIFICATION (375px)
    // =========================================================================
    console.log('\n=== RUNNING TEST 1: MOBILE 375px SCROLLING & VISIBILITY ===');

    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    // 1. Load the homepage
    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Initial check at top of page
    let audit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const sections = Array.from(document.querySelectorAll('section'));
          const sectionDetails = sections.map((sec, idx) => ({
            index: idx + 1,
            id: sec.id || 'section-' + (idx + 1),
            visibleTextLength: sec.innerText.trim().length,
            headingsCount: sec.querySelectorAll('h1, h2, h3').length,
            cardsCount: sec.querySelectorAll('.bg-surface-container-low, .bg-surface-container-lowest').length,
            opacity: window.getComputedStyle(sec).opacity
          }));
          return JSON.stringify({ sectionDetails });
        })()
      `,
    });
    console.log('Mobile Initial Load Audit:', JSON.parse(audit.result.value));

    // 2. Scroll slowly through every section (step by step)
    console.log('Scrolling slowly down through mobile sections...');
    for (let y = 300; y <= 5000; y += 400) {
      await sendCmd('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });`,
      });
      await sleep(150);
    }
    await sleep(1000);

    // 3. Confirm all text, cards, images, charts, and buttons are visible
    audit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const allCardsAndHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, p, button, a, img, svg, .rounded-xl, .rounded-2xl')
          );
          let hiddenCount = 0;
          let hiddenSamples = [];

          allCardsAndHeadings.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (style.opacity === '0' || style.visibility === 'hidden') {
              hiddenCount++;
              if (hiddenSamples.length < 5) {
                hiddenSamples.push(el.tagName + ' class=' + el.className);
              }
            }
          });

          return JSON.stringify({
            totalElementsChecked: allCardsAndHeadings.length,
            hiddenElementsCount: hiddenCount,
            hiddenSamples
          });
        })()
      `,
    });
    console.log('Mobile After Downward Scroll Audit:', JSON.parse(audit.result.value));

    // 4. Scroll back to top and down again
    console.log('Scrolling back to top and down again...');
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'smooth' });` });
    await sleep(800);
    for (let y = 600; y <= 5000; y += 600) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(150);
    }
    await sleep(800);

    // 5. Confirm no section disappears or remains blank
    audit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const sections = Array.from(document.querySelectorAll('section'));
          const blankSections = sections.filter(sec => sec.innerText.trim().length === 0);
          return JSON.stringify({
            totalSections: sections.length,
            blankSectionsCount: blankSections.length
          });
        })()
      `,
    });
    console.log('Mobile Return & Re-scroll Audit:', JSON.parse(audit.result.value));

    // 6. Refresh the page and repeat
    console.log('Reloading page to test fresh mount...');
    await sendCmd('Page.reload');
    await sleep(2000);

    // Scroll through again
    for (let y = 400; y <= 5000; y += 500) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(150);
    }
    await sleep(1000);

    // Capture Full-Page Mobile Screenshot
    console.log('Capturing FULL-PAGE Mobile Screenshot (375px)...');
    const mobileShot = await sendCmd('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    const mobilePath = join(artifactDir, 'mobile_375_fullpage.png');
    writeFileSync(mobilePath, Buffer.from(mobileShot.data, 'base64'));
    console.log('✓ Saved:', mobilePath);

    // =========================================================================
    // TEST 2: DESKTOP VERIFICATION (1440px)
    // =========================================================================
    console.log('\n=== RUNNING TEST 2: DESKTOP 1440px VERIFICATION ===');

    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Scroll slowly down and up on desktop
    for (let y = 400; y <= 5000; y += 400) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(150);
    }
    await sleep(1000);

    const desktopAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, button, a, img, svg, .rounded-xl, .rounded-2xl'));
          let hidden = 0;
          elements.forEach(el => {
            const s = window.getComputedStyle(el);
            if (s.opacity === '0' || s.visibility === 'hidden') hidden++;
          });
          return JSON.stringify({
            totalChecked: elements.length,
            hiddenCount: hidden
          });
        })()
      `,
    });
    console.log('Desktop Scroll Audit:', JSON.parse(desktopAudit.result.value));

    // Capture Full-Page Desktop Screenshot
    console.log('Capturing FULL-PAGE Desktop Screenshot (1440px)...');
    const desktopShot = await sendCmd('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    const desktopPath = join(artifactDir, 'desktop_1440_fullpage.png');
    writeFileSync(desktopPath, Buffer.from(desktopShot.data, 'base64'));
    console.log('✓ Saved:', desktopPath);

    ws.close();
    console.log('\n=== ALL TESTS & SCREENSHOTS COMPLETED SUCCESSFULLY ===');
  } finally {
    chromeProc.kill();
  }
}

runVerification().catch(console.error);

