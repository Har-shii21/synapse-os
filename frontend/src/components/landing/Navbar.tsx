import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          🧠 Synapse
        </h1>

        <Link
          href="/dashboard"
          className="rounded-xl bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-500"
        >
          Launch Platform
        </Link>
      </div>
    </nav>
  );
}