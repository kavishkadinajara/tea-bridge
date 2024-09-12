"use client";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils/cn";
import { SparklesPreview } from "@/components/SparklesPreview";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SparklesPreview>
      <div
        className={cn(
          "relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden w-full rounded-3xl z-0",
          className,
        )}
      >
        <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
          <motion.div
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-lime-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
            initial={{ opacity: 0.5, width: "15rem" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileInView={{ opacity: 1, width: "30rem" }}
          >
            <div className="absolute w-[100%] left-0 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-50 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-[100%] left-0 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
          <motion.div
            className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-lime-500 text-white [--conic-position:from_290deg_at_center_top]"
            initial={{ opacity: 0.5, width: "15rem" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileInView={{ opacity: 1, width: "30rem" }}
          >
            <div className="absolute w-40 h-[100%] right-0 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-50 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-[100%] right-0 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-50 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-90 blur-2xl" />
          <div className="absolute top-1/2 z-50 h-48 w-full bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-10 backdrop-blur-md" />
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-lime-500 opacity-50 blur-3xl" />
          <motion.div
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-lime-400 blur-2xl"
            initial={{ width: "8rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileInView={{ width: "16rem" }}
          />
          <motion.div
            className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-lime-400"
            initial={{ width: "15rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileInView={{ width: "30rem" }}
          />

          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black opacity-25" />
        </div>

        <SparklesPreview>
          <div className="relative z-50 flex -translate-y-40 tracking-tighter flex-col items-center px-5">
            {children}
          </div>
        </SparklesPreview>
      </div>
    </SparklesPreview>
  );
};
