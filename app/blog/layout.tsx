import { SparklesPreview } from "@/components/SparklesPreview"
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <SparklesPreview>
      <div className="">
        {children}
      </div>
  );
}
