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

const techImg = getBase64('technician-portrait.webp');
const acImg = getBase64('service-ac.webp');
const plumbingImg = getBase64('service-plumbing.webp');
const paintingImg = getBase64('service-painting.webp');
const villaImg = getBase64('our-standard.webp');

// Shared CSS rules for the brush-split layout
const commonHead = `
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background: #FAF8F5;
    font-family: 'Jost', sans-serif;
    color: #1A2624;
  }

  /* Left photo pane */
  .photo-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 520px;
    overflow: hidden;
    z-index: 1;
  }
  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }
  .photo-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10, 28, 26, 0.2) 0%, rgba(10, 28, 26, 0.5) 100%);
  }

  /* Artistic ripped paper / brush stroke edge transition */
  .brush-edge {
    position: absolute;
    left: 450px;
    top: -20px;
    bottom: -20px;
    width: 120px;
    z-index: 3;
    pointer-events: none;
    fill: #FAF8F5;
  }

  /* Right content pane */
  .content-pane {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 610px;
    background: #FAF8F5;
    z-index: 2;
    padding: 55px 50px 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Subtle dot pattern texture */
  .dot-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(184, 142, 62, 0.18) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.6;
    pointer-events: none;
  }

  /* Top Eyebrow */
  .top-eyebrow {
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #8A6828;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .top-eyebrow::before, .top-eyebrow::after {
    content: '';
    height: 1px;
    background: #D8B467;
    flex: 1;
    max-width: 32px;
  }

  /* Crest and Brand */
  .brand-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 5;
    margin-bottom: 20px;
  }
  .hc-crest {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    transform: rotate(45deg);
    background: #0A1C1A;
    border: 2px solid #D8B467;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 18px rgba(0,0,0,0.18);
    margin-bottom: 18px;
  }
  .hc-crest span {
    transform: rotate(-45deg);
    font-family: 'Marcellus', serif;
    font-size: 26px;
    color: #E2C27D;
    font-weight: 600;
  }
  .brand-name {
    font-family: 'Marcellus', serif;
    font-size: 56px;
    line-height: 1;
    letter-spacing: 0.02em;
    color: #0A1C1A;
    margin-bottom: 6px;
  }
  .brand-name em {
    font-style: normal;
    color: #B88E3E;
  }
  .brand-ar {
    font-family: 'Amiri', serif;
    font-size: 32px;
    color: #B88E3E;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .brand-motto {
    font-family: 'Marcellus', serif;
    font-style: italic;
    font-size: 19px;
    color: #4D5E5B;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .brand-motto::before, .brand-motto::after {
    content: '✦';
    font-style: normal;
    font-size: 10px;
    color: #B88E3E;
  }

  /* Service Rows */
  .services-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 5;
    margin: 10px 0 24px;
  }
  .svc-row {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(184, 142, 62, 0.28);
  }
  .svc-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .svc-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #FFF4DB;
    border: 1px solid rgba(184, 142, 62, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .svc-icon-box svg {
    width: 20px;
    height: 20px;
    stroke: #8A6828;
    fill: none;
    stroke-width: 2;
  }
  .svc-name {
    font-size: 18px;
    font-weight: 600;
    color: #0E2926;
    letter-spacing: 0.01em;
  }
  .svc-note {
    font-size: 14px;
    color: #6A7D7A;
    margin-left: auto;
    font-weight: 400;
  }

  /* Feature Checklist (for single service posts) */
  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 15px 0 25px;
  }
  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #FFFFFF;
    border: 1px solid rgba(184, 142, 62, 0.2);
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  }
  .feature-check {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #0A1C1A;
    color: #E2C27D;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .feature-text strong {
    display: block;
    font-size: 16px;
    color: #0A1C1A;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .feature-text span {
    font-size: 13.5px;
    color: #586966;
    line-height: 1.35;
  }

  /* CTA Button */
  .cta-btn-wrap {
    position: relative;
    z-index: 5;
    text-align: center;
  }
  .btn-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    background: linear-gradient(135deg, #FAF1D7 0%, #EBD49A 50%, #D8B467 100%);
    border: 1.5px solid #B88E3E;
    color: #0A1C1A;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 16px 28px;
    border-radius: 999px;
    box-shadow: 0 8px 24px rgba(184, 142, 62, 0.28);
  }
  .btn-cta svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #0A1C1A;
    stroke-width: 2.2;
  }

  /* Bottom Trust Badges */
  .trust-strip {
    margin-top: 10px;
    font-size: 12.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7A8E8B;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .trust-strip span {
    color: #B88E3E;
  }
</style>
`;

// Ripped brush SVG divider
const brushSvg = `
<svg class="brush-edge" viewBox="0 0 100 1000" preserveAspectRatio="none">
  <path d="M100,0 L0,0 
    C25,40 10,80 35,130 
    C5,180 30,230 15,290 
    C40,340 10,400 35,460 
    C15,520 40,580 20,640 
    C35,700 10,760 30,820 
    C15,880 40,940 10,1000 
    L100,1000 Z" />
</svg>
`;

const posts = [
  // -------------------------------------------------------------
  // POST 1: Master Brand & Services Overview (Matching Reference!)
  // -------------------------------------------------------------
  {
    name: 'haven-post-1-overview.png',
    html: `<!DOCTYPE html>
<html>
<head>${commonHead}</head>
<body>
  <div class="photo-container">
    <img class="photo-img" src="${techImg}" />
    <div class="photo-scrim"></div>
  </div>

  ${brushSvg}

  <div class="content-pane">
    <div class="dot-bg"></div>

    <div class="top-eyebrow">UAE Premier Home Maintenance</div>

    <div class="brand-block">
      <div class="hc-crest"><span>HC</span></div>
      <div class="brand-name">Haven<em>Care</em></div>
      <div class="brand-ar">ملاذ كير</div>
      <div class="brand-motto">Your home, cared for like it's our own.</div>
    </div>

    <div class="services-list">
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>
        </div>
        <div class="svc-name">AC & Cooling</div>
        <div class="svc-note">Deep wash & gas</div>
      </div>
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <div class="svc-name">Plumbing</div>
        <div class="svc-note">Pipes & heaters</div>
      </div>
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="svc-name">Electrical</div>
        <div class="svc-note">DB box & smart home</div>
      </div>
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="6" rx="2"/><path d="M10 8v8a2 2 0 0 0 2 2h2v4"/></svg>
        </div>
        <div class="svc-name">Painting</div>
        <div class="svc-note">Villa & touch-ups</div>
      </div>
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5zM4 11h16M3 17h18M6 21l2-4M18 21l-2-4"/></svg>
        </div>
        <div class="svc-name">Pest Control</div>
        <div class="svc-note">Eco & safe barrier</div>
      </div>
      <div class="svc-row">
        <div class="svc-icon-box">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="svc-name">Annual Care Plans</div>
        <div class="svc-note">VIP Concierge</div>
      </div>
    </div>

    <div class="cta-btn-wrap">
      <div class="btn-cta">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Book Your Visit Today
      </div>
      <div class="trust-strip">
        <span>★ ★ ★ ★ ★</span> 30-Day Guarantee • Verified Technicians
      </div>
    </div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // POST 2: AC & Cooling Care Focus (High Urgency)
  // -------------------------------------------------------------
  {
    name: 'haven-post-2-ac.png',
    html: `<!DOCTYPE html>
<html>
<head>${commonHead}</head>
<body>
  <div class="photo-container">
    <img class="photo-img" src="${acImg}" />
    <div class="photo-scrim"></div>
  </div>

  ${brushSvg}

  <div class="content-pane">
    <div class="dot-bg"></div>

    <div class="top-eyebrow">Same-Day AC Response</div>

    <div class="brand-block">
      <div class="hc-crest"><span>HC</span></div>
      <div class="brand-name">Haven<em>Care</em></div>
      <div class="brand-ar">ملاذ كير</div>
      <div style="font-family:'Marcellus',serif; font-size:26px; color:#0A1C1A; margin-top:4px;">Hotel-Grade AC Care</div>
    </div>

    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Deep Coil Chemical Wash</strong>
          <span>Removes 99% mold, dust & allergens for icy cold air.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Freon Gas Leak Test & Refill</strong>
          <span>Optimal compressor pressure and silent operation.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Duct & Filter Sanitization</strong>
          <span>Odor-free, fresh breathing air across all rooms.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>30-Day Cooling Guarantee</strong>
          <span>If it stops cooling, we re-visit free of charge.</span>
        </div>
      </div>
    </div>

    <div class="cta-btn-wrap">
      <div class="btn-cta">
        <svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>
        Schedule AC Inspection
      </div>
      <div class="trust-strip">
        <span>⚡ 60-Min Emergency Slots Available</span>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // POST 3: Plumbing & Water Diagnostics Focus
  // -------------------------------------------------------------
  {
    name: 'haven-post-3-plumbing.png',
    html: `<!DOCTYPE html>
<html>
<head>${commonHead}</head>
<body>
  <div class="photo-container">
    <img class="photo-img" src="${plumbingImg}" />
    <div class="photo-scrim"></div>
  </div>

  ${brushSvg}

  <div class="content-pane">
    <div class="dot-bg"></div>

    <div class="top-eyebrow">Zero Leaks • Zero Stress</div>

    <div class="brand-block">
      <div class="hc-crest"><span>HC</span></div>
      <div class="brand-name">Haven<em>Care</em></div>
      <div class="brand-ar">ملاذ كير</div>
      <div style="font-family:'Marcellus',serif; font-size:26px; color:#0A1C1A; margin-top:4px;">Precision Plumbing</div>
    </div>

    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Concealed Leak Detection</strong>
          <span>Acoustic sensor diagnostics without breaking tiles.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Water Heater Servicing & Replace</strong>
          <span>Thermostat testing, safety valves & instant hot water.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Water Booster Pump Diagnostics</strong>
          <span>Balanced water pressure for every luxury shower.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Cleanliness Guarantee</strong>
          <span>Shoe covers worn & zero mess left behind.</span>
        </div>
      </div>
    </div>

    <div class="cta-btn-wrap">
      <div class="btn-cta">
        <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        Book A Certified Plumber
      </div>
      <div class="trust-strip">
        <span>★ Upfront Fixed Quotes • No Hidden Fees</span>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // POST 4: Painting & Flawless Finishing Focus
  // -------------------------------------------------------------
  {
    name: 'haven-post-4-painting.png',
    html: `<!DOCTYPE html>
<html>
<head>${commonHead}</head>
<body>
  <div class="photo-container">
    <img class="photo-img" src="${paintingImg}" />
    <div class="photo-scrim"></div>
  </div>

  ${brushSvg}

  <div class="content-pane">
    <div class="dot-bg"></div>

    <div class="top-eyebrow">Flawless Interior & Exterior</div>

    <div class="brand-block">
      <div class="hc-crest"><span>HC</span></div>
      <div class="brand-name">Haven<em>Care</em></div>
      <div class="brand-ar">ملاذ كير</div>
      <div style="font-family:'Marcellus',serif; font-size:26px; color:#0A1C1A; margin-top:4px;">Luxury Villa Painting</div>
    </div>

    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Premium Odorless European Paints</strong>
          <span>Zero toxic fumes, move right in after drying.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Gypsum & Hairline Crack Patching</strong>
          <span>Glass-smooth surface prep for showroom results.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Full Masking & Furniture Shield</strong>
          <span>Floors, switches & fine furniture 100% protected.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Fast Villa Turnaround</strong>
          <span>Full villa completion in 24 to 48 hours.</span>
        </div>
      </div>
    </div>

    <div class="cta-btn-wrap">
      <div class="btn-cta">
        <svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="6" rx="2"/><path d="M10 8v8a2 2 0 0 0 2 2h2v4"/></svg>
        Request Free Color Audit
      </div>
      <div class="trust-strip">
        <span>✦ Free On-Site Villa Consultation</span>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  // -------------------------------------------------------------
  // POST 5: Villa Annual Care Plan Focus (High Ticket)
  // -------------------------------------------------------------
  {
    name: 'haven-post-5-annual-plan.png',
    html: `<!DOCTYPE html>
<html>
<head>${commonHead}</head>
<body>
  <div class="photo-container">
    <img class="photo-img" src="${villaImg}" />
    <div class="photo-scrim"></div>
  </div>

  ${brushSvg}

  <div class="content-pane">
    <div class="dot-bg"></div>

    <div class="top-eyebrow">VIP Villa Concierge</div>

    <div class="brand-block">
      <div class="hc-crest"><span>HC</span></div>
      <div class="brand-name">Haven<em>Care</em></div>
      <div class="brand-ar">ملاذ كير</div>
      <div style="font-family:'Marcellus',serif; font-size:26px; color:#0A1C1A; margin-top:4px;">Annual Villa Care Plans</div>
    </div>

    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Unlimited Priority Emergency Visits</strong>
          <span>Jump the line 24/7 for AC, electrical & plumbing.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>4x Comprehensive AC Overhauls/Year</strong>
          <span>Quarterly scheduled visits keep utility bills low.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>Dedicated WhatsApp Concierge</strong>
          <span>Direct chat with your assigned property supervisor.</span>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-check">✓</div>
        <div class="feature-text">
          <strong>15% Savings on Major Projects</strong>
          <span>Discounts on full painting, remodeling & smart upgrades.</span>
        </div>
      </div>
    </div>

    <div class="cta-btn-wrap">
      <div class="btn-cta">
        <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Explore Care Memberships
      </div>
      <div class="trust-strip">
        <span>★ Complete Peace of Mind for 365 Days</span>
      </div>
    </div>
  </div>
</body>
</html>`
  }
];

// Write and render
const tempDir = path.join(__dirname, '..', 'scratch-campaign');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

for (const p of posts) {
  const htmlPath = path.join(tempDir, p.name.replace('.png', '.html'));
  fs.writeFileSync(htmlPath, p.html, 'utf8');

  const pubPath = path.join(outputDir, p.name);
  const assetPath = path.join(assetsDir, p.name);

  console.log('Rendering ' + p.name + '...');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const cmd = '"' + edgePath + '" --headless --disable-gpu --hide-scrollbars --window-size=1080,1080 --screenshot="' + pubPath + '" "' + fileUrl + '"';
  execSync(cmd);

  fs.copyFileSync(pubPath, assetPath);
  console.log('✔ Generated: ' + p.name + ' (' + fs.statSync(pubPath).size + ' bytes)');
}

console.log('\nAll 5 campaign images generated successfully!');
