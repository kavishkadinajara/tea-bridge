import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SparklesPreview } from "@/components/SparklesPreview";

export default function TeaFactories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SparklesPreview>
        <Navbar />
        <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </div>
        <Footer />
      </SparklesPreview>
    </>
  );
}
