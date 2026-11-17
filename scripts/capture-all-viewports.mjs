import { spawn } from 'child_process';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\murug\\.gemini\\antigravity\\brain\\f0009ece-df6f-432e-84d5-de82eab6365d';
const port = 9228;

function safeWrite(fileName, buffer) {
  const fullPath = join(artifactDir, fileName);
  try {
    if (existsSync(fullPath)) {
      try { unlinkSync(fullPath); } catch {}
    }
    writeFileSync(fullPath, buffer);
    console.log(`Saved: ${fileName}`);
  } catch (err) {
    console.error(`Error saving ${fileName}:`, err.message);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runCapture() {
  console.log('=== STARTING HIGH-FIDELITY SCREENSHOT & AUDIT SUITE ===');

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
    // 1. DESKTOP 1440px VIEWPORT & SECTIONS
    // =========================================================================
    console.log('\n--- 1. DESKTOP 1440px CAPTURES ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Initial smooth scroll sweep to initialize all reveal observers
    for (let y = 400; y <= 5500; y += 500) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(80);
    }
    await sleep(600);

    // CRITICAL: Reset scroll to top BEFORE capturing full-page screenshot
    // This prevents Chrome's CDP captureBeyondViewport from rendering sticky header at intermediate y-offsets
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);

    console.log('Capturing desktop_1440_fullpage.png...');
    const deskFull = await sendCmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    safeWrite('desktop_1440_fullpage.png', Buffer.from(deskFull.data, 'base64'));

    // Desktop In-Viewport: Section 1 (Hero)
    console.log('Capturing desktop_hero.png...');
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);
    const dHero = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_hero.png', Buffer.from(dHero.data, 'base64'));

    // Desktop In-Viewport: Section 2 (Services)
    console.log('Capturing desktop_services.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('services-ecosystem'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dServices = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_services.png', Buffer.from(dServices.data, 'base64'));

    // Desktop In-Viewport: Section 3 (Showcase)
    console.log('Capturing desktop_showcase.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('showcase-gallery'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dShowcase = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_showcase.png', Buffer.from(dShowcase.data, 'base64'));

    // Desktop In-Viewport: Section 4 (Analytics)
    console.log('Capturing desktop_analytics.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('analytics'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dAnalytics = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_analytics.png', Buffer.from(dAnalytics.data, 'base64'));

    // Desktop In-Viewport: Section 5 (AI & WhatsApp)
    console.log('Capturing desktop_ai_whatsapp.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('ai-and-whatsapp'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dAiWa = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_ai_whatsapp.png', Buffer.from(dAiWa.data, 'base64'));

    // Desktop In-Viewport: Section 6 (Architecture)
    console.log('Capturing desktop_architecture.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('architecture'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dArch = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_architecture.png', Buffer.from(dArch.data, 'base64'));

    // Desktop In-Viewport: Section 7 (CTA & Footer)
    console.log('Capturing desktop_cta_footer.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('conversation-cta'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const dCta = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('desktop_cta_footer.png', Buffer.from(dCta.data, 'base64'));

    // =========================================================================
    // 2. MOBILE 375px VIEWPORT & SECTIONS
    // =========================================================================
    console.log('\n--- 2. MOBILE 375px CAPTURES (CSS 375 x 812) ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Initial smooth scroll sweep to trigger reveal observers on mobile
    for (let y = 300; y <= 6500; y += 400) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(60);
    }
    await sleep(600);

    // Check for any duplicate section IDs or content duplication
    const dupCheck = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const ids = Array.from(document.querySelectorAll('section[id]')).map(s => s.id);
          const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
          const sections = Array.from(document.querySelectorAll('.agency-home-view > section')).map(s => {
            const h = s.querySelector('h1, h2');
            return { id: s.id, heading: h ? h.textContent.trim() : 'NO_HEADING' };
          });
          return JSON.stringify({ sectionCount: sections.length, duplicates, sections });
        })()
      `
    });
    console.log('DOM Section Duplication Check:', JSON.parse(dupCheck.result.value));

    // Reset scroll to top BEFORE capturing full-page mobile screenshot
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);

    console.log('Capturing mobile_375_fullpage.png...');
    const mobFull = await sendCmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    safeWrite('mobile_375_fullpage.png', Buffer.from(mobFull.data, 'base64'));

    // Mobile Section 1: Hero
    console.log('Capturing mobile_hero.png...');
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);
    const mHero = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_hero.png', Buffer.from(mHero.data, 'base64'));

    // Mobile Section 2: Services
    console.log('Capturing mobile_services.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('services-ecosystem'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mServices = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_services.png', Buffer.from(mServices.data, 'base64'));

    // Mobile Section 3: Showcase
    console.log('Capturing mobile_showcase.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('showcase-gallery'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mShowcase = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_showcase.png', Buffer.from(mShowcase.data, 'base64'));

    // Mobile Section 4: Analytics
    console.log('Capturing mobile_analytics.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('analytics'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mAnalytics = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_analytics.png', Buffer.from(mAnalytics.data, 'base64'));

    // Mobile Section 5: AI & WhatsApp
    console.log('Capturing mobile_ai_whatsapp.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('ai-and-whatsapp'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mAiWa = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_ai_whatsapp.png', Buffer.from(mAiWa.data, 'base64'));

    // Mobile Section 6: Architecture
    console.log('Capturing mobile_architecture.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('architecture'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mArch = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_architecture.png', Buffer.from(mArch.data, 'base64'));

    // Mobile Section 7: CTA & Footer
    console.log('Capturing mobile_cta_footer.png...');
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const el = document.getElementById('conversation-cta'); if (el) el.scrollIntoView(); })()`
    });
    await sleep(400);
    const mCta = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_cta_footer.png', Buffer.from(mCta.data, 'base64'));

    // =========================================================================
    // 3. INTERACTIVE CONTROLS & NAVBAR AUDIT
    // =========================================================================
    console.log('\n--- 3. TESTING MOBILE NAVBAR & DRAWER ---');
    // Scroll to top
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(300);

    // Open mobile hamburger menu
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const t = document.querySelector('.mobile-menu-toggle'); if (t) t.click(); })()`
    });
    await sleep(400);

    console.log('Capturing mobile_drawer_open.png...');
    const mDrawer = await sendCmd('Page.captureScreenshot', { format: 'png' });
    safeWrite('mobile_drawer_open.png', Buffer.from(mDrawer.data, 'base64'));

    // Check drawer bounds vs navbar
    const drawerAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const nav = document.querySelector('.site-header');
          const panel = document.getElementById('mobile-navigation-menu');
          const navRect = nav ? nav.getBoundingClientRect() : null;
          const panelRect = panel ? panel.getBoundingClientRect() : null;
          const links = panel ? Array.from(panel.querySelectorAll('button')).map(b => b.textContent.trim()) : [];
          return JSON.stringify({
            headerPosition: window.getComputedStyle(nav).position,
            headerTop: navRect ? navRect.top : null,
            headerHeight: navRect ? navRect.height : null,
            panelVisible: !!panel,
            linksCount: links.length,
            links
          });
        })()
      `
    });
    console.log('Mobile Drawer Audit:', JSON.parse(drawerAudit.result.value));

    // Close menu again
    await sendCmd('Runtime.evaluate', {
      expression: `(() => { const t = document.querySelector('.mobile-menu-toggle'); if (t) t.click(); })()`
    });
    await sleep(400);

    // Test sticky navbar behavior while scrolling to Architecture section
    const stickyAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const arch = document.getElementById('architecture');
          arch.scrollIntoView({ behavior: 'instant', block: 'start' });
          const header = document.querySelector('.site-header');
          const headerRect = header.getBoundingClientRect();
          const archRect = arch.getBoundingClientRect();
          const scrollMarginTop = window.getComputedStyle(arch).scrollMarginTop;
          return JSON.stringify({
            scrollY: window.scrollY,
            headerTop: headerRect.top,
            headerBottom: headerRect.bottom,
            headerHeight: headerRect.height,
            archTop: archRect.top,
            scrollMarginTop,
            headerOverlapsArchHeading: headerRect.bottom > archRect.top + 2
          });
        })()
      `
    });
    console.log('Sticky Navbar Scroll Audit:', JSON.parse(stickyAudit.result.value));

    ws.close();
    console.log('\n=== ALL CAPTURES AND VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } finally {
    chromeProc.kill();
  }
}

runCapture().catch(console.error);
