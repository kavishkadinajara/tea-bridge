/* eslint-disable no-console */
"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconActivity,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import MyDashboard from "@/app/(dashbord)/(tea_provider)/components/MyDashboard";
import { cn } from "@/lib/utils/cn";

export default function TeaFactoryPage() {
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
      label: "Settings",
      action: () => setActiveComponent("Settings"),
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "MyDashboard":
        return <MyDashboard />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <MyDashboard />;
    }
  };

  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  return (
    <div
      className={cn(
        "rounded-xl flex flex-col md:flex-row bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto",
        "min-h-[82vh]", // Adjusted as per your use case
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
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                action: () => {}, // Define or adjust actions as needed
                icon: (
                  <Image
                    alt="Avatar"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    height={50}
                    src=""
                    width={50}
                  />
                ),
              }}
              setActiveComponent={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {renderActiveComponent()}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      href="#"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
        initial={{ opacity: 0 }}
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      href="#"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="">
      {/* <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black flex flex-col gap-2 flex-1 w-full h-full" /> */}
      <MyDashboard />
      <Profile />
      <Settings />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Profile = () => {
  return (
    <div className="w-full h-full">
      <div>profile</div>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="w-full h-full">
      <div>Settings</div>
    </div>
  );
};
