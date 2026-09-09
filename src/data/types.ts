export type Source = { label: string; url: string };
export type Media = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'Equipe' | 'Impacto' | 'Conceito';
  year?: string;
  credit: string;
  source?: Source;
  placeholder?: boolean;
};
export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
};
export type Achievement = {
  id: string;
  number: string;
  title: string;
  detail: string;
  year: string;
  source: Source;
};
export type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  year?: string;
  source?: Source;
};
export type Partner = {
  id: string;
  name: string;
  logo: string;
  url?: string;
  background: 'dark' | 'light';
};
export type Season = {
  id: string;
  year: string;
  title: string;
  description: string;
  competition: string;
  location: string;
  source: Source;
  carName?: string;
  carImage?: string;
  carModel?: string;
  teamImage?: string;
  members: Member[];
  results: string[];
  awards: string[];
  achievements: string[];
  designEvolution?: string;
  socialProject?: string;
  gallery: string[];
};
