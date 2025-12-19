import { fal } from "@fal-ai/client";

export class FalAIModel {
  constructor() {}

  public async generateImage(prompt: string, tensorPath: string) {
    const { request_id, response_url } = await fal.queue.submit(
      "fal-ai/flux-lora",
      {
        input: {
          prompt: prompt,
          loras: [{ path: tensorPath, scale: 1 }],
        },
      }
    );

    return { request_id, response_url };
  }

  public async getStatus(requestId: string) {
    const status = await fal.queue.status("fal-ai/flux-lora", {
      requestId,
      logs: true,
    });
    return status;
  }

  public async getResult(requestId: string) {
    const result = await fal.queue.result("fal-ai/flux-lora", {
      requestId,
    });
    return result;
  }
}
