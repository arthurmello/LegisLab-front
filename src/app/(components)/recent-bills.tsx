'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTextIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function RecentBills() {
  const { user } = useAuth();
  const [keywords, setKeywords] = useState<string[]>(user?.options?.keywords || []);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(user?.options?.selectedTopics || []);
  const [proposicoes, setProposicoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(user?.options);
  console.log(selectedTopics);
  useEffect(() => {
    async function fetchProposicoes() {
      try {
        const queryParams = new URLSearchParams();
        selectedTopics.forEach(topic => queryParams.append('temas', topic));
        keywords.forEach(keyword => queryParams.append('palavras_chave', keyword));

        const response = await fetch(`${API_URL}/proposicoes/?${queryParams.toString()}`);
        const data = await response.json();
        console.log(data);
        setProposicoes(data);
      } catch (error) {
        console.error("Error fetching proposicoes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProposicoes();
  }, [selectedTopics, keywords]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Projetos de Lei em Destaque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50rem] pr-4 md:h-[40rem] sm:h-[30rem]">
          <div className="space-y-4">
            {proposicoes.map((proposicao, index) => (
              <div
                key={proposicao.id}
                className="flex flex-col space-y-2 border-b pb-4 last:border-0"
                id={`vpezwp_${index}`}
              >
                <div
                  className="flex items-center justify-between"
                  id={`bb3qt9_${index}`}
                >
                  <span className="font-semibold" id={`qz0s6j_${index}`}>
                    {proposicao.nome}
                  </span>
                  <Badge
                    variant={
                      proposicao.descricao_situacao === "Aprovada"
                        ? "default"
                        : proposicao.descricao_situacao === "Em votação"
                          ? "secondary"
                          : "outline"
                    }
                    id={`73qg6q_${index}`}
                  >
                    {proposicao.descricao_situacao}
                  </Badge>
                </div>
                <p className="text-sm" id={`y1isvo_${index}`}>
                  {proposicao.ementa}
                </p>
                <div
                  className="flex items-center text-sm text-muted-foreground"
                  id={`87zfn7_${index}`}
                >
                  <UserIcon className="h-4 w-4 mr-1" id={`lm8gty_${index}`} />
                  {proposicao.autores[0]?.nome}
                  <span className="ml-auto" id={`508dju_${index}`}>
                    {new Date(proposicao.created_at).toLocaleDateString()}
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
