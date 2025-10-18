import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import {
  Home,
  Settings,
  Mail,
  Slack,
  Database,
  Activity,
  ChevronRight,
} from "lucide-react";
import { HiViewGridAdd } from "react-icons/hi";

export default function Dashboard() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("activity");

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 mt-14 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* LEFT NAV */}
      <aside
        className={`hidden  md:flex flex-col justify-between p-4 border-r ${
          isDark ? "border-gray-700" : "border-gray-200"
        } w-fit`}
      >
        <div className="flex flex-col items-center gap-6">
          <NavButton icon={<Home className="h-5 w-5"/>} text={"Overview"}/>
          <NavButton icon={<Mail className="h-5 w-5" />}  text={"Mails"}/>
          <NavButton icon={<Slack className="h-5 w-5" />} text ={"Channels"}/>
          <NavButton icon={<Database className="h-5 w-5" />} text={"Data"}/>
          <NavButton icon={<HiViewGridAdd className="h-5 w-5" />} text={"Integrations"}/>
        </div>
        <NavButton icon={<Settings className="h-5 w-5" />} text={"Setting"} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <span className="text-sm opacity-70">Welcome back, Anupam 👋</span>
        </header>

        {/* AI Overview Banner */}
        <div
          className={`mb-6 rounded-2xl p-5 flex items-center justify-between shadow-sm ${
            isDark ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-blue-50 to-cyan-50"
          }`}
        >
          <div>
            <h2 className="text-lg font-medium">Agentic AI Summary</h2>
            <p className="text-sm opacity-75">
              All systems running smoothly. Gmail and Slack integrations active.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 opacity-60" />
        </div>

        {/* Integrations */}
        <section
          className={`rounded-2xl p-6 shadow-sm border ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-xl font-medium mb-4">Connected Integrations</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <IntegrationCard name="Gmail" status="Connected" color="blue" />
            <IntegrationCard name="Slack" status="Connected" color="green" />
            <IntegrationCard name="Notion" status="Not Linked" color="gray" />
          </div>
        </section>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col p-4 border-l ${
          isDark ? "border-gray-700" : "border-gray-200"
        } w-80 transition-all duration-300`}
      >
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">AI Panel</h3>
          <div className="flex gap-2">
            <TabButton
              label="Activity"
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
            />
            <TabButton
              label="Logs"
              active={activeTab === "logs"}
              onClick={() => setActiveTab("logs")}
            />
          </div>
        </div>

        <div className="space-y-3 text-sm overflow-y-auto">
          {activeTab === "activity" ? (
            <>
              <ActivityItem action="Email Sent" tool="Gmail" />
              <ActivityItem action="Message Sent" tool="Slack" />
              <ActivityItem action="Note Updated" tool="Notion" />
            </>
          ) : (
            <>
              <LogItem message="Gmail API response received (200 OK)" />
              <LogItem message="Slack webhook triggered successfully" />
              <LogItem message="Notion connection pending authorization" />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

/* Components */




export function ActivityItem({ action, tool }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-700/20 pb-2">
      <span>{action}</span>
      <span className="opacity-60">{tool}</span>
    </div>
  );
}

export function LogItem({ message }) {
  return (
    <div className="border border-gray-600/30 p-2 rounded-md text-xs opacity-80">
      {message}
    </div>
  );
}

export function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
        active
          ? "bg-blue-500 text-white"
          : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {label}
    </button>
  );
}
