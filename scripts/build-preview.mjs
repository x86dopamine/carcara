import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/postcss';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const assets = new Map();
for (const name of await readdir(
  new URL('../public/images/', import.meta.url),
)) {
  if (!name.endsWith('.webp')) continue;
  assets.set(
    '/images/' + name,
    'data:image/webp;base64,' +
      (
        await readFile(new URL('../public/images/' + name, import.meta.url))
      ).toString('base64'),
  );
}
const result = await build({
  configFile: false,
  root,
  publicDir: false,
  plugins: [
    {
      name: 'inline-preview-media',
      enforce: 'pre',
      transform(code, id) {
        if (!/\.[cm]?[jt]sx?$/.test(id) || id.includes('node_modules')) return;
        let converted = code;
        for (const [path, data] of assets)
          converted = converted.split(path).join(data);
        return converted === code ? null : { code: converted, map: null };
      },
    },
    react(),
  ],
  css: { postcss: { plugins: [tailwind()] } },
  resolve: { alias: { '@': root } },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    write: false,
    emptyOutDir: false,
    assetsInlineLimit: 10000000,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./preview-entry.tsx', import.meta.url)),
      name: 'CarcaraLuxPreview',
      formats: ['iife'],
    },
    rolldownOptions: {
      output: { codeSplitting: false },
      onLog(level, log, handler) {
        if (log.code !== 'MODULE_LEVEL_DIRECTIVE') handler(level, log);
      },
    },
  },
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap(
  (bundle) => bundle.output,
);
const chunks = outputs.filter((o) => o.type === 'chunk');
if (chunks.length !== 1)
  throw new Error('A prévia deve conter um único script independente.');
const css = outputs
  .filter((o) => o.type === 'asset' && o.fileName.endsWith('.css'))
  .map((o) => o.source)
  .join('\n');
if (!css) throw new Error('CSS da prévia ausente.');
const js = chunks[0].code.replace(/<\/script/gi, '<\\/script');
const favicon = (
  await readFile(new URL('../public/favicon.svg', import.meta.url))
).toString('base64');
const html =
  '<!doctype html>\n<html lang="pt-BR" class="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>CARCARÁ LUX — Prévia completa</title><meta name="description" content="Prévia local completa da Carcará Lux."><link rel="icon" href="data:image/svg+xml;base64,' +
  favicon +
  '"><style>' +
  css +
  '</style></head><body><div id="root"></div><noscript>Ative o JavaScript para visualizar a experiência completa da Carcará Lux.</noscript><script>' +
  js +
  '</script></body></html>';
await writeFile(new URL('../index.html', import.meta.url), html);
console.log(
  'index.html gerado: ' +
    (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) +
    ' MB. Fotos, fontes, CSS e JavaScript incorporados; pode abrir com dois cliques.',
);
