# Carcará Lux

Para assistir aos episódios incorporados do Carcará Cast, abra abrir-site.bat. Ele inicia um servidor local e abre o site no navegador. O site precisa de internet para carregar os vídeos e as capas do YouTube. Para navegar sem vídeos, index.html também pode ser aberto com dois cliques.

- `index.html`: conteúdo e estrutura.
- `style.css`: layout responsivo, vidro e relevo 3D estático.
- `script.js`: entradas de conteúdo, menu, etapas e histórico.
- `assets`: identidade visual, fontes e GSAP 3.14.2 local, com suas licenças.

A ave central usa um SVG de cerca de 1,5 KB, extraído da referência da equipe. Ela permanece parada, com perspectiva e camadas de relevo 3D. A capa exibe CARCARÁ LUX no lugar das frases anteriores.

GSAP anima a abertura e a primeira entrada de cada bloco. Um IntersectionObserver nativo acompanha a visibilidade, sem biblioteca de rolagem, leitura de posição a cada movimento do mouse ou animação contínua em JavaScript. As entradas respeitam a preferência por movimento reduzido. A ave não tem animação de entrada nem movimento contínuo.

O vidro usa iluminação estática, um único plano com blur e um reflexo animado por transformação e opacidade.

A barra de navegação fica oculta na capa e aparece fixa quando a seção seguinte chega à área do cabeçalho. Um carro vetorial preto e laranja com o nome Carcará Lux atravessa a barra uma vez a cada entrada. Ao voltar à capa, a barra e o menu móvel são recolhidos. A detecção usa IntersectionObserver, sem processamento contínuo de rolagem nos navegadores atuais.


Os registros históricos mantêm os links para suas fontes. Links para Instagram e fontes externas precisam de internet.

Ao finalizar a passagem, um evento de término desativa as animações do carro e da fumaça e remove suas reservas de composição. A animação é preparada novamente apenas quando a barra reaparece.



A assinatura CARCARÁ LUX foi vetorizada da referência da equipe, sem o quadriculado, e recebe profundidade estática com duas camadas. A navegação usa botões escuros com detalhes laranja; Fale conosco abre o Instagram. Instagram, YouTube e WhatsApp estão no rodapé.

A assinatura da capa é exibida como um único SVG com letras, profundidade e margens incorporadas. O recorte anterior com máscaras foi removido; a entrada usa apenas opacidade e um deslocamento vertical curto.

As letras repetidas da assinatura compartilham os mesmos contornos vetoriais, com curvas e linhas de base regulares. As seções usam vidro escuro em preto, grafite e laranja, com reflexos discretos; o blur de painéis é desativado nas telas menores. A fumaça tem camadas de gradientes suaves, animadas apenas em posição, escala e opacidade.

A trajetória está organizada em quatro temporadas bienais: 2019–2020, 2021–2022, 2023–2024 e 2025–2026. As fotos enviadas pela equipe identificam as duas primeiras gerações; as demais temporadas mantêm os registros já disponíveis. A moldura fixa preserva a foto completa durante a transição entre temporadas.
