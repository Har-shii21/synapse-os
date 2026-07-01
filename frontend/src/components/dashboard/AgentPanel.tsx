const agents = [
  {
    name: "Planner AI",
    status: "Planning roadmap...",
    progress: 92,
    color: "bg-green-500",
  },
  {
    name: "Research AI",
    status: "Searching knowledge...",
    progress: 74,
    color: "bg-blue-500",
  },
  {
    name: "Engineer AI",
    status: "Writing backend...",
    progress: 81,
    color: "bg-yellow-500",
  },
  {
    name: "Memory AI",
    status: "Updating memory graph...",
    progress: 58,
    color: "bg-violet-500",
  },
];

export default function AgentPanel() {
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Active AI Agents
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-2xl border border-white/10 bg-[#111827] p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {agent.name}
              </h3>

              <span
                className={`h-3 w-3 rounded-full animate-pulse ${agent.color}`}
              />
            </div>

            <p className="mt-3 text-slate-400">
              {agent.status}
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className={`${agent.color} h-full rounded-full`}
                style={{ width: `${agent.progress}%` }}
              />
            </div>

            <p className="mt-2 text-right text-sm text-slate-400">
              {agent.progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}