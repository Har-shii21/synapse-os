"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function MemoryPage() {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch("http://127.0.0.1:8000/projects");
      const data = await response.json();
      setProjects(data.projects);
    }

    loadProjects();
  }, []);

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold">🧠 Cognitive Memory</h1>

        <p className="mt-3 text-slate-400">
          Every project completed by Synapse OS is stored here.
        </p>

        <div className="mt-10 rounded-2xl bg-[#0B1120] border border-white/10 p-6">

          {projects.length === 0 ? (
            <p className="text-slate-400">
              No projects stored yet.
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4"
                >
                  <h2 className="font-semibold text-lg">
                    🟣 {project}
                  </h2>

                  <p className="text-sm text-slate-400 mt-2">
                    Stored in Cognitive Memory
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}