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
      console.log("Starting FAL AI training with params:", {
        name: params.name,
        type: params.type,
        zipUrl: params.zipUrl,
      });

      const response = await axios.post(
        `${FAL_QUEUE_URL}${TRAIN_MODEL}`,
        {
          images_data_url: params.zipUrl,
          trigger_word: params.name.toLowerCase().replace(/\s+/g, "_"), // Use name as trigger word
          steps: 1000, // Required for training
          learning_rate: 0.0004, // Recommended learning rate
        },
        { headers: this.getHeaders() }
      );

      console.log("FAL AI training response:", response.data);
      return { requestId: `train:${response.data.request_id}` };
    } catch (error: any) {
      console.error(
        "Fal Training Error:",
        error.response?.data || error.message
      );

      const errorDetail = error.response?.data?.detail || error.message;
      throw new Error(`Training failed: ${errorDetail}`);
    }
  }

  async generateImage(
    params: GenerateImageParams
  ): Promise<{ requestId: string }> {
    try {
      console.log("Starting image generation with params:", {
        prompt: params.prompt,
        modelId: params.modelId,
      });

      let loraUrl = undefined;

      // If modelId is provided and it's a "train:..." ID, fetch the LoRA URL
      if (params.modelId) {
        if (params.modelId.startsWith("http")) {
          // Direct LoRA URL
          loraUrl = params.modelId;
        } else if (params.modelId.startsWith("train:")) {
          // Fetch training status to get LoRA URL
          const status = await this.getStatus(params.modelId);
          console.log("Training status for generation:", status);

          if (status.status === "completed" && status.result) {
            const result = status.result;
            // FAL AI returns LoRA in diffusers_lora_file.url
            if (result.diffusers_lora_file?.url) {
              loraUrl = result.diffusers_lora_file.url;
              console.log("Using LoRA URL:", loraUrl);
            } else {
              console.error(
                "Training completed but no LoRA URL found:",
                result
              );
              throw new Error("Training completed but LoRA model not found");
            }
          } else if (status.status === "failed") {
            throw new Error(
              `Model training failed: ${status.error || "Unknown error"}`
            );
          } else {
            throw new Error(
              `Model is still ${status.status}. Please wait for training to complete.`
            );
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
        console.log("Generating with LoRA:", loraUrl);
      }

      const response = await axios.post(
        `${FAL_QUEUE_URL}${GEN_MODEL}`,
        payload,
        { headers: this.getHeaders() }
      );

      console.log("FAL AI generation response:", response.data);
      return { requestId: `gen:${response.data.request_id}` };
    } catch (error: any) {
      console.error(
        "Fal Generation Error:",
        error.response?.data || error.message
      );

      const errorDetail = error.response?.data?.detail || error.message;
      throw new Error(`Generation failed: ${errorDetail}`);
    }
  }

  async getStatus(requestId: string): Promise<JobStatus> {
    const [type, id] = requestId.split(":");
    if (!id) {
      console.error("Invalid request ID format:", requestId);
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
      console.log(`Status check for ${type}:${id}:`, {
        status: data.status,
        hasPayload: !!data.payload,
      });

      // Map Fal status to our status
      // Fal status: IN_QUEUE, IN_PROGRESS, COMPLETED, FAILED
      let status: JobStatus["status"] = "queued";
      if (data.status === "IN_PROGRESS") status = "processing";
      if (data.status === "COMPLETED") status = "completed";
      if (data.status === "FAILED") status = "failed";

      // For completed training, extract images from result
      let result = data.response_data || data.payload;

      // For image generation, extract the images array
      if (type === "gen" && status === "completed" && result?.images) {
        result = result.images;
      }

      return {
        requestId,
        status,
        result,
        error: data.error,
        progress: data.logs ? data.logs.length : undefined,
      };
    } catch (error: any) {
      console.error(
        `Error checking status for ${requestId}:`,
        error.response?.data || error.message
      );

      // If 404, job doesn't exist
      if (error.response?.status === 404) {
        return {
          requestId,
          status: "failed",
          error: "Job not found - it may have expired",
        };
      }

      return {
        requestId,
        status: "failed",
        error: error.response?.data?.detail || "Failed to check job status",
      };
    }
  }

  async cancelJob(requestId: string): Promise<void> {
    // Fal doesn't always expose easy cancel via this API, skipping for now
    return;
  }
}
