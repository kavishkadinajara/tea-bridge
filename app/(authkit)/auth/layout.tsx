import { SparklesPreview } from "@/components/SparklesPreview";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SparklesPreview>
      {/* <Navbar /> */}
      <div className="container mx-auto px-2 md:px-4 lg:px-8 w-full h-full flex-grow min-h-screen">
        {children}
      </div>
    </SparklesPreview>
  );
}
