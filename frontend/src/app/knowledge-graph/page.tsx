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
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    async function loadGraph() {
      const response = await fetch(
        "http://127.0.0.1:8000/knowledge-graph"
      );

      const graph = await response.json();

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

        let position =
          positions[node.type];

        if (
          node.type === "Agent"
        ) {
          const index = agentOrder.indexOf(
            node.label
          );

          position = {
            x: 120 + index * 180,
            y: 220,
          };
        }

        if (
          node.type === "Project"
        ) {
          position = {
            x: 500,
            y: 450,
          };
        }

        let background = "#6D28D9";

        if (node.type === "Project")
          background = "#2563EB";

        if (node.type === "Memory")
          background = "#059669";

        if (node.type === "Core")
          background = "#9333EA";

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
            border: "2px solid white",
            padding: 12,
            fontWeight: "bold",
            minWidth: 120,
            textAlign: "center",
          },
        };
      });

      const flowEdges =
        graph.edges.map(
          (
            edge: any,
            index: number
          ) => ({
            id: `edge-${index}`,

            source: edge.source,

            target: edge.target,

            animated: true,

            label: edge.label,

            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
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
          🔗 Live Knowledge Graph
        </h1>

        <p className="mt-3 text-slate-400">
          Real-time cognitive network generated from Neo4j.
        </p>

        <div
          className="mt-8 rounded-2xl overflow-hidden border border-white/10"
          style={{
            height: "750px",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
          >

            <Controls />

            <Background />
          </ReactFlow>
        </div>
      </section>
    </main>
  );
}