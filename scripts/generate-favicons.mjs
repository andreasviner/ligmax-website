// Rasterises public/favicon.svg into the PNG sizes Google Search and mobile
// home screens expect (multiples of 48 for Google; 180 for apple-touch-icon).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svg = path.join(root, 'public/favicon.svg');

const targets = [
  { size: 96, file: 'public/favicon-96.png' },
  { size: 192, file: 'public/favicon-192.png' },
  { size: 180, file: 'public/apple-touch-icon.png' },
];

for (const { size, file } of targets) {
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(path.join(root, file));
  console.log(`${file} (${size}x${size}) written`);
}
