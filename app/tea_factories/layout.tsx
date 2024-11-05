import { Navbar } from "@/components/Navbar";
import { SparklesPreview } from "@/components/SparklesPreview";
import Footer from "@/components/Footer";

export default function TeaFactories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* // <SparklesPreview> */}
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </div>
      <Footer />
    {/* </SparklesPreview> */}
    </>
  );
}
