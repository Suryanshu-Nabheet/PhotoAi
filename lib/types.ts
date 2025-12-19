import { z } from "zod";

export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.string(),
  num: z.number(),
});

export type GenerateImageInput = z.infer<typeof GenerateImage>;
