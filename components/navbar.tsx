import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import Image from "next/image";

import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {SparklesPreview} from "@/components/SparklesPreview"
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 border border-cyan-700 hover:border-lime-700 border-2", // Add border color here
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <FaSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />

  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-transparent backdrop-blur-md py-2 md:py-4 rounded-2xl shadow-md shadow-cyan-700 hover:shadow-lime-700">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-0" href="/">
            <Image src={"/logo.png"} alt={"logo"} width={90} height={90} className="w-20  lg:w-24 "></Image>
            <p className="font-bold text-inherit text-2xl hidden md:block"><span className="dark:text-green-500 text-green-700">Tea</span><span className=" dark:text-lime-700 text-lime-900">Bridge</span></p>
          </NextLink>
        </NavbarBrand>
        <NextLink href={"/"} className="flex justify-center">
          <p className="font-bold text-inherit text-xl text-center md:hidden"><span className="dark:text-green-500 text-green-700">Tea</span><span className=" dark:text-lime-700 text-lime-900">Bridge</span></p>
          </NextLink>

        <ul className="hidden lg:flex gap-6 ml-20 border-collapse border-2 px-4 py-2 rounded-full border-cyan-600 hover:border-lime-600 font-medium">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-lg hover:text-green-900 dark:hover:text-green-300 ",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-4">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <FaInstagram className="text-default-500 text-xl" />
          </Link>
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <FaFacebook className="text-default-500 text-xl" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500 text-xl" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            // isExternal
            as={Link}
            className="text-md font-semibold shadow-md border-2  text-cyan-950 border-cyan-700 hover:text-green-950 hover:shadow-lime-600 hover:border-lime-700 shadow-cyan-600 dark:bg-transparent dark:text-cyan-700  dark:shadow-cyan-300  dark:border-cyan-300 dark:hover:text-green-700  dark:hover:shadow-lime-300  dark:hover:border-lime-300"
            href={siteConfig.links.login}
            // startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500 text-xl" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="mt-5">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={item.href}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
                className="text-lg"
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
