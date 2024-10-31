import { SparklesPreview } from "@/components/SparklesPreview";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SparklesPreview>
      {/* <Navbar /> */}
      <div className=" w-full h-full min-h-screen">{children}</div>
    </SparklesPreview>
  );
}
