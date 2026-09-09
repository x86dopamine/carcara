import type { Metadata } from 'next';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL('https://carcara-lux.chiquinhokksuef.chatgpt.site'),
  title: 'CARCARÁ LUX — Engenharia que ganha asas',
  description:
    'Do Rio Grande do Norte para a pista. Conheça a Carcará Lux, equipe de STEM Racing: engenharia, trajetória e impacto além da competição.',
  openGraph: {
    title: 'CARCARÁ LUX — Engenharia que ganha asas',
    description:
      'Engenharia, velocidade e identidade potiguar. Conheça a equipe Carcará Lux.',
    locale: 'pt_BR',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
