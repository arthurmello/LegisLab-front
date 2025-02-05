'use client';

import React, { useState } from "react";
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

export default function VotesPage() {
  const [expandedVote, setExpandedVote] = useState<string | null>(null);

  const votes = [
    {
      id: "PEC 45/2024",
      title: "Reforma Administrativa",
      status: "Aprovado",
      date: "2024-03-14",
      votes: {
        favor: {
          count: 308,
          parliamentarians: [
            { name: "Maria Silva", party: "PT-SP", avatarId: 1 },
            { name: "João Santos", party: "PSDB-MG", avatarId: 2 },
            // Add more parliamentarians
          ],
        },
        against: {
          count: 114,
          parliamentarians: [
            { name: "Pedro Costa", party: "PSD-RJ", avatarId: 3 },
            { name: "Ana Oliveira", party: "MDB-RS", avatarId: 4 },
            // Add more parliamentarians
          ],
        },
        abstain: {
          count: 91,
          parliamentarians: [
            { name: "Carlos Lima", party: "PP-BA", avatarId: 5 },
            { name: "Julia Mendes", party: "PSOL-RJ", avatarId: 6 },
            // Add more parliamentarians
          ],
        },
      },
      details: {
        summary:
          "Proposta de Emenda à Constituição que altera dispositivos sobre a administração pública.",
        mainPoints: [
          "Reforma do sistema de carreiras do serviço público",
          "Novas regras para contratação de servidores",
          "Mudanças no regime de estabilidade",
        ],

        impact: "Alto impacto na estrutura administrativa federal",
        nextSteps: "Segue para promulgação",
      },
    },
    // Add more votes with similar structure
  ];

  const VotersList = ({
    voters,
    title,
    type,
  }: {
    voters: { name: string; party: string; avatarId: number }[];
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
                <AvatarImage
                  src={`https://i.pravatar.cc/150?img=${voter.avatarId}`}
                  alt={voter.name}
                  id={`8noz14_${index}`}
                />

                <AvatarFallback id={`rke1uy_${index}`}>
                  {voter.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div id={`6kbgef_${index}`}>
                <p className="font-medium" id={`14qtc2_${index}`}>
                  {voter.name}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  id={`k05xf0_${index}`}
                >
                  {voter.party}
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
                          {vote.id}
                        </span>
                        <Badge
                          variant={
                            vote.status === "Aprovado"
                              ? "default"
                              : vote.status === "Em votação"
                                ? "secondary"
                                : "outline"
                          }
                          id={`a938u8_${index}`}
                        >
                          {vote.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground" id={`85vaws_${index}`}>
                        {new Date(vote.date).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm mb-3" id={`uoa63c_${index}`}>
                      {vote.title}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-sm" id={`g81rmw_${index}`}>
                      <Dialog>
                        <DialogTrigger className="text-green-600 hover:underline cursor-pointer flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          A favor: {vote.votes.favor.count}
                        </DialogTrigger>
                        <VotersList voters={vote.votes.favor.parliamentarians} title="Votos a Favor" type="favor" />
                      </Dialog>

                      <Dialog>
                        <DialogTrigger className="text-red-600 hover:underline cursor-pointer flex items-center" id={`kw6ohg_${index}`}>
                          <UserIcon className="h-4 w-4 mr-1" id={`hmgpum_${index}`} />
                          Contra: {vote.votes.against.count}
                        </DialogTrigger>
                        <VotersList voters={vote.votes.against.parliamentarians} title="Votos Contra" type="against" />
                      </Dialog>

                      <Dialog>
                        <DialogTrigger className="text-muted-foreground hover:underline cursor-pointer flex items-center" id={`pt4him_${index}`}>
                          <UserIcon className="h-4 w-4 mr-1" id={`faf7nv_${index}`} />
                          Abstenção: {vote.votes.abstain.count}
                        </DialogTrigger>
                        <VotersList voters={vote.votes.abstain.parliamentarians} title="Abstenções" type="abstain" />
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
                        <p className="text-sm" id={`pd1gi0_${index}`}>{vote.details.summary}</p>
                      </div>
                      <div id={`z1a4um_${index}`}>
                        <h4 className="font-semibold mb-2" id={`6f14zb_${index}`}>Pontos Principais</h4>
                        <ul className="list-disc list-inside text-sm space-y-1" id={`vz1fju_${index}`}>
                          {vote.details.mainPoints.map((point, index) => (
                            <li key={index} id={`k0y02p_${index}`}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4" id={`w93vxi_${index}`}>
                        <div id={`w2x439_${index}`}>
                          <h4 className="font-semibold mb-2" id={`t1lqcm_${index}`}>Impacto</h4>
                          <p className="text-sm" id={`p3ijta_${index}`}>{vote.details.impact}</p>
                        </div>
                        <div id={`cis2qw_${index}`}>
                          <h4 className="font-semibold mb-2" id={`xzohwq_${index}`}>Próximos Passos</h4>
                          <p className="text-sm" id={`4m8c9y_${index}`}>{vote.details.nextSteps}</p>
                        </div>
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
