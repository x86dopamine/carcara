import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/ibm-plex-mono/400.css';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(
  <>
    <a className="skip-link" href="#conteudo">
      Pular para o conteúdo
    </a>
    <Home />
  </>,
);
