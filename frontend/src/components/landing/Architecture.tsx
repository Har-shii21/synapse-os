const agents = [
  {
    name: "Planner Agent",
    desc: "Breaks complex goals into intelligent workflows",
  },
  {
    name: "Research Agent",
    desc: "Collects knowledge and analyzes information",
  },
  {
    name: "Engineer Agent",
    desc: "Creates solutions and implementation plans",
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            How Synapse Thinks
          </h2>

          <p className="mt-4 text-slate-400">
            A coordinated intelligence layer where AI agents collaborate,
            remember, and improve.
          </p>
        </div>


        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

          <div className="mx-auto w-fit rounded-xl bg-violet-600 px-8 py-4 text-white">
            🧠 Synapse Core
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {agents.map((agent) => (
              <div
                key={agent.name}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {agent.name}
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  {agent.desc}
                </p>
              </div>
            ))}

          </div>


          <div className="mt-12 flex flex-col items-center gap-6">

            <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-8 py-4 text-blue-300">
              🧬 Cognitive Memory
            </div>


            <div className="text-2xl text-slate-500">
              ↓
            </div>


            <div className="rounded-xl border border-green-400/30 bg-green-500/10 px-8 py-4 text-green-300">
              🔗 Knowledge Graph
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}