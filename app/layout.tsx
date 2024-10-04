import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import "@/styles/scrollbar.css";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { SparklesPreview } from "@/components/SparklesPreview";

// import { Navbar } from "@/components/navbar";
// import i18n from "@/lib/i18n";
// import "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen overflow-x-hidden bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black overflow-auto",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            {/* <Navbar /> */}
            {/* <SparklesPreview> */}
            <main className="">{children}</main>
            {/* </SparklesPreview> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
