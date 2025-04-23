'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTextIcon, TagIcon } from "lucide-react";

export function AlertsList() {
  const alerts = [
    {
      id: 1,
      type: "Palavra-chave",
      keyword: "Energia renovável",
      bill: "PL 567/2024",
      title: "Incentivos para Energia Renovável",
      date: "2024-03-12",
    },
    {
      id: 2,
      type: "Tema",
      topic: "Tecnologia",
      bill: "PLP 789/2024",
      title: "Regulamentação do Mercado de Criptomoedas",
      date: "2024-03-13",
    },
    {
      id: 3,
      type: "Palavra-chave",
      keyword: "Tributação",
      bill: "PEC 45/2024",
      title: "Reforma Administrativa",
      date: "2024-03-14",
    },
    {
      id: 4,
      type: "Tema",
      topic: "Economia",
      bill: "PL 1234/2024",
      title: "Alteração na Lei de Diretrizes Orçamentárias",
      date: "2024-03-15",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Card key={alert.id} id={`nqxb87_${index}`}>
                <CardContent className="p-4" id={`wqx6d2_${index}`}>
                  <div
                    className="flex items-center justify-between mb-2"
                    id={`cmjrui_${index}`}
                  >
                    <Badge variant="outline" id={`tk6d0j_${index}`}>
                      {alert.type === "Palavra-chave" ? (
                        <TagIcon
                          className="h-3 w-3 mr-1"
                          id={`wj31ox_${index}`}
                        />
                      ) : (
                        <FileTextIcon
                          className="h-3 w-3 mr-1"
                          id={`txi0zm_${index}`}
                        />
                      )}

                      {alert.type}
                    </Badge>
                    <span
                      className="text-sm text-muted-foreground"
                      id={`lpgo7w_${index}`}
                    >
                      {new Date(alert.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="space-y-2" id={`m0g942_${index}`}>
                    <div
                      className="flex items-center space-x-2"
                      id={`r6wm90_${index}`}
                    >
                      <span className="font-medium" id={`qh8djk_${index}`}>
                        {alert.bill}
                      </span>
                      <Badge variant="secondary" id={`23n8nw_${index}`}>
                        {alert.type === "Palavra-chave"
                          ? alert.keyword
                          : alert.topic}
                      </Badge>
                    </div>
                    <p
                      className="text-sm text-muted-foreground"
                      id={`k6fohz_${index}`}
                    >
                      {alert.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
