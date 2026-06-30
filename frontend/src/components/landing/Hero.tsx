export default function Hero() {
  return (
    <section className="flex min-h-[90vh] items-center justify-center px-6">
      <div className="max-w-5xl text-center">
        <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          AI Infrastructure • Multi-Agent Intelligence
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
          The Cognitive Coordination Platform
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            for AI Teams
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-400">
          AI agents shouldn't work alone. Synapse enables intelligent agents to
          collaborate, remember, explain decisions, and continuously improve.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white hover:bg-violet-500">
            Launch Platform
          </button>

          <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white hover:border-violet-400">
            View Architecture
          </button>
        </div>
      </div>
    </section>
  );
}