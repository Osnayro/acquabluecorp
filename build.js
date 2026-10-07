
const fs = require('fs');
const path = require('path');

const DIST = 'dist';

// Archivos y carpetas que se publicarán en Netlify
const ITEMS = [
  'index.html',
  'css',
  'js',
  'assets',
  'robots.txt',
  'sitemap.xml',
];

// Limpiar dist anterior
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// Copiar cada item si existe
for (const item of ITEMS) {
  if (!fs.existsSync(item)) {
    console.log(`⏭  Omitido (no existe): ${item}`);
    continue;
  }
  const dest = path.join(DIST, item);
  fs.cpSync(item, dest, { recursive: true });
  console.log(`✔ Copiado: ${item} → ${dest}`);
}

console.log('✅ Build listo en ./dist');
```

Nota importante: la carpeta src no se copia porque solo contiene el input.css de Tailwind, que no debe publicarse. El CSS final ya queda dentro de css/tailwind.css, que sí se copia.

---

📄 2) Actualiza los scripts en tu package.json

Reemplaza el bloque scripts completo por este:

```json
"scripts": {
  "build:css": "node node_modules/@tailwindcss/cli/dist/index.mjs -i ./src/input.css -o ./css/tailwind.css --minify",
  "watch:css": "node node_modules/@tailwindcss/cli/dist/index.mjs -i ./src/input.css -o ./css/tailwind.css --watch",
  "build:copy": "node build.js",
  "build": "npm run build:css && npm run build:copy",
  "generate-assets": "node generate-assets.js"
},
