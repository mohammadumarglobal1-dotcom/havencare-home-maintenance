const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'social');
const assetsDir = path.join(__dirname, '..', 'assets', 'social');
const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');

// Function to get Base64 of image
function getBase64(filename) {
  const filePath = path.join(imagesDir, filename);
  const ext = path.extname(filename).replace('.', '');
  return 'data:image/' + ext + ';base64,' + fs.readFileSync(filePath).toString('base64');
}

const refImgBase64 = getBase64('official-brand-reference.png');
const heroBgBase64 = getBase64('hero-bg.webp');

// High-detail SVG of the exact faceted diamond with HC monogram & laurel wreath branches
function getLogoSvg(size = 320, isDark = false) {
  const diamondBg = isDark ? '#0A1C1A' : '#0D1B2A';
  const goldLight = '#FBF3D5';
  const goldMid = '#D4A94F';
  const goldDark = '#9E782F';
  const textFill = isDark ? '#E8CF94' : '#0D1B2A';
  const arabicFill = isDark ? '#D4A94F' : '#B88E3E';

  return `
  <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
    <!-- Diamond & Laurel Emblem -->
    <svg width="${size}" height="${size * 0.82}" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${goldLight}"/>
          <stop offset="35%" stop-color="${goldMid}"/>
          <stop offset="70%" stop-color="${goldDark}"/>
          <stop offset="100%" stop-color="${goldLight}"/>
        </linearGradient>
        <linearGradient id="gemBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14283C"/>
          <stop offset="100%" stop-color="#081018"/>
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>

      <!-- Laurel Wreath Leaves (Left Side) -->
      <g filter="url(#goldGlow)">
        <!-- Main stem left -->
        <path d="M 68 200 C 60 160 70 115 105 85" stroke="url(#goldGrad)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Leaves left -->
        <path d="M 72 195 C 55 190 48 180 50 170 C 58 175 68 185 72 195 Z" fill="url(#goldGrad)"/>
        <path d="M 66 172 C 48 165 42 152 46 142 C 54 148 62 160 66 172 Z" fill="url(#goldGrad)"/>
        <path d="M 65 145 C 48 135 45 120 52 110 C 58 118 64 132 65 145 Z" fill="url(#goldGrad)"/>
        <path d="M 72 120 C 58 108 58 92 68 82 C 72 92 74 108 72 120 Z" fill="url(#goldGrad)"/>
        <path d="M 85 98 C 74 85 78 70 90 62 C 92 74 90 88 85 98 Z" fill="url(#goldGrad)"/>
        <path d="M 104 84 C 95 70 102 56 115 50 C 115 62 110 75 104 84 Z" fill="url(#goldGrad)"/>

        <!-- Laurel Wreath Leaves (Right Side) -->
        <!-- Main stem right -->
        <path d="M 272 200 C 280 160 270 115 235 85" stroke="url(#goldGrad)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Leaves right -->
        <path d="M 268 195 C 285 190 292 180 290 170 C 282 175 272 185 268 195 Z" fill="url(#goldGrad)"/>
        <path d="M 274 172 C 292 165 298 152 294 142 C 286 148 278 160 274 172 Z" fill="url(#goldGrad)"/>
        <path d="M 275 145 C 292 135 295 120 288 110 C 282 118 276 132 275 145 Z" fill="url(#goldGrad)"/>
        <path d="M 268 120 C 282 108 282 92 272 82 C 268 92 266 108 268 120 Z" fill="url(#goldGrad)"/>
        <path d="M 255 98 C 266 85 262 70 250 62 C 248 74 250 88 255 98 Z" fill="url(#goldGrad)"/>
        <path d="M 236 84 C 245 70 238 56 225 50 C 225 62 230 75 236 84 Z" fill="url(#goldGrad)"/>
      </g>

      <!-- Center Faceted Cut Diamond -->
      <g filter="url(#goldGlow)">
        <!-- Outer Diamond polygon -->
        <polygon points="170,185 102,78 122,25 218,25 238,78" fill="url(#gemBg)" stroke="url(#goldGrad)" stroke-width="4" stroke-linejoin="round"/>
        
        <!-- Facet Lines -->
        <!-- Top table line -->
        <line x1="138" y1="52" x2="202" y2="52" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="122" y1="25" x2="138" y2="52" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="218" y1="25" x2="202" y2="52" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="102" y1="78" x2="138" y2="52" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="238" y1="78" x2="202" y2="52" stroke="url(#goldGrad)" stroke-width="2"/>
        
        <!-- Pavilion facets to bottom culet -->
        <line x1="102" y1="78" x2="170" y2="185" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="138" y1="52" x2="170" y2="185" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="202" y1="52" x2="170" y2="185" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="238" y1="78" x2="170" y2="185" stroke="url(#goldGrad)" stroke-width="2"/>

        <!-- Gold HC Monogram inside diamond -->
        <text x="170" y="118" font-family="'Marcellus', 'Cinzel', serif" font-size="44" font-weight="700" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1">HC</text>
      </g>
    </svg>

    <!-- Typography -->
    <div style="font-family:'Marcellus',serif; font-size:${size * 0.28}px; letter-spacing:0.03em; color:${textFill}; font-weight:700; line-height:1; margin-top:10px;">HavenCare</div>
    <div style="font-family:'Amiri',serif; font-size:${size * 0.17}px; color:${arabicFill}; font-weight:700; line-height:1.15; margin-top:6px;">ملاذ كير</div>
    <div style="font-family:'Jost',sans-serif; font-size:${size * 0.075}px; letter-spacing:0.26em; text-transform:uppercase; color:${isDark ? '#A3B8B5' : '#4A5B58'}; font-weight:600; margin-top:8px;">UAE Premier Home Maintenance</div>
  </div>
  `;
}

// Templates list
const templates = [
  // -------------------------------------------------------------
  // 1. Facebook Profile Picture (1080x1080 - Warm Luxury Ivory)
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background: radial-gradient(circle at 50% 48%, #FFFFFF 0%, #FAF6EE 55%, #F0E8D8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
  }
  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(184, 142, 62, 0.18) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
    opacity: 0.7;
  }
  .circle-guide {
    position: absolute;
    width: 950px;
    height: 950px;
    border-radius: 50%;
    border: 2px solid rgba(184, 142, 62, 0.35);
    box-shadow: 0 0 60px rgba(184, 142, 62, 0.12);
  }
  .circle-inner-guide {
    position: absolute;
    width: 910px;
    height: 910px;
    border-radius: 50%;
    border: 1px dashed rgba(184, 142, 62, 0.25);
  }
</style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="circle-guide"></div>
  <div class="circle-inner-guide"></div>
  ${getLogoSvg(400, false)}
</body>
</html>`
  },

  // -------------------------------------------------------------
  // 2. Instagram Profile Picture (1080x1080 - Deep Emerald & Gold Luxury)
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background: radial-gradient(circle at 50% 48%, #143532 0%, #0A1C1A 55%, #050E0D 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
  }
  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(212, 169, 79, 0.12) 1.5px, transparent 1.5px);
    background-size: 32px 32px;
  }
  .gold-ring-1 {
    position: absolute;
    width: 950px;
    height: 950px;
    border-radius: 50%;
    border: 2px solid rgba(216, 180, 103, 0.45);
    box-shadow: 0 0 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.5);
  }
  .gold-ring-2 {
    position: absolute;
    width: 900px;
    height: 900px;
    border-radius: 50%;
    border: 1px dashed rgba(216, 180, 103, 0.3);
  }
</style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="gold-ring-1"></div>
  <div class="gold-ring-2"></div>
  ${getLogoSvg(420, true)}
</body>
</html>`
  },

  // -------------------------------------------------------------
  // 3. Facebook Cover Photo (1640x624 - 2x Retina Standard)
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1640px;
    height: 624px;
    overflow: hidden;
    position: relative;
    background: #FAF8F5;
    font-family: 'Jost', sans-serif;
    color: #0A1C1A;
  }

  /* Left photo pane: The friendly technician selfie in van */
  .left-pane {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 680px;
    overflow: hidden;
    z-index: 1;
  }
  .left-pane img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
  }
  .left-pane-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(10,28,26,0.1) 0%, rgba(10,28,26,0.35) 100%);
  }

  /* Torn brush edge transition */
  .brush-divider {
    position: absolute;
    left: 600px;
    top: -20px;
    bottom: -20px;
    width: 140px;
    z-index: 3;
    pointer-events: none;
    fill: #FAF8F5;
  }

  /* Right content pane */
  .right-pane {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 960px;
    background: #FAF8F5;
    z-index: 2;
    padding: 35px 60px 35px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dot-texture {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(184, 142, 62, 0.16) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.7;
    pointer-events: none;
  }

  .brand-section {
    max-width: 460px;
    position: relative;
    z-index: 5;
  }

  .tagline-lead {
    font-family: 'Marcellus', serif;
    font-size: 26px;
    line-height: 1.25;
    color: #0A1C1A;
    margin: 14px 0 16px;
  }
  .tagline-lead em {
    font-style: italic;
    color: #B88E3E;
  }

  .cta-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .btn-book {
    background: linear-gradient(135deg, #FAF1D7 0%, #EBD49A 50%, #D8B467 100%);
    border: 1.5px solid #B88E3E;
    color: #0A1C1A;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 12px 26px;
    border-radius: 999px;
    box-shadow: 0 6px 18px rgba(184, 142, 62, 0.28);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .guarantee-tag {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #6C5521;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Services column */
  .services-column {
    background: #FFFFFF;
    border: 1.5px solid rgba(184, 142, 62, 0.3);
    border-radius: 18px;
    padding: 24px 28px;
    width: 360px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.06);
    position: relative;
    z-index: 5;
  }
  .services-header {
    font-family: 'Marcellus', serif;
    font-size: 16px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #8A6828;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(184, 142, 62, 0.2);
    padding-bottom: 8px;
  }
  .services-header span {
    font-size: 11px;
    color: #4A5B58;
    font-family: 'Jost', sans-serif;
  }

  .svc-item-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14.5px;
    font-weight: 600;
    color: #0A1C1A;
    margin-bottom: 10px;
  }
  .svc-item-row:last-child {
    margin-bottom: 0;
  }
  .check-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0A1C1A;
    color: #D8B467;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
  }
</style>
</head>
<body>
  <div class="left-pane">
    <img src="${refImgBase64}" />
    <div class="left-pane-scrim"></div>
  </div>

  <svg class="brush-divider" viewBox="0 0 100 1000" preserveAspectRatio="none">
    <path d="M100,0 L0,0 
      C30,40 10,90 35,140 
      C10,190 35,240 15,300 
      C40,360 10,420 35,480 
      C15,540 40,600 20,660 
      C35,720 10,780 30,840 
      C15,900 40,950 10,1000 
      L100,1000 Z" />
  </svg>

  <div class="right-pane">
    <div class="dot-texture"></div>

    <div class="brand-section">
      ${getLogoSvg(250, false)}
      <div class="tagline-lead">Your home, cared for <em>like it is our own.</em></div>
      <div class="cta-group">
        <div class="btn-book">Book Your Visit Today</div>
        <div class="guarantee-tag">★ 30-Day Guarantee</div>
      </div>
    </div>

    <div class="services-column">
      <div class="services-header">
        Core Services
        <span>UAE WIDE</span>
      </div>
      <div class="svc-item-row"><div class="check-circle">✓</div> AC & Cooling Care</div>
      <div class="svc-item-row"><div class="check-circle">✓</div> Professional Plumbing</div>
      <div class="svc-item-row"><div class="check-circle">✓</div> Electrical & Smart Home</div>
      <div class="svc-item-row"><div class="check-circle">✓</div> Precision Painting</div>
      <div class="svc-item-row"><div class="check-circle">✓</div> Pest Management</div>
      <div class="svc-item-row"><div class="check-circle">✓</div> Annual Care Plans</div>
    </div>
  </div>
</body>
</html>`
  }
];

// Write and render
const tempDir = path.join(__dirname, '..', 'scratch-profile-cover');
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

console.log('\nProfiles and Facebook Cover generated successfully!');
