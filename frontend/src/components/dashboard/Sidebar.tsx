import Link from "next/link";

const menuItems = [
  "Dashboard",
  "Agents",
  "Memory",
  "Knowledge Graph",
  "Replay",
  "Analytics",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#0B1120] border-r border-white/10 p-6">
      <Link href="/" className="text-3xl font-bold text-white">
        🧠 Synapse
      </Link>

      <p className="mt-2 text-sm text-slate-400">
        Cognitive Coordination OS
      </p>

      <nav className="mt-12 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-violet-600/20 hover:text-white"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-16 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
        <p className="text-sm text-violet-300">System Status</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-white">All Agents Online</span>
        </div>
      </div>
    </aside>
  );
}