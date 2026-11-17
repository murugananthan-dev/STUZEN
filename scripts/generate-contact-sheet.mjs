import { spawn } from 'child_process';
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const projectDir = 'E:\\STUZEN';
const screenshotsDir = join(projectDir, 'screenshots');
const artifactDir = 'C:\\Users\\murug\\.gemini\\antigravity\\brain\\f0009ece-df6f-432e-84d5-de82eab6365d';
const port = 9235;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBase64Image(filename) {
  const filePath = join(screenshotsDir, filename);
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const buf = readFileSync(filePath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

const sections = [
  {
    num: '01',
    label: 'Hero',
    title: 'Hero Section — Cinematic Value Proposition & Simulated Benchmarks',
    desc: 'Desktop 1440px vs. Mobile 375px responsive layout, CTA grouping, simulated benchmark metrics, and telemetry browser mockup.',
    desktopFile: 'desktop_hero.png',
    mobileFile: 'mobile_hero.png',
  },
  {
    num: '02',
    label: 'Services',
    title: 'Services Section — Precision Engineering Ecosystem',
    desc: 'Interactive 6-discipline tab system, active indicator styling, monospace engineering spec cards, and responsive tab layout.',
    desktopFile: 'desktop_services.png',
    mobileFile: 'mobile_services.png',
  },
  {
    num: '03',
    label: 'Showcase',
    title: 'Showcase Section — Selected Engineered Artifacts',
    desc: 'Window chrome headers with control dots, dark glassmorphic metric pills, and multi-region production portfolio showcase.',
    desktopFile: 'desktop_showcase.png',
    mobileFile: 'mobile_showcase.png',
  },
  {
    num: '04',
    label: 'Analytics',
    title: 'Analytics Section — Live Telemetry & Throughput Metrics',
    desc: 'Horizontal metric ribbon with fine 1px dividers, illustrative sample data disclaimers, and continuous throughput vector curve.',
    desktopFile: 'desktop_analytics.png',
    mobileFile: 'mobile_analytics.png',
  },
  {
    num: '05',
    label: 'AI & WhatsApp',
    title: 'AI & WhatsApp Section — Omnichannel Conversational Engine',
    desc: 'Sequential 4-stage pipeline architecture, Meta Cloud BSP integration flow, and interactive chat simulation preview.',
    desktopFile: 'desktop_ai_whatsapp.png',
    mobileFile: 'mobile_ai_whatsapp.png',
  },
  {
    num: '06',
    label: 'Architecture',
    title: 'Architecture Section — Battle-Tested Technical Architecture',
    desc: '5-tier system topography schematic, horizontal signal busline, and modern security standards boundary bar.',
    desktopFile: 'desktop_architecture.png',
    mobileFile: 'mobile_architecture.png',
  },
  {
    num: '07',
    label: 'CTA & Footer',
    title: 'CTA & Footer Section — Closing Consultation Console & Enterprise Footer',
    desc: 'Midnight-navy consultation card, dedicated discovery triggers, and comprehensive capability/legal footer architecture.',
    desktopFile: 'desktop_cta_footer.png',
    mobileFile: 'mobile_cta_footer.png',
  },
];

function buildHtml() {
  console.log('Encoding screenshots into base64...');
  const encodedSections = sections.map((sec) => ({
    ...sec,
    desktopB64: getBase64Image(sec.desktopFile),
    mobileB64: getBase64Image(sec.mobileFile),
  }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>STUZEN TECHNOLOGIES — Visual Review Contact Sheet</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
      padding: 60px 48px;
      width: 2200px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Top Master Header */
    .master-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border: 1px solid #334155;
      border-radius: 24px;
      padding: 48px 56px;
      margin-bottom: 48px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #334155;
      padding-bottom: 28px;
      margin-bottom: 28px;
    }
    .brand-title-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .brand-badge .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 10px #38bdf8;
    }
    h1 {
      font-size: 40px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-top: 10px;
    }
    .subtitle {
      font-size: 18px;
      color: #94a3b8;
      margin-top: 6px;
    }
    .meta-pills {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .meta-pill {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 13px;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .meta-pill strong {
      color: #38bdf8;
    }

    /* Column Headers Banner */
    .columns-banner {
      display: grid;
      grid-template-columns: 1440px 416px;
      gap: 48px;
      margin-bottom: 36px;
      padding: 0 12px;
    }
    .col-header {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .col-header-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .col-header-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #0f172a;
      color: #94a3b8;
      border: 1px solid #334155;
    }

    /* Section Row Cards */
    .section-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 36px;
      margin-bottom: 44px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    .section-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 18px;
      border-bottom: 1px solid #1e293b;
    }
    .section-label-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .section-num-badge {
      background: #0284c7;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .section-name {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }
    .section-desc {
      font-size: 14px;
      color: #94a3b8;
      max-width: 800px;
    }

    /* Comparison Grid */
    .comparison-grid {
      display: grid;
      grid-template-columns: 1440px 416px;
      gap: 48px;
      align-items: start;
    }

    /* Desktop Preview Frame */
    .desktop-frame {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }
    .desktop-chrome {
      height: 38px;
      background: #0f172a;
      border-bottom: 1px solid #334155;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 12px;
    }
    .window-dots {
      display: flex;
      gap: 7px;
    }
    .dot-red { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; }
    .dot-yellow { width: 10px; height: 10px; border-radius: 50%; background: #eab308; }
    .dot-green { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; }
    .browser-url {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 3px 14px;
      font-size: 11px;
      font-family: ui-monospace, monospace;
      color: #94a3b8;
      width: 320px;
    }
    .desktop-img {
      display: block;
      width: 1440px;
      height: 900px;
      object-fit: contain;
      background: #f8fafc;
    }

    /* Mobile Preview Frame */
    .mobile-frame {
      background: #1e293b;
      border: 6px solid #1e293b;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      width: 416px;
    }
    .mobile-notch {
      height: 24px;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #1e293b;
    }
    .notch-bar {
      width: 60px;
      height: 4px;
      border-radius: 2px;
      background: #334155;
    }
    .mobile-img {
      display: block;
      width: 404px;
      height: 875px;
      object-fit: contain;
      background: #f8fafc;
    }

    /* Master Footer */
    .master-footer {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 32px 40px;
      text-align: center;
      margin-top: 60px;
      color: #64748b;
      font-size: 13px;
      font-family: ui-monospace, monospace;
    }
  </style>
</head>
<body>

  <!-- MASTER HEADER -->
  <header class="master-header">
    <div class="header-top">
      <div>
        <div class="brand-badge">
          <span class="dot"></span>
          <span>STUZEN TECHNOLOGIES · QA & DESIGN REVIEW</span>
        </div>
        <h1>Visual Review Contact Sheet</h1>
        <p class="subtitle">Side-by-side section comparison between Desktop (1440px) and Mobile (375px) viewports.</p>
      </div>
      <div class="meta-pills">
        <div class="meta-pill">Total Sections: <strong>7 of 7</strong></div>
        <div class="meta-pill">Desktop Res: <strong>1440 × 900</strong></div>
        <div class="meta-pill">Mobile Res: <strong>375 × 812 (750×1624 @2x)</strong></div>
        <div class="meta-pill">Status: <strong>Pre-Approval Verified</strong></div>
      </div>
    </div>
  </header>

  <!-- COLUMNS HEADER BANNER -->
  <div class="columns-banner">
    <div class="col-header">
      <div class="col-header-title">
        <span>🖥️ DESKTOP COLUMN</span>
      </div>
      <span class="col-header-tag">1440px Viewport · 16:10 Ratio</span>
    </div>
    <div class="col-header">
      <div class="col-header-title">
        <span>📱 MOBILE COLUMN</span>
      </div>
      <span class="col-header-tag">375px Viewport · Fluid Stacking</span>
    </div>
  </div>

  <!-- 7 COMPARISON ROWS -->
  ${encodedSections
    .map(
      (sec) => `
    <section class="section-card" id="row-${sec.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
      <div class="section-card-header">
        <div class="section-label-group">
          <span class="section-num-badge">SECTION ${sec.num}</span>
          <h2 class="section-name">${sec.label}</h2>
        </div>
        <p class="section-desc">${sec.desc}</p>
      </div>

      <div class="comparison-grid">
        <!-- DESKTOP COLUMN -->
        <div class="desktop-frame">
          <div class="desktop-chrome">
            <div class="window-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <div class="browser-url">https://stuzen.io/#${sec.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}</div>
          </div>
          <img class="desktop-img" src="${sec.desktopB64}" alt="STUZEN Desktop ${sec.label} Section Screenshot" />
        </div>

        <!-- MOBILE COLUMN -->
        <div class="mobile-frame">
          <div class="mobile-notch">
            <span class="notch-bar"></span>
          </div>
          <img class="mobile-img" src="${sec.mobileB64}" alt="STUZEN Mobile ${sec.label} Section Screenshot" />
        </div>
      </div>
    </section>
  `
    )
    .join('\n')}

  <!-- MASTER FOOTER -->
  <footer class="master-footer">
    STUZEN TECHNOLOGIES DIGITAL ENGINEERING · VISUAL REVIEW CONTACT SHEET · ALL 14 IN-VIEWPORT SCREENSHOTS PRESERVED WITHOUT CROPPING
  </footer>

</body>
</html>`;
}

async function run() {
  console.log('=== STARTING CONTACT SHEET GENERATION ===');
  const htmlContent = buildHtml();
  const htmlPath = join(screenshotsDir, 'contact_sheet.html');
  writeFileSync(htmlPath, htmlContent);
  console.log(`Saved HTML contact sheet: ${htmlPath}`);

  console.log('Launching headless Chrome to render contact sheet...');
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

    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 2200,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to contact sheet HTML...');
    await sendCmd('Page.navigate', { url: `file:///${htmlPath.replace(/\\/g, '/')}` });
    await sleep(2500);

    // Capture Full Page High-Resolution PNG
    console.log('Capturing high-resolution contact sheet PNG...');
    const pngResult = await sendCmd('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const pngDestProject = join(screenshotsDir, 'stuzen_visual_review_contact_sheet.png');
    const pngDestArtifact = join(artifactDir, 'stuzen_visual_review_contact_sheet.png');
    writeFileSync(pngDestProject, Buffer.from(pngResult.data, 'base64'));
    writeFileSync(pngDestArtifact, Buffer.from(pngResult.data, 'base64'));
    console.log(`Saved PNG contact sheet: ${pngDestProject}`);

    // Export High-Resolution PDF
    console.log('Generating high-resolution contact sheet PDF...');
    const pdfResult = await sendCmd('Page.printToPDF', {
      printBackground: true,
      paperWidth: 22.9, // 2200px / 96dpi ≈ 22.9 inches
      paperHeight: 90,  // tall continuous document
      marginTop: 0.5,
      marginBottom: 0.5,
      marginLeft: 0.5,
      marginRight: 0.5,
      preferCSSPageSize: true,
    });

    const pdfDestProject = join(screenshotsDir, 'stuzen_visual_review_contact_sheet.pdf');
    const pdfDestArtifact = join(artifactDir, 'stuzen_visual_review_contact_sheet.pdf');
    writeFileSync(pdfDestProject, Buffer.from(pdfResult.data, 'base64'));
    writeFileSync(pdfDestArtifact, Buffer.from(pdfResult.data, 'base64'));
    console.log(`Saved PDF contact sheet: ${pdfDestProject}`);

    ws.close();
    console.log('\n=== CONTACT SHEET GENERATION COMPLETED SUCCESSFULLY ===');
  } finally {
    chromeProc.kill();
  }
}

run().catch((err) => {
  console.error('Fatal error during contact sheet generation:', err);
  process.exit(1);
});

