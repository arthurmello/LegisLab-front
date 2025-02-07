"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./(components)/sidebar";
import { Banner } from "./(components)/banner";
import { usePathname } from "next/navigation"; // ✅ Use Next.js routing
import "./globals.css";
import HomePage from "./page";
import Dashboard from "./dashboard/page";
import ParliamentariansPage from "./parliamentarians/page";
import PropositionsPage from "./propositions/page";
import VotesPage from "./votes/page";
import ExpensesPage from "./expenses/page";
import AlertsPage from "./alerts/page";
import AccountPage from "./account/page";
import { AuthProvider } from "./context/AuthContext";

// ✅ Define TypeScript type for query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname(); // ✅ Get current route in Next.js

  return (
    <AuthProvider>
      <html>
        <title>LegisLab</title>
        <body>
          <div className="flex flex-col h-screen bg-background">
            {!isMobile && <Banner />}
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-8">
                {/* ✅ Automatically render children based on Next.js routing */}
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}