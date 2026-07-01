import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Architecture from "../components/landing/Architecture";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816]">
      <Navbar />
      <Hero />
      <Architecture />
    </main>
  );
}