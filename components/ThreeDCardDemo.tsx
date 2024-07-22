"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo({
    children,
  }: {
    children: React.ReactNode;
  }
) {
  return (
    <CardContainer className="inter-var">
      <CardBody>
        <div>
          {children}
        </div>
      </CardBody>
    </CardContainer>
  );
}
