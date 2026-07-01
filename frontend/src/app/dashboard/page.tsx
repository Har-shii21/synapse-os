export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-[#0b1120] p-6">
        <h1 className="text-2xl font-bold">🧠 Synapse</h1>

        <nav className="mt-10 space-y-4">
          <button className="w-full rounded-lg bg-violet-600 px-4 py-3 text-left">
            Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-white/10">
            Agents
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-white/10">
            Memory
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-white/10">
            Knowledge Graph
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-white/10">
            Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-10">
        <h2 className="text-4xl font-bold">
          Cognitive Coordination Dashboard
        </h2>

        <p className="mt-3 text-slate-400">
          Monitor AI agents, workflows, memory, and decision graphs in real time.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">🤖 Active Agents</h3>
            <p className="mt-3 text-4xl font-bold">5</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">🧠 Memory Nodes</h3>
            <p className="mt-3 text-4xl font-bold">128</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">⚡ Running Tasks</h3>
            <p className="mt-3 text-4xl font-bold">12</p>
          </div>
        </div>
      </section>
    </main>
  );
}