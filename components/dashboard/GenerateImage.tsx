"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CustomLabel from "@/components/ui/customLabel";
import { GlowEffect } from "@/components/dashboard/GlowEffect";
import { PersonSelector } from "@/components/dashboard/PersonSelector";
// ... imports

// Note: I need to update the entire component to swap 'selectedModel' with 'selectedPersonId'
// and remove the 'Models' import.

import { useDashboard } from "./DashboardContext";

export function GenerateImage() {
  const { selectedPersonId, setSelectedPersonId } = useDashboard();
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [requestId, setRequestId] = useState<string>();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();

  const handleGenerate = async () => {
    if (!prompt || !selectedPersonId) return;

    setIsGenerating(true);
    setGeneratedImages([]); // Clear previous
    setRequestId(undefined);

    try {
      const token = await getToken();
      const response = await axios.post(
        "/api/ai/generate",
        {
          prompt,
          modelId: selectedPersonId,
          num: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { requestId } = response.data;
      setRequestId(requestId);
      toast.success("Image generation started!");
      setPrompt("");

      // Start polling
      pollStatus(requestId);
    } catch (error: any) {
      if (error.response?.status === 402) {
        toast.error("Insufficient credits or billing error");
        // Optionally show a modal or link to upgrade
      } else {
        toast.error("Failed to generate image");
      }
      setIsGenerating(false);
    }
  };

  const pollStatus = async (id: string) => {
    const token = await getToken();
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/ai/status/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status, result, error } = res.data.status;

        if (status === "completed") {
          clearInterval(interval);
          setGeneratedImages(result);
          setIsGenerating(false);
          toast.success("Generation complete!");
        } else if (status === "failed") {
          clearInterval(interval);
          setIsGenerating(false);
          toast.error(error || "Generation failed");
        }
      } catch (e) {
        clearInterval(interval);
        setIsGenerating(false);
        console.error("Polling error", e);
      }
    }, 2000);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <PersonSelector
          selectedPersonId={selectedPersonId}
          onSelect={setSelectedPersonId}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full"
        >
          <CustomLabel
            label="Enter your prompt here..."
            className="text-gray-300"
          />
          <Textarea
            className="w-full min-h-24 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </motion.div>

        <div className="flex justify-end pt-4">
          <div className="relative">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !selectedPersonId}
              variant={"outline"}
              className="relative z-20 cursor-pointer"
            >
              {isGenerating ? "Generating..." : "Generate Image"}{" "}
              <Sparkles size={24} className="ml-2" />
            </Button>
            {prompt && selectedPersonId && !isGenerating && (
              <GlowEffect
                colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                mode="colorShift"
                blur="soft"
                duration={3}
                scale={0.9}
              />
            )}
          </div>
        </div>

        {/* Results Section */}
        {generatedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            {generatedImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden border border-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt="Generated"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
