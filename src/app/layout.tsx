"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./(components)/sidebar";
import { Banner } from "./(components)/banner";
import { usePathname } from "next/navigation";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

// ✅ Utility function to check if sidebar should be hidden
const shouldHideSidebar = (pathname: string) => {
  return pathname === "/home" || pathname.startsWith("/auth");
};

const shouldHideHeader = (pathname: string) => {
  return pathname === "/home" || pathname.startsWith("/auth");
};

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
  const pathname = usePathname(); // ✅ Get current route

  return (
    <AuthProvider>
      <html lang="en">
        <title>LegisLab</title>
        <body>
          {/* ✅ Global Toaster for toast notifications */}
          <Toaster position="top-right" />

          <div className="flex flex-col h-screen bg-background">
            {!shouldHideHeader(pathname) && !isMobile && <Banner />}
            <div className="flex flex-1 overflow-hidden">
              {!shouldHideSidebar(pathname) && <Sidebar />}
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}