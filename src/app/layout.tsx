'use client';

import React, { useState, useEffect } from "react";
import { Sidebar } from "./(components)/sidebar";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"; // Import Router
import { Banner } from "./(components)/banner";
import "./globals.css";
import HomePage from "./page"; // Import your HomePage component
import Dashboard from "./dashboard/page"; // Import your Dashboard component
import ParliamentariansPage from "./parliamentarians/page"
import PropositionsPage from "./propositions/page"
import VotesPage from "./votes/page"
import ExpensesPage from "./expenses/page"
import AlertsPage from "./alerts/page"
import AccountPage from "./account/page"
// Import other pages as needed

// Custom hook for media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export default function Layout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Router>
      <html>
      <title>LegisLab</title>
      <head>
      <link rel="shortcut icon" href="/favicon.ico" />
      </head>
        <body>
          <div className="flex flex-col h-screen bg-background">
            {!isMobile && <Banner />}
            <div className="flex flex-1 overflow-hidden">

              <Sidebar />

              <main className="flex-1 overflow-y-auto p-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/parliamentarians" element={<ParliamentariansPage />} />
                  <Route path="/propositions" element={<PropositionsPage />} />
                  <Route path="/votes" element={<VotesPage />} />
                  <Route path="/expenses" element={<ExpensesPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  
                  {/* Add other routes here */}
                </Routes>
                <Outlet /> {/* This will render the selected component based on the route */}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Router>

  );
}
