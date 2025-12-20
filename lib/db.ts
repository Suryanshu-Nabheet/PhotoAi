import fs from "fs";
import path from "path";
import { TPerson } from "@/components/dashboard/PersonSelector";

const DB_PATH = path.join(process.cwd(), "db.json");

interface DatabaseSchema {
  persons: TPerson[];
}

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ persons: [] }, null, 2));
}

export const db = {
  getPersons: async (): Promise<TPerson[]> => {
    try {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      const json: DatabaseSchema = JSON.parse(data);
      return json.persons || [];
    } catch (e) {
      return [];
    }
  },

  addPerson: async (person: TPerson): Promise<void> => {
    const persons = await db.getPersons();
    const newPersons = [person, ...persons];
    fs.writeFileSync(DB_PATH, JSON.stringify({ persons: newPersons }, null, 2));
  },

  updatePerson: async (
    id: string,
    updates: Partial<TPerson>
  ): Promise<void> => {
    const persons = await db.getPersons();
    const index = persons.findIndex((p) => p.id === id);
    if (index !== -1) {
      persons[index] = { ...persons[index], ...updates };
      fs.writeFileSync(DB_PATH, JSON.stringify({ persons }, null, 2));
    }
  },
};
