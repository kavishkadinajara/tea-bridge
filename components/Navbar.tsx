"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { User } from "next-auth";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/utils/supabase/client";

type SessionState = { user: User } | null;

export const Navbar = () => {
  const [session, setSession] = useState<SessionState>(null);
  const [userType, setUserType] = useState<string>("");
  // const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setSession({ user: data.user });
        setUserType(data.user.user_metadata?.userType || "");
        // setUserEmail(data.user.email || "");

        // Calculate userId from the userEmail
        const email = data.user.email || "";

        setUserId(email.split("@")[0]);
      }
    };

    fetchSession();
  }, []);

  const getDashboardRoute = () => {
    if (userType === "tea_supplier") {
      router.push(`/tea-supplier/dashboard`);
    } else {
      router.push(`/tea-factory/dashboard`);
    }
  };

  return (
    <NextUINavbar
      className="bg-transparent backdrop-blur-md py-2 md:py-4 rounded-2xl shadow-md shadow-cyan-700 hover:shadow-lime-700"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-0" href="/">
            <Image
              alt="logo"
              className="w-20 lg:w-24"
              height={90}
              src="/logo.png"
              width={90}
            />
            <p className="font-bold text-inherit text-2xl hidden md:block">
              <span className="dark:text-green-500 text-green-700">Tea</span>
              <span className="dark:text-lime-700 text-lime-900">Bridge</span>
            </p>
          </NextLink>
        </NavbarBrand>
        <NextLink className="flex justify-center" href="/">
          <p className="font-bold text-inherit text-xl text-center md:hidden">
            <span className="dark:text-green-500 text-green-700">Tea</span>
            <span className="dark:text-lime-700 text-lime-900">Bridge</span>
          </p>
        </NextLink>

        <ul className="hidden md:flex justify-self-center gap-6 ml-20 items-center border-collapse border-2 px-4 py-2 rounded-full border-cyan-600 hover:border-lime-600 font-medium">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-lg hover:text-green-900 dark:hover:text-green-300 transition-all duration-500 ease-out",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4">
          <Link
            isExternal
            aria-label="Instagram"
            href={siteConfig.links.instagram}
          >
            <FaInstagram className="text-default-500 text-xl" />
          </Link>
          <Link
            isExternal
            aria-label="Facebook"
            href={siteConfig.links.facebook}
          >
            <FaFacebook className="text-default-500 text-xl" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500 text-xl" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">
          {session ? (
            <Button
              className="text-md font-semibold shadow-md border-2 text-cyan-950 border-cyan-700 hover:text-green-950 hover:shadow-lime-600 hover:border-lime-700 shadow-cyan-600 dark:bg-transparent dark:text-cyan-700 dark:shadow-cyan-300 dark:border-cyan-300 dark:hover:text-green-700 dark:hover:shadow-lime-300 dark:hover:border-lime-300"
              variant="flat"
              onClick={getDashboardRoute}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              as={Link}
              className="text-md font-semibold shadow-md border-2 text-cyan-950 border-cyan-700 hover:text-green-950 hover:shadow-lime-600 hover:border-lime-700 shadow-cyan-600 dark:bg-transparent dark:text-cyan-700 dark:shadow-cyan-300 dark:border-cyan-300 dark:hover:text-green-700 dark:hover:shadow-lime-300 dark:hover:border-lime-300"
              href="/auth"
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem className="flex">
          {session ? (
            <Button
              className="text-sm font-semibold shadow-sm border-1 text-cyan-950 border-cyan-700 hover:text-green-950 hover:shadow-lime-600 hover:border-lime-700 shadow-cyan-600 dark:bg-transparent dark:text-cyan-700 dark:shadow-cyan-300 dark:border-cyan-300 dark:hover:text-green-700 dark:hover:shadow-lime-300 dark:hover:border-lime-300"
              variant="flat"
              onClick={getDashboardRoute}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              as={Link}
              className="text-xs font-semibold shadow-sm border-1 text-cyan-950 border-cyan-700 hover:text-green-950 hover:shadow-lime-600 hover:border-lime-700 shadow-cyan-600 dark:bg-transparent dark:text-cyan-700 dark:shadow-cyan-300 dark:border-cyan-300 dark:hover:text-green-700 dark:hover:shadow-lime-300 dark:hover:border-lime-300"
              href="/auth"
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="mt-5">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={item.href}>
              <Link
                className="text-lg"
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
