// Generates public/og.jpg (1200x630) — navy gradient, wordmark, tagline and vessel render.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const W = 1200;
const H = 630;

const background = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1128"/>
      <stop offset="1" stop-color="#16244c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.42" r="0.55">
      <stop offset="0" stop-color="#4f7fce" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#4f7fce" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="84" y="252" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="800" letter-spacing="6" fill="#ffffff">LIGMAX</text>
  <path d="M84 292 c40 -26 80 -26 120 0 s80 26 120 0 s80 -26 120 0" stroke="#7ea4e0" stroke-width="7" fill="none" stroke-linecap="round"/>
  <text x="84" y="368" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#c3cee6">Autonomous Surface Vessel Team — NTNU Trondheim</text>
  <text x="84" y="416" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#93a5cd">Njord — The Autonomous Ship Challenge 2026</text>
</svg>`;

const boat = await sharp(path.join(root, 'src/assets/vessel-render.png'))
  .resize({ width: 620 })
  .png()
  .toBuffer();

const boatMeta = await sharp(boat).metadata();

await sharp(Buffer.from(background))
  .composite([
    {
      input: boat,
      left: W - boatMeta.width + 40,
      top: H - boatMeta.height + 30,
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, 'public/og.jpg'));

console.log('public/og.jpg written');
