import { AIProvider } from "./provider";
import { FalProvider } from "./fal-provider";

// Singleton instance
let providerInstance: AIProvider | null = null;

export function getProvider(): AIProvider {
  if (!providerInstance) {
    providerInstance = new FalProvider();
  }
  return providerInstance;
}
