'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, XIcon, MailIcon, MessageSquareIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AlertsConfig() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const topics = [
    "Saúde",
    "Educação",
    "Economia",
    "Meio Ambiente",
    "Segurança",
    "Tecnologia",
    "Trabalho",
    "Direitos Humanos",
    "Infraestrutura",
    "Tributação",
  ];

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar Alertas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            Preferências de Notificação
          </h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label
                htmlFor="email"
                className="flex items-center gap-2"
              >
                <MailIcon className="h-4 w-4" />
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label
                htmlFor="whatsapp"
                className="flex items-center gap-2"
              >
                <MessageSquareIcon className="h-4 w-4" />
                WhatsApp
              </Label>
            </div>
          </div>
          <div className="flex space-x-2">
            <Label
              htmlFor="whatsapp"
              className="flex items-center gap-2"
            >
              <MessageSquareIcon className="h-4 w-4" />
            </Label>
            <Input
              placeholder="Telefone (WhatsApp)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Palavras-chave
          </h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Digite uma palavra-chave"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
            />

            <Button onClick={handleAddKeyword}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="flex items-center gap-1"
                  id={`pog7sa_${index}`}
                >
                  {keyword}
                  <XIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveKeyword(keyword)}
                    id={`8hsqf7_${index}`}
                  />
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Temas de Interesse
          </h3>
          <ScrollArea className="h-48">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <Badge
                  key={topic}
                  variant={
                    selectedTopics.includes(topic) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleTopic(topic)}
                  id={`40hbxw_${index}`}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Button className="w-full">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
