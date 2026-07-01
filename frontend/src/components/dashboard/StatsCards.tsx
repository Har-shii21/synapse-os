const stats = [
  {
    title: "Active AI Agents",
    value: "12",
    color: "text-violet-400",
  },
  {
    title: "Running Tasks",
    value: "28",
    color: "text-blue-400",
  },
  {
    title: "Memory Nodes",
    value: "1,248",
    color: "text-green-400",
  },
  {
    title: "Success Rate",
    value: "99.2%",
    color: "text-yellow-400",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg transition hover:border-violet-500"
        >
          <p className="text-sm text-slate-400">{stat.title}</p>

          <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}