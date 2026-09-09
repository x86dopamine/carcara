import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { seasons } from '../src/data/seasons.ts';
import { gallery } from '../src/data/gallery.ts';
import { projects } from '../src/data/projects.ts';
import { achievements } from '../src/data/achievements.ts';
import { site } from '../src/data/site.ts';
const localAsset = async (path) => {
  assert(
    path.startsWith('/') && !path.includes('..'),
    'Local asset must stay inside public',
  );
  await access(new URL('../public' + path, import.meta.url));
};
assert.equal(new Set(seasons.map((s) => s.id)).size, seasons.length);
assert.equal(new Set(gallery.map((m) => m.id)).size, gallery.length);
for (const season of seasons) {
  assert.ok(season.year && season.description && season.source.url);
  assert.equal(new URL(season.source.url).protocol, 'https:');
  for (const id of season.gallery)
    assert.ok(
      gallery.some((m) => m.id === id),
      'Missing season image ' + id,
    );
  if (season.socialProject)
    assert.ok(projects.some((p) => p.id === season.socialProject));
  for (const path of [
    season.carImage,
    season.carModel,
    season.teamImage,
  ].filter(Boolean))
    await localAsset(path);
}
for (const media of gallery) {
  assert(media.alt && media.credit);
  await localAsset(media.src);
  if (media.src.endsWith('.webp'))
    await localAsset(media.src.replace('.webp', '-640.webp'));
  if (media.placeholder) assert.match(media.credit, /ilustrativo/);
}
for (const result of achievements) assert(result.source.url && result.detail);
await localAsset(site.car.poster);
const stylesheet = await readFile(
  new URL('../app/globals.css', import.meta.url),
  'utf8',
);
assert(stylesheet.includes('prefers-reduced-motion'));
assert(stylesheet.includes('poster-hidden'));
console.log(
  'Conteúdo validado: ' +
    seasons.length +
    ' anos com fontes, ' +
    gallery.length +
    ' imagens existentes e referências de projetos íntegras.',
);
