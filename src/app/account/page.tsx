'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, CrownIcon, ArrowUpIcon } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plano Atual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StarIcon className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="text-xl font-semibold">
                  Plano Básico
                </h3>
                <p className="text-sm text-muted-foreground">
                  R$ 29,90/mês
                </p>
              </div>
            </div>
            <Badge variant="secondary">
              Ativo
            </Badge>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">
              Recursos Inclusos:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                ✓ Monitoramento de até 10 projetos
              </li>
              <li className="flex items-center">
                ✓ Alertas por email
              </li>
              <li className="flex items-center">
                ✓ Relatórios básicos
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">
              Upgrade Disponível:
            </h4>
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <CrownIcon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Plano Pro
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    R$ 59,90/mês
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-2" />
                  Monitoramento ilimitado de projetos
                </li>
                <li className="flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-2" />
                  Alertas em tempo real
                </li>
                <li className="flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-2" />
                  Relatórios avançados e exportação
                </li>
              </ul>
              <Button className="w-full">
                Fazer Upgrade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
