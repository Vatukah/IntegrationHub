import { graph } from "./agent.js";

export async function runAgent(input) {
  const response = await graph.invoke(
    {
      messages: [{ role: "user", content: input }],
    },
    { configurable: { thread_id: "user-session-1" } }
  );

  return response.messages[response.messages.length - 1];
}