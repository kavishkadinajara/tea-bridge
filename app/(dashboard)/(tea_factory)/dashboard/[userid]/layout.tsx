import { Navbar } from "@/components/Navbar";

export default function TeaFactoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-screen pt-4 flex-grow">
        {children}
      </div>
    </>
  );
}
