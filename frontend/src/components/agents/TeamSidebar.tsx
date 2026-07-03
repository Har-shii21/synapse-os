import AgentCard from "./AgentCard";

interface Agent {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: string;
}

interface TeamSidebarProps {
  agents: Agent[];
}

export default function TeamSidebar({
  agents,
}: TeamSidebarProps) {
  return (
    <div className="w-72 border-r border-zinc-800 p-5">
      <h1 className="text-xl font-bold mb-6">
        AI Team
      </h1>

      <div className="space-y-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            role={agent.role}
            avatar={agent.avatar}
            status={agent.status}
          />
        ))}
      </div>
    </div>
  );
}