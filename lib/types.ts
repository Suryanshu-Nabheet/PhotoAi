import { z } from "zod";

export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.string().optional(),
  num: z.number().optional(),
});

export type GenerateImageInput = z.infer<typeof GenerateImage>;
