import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold">
        LegisLab
      </h1>
    </div>
  );
}
