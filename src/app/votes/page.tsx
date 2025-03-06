'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ActivityIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { withAuth } from "../hoc/withAuth";

function VotesPage() {
  const [expandedVote, setExpandedVote] = useState<string | null>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/votacoes/`);
        const data = await res.json();

        // Process the votes to categorize them
        const processedVotes = data.map((vote: any) => {
          const votosSim = vote.votos.filter((v: any) => v.voto === "Sim").map((v: any) => ({
            nome: v.nome,
            siglaPartido: v.partido,
            urlFoto: v.foto,
          }));
          const votosNao = vote.votos.filter((v: any) => v.voto === "Não").map((v: any) => ({
            nome: v.nome,
            siglaPartido: v.partido,
            urlFoto: v.foto,
          }));
          const votosOutros = vote.votos.filter((v: any) => v.voto !== "Sim" && v.voto !== "Não").map((v: any) => ({
            nome: v.nome,
            siglaPartido: v.partido,
            urlFoto: v.foto,
          }));
          console.log(votosSim, votosNao, votosOutros);
          return {
            ...vote,
            votos_sim: votosSim,
            votos_nao: votosNao,
            votos_outros: votosOutros,
          };
        });

        setVotes(processedVotes);

      } catch (error) {
        console.error("Error fetching proposicoes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVotes();
  }, []);
  if (loading) return <p>Loading...</p>;
  const VotersList = ({
    voters,
    title,
    type,
  }: {
    voters: { nome: string; siglaPartido: string; urlFoto: string }[];
    title: string;
    type: "favor" | "against" | "abstain";
  }) => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {title} ({voters.length})
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {voters.map((voter, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-lg"
              id={`lsz7mk_${index}`}
            >
              <Avatar id={`qz2hjl_${index}`}>
                {voter.urlFoto ? (
                  <AvatarImage
                    src={voter.urlFoto}
                    alt={voter.nome}
                    id={`8noz14_${index}`}
                  />
                ) : (
                  <AvatarFallback id={`rke1uy_${index}`}>
                    {voter.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div id={`6kbgef_${index}`}>
                <p className="font-medium" id={`14qtc2_${index}`}>
                  {voter.nome}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  id={`k05xf0_${index}`}
                >
                  {voter.siglaPartido}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <ActivityIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-4">
          {votes.map((vote, index) => (
            <Collapsible
              key={vote.id}
              open={expandedVote === vote.id}
              onOpenChange={() => setExpandedVote(expandedVote === vote.id ? null : vote.id)}
              id={`y5rzbk_${index}`}
            >
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md" id={`77pwz5_${index}`}>

                {/* ❌ Don't use CollapsibleTrigger inside a button */}
                <div className="w-full cursor-pointer" onClick={() => setExpandedVote(expandedVote === vote.id ? null : vote.id)}>
                  <CardContent className="p-4" id={`cece5f_${index}`}>
                    <div className="flex items-center justify-between mb-2" id={`cl9bjg_${index}`}>
                      <div className="flex items-center space-x-2" id={`ce8hqu_${index}`}>
                        <span className="font-semibold" id={`pnrifp_${index}`}>
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
                          id={`a938u8_${index}`}
                        >
                          {vote.aprovacao === 1 ? "Aprovado" : "Rejeitado"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground" id={`85vaws_${index}`}>
                        {new Date(vote.data).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm mb-3" id={`uoa63c_${index}`}>
                      {vote.ementa}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-sm" id={`g81rmw_${index}`}>
                      <Dialog>
                        <DialogTrigger className="text-green-600 hover:underline cursor-pointer flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          A favor: {vote.votos_sim.length}
                        </DialogTrigger>
                        <VotersList voters={vote.votos_sim} title="Votos a Favor" type="favor" />
                      </Dialog>

                      <Dialog>
                        <DialogTrigger className="text-red-600 hover:underline cursor-pointer flex items-center" id={`kw6ohg_${index}`}>
                          <UserIcon className="h-4 w-4 mr-1" id={`hmgpum_${index}`} />
                          Contra: {vote.votos_nao.length}
                        </DialogTrigger>
                        <VotersList voters={vote.votos_nao} title="Votos Contra" type="against" />
                      </Dialog>

                      <Dialog>
                        <DialogTrigger className="text-muted-foreground hover:underline cursor-pointer flex items-center" id={`pt4him_${index}`}>
                          <UserIcon className="h-4 w-4 mr-1" id={`faf7nv_${index}`} />
                          Abstenção: {vote.votos_outros.length}
                        </DialogTrigger>
                        <VotersList voters={vote.votos_outros} title="Abstenções" type="abstain" />
                      </Dialog>
                    </div>

                    <div className="flex justify-end mt-2" id={`nvipl6_${index}`}>
                      {expandedVote === vote.id ? <ChevronUpIcon className="h-4 w-4" id={`7xmtky_${index}`} /> : <ChevronDownIcon className="h-4 w-4" id={`kvarss_${index}`} />}
                    </div>
                  </CardContent>
                </div>

                <CollapsibleContent id={`ilv8zv_${index}`}>
                  <CardContent className="p-4 bg-muted/50 border-t" id={`gcvkuu_${index}`}>
                    <div className="space-y-4" id={`kwgtzc_${index}`}>
                      <div id={`f9upg1_${index}`}>
                        <h4 className="font-semibold mb-2" id={`p1ws7f_${index}`}>Resumo</h4>
                        <p className="text-sm" id={`pd1gi0_${index}`}>{vote.descricao}</p>
                      </div>
                      <div id={`z1a4um_${index}`}>
                        <h4 className="font-semibold mb-2" id={`6f14zb_${index}`}>Pontos Principais</h4>
                        <p className="text-sm space-y-1" id={`vz1fju_${index}`}>
                          {vote.ementa}
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
    </div>
  );
}

export default withAuth(VotesPage);
