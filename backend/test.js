require('dotenv/config');


const { testAIResponse } = require( './src/lib/vercel-agent.js');
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({});

if (require.main === module) {
  (async () => {
    await testAIResponse([
      { role: "user", content: "Write a short haiku about coding in JavaScript." },
    ]);
  })();
}
