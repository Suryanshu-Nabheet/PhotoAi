"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/dashboard/GenerateImage";
import { Packs } from "@/components/dashboard/Packs";
import { Camera } from "@/components/dashboard/Camera";
import { LandingHeader } from "@/components/landing/header";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />

      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">
              Welcome to PhotoAI
            </h1>
            <p className="text-lg text-gray-400">
              Sign in to access your dashboard and start creating amazing
              AI-generated images.
            </p>
            <SignInButton mode="modal">
              <Button size="lg" className="mt-4">
                Sign In to Continue
              </Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="packs">Packs</TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-6">
              <Camera />
            </TabsContent>

            <TabsContent value="generate" className="mt-6">
              <GenerateImage />
            </TabsContent>

            <TabsContent value="packs" className="mt-6">
              <Packs />
            </TabsContent>
          </Tabs>
        </div>
      </SignedIn>
    </div>
  );
}
