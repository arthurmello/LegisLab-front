'use client';

import React from "react";
import { RecentBills } from "../(components)/recent-bills";
import { RecentAlerts } from "../(components)/recent-alerts";
import { HighlightVotes } from "../(components)/highlight-votes";
import { ActivityIcon } from "lucide-react";
import { withAuth } from "../hoc/withAuth";

function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 h-screen">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <ActivityIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 h-full flex-grow">
        <HighlightVotes />
        <RecentBills />
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
