"use client";

import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";

const AGENTS = [
  "Planner",
  "Researcher",
  "Engineer",
  "Security",
  "Analyst",
  "Reviewer",
];

export default function ChatPage() {

  const [agent, setAgent] =
    useState("Planner");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] =
    useState<any[]>([]);
    
    async function sendMessage() {
  if (!message.trim() || loading) return;

  const userMessage = {
    sender: "You",
    text: message,
  };

  setChat((prev) => [...prev, userMessage]);

  setLoading(true);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/run-agent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: message,
          agent: agent,
        }),
      }
    );

    const result = await response.json();

    let reply = "No response";

    switch (agent) {
      case "Planner":
        reply = result.plan;
        break;

      case "Researcher":
        reply = result.research;
        break;

      case "Engineer":
        reply = result.code;
        break;

      case "Security":
        reply = result.security;
        break;

      case "Analyst":
        reply = result.analysis;
        break;

      case "Reviewer":
        reply = result.review;
        break;
    }

    setChat((prev) => [
      ...prev,
      {
        sender: agent,
        text: reply || "No response",
      },
    ]);
  } catch (error) {
    console.error(error);

    setChat((prev) => [
      ...prev,
      {
        sender: "System",
        text: "Failed to contact backend.",
      },
    ]);
  } finally {
    setLoading(false);
    setMessage("");
  }
}

  return (

    <main className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">

          🤖 Multi-Agent Chat

        </h1>

        <p className="mt-3 text-slate-400">

          Chat directly with every AI agent inside Synapse OS.

        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0B1120] p-6">

          <div className="flex flex-wrap items-center gap-4">

            <select
              value={agent}
              onChange={(e) =>
                setAgent(e.target.value)
              }
              className="rounded-lg bg-slate-800 px-4 py-2"
            >

              {AGENTS.map((item) => (

                <option
                  key={item}
                  value={item}
                >

                  {item}

                </option>

              ))}

            </select>

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder={`Ask ${agent} something...`}
              className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700 disabled:opacity-60"
            >

              {loading
                ? "Thinking..."
                : "Send"}

            </button>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0B1120] p-6">

          <h2 className="text-2xl font-bold">

            💬 Conversation

          </h2>

          <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto">
            {chat.length === 0 ? (

              <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-slate-500">

                Start a conversation with one of your AI agents.

              </div>

            ) : (

              chat.map((msg, index) => {

                const isUser =
                  msg.sender === "You";

                return (

                  <div
                    key={index}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                        isUser
                          ? "bg-violet-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >

                      <p className="mb-2 text-sm font-bold">

                        {msg.sender}

                      </p>

                      <p className="whitespace-pre-wrap">

                        {msg.text}

                      </p>

                    </div>

                  </div>

                );

              })

            )}
            </div>

          <div className="mt-6 flex items-center justify-between">

            <p className="text-sm text-slate-400">

              {chat.length} message
              {chat.length !== 1 ? "s" : ""}

            </p>

            <button
              onClick={() => setChat([])}
              disabled={chat.length === 0}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700 disabled:opacity-50"
            >

              🗑️ Clear Chat

            </button>

          </div>

        </div>
        </section>

    </main>

  );

}