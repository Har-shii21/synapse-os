"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import VoiceButton from "../../components/VoiceButton";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const [plan, setPlan] = useState("");
  const [research, setResearch] = useState("");
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  const [projects, setProjects] = useState<string[]>([]);
  const [workflow, setWorkflow] = useState<any>({});

  useEffect(() => {
    loadProjects();
    loadWorkflow();

    const interval = setInterval(loadWorkflow, 1000);

    return () => clearInterval(interval);
  }, []);

  async function loadProjects() {
    try {
      const res = await fetch("http://127.0.0.1:8000/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadWorkflow() {
    try {
      const res = await fetch("http://127.0.0.1:8000/workflow-status");
      const data = await res.json();
      setWorkflow(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function runAgent(taskText?: string) {
    const finalTask = taskText || task;

    if (!finalTask) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/run-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: finalTask,
        }),
      });

      const data = await response.json();

      setPlan(data.plan || "");
      setResearch(data.research || "");
      setCode(data.code || "");
      setReview(data.review || "");

      loadProjects();
      loadWorkflow();
    } catch (err) {
      console.log(err);
    }

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

          <div className="mt-4 h-3 rounded-full bg-slate-700">
            <div
              className="h-3 rounded-full bg-violet-600 transition-all duration-500"
              style={{
                width: `${workflow.progress || 0}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-10">
          <textarea
            className="w-full rounded-xl bg-[#0B1120] border border-white/10 p-4"
            rows={5}
            placeholder="Give your AI team a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <VoiceButton
              onTranscript={(text) => {
                setTask(text);
                runAgent(text);
              }}
            />

            <button
              onClick={() => runAgent()}
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700"
            >
              {loading ? "Thinking..." : "Run Agent"}
            </button>
          </div>
        </div>

        {plan && (
          <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-2xl font-bold">🧠 Planner</h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {plan}
            </pre>
          </div>
        )}

        {research && (
          <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-2xl font-bold">🔍 Research</h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {research}
            </pre>
          </div>
        )}

        {code && (
          <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-2xl font-bold">⚙️ Engineer</h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {code}
            </pre>
          </div>
        )}

        {review && (
          <div className="mt-8 rounded-xl bg-[#0B1120] p-6">
            <h2 className="text-2xl font-bold">✅ Reviewer</h2>

            <pre className="mt-4 whitespace-pre-wrap text-slate-300">
              {review}
            </pre>
          </div>
        )}

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
                  className="text-slate-300 py-1"
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