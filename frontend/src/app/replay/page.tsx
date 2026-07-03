"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function ReplayPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadReplay() {
      try {
        const res = await fetch("http://127.0.0.1:8000/replay");
        const data = await res.json();
        setHistory(data.history);
      } catch (err) {
        console.error(err);
      }
    }

    loadReplay();

    const interval = setInterval(loadReplay, 2000);
    return () => clearInterval(interval);
  }, []);

  async function replayWorkflow(item: any) {
    await fetch("http://127.0.0.1:8000/run-agent", {
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
                {/* TASK */}
                <h2 className="text-xl font-bold">
                  {item.task}
                </h2>

                {/* PLAN */}
                <div className="mt-4 text-slate-400">
                  <p className="font-semibold text-white">Plan</p>
                  <pre className="whitespace-pre-wrap text-sm">
                    {item.plan}
                  </pre>
                </div>

                {/* EXECUTION */}
                <div className="mt-4 text-slate-400">
                  <p className="font-semibold text-white">Execution</p>
                  <pre className="whitespace-pre-wrap text-sm">
                    {item.execution?.join("\n")}
                  </pre>
                </div>

                {/* REVIEW */}
                <div className="mt-4 text-slate-400">
                  <p className="font-semibold text-white">Review</p>
                  <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify(item.review, null, 2)}
                  </pre>
                </div>

                {/* REPLAY BUTTON */}
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