'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTextIcon, UserIcon } from "lucide-react";

const bills = [
  {
    id: "PL 1234/2024",
    title: "Alteração na Lei de Diretrizes Orçamentárias",
    author: "Dep. João Silva",
    status: "Em tramitação",
    date: "2024-03-15",
  },
  {
    id: "PEC 45/2024",
    title: "Reforma Administrativa",
    author: "Sen. Maria Santos",
    status: "Em votação",
    date: "2024-03-14",
  },
  {
    id: "PLP 789/2024",
    title: "Regulamentação do Mercado de Criptomoedas",
    author: "Dep. Pedro Costa",
    status: "Aprovado",
    date: "2024-03-13",
  },
  {
    id: "PL 567/2024",
    title: "Incentivos para Energia Renovável",
    author: "Sen. Ana Oliveira",
    status: "Em tramitação",
    date: "2024-03-12",
  },
];

export function RecentBills() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Projetos de Lei Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {bills.map((bill, index) => (
              <div
                key={bill.id}
                className="flex flex-col space-y-2 border-b pb-4 last:border-0"
                id={`vpezwp_${index}`}
              >
                <div
                  className="flex items-center justify-between"
                  id={`bb3qt9_${index}`}
                >
                  <span className="font-semibold" id={`qz0s6j_${index}`}>
                    {bill.id}
                  </span>
                  <Badge
                    variant={
                      bill.status === "Aprovado"
                        ? "success"
                        : bill.status === "Em votação"
                          ? "warning"
                          : "secondary"
                    }
                    id={`73qg6q_${index}`}
                  >
                    {bill.status}
                  </Badge>
                </div>
                <p className="text-sm" id={`y1isvo_${index}`}>
                  {bill.title}
                </p>
                <div
                  className="flex items-center text-sm text-muted-foreground"
                  id={`87zfn7_${index}`}
                >
                  <UserIcon className="h-4 w-4 mr-1" id={`lm8gty_${index}`} />
                  {bill.author}
                  <span className="ml-auto" id={`508dju_${index}`}>
                    {new Date(bill.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
