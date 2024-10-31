import { SparklesPreview } from "@/components/SparklesPreview";

export default function PasswordResetLayout({
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
