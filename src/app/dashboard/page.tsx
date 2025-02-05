'use client';

import React from "react";
import { RecentBills } from "../(components)/recent-bills";
import { RecentAlerts } from "../(components)/recent-alerts";
import { HighlightVotes } from "../(components)/highlight-votes";
import { ActivityIcon } from "lucide-react";

export default function Dashboard() {
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

      <div className="grid gap-4 md:grid-cols-2">
        <HighlightVotes />
        <RecentAlerts />
      </div>

      <div className="grid gap-4">
        <RecentBills />
      </div>
    </div>
  );
}
