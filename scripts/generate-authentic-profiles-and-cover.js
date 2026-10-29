const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'social');
const assetsDir = path.join(__dirname, '..', 'assets', 'social');
const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');

// Base64 encode the exact original master logo
const logoPath = path.join(imagesDir, 'havencare-official-master-logo.png');
const logoBase64 = 'data:image/png;base64,' + fs.readFileSync(logoPath).toString('base64');

// Base64 encode the original technician reference image
const refImgPath = path.join(imagesDir, 'official-brand-reference.png');
const refImgBase64 = 'data:image/png;base64,' + fs.readFileSync(refImgPath).toString('base64');

const templates = [
  // -------------------------------------------------------------
  // 1. Facebook Profile Picture (1080x1080)
  // -------------------------------------------------------------
  {
    name: 'fb-profile.png',
    width: 1080,
    height: 1080,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background: #F1E9DC;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
  }

  /* Subtle luxury vignette & texture */
  .bg-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F1E9DC 65%, #E5DAC7 100%);
  }
  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(184, 142, 62, 0.15) 1.5px, transparent 1.5px);
    background-size: 32px 32px;
    opacity: 0.8;
  }

  /* Elegant outer gold framing rings within avatar boundary */
  .gold-ring-outer {
    position: absolute;
    width: 960px;
    height: 960px;
    border-radius: 50%;
    border: 2px solid rgba(184, 142, 62, 0.4);
    box-shadow: 0 0 50px rgba(184, 142, 62, 0.15);
  }
  .gold-ring-inner {
    position: absolute;
    width: 920px;
    height: 920px;
    border-radius: 50%;
    border: 1px dashed rgba(184, 142, 62, 0.3);
  }

  /* Logo container */
  .logo-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .original-logo {
    width: 620px;
    height: auto;
    display: block;
    filter: drop-shadow(0 6px 16px rgba(0,0,0,0.08));
  }
  .subtitle {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #0F1B2A;
    margin-top: 15px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="bg-pattern"></div>
  <div class="gold-ring-outer"></div>
  <div class="gold-ring-inner"></div>

  <div class="logo-wrapper">
    <img class="original-logo" src="${logoBase64}" />
    <div class="subtitle">UAE PREMIER HOME MAINTENANCE</div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // 2. Instagram Profile Picture (1080x1080)
  // -------------------------------------------------------------
  {
    name: 'ig-profile.png',
    width: 1080,
    height: 1080,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background: #F1E9DC;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
  }

  .bg-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F1E9DC 65%, #E5DAC7 100%);
  }

  /* Safe circle border matching Instagram's circular avatar */
  .ig-circle-border {
    position: absolute;
    width: 950px;
    height: 950px;
    border-radius: 50%;
    border: 3px solid rgba(184, 142, 62, 0.45);
    box-shadow: 0 0 60px rgba(184, 142, 62, 0.2);
  }

  .logo-box {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .ig-logo {
    width: 680px;
    height: auto;
    display: block;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.1));
  }
  .ig-subtitle {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #0F1B2A;
    margin-top: 18px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="ig-circle-border"></div>

  <div class="logo-box">
    <img class="ig-logo" src="${logoBase64}" />
    <div class="ig-subtitle">UAE PREMIER HOME MAINTENANCE</div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // 3. Facebook Cover Photo (1640x624)
  // -------------------------------------------------------------
  {
    name: 'fb-cover.png',
    width: 1640,
    height: 624,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1640px;
    height: 624px;
    overflow: hidden;
    position: relative;
    background: #F1E9DC;
    font-family: 'Jost', sans-serif;
    color: #0F1B2A;
  }

  /* Left photo pane: Friendly technician selfie */
  .photo-side {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 680px;
    overflow: hidden;
    z-index: 1;
  }
  .photo-side img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
  }
  .photo-side-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%);
  }

  /* Ripped torn paper brush edge */
  .torn-edge {
    position: absolute;
    left: 580px;
    top: -20px;
    bottom: -20px;
    width: 160px;
    z-index: 3;
    pointer-events: none;
    fill: #F1E9DC;
  }

  /* Right content side */
  .content-side {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 980px;
    background: #F1E9DC;
    z-index: 2;
    padding: 30px 60px 30px 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dot-texture {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(184, 142, 62, 0.16) 1.5px, transparent 1.5px);
    background-size: 26px 26px;
    opacity: 0.8;
    pointer-events: none;
  }

  /* Left brand block */
  .brand-panel {
    max-width: 480px;
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .cover-logo {
    width: 360px;
    height: auto;
    display: block;
    margin-bottom: 8px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.08));
  }
  .cover-sub {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #0F1B2A;
    margin-bottom: 12px;
  }
  .cover-motto {
    font-family: 'Marcellus', serif;
    font-size: 26px;
    line-height: 1.25;
    color: #0F1B2A;
    margin-bottom: 20px;
  }
  .cover-motto em {
    font-style: italic;
    color: #B88E3E;
  }

  .cta-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .btn-book {
    background: linear-gradient(135deg, #FAF1D7 0%, #EBD49A 50%, #D8B467 100%);
    border: 1.5px solid #B88E3E;
    color: #0F1B2A;
    font-size: 14.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 13px 28px;
    border-radius: 999px;
    box-shadow: 0 6px 18px rgba(184, 142, 62, 0.28);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-book svg {
    width: 18px;
    height: 18px;
    stroke: #0F1B2A;
    fill: none;
    stroke-width: 2.2;
  }
  .guarantee-badge {
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #7A5E24;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Right services checklist box */
  .services-card {
    background: #FFFFFF;
    border: 1.5px solid rgba(184, 142, 62, 0.35);
    border-radius: 18px;
    padding: 24px 28px;
    width: 360px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    position: relative;
    z-index: 5;
  }
  .services-card-title {
    font-family: 'Marcellus', serif;
    font-size: 16px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #8A6828;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(184, 142, 62, 0.2);
    padding-bottom: 8px;
  }
  .services-card-title span {
    font-size: 11px;
    color: #4A5B58;
    font-family: 'Jost', sans-serif;
  }

  .svc-line {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #0F1B2A;
    margin-bottom: 11px;
  }
  .svc-line:last-child {
    margin-bottom: 0;
  }
  .green-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #2E7D32;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
</style>
</head>
<body>
  <div class="photo-side">
    <img src="${refImgBase64}" />
    <div class="photo-side-scrim"></div>
  </div>

  <svg class="torn-edge" viewBox="0 0 100 1000" preserveAspectRatio="none">
    <path d="M100,0 L0,0 
      C35,40 10,90 35,140 
      C10,190 35,240 15,300 
      C40,360 10,420 35,480 
      C15,540 40,600 20,660 
      C35,720 10,780 30,840 
      C15,900 40,950 10,1000 
      L100,1000 Z" />
  </svg>

  <div class="content-side">
    <div class="dot-texture"></div>

    <div class="brand-panel">
      <img class="cover-logo" src="${logoBase64}" />
      <div class="cover-sub">UAE PREMIER HOME MAINTENANCE</div>
      <div class="cover-motto">Your home, cared for <em>like it is our own.</em></div>

      <div class="cta-row">
        <div class="btn-book">
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Your Visit Today
        </div>
        <div class="guarantee-badge">★ 30-Day Guarantee</div>
      </div>
    </div>

    <div class="services-card">
      <div class="services-card-title">
        Core Services
        <span>UAE WIDE</span>
      </div>
      <div class="svc-line"><div class="green-check">✓</div> AC & Cooling Care</div>
      <div class="svc-line"><div class="green-check">✓</div> Professional Plumbing</div>
      <div class="svc-line"><div class="green-check">✓</div> Electrical & Smart Home</div>
      <div class="svc-line"><div class="green-check">✓</div> Precision Painting</div>
      <div class="svc-line"><div class="green-check">✓</div> Pest Management</div>
      <div class="svc-line"><div class="green-check">✓</div> Annual Care Plans</div>
    </div>
  </div>
</body>
</html>`
  }
];

// Write templates and render
const tempDir = path.join(__dirname, '..', 'scratch-authentic');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

for (const t of templates) {
  const htmlPath = path.join(tempDir, t.name.replace('.png', '.html'));
  fs.writeFileSync(htmlPath, t.html, 'utf8');

  const pubPath = path.join(outputDir, t.name);
  const assetPath = path.join(assetsDir, t.name);

  console.log('Rendering ' + t.name + ' (' + t.width + 'x' + t.height + ')...');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const cmd = '"' + edgePath + '" --headless --disable-gpu --hide-scrollbars --window-size=' + t.width + ',' + t.height + ' --screenshot="' + pubPath + '" "' + fileUrl + '"';
  execSync(cmd);

  fs.copyFileSync(pubPath, assetPath);
  console.log('✔ Generated: ' + t.name + ' (' + fs.statSync(pubPath).size + ' bytes)');
}

console.log('\nAll authentic brand assets generated successfully!');
