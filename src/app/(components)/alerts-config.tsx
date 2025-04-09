'use client';

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, XIcon, MailIcon, MessageSquareIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast"; // Import toast notification
import { supabase } from "@/lib/supabaseClient";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AlertsConfig() {
  const { user, setUser } = useAuth(); // Ensure setUser is available to update context
  const token = user?.token;
  const [keywords, setKeywords] = useState<string[]>(user?.options?.keywords || []);
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState(user?.options?.telefone || "");
  const [emailNotifications, setEmailNotifications] = useState<boolean>(user?.options?.optinEmail || false);
  const [whatsappNotifications, setWhatsappNotifications] = useState<boolean>(user?.options?.optinWhatsapp || false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        const fetchOptionsResponse = await fetch(`${API_URL}/conta/get-user-options`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (fetchOptionsResponse.ok) {
          const updatedOptionsRaw = await fetchOptionsResponse.json();
          setSelectedTopics(updatedOptionsRaw.temas || []);
        } else {
          toast.error("Erro ao buscar novas configurações.");
        }
      } catch (error) {
        console.error("Error fetching user options:", error);
        toast.error("Erro ao buscar novas configurações.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOptions();
  }, [token]);

  const topics = [
    "Saúde", "Educação", "Economia", "Meio Ambiente", "Segurança",
    "Tecnologia", "Trabalho", "Direitos Humanos", "Infraestrutura", "Tributação",
    "Todos"
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
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSaveSettings = async () => {
    setLoading(true);
  
    try {
      // ✅ 1. Send PUT request to update options
      const response = await fetch(`${API_URL}/conta/update-options`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send token for authentication
        },
        body: JSON.stringify({
          new_options: {
            optin_whatsapp: whatsappNotifications,
            optin_email: emailNotifications,
            keywords: keywords,
            temas: selectedTopics,
            telefone: phoneNumber,
          },
        }),
      });
  
      if (response.ok) {
        toast.success("Configurações salvas com sucesso!");
      } else {
        toast.error("Falha ao salvar configurações.");
      }
  
      // ✅ 2. Fetch the latest user options from backend
      const fetchOptionsResponse = await fetch(`${API_URL}/conta/get-user-options`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!fetchOptionsResponse.ok) {
        toast.error("Erro ao buscar novas configurações.");
      }
  
      const updatedOptionsRaw = await fetchOptionsResponse.json();
              
      const updatedOptions = {
        optinEmail: updatedOptionsRaw.optin_email,
        optinWhatsapp: updatedOptionsRaw.optin_whatsapp,
        keywords: updatedOptionsRaw.keywords,
        selectedTopics: updatedOptionsRaw.temas,
        telefone: updatedOptionsRaw.telefone,
      };
      console.log("## Fetched latest options:", updatedOptions);
  
      // ✅ 3. Update AuthContext with the new options
      setUser((prevUser) => ({
        ...prevUser,
        options: updatedOptions,
        id: prevUser?.id || "", // Ensure id is always a string
        email: prevUser?.email || "", // Ensure email is always a string
        plan: prevUser?.plan || "", // Ensure plan is always a string
        token: prevUser?.token || "", // Ensure token is always a string
      }));

      setEmailNotifications(updatedOptions.optinEmail);
      setWhatsappNotifications(updatedOptions.optinWhatsapp);
      setKeywords(updatedOptions.keywords);
      setSelectedTopics(updatedOptions.selectedTopics);
      setPhoneNumber(updatedOptions.telefone);
  
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar Alertas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Preferências de Notificação</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={emailNotifications} 
                onCheckedChange={(checked) => setEmailNotifications(!!checked)} 
              />
              <Label className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                Email
              </Label>
            </div>
            {/* -- WhatsApp notifications are disabled for now -- */}
            {/* <div className="flex items-center space-x-2">
              
              <Checkbox 
                checked={whatsappNotifications} 
                onCheckedChange={(checked) => setWhatsappNotifications(!!checked)} 
              />
              <Label className="flex items-center gap-2">
                <MessageSquareIcon className="h-4 w-4" />
                WhatsApp
              </Label>
            </div> */}
          </div>
          {/* -- WhatsApp notifications are disabled for now -- */}
          {/* <div className="flex space-x-2">
            <Label className="flex items-center gap-2">
              <MessageSquareIcon className="h-4 w-4" />
            </Label>
            <Input
              placeholder="Telefone (WhatsApp)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div> */}
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Palavras-chave</h3>
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
                <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <XIcon className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveKeyword(keyword)} />
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Temas de Interesse</h3>
          <ScrollArea className="h-48">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <Badge
                  key={topic}
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTopic(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Button className="w-full" onClick={handleSaveSettings} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </CardContent>
    </Card>
  );
}