import { ArrowRight, Play, Zap, Workflow, Plug, Bot } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { BASE_URL } from "../config/endpoints";
import { useEffect ,useState} from "react";
export default function LandingPage() {
   const [message, setMessage] = useState('');
  const { theme } = useTheme();
     useEffect(() => {
        fetch('/api/my-edge-function')
          .then(res => res.text())
          .then(data => setMessage(data))
          .catch(error => console.error('Error fetching Edge Function:', error));
      }, []);
  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "text-white bg-gradient-to-br from-gray-900 via-gray-950 to-black"
          : "text-gray-900 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="w-full p-1 bg-red-400">{message}</div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <h1
          className={`text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${
            theme === "dark"
              ? "from-blue-500 to-purple-600"
              : "from-blue-600 to-purple-500"
          } animate-fade-in`}
        >
          Connect. Automate. Relax.
        </h1>
        <p
          className={`mt-6 text-lg max-w-2xl animate-fade-in delay-200 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Integration Hub empowers your AI agents to connect with all your
          favorite apps — from Notion to Slack — effortlessly.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition-all flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <button
            className={`px-6 py-3 rounded-full border font-semibold flex items-center gap-2 transition-all ${
              theme === "dark"
                ? "border-white/30 text-gray-300 hover:bg-white/10"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Play className="w-5 h-5" /> Watch Demo
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-24 text-center">
        <h2
          className={`text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r ${
            theme === "dark"
              ? "from-blue-500 to-purple-600"
              : "from-blue-600 to-purple-500"
          }`}
        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Plug className="w-10 h-10 text-blue-400 mb-4 mx-auto" />,
              title: "Connect your apps",
              desc: "Link your tools like Notion, Slack, and Gmail in one click.",
            },
            {
              icon: (
                <Workflow className="w-10 h-10 text-purple-400 mb-4 mx-auto" />
              ),
              title: "Set agent goals",
              desc: "Tell your AI what to do — no coding required.",
            },
            {
              icon: <Bot className="w-10 h-10 text-blue-400 mb-4 mx-auto" />,
              title: "Automate workflows",
              desc: "Watch your AI agent handle cross-app tasks automatically.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-200 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:border-blue-500/40"
                  : "bg-white border-gray-200 hover:border-blue-400/40 hover:shadow-md"
              }`}
            >
              {card.icon}
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`text-center py-24 border-t transition-colors duration-200 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-white/10"
            : "bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6">Start Automating Today</h2>
        <p
          className={`mb-10 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Save time, reduce manual work, and connect everything that matters.
        </p>
        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition-all flex items-center mx-auto gap-2">
          Get Started Free <Zap className="w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer
        className={`py-10 border-t text-center text-sm transition-colors duration-200 ${
          theme === "dark"
            ? "border-white/10 text-gray-500"
            : "border-gray-200 text-gray-500"
        }`}
      >
        © {new Date().getFullYear()} Integration Hub. All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
