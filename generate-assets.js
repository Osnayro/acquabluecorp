/**
 * AcQuaBlue - Asset Generation Script
 * Generates: og-image.png (1200x630), favicon-32.png, favicon-192.png, apple-touch-icon.png
 * Uses: sharp (node module)
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'assets');

async function generateAssets() {
  console.log('🎨 Generating AcQuaBlue image assets...\n');

  // ─── 1. OG IMAGE 1200×630 (BUG-03 / SEO-01) ───────────────────────────────
  // Build an SVG banner with the brand identity
  const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#070d18"/>
        <stop offset="50%" style="stop-color:#0b1528"/>
        <stop offset="100%" style="stop-color:#12213d"/>
      </linearGradient>
      <linearGradient id="cyan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00d2ff"/>
        <stop offset="100%" style="stop-color:#00a3e0"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00d2ff"/>
        <stop offset="100%" style="stop-color:#3b82f6"/>
      </linearGradient>
      <radialGradient id="glow" cx="30%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:#00a3e0;stop-opacity:0.18"/>
        <stop offset="100%" style="stop-color:#070d18;stop-opacity:0"/>
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>

    <!-- Grid pattern -->
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Top cyan line -->
    <rect x="0" y="0" width="1200" height="4" fill="url(#cyan)"/>

    <!-- Left accent bar -->
    <rect x="60" y="120" width="5" height="390" fill="url(#accent)" rx="3"/>

    <!-- Company name -->
    <text x="95" y="210" font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="800" fill="white" letter-spacing="-1">AcQuaBlue</text>
    <text x="95" y="268" font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="800" fill="url(#accent)" letter-spacing="-1">International Corp.</text>

    <!-- Divider -->
    <rect x="95" y="295" width="480" height="2" fill="rgba(0,210,255,0.4)" rx="1"/>

    <!-- Tagline -->
    <text x="95" y="345" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="400" fill="#94a3b8">Advanced Water Treatment &amp;</text>
    <text x="95" y="380" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="400" fill="#94a3b8">Industrial Fluid Engineering Solutions</text>

    <!-- Location badge -->
    <rect x="95" y="425" width="320" height="44" rx="22" fill="rgba(0,163,224,0.15)" stroke="rgba(0,210,255,0.4)" stroke-width="1.5"/>
    <text x="255" y="452" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="#00d2ff" text-anchor="middle">Miami, FL USA · +1 (407) 309-7191</text>

    <!-- Water droplet icon area (right side) -->
    <circle cx="920" cy="315" r="180" fill="rgba(0,163,224,0.06)" stroke="rgba(0,210,255,0.15)" stroke-width="1.5"/>
    <circle cx="920" cy="315" r="130" fill="rgba(0,163,224,0.08)" stroke="rgba(0,210,255,0.2)" stroke-width="1"/>
    
    <!-- Water wave lines -->
    <path d="M780 295 Q840 270 900 295 Q960 320 1020 295 Q1060 280 1060 280" fill="none" stroke="rgba(0,210,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M780 325 Q840 300 900 325 Q960 350 1020 325 Q1060 310 1060 310" fill="none" stroke="rgba(0,163,224,0.4)" stroke-width="2" stroke-linecap="round"/>
    <path d="M790 355 Q850 330 910 355 Q970 380 1020 358" fill="none" stroke="rgba(0,130,184,0.3)" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Molecule/RO icon suggestion -->
    <circle cx="880" cy="268" r="12" fill="none" stroke="rgba(0,210,255,0.6)" stroke-width="2"/>
    <circle cx="920" cy="248" r="8" fill="rgba(0,210,255,0.3)" stroke="rgba(0,210,255,0.8)" stroke-width="1.5"/>
    <circle cx="960" cy="268" r="12" fill="none" stroke="rgba(0,210,255,0.6)" stroke-width="2"/>
    <line x1="892" y1="268" x2="908" y2="260" stroke="rgba(0,210,255,0.4)" stroke-width="1.5"/>
    <line x1="948" y1="260" x2="948" y2="268" stroke="rgba(0,210,255,0.4)" stroke-width="1.5"/>

    <!-- Bottom domain -->
    <text x="600" y="590" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="rgba(148,163,184,0.7)" text-anchor="middle">acquabluecorp.com</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(assetsDir, 'og-image.png'));
  console.log('✅ og-image.png (1200×630) created');

  // ─── 2. FAVICON 32×32 (SEO-07) ─────────────────────────────────────────────
  await sharp(path.join(assetsDir, 'logo.png'))
    .resize(32, 32, { fit: 'contain', background: { r: 7, g: 13, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(assetsDir, 'favicon-32.png'));
  console.log('✅ favicon-32.png created');

  // ─── 3. FAVICON 192×192 (SEO-07 / PWA) ─────────────────────────────────────
  await sharp(path.join(assetsDir, 'logo.png'))
    .resize(192, 192, { fit: 'contain', background: { r: 7, g: 13, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(assetsDir, 'favicon-192.png'));
  console.log('✅ favicon-192.png created');

  // ─── 4. APPLE TOUCH ICON 180×180 (UX-12) ───────────────────────────────────
  await sharp(path.join(assetsDir, 'logo.png'))
    .resize(180, 180, { fit: 'contain', background: { r: 7, g: 13, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(assetsDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png (180×180) created');

  console.log('\n🎉 All image assets generated successfully!');
  console.log(`   Output dir: ${assetsDir}`);
}

generateAssets().catch(err => {
  console.error('❌ Error generating assets:', err.message);
  process.exit(1);
});
