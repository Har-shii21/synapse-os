"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import VoiceButton from "../../components/VoiceButton";

import {
  runAgent,
  getProjects,
  getWorkflowStatus,
  getAnalytics,
  getReplay,
  textToSpeech,
} from "../../lib/api";

const LANGUAGES = [
  { label: "English", value: "en-IN" },
  { label: "Hindi", value: "hi-IN" },
  { label: "Telugu", value: "te-IN" },
  { label: "Tamil", value: "ta-IN" },
  { label: "Kannada", value: "kn-IN" },
  { label: "Malayalam", value: "ml-IN" },
  { label: "Marathi", value: "mr-IN" },
  { label: "Gujarati", value: "gu-IN" },
  { label: "Bengali", value: "bn-IN" },
  { label: "Punjabi", value: "pa-IN" },
];

export default function Dashboard() {

  const [task, setTask] = useState("");

  const [loading, setLoading] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [language, setLanguage] =
    useState("en-IN");

  const [autoSpeak, setAutoSpeak] =
    useState(true);

  const [workflow, setWorkflow] =
    useState<any>({});

  const [projects, setProjects] =
    useState<string[]>([]);

  const [analytics, setAnalytics] =
    useState<any>({});

  const [history, setHistory] =
    useState<any[]>([]);

  const [plan, setPlan] =
    useState("");

  const [research, setResearch] =
    useState("");

  const [code, setCode] =
    useState("");

  const [review, setReview] =
    useState("");

  const [error, setError] =
    useState("");

  const AGENTS = [
    {
      icon: "🧠",
      name: "Planner",
      status:
        workflow.progress >= 25
          ? "Completed"
          : "Waiting",
    },
    {
      icon: "🔍",
      name: "Researcher",
      status:
        workflow.progress >= 50
          ? "Completed"
          : "Waiting",
    },
    {
      icon: "⚙️",
      name: "Engineer",
      status:
        workflow.progress >= 75
          ? "Completed"
          : "Waiting",
    },
    {
      icon: "✅",
      name: "Reviewer",
      status:
        workflow.progress >= 100
          ? "Completed"
          : "Waiting",
    },
    {
      icon: "🎤",
      name: "Voice",
      status:
        speaking
          ? "Speaking"
          : "Ready",
    },
    {
      icon: "🧠",
      name: "Memory",
      status: "Active",
    },
  ];

  useEffect(() => {

    loadProjects();

    loadWorkflow();

    loadAnalytics();

    loadReplay();

    const interval = setInterval(() => {

      loadWorkflow();

      loadAnalytics();

    }, 1000);

    return () => clearInterval(interval);

  }, []);
  async function loadProjects() {

    try {

      const data = await getProjects();

      setProjects(data.projects || []);

    } catch (err) {

      console.error(err);

    }

  }

  async function loadWorkflow() {

    try {

      const data = await getWorkflowStatus();

      setWorkflow(data);

    } catch (err) {

      console.error(err);

    }

  }

  async function loadAnalytics() {

    try {

      const data = await getAnalytics();

      setAnalytics(data);

    } catch (err) {

      console.error(err);

    }

  }

  async function loadReplay() {

    try {

      const data = await getReplay();

      setHistory(data.history || []);

    } catch (err) {

      console.error(err);

    }

  }

  async function speak(text: string) {

    if (!text) return;

    try {

      setSpeaking(true);

      const result = await textToSpeech(
        text,
        language
      );

      const audio = new Audio(
        `http://127.0.0.1:8000/${result.audio}`
      );

      audio.onended = () => {

        setSpeaking(false);

      };

      await audio.play();

    } catch (err) {

      console.error(err);

      setSpeaking(false);

    }

  }

  async function handleRunAgent() {

    if (!task.trim() || loading)
      return;

    setLoading(true);

    setError("");

    setPlan("");

    setResearch("");

    setCode("");

    setReview("");

    try {

      const result = await runAgent(task);

      setPlan(result.plan || "");

      setResearch(result.research || "");

      setCode(result.code || "");

      setReview(result.review || "");

      await Promise.all([
        loadProjects(),
        loadWorkflow(),
        loadAnalytics(),
        loadReplay(),
      ]);

      if (
        autoSpeak &&
        result.review
      ) {

        await speak(result.review);

      }

    } catch (err: any) {

      console.error(err);

      setError(
        err?.message ||
        "Agent execution failed."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold">
          🚀 Synapse OS
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Multi-Agent Cognitive Operating System
        </p>

        <p className="mt-2 text-sm text-violet-400">
          Planner • Researcher • Engineer • Reviewer • Memory • Voice • Knowledge Graph
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <h2 className="text-xl font-bold">
              📊 Analytics
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-lg bg-slate-900 p-4">
                <p className="text-sm text-slate-400">
                  Projects
                </p>
                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {analytics.projects_completed ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900 p-4">
                <p className="text-sm text-slate-400">
                  AI Agents
                </p>
                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {analytics.ai_agents ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900 p-4">
                <p className="text-sm text-slate-400">
                  Memory Nodes
                </p>
                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {analytics.memory_nodes ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900 p-4">
                <p className="text-sm text-slate-400">
                  Success
                </p>
                <p className="mt-2 text-3xl font-bold text-green-400">
                  {analytics.workflow_success ?? "0%"}
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">
                🚀 Live Workflow
              </h2>

              <span className="text-green-400 text-lg font-bold">
                {workflow.progress || 0}%
              </span>

            </div>

            <p className="mt-5 text-slate-300">

              Current Task

              <span className="ml-3 text-violet-400">

                {workflow.current_task || "Waiting..."}

              </span>

            </p>

            <div className="mt-5 h-3 rounded-full bg-slate-700">

              <div
                className="h-3 rounded-full bg-violet-600 transition-all duration-500"
                style={{
                  width: `${workflow.progress || 0}%`,
                }}
              />

            </div>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

          <h2 className="text-2xl font-bold">
            🤖 AI Team Status
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {AGENTS.map((agent) => (

              <div
                key={agent.name}
                className="rounded-xl border border-white/10 bg-slate-900 p-4"
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    {agent.icon} {agent.name}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      agent.status === "Completed" ||
                      agent.status === "Ready" ||
                      agent.status === "Active"
                        ? "bg-green-600"
                        : agent.status === "Speaking"
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {agent.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {error && (

          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-900/20 p-4 text-red-300">

            {error}

          </div>

        )}
        <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-xl font-bold">
              🚀 Give your AI Team a Task
            </h2>

            <div className="flex flex-wrap items-center gap-3">

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg bg-slate-800 px-4 py-2"
              >

                {LANGUAGES.map((lang) => (

                  <option
                    key={lang.value}
                    value={lang.value}
                  >

                    {lang.label}

                  </option>

                ))}

              </select>

              <label className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm">

                <input
                  type="checkbox"
                  checked={autoSpeak}
                  onChange={(e) =>
                    setAutoSpeak(e.target.checked)
                  }
                />

                🔊 Auto Speak

              </label>

            </div>

          </div>

          <textarea
            rows={6}
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            placeholder="Describe what your AI team should build..."
            className="mt-6 w-full rounded-xl border border-white/10 bg-[#111827] p-5 outline-none transition focus:border-violet-500"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <VoiceButton
              language={language}
              disabled={loading}
              onTranscript={(text) =>
                setTask(text)
              }
            />

            <button
              onClick={handleRunAgent}
              disabled={loading}
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-700 disabled:opacity-60"
            >

              {loading
                ? "🤖 AI Team Working..."
                : "🚀 Run AI Team"}

            </button>

            <button
              disabled={speaking || !review}
              onClick={() =>
                speak(review)
              }
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold transition hover:bg-emerald-700 disabled:opacity-60"
            >

              {speaking
                ? "🔊 Speaking..."
                : "🔊 Speak Review"}

            </button>

          </div>

        </div>
        {plan && (

          <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                🧠 Planner
              </h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(plan)
                }
                className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
              >
                📋 Copy
              </button>

            </div>

            <pre className="mt-5 whitespace-pre-wrap text-slate-300">
              {plan}
            </pre>

          </div>

        )}

        {research && (

          <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                🔍 Research
              </h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(research)
                }
                className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
              >
                📋 Copy
              </button>

            </div>

            <pre className="mt-5 whitespace-pre-wrap text-slate-300">
              {research}
            </pre>

          </div>

        )}

        {code && (

          <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                ⚙️ Engineer
              </h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(code)
                }
                className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
              >
                📋 Copy
              </button>

            </div>

            <pre className="mt-5 whitespace-pre-wrap text-slate-300">
              {code}
            </pre>

          </div>

        )}

        {review && (

          <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                ✅ Reviewer
              </h2>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(review)
                  }
                  className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
                >
                  📋 Copy
                </button>

                <button
                  onClick={() =>
                    speak(review)
                  }
                  disabled={speaking}
                  className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                  {speaking
                    ? "🔊 Speaking..."
                    : "🔊 Replay"}
                </button>

              </div>

            </div>

            <pre className="mt-5 whitespace-pre-wrap text-slate-300">
              {review}
            </pre>

          </div>

        )}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <h2 className="text-xl font-bold">
              🧠 Cognitive Memory
            </h2>

            <div className="mt-5">

              {projects.length === 0 ? (

                <p className="text-slate-400">
                  No previous projects yet.
                </p>

              ) : (

                projects.map((project, index) => (

                  <div
                    key={index}
                    className="mb-3 rounded-lg border border-white/5 bg-slate-900 p-3"
                  >

                    <p className="text-slate-300">
                      • {project}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-6">

            <h2 className="text-xl font-bold">
              🔄 Workflow Replay
            </h2>

            <div className="mt-5 max-h-[450px] overflow-y-auto">

              {history.length === 0 ? (

                <p className="text-slate-400">
                  No workflow history yet.
                </p>

              ) : (

                history.map((item, index) => (

                  <div
                    key={index}
                    className="mb-5 rounded-lg border border-white/5 bg-slate-900 p-4"
                  >

                    <h3 className="font-semibold text-violet-400">
                      {item.task}
                    </h3>

                    <details className="mt-3">

                      <summary className="cursor-pointer text-slate-300">
                        🧠 Planner
                      </summary>

                      <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
                        {item.plan}
                      </pre>

                    </details>

                    <details className="mt-3">

                      <summary className="cursor-pointer text-slate-300">
                        ⚙️ Engineer
                      </summary>

                      <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
                        {item.execution}
                      </pre>

                    </details>

                    <details className="mt-3">

                      <summary className="cursor-pointer text-slate-300">
                        ✅ Reviewer
                      </summary>

                      <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
                        {item.review}
                      </pre>

                    </details>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}