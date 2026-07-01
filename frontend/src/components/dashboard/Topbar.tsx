import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#050816] px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Synapse Dashboard
        </h1>

        <p className="text-slate-400">
          Coordinate AI agents with shared memory
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-2">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search agents..."
            className="bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <Bell className="cursor-pointer text-slate-300 hover:text-white" />

        <UserCircle2
          size={36}
          className="cursor-pointer text-violet-400"
        />
      </div>
    </header>
  );
}