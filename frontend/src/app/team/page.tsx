"use client";

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TeamSidebar from "../../components/agents/TeamSidebar";
import ChatMessage from "../../components/agents/ChatMessage";
import ChatInput from "../../components/agents/ChatInput";

const agents = [
  {
    id: 1,
    name: "Nova",
    role: "Product Strategist",
    avatar: "🧠",
    status: "Online",
  },
  {
    id: 2,
    name: "Atlas",
    role: "Software Engineer",
    avatar: "💻",
    status: "Online",
  },
  {
    id: 3,
    name: "Pixel",
    role: "UI/UX Designer",
    avatar: "🎨",
    status: "Thinking",
  },
  {
    id: 4,
    name: "Pulse",
    role: "Data Analyst",
    avatar: "📊",
    status: "Online",
  },
];

export default function TeamRoom() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "Nova",
      text: "Welcome back! What are we building today?",
    },
  ]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  setMessages((prev) => [
    ...prev,
    { sender: "You", text: userMessage },
  ]);

  setMessage("");

  // ⭐ STEP 2 YOU ADD THIS
  setMessages((prev) => [
    ...prev,
    { sender: "System", text: "🧠 Agents are thinking..." },
  ]);

  const res = await fetch("http://localhost:8000/run-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: userMessage }),
  });

  const data = await res.json();

  const structuredResponse = [
    {
      sender: "🧠 Planner (Nova)",
      text: data.execution,
      delay: 800,
    },
    {
      sender: "⚙️ Executor (Atlas)",
      text: data.execution,
    },
    {
      sender: "📊 Reviewer (Pulse)",
      text: data.review,
      delay: 1600,
    },
  ];

  structuredResponse.forEach((msg) => {
    setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
    }, msg.delay);
    });
};

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TeamSidebar agents={agents} />

      <div className="flex flex-col flex-1">
        <div className="border-b border-zinc-800 p-5">
          <h1 className="text-2xl font-bold">
            Synapse AI Team Room
          </h1>

          <p className="text-zinc-400 mt-1">
            Collaborate with your AI teammates in real time.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
            />
          ))}
        </div>

        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}