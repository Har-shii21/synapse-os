"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch("http://127.0.0.1:8000/analytics");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadAnalytics();

    const interval = setInterval(loadAnalytics, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <main className="flex min-h-screen bg-[#050816] text-white">
        <Sidebar />
        <section className="flex-1 p-10">
          <h1 className="text-4xl font-bold">📊 Analytics</h1>
          <p className="mt-6 text-slate-400">Loading analytics...</p>
        </section>
      </main>
    );
  }

  const cards = [
    {
      title: "Projects Completed",
      value: stats.projects_completed,
    },
    {
      title: "AI Agents",
      value: stats.ai_agents,
    },
    {
      title: "Memory Nodes",
      value: stats.memory_nodes,
    },
    {
      title: "Knowledge Links",
      value: stats.knowledge_links,
    },
    {
      title: "Workflow Success",
      value: stats.workflow_success,
    },
    {
      title: "Reviews Approved",
      value: stats.reviews_approved,
    },
  ];

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">
          📊 Analytics Dashboard
        </h1>

        <p className="mt-3 text-slate-400">
          Live metrics from Synapse OS
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#0B1120] p-6 hover:border-violet-500 transition"
            >
              <p className="text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-4 text-4xl font-bold text-violet-400">
                {card.value}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}