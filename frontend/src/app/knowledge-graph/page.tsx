"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

export default function KnowledgeGraphPage() {

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {

    async function loadGraph() {

      const response = await fetch(
        "http://127.0.0.1:8000/knowledge-graph"
      );

      const graph = await response.json();

      const nodePositions = {
        core: { x: 350, y: 50 },
        planner: { x: 80, y: 180 },
        researcher: { x: 250, y: 180 },
        engineer: { x: 450, y: 180 },
        security: { x: 650, y: 180 },
        analyst: { x: 180, y: 350 },
        reviewer: { x: 520, y: 350 },
        memory: { x: 350, y: 520 },
      };

      const flowNodes = graph.nodes.map((node: any) => ({
        id: node.id,

        position:
          nodePositions[node.id as keyof typeof nodePositions] ||
          { x: 0, y: 0 },

        data: {
          label: node.label,
        },

        style: {
          background: "#6D28D9",
          color: "white",
          border: "1px solid #8B5CF6",
          borderRadius: 12,
          padding: 10,
        },
      }));

      const flowEdges = graph.edges.map(
        (edge: any, index: number) => ({
          id: `edge-${index}`,

          source: edge[0],

          target: edge[1],

          animated: true,
        })
      );

      setNodes(flowNodes);

      setEdges(flowEdges);
    }

    loadGraph();

  }, []);

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          🔗 Knowledge Graph
        </h1>

        <p className="mt-3 text-slate-400">
          Live Cognitive Network of Synapse OS
        </p>

        <div
          className="mt-10 rounded-2xl overflow-hidden border border-white/10"
          style={{
            height: "700px",
          }}
        >

          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
          >

            <Background />

            <MiniMap />

            <Controls />

          </ReactFlow>

        </div>

      </section>

    </main>
  );
}