'use client';
import { useEffect } from 'react';
import { seasons } from '@/src/data/seasons';
// Progressive enhancement; the ordinary interface does not depend on WebMCP.
type Context = {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export function AgentTools() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: Context })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'read_carcara_season',
            description:
              'Read a documented Carcará Lux participation year with results and official source. Does not infer missing history.',
            inputSchema: {
              type: 'object',
              properties: {
                year: { type: 'string', enum: seasons.map((s) => s.year) },
              },
              required: ['year'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: true },
            execute(input) {
              if (
                typeof input !== 'object' ||
                !input ||
                !('year' in input) ||
                typeof input.year !== 'string' ||
                Object.keys(input).length !== 1
              )
                throw new Error('Informe apenas um ano documentado.');
              const season = seasons.find((s) => s.year === input.year);
              if (!season) throw new Error('Ano não documentado neste acervo.');
              return {
                year: season.year,
                title: season.title,
                description: season.description,
                results: season.results,
                source: season.source,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Unsupported experimental implementations must not break the page. */
    }
    return () => lifecycle.abort();
  }, []);
  return null;
}
