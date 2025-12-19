import axios from "axios";
import {
  AIProvider,
  GenerateImageParams,
  JobStatus,
  TrainModelParams,
} from "./provider";

const FAL_KEY = process.env.FAL_KEY;
const FAL_QUEUE_URL = "https://queue.fal.run/";

// We need to know which endpoint to check for status, so we'll prefix IDs
const TRAIN_MODEL = "fal-ai/flux-lora-fast-training";
const GEN_MODEL = "fal-ai/flux-lora";

export class FalProvider implements AIProvider {
  private getHeaders() {
    if (!FAL_KEY) {
      throw new Error("FAL_KEY is not set in environment variables");
    }
    return {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    };
  }

  async trainModel(params: TrainModelParams): Promise<{ requestId: string }> {
    try {
      const response = await axios.post(
        `${FAL_QUEUE_URL}${TRAIN_MODEL}`,
        {
          images_data_url: params.zipUrl,
          trigger_word: params.type,
        },
        { headers: this.getHeaders() }
      );
      return { requestId: `train:${response.data.request_id}` };
    } catch (error: any) {
      console.error(
        "Fal Training Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.detail || "Failed to start training"
      );
    }
  }

  async generateImage(
    params: GenerateImageParams
  ): Promise<{ requestId: string }> {
    try {
      let loraUrl = undefined;

      // If modelId is provided and it's a "train:..." ID, we need to fetch the LoRA URL from the result
      if (params.modelId) {
        if (params.modelId.startsWith("http")) {
          loraUrl = params.modelId;
        } else if (params.modelId.startsWith("train:")) {
          const status = await this.getStatus(params.modelId);
          if (status.status === "completed" && status.result) {
            // Fal training result structure: check logs or payload
            // Usually it's in `diffusers_lora_file` or `lora_path`
            const result = status.result;
            if (result.diffusers_lora_file?.url) {
              loraUrl = result.diffusers_lora_file.url;
            }
          } else if (status.status === "failed") {
            throw new Error("The selected model failed to train.");
          } else {
            // It's presumably still training
            // For now, we allow generation to "fail" or queue without LoRA?
            // No, we should probably error out if the model isn't ready.
            throw new Error("Model is still training. Please wait.");
          }
        }
      }

      const payload: any = {
        prompt: params.prompt,
        image_size: "landscape_4_3",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: params.num || 1,
        enable_safety_checker: false,
        output_format: "jpeg",
        sync_mode: false,
      };

      if (loraUrl) {
        payload.loras = [{ path: loraUrl, scale: 1.0 }];
      }

      const response = await axios.post(
        `${FAL_QUEUE_URL}${GEN_MODEL}`,
        payload,
        { headers: this.getHeaders() }
      );
      return { requestId: `gen:${response.data.request_id}` };
    } catch (error: any) {
      console.error(
        "Fal Generation Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.detail || "Failed to start generation"
      );
    }
  }

  async getStatus(requestId: string): Promise<JobStatus> {
    const [type, id] = requestId.split(":");
    if (!id) {
      // Fallback for raw IDs if any
      return {
        requestId,
        status: "failed",
        error: "Invalid Request ID format",
      };
    }

    const modelEndpoint = type === "train" ? TRAIN_MODEL : GEN_MODEL;

    try {
      const response = await axios.get(
        `${FAL_QUEUE_URL}${modelEndpoint}/requests/${id}/status`,
        { headers: this.getHeaders() }
      );

      const data = response.data;
      // Map Fal status to our status
      // Fal status: IN_QUEUE, IN_PROGRESS, COMPLETED, FAILED
      let status: JobStatus["status"] = "queued";
      if (data.status === "IN_PROGRESS") status = "processing";
      if (data.status === "COMPLETED") status = "completed";
      if (data.status === "FAILED") status = "failed";

      return {
        requestId,
        status,
        result: data.payload, // The result is in payload
        error: data.error,
        progress: data.logs ? data.logs.length : undefined, // Rough proxy
      };
    } catch (error: any) {
      // If 404, maybe it doesn't exist?
      return {
        requestId,
        status: "failed",
        error: "Job not found on provider",
      };
    }
  }

  async cancelJob(requestId: string): Promise<void> {
    // Fal doesn't always expose easy cancel via this API, skipping for now
    return;
  }
}
