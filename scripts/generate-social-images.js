const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'social');
const assetsDir = path.join(__dirname, '..', 'assets', 'social');
const heroBgPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'hero-bg.webp').replace(/\\/g, '/');

// Base64 encode hero-bg.webp so it loads instantly in headless browser
const heroBgBase64 = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, '..', 'public', 'assets', 'images', 'hero-bg.webp')).toString('base64');

const templates = [
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: radial-gradient(circle at 50% 48%, #143532 0%, #0A1C1A 55%, #050E0D 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    color: #F7F5F0;
    position: relative;
  }
  
  /* Subtle luxury geometric grid texture */
  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(212, 169, 79, 0.08) 1.5px, transparent 1.5px);
    background-size: 36px 36px;
    opacity: 0.7;
  }

  /* Circular luxury border (stays within Facebook circle crop of 900px) */
  .circle-outer {
    position: absolute;
    width: 940px;
    height: 940px;
    border-radius: 50%;
    border: 1.5px solid rgba(212, 169, 79, 0.35);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.4);
  }
  .circle-inner {
    position: absolute;
    width: 890px;
    height: 890px;
    border-radius: 50%;
    border: 1px dashed rgba(212, 169, 79, 0.3);
  }

  /* Center Luxury Badge */
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 780px;
  }

  /* Crest Monogram */
  .crest {
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .crest-frame {
    position: absolute;
    inset: 0;
    border: 2px solid #D8B467;
    transform: rotate(45deg);
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(20, 53, 50, 0.9), rgba(10, 28, 26, 0.95));
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(216, 180, 103, 0.25);
  }
  .crest-inner-frame {
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(216, 180, 103, 0.4);
    transform: rotate(45deg);
    border-radius: 14px;
  }
  .crest-text {
    position: relative;
    z-index: 2;
    font-family: 'Marcellus', serif;
    font-size: 80px;
    font-weight: 400;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #FFF6DD 0%, #E2C27D 35%, #B88E3E 70%, #F5E1A4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.4);
  }

  /* Brand Typography */
  .brand-title {
    font-family: 'Marcellus', serif;
    font-size: 86px;
    letter-spacing: 0.04em;
    color: #F7F5F0;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .brand-title em {
    font-style: normal;
    background: linear-gradient(135deg, #FFF6DD 0%, #E2C27D 35%, #B88E3E 70%, #F5E1A4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .arabic-title {
    font-family: 'Amiri', serif;
    font-size: 46px;
    color: #D8B467;
    margin-bottom: 24px;
    letter-spacing: 0.05em;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 320px;
    margin-bottom: 22px;
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #D8B467, transparent);
  }
  .divider-diamond {
    color: #D8B467;
    font-size: 14px;
  }

  .tagline {
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #E2C27D;
    margin-bottom: 8px;
  }

  .location-pill {
    font-size: 16px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #A3B8B5;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(212, 169, 79, 0.25);
    padding: 6px 22px;
    border-radius: 999px;
    margin-top: 14px;
  }
</style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="circle-outer"></div>
  <div class="circle-inner"></div>

  <div class="content">
    <div class="crest">
      <div class="crest-frame"></div>
      <div class="crest-inner-frame"></div>
      <div class="crest-text">HC</div>
    </div>
    <h1 class="brand-title">Haven<em>Care</em></h1>
    <div class="arabic-title">ملاذ كير</div>
    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-diamond">◆</div>
      <div class="divider-line"></div>
    </div>
    <div class="tagline">Premium Home Maintenance</div>
  </div>
</body>
</html>`
  },
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: radial-gradient(circle at 50% 50%, #153835 0%, #0A1C1A 60%, #040C0B 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    color: #F7F5F0;
    position: relative;
  }

  /* Instagram circular crop safe-zone guide at 960px */
  .gold-ring-1 {
    position: absolute;
    width: 950px;
    height: 950px;
    border-radius: 50%;
    border: 2px solid rgba(216, 180, 103, 0.4);
    box-shadow: 0 0 60px rgba(0,0,0,0.6);
  }
  .gold-ring-2 {
    position: absolute;
    width: 910px;
    height: 910px;
    border-radius: 50%;
    border: 1px solid rgba(216, 180, 103, 0.2);
  }

  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Massive high-contrast luxury monogram for Instagram */
  .emblem-box {
    width: 320px;
    height: 320px;
    border-radius: 44px;
    background: linear-gradient(145deg, #1A423F, #081615);
    border: 2.5px solid #D8B467;
    box-shadow: 0 25px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(216, 180, 103, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 45px;
  }
  .emblem-box::after {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 34px;
    border: 1px solid rgba(216, 180, 103, 0.35);
  }

  .emblem-letters {
    font-family: 'Marcellus', serif;
    font-size: 165px;
    line-height: 1;
    background: linear-gradient(135deg, #FFF9EA 0%, #E2C27D 35%, #B88E3E 70%, #F5E1A4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 14px rgba(0,0,0,0.5));
  }

  .brand-wordmark {
    font-family: 'Marcellus', serif;
    font-size: 96px;
    letter-spacing: 0.05em;
    color: #F7F5F0;
    line-height: 1;
    margin-bottom: 12px;
  }
  .brand-wordmark em {
    font-style: normal;
    color: #E2C27D;
  }

  .arabic-wordmark {
    font-family: 'Amiri', serif;
    font-size: 48px;
    color: #D8B467;
    margin-bottom: 26px;
  }

  .subtitle {
    font-size: 21px;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: #B88E3E;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="gold-ring-1"></div>
  <div class="gold-ring-2"></div>

  <div class="content">
    <div class="emblem-box">
      <div class="emblem-letters">HC</div>
    </div>
    <div class="brand-wordmark">Haven<em>Care</em></div>
    <div class="arabic-wordmark">ملاذ كير</div>
  </div>
</body>
</html>`
  },
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
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1640px;
    height: 624px;
    overflow: hidden;
    position: relative;
    font-family: 'Jost', sans-serif;
    color: #F7F5F0;
    background: #081413;
  }

  /* Villa interior background */
  .bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 35%;
    filter: brightness(0.75);
  }

  /* Dual gradient overlay for luxury contrast */
  .bg-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, 
      rgba(7, 20, 18, 0.96) 0%, 
      rgba(7, 20, 18, 0.88) 50%, 
      rgba(7, 20, 18, 0.55) 78%,
      rgba(7, 20, 18, 0.75) 100%);
  }

  /* Thin gold framing borders */
  .cover-frame {
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(212, 169, 79, 0.35);
    pointer-events: none;
    z-index: 5;
  }
  .cover-frame::before {
    content: '◆';
    position: absolute;
    top: -9px; left: -6px;
    color: #D8B467; font-size: 12px;
  }
  .cover-frame::after {
    content: '◆';
    position: absolute;
    bottom: -9px; right: -6px;
    color: #D8B467; font-size: 12px;
  }

  .container {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px;
  }

  /* Left column - Brand & Tagline */
  .brand-col {
    max-width: 780px;
  }

  .badge-top {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(212, 169, 79, 0.12);
    border: 1px solid rgba(212, 169, 79, 0.4);
    padding: 6px 18px;
    border-radius: 999px;
    margin-bottom: 20px;
  }
  .badge-stars {
    color: #D8B467;
    font-size: 15px;
    letter-spacing: 2px;
  }
  .badge-text {
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #E2C27D;
  }

  .logo-row {
    display: flex;
    align-items: baseline;
    gap: 24px;
    margin-bottom: 14px;
  }
  .main-logo {
    font-family: 'Marcellus', serif;
    font-size: 64px;
    letter-spacing: 0.02em;
    color: #F7F5F0;
    line-height: 1;
  }
  .main-logo em {
    font-style: normal;
    background: linear-gradient(135deg, #FFF6DD 0%, #E2C27D 35%, #B88E3E 70%, #F5E1A4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .arabic-logo {
    font-family: 'Amiri', serif;
    font-size: 40px;
    color: #D8B467;
  }

  .headline {
    font-family: 'Marcellus', serif;
    font-size: 42px;
    line-height: 1.18;
    color: #F7F5F0;
    margin-bottom: 14px;
  }
  .headline span {
    font-style: italic;
    color: #E8CF94;
  }

  .subtext {
    font-size: 17px;
    color: #B4C7C4;
    line-height: 1.5;
    margin-bottom: 24px;
    max-width: 660px;
  }

  .cta-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .btn-gold {
    background: linear-gradient(135deg, #E2C27D 0%, #C5A059 50%, #B38C44 100%);
    color: #0A1C1A;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.08em;
    padding: 13px 32px;
    border-radius: 999px;
    text-transform: uppercase;
    box-shadow: 0 8px 24px rgba(184, 142, 62, 0.35);
  }
  .pills-bar {
    display: flex;
    gap: 16px;
  }
  .pill {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 13.5px;
    color: #E2C27D;
    font-weight: 500;
  }
  .pill svg {
    width: 15px;
    height: 15px;
    stroke: #D8B467;
    fill: none;
    stroke-width: 2.2;
  }

  /* Right column - 6 Core Services Grid */
  .services-card {
    background: rgba(10, 28, 25, 0.82);
    border: 1px solid rgba(212, 169, 79, 0.32);
    border-radius: 20px;
    padding: 26px 30px;
    backdrop-filter: blur(14px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    width: 480px;
  }
  .services-title {
    font-family: 'Marcellus', serif;
    font-size: 20px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #E2C27D;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(212, 169, 79, 0.2);
    padding-bottom: 12px;
  }
  .services-title span {
    font-size: 12px;
    letter-spacing: 0.2em;
    color: #8CA3A0;
    font-family: 'Jost', sans-serif;
  }

  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 20px;
  }
  .svc-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #F7F5F0;
  }
  .svc-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D8B467;
    box-shadow: 0 0 8px #D8B467;
  }

  .guarantee-bar {
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid rgba(212, 169, 79, 0.2);
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #B4C7C4;
  }
  .guarantee-bar strong {
    color: #E2C27D;
  }
</style>
</head>
<body>
  <img class="bg-img" src="${heroBgBase64}" />
  <div class="bg-scrim"></div>
  <div class="cover-frame"></div>

  <div class="container">
    <div class="brand-col">
      <div class="badge-top">
        <span class="badge-stars">★★★★★</span>
        <span class="badge-text">UAE's Premier Home Maintenance</span>
      </div>
      <div class="logo-row">
        <div class="main-logo">Haven<em>Care</em></div>
        <div class="arabic-logo">ملاذ كير</div>
      </div>
      <h2 class="headline">Your home, cared for <span>like it's our own.</span></h2>
      <p class="subtext">Specialized villa & apartment care across Dubai and Abu Dhabi. Rapid response, verified technicians, hotel-grade precision.</p>
      
      <div class="cta-row">
        <div class="btn-gold">Book A Visit Online</div>
        <div class="pills-bar">
          <div class="pill">
            <svg viewBox="0 0 24 24"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>
            Same-Day Slots
          </div>
          <div class="pill">
            <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
            30-Day Guarantee
          </div>
        </div>
      </div>
    </div>

    <div class="services-card">
      <div class="services-title">
        Specialist Services
        <span>UAE WIDE</span>
      </div>
      <div class="services-grid">
        <div class="svc-item"><div class="svc-dot"></div>AC & Cooling Care</div>
        <div class="svc-item"><div class="svc-dot"></div>Plumbing Diagnostics</div>
        <div class="svc-item"><div class="svc-dot"></div>Electrical & Smart Home</div>
        <div class="svc-item"><div class="svc-dot"></div>Painting & Finishing</div>
        <div class="svc-item"><div class="svc-dot"></div>Pest Management</div>
        <div class="svc-item"><div class="svc-dot"></div>Annual Care Plans</div>
      </div>
      <div class="guarantee-bar">
        <span>Emergency & Scheduled Care</span>
        <strong>24/7 Concierge Support</strong>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    name: 'ig-post.png',
    width: 1080,
    height: 1080,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    font-family: 'Jost', sans-serif;
    color: #F7F5F0;
    background: #081413;
  }

  .bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 30%;
    filter: brightness(0.65);
  }
  .bg-scrim {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 40%, rgba(9, 23, 21, 0.85) 0%, rgba(6, 16, 15, 0.96) 100%);
  }

  .gold-border {
    position: absolute;
    inset: 32px;
    border: 1px solid rgba(212, 169, 79, 0.4);
    pointer-events: none;
    z-index: 5;
  }

  .content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 70px 60px;
  }

  .top-meta {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 15px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #E2C27D;
  }
  .top-meta::before, .top-meta::after {
    content: '';
    width: 38px;
    height: 1px;
    background: #E2C27D;
  }

  .center-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .crest {
    width: 100px;
    height: 100px;
    border: 1.5px solid #D8B467;
    transform: rotate(45deg);
    border-radius: 12px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(14, 38, 35, 0.9);
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  }
  .crest span {
    transform: rotate(-45deg);
    font-family: 'Marcellus', serif;
    font-size: 40px;
    color: #E2C27D;
  }

  .main-heading {
    font-family: 'Marcellus', serif;
    font-size: 78px;
    letter-spacing: 0.03em;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .main-heading em {
    font-style: normal;
    background: linear-gradient(135deg, #FFF6DD 0%, #E2C27D 35%, #B88E3E 70%, #F5E1A4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ar-heading {
    font-family: 'Amiri', serif;
    font-size: 44px;
    color: #D8B467;
    margin-bottom: 24px;
  }

  .tagline {
    font-family: 'Marcellus', serif;
    font-size: 32px;
    line-height: 1.35;
    color: #F7F5F0;
    max-width: 760px;
    margin-bottom: 24px;
  }
  .tagline em {
    font-style: italic;
    color: #E8CF94;
  }

  .services-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 820px;
    margin-bottom: 30px;
  }
  .tag {
    background: rgba(10, 26, 24, 0.8);
    border: 1px solid rgba(212, 169, 79, 0.3);
    padding: 8px 20px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: #E2C27D;
  }

  .bottom-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .cta-btn {
    background: linear-gradient(135deg, #E2C27D 0%, #C5A059 50%, #B38C44 100%);
    color: #0A1C1A;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 16px 48px;
    border-radius: 999px;
    box-shadow: 0 10px 30px rgba(184, 142, 62, 0.35);
  }
  .web-link {
    font-size: 15px;
    letter-spacing: 0.22em;
    color: #A3B8B5;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <img class="bg-img" src="${heroBgBase64}" />
  <div class="bg-scrim"></div>
  <div class="gold-border"></div>

  <div class="content">
    <div class="top-meta">UAE Premier Home Maintenance</div>

    <div class="center-group">
      <div class="crest"><span>HC</span></div>
      <h1 class="main-heading">Haven<em>Care</em></h1>
      <div class="ar-heading">ملاذ كير</div>
      <div class="tagline">Your home, cared for <em>like it's our own.</em></div>

      <div class="services-tags">
        <div class="tag">AC & Cooling</div>
        <div class="tag">Plumbing</div>
        <div class="tag">Electrical</div>
        <div class="tag">Painting</div>
        <div class="tag">Pest Control</div>
        <div class="tag">Annual Care Plans</div>
      </div>
    </div>

    <div class="bottom-cta">
      <div class="cta-btn">Book Your Visit Today</div>
    </div>
  </div>
</body>
</html>`
  }
];

// Write HTML templates and render screenshots
const tempHtmlDir = path.join(__dirname, '..', 'scratch-social');
if (!fs.existsSync(tempHtmlDir)) fs.mkdirSync(tempHtmlDir, { recursive: true });

for (const t of templates) {
  const htmlFile = path.join(tempHtmlDir, t.name.replace('.png', '.html'));
  fs.writeFileSync(htmlFile, t.html, 'utf8');

  const outPub = path.join(outputDir, t.name);
  const outSrc = path.join(assetsDir, t.name);

  console.log('Rendering ' + t.name + ' (' + t.width + 'x' + t.height + ')...');
  const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');
  
  // Use Edge headless screenshot
  const cmd = '"' + edgePath + '" --headless --disable-gpu --hide-scrollbars --window-size=' + t.width + ',' + t.height + ' --screenshot="' + outPub + '" "' + fileUrl + '"';
  execSync(cmd);

  // Copy to assets
  fs.copyFileSync(outPub, outSrc);

  const stats = fs.statSync(outPub);
  console.log('✔ Created ' + t.name + ' (' + stats.size + ' bytes)');
}

console.log('\nAll social graphics generated successfully!');
