import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\murug\\.gemini\\antigravity\\brain\\f0009ece-df6f-432e-84d5-de82eab6365d';
const port = 9227;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runFinalVerification() {
  console.log('--- STARTING COMPREHENSIVE SCREENSHOT & SCROLL TEST ---');

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
    // 1. DESKTOP 1440px FULL-PAGE & SECTIONS
    // =========================================================================
    console.log('\n--- TESTING DESKTOP 1440px ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Scroll through to test all scroll triggers
    for (let y = 300; y <= 5000; y += 400) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(100);
    }
    await sleep(800);

    // Capture Full-Page Desktop Screenshot
    console.log('Capturing desktop_1440_fullpage.png...');
    const deskFull = await sendCmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    writeFileSync(join(artifactDir, 'desktop_1440_fullpage.png'), Buffer.from(deskFull.data, 'base64'));

    // Section 1: Hero
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);
    const s1 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section1_hero.png'), Buffer.from(s1.data, 'base64'));

    // Section 2: Services
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('services-ecosystem').scrollIntoView();` });
    await sleep(500);
    const s2 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section2_services.png'), Buffer.from(s2.data, 'base64'));

    // Test tab click on Section 2
    await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const softwareTab = Array.from(document.querySelectorAll('button[role="tab"]'))[1];
          if (softwareTab) softwareTab.click();
        })()
      `
    });
    await sleep(400);
    const s2_tab = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section2_services_software.png'), Buffer.from(s2_tab.data, 'base64'));

    // Section 3: Showcase
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('showcase-gallery').scrollIntoView();` });
    await sleep(500);
    const s3 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section3_showcase.png'), Buffer.from(s3.data, 'base64'));

    // Section 4: Analytics
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('analytics').scrollIntoView();` });
    await sleep(500);
    const s4 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section4_analytics.png'), Buffer.from(s4.data, 'base64'));

    // Section 5: AI & WhatsApp
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('ai-and-whatsapp').scrollIntoView();` });
    await sleep(500);
    const s5 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section5_ai_whatsapp.png'), Buffer.from(s5.data, 'base64'));

    // Section 6: Architecture
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('architecture').scrollIntoView();` });
    await sleep(500);
    const s6 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section6_architecture.png'), Buffer.from(s6.data, 'base64'));

    // Section 7: Final CTA
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('conversation-cta').scrollIntoView();` });
    await sleep(500);
    const s7 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'section7_cta.png'), Buffer.from(s7.data, 'base64'));

    // =========================================================================
    // 2. MOBILE 375px FULL-PAGE & SECTIONS
    // =========================================================================
    console.log('\n--- TESTING MOBILE 375px ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Scroll through slowly
    for (let y = 300; y <= 5000; y += 300) {
      await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'smooth' });` });
      await sleep(100);
    }
    await sleep(800);

    // Check hidden elements
    const mobAudit = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const els = Array.from(document.querySelectorAll('h1, h2, h3, p, button, a, img, svg, .rounded-xl, .rounded-2xl'));
          let hidden = 0;
          els.forEach(el => {
            const s = window.getComputedStyle(el);
            if (s.opacity === '0' || s.visibility === 'hidden') hidden++;
          });
          return JSON.stringify({ totalChecked: els.length, hiddenCount: hidden });
        })()
      `
    });
    console.log('Mobile Visibility Audit:', JSON.parse(mobAudit.result.value));

    // Capture Full-Page Mobile Screenshot
    console.log('Capturing mobile_375_fullpage.png...');
    const mobFull = await sendCmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    writeFileSync(join(artifactDir, 'mobile_375_fullpage.png'), Buffer.from(mobFull.data, 'base64'));

    // Mobile Section 1: Hero
    await sendCmd('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' });` });
    await sleep(400);
    const m1 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'mobile_hero.png'), Buffer.from(m1.data, 'base64'));

    // Mobile Section 2: Services
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('services-ecosystem').scrollIntoView();` });
    await sleep(400);
    const m2 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'mobile_services.png'), Buffer.from(m2.data, 'base64'));

    // Mobile Section 4: Analytics
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('analytics').scrollIntoView();` });
    await sleep(400);
    const m4 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'mobile_analytics.png'), Buffer.from(m4.data, 'base64'));

    // Mobile Section 5: AI & WhatsApp
    await sendCmd('Runtime.evaluate', { expression: `document.getElementById('ai-and-whatsapp').scrollIntoView();` });
    await sleep(400);
    const m5 = await sendCmd('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(artifactDir, 'mobile_ai_whatsapp.png'), Buffer.from(m5.data, 'base64'));

    ws.close();
    console.log('\n=== ALL SCREENSHOTS & AUDITS COMPLETED SUCCESSFULLY ===');
  } finally {
    chromeProc.kill();
  }
}

runFinalVerification().catch(console.error);

