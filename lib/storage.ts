import fs from "fs";
import path from "path";

export interface Person {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  modelId?: string; // The backend model ID after training
  createdAt: number;
}

const DB_PATH = path.join(process.cwd(), "data", "persons.json");
const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export const db = {
  persons: {
    getAll: async (): Promise<Person[]> => {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    },
    add: async (person: Person) => {
      const persons = await db.persons.getAll();
      persons.push(person);
      fs.writeFileSync(DB_PATH, JSON.stringify(persons, null, 2));
      return person;
    },
  },
};
