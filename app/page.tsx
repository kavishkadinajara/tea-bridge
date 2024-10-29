import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen">
        <h1 className="text-center text-5xl text-cyan-500">TEA BRIDGE</h1>
      </section>
      <Footer />
    </>
  );
}
