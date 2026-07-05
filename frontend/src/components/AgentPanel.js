import { useAgentStatus } from "../hooks/useAgentStatus";

export default function AgentPanel() {
  const status = useAgentStatus();

  const renderAgent = (name) => {
    const agent = status[name];

    return (
      <div style={{ padding: "10px", border: "1px solid gray", margin: "10px" }}>
        <h3>{name}</h3>
        <p>Status: {agent?.status}</p>
        <p>Time: {agent?.time}</p>
      </div>
    );
  };

  return (
    <div>
      {renderAgent("planner")}
      {renderAgent("researcher")}
      {renderAgent("engineer")}
      {renderAgent("reviewer")}
    </div>
  );
}