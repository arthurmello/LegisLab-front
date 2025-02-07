import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function HeroSection() {
  return (
    <div
      className="flex flex-col items-center text-center py-20 space-y-8"
    >
      <h1
        className="text-5xl md:text-6xl font-bold max-w-4xl text-black dark:text-white"
      >
        Acompanhe o Congresso Nacional de forma inteligente
      </h1>
      <p
        className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl"
      >
        Mantenha-se informado sobre projetos de lei, votações e atividades
        parlamentares com análises em tempo real e alertas personalizados.
      </p>
      <div className="space-x-4">
        <Button
          className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-8 py-6 text-lg"
        >
          Comece agora
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
