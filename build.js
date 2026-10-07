
/**
 * build.js — AcQuaBlue Corporate Site
 * Genera la carpeta /dist con todos los archivos listos para publicar.
 * Ejecutado por: npm run build (via "build:copy")
 */

const fs = require('fs');
const path = require('path');

const DIST = 'dist';

// Archivos y carpetas que se publican en el hosting
// Ajusta esta lista si agregas nuevos archivos/carpetas al proyecto
const ITEMS = [
  'index.html',
  'css',
  'js',
  'assets',
  'robots.txt',
  'sitemap.xml',
];

console.log('🏗  AcQuaBlue build — generando ./dist');

// 1. Limpiar dist anterior
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
console.log('✔ dist/ limpiado');

// 2. Copiar cada item si existe
let copied = 0;
let skipped = 0;

for (const item of ITEMS) {
  if (!fs.existsSync(item)) {
    console.log(`⏭  Omitido (no existe): ${item}`);
    skipped++;
    continue;
  }
  const dest = path.join(DIST, item);
  fs.cpSync(item, dest, { recursive: true });
  console.log(`✔ Copiado: ${item} → ${dest}`);
  copied++;
}

console.log('');
console.log(`✅ Build completo: ${copied} items copiados, ${skipped} omitidos`);
console.log(`📦 Publish directory: ./${DIST}`);
