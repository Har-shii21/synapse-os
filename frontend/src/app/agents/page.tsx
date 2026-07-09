"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";

const agents = [
  {
    key: "planner",
    name: "🧠 Planner Agent",
    description: "Creates intelligent execution plans.",
    color: "text-violet-400",
  },
  {
    key: "researcher",
    name: "🔍 Researcher Agent",
    description: "Collects and analyzes information.",
    color: "text-blue-400",
  },
  {
    key: "engineer",
    name: "⚙️ Engineer Agent",
    description: "Builds implementation strategies.",
    color: "text-yellow-400",
  },
  {
    key: "security",
    name: "🛡️ Security Agent",
    description: "Checks security and compliance.",
    color: "text-red-400",
  },
  {
    key: "analyst",
    name: "📊 Analyst Agent",
    description: "Generates insights and metrics.",
    color: "text-green-400",
  },
  {
    key: "reviewer",
    name: "✅ Reviewer Agent",
    description: "Reviews workflow quality.",
    color: "text-pink-400",
  },
];

export default function AgentsPage() {

  const [workflow, setWorkflow] =
    useState<any>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadWorkflow();

    const interval =
      setInterval(loadWorkflow, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  async function loadWorkflow() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "https://synapse-os-backend.onrender.com/workflow-status"
        );

      const data =
        await response.json();

      setWorkflow(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }
  function getBadgeColor(status: string) {

    switch (status) {

      case "completed":
        return "bg-green-500/20 text-green-400 border border-green-500/30";

      case "running":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";

      case "waiting":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-500/30";

    }

  }

  function getProgress(status: string) {

    switch (status) {

      case "completed":
        return 100;

      case "running":
        return 65;

      case "waiting":
        return 15;

      default:
        return 0;

    }

  }

  return (

    <main className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">

          🤖 Agent Control Center

        </h1>

        <p className="mt-3 text-slate-400">

          Monitor every AI agent working inside Synapse OS in real time.

        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">

              Active Agents

            </p>

            <h2 className="mt-2 text-3xl font-bold text-violet-400">

              {agents.length}

            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">

              Workflow

            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-400">

              {workflow.progress || 0}%

            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">

              Current Task

            </p>

            <h2 className="mt-2 text-lg font-bold text-blue-400">

              {workflow.current_task || "Waiting..."}

            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">

              System

            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">

              Online

            </h2>

          </div>

        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {loading ? (

            <div className="col-span-full rounded-xl border border-white/10 bg-[#0B1120] p-10 text-center text-slate-400">

              Loading AI Agents...

            </div>

          ) : (

            agents.map((agent) => {

              const status =
                workflow[agent.key] || "waiting";

              return (

                <div
                  key={agent.key}
                  className="rounded-2xl border border-white/10 bg-[#0B1120] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-900/20"
                >

                  <div className="flex items-center justify-between">

                    <h2 className={`text-xl font-bold ${agent.color}`}>

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

                  <div className="mt-6">

                    <div className="mb-2 flex items-center justify-between text-sm">

                      <span className="text-slate-400">

                        Progress

                      </span>

                      <span className="text-violet-400">

                        {getProgress(status)}%

                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-700">

                      <div
                        className="h-2 rounded-full bg-violet-500 transition-all duration-700"
                        style={{
                          width: `${getProgress(status)}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm">

                    <span className="text-slate-500">

                      Last Activity

                    </span>

                    <span className="text-slate-300">

                      {status}

                    </span>

                  </div>

                </div>

              );

            })

          )}

        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0B1120] p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">

              🚀 Live Workflow

            </h2>

            <span className="rounded-full bg-green-500/20 px-4 py-1 text-green-400">

              {workflow.progress || 0}%

            </span>

          </div>

          <div className="mt-6">

            <p className="text-slate-400">

              Current Task

            </p>

            <h3 className="mt-2 text-xl font-semibold text-violet-400">

              {workflow.current_task || "Waiting for a new task..."}

            </h3>

          </div>

          <div className="mt-8">

            <div className="mb-2 flex items-center justify-between text-sm">

              <span className="text-slate-400">

                Overall Progress

              </span>

              <span className="text-green-400">

                {workflow.progress || 0}%

              </span>

            </div>

            <div className="h-4 rounded-full bg-slate-700">

              <div
                className="h-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-700"
                style={{
                  width: `${workflow.progress || 0}%`,
                }}
              />

            </div>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-slate-900 p-4">

              <p className="text-sm text-slate-400">

                Planner

              </p>

              <p className="mt-2 font-semibold text-violet-400">

                {workflow.planner || "waiting"}

              </p>

            </div>

            <div className="rounded-xl bg-slate-900 p-4">

              <p className="text-sm text-slate-400">

                Engineer

              </p>

              <p className="mt-2 font-semibold text-yellow-400">

                {workflow.engineer || "waiting"}

              </p>

            </div>

            <div className="rounded-xl bg-slate-900 p-4">

              <p className="text-sm text-slate-400">

                Reviewer

              </p>

              <p className="mt-2 font-semibold text-green-400">

                {workflow.reviewer || "waiting"}

              </p>

            </div>

          </div>

        </div>
        </section>

    </main>

  );

}