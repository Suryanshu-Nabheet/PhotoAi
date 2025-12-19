export interface GenerateImageParams {
  prompt: string;
  modelId?: string;
  num?: number;
  width?: number;
  height?: number;
  loraScale?: number;
}

export interface TrainModelParams {
  name: string;
  type: string;
  age: number;
  ethinicity: string;
  eyeColor: string;
  bald: boolean;
  zipUrl: string;
}

export interface JobStatus {
  requestId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress?: number;
  result?: any;
  error?: string;
}

export interface AIProvider {
  /**
   * Queue an image generation job
   */
  generateImage(params: GenerateImageParams): Promise<{ requestId: string }>;

  /**
   * Queue a model training job
   */
  trainModel(params: TrainModelParams): Promise<{ requestId: string }>;

  /**
   * Get the status of a job
   */
  getStatus(requestId: string): Promise<JobStatus>;

  /**
   * Cancel a job
   */
  cancelJob(requestId: string): Promise<void>;
}
