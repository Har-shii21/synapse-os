const activities = [
  "🧠 Planner AI created a new execution plan",
  "🔍 Research AI found 18 relevant documents",
  "💾 Memory AI stored new knowledge",
  "⚙️ Engineer AI completed API generation",
  "✅ Reviewer AI approved the final response",
];

export default function ActivityFeed() {
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Live Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="rounded-xl bg-[#1E293B] p-4 text-slate-300"
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}