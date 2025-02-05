'use client';

import React, { useState } from "react";
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

export default function PropositionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Em tramitação",
    "Em votação",
    "Aprovado",
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "PEC",
    "PL",
    "PLP",
  ]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "Economia",
    "Tecnologia",
    "Administração Pública",
    "Reforma",
  ]);
  const [expandedProposition, setExpandedProposition] = useState<string | null>(
    null,
  );

  const statuses = ["Em tramitação", "Em votação", "Aprovado"];
  const types = ["PEC", "PL", "PLP"];
  const themes = ["Economia", "Tecnologia", "Administração Pública", "Reforma"];

  const propositions = [
    {
      id: "PEC 45/2024 - Reforma Administrativa",
      type: "PEC",
      status: "Em tramitação",
      date: "2024-03-14",
      author: "Sen. Maria Santos",
      summary:
        "Proposta de Emenda à Constituição que altera dispositivos sobre a administração pública e estabelece novo regime de vínculos administrativos.",
      themes: ["Administração Pública", "Reforma"],
      details: {
        mainPoints: [
          "Reforma do sistema de carreiras",
          "Novas regras para contratação",
          "Mudanças no regime de estabilidade",
        ],

        impact: "Alto impacto na estrutura administrativa federal",
        nextSteps: "Em análise na CCJ",
        relatedPropositions: ["PEC 32/2020", "PL 1789/2021"],
      },
    },
    // ... other propositions
  ];

  const filteredPropositions = propositions.filter((prop) => {
    const matchesSearch = prop.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(prop.status);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(prop.type);
    const matchesTheme =
      selectedThemes.length === 0 ||
      prop.themes.some((theme) => selectedThemes.includes(theme));

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
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    className="flex items-center space-x-2 p-2"
                    id={`oaud4p_${index}`}
                  >
                    <Checkbox
                      id={status}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) => {
                        setSelectedStatuses(
                          checked
                            ? [...selectedStatuses, status]
                            : selectedStatuses.filter((s) => s !== status),
                        );
                      }}
                    />

                    <label
                      htmlFor={status}
                      className="text-sm font-medium"
                      id={`599qfc_${index}`}
                    >
                      {status}
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
                {types.map((type, index) => (
                  <div
                    key={type}
                    className="flex items-center space-x-2 p-2"
                    id={`77bnbe_${index}`}
                  >
                    <Checkbox
                      id={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        setSelectedTypes(
                          checked
                            ? [...selectedTypes, type]
                            : selectedTypes.filter((t) => t !== type),
                        );
                      }}
                    />

                    <label
                      htmlFor={type}
                      className="text-sm font-medium"
                      id={`g1joyp_${index}`}
                    >
                      {type}
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
                {themes.map((theme, index) => (
                  <div
                    key={theme}
                    className="flex items-center space-x-2 p-2"
                    id={`mamlol_${index}`}
                  >
                    <Checkbox
                      id={theme}
                      checked={selectedThemes.includes(theme)}
                      onCheckedChange={(checked) => {
                        setSelectedThemes(
                          checked
                            ? [...selectedThemes, theme]
                            : selectedThemes.filter((t) => t !== theme),
                        );
                      }}
                    />

                    <label
                      htmlFor={theme}
                      className="text-sm font-medium"
                      id={`jsn7k7_${index}`}
                    >
                      {theme}
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
                            {proposition.id}
                          </span>
                          <Badge
                            variant={
                              proposition.status === "Aprovado"
                                ? "success"
                                : proposition.status === "Em votação"
                                  ? "warning"
                                  : "secondary"
                            }
                            id={`5imy14_${index}`}
                          >
                            {proposition.status}
                          </Badge>
                        </div>
                        <div
                          className="flex items-center space-x-2"
                          id={`liiulb_${index}`}
                        >
                          <span
                            className="text-sm text-muted-foreground"
                            id={`b6p37y_${index}`}
                          >
                            {new Date(proposition.date).toLocaleDateString()}
                          </span>
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
                        {proposition.themes.map((theme, themeIndex) => (
                          <Badge
                            key={themeIndex}
                            variant="outline"
                            className="flex items-center"
                            id={`tyhzjr_${index}`}
                          >
                            <TagIcon
                              className="h-3 w-3 mr-1"
                              id={`aodcu3_${index}`}
                            />
                            {theme}
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
                        <div id={`cq3ztp_${index}`}>
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
                              (point, pointIndex) => (
                                <li key={pointIndex} id={`1gzcvt_${index}`}>
                                  {point}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <div
                          className="grid grid-cols-2 gap-4"
                          id={`y7zn36_${index}`}
                        >
                          <div id={`p46bbg_${index}`}>
                            <h4
                              className="font-semibold mb-2"
                              id={`w5b2sr_${index}`}
                            >
                              Impacto
                            </h4>
                            <p className="text-sm" id={`wi3qb8_${index}`}>
                              {proposition.details.impact}
                            </p>
                          </div>
                          <div id={`j4tjdl_${index}`}>
                            <h4
                              className="font-semibold mb-2"
                              id={`8rxt98_${index}`}
                            >
                              Próximos Passos
                            </h4>
                            <p className="text-sm" id={`0nes3v_${index}`}>
                              {proposition.details.nextSteps}
                            </p>
                          </div>
                        </div>
                        <div id={`ik343s_${index}`}>
                          <h4
                            className="font-semibold mb-2"
                            id={`186rwi_${index}`}
                          >
                            Proposições Relacionadas
                          </h4>
                          <div
                            className="flex flex-wrap gap-2"
                            id={`kl38w4_${index}`}
                          >
                            {proposition.details.relatedPropositions.map(
                              (related, relatedIndex) => (
                                <Badge
                                  key={relatedIndex}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-secondary/80"
                                  id={`faf0co_${index}`}
                                >
                                  {related}
                                </Badge>
                              ),
                            )}
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
      </div>
    </div>
  );
}
