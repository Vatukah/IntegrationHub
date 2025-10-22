    // api/my-edge-function.ts
    export const runtime = 'edge';

    export default function handler(request) {
      return new Response(`Hello from the Edge! Your request method was: ${request.method}`, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }