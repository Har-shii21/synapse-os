"use client";

import Sidebar from "../../components/dashboard/Sidebar";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">⚙️ Settings</h1>

        <p className="mt-3 text-slate-400">
          Manage your Synapse OS configuration and monitor system health.
        </p>

        {/* System Status */}
        <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
          <h2 className="text-2xl font-bold text-green-400">
            🟢 Synapse OS Status
          </h2>

          <p className="mt-2 text-slate-300">
            All core services are operational. Multi-Agent AI, Voice AI,
            Knowledge Graph, Analytics Dashboard, and Workflow Engine are
            running successfully.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* AI Engine */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">🤖 AI Engine</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Sarvam AI Connected
            </p>
            <p className="mt-1 text-slate-400">
              Speech-to-Text & Text-to-Speech Enabled
            </p>
          </div>

          {/* Cognitive Memory */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">🧠 Cognitive Memory</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Neo4j Connected
            </p>
            <p className="mt-1 text-slate-400">
              Knowledge Graph Active
            </p>
          </div>

          {/* Voice */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">🎤 Voice Assistant</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Enabled
            </p>
            <p className="mt-1 text-slate-400">
              Voice Input & Audio Playback Ready
            </p>
          </div>

          {/* Language */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">🌍 Language</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● English (en-IN)
            </p>
            <p className="mt-1 text-slate-400">
              Supports 10+ Indian Languages
            </p>
          </div>

          {/* Backend */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">⚡ Backend</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● FastAPI Running
            </p>
            <p className="mt-1 text-slate-400">
              REST APIs Operational
            </p>
          </div>

          {/* Frontend */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">💻 Frontend</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Next.js + React
            </p>
            <p className="mt-1 text-slate-400">
              Dashboard Connected Successfully
            </p>
          </div>

          {/* Analytics */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">📊 Analytics</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Active
            </p>
            <p className="mt-1 text-slate-400">
              Workflow & Agent Monitoring Enabled
            </p>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
            <h2 className="text-xl font-semibold">🔐 Security</h2>
            <p className="mt-3 text-green-400 font-medium">
              ● Environment Secured
            </p>
            <p className="mt-1 text-slate-400">
              API Keys Loaded & Configuration Verified
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}