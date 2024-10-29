"use client";

import React from "react";

import { CardBody, CardContainer } from "@/components/ui/3d-card";

export function ThreeDCardDemo({ children }: { children: React.ReactNode }) {
  return (
    <CardContainer className="inter-var">
      <CardBody>
        <div>{children}</div>
      </CardBody>
    </CardContainer>
  );
}
