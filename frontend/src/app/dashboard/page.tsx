"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<string[]>([]);
  const [workflow, setWorkflow] = useState<any>({});

  useEffect(() => {
    loadProjects();

    const interval = setInterval(() => {
      loadWorkflow();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function loadProjects() {
    const response = await fetch("http://127.0.0.1:8000/projects");
    const data = await response.json();
    setProjects(data.projects);
  }

  async function loadWorkflow() {
    try {
      const response = await fetch("http://127.0.0.1:8000/workflow-status");
      const data = await response.json();
      setWorkflow(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function runAgent() {
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/run-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    const data = await response.json();

    setResult(
      `PLAN:\n${data.plan}\n\nEXECUTION:\n${data.execution.join("\n")}`
    );

    setReview(data.review);

    loadProjects();

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">
          Welcome to Synapse OS
        </h1>

        <p className="mt-3 text-slate-400">
          Your AI team is ready.
        </p>

        {/* Live Workflow */}

        <div className="mt-8 rounded-xl bg-[#0B1120] p-6 border border-white/10">
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

        {/* Task */}

        <div className="mt-10">
          <textarea
            className="w-full rounded-xl bg-[#0B1120] border border-white/10 p-4"
            placeholder="Give your AI team a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            onClick={runAgent}
            className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-semibold"
          >
            {loading ? "Thinking..." : "Run Agent"}
          </button>
        </div>

        {/* Result */}

        {result && (
          <div className="mt-10 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-xl font-bold">
              Agent Plan
            </h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {result}
            </pre>

            {review && (
              <div className="mt-6 rounded-xl border border-white/10 p-5">
                <h2 className="text-xl font-bold mb-4">
                  Synapse Workflow
                </h2>

                <pre className="whitespace-pre-wrap text-slate-300">
                  {review}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Memory */}

        <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
          <h2 className="text-xl font-bold">
            🧠 Cognitive Memory
          </h2>

          <div className="mt-4">
            {projects.length === 0 ? (
              <p className="text-slate-400">
                No previous projects
              </p>
            ) : (
              projects.map((project, index) => (
                <p
                  key={index}
                  className="py-1 text-slate-300"
                >
                  • {project}
                </p>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}