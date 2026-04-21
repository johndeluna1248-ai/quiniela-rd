// Script para generar og-image.png desde HTML usando Puppeteer
// Genera el archivo en dimensiones EXACTAS de 1200x630 px (sin @2x)
// Ejecución: node tools/generate-og-image.mjs
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
  console.log('🚀 Generando og-image.png (1200x630 exactos)...');

  // Lanza Chromium headless
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Viewport EXACTO sin deviceScaleFactor (archivo 1200x630 real)
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1  // 1x = dimensiones reales, no retina
  });

  // Carga el HTML local desde tools/og-image.html
  const htmlPath = path.join(__dirname, 'og-image.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0'
  });

  // Espera a que se apliquen fuentes y gradientes complejos
  await new Promise(r => setTimeout(r, 800));

  // Captura como PNG con clip explícito de 1200x630
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await page.screenshot({
    path: outputPath,
    type: 'png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();
  console.log('✅ Creado: public/og-image.png (1200x630 exacto)');
}

generate().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
