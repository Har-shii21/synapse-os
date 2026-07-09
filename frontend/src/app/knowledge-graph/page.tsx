"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

export default function KnowledgeGraphPage() {

  const [nodes, setNodes] =
    useState<any[]>([]);

  const [edges, setEdges] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      nodes: 0,
      edges: 0,
      projects: 0,
      agents: 0,
    });

  useEffect(() => {

  loadGraph();

}, []);

  async function loadGraph() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "https://synapse-os-backend.onrender.com/knowledge-graph"
        );

      const graph =
        await response.json();
        const positions: any = {
        Core: { x: 500, y: 50 },
        Memory: { x: 500, y: 650 },
      };

      const agentOrder = [
        "Planner",
        "Researcher",
        "Engineer",
        "Security",
        "Analyst",
        "Reviewer",
      ];

      const flowNodes = graph.nodes.map((node: any) => {

        let position = positions[node.type];

        if (node.type === "Agent") {

          const index =
            agentOrder.indexOf(node.label);

          position = {
            x: 120 + index * 180,
            y: 220,
          };

        }

        const projects = graph.nodes.filter(
  (n: any) => n.type === "Project"
);

if (node.type === "Project") {

  const index = projects.findIndex(
    (p: any) => p.id === node.id
  );

  position = {
    x: 120 + (index % 4) * 220,
    y: 430 + Math.floor(index / 4) * 150,
  };

}

        let background = "#6D28D9";

        if (node.type === "Project")
          background = "#2563EB";

        if (node.type === "Memory")
          background = "#059669";

        if (node.type === "Core")
          background = "#9333EA";

        if (node.type === "Agent")
          background = "#7C3AED";

        return {

          id: node.id,

          data: {
            label: node.label,
          },

          position,

          style: {
            background,
            color: "white",
            borderRadius: 14,
            border: "2px solid rgba(255,255,255,0.25)",
            padding: 12,
            fontWeight: "bold",
            minWidth: 130,
            textAlign: "center",
            boxShadow: "0 0 18px rgba(109,40,217,.45)",
          },

        };

      });

      const flowEdges = graph.edges.map(
        (edge: any, index: number) => ({

          id: `edge-${index}`,

          source: edge.source,

          target: edge.target,

          label: edge.label,

          animated: true,

          markerEnd: {
            type: MarkerType.ArrowClosed,
          },

        })
      );
      setNodes(flowNodes);

      setEdges(flowEdges);

      setStats({

        nodes: graph.nodes.length,

        edges: graph.edges.length,

        projects: graph.nodes.filter(
          (node: any) => node.type === "Project"
        ).length,

        agents: graph.nodes.filter(
          (node: any) => node.type === "Agent"
        ).length,

      });

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          🔗 Live Knowledge Graph
        </h1>

        <div className="mt-5">

  <button
    onClick={loadGraph}
    className="rounded-lg bg-violet-600 px-5 py-2 hover:bg-violet-700"
  >
    🔄 Refresh Graph
  </button>

</div>

        <p className="mt-3 text-slate-400">
          Real-time cognitive network generated from Neo4j.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">
              Total Nodes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-violet-400">
              {stats.nodes}
            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">
              Connections
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-400">
              {stats.edges}
            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">
              AI Agents
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-400">
              {stats.agents}
            </h2>

          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B1120] p-5">

            <p className="text-slate-400">
              Projects
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {stats.projects}
            </h2>

          </div>

        </div>
        <div
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]"
          style={{
            height: "760px",
          }}
        >

          {loading ? (

            <div className="flex h-full items-center justify-center text-slate-400 text-xl">

              Loading Knowledge Graph...

            </div>

          ) : (

            <ReactFlow
  nodes={nodes}
  edges={edges}
  fitView
  fitViewOptions={{
    padding: 0.4,
  }}
  defaultViewport={{
    x: 0,
    y: 0,
    zoom: 0.75,
  }}
>

              <MiniMap
                zoomable
                pannable
              />

              <Controls />

              <Background gap={20} />

            </ReactFlow>

          )}

        </div>
        </section>

    </main>

  );

}