import { Navigation } from '@/src/components/Navigation';
import { Hero } from '@/src/sections/Hero';
import { About } from '@/src/sections/About';
import { Engineering } from '@/src/sections/Engineering';
import { Journey } from '@/src/sections/Journey';
import { Achievements } from '@/src/sections/Achievements';
import { People } from '@/src/sections/People';
import { Impact } from '@/src/sections/Impact';
import { Gallery } from '@/src/sections/Gallery';
import { Partners } from '@/src/sections/Partners';
import { PageMotion } from '@/src/animations/PageMotion';
import { AgentTools } from '@/src/components/AgentTools';
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <About />
        <Engineering />
        <Journey />
        <Achievements />
        <People />
        <Impact />
        <Gallery />
        <Partners />
      </main>
      <PageMotion />
      <AgentTools />
    </>
  );
}
