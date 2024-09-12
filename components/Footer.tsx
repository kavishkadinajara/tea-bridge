import React from "react";
import { Link } from "@nextui-org/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

const Footer = () => {
  return (
    <div className="w-full text-gray-800 dark:text-white ">
      <footer className="mx-7 md:mx-16 py-8">
        <hr className="mb-5 border-gray-700" />
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-4 md:space-y-0">
            {/* Logo and Attribution */}
            <div>
              <Link className="block mb-2" href="/">
                <p className="font-bold text-2xl">
                  <span className="dark:text-green-500 text-green-700">
                    Tea
                  </span>
                  <span className="dark:text-lime-700 text-lime-900">
                    Bridge
                  </span>
                </p>
              </Link>
              <p className="text-sm">Made with ❤️ by Kavishka Dinajara</p>
            </div>

            {/* Copyright Text */}
            <div>
              <p className="text-sm">
                Copyright © 2024 | TEA-BRIDGE. All Rights Reserved.
              </p>
            </div>

            {/* Links and Social Icons */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-sm">
                <Link className="hover:underline" href="/privacy&policy">
                  Privacy Policy
                </Link>{" "}
                |
                <Link className="hover:underline mx-2" href="/terms">
                  Terms of Service
                </Link>
                |<span className="ml-2">Status 🟢</span>
              </div>
              <div className="flex space-x-4 justify-center md:justify-start">
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
                <Link
                  isExternal
                  aria-label="Github"
                  href={siteConfig.links.github}
                >
                  <GithubIcon className="text-default-500 text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
