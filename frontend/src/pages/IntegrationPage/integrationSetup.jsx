import { useState } from "react";
import { FaSlack, FaGoogle, FaGithub, FaLock } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";

import { useTheme } from "../../contexts/ThemeContext";

export default function IntegrationSetup() {
  const { theme } = useTheme();

  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "Auth0",
      icon: <SiAuth0 className="text-orange-400" />,
      desc: "Securely manage user authentication and access.",
      connected: true,
    },
    {
      id: 2,
      name: "Notion",
      icon: <RiNotionFill className="text-gray-200" />,
      desc: "Sync and store your workspace data.",
      connected: false,
    },
    {
      id: 3,
      name: "Slack",
      icon: <FaSlack className="text-pink-400" />,
      desc: "Send AI-triggered alerts to your channels.",
      connected: false,
    },
    {
      id: 4,
      name: "Gmail",
      icon: <FaGoogle className="text-red-400" />,
      desc: "Let AI draft, summarize, and organize emails.",
      connected: true,
    },
    {
      id: 5,
      name: "GitHub",
      icon: <FaGithub className="text-gray-300" />,
      desc: "Automate issues and commits through AI agents.",
      connected: false,
    },
  ]);

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, connected: !tool.connected } : tool
      )
    );
  };

  return (
    <div
      className={`min-h-screen   `}
    >
      <div className="max-w-6xl ">
        {/* Header */}
        <div className="mb-12 ">
          <h1
            className={`text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`}
          >
            Integration Setup
          </h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Connect your favorite tools and let AI automate everything.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((tool) => (
            <div
              key={tool.id}
              className={`p-6 rounded-2xl border hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between shadow-sm ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{tool.icon}</div>
                  <h2 className="text-xl font-semibold">{tool.name}</h2>
                </div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                {tool.connected ? (
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <FaLock className="w-4 h-4 text-green-400" /> Connected
                  </span>
                ) : (
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Not Connected
                  </span>
                )}

                <button
                  onClick={() => toggleConnection(tool.id)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2 ${
                    tool.connected
                      ? "bg-red-500/80 hover:bg-red-600 text-white"
                      : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-white"
                  }`}
                >
                  {tool.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full text-lg font-semibold hover:opacity-90 transition">
            Save Configuration
          </button>
          <p
            className={`mt-3 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your integrations will sync automatically after saving.
          </p>
        </div>
      </div>
    </div>
  );
}
