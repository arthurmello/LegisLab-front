'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VoteIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/app/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function HighlightVotes() {
  const { user } = useAuth();
  const [keywords, setKeywords] = useState<string[]>(user?.options?.keywords || []);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(user?.options?.selectedTopics || []);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedVote, setExpandedVote] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const queryParams = new URLSearchParams();
        selectedTopics.forEach(topic => queryParams.append('temas', topic));
        keywords.forEach(keyword => queryParams.append('palavras_chave', keyword));

        const response = await fetch(`${API_URL}/votacoes/?${queryParams.toString()}`);
        const data = await response.json();
        setVotes(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVotes();
  }, [selectedTopics, keywords]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="h-full flex-grow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <VoteIcon className="h-5 w-5" />
          Votações recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50rem] pr-4 md:h-[40rem] sm:h-[30rem]">
          <div className="space-y-4">
            {votes.map((vote, index) => (
              <Collapsible
                key={vote.id}
                open={expandedVote === vote.id}
                onOpenChange={() =>
                  setExpandedVote(expandedVote === vote.id ? null : vote.id)
                }
                id={`7lmb39_${index}`}
              >
                <Card
                  className="overflow-hidden transition-all duration-200 hover:shadow-md"
                  id={`m0a21o_${index}`}
                >
                  <CollapsibleTrigger className="w-full" id={`gnq308_${index}`}>
                    <CardContent className="p-4" id={`ruv7cp_${index}`}>
                      <div
                        className="flex items-center justify-between mb-2"
                        id={`y4i9lg_${index}`}
                      >
                        <span className="font-semibold" id={`ohyu48_${index}`}>
                          {vote.nome}
                        </span>
                        <Badge
                          variant={
                            vote.aprovacao === 1
                            ? "default"
                            : vote.aprovacao === 0
                            ? "secondary"
                            : "outline"
                          }
                          id={`gjt85a_${index}`}
                        >
                          {vote.aprovacao === 1 ? "Aprovado" : "Rejeitado"}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3" id={`zkxbe8_${index}`}>
                        {vote.ementa}
                      </p>
                      <div
                        className="flex justify-between items-center mt-2"
                        id={`k1qd82_${index}`}
                      >
                        <span
                          className="text-sm text-muted-foreground"
                          id={`rd8ofb_${index}`}
                        >
                          {new Date(vote.data).toLocaleDateString('pt-BR')}
                        </span>
                        {expandedVote === vote.id ? (
                          <ChevronUpIcon
                            className="h-4 w-4"
                            id={`iqt2jj_${index}`}
                          />
                        ) : (
                          <ChevronDownIcon
                            className="h-4 w-4"
                            id={`wb2j0p_${index}`}
                          />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent id={`5bq4jo_${index}`}>
                    <CardContent
                      className="p-4 bg-muted/50 border-t"
                      id={`0k4gbb_${index}`}
                    >
                      <div className="space-y-4" id={`lyuc54_${index}`}>
                        <div id={`7spauc_${index}`}>
                          <h4
                            className="font-semibold mb-2"
                            id={`aek8hg_${index}`}
                          >
                            Resultado
                          </h4>
                          <p className="text-sm" id={`0445wx_${index}`}>
                            {vote.descricao}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
