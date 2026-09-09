import sharp from 'sharp';
import { stat } from 'node:fs/promises';
for (const [name, ext] of [
  ['car-concept', 'png'],
  ['team-2026', 'jpg'],
  ['team-2025', 'jpg'],
  ['impact-2026', 'jpg'],
]) {
  const input = 'public/images/' + name + '.' + ext;
  await sharp(input)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile('public/images/' + name + '.webp');
  await sharp(input)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile('public/images/' + name + '-640.webp');
  console.log(
    name +
      ': ' +
      Math.round((await stat('public/images/' + name + '.webp')).size / 1024) +
      ' KB',
  );
}
