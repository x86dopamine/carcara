'use client';
import { useState } from 'react';
import { ArrowUpRight, Wind, ScanLine, Layers, Gauge } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SectionLabel } from '@/src/components/SectionLabel';
import { CarViewport } from '@/src/three/CarViewport';
import type { EngineeringMode } from '@/src/three/sceneConfig';
const areas = [
  {
    id: 'aero',
    number: '01',
    label: 'Aerodinâmica',
    icon: Wind,
    title: 'O ar também faz parte do projeto.',
    text: 'Estudar como o ar encontra cada superfície é um dos caminhos para entender o comportamento de um carro. Forma e fluxo precisam ser pensados juntos.',
    note: 'Linhas ilustrativas de fluxo. Não representam uma simulação CFD.',
  },
  {
    id: 'design',
    number: '02',
    label: 'Design',
    icon: ScanLine,
    title: 'Cada linha tem uma intenção.',
    text: 'Do conceito ao desenho digital, o design conecta forma, montagem e identidade. Um projeto pode ser revisto antes de chegar à fabricação.',
    note: 'Malha do conceito visual. O CAD oficial poderá substituir este modelo.',
  },
  {
    id: 'manufacturing',
    number: '03',
    label: 'Fabricação',
    icon: Layers,
    title: 'É quando a ideia ganha corpo.',
    text: 'Escolhas de materiais, construção e acabamento transformam um desenho em um objeto real. Precisão é parte dessa conversa.',
    note: 'Materiais e processos específicos da Carcará Lux aguardam confirmação.',
  },
  {
    id: 'testing',
    number: '04',
    label: 'Testes',
    icon: Gauge,
    title: 'Evoluir é perguntar de novo.',
    text: 'Testar, observar e comparar ajuda a avaliar decisões de projeto. O aprendizado de uma tentativa pode orientar a próxima.',
    note: 'Tempos, medidas e protocolos oficiais serão adicionados pela equipe.',
  },
] as const;
export function Engineering() {
  const [area, setArea] = useState<EngineeringMode>('aero');
  return (
    <section id="engenharia" className="section engineering-section">
      <SectionLabel number="02">DA IDEIA À PISTA</SectionLabel>
      <div className="section-heading">
        <h2>
          Velocidade
          <br />
          começa <em>no detalhe.</em>
        </h2>
        <p>
          Explore quatro perspectivas
          <br />
          sobre o desenvolvimento de um carro.
        </p>
      </div>
      <Tabs value={area} onValueChange={(v) => setArea(v as EngineeringMode)}>
        <TabsList className="engineering-tabs" aria-label="Área de engenharia">
          {areas.map((a) => (
            <TabsTrigger className="engineering-tab" value={a.id} key={a.id}>
              <span>{a.number}</span>
              <a.icon size={18} />
              {a.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="engineering-workspace">
          <div className="engineering-view">
            <div className="engineering-view-label">
              <span>ESTUDO DE FORMA</span>
              <span>CONCEITO 3D</span>
            </div>
            <CarViewport mode="inspect" engineeringMode={area} />
            <span className="engineering-disclaimer">
              Modelo ilustrativo · sem especificações do carro oficial
            </span>
          </div>
          <div className="engineering-description">
            {areas.map((a) => (
              <TabsContent value={a.id} key={a.id}>
                <span className="engineering-number">{a.number}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <div className="technical-note">
                  <span className="status-dot" />
                  {a.note}
                </div>
                <a href="#trajetoria" className="text-link">
                  Veja a nossa evolução <ArrowUpRight size={17} />
                </a>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
}
