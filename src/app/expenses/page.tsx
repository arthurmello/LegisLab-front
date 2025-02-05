'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WalletIcon, SearchIcon, FilterIcon } from "lucide-react";
import { BarChart, Bar, XAxis, CartesianGrid, YAxis } from "recharts";

export default function ExpensesPage() {
  const [yearFilter, setYearFilter] = useState("2024");
  const [monthFilter, setMonthFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const expensesByCategory = [
    { category: "Verba de Gabinete", amount: 1250000 },
    { category: "Auxílio Moradia", amount: 850000 },
    { category: "Passagens Aéreas", amount: 620000 },
    { category: "Combustível", amount: 450000 },
    { category: "Correios", amount: 230000 },
    { category: "Telefonia", amount: 180000 },
    { category: "Material de Escritório", amount: 150000 },
  ];

  const expensesByParliamentarian = [
    { name: "Maria Silva", party: "PT-SP", amount: 450000, avatarId: 1 },
    { name: "João Santos", party: "PSDB-MG", amount: 380000, avatarId: 2 },
    { name: "Ana Oliveira", party: "PSD-RJ", amount: 360000, avatarId: 3 },
    { name: "Pedro Costa", party: "MDB-RS", amount: 340000, avatarId: 4 },
    { name: "Lucia Ferreira", party: "UNIÃO-BA", amount: 320000, avatarId: 5 },
  ];

  const monthlyExpenses = [
    { month: "Jan", amount: 2500000 },
    { month: "Fev", amount: 2300000 },
    { month: "Mar", amount: 2700000 },
    { month: "Abr", amount: 2400000 },
    { month: "Mai", amount: 2600000 },
    { month: "Jun", amount: 2800000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <WalletIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Total em {yearFilter}: {formatCurrency(25000000)}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <SearchIcon
            className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
          />
          <Input
            placeholder="Buscar parlamentar..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">
              2024
            </SelectItem>
            <SelectItem value="2023">
              2023
            </SelectItem>
            <SelectItem value="2022">
              2022
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Todos
            </SelectItem>
            <SelectItem value="1">
              Janeiro
            </SelectItem>
            <SelectItem value="2">
              Fevereiro
            </SelectItem>
            <SelectItem value="3">
              Março
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <BarChart
                data={expensesByCategory}
                layout="vertical"
                width="100%"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                barSize={24} // Adjust thickness to match spacing
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category"
                  dataKey="category"
                  width={10} // Adjust based on category name length
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => formatCurrency(value)}
                />

                <Bar
                  dataKey="amount"
                  fill="hsl(var(--chart-1))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Parlamentares por Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {expensesByParliamentarian.map((mp, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4 p-2 hover:bg-muted/50 rounded-lg"
                  id={`6nx0as_${index}`}
                >
                  <Avatar id={`kohc6b_${index}`}>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${mp.avatarId}`}
                      alt={mp.name}
                      id={`8uy448_${index}`}
                    />

                    <AvatarFallback id={`a2puku_${index}`}>
                      {mp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1" id={`qd7hu5_${index}`}>
                    <div className="font-medium" id={`pvphcv_${index}`}>
                      {mp.name}
                    </div>
                    <div
                      className="text-sm text-muted-foreground"
                      id={`zk0s1k_${index}`}
                    >
                      {mp.party}
                    </div>
                  </div>
                  <div className="font-medium" id={`5jq4f7_${index}`}>
                    {formatCurrency(mp.amount)}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução Mensal dos Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart
                data={monthlyExpenses}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => formatCurrency(value)}
                />

                <Bar
                  dataKey="amount"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
