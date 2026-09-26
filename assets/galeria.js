(() => {
  'use strict';
  const photos = [{"asset":"assets/galeria/DCXP2026/0e52ce26-ff88-4830-afc1-69dd7182eb74.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":1},{"asset":"assets/galeria/DCXP2026/12670405-9eba-48d9-8af6-25c8813d5044.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":2},{"asset":"assets/galeria/DCXP2026/1717619e-4bb7-4858-a4c7-457a70448d37.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":3},{"asset":"assets/galeria/DCXP2026/465d4c58-f6b6-4936-b997-0ca2b8939df0.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":4},{"asset":"assets/galeria/DCXP2026/77d0add3-959d-4de2-b614-9a2f22b81623.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":5},{"asset":"assets/galeria/DCXP2026/889ce6df-2d43-44a4-919a-de16a6e07dd4.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":6},{"asset":"assets/galeria/DCXP2026/8e0c28fb-e688-4fad-a214-6cde4fc23cba.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":7},{"asset":"assets/galeria/DCXP2026/aa7bb825-5acf-49df-a1ca-38027a485152.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":8},{"asset":"assets/galeria/DCXP2026/c7e6b000-3253-44bd-9e54-c49213e34528.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":9},{"asset":"assets/galeria/DCXP2026/e159979d-8a34-4a21-abe6-0487b3e908b4.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":10},{"asset":"assets/galeria/DCXP2026/e31df0a9-896c-475b-afbe-8265c3d64366.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":11},{"asset":"assets/galeria/DCXP2026/fe952425-5913-4787-9a9f-014cf1c15a73.jpg","album":"DCXP 2026","albumId":"dcxp-2026","number":12},{"asset":"assets/galeria/outros-registros/19c409fa-3524-4caa-b437-cd10424bf0b1.jpg","album":"Outros registros","albumId":"outros","number":1},{"asset":"assets/galeria/outros-registros/26fa3000-70e9-4d5d-adf7-3fb218d075cf.jpg","album":"Outros registros","albumId":"outros","number":2},{"asset":"assets/galeria/outros-registros/3c99ec28-ef82-40d0-9521-6c594d153e87.jpg","album":"Outros registros","albumId":"outros","number":3},{"asset":"assets/galeria/outros-registros/630eb539-ddbe-4ed3-aa2b-565f8a40d2fe.jpg","album":"Outros registros","albumId":"outros","number":4},{"asset":"assets/galeria/outros-registros/6a06b209-6b41-4718-b096-5ac1cc6de549.jpg","album":"Outros registros","albumId":"outros","number":5},{"asset":"assets/galeria/outros-registros/741acbb5-6ed4-49f9-887b-1966d4ff71ac.jpg","album":"Outros registros","albumId":"outros","number":6},{"asset":"assets/galeria/outros-registros/86aa29c4-618c-43c8-bb7b-8f7aca97ec4c.jpg","album":"Outros registros","albumId":"outros","number":7},{"asset":"assets/galeria/outros-registros/e2342bc4-18e0-4bfd-990a-7310719c09cf.jpg","album":"Outros registros","albumId":"outros","number":8},{"asset":"assets/galeria/GORN2026/0e76abfa-1292-4c06-9a7f-e84706489e8b.jpg","album":"GORN 2026","albumId":"gorn-2026","number":1},{"asset":"assets/galeria/GORN2026/5eba8802-b807-4fad-937f-804445b1ff65.jpg","album":"GORN 2026","albumId":"gorn-2026","number":2},{"asset":"assets/galeria/GORN2026/6840b30d-1c51-4278-bf33-ef71df27404e.jpg","album":"GORN 2026","albumId":"gorn-2026","number":3},{"asset":"assets/galeria/GORN2026/7ea159fe-5af1-45f0-b6e2-9362295be352.jpg","album":"GORN 2026","albumId":"gorn-2026","number":4},{"asset":"assets/galeria/GORN2026/a774b6c4-46b2-4478-9802-de5acb5aad36.jpg","album":"GORN 2026","albumId":"gorn-2026","number":5},{"asset":"assets/galeria/GORN2026/b10ab1fa-b532-4f99-bb26-123db26e9d31.jpg","album":"GORN 2026","albumId":"gorn-2026","number":6},{"asset":"assets/galeria/GORN2026/d78b93ad-9895-4675-aed4-6d480cc842f2.jpg","album":"GORN 2026","albumId":"gorn-2026","number":7}];
  const dialog = document.getElementById('gallery-dialog');
  const opener = document.querySelector('.gallery-open');
  const close = document.getElementById('gallery-close');
  const content = document.getElementById('gallery-dialog-content');
  const grid = document.getElementById('gallery-grid');
  const count = document.getElementById('gallery-visible-count');
  const viewer = document.getElementById('gallery-lightbox');
  const imageView = document.getElementById('gallery-active-image');
  const caption = document.getElementById('gallery-active-caption');
  const back = document.getElementById('gallery-viewer-back');
  const viewerClose = document.getElementById('gallery-viewer-close');
  let current = 0;
  let filter = 'all';
  if (!dialog || !opener || typeof dialog.showModal !== 'function') return;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    imageView.src = photo.asset;
    imageView.alt = 'Registro da Carcará Lux em ' + photo.album + ', foto ' + photo.number;
    caption.textContent = 'Foto ' + (current + 1) + ' de ' + photos.length + ' · ' + photo.album;
    content.hidden = true;
    viewer.hidden = false;
    back.focus({preventScroll: true});
  }
  photos.forEach((photo, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const image = document.createElement('img');
    const label = document.createElement('span');
    li.className = 'gallery-grid-item';
    button.className = 'gallery-photo';
    button.type = 'button';
    button.dataset.index = String(index);
    button.dataset.album = photo.albumId;
    button.setAttribute('aria-label', 'Abrir foto ' + (index + 1) + ' de ' + photos.length + ' — ' + photo.album);
    image.src = photo.asset;
    image.alt = 'Registro da Carcará Lux em ' + photo.album + ', foto ' + photo.number;
    image.loading = 'lazy';
    image.decoding = 'async';
    label.className = 'gallery-photo-label';
    label.textContent = photo.album;
    button.append(image, label);
    button.addEventListener('click', () => showPhoto(index));
    li.append(button);
    grid.append(li);
  });
  function applyFilter(value) {
    filter = value;
    let visible = 0;
    grid.querySelectorAll('.gallery-grid-item').forEach((item) => {
      const matches = value === 'all' || item.querySelector('.gallery-photo').dataset.album === value;
      item.hidden = !matches;
      if (matches) visible += 1;
    });
    document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.galleryFilter === value));
    });
    count.textContent = visible + (visible === 1 ? ' foto' : ' fotos');
  }
  opener.addEventListener('click', () => {
    content.hidden = false;
    viewer.hidden = true;
    applyFilter('all');
    dialog.showModal();
    close.focus({preventScroll: true});
  });
  close.addEventListener('click', () => dialog.close());
  viewerClose.addEventListener('click', () => dialog.close());
  back.addEventListener('click', () => {
    viewer.hidden = true;
    content.hidden = false;
    const active = grid.querySelector('[data-index="' + current + '"]');
    if (active && !active.closest('.gallery-grid-item').hidden) active.focus({preventScroll: true});
    else document.querySelector('[data-gallery-filter="' + filter + '"]').focus({preventScroll: true});
  });
  document.getElementById('gallery-previous').addEventListener('click', () => showPhoto(current - 1));
  document.getElementById('gallery-next').addEventListener('click', () => showPhoto(current + 1));
  document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.galleryFilter));
  });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (event) => {
    if (viewer.hidden) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  dialog.addEventListener('close', () => {
    content.hidden = false;
    viewer.hidden = true;
    opener.focus({preventScroll: true});
  });
})();
(() => {
  'use strict';
  const videos=[
    {id:'kXV5vYHVWt8',title:'CarcaráCast EP 3 - Acelerando com Elas: histórias que inspiram dentro e fora da pista'},
    {id:'IU4CIfhr8aI',title:'CarcaráCast EP 2 - Conhecendo a First Robotic Competition (FRC)- Carcará Lux'},
    {id:'tpPznp2vVSw',title:'CarcaráCast EP1 - Protagonismo feminino dentro da FCR E STEM racing - Carcará Lux'},
    {id:'-RUT4vEigG4',title:'🎙 Podcast Carcará Lux - Entrevista com a Engenheira'},
    {id:'HD20rXSLbI8',title:'🎙Podcast Carcará Lux - Entrevista com o Projeto Social da equipe 🧏‍♂️'},
    {id:'SsfNqvOC3eg',title:'🎙 Podcast Carcará Lux - Entrevista com Ex-Técnico'},
    {id:'qaSH7nnQnUM',title:'🚀🎙️ A Escuderia Carcará-Lux, participou de uma entrevista incrível na Rádio 105 FM…'},
    {id:'-oMY9GhIxkc',title:'🎙️ Podcast Carcará Lux - Especial com Ex-Integrante Luana'},
  ];
  const dialog=document.getElementById('podcast-dialog');
  const opener=document.querySelector('.podcast-open');
  const close=document.getElementById('podcast-close');
  const grid=document.getElementById('podcast-grid');
  const viewer=document.getElementById('podcast-viewer');
  const frame=document.getElementById('podcast-player-frame');
  const title=document.getElementById('podcast-active-title');
  const seriesLabel=document.getElementById('podcast-active-series');
  const watchLink=document.getElementById('podcast-watch-link');
  const back=document.getElementById('podcast-back');
  if(!dialog||!opener||!grid||typeof dialog.showModal!=='function') return;
  let lastVideoButton=null;
  function stopVideo(){frame.replaceChildren();viewer.hidden=true;grid.hidden=false;}
  function playVideo(video,button){
    lastVideoButton=button;grid.hidden=true;viewer.hidden=false;
    title.textContent=video.title;
    seriesLabel.textContent='CARCARÁ CAST';
    watchLink.href='https://www.youtube.com/watch?v='+video.id;
    const iframe=document.createElement('iframe');
    iframe.src='https://www.youtube.com/embed/'+video.id+'?autoplay=1&playsinline=1&rel=0';
    iframe.title=video.title+' · Carcará Cast';
    iframe.allow='autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    frame.replaceChildren(iframe);back.focus({preventScroll:true});
  }
  videos.forEach(video=>{
    const item=document.createElement('li'),card=document.createElement('article'),button=document.createElement('button');
    const thumbnail=document.createElement('span'),image=document.createElement('img'),play=document.createElement('span'),caption=document.createElement('span');
    const footer=document.createElement('div'),series=document.createElement('span'),youtube=document.createElement('a');
    item.className='podcast-grid-item';card.className='podcast-card';
    button.className='podcast-card-button';button.type='button';button.setAttribute('aria-label','Assistir vídeo: '+video.title);
    thumbnail.className='podcast-thumbnail';image.src='https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg';image.alt='';image.loading='lazy';image.decoding='async';
    play.className='podcast-play-icon';play.setAttribute('aria-hidden','true');
    caption.className='podcast-thumbnail-label';caption.textContent=video.title;
    thumbnail.append(image,play);button.append(thumbnail,caption);button.addEventListener('click',()=>playVideo(video,button));
    footer.className='podcast-card-footer';series.textContent='CARCARÁ CAST';
    youtube.href='https://www.youtube.com/watch?v='+video.id;youtube.target='_blank';youtube.rel='noopener noreferrer';
    youtube.innerHTML='<svg class="youtube-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect class="youtube-mark" x="2" y="5" width="20" height="14" rx="4"></rect><path class="youtube-play" d="m10 8.5 5.7 3.5-5.7 3.5z"></path></svg><span>YouTube</span>';
    footer.append(series,youtube);card.append(button,footer);item.append(card);grid.append(item);
  });
  opener.addEventListener('click',()=>{stopVideo();dialog.showModal();close.focus({preventScroll:true});});
  close.addEventListener('click',()=>dialog.close());
  back.addEventListener('click',()=>{stopVideo();if(lastVideoButton)lastVideoButton.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{stopVideo();opener.focus({preventScroll:true});});
})();
(() => {
  'use strict';
  const featuredAssets=new Set([
    'assets/galeria/DCXP2026/0e52ce26-ff88-4830-afc1-69dd7182eb74.jpg',
    'assets/galeria/DCXP2026/12670405-9eba-48d9-8af6-25c8813d5044.jpg',
    'assets/galeria/DCXP2026/465d4c58-f6b6-4936-b997-0ca2b8939df0.jpg',
    'assets/galeria/DCXP2026/889ce6df-2d43-44a4-919a-de16a6e07dd4.jpg',
    'assets/galeria/DCXP2026/8e0c28fb-e688-4fad-a214-6cde4fc23cba.jpg',
    'assets/galeria/DCXP2026/aa7bb825-5acf-49df-a1ca-38027a485152.jpg',
    'assets/galeria/DCXP2026/e159979d-8a34-4a21-abe6-0487b3e908b4.jpg',
    'assets/galeria/DCXP2026/e31df0a9-896c-475b-afbe-8265c3d64366.jpg',
    'assets/galeria/outros-registros/26fa3000-70e9-4d5d-adf7-3fb218d075cf.jpg',
    'assets/galeria/outros-registros/3c99ec28-ef82-40d0-9521-6c594d153e87.jpg',
    'assets/galeria/outros-registros/e2342bc4-18e0-4bfd-990a-7310719c09cf.jpg',
    'assets/galeria/GORN2026/5eba8802-b807-4fad-937f-804445b1ff65.jpg',
    'assets/galeria/GORN2026/b10ab1fa-b532-4f99-bb26-123db26e9d31.jpg'
  ]);
  const photoButtons=Array.from(document.querySelectorAll('#gallery-grid .gallery-photo'));
  const photos=photoButtons.map((button)=>{
    const photo=button.querySelector('img');
    return {src:photo.getAttribute('src'),alt:photo.alt,album:button.querySelector('.gallery-photo-label').textContent};
  }).filter((photo)=>featuredAssets.has(photo.src));
  const viewport=document.getElementById('gallery-carousel-viewport');
  const image=document.getElementById('gallery-carousel-image');
  const caption=document.getElementById('gallery-carousel-caption');
  const status=document.getElementById('gallery-carousel-status');
  if(!photos.length||!viewport||!image||!caption||!status) return;
  let currentIndex=0;
  let currentSlide=document.getElementById('gallery-carousel-slide');
  let moving=false;
  let timer=null;
  let fallbackTimer=null;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function showIndex(index){
    const photo=photos[index];
    image.src=photo.src;
    image.alt=photo.alt;
    caption.textContent=photo.album;
    status.textContent=String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');
  }
  function syncTimer(){
    window.clearInterval(timer);
    if(!reducedMotion&&!document.hidden) timer=window.setInterval(()=>changePhoto(1),5500);
  }
  function changePhoto(direction){
    if(moving) return;
    moving=true;
    const nextIndex=(currentIndex+direction+photos.length)%photos.length;
    const photo=photos[nextIndex];
    const preload=new Image();
    preload.onload=()=>{
      const slide=document.createElement('figure');
      slide.className='gallery-carousel-slide is-entering';
      slide.setAttribute('aria-hidden','false');
      const nextImage=document.createElement('img');
      nextImage.src=photo.src;
      nextImage.alt=photo.alt;
      const nextCaption=document.createElement('figcaption');
      nextCaption.textContent=photo.album;
      slide.append(nextImage,nextCaption);
      viewport.append(slide);
      if(reducedMotion){
        slide.classList.remove('is-entering');
        currentSlide.remove();
        currentSlide=slide;
        currentIndex=nextIndex;
        moving=false;
        showIndex(currentIndex);
        return;
      }
      void slide.offsetWidth;
      window.requestAnimationFrame(()=>{
        currentSlide.classList.add('is-leaving');
        slide.classList.remove('is-entering');
      });
      const finish=()=>{
        if(!moving) return;
        window.clearTimeout(fallbackTimer);
        currentSlide.remove();
        currentSlide=slide;
        currentIndex=nextIndex;
        moving=false;
        showIndex(currentIndex);
      };
      slide.addEventListener('transitionend',(event)=>{
        if(event.target===slide&&event.propertyName==='transform') finish();
      },{once:true});
      fallbackTimer=window.setTimeout(finish,850);
    };
    preload.onerror=()=>{moving=false;};
    preload.src=photo.src;
  }
  showIndex(currentIndex);
  syncTimer();
  document.addEventListener('visibilitychange',syncTimer);
})();
