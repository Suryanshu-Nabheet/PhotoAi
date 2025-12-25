"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { TPerson } from "./PersonSelector";

// Define the shape of our context
interface DashboardContextType {
  persons: TPerson[];
  addPerson: (person: TPerson) => void;
  refreshPersons: () => Promise<void>;
  selectedPersonId: string | undefined;
  setSelectedPersonId: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>(
    undefined
  );

  // Fetch persons from API
  const fetchPersons = useCallback(async () => {
    try {
      const res = await fetch("/api/ai/persons");
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched persons:", data.persons);
        setPersons(data.persons);
        if (data.persons.length > 0 && !selectedPersonId) {
          setSelectedPersonId(data.persons[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch persons:", error);
    }
  }, [selectedPersonId]);

  // Fetch persons on mount
  React.useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  const addPerson = (person: TPerson) => {
    setPersons((prev) => [person, ...prev]);
    setSelectedPersonId(person.id);
  };

  const refreshPersons = async () => {
    await fetchPersons();
  };

  return (
    <DashboardContext.Provider
      value={{
        persons,
        addPerson,
        refreshPersons,
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
