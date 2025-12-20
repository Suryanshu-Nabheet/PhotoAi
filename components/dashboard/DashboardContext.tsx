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

// Removed DEFAULT_PERSONS

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>(
    undefined
  );

  // Fetch persons on mount
  React.useEffect(() => {
    const fetchPersons = async () => {
      try {
        const res = await fetch("/api/ai/persons");
        if (res.ok) {
          const data = await res.json();
          setPersons(data.persons);
          if (data.persons.length > 0) {
            setSelectedPersonId(data.persons[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch persons:", error);
      }
    };
    fetchPersons();
  }, []);

  const addPerson = (person: TPerson) => {
    setPersons((prev) => [person, ...prev]);
    setSelectedPersonId(person.id);
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
