/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
"use client";
import React, { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconReportAnalytics,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use Next.js router for redirection

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import MyDashboard from "@/components/teaProvider/MyDashboard";
import Analyze from "@/components/teaProvider/Analyze";
import Profile from "@/components/teaProvider/Profile";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/utils/supabase/client";

export default function TeaSupplierPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const router = useRouter(); // Use router for navigation

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
        // Redirect to login page if user is not authenticated
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
      // Handle sign out error if needed
    } else {
      // Redirect or update UI on successful sign out
      window.location.href = "/auth"; // Redirect to login page
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
      label: "Logout",
      action: handleLogout,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "MyDashboard":
        // Option 1: Provide a fallback value
        return <MyDashboard userId={userId || ""} />;
      case "Profile":
        return <Profile userId={userId || ""} />;
      case "Analyze":
        return <Analyze userId={userId || ""} />;
      default:
        // Option 2: Conditionally render the component
        return userId ? (
          <MyDashboard userId={userId} />
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
          <div>
            <SidebarLink
              link={{
                label: userId || "", // Handle null case by using an empty string
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
              setActiveComponent={() => {}}
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

// // Dummy dashboard component with content
// const Dashboard = ({ userId }: { userId: string | null }) => {
//   if (!userId) {
//     return <div>No user ID provided</div>; // Handle null userId
//   }

//   return (
//     <div className="">
//       <h1 className="text-3xl font-bold">ID: {userId}</h1>
//       <MyDashboard userId={userId} />
//       <Profile />
//       <Settings />
//     </div>
//   );
// };

const Settings = () => {
  return (
    <div className="w-full h-full">
      <div>Settings</div>
    </div>
  );
};
