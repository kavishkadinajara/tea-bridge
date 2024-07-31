import { SparklesPreview } from "@/components/SparklesPreview";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SparklesPreview>
      {/* <Navbar /> */}
      <div className="container mx-auto max-w-screen px-20 h-full flex-grow min-h-screen">
        {children}
      </div>
    </SparklesPreview>
  );
}
