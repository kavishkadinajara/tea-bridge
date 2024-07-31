import { SparklesPreview } from "@/components/SparklesPreview";
import { Navbar } from "@/components/navbar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SparklesPreview>
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </div>
    </SparklesPreview>
  );
}
