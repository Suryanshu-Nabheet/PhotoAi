import { Queue } from "bullmq";
import Redis from "ioredis";
import {
  AIProvider,
  GenerateImageParams,
  JobStatus,
  TrainModelParams,
} from "./provider";

// Connect to Redis - use env vars in real app, defaults for now
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Create queues
const generateQueue = new Queue("generate-image", { connection: redis });
const trainQueue = new Queue("train-model", { connection: redis });

export class LocalProvider implements AIProvider {
  async generateImage(
    params: GenerateImageParams
  ): Promise<{ requestId: string }> {
    const job = await generateQueue.add("flux-lora", params, {
      removeOnComplete: 100,
      removeOnFail: 1000,
    });
    return { requestId: job.id! };
  }

  async trainModel(params: TrainModelParams): Promise<{ requestId: string }> {
    const job = await trainQueue.add("train-face", params, {
      removeOnComplete: 100,
      removeOnFail: 1000,
    });
    return { requestId: job.id! };
  }

  async getStatus(requestId: string): Promise<JobStatus> {
    // Check both queues since we don't know which one it is just by ID easily
    // In a real app, maybe encode queue type in ID or store mapping in DB

    let job = await generateQueue.getJob(requestId);
    if (!job) {
      job = await trainQueue.getJob(requestId);
    }

    if (!job) {
      return {
        requestId,
        status: "failed",
        error: "Job not found",
      };
    }

    const state = await job.getState();
    const result = await job.returnvalue;
    const progress = job.progress;

    // Map BullMQ state to our status
    let status: JobStatus["status"] = "queued";
    if (state === "active") status = "processing";
    if (state === "completed") status = "completed";
    if (state === "failed") status = "failed";

    return {
      requestId,
      status,
      progress: typeof progress === "number" ? progress : undefined,
      result,
      error: job.failedReason,
    };
  }

  async cancelJob(requestId: string): Promise<void> {
    const job =
      (await generateQueue.getJob(requestId)) ||
      (await trainQueue.getJob(requestId));
    if (job) {
      await job.remove();
    }
  }
}
