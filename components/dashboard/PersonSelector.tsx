"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface TPerson {
  id: string;
  name: string;
  thumbnail: string;
}

// Mock data for people (trained models)
// In a real app, this would come from an API endpoint listing user's trained LoRAs
const DEFAULT_PERSONS: TPerson[] = [
  {
    id: "person-1", // This would be the modelId/LoRA path in reality
    name: "Me (Trained Model)",
    thumbnail: "https://placehold.co/600x600/png?text=Me",
  },
  {
    id: "person-2",
    name: "Model 2",
    thumbnail: "https://placehold.co/600x600/png?text=Model+2",
  },
];

export function PersonSelector({
  selectedPersonId,
  onSelect,
}: {
  selectedPersonId?: string;
  onSelect: (id: string) => void;
}) {
  const [persons, setPersons] = useState<TPerson[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const res = await fetch("/api/ai/persons");
        if (res.ok) {
          const data = await res.json();
          // If we have trained models, use them. Otherwise show default/mock.
          if (Array.isArray(data) && data.length > 0) {
            setPersons(data);
            if (!selectedPersonId) {
              onSelect(data[0].id);
            }
          } else {
            setPersons(DEFAULT_PERSONS);
            if (!selectedPersonId) {
              onSelect(DEFAULT_PERSONS[0].id);
            }
          }
        }
      } catch (e) {
        console.error("Failed to fetch persons", e);
        setPersons(DEFAULT_PERSONS);
      }
    };

    fetchPersons();
  }, [selectedPersonId, onSelect]);

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
          <h2 className="md:text-2xl text-xl font-semibold tracking-tight">
            Select Person
          </h2>
          <p className="text-sm text-muted-foreground">
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
                "group relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer hover:border-primary/50",
                selectedPersonId === person.id
                  ? "ring-2 ring-primary border-primary"
                  : "border-muted"
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
                  <div className="w-full h-full flex items-center justify-center bg-muted">
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
