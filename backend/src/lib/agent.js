
import { END, InMemoryStore, MemorySaver, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { GoogleGenAI } from "@google/genai";
import { readLatestEmail } from "./tools/Google/readLatestEmail.js";

const model =  new GoogleGenAI({ model: "gemini-2.5-flash",}).bindTools([
  readLatestEmail,
]);

const callLLM = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const routeAfterLLM = function (state) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (!lastMessage.tool_calls?.length) {
    return END;
  }
  return "tools";
};

const stateGraph = new StateGraph(MessagesAnnotation)
  .addNode("callLLM", callLLM)
  .addNode(
    "tools",
    new ToolNode(
      [
        // A tool with Token Vault access
        readLatestEmail,
        // ... other tools
      ],
      {
        // Error handler should be disabled in order to
        // trigger interruptions from within tools.
        handleToolErrors: false,
      }
    )
  )
  .addEdge(START, "callLLM")
  .addConditionalEdges("callLLM", routeAfterLLM, [END, "tools"])
  .addEdge("tools", "callLLM");

const checkpointer = new MemorySaver();
const store = new InMemoryStore();

export const graph = stateGraph.compile({
  checkpointer,
  store,
  interruptBefore: [],
  interruptAfter: [],
});