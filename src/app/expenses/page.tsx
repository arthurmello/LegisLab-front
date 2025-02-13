"use client";

import React, { useState, useEffect } from "react";
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
import { WalletIcon, SearchIcon } from "lucide-react";
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, ResponsiveContainer } from "recharts";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Define a type for the parliamentarian data
type Parliamentarian = {
  nome: string;
  partido: string;
  valor: number;
  url_foto: string;
};

export default function ExpensesPage() {
  const [yearFilter, setYearFilter] = useState("2024");
  const [monthFilter, setMonthFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [expensesByParliamentarian, setExpensesByParliamentarian] = useState<Parliamentarian[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const categoryRes = await fetch(`${API_URL}/despesas/categoria`);
        const categoryData = await categoryRes.json();
        console.log(categoryData);
        setExpensesByCategory(categoryData);

        const parliamentarianRes = await fetch(`${API_URL}/despesas/parlamentares`);
        const parliamentarianData = await parliamentarianRes.json();
        setExpensesByParliamentarian(parliamentarianData);
        console.log(parliamentarianData);

        const monthlyRes = await fetch(`${API_URL}/despesas/total`);
        const monthlyData = await monthlyRes.json();
        setMonthlyExpenses(monthlyData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  if (loading) return <p>Loading...</p>;

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[400px] w-full" config={{}}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={expensesByCategory}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  barSize={24}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="tipo" width={150} tick={{ fontSize: 12 }} />
                  <ChartTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="valor" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
                <div key={index} className="flex items-center space-x-4 mb-4 p-2 hover:bg-muted/50 rounded-lg">
                  <Avatar>
                    <AvatarImage src={mp.url_foto} alt={mp.nome} />
                    <AvatarFallback>{mp.nome.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{mp.nome}</div>
                    <div className="text-sm text-muted-foreground">{mp.partido}</div>
                  </div>
                  <div className="font-medium">{formatCurrency(mp.valor)}</div>
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
            <ChartContainer className="h-[300px]" config={{}}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyExpenses} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" />
                  <ChartTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="valor" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
