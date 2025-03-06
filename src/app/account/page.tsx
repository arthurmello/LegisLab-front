"use client";

import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, CrownIcon, ArrowUpIcon, CheckCircleIcon } from "lucide-react";
import { AlertsConfig } from "../(components)/alerts-config";
import { withAuth } from "../hoc/withAuth";

function AccountPage() {
  const { user, signOut, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">Erro ao carregar a conta.</p>;

  const isPaidUser = user.plan === "paid";

  return (
    <div className="flex-1 space-y-6">
      <AlertsConfig />
    </div>
  );
}

export default withAuth(AccountPage);
