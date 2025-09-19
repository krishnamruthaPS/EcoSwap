
import { Sidebar } from "./components/sidebar";
import { HeroSection } from "./components/hero-section";
import { LiveActivityFeed } from "./components/real-time/live-activity-feed.jsx";
import { IntegrationStatus } from "./components/real-time/integration-status.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:ml-64 transition-all duration-300">
        <HeroSection />
        {/* Real-time Features Section */}
        <section className="px-8 py-16 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LiveActivityFeed />
            <IntegrationStatus />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
