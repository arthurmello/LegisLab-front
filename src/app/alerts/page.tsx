'use client';

import React from "react";
import { BellIcon } from "lucide-react";
import { AlertsConfig } from "../(components)/alerts-config";
import { AlertsList } from "../(components)/alerts-list";

export default function AlertsPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <BellIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AlertsConfig />
        <AlertsList />
      </div>
    </div>
  );
}
