import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatsCards from "../../components/dashboard/StatsCards";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />

      <section className="flex flex-1 flex-col">
        <Topbar />

        <div className="p-8">
          <h2 className="text-4xl font-bold">
            Welcome to Synapse OS
          </h2>

          <p className="mt-3 text-slate-400">
            Your AI team is online and ready to collaborate.
          </p>

          <div className="mt-8">
            <StatsCards />
          </div>
        </div>
      </section>
    </main>
  );
}