"use client";
import React from "react";
import { useTheme } from "next-themes";

import { SparklesCore } from "@/components/ui/sparkles";

export function SparklesPreview({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const colorDot = isDarkMode ? "#b3ffb3" : "#001a00";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-md">
      <div className="w-screen absolute inset-0 h-full">
        <SparklesCore
          background="transparent"
          className="w-full h-full"
          id="tsparticlesfullpage"
          maxSize={1.4}
          minSize={0.6}
          particleColor={colorDot}
          particleDensity={100}
        />
      </div>
      {children}
    </div>
  );
}
