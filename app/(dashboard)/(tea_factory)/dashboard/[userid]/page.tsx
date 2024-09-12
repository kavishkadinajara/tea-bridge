"use client";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconReportAnalytics,
  IconUserBolt,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Dashboard from "@/components/teaFactory/Dashboard";
import Analyze from "@/components/teaProvider/Analyze";
import Profile from "@/components/teaFactory/Profile";
import Suppliers from "@/components/teaFactory/Suppliers";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/utils/supabase/client";
import { Logo } from "@/components/icons";
import { LogoIcon } from "@/app/blog/page";

export default function TeaFactoryPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
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

      if (!user) {
        router.push("/auth");

        return;
      }

      setUserId(user.id || null);
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      window.location.href = "/auth";
    }
  };

  const links = [
    {
      label: "Dashboard",
      action: () => setActiveComponent("Dashboard"),
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      action: () => setActiveComponent("Profile"),
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analyze",
      action: () => setActiveComponent("Analyze"),
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Suppliers",
      action: () => setActiveComponent("Suppliers"),
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      action: handleLogout,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return (
          <Dashboard
            setActiveComponent={setActiveComponent}
            userId={userId || ""}
          />
        );
      case "Profile":
        return <Profile userId={userId || ""} />;
      case "Analyze":
        return <Analyze userId={userId || ""} />;
      case "Suppliers":
        return <Suppliers userId={userId || ""} />;
      default:
        return userId ? (
          <Dashboard
            setActiveComponent={function (component: string): void {
              throw new Error("Function not implemented.");
            }}
            userId={userId || ""}
          />
        ) : (
          <div className="w-full ">
            <Loading />
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl flex flex-col md:flex-row bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto mb-8",
        "min-h-[82vh]",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  setActiveComponent={setActiveComponent}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {renderActiveComponent()}
    </div>
  );
}
