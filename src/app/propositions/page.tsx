'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SearchIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TagIcon,
  FilterIcon,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { withAuth } from "../hoc/withAuth";

function PropositionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [expandedProposition, setExpandedProposition] = useState<string | null>(
    null,
  );

  const [propositions, setPropositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [statuses, setStatuses] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPropositions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposicoes/`);
        const data = await res.json();
        console.log(data);
        setPropositions(data);

        // Extract unique types
        const uniqueTypes = Array.from(new Set(data.map((prop: any) => prop.sigla_tipo)));
        setTypes(uniqueTypes as string[]);
        setSelectedTypes(uniqueTypes as string[]);

        // Extract unique themes
        const uniqueThemes = Array.from(new Set(data.flatMap((prop: any) => prop.temas)));
        setThemes(uniqueThemes as string[]);
        setSelectedThemes(uniqueThemes as string[]);

        // Extract unique statuses
        const uniqueStatuses = Array.from(new Set(data.map((prop: any) => prop.descricao_situacao)));
        setStatuses(uniqueStatuses as string[]);
        setSelectedStatuses(uniqueStatuses as string[]);

      } catch (error) {
        console.error("Error fetching proposicoes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPropositions();
  }, []);

  if (loading) return <p>Loading...</p>;
  // const propositions = [
  //   {
  //     id: "PEC 45/2024 - Reforma Administrativa",
  //     type: "PEC",
  //     descricao_situacao: "Em tramitação",
  //     date: "2024-03-14",
  //     author: "Sen. Maria Santos",
  //     summary:
  //       "Proposta de Emenda à Constituição que altera dispositivos sobre a administração pública e estabelece novo regime de vínculos administrativos.",
  //     temas: ["Administração Pública", "Reforma"],
  //     details: {
  //       mainPoints: [
  //         "Reforma do sistema de carreiras",
  //         "Novas regras para contratação",
  //         "Mudanças no regime de estabilidade",
  //       ],

  //       impact: "Alto impacto na estrutura administrativa federal",
  //       nextSteps: "Em análise na CCJ",
  //       relatedPropositions: ["PEC 32/2020", "PL 1789/2021"],
  //     },
  //   },
  //   // ... other propositions
  // ];

  const filteredPropositions = propositions.filter((prop) => {
    const matchesSearch = prop.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatuses.includes(prop.descricao_situacao);
    const matchesType =
      selectedTypes.includes(prop.sigla_tipo);
    const matchesTheme =
      prop.temas.some((tema: string) => selectedThemes.includes(tema));

    return matchesSearch && matchesStatus && matchesType && matchesTheme;
  });

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <SearchIcon
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Buscar proposição..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Card className="flex items-center space-x-2 px-4 py-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-2 hover:bg-transparent"
                >
                  Status <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2">
                {statuses.map((descricao_situacao, index) => (
                  <div
                    key={descricao_situacao}
                    className="flex items-center space-x-2 p-2"
                    id={`oaud4p_${index}`}
                  >
                    <Checkbox
                      id={descricao_situacao}
                      checked={selectedStatuses.includes(descricao_situacao)}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, descricao_situacao]
                            : selectedStatuses.filter((s) => s !== descricao_situacao),
                        );
                      }}
                    />

                    <label
                      htmlFor={descricao_situacao}
                      className="text-sm font-medium"
                      id={`599qfc_${index}`}
                    >
                      {descricao_situacao}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-2 hover:bg-transparent"
                >
                  Tipo <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2">
                {types.map((tipo, index) => (
                  <div
                    key={tipo}
                    className="flex items-center space-x-2 p-2"
                    id={`77bnbe_${index}`}
                  >
                    <Checkbox
                      id={tipo}
                      checked={selectedTypes.includes(tipo)}
                      onCheckedChange={(checked) => {
                        setSelectedTypes(
                          checked
                            ? [...selectedTypes, tipo]
                            : selectedTypes.filter((t) => t !== tipo),
                        );
                      }}
                    />

                    <label
                      htmlFor={tipo}
                      className="text-sm font-medium"
                      id={`g1joyp_${index}`}
                    >
                      {tipo}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-2 hover:bg-transparent"
                >
                  Tema <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2">
                {themes.map((tema, index) => (
                  <div
                    key={tema}
                    className="flex items-center space-x-2 p-2"
                    id={`mamlol_${index}`}
                  >
                    <Checkbox
                      id={tema}
                      checked={selectedThemes.includes(tema)}
                      onCheckedChange={(checked) => {
                        setSelectedThemes(
                          checked
                            ? [...selectedThemes, tema]
                            : selectedThemes.filter((t) => t !== tema),
                        );
                      }}
                    />

                    <label
                      htmlFor={tema}
                      className="text-sm font-medium"
                      id={`jsn7k7_${index}`}
                    >
                      {tema}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-4">
            {filteredPropositions.map((proposition, index) => (
              <Collapsible
                key={proposition.id}
                open={expandedProposition === proposition.id}
                onOpenChange={() =>
                  setExpandedProposition(
                    expandedProposition === proposition.id
                      ? null
                      : proposition.id,
                  )
                }
                id={`e956pl_${index}`}
              >
                <Card
                  className="overflow-hidden transition-all duration-200 hover:shadow-md"
                  id={`ie0ugy_${index}`}
                >
                  <CollapsibleTrigger className="w-full" id={`05m6l7_${index}`}>
                    <CardContent className="p-4" id={`m2e7m3_${index}`}>
                      <div
                        className="flex items-center justify-between mb-2"
                        id={`mtfoyr_${index}`}
                      >
                        <div
                          className="flex items-center space-x-2"
                          id={`rkeeex_${index}`}
                        >
                          <span
                            className="font-semibold"
                            id={`i7un22_${index}`}
                          >
                            {proposition.nome}
                          </span>
                          <Badge id={`5imy14_${index}`}>
                            {proposition.casa}
                          </Badge>
                          <Badge
                            variant={
                              proposition.descricao_situacao === "Aprovado"
                                ? "default"
                                : proposition.descricao_situacao === "Em votação"
                                  ? "secondary"
                                  : "outline"
                            }
                            id={`5imy14_${index}`}
                          >
                            {proposition.descricao_situacao}
                          </Badge>

                          

                        </div>
                        <div
                          className="flex items-center space-x-2"
                          id={`liiulb_${index}`}
                        >
                          {/* <span
                            className="text-sm text-muted-foreground"
                            id={`b6p37y_${index}`}
                          >
                            {new Date(proposition.date).toLocaleDateString('pt-BR')}
                          </span> */}
                          {expandedProposition === proposition.id ? (
                            <ChevronUpIcon
                              className="h-4 w-4"
                              id={`o77f5v_${index}`}
                            />
                          ) : (
                            <ChevronDownIcon
                              className="h-4 w-4"
                              id={`vedcxy_${index}`}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        className="text-sm text-muted-foreground mb-3 text-left"
                        id={`uk49t2_${index}`}
                      >
                        {proposition.summary}
                      </p>
                      <div
                        className="flex flex-wrap gap-2"
                        id={`f7p49n_${index}`}
                      >
                        {proposition.temas.map((tema: string, temaIndex: number) => (
                          <Badge
                            key={temaIndex}
                            variant="outline"
                            className="flex items-center"
                            id={`tyhzjr_${index}`}
                          >
                            <TagIcon
                              className="h-3 w-3 mr-1"
                              id={`aodcu3_${index}`}
                            />
                            {tema}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent id={`2z7h7u_${index}`}>
                    <CardContent
                      className="p-4 bg-muted/50 border-t"
                      id={`7exfuz_${index}`}
                    >
                      <div className="space-y-4" id={`lon68h_${index}`}>
                        {/* <div id={`cq3ztp_${index}`}>
                          <h4
                            className="font-semibold mb-2"
                            id={`iy4ebz_${index}`}
                          >
                            Pontos Principais
                          </h4>
                          <ul
                            className="list-disc list-inside text-sm space-y-1"
                            id={`qovdlx_${index}`}
                          >
                            {proposition.details.mainPoints.map(
                              (point: string, pointIndex: number) => (
                                <li key={pointIndex} id={`1gzcvt_${index}`}>
                                  {point}
                                </li>
                              ),
                            )}
                          </ul>
                        </div> */}
                        <div
                          className="grid grid-cols-2 gap-4"
                          id={`y7zn36_${index}`}
                        >
                          <div id={`p46bbg_${index}`}>
                            <h4
                              className="font-semibold mb-2"
                              id={`w5b2sr_${index}`}
                            >
                              Ementa
                            </h4>
                            <p className="text-sm" id={`wi3qb8_${index}`}>
                              {proposition.ementa}
                            </p>
                          </div>
                          <div id={`j4tjdl_${index}`}>
                            {/* <h4
                              className="font-semibold mb-2"
                              id={`8rxt98_${index}`}
                            >
                              Próxima Etapa
                            </h4>
                            <p className="text-sm" id={`0nes3v_${index}`}>
                              {proposition.ementa_detalhada}
                            </p> */}
                            <h4
                              className="font-semibold mb-2 mt-4"
                              id={`8rxt98_${index}`}
                            >
                              Autores
                            </h4>
                            <ul className="text-sm" id={`0nes3v_${index}`}>
                              {proposition.autores.map((autor: { nome: string }, autorIndex: number) => (
                                <li key={autorIndex}>{autor.nome}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {proposition.uri && (
                          <div id={`ik343s_${index}`}>
                            <div className="flex items-center mb-2" id={`186rwi_${index}`}>
                              <a
                                href={proposition.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`faf0co_${index}`}
                                className="flex items-center"
                              >
                                <FileTextIcon className="mr-2" />
                                <h4 className="font-semibold" id={`186rwi_${index}`}>
                                  Detalhes da Proposição
                                </h4>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default withAuth(PropositionsPage);
