import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    // Fail fast at first use rather than letting the SDK make a request with an
    // undefined key, which would produce a confusing authentication error later.
    if (!apiKey || apiKey.trim() === "") {
      throw new Error(
        "ANTHROPIC_API_KEY environment variable is not set. " +
        "Add it to .env.local for development or to your deployment environment."
      );
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
