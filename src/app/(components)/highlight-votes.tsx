'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VoteIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function HighlightVotes() {
  const [expandedVote, setExpandedVote] = useState<string | null>(null);

  const votes = [
    {
      id: "PEC 45/2024",
      title: "Reforma Administrativa",
      result: "Aprovado",
      votes: { favor: 308, against: 114, abstain: 91 },
      date: "2024-03-14",
      details: {
        summary:
          "Proposta de Emenda à Constituição que altera dispositivos sobre a administração pública.",
        mainPoints: [
          "Reforma do sistema de carreiras do serviço público",
          "Novas regras para contratação de servidores",
          "Mudanças no regime de estabilidade",
        ],

        impact: "Alto impacto na estrutura administrativa federal",
        nextSteps: "Segue para promulgação",
      },
    },
    {
      id: "PL 1234/2024",
      title: "Alteração na Lei de Diretrizes Orçamentárias",
      result: "Em votação",
      votes: { favor: 245, against: 187, abstain: 45 },
      date: "2024-03-15",
      details: {
        summary:
          "Projeto que modifica parâmetros da LDO para o próximo ano fiscal.",
        mainPoints: [
          "Revisão das metas fiscais",
          "Ajuste nos critérios de contingenciamento",
          "Novas regras para emendas parlamentares",
        ],

        impact: "Médio impacto no planejamento orçamentário",
        nextSteps: "Em discussão no plenário",
      },
    },
    {
      id: "PLP 789/2024",
      title: "Regulamentação do Mercado de Criptomoedas",
      result: "Aprovado",
      votes: { favor: 267, against: 148, abstain: 63 },
      date: "2024-03-13",
      details: {
        summary:
          "Lei Complementar que estabelece marco regulatório para criptoativos.",
        mainPoints: [
          "Definição do conceito legal de criptomoedas",
          "Regras para exchanges e corretoras",
          "Medidas de proteção ao investidor",
        ],

        impact: "Alto impacto no mercado financeiro",
        nextSteps: "Aguarda sanção presidencial",
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <VoteIcon className="h-5 w-5" />
          Votações em Destaque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {votes.map((vote, index) => (
              <Collapsible
                key={vote.id}
                open={expandedVote === vote.id}
                onOpenChange={() =>
                  setExpandedVote(expandedVote === vote.id ? null : vote.id)
                }
                id={`7lmb39_${index}`}
              >
                <Card
                  className="overflow-hidden transition-all duration-200 hover:shadow-md"
                  id={`m0a21o_${index}`}
                >
                  <CollapsibleTrigger className="w-full" id={`gnq308_${index}`}>
                    <CardContent className="p-4" id={`ruv7cp_${index}`}>
                      <div
                        className="flex items-center justify-between mb-2"
                        id={`y4i9lg_${index}`}
                      >
                        <span className="font-semibold" id={`ohyu48_${index}`}>
                          {vote.id}
                        </span>
                        <Badge
                          variant={
                            vote.result === "Aprovado"
                            ? "default" // or "secondary", "destructive", etc.
                            : vote.result === "Em votação"
                            ? "secondary"
                            : "outline"
                          }
                          id={`gjt85a_${index}`}
                        >
                          {vote.result}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3" id={`zkxbe8_${index}`}>
                        {vote.title}
                      </p>
                      <div
                        className="grid grid-cols-3 gap-2 text-sm"
                        id={`8aubd6_${index}`}
                      >
                        <div className="text-green-600" id={`ic1f1v_${index}`}>
                          A favor: {vote.votes.favor}
                        </div>
                        <div className="text-red-600" id={`n6o6hi_${index}`}>
                          Contra: {vote.votes.against}
                        </div>
                        <div
                          className="text-muted-foreground"
                          id={`38clwr_${index}`}
                        >
                          Abstenção: {vote.votes.abstain}
                        </div>
                      </div>
                      <div
                        className="flex justify-between items-center mt-2"
                        id={`k1qd82_${index}`}
                      >
                        <span
                          className="text-sm text-muted-foreground"
                          id={`rd8ofb_${index}`}
                        >
                          {new Date(vote.date).toLocaleDateString()}
                        </span>
                        {expandedVote === vote.id ? (
                          <ChevronUpIcon
                            className="h-4 w-4"
                            id={`iqt2jj_${index}`}
                          />
                        ) : (
                          <ChevronDownIcon
                            className="h-4 w-4"
                            id={`wb2j0p_${index}`}
                          />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent id={`5bq4jo_${index}`}>
                    <CardContent
                      className="p-4 bg-muted/50 border-t"
                      id={`0k4gbb_${index}`}
                    >
                      <div className="space-y-4" id={`lyuc54_${index}`}>
                        <div id={`7spauc_${index}`}>
                          <h4
                            className="font-semibold mb-2"
                            id={`aek8hg_${index}`}
                          >
                            Resumo
                          </h4>
                          <p className="text-sm" id={`0445wx_${index}`}>
                            {vote.details.summary}
                          </p>
                        </div>
                        <div id={`846uzo_${index}`}>
                          <h4
                            className="font-semibold mb-2"
                            id={`7iliy7_${index}`}
                          >
                            Pontos Principais
                          </h4>
                          <ul
                            className="list-disc list-inside text-sm space-y-1"
                            id={`cubcg4_${index}`}
                          >
                            {vote.details.mainPoints.map((point, index) => (
                              <li key={index} id={`7x2sdf_${index}`}>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className="grid grid-cols-2 gap-4"
                          id={`4752mj_${index}`}
                        >
                          <div id={`rbtj24_${index}`}>
                            <h4
                              className="font-semibold mb-2"
                              id={`l8j1zo_${index}`}
                            >
                              Impacto
                            </h4>
                            <p className="text-sm" id={`27cxvf_${index}`}>
                              {vote.details.impact}
                            </p>
                          </div>
                          <div id={`xfh9ng_${index}`}>
                            <h4
                              className="font-semibold mb-2"
                              id={`g2kvft_${index}`}
                            >
                              Próximos Passos
                            </h4>
                            <p className="text-sm" id={`89uxpv_${index}`}>
                              {vote.details.nextSteps}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
