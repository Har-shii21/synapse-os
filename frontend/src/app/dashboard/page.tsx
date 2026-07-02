"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
  async function loadProjects() {
    const response = await fetch("http://127.0.0.1:8000/projects");
    const data = await response.json();
    setProjects(data.projects);
  }

  loadProjects();
}, []);

  async function runAgent() {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/run-agent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
        }),
      }
    );

    const data = await response.json();

    setResult(
  `PLAN:\n${data.plan}\n\nEXECUTION:\n${data.execution.join("\n")}`
);
    setReview(data.review);
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


        <div className="mt-10">

          <textarea
            className="w-full rounded-xl bg-[#0B1120] border border-white/10 p-4"
            placeholder="Give your AI team a task..."
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />


          <button
            onClick={() => { console.log("Button clicked");
              runAgent();
            }}
            className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-semibold"
          >
            {loading ? "Thinking..." : "Run Agent"}
          </button>

        </div>


        {result && (
          <div className="mt-10 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-xl font-bold">
              Agent Plan
            </h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {result}
            </pre>
            {review && (
  <div className="mt-6 rounded-xl border p-5">
    <h2 className="text-xl font-bold mb-4">
      Synapse Workflow
    </h2>

    <p>🧠 Planner Agent ✅ Completed</p>
    <p>⚙️ Executor Agent ✅ Completed</p>
    <p>🔍 Reviewer Agent ✅ Completed</p>

    <pre className="mt-4 whitespace-pre-wrap text-slate-300">
      {review}
    </pre>
  </div>
)}

          </div>
        )}
      <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
  <h2 className="text-xl font-bold">🧠 Memory</h2>

  <div className="mt-4">
    {projects.length === 0 ? (
      <p className="text-slate-400">No previous projects</p>
    ) : (
      projects.map((project, index) => (
        <p key={index} className="py-1 text-slate-300">
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