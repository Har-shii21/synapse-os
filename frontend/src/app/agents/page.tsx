"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const agents = [
  {
    key: "planner",
    name: "🧠 Planner Agent",
    description: "Creates intelligent execution plans.",
  },
  {
    key: "researcher",
    name: "🔍 Researcher Agent",
    description: "Collects and analyzes information.",
  },
  {
    key: "engineer",
    name: "⚙️ Engineer Agent",
    description: "Builds implementation strategies.",
  },
  {
    key: "security",
    name: "🛡️ Security Agent",
    description: "Checks security and compliance.",
  },
  {
    key: "analyst",
    name: "📊 Analyst Agent",
    description: "Generates insights and metrics.",
  },
  {
    key: "reviewer",
    name: "✅ Reviewer Agent",
    description: "Reviews workflow quality.",
  },
];

export default function AgentsPage() {
  const [workflow, setWorkflow] = useState<any>({});

  useEffect(() => {
    async function loadWorkflow() {
      try {
        const response = await fetch("http://127.0.0.1:8000/workflow-status");
        const data = await response.json();
        setWorkflow(data);
      } catch (error) {
        console.error("Failed to load workflow:", error);
      }
    }

    loadWorkflow();

    const interval = setInterval(loadWorkflow, 1000);

    return () => clearInterval(interval);
  }, []);

  function getBadgeColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "running":
        return "bg-blue-500/20 text-blue-400";
      case "waiting":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  }

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">🤖 Agent Control Center</h1>

        <p className="mt-3 text-slate-400">
          Monitor and manage every AI agent inside Synapse OS.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => {
            const status = workflow[agent.key] || "waiting";

            return (
              <div
                key={agent.key}
                className="rounded-2xl border border-white/10 bg-[#0B1120] p-6 hover:border-violet-500 transition"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {agent.name}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeColor(
                      status
                    )}`}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>

                <p className="mt-4 text-slate-400">
                  {agent.description}
                </p>

                <div className="mt-6 text-sm text-slate-500">
                  Last Activity: {status}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-[#0B1120] border border-white/10 p-6">
          <h2 className="text-2xl font-bold">
            🚀 Live Workflow
          </h2>

          <p className="mt-4">
            Current Task:
            <span className="ml-2 text-violet-400">
              {workflow.current_task || "Waiting..."}
            </span>
          </p>

          <p className="mt-2">
            Progress:
            <span className="ml-2 text-green-400">
              {workflow.progress || 0}%
            </span>
          </p>

          <div className="mt-4 h-3 w-full rounded-full bg-slate-700">
            <div
              className="h-3 rounded-full bg-violet-500 transition-all duration-500"
              style={{
                width: `${workflow.progress || 0}%`,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}