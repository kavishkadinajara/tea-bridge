/* eslint-disable no-console */
"use client";
import React, { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconReportAnalytics,
  IconUserBolt,
  IconUsers,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/utils/supabase/client";

export default function TeaFactoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        router.push("/auth");

        return;
      }

      if (!user || userType === "tea_supplier") {
        router.push("/auth"); // Redirect if userType is not tea_factory

        return;
      }

      setUserId(user.id || null);
    };

    fetchUser();
  }, [router]);

  const links = [
    {
      label: "Dashboard",
      action: () => "/tea-factory/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      action: () => "/tea-factory/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analyze",
      action: () => "/tea-factory/analyze",
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Suppliers",
      action: () => "/tea-factory/suppliers",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   action: "/app/actions/logout.ts",
    //   icon: (
    //     <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];

  return (
    <>
      <Navbar />
      <div
        className={cn(
          "rounded-xl flex flex-col md:flex-row bg-green-50 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto mb-8 mt-5",
          "min-h-[82vh]",
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <Link key={idx} className="flex gap-x-4" href={link.action()}>
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        {children}
      </div>
    </>
  );
}