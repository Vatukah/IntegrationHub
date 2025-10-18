import IntegrationCard from "./IntegrationCard";
import { useTheme } from "../contexts/ThemeContext";
import { ChevronRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Overview(){
    const {theme}= useTheme();
    const {user}= useAuth0();
    const isDark = theme === "dark";
    return(
        <>
         {/* Header */}
                <header className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                  <span className="text-sm opacity-70">Welcome back, {user.name} 👋</span>
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
        </>
    )
}