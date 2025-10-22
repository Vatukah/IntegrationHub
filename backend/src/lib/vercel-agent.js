// testAI.cjs
require('dotenv/config')
const { createTextStreamResponse, streamText } = require("ai");
const { GoogleGenAI } = require( "@google/genai"); 
const { TextDecoder } = require("util");
const path = require("path");
const {openai} = require("@ai-sdk/openai")


// Create AI instance (replace with your API key if required)
const ai = new GoogleGenAI({model:"gemini-2.5-flash"})
 console.log(process.env.AI_GATEWAY_API_KEY)

async function testAIResponse(messages) {
  try {
    const result = streamText({
       model: 'openai/gpt-5',
      messages,
      system: "You are a helpful AI assistant testing text streaming.",
    });

    // Log streamed text to console
    for await (const delta of result.textStream) {
      process.stdout.write(delta);
    }

    console.log("\n✅ Done streaming!");
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports ={
  testAIResponse
}