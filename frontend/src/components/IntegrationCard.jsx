export default function IntegrationCard({ name, status, color }) {
  const colorClasses = {
    blue: "border-blue-400 bg-blue-50 dark:bg-blue-900/30",
    green: "border-green-400 bg-green-50 dark:bg-green-900/30",
    gray: "border-gray-300 bg-gray-100 dark:bg-gray-800",
  };

  return (
    <div
      className={`border rounded-xl p-5 flex justify-between items-center hover:scale-[1.02] transition-transform duration-200 ${
        colorClasses[color]
      }`}
    >
      <span className="font-medium">{name}</span>
      <span className="text-sm opacity-70">{status}</span>
    </div>
  );
}