import { useEffect, useState } from "react";

export function useAgentStatus() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("https://synapse-os-backend.onrender.com/agent-status");
      const data = await res.json();
      setStatus(data);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return status;
}