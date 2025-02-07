import React from "react";
import { HeroSection } from "../(components)/hero-section";
import { FeatureSection } from "../(components)/feature-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}
