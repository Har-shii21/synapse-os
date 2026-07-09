"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function ReplayPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadReplay() {
      try {
        const res = await fetch("https://synapse-os-backend.onrender.com/replay");
        const data = await res.json();
        setHistory(data.history || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadReplay();

    const interval = setInterval(loadReplay, 2000);
    return () => clearInterval(interval);
  }, []);

  async function replayWorkflow(item: any) {
    await fetch("https://synapse-os-backend.onrender.com/run-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: item.task,
      }),
    });
  }

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">🔄 Workflow Replay</h1>

        <p className="mt-3 text-slate-400">
          Re-run past AI executions exactly as they happened
        </p>

        <div className="mt-10 space-y-6">
          {history.length === 0 ? (
            <p className="text-slate-400">No workflows yet</p>
          ) : (
            history.map((item: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#0B1120] p-6"
              >
                <h2 className="text-xl font-bold">{item.task}</h2>

                <div className="mt-4">
                  <p className="font-semibold text-white">🧠 Plan</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
                    {item.plan}
                  </pre>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-white">⚙️ Engineer Output</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
                    {item.code}
                  </pre>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-white">✅ Review</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
                    {item.review}
                  </pre>
                </div>

                <button
                  onClick={() => replayWorkflow(item)}
                  className="mt-6 rounded-xl bg-violet-600 px-5 py-2 hover:bg-violet-500"
                >
                  ▶ Replay Workflow
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}