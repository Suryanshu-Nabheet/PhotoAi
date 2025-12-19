import { AIProvider } from "./provider";
import { LocalProvider } from "./local-provider";

// Singleton instance
let providerInstance: AIProvider | null = null;

export function getProvider(): AIProvider {
  if (!providerInstance) {
    // In the future, this could switch based on env var
    // if (process.env.AI_PROVIDER === "fal") ...

    providerInstance = new LocalProvider();
  }
  return providerInstance;
}
