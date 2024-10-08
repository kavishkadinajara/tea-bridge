import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Counter } from "@/components/counter";
import ColorPatch from "@/components/ColorPatch";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ColorPatch />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Make&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
          <br />
          <h1 className={title()}>
            websites regardless of your design experience.
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </h2>
          <h3 className="text-5xl text-rose-700 text-center font-semibold">
            hi all
          </h3>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
        <Counter />
      </section>
      <Footer />
    </>
  );
}
