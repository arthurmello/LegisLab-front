'use client';

import React from "react";
import Image from "next/image";

export function Banner() {
  return (
    <div
      className="h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-full items-center px-8">
        <div className="flex items-center gap-2">
          <Image 
            src="/assets/logo2.png" 
            alt="LegisLab Logo" 
            width={24} 
            height={24} 
          />
          <span className="text-lg font-semibold">
            LegisLab
          </span>
        </div>
      </div>
    </div>
  );
}