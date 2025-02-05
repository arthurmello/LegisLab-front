'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SearchIcon,
  Users2Icon,
  MapPinIcon,
  BuildingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ParliamentariansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const parliamentarians = [
    {
      id: 1,
      name: "Maria Silva",
      party: "PT",
      state: "SP",
      role: "Deputada Federal",
      avatarId: 1,
      details: {
        email: "maria.silva@camara.leg.br",
        phone: "(61) 3215-1234",
        office: "Anexo IV - Gabinete 123",
        website: "www.mariasilva.leg.br",
        committees: ["Comissão de Educação", "Comissão de Direitos Humanos"],
        bills: 45,
        attendance: "95%",
      },
    },
    {
      id: 2,
      name: "João Santos",
      party: "PSDB",
      state: "MG",
      role: "Deputado Federal",
      avatarId: 2,
      details: {
        email: "joao.santos@camara.leg.br",
        phone: "(61) 3215-5678",
        office: "Anexo III - Gabinete 456",
        website: "www.joaosantos.leg.br",
        committees: ["Comissão de Finanças", "Comissão de Trabalho"],
        bills: 32,
        attendance: "92%",
      },
    },
    // Add more parliamentarians as needed
  ];

  const filteredParliamentarians = parliamentarians.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users2Icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Total: {parliamentarians.length}
          </span>
        </div>
      </div>

      <div className="relative">
        <SearchIcon
          className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
        />
        <Input
          placeholder="Buscar parlamentar por nome..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-4">
          {filteredParliamentarians.map((member, index) => (
            <Collapsible
              key={member.id}
              open={expandedMember === member.id}
              onOpenChange={() =>
                setExpandedMember(
                  expandedMember === member.id ? null : member.id,
                )
              }
              id={`b6cao6_${index}`}
            >
              <Card
                className="hover:shadow-md transition-shadow"
                id={`99g3cf_${index}`}
              >
                <CollapsibleTrigger className="w-full" id={`n9gzw2_${index}`}>
                  <CardContent className="p-4" id={`w7zi6p_${index}`}>
                    <div
                      className="flex items-center justify-between"
                      id={`uvs98z_${index}`}
                    >
                      <div
                        className="flex items-center space-x-4"
                        id={`nl4n45_${index}`}
                      >
                        <Avatar className="h-12 w-12" id={`p4ed5a_${index}`}>
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?img=${member.avatarId}`}
                            alt={member.name}
                            id={`1g1o3o_${index}`}
                          />

                          <AvatarFallback id={`m11xgg_${index}`}>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div id={`4gtzsu_${index}`}>
                          <h3 className="font-semibold" id={`arudon_${index}`}>
                            {member.name}
                          </h3>
                          <div
                            className="flex items-center space-x-2 text-sm text-muted-foreground"
                            id={`1mtxv5_${index}`}
                          >
                            <Badge variant="outline" id={`8920ww_${index}`}>
                              {member.party}
                            </Badge>
                            <span id={`522aji_${index}`}>{member.role}</span>
                            <span
                              className="flex items-center"
                              id={`9pv19w_${index}`}
                            >
                              <MapPinIcon
                                className="h-3 w-3 mr-1"
                                id={`g5mo00_${index}`}
                              />
                              {member.state}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedMember === member.id ? (
                        <ChevronUpIcon
                          className="h-5 w-5"
                          id={`mln71m_${index}`}
                        />
                      ) : (
                        <ChevronDownIcon
                          className="h-5 w-5"
                          id={`xqjbyy_${index}`}
                        />
                      )}
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent id={`kw4jz5_${index}`}>
                  <CardContent
                    className="p-4 pt-0 border-t"
                    id={`64ymnd_${index}`}
                  >
                    <div
                      className="grid grid-cols-2 gap-4"
                      id={`n9c5s4_${index}`}
                    >
                      <div className="space-y-2" id={`bokw5b_${index}`}>
                        <div
                          className="flex items-center space-x-2 text-sm"
                          id={`79loqv_${index}`}
                        >
                          <MailIcon
                            className="h-4 w-4"
                            id={`e78fae_${index}`}
                          />
                          <span id={`5m8i3o_${index}`}>
                            {member.details.email}
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-2 text-sm"
                          id={`su9jkm_${index}`}
                        >
                          <PhoneIcon
                            className="h-4 w-4"
                            id={`bxnlzl_${index}`}
                          />
                          <span id={`kpfn14_${index}`}>
                            {member.details.phone}
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-2 text-sm"
                          id={`f1exqi_${index}`}
                        >
                          <BuildingIcon
                            className="h-4 w-4"
                            id={`mcrxn7_${index}`}
                          />
                          <span id={`1a17aa_${index}`}>
                            {member.details.office}
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-2 text-sm"
                          id={`cb8e8j_${index}`}
                        >
                          <GlobeIcon
                            className="h-4 w-4"
                            id={`z0q4yx_${index}`}
                          />
                          <span id={`u0690m_${index}`}>
                            {member.details.website}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4" id={`gzt25u_${index}`}>
                        <div id={`a7pd9h_${index}`}>
                          <h4
                            className="font-medium mb-2"
                            id={`zekafa_${index}`}
                          >
                            Comissões
                          </h4>
                          <div
                            className="flex flex-wrap gap-2"
                            id={`l8762w_${index}`}
                          >
                            {member.details.committees.map(
                              (committee, index) => (
                                <Badge
                                  key={committee}
                                  variant="secondary"
                                  id={`3mfijn_${index}`}
                                >
                                  {committee}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                        <div
                          className="grid grid-cols-2 gap-4"
                          id={`dyfjlp_${index}`}
                        >
                          <div id={`nqiy8z_${index}`}>
                            <h4 className="font-medium" id={`pijs62_${index}`}>
                              Projetos
                            </h4>
                            <p
                              className="text-2xl font-bold"
                              id={`ceyksf_${index}`}
                            >
                              {member.details.bills}
                            </p>
                          </div>
                          <div id={`l7gta0_${index}`}>
                            <h4 className="font-medium" id={`couh3n_${index}`}>
                              Presença
                            </h4>
                            <p
                              className="text-2xl font-bold"
                              id={`ectlp5_${index}`}
                            >
                              {member.details.attendance}
                            </p>
                          </div>
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
