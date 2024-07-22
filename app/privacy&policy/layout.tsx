import { SparklesPreview } from "@/components/SparklesPreview";

export default function PrivacyPolicytLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SparklesPreview>
      {children}
    </SparklesPreview>
  );
}
