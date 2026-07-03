"use client";

import Sidebar from "../../components/dashboard/Sidebar";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="mt-3 text-slate-400">
          Configure your Synapse OS environment.
        </p>

        <div className="mt-10 space-y-6">

          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6">
            <h2 className="text-xl font-semibold">🤖 AI Model</h2>
            <p className="text-slate-400 mt-2">Sarvam AI (Current)</p>
          </div>

          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6">
            <h2 className="text-xl font-semibold">🧠 Cognitive Memory</h2>
            <p className="text-slate-400 mt-2">Neo4j Connected</p>
          </div>

          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6">
            <h2 className="text-xl font-semibold">🌍 Language</h2>
            <p className="text-slate-400 mt-2">English</p>
          </div>

          <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-6">
            <h2 className="text-xl font-semibold">🎤 Voice</h2>
            <p className="text-slate-400 mt-2">Coming Soon</p>
          </div>

        </div>
      </section>
    </main>
  );
}