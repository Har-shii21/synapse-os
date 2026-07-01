export default function KnowledgeGraph() {
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Knowledge Graph
      </h2>

      <div className="flex items-center justify-center h-80 rounded-xl border border-dashed border-violet-500/40 bg-[#0F172A]">
        <div className="text-center">
          <p className="text-3xl">🧠</p>

          <p className="mt-4 text-slate-300">
            Interactive Knowledge Graph
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Neo4j visualization coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}