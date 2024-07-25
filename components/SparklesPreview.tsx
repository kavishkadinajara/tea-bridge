"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";

export function SparklesPreview({
    children,
  }: {
    children: React.ReactNode;
  }
) {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const colorDot = isDarkMode ? "#b3ffb3" : "#001a00";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-md">
      <div className="w-screen absolute inset-0 h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={colorDot}
        />
      </div>
      {children}
    </div>
  );
}
