import React from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div
        className="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div
          className="font-bold text-2xl text-black dark:text-white"
        >
          LegisLab
        </div>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="border-zinc-800 dark:border-zinc-200"
          >
            Entrar
          </Button>
          <Button
            className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Criar conta
          </Button>
        </div>
      </div>
    </header>
  );
}
