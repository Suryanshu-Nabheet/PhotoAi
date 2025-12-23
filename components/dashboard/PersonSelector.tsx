"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useDashboard } from "./DashboardContext";

export interface TPerson {
  id: string;
  name: string;
  thumbnail: string;
}

export function PersonSelector({
  selectedPersonId,
  onSelect,
}: {
  selectedPersonId?: string;
  onSelect: (id: string) => void;
}) {
  const { persons } = useDashboard();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="md:space-y-1">
          <h2 className="md:text-2xl text-xl font-semibold tracking-tight text-white">
            Select Person
          </h2>
          <p className="text-sm text-gray-400">
            Choose the person you want to generate images of
          </p>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {persons.map((person) => (
          <motion.div key={person.id} variants={item}>
            <Card
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer hover:border-blue-500/50",
                selectedPersonId === person.id
                  ? "ring-2 ring-blue-500 border-blue-500 shadow-blue-500/20"
                  : "border-white/10"
              )}
              onClick={() => onSelect(person.id)}
            >
              <div className="relative aspect-square">
                {person.thumbnail ? (
                  <Image
                    src={person.thumbnail}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-semibold text-white truncate text-center">
                    {person.name}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
