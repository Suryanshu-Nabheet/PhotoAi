"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/dashboard/GenerateImage";
import { Packs } from "@/components/dashboard/Packs";
import { Camera } from "@/components/dashboard/Camera";
import { Header } from "@/components/header";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { DashboardProvider } from "@/components/dashboard/DashboardContext";
import Train from "@/components/dashboard/TrainModel";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <SignedOut>
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            {/* Background Glow Effect */}
            <div className="absolute -top-20 -left-20 -z-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="flex flex-col items-center space-y-8 rounded-3xl border border-white/10 bg-black/40 px-8 py-12 text-center shadow-2xl backdrop-blur-xl">
              <div className="rounded-full bg-white/5 p-4 ring-1 ring-white/10">
                <Lock className="h-10 w-10 text-white" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Welcome to PhotoAI
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your professional AI studio awaits. Sign in to access your
                  dashboard, train models, and generate stunning photos.
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2">
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="w-full bg-white text-black hover:bg-neutral-200"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </div>

              <Button
                variant="link"
                asChild
                className="text-muted-foreground hover:text-white"
              >
                <Link href="/">&larr; Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <DashboardProvider>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
            <Tabs defaultValue="camera" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="packs">Packs</TabsTrigger>
                <TabsTrigger value="train">Train</TabsTrigger>
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

              <TabsContent value="train" className="mt-6">
                <Train />
              </TabsContent>
            </Tabs>
          </div>
        </DashboardProvider>
      </SignedIn>
    </div>
  );
}
