interface AgentCardProps {
  name: string;
  role: string;
  avatar: string;
  status: string;
}

export default function AgentCard({
  name,
  role,
  avatar,
  status,
}: AgentCardProps) {
  const statusColor =
    status === "Online"
      ? "bg-green-500"
      : status === "Thinking"
      ? "bg-yellow-500"
      : "bg-gray-500";

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 hover:border-blue-500 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{avatar}</div>

        <div className="flex-1">
          <h2 className="font-semibold text-white">{name}</h2>

          <p className="text-sm text-zinc-400">{role}</p>

          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />

            <span className="text-xs text-zinc-400">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}