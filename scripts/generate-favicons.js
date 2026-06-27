/**
 * Regenerate PNG/ICO favicons from favicon.svg (requires: npm install sharp)
 * Run: node scripts/generate-favicons.js
 */
const sharp = require('sharp');
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const svg = path.join(root, 'favicon.svg');

async function main() {
  await sharp(svg).resize(48, 48).png().toFile(path.join(root, 'favicon-48.png'));
  await sharp(svg).resize(192, 192).png().toFile(path.join(root, 'favicon-192.png'));
  await sharp(svg).resize(180, 180).png().toFile(path.join(root, 'apple-touch-icon.png'));
  execSync(`python -c "from PIL import Image; sizes=[16,32,48]; imgs=[Image.open('favicon-48.png').resize((s,s), Image.Resampling.LANCZOS) for s in sizes]; imgs[0].save('favicon.ico', format='ICO', sizes=[(s,s) for s in sizes], append_images=imgs[1:])"`, { cwd: root, stdio: 'inherit' });
  console.log('Favicons generated.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
