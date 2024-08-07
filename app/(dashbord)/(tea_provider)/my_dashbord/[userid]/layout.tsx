import { Navbar } from "@/components/navbar";
// import { SparklesPreview } from "@/components/SparklesPreview";

export default function TeaProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* <SparklesPreview> */}
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </div>
      {/* </SparklesPreview> */}
    </>
  );
}
