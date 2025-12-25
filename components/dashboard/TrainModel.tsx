"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useDashboard } from "./DashboardContext";

export default function Train() {
  const { getToken } = useAuth();
  const { addPerson } = useDashboard();

  const [zipUrl, setZipUrl] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function trainModel() {
    if (!name || !zipUrl || !type || !age || !ethnicity || !eyeColor) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const input = {
        zipUrl,
        type,
        age: parseInt(age),
        ethnicity,
        eyeColor,
        bald,
        name,
      };

      const token = await getToken();
      const response = await axios.post("/api/ai/training", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Add to local context
      addPerson({
        id: response.data.requestId || `temp-${Date.now()}`,
        name: name,
        thumbnail: `https://placehold.co/600x600/png?text=${encodeURIComponent(
          name
        )}`,
      });

      toast.success("Training started successfully!");
      // We don't navigate away, just reset form or let user switch tabs
      setName("");
      setAge("");
      setZipUrl("");
    } catch (error: any) {
      console.error("Training error:", error);

      if (error.response?.status === 402) {
        toast.error("Training failed: Insufficient credits or billing error");
        setIsSubmitting(false);
        return;
      }

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to start training";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-white/10 bg-black/80 backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Train Custom Model
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create a personalized AI model by uploading photos and specifying
            attributes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Model Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. My Professional Avatar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-300">
                Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-300">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Subject age"
                value={age || ""}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethnicity" className="text-gray-300">
                Ethnicity
              </Label>
              <Select value={ethnicity} onValueChange={setEthnicity}>
                <SelectTrigger id="ethnicity">
                  <SelectValue placeholder="Select ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">
                    South East Asian
                  </SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyeColor" className="text-gray-300">
                Eye Color
              </Label>
              <Select value={eyeColor} onValueChange={setEyeColor}>
                <SelectTrigger id="eyeColor">
                  <SelectValue placeholder="Select eye color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5">
            <Label htmlFor="bald" className="cursor-pointer text-gray-300">
              Bald / Shaved Head
            </Label>
            <Switch id="bald" checked={bald} onCheckedChange={setBald} />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">
              Training Images (10-20 photos)
            </Label>
            <UploadModal
              handleUpload={async (files) => {
                if (files.length < 5) {
                  toast.error("Please upload at least 5 images");
                  return;
                }
                const loadingToast = toast.loading(
                  "Compressing and uploading images..."
                );
                try {
                  // 1. Zip the files
                  const JSZip = (await import("jszip")).default;
                  const zip = new JSZip();
                  files.forEach((file) => {
                    zip.file(file.name, file);
                  });
                  const zipBlob = await zip.generateAsync({ type: "blob" });

                  // 2. Upload to API
                  const formData = new FormData();
                  formData.append("file", zipBlob, "images.zip");

                  const token = await getToken();
                  const response = await axios.post("/api/upload", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  setZipUrl(response.data.url);
                  toast.success("Images uploaded successfully!", {
                    id: loadingToast,
                  });
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to upload images", { id: loadingToast });
                }
              }}
              uploadProgress={0}
              isUploading={false}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={trainModel}
            disabled={
              isSubmitting ||
              !name ||
              !zipUrl ||
              !type ||
              !age ||
              !ethnicity ||
              !eyeColor
            }
            className="min-w-[140px]"
          >
            {isSubmitting ? "Queuing..." : "Start Training"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
