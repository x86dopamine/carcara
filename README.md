# Carcará Lux

Site React + TypeScript, Vinext/Vite, React Three Fiber, Drei, Three.js e GSAP.

## Desenvolvimento

- Node 22.13+; npm install
- npm run dev
- npm run build
- npx tsc --noEmit
- npm run lint

## Atualizar conteúdo

Todos os dados ficam em src/data:

- site.ts: identidade, Instagram, e-mail, logo oficial e modelo principal.
- seasons.ts: registros documentados. Cada ano aceita carModel GLB/GLTF, carImage, teamImage, members, results, awards, achievements, designEvolution, socialProject e gallery.
- team.ts: elenco atual. Vazio intencionalmente até confirmação.
- achievements.ts: somente resultados com fonte.
- partners.ts: logotipos oficiais e background dark/light.
- projects.ts e gallery.ts: projetos, imagens, legendas e fontes.

## Identidade e modelo oficial

A identificação textual CARCARÁ LUX é provisória; não é um redesenho do logo oficial.
Coloque o logo sem modificar proporções em public/brand e preencha site.logo.
O decal projetado sobre a superfície do carro conceitual usa site.car.logoDecal quando disponível. Sem esse arquivo, usa somente o nome textual.
Coloque o GLB/GLTF com texturas em public/models e configure site.car.model. Para modelos com Draco, useGLTF suporta o decoder padrão; para implantação sem serviços externos, hospede os decoders localmente e configure useGLTF.setDecoderPath. Prefira GLB com texturas integradas e comprimidas.
O modelo oficial deve vir com UV e adesivos próprios. Ajustes de enquadramento, escala e posição estão em src/three/sceneConfig.ts. O padrão usa X para o comprimento, Y para cima e nariz voltado para -X. Os valores do conceito são unidades visuais, nunca especificações de fabricação.
Cada temporada pode configurar seu próprio carModel, carregado somente enquanto selecionado e visível.

## Mídia e fatos

- O render car-concept é ilustrativo e foi gerado por IA; não representa o carro real.
- Registros documentados: 2020, 2022, 2023, 2024, 2025 e 2026. Não há afirmação sobre 2021 ou data de fundação.
- Resultado 2025: 3º carro mais veloz da F1 in Schools, não terceiro lugar geral.
- Fotos reais da Carcará Lux, extraídas de notícias FIERN, com crédito e fonte em src/data/gallery.ts. A foto 2026 tem crédito SESI/RN; as outras não identificam fotógrafo. Não foi identificada licença aberta; confirmar autorização de uso antes de publicação externa.
- A foto de impacto retrata participantes de um encontro, não um elenco da equipe.
- Fontes históricas estão vinculadas nos capítulos e em docs/fontes.md.
- Originais de imagem em public/images; scripts/optimize-images.mjs gera WebP e variantes 640px.

## Acessibilidade e desempenho

Navegação sem bloqueio de rolagem, links de salto, foco visível, abas com teclado e modais Base UI com gerenciamento de foco. Galeria suporta setas e Escape. Respeita prefers-reduced-motion; celular/economia de dados usam imagem por padrão e permitem ativar 3D. A cena não gira indefinidamente.
Canvas carregado por import dinâmico; somente cenas visíveis são montadas, com renderização sob demanda, DPR limitado e recuperação por imagem quando há erro WebGL ou timeout.
Sem formulário que simule envio. Contato leva ao Instagram oficial; e-mail pode ser configurado.
WebMCP é aprimoramento opcional para leitura de temporadas. Validação em contexto WebMCP não disponível nesta implementação; não foi declarada verificada.

## Arquitetura

src/components: interface reutilizável.
src/sections: seções editoriais.
src/three: modelo, materiais, iluminação, câmera, rolagem, anotações e fallback independentes.
src/animations: efeitos de entrada.
src/data: conteúdo editável e tipos.

A ausência de nomes atuais, logos oficiais, patrocínios e ficha técnica está visível de forma intencional, conforme o pedido.
