"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "🏠 Dashboard", href: "/dashboard" },

  { name: "🤖 Agents", href: "/agents" },

  { name: "💬 Chat", href: "/chat" },

  { name: "🔗 Knowledge Graph", href: "/knowledge-graph" },

  { name: "🧠 Memory", href: "/memory" },

  { name: "🔄 Replay", href: "/replay" },

  { name: "📊 Analytics", href: "/analytics" },

  { name: "⚙️ Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-[#0B1120] border-r border-white/10 p-6">

      <div>

  <Link
    href="/dashboard"
    className="text-3xl font-extrabold text-violet-400"
  >

    🧠 Synapse OS

  </Link>

  <p className="mt-2 text-sm text-slate-400">

    Cognitive Coordination Platform

  </p>

</div>

      <nav className="mt-12 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === item.href
                ? "bg-violet-600 text-white"
                : "text-slate-300 hover:bg-violet-600/20 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-5">

  <p className="text-sm font-semibold text-violet-300">

    🚀 System Status

  </p>

  <div className="mt-4 flex items-center gap-3">

    <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

    <span className="font-medium text-white">

      All Agents Online

    </span>

  </div>

  <p className="mt-4 text-xs text-slate-400">

    Synapse OS is coordinating all AI agents successfully.

  </p>

</div>

    </aside>
  );
}