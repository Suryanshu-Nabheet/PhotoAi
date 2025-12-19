"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TPerson } from "./PersonSelector";

// Define the shape of our context
interface DashboardContextType {
  persons: TPerson[];
  addPerson: (person: TPerson) => void;
  selectedPersonId: string | undefined;
  setSelectedPersonId: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// Default mock data to start with (so the UI isn't empty)
const DEFAULT_PERSONS: TPerson[] = [
  {
    id: "person-1",
    name: "Me (Trained Model)",
    thumbnail: "https://placehold.co/600x600/png?text=Me",
  },
  {
    id: "person-2",
    name: "Model 2",
    thumbnail: "https://placehold.co/600x600/png?text=Model+2",
  },
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [persons, setPersons] = useState<TPerson[]>(DEFAULT_PERSONS);
  const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>(
    DEFAULT_PERSONS[0]?.id
  );

  const addPerson = (person: TPerson) => {
    setPersons((prev) => [person, ...prev]); // Add new person to the start
    setSelectedPersonId(person.id); // Auto-select the new person
  };

  return (
    <DashboardContext.Provider
      value={{
        persons,
        addPerson,
        selectedPersonId,
        setSelectedPersonId,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
