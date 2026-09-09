import type { Season } from './types';
// Anos de participação documentada; não correspondem a intervalos de temporada confirmados.
// Acrescente novos registros somente com informações oficiais ou fornecidas pela equipe.
export const seasons: Season[] = [
  {
    id: '2020',
    year: '2020',
    title: 'Nossa história já estava na pista.',
    description:
      'A Carcará Lux aparece no caderno oficial do Torneio SESI F1 in Schools, representando a SESI Escola São Gonçalo do Amarante.',
    competition: 'Torneio SESI · F1 in Schools',
    location: 'São Paulo, SP',
    source: {
      label: 'Caderno oficial SESI · p. 43',
      url: 'https://static.portaldaindustria.com.br/media/filer_public/f4/60/f46062ed-6bc9-448e-9e6b-67c1c88ab794/festival_sesi_de_robotica_2020_-_caderno_de_resumos_-_final.pdf',
    },
    members: [],
    results: [],
    awards: [],
    achievements: [],
    gallery: [],
  },
  {
    id: '2022',
    year: '2022',
    title: 'Identidade potiguar. Palco nacional.',
    description:
      'A Confederação Brasileira de Automobilismo registra a SESI Carcará Lux entre as participantes da final nacional da F1 in Schools em São Paulo.',
    competition: 'Final nacional · F1 in Schools',
    location: 'São Paulo, SP',
    source: {
      label: 'Confederação Brasileira de Automobilismo',
      url: 'https://www.cba.org.br/noticias/noticiasinfo/2230/f1-in-schools-disputa-final-em-sao-paulo',
    },
    members: [],
    results: [],
    awards: [],
    achievements: [],
    gallery: [],
  },
  {
    id: '2023',
    year: '2023',
    title: 'O próximo desafio: Brasília.',
    description:
      'A equipe integra a delegação do Rio Grande do Norte na F1 in Schools durante o Festival SESI de Robótica, de 15 a 18 de março.',
    competition: 'Festival SESI de Robótica · F1 in Schools',
    location: 'Brasília, DF',
    source: {
      label: 'FIERN · 14 mar. 2023',
      url: 'https://www2.fiern.org.br/sesi-escola-rn-participa-de-15-a-18-de-marco-da-maior-competicao-de-robotica-educacional-do-brasil/',
    },
    members: [],
    results: [],
    awards: [],
    achievements: [],
    gallery: [],
  },
  {
    id: '2024',
    year: '2024',
    title: 'Uma história em evolução.',
    description:
      'Mais um capítulo no Festival SESI de Educação, em Brasília. A participação da Carcará Lux na F1 in Schools está registrada na delegação oficial do SESI-RN.',
    competition: 'Festival SESI de Educação · F1 in Schools',
    location: 'Brasília, DF',
    source: {
      label: 'FIERN · 27 fev. 2024',
      url: 'https://www2.fiern.org.br/sesi-escola-rn-participa-festival-sesi-de-educacao-e-torneio-de-robotica-em-brasilia/',
    },
    members: [],
    results: [],
    awards: [],
    achievements: [],
    gallery: [],
  },
  {
    id: '2025',
    year: '2025',
    title: 'Velocidade que deixa marca.',
    description:
      'No Festival SESI de Robótica em Brasília, a Carcará Lux conquista o terceiro carro mais veloz da F1 in Schools. Um resultado de velocidade, registrado pela FIERN.',
    competition: 'Festival SESI de Robótica · F1 in Schools',
    location: 'Brasília, DF',
    source: {
      label: 'FIERN · 17 mar. 2025',
      url: 'https://www.fiern.org.br/equipes-das-escolas-sesi-rio-grande-norte-se-destacam-em-torneio-nacional-de-robotica/',
    },
    teamImage: '/images/team-2025.webp',
    members: [],
    results: [
      '3º carro mais veloz na F1 in Schools — não se refere à classificação geral.',
    ],
    awards: [],
    achievements: [],
    gallery: ['team-2025'],
  },
  {
    id: '2026',
    year: '2026',
    title: 'Asas para o próximo capítulo.',
    description:
      'A Carcará Lux participa da STEM Racing no Festival SESI de Educação em São Paulo. A cobertura oficial registra o lançamento do carro durante a competição.',
    competition: 'Festival SESI de Educação · STEM Racing',
    location: 'São Paulo, SP',
    source: {
      label: 'FIERN · 6 mar. 2026',
      url: 'https://www3.fiern.org.br/equipes-sesi-rn-iniciam-disputas-no-festival-sesi-de-educacao-com-boas-perspectivas-de-classificacao/',
    },
    teamImage: '/images/team-2026.webp',
    members: [],
    results: [],
    awards: [],
    achievements: [],
    socialProject: 'acelerando-com-elas',
    gallery: ['team-2026', 'impact-2026'],
  },
];
