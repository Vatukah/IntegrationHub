import Perplexity from '@perplexity-ai/perplexity_ai';

const apiKey = process.env.PERPLEXITY_KEY;

export const client = new Perplexity({apiKey});

