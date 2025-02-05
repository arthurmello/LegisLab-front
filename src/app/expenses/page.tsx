"use client";

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
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, ResponsiveContainer } from "recharts";

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
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="1">Janeiro</SelectItem>
            <SelectItem value="2">Fevereiro</SelectItem>
            <SelectItem value="3">Março</SelectItem>
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
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={expensesByCategory}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  barSize={24}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="category"
                    width={150} // Adjust based on category name length
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
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}