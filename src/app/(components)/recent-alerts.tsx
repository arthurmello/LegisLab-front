'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellIcon, TagIcon, FileTextIcon } from "lucide-react";

export function RecentAlerts() {
  const alerts = [
    {
      id: 1,
      type: "Palavra-chave",
      keyword: "Energia renovável",
      proposition: "PL 567/2024",
      title: "Incentivos para Energia Renovável",
      date: "2024-03-12",
    },
    {
      id: 2,
      type: "Tema",
      topic: "Tecnologia",
      proposition: "PLP 789/2024",
      title: "Regulamentação do Mercado de Criptomoedas",
      date: "2024-03-13",
    },
    {
      id: 3,
      type: "Palavra-chave",
      keyword: "Tributação",
      proposition: "PEC 45/2024",
      title: "Reforma Administrativa",
      date: "2024-03-14",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellIcon className="h-5 w-5" />
          Alertas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Card key={alert.id} id={`0az5y0_${index}`}>
                <CardContent className="p-4" id={`8u7fl4_${index}`}>
                  <div
                    className="flex items-center justify-between mb-2"
                    id={`z6hyfk_${index}`}
                  >
                    <Badge variant="outline" id={`xopywi_${index}`}>
                      {alert.type === "Palavra-chave" ? (
                        <TagIcon
                          className="h-3 w-3 mr-1"
                          id={`qr7n37_${index}`}
                        />
                      ) : (
                        <FileTextIcon
                          className="h-3 w-3 mr-1"
                          id={`ugqz21_${index}`}
                        />
                      )}

                      {alert.type}
                    </Badge>
                    <span
                      className="text-sm text-muted-foreground"
                      id={`bcx2kj_${index}`}
                    >
                      {new Date(alert.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="space-y-2" id={`20x0ou_${index}`}>
                    <div
                      className="flex items-center space-x-2"
                      id={`w4hh7o_${index}`}
                    >
                      <span className="font-medium" id={`0r396o_${index}`}>
                        {alert.proposition}
                      </span>
                      <Badge variant="secondary" id={`okvai1_${index}`}>
                        {alert.type === "Palavra-chave"
                          ? alert.keyword
                          : alert.topic}
                      </Badge>
                    </div>
                    <p
                      className="text-sm text-muted-foreground"
                      id={`297eg3_${index}`}
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
