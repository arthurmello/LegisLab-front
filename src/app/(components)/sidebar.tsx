"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Use this instead of window.location.pathname
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  Users2Icon,
  FileTextIcon,
  WalletCardsIcon,
  HelpCircleIcon,
  LogOutIcon,
  BellIcon,
  VoteIcon,
  UserIcon,
  MenuIcon,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); // ✅ Get the current route
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const routes = [
    { label: "Dashboard", icon: HomeIcon, href: "/" },
    { label: "Parlamentares", icon: Users2Icon, href: "/parliamentarians" },
    { label: "Proposições", icon: FileTextIcon, href: "/propositions" },
    { label: "Votações", icon: VoteIcon, href: "/votes" },
    { label: "Gastos", icon: WalletCardsIcon, href: "/expenses" },
    { label: "Alertas", icon: BellIcon, href: "/alerts" },
    { label: "Minha Conta", icon: UserIcon, href: "/account" },
  ];

  const sidebarClasses = cn("flex flex-col h-full transition-all duration-300", {
    "w-[250px]": isExpanded || isMenuOpen,
    "w-[70px]": !isExpanded && !isMenuOpen,
    "fixed inset-y-0 left-0 z-50 bg-white shadow-lg": isMobile,
    "translate-x-0": isMenuOpen || !isMobile,
    "-translate-x-full": !isMenuOpen && isMobile,
  });

  return (
    <>
      {isMobile && !isMenuOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-[100] w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      )}

      <div
        className={sidebarClasses}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href} // ✅ Use `href` instead of `to`
                  className={cn(
                    "flex items-center p-3 text-sm font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition whitespace-nowrap",
                    isActive && "text-primary bg-primary/10"
                  )}
                  onClick={() => isMobile && setIsMenuOpen(false)}
                >
                  <route.icon className="h-5 w-5 min-w-[20px]" />
                  <span
                    className={cn("ml-3 transition-opacity", {
                      "opacity-0 w-0": !isExpanded && !isMenuOpen,
                      "opacity-100": isExpanded || isMenuOpen,
                    })}
                  >
                    {route.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-auto px-3 py-2">
          <Link
            href="/help" // ✅ Corrected href
            className="flex items-center p-3 text-sm font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition whitespace-nowrap"
          >
            <HelpCircleIcon className="h-5 w-5 min-w-[20px]" />
            <span
              className={cn("ml-3 transition-opacity", {
                "opacity-0 w-0": !isExpanded && !isMenuOpen,
                "opacity-100": isExpanded || isMenuOpen,
              })}
            >
              Ajuda
            </span>
          </Link>
          <Button variant="ghost" className="w-full mt-2 justify-start" onClick={() => isMobile && setIsMenuOpen(false)}>
            <LogOutIcon className="h-5 w-5 min-w-[20px]" />
            <span
              className={cn("ml-3 transition-opacity", {
                "opacity-0 w-0": !isExpanded && !isMenuOpen,
                "opacity-100": isExpanded || isMenuOpen,
              })}
            >
              Sair
            </span>
          </Button>
        </div>
      </div>
      {isMobile && isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
}