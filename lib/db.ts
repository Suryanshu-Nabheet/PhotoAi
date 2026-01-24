import fs from "fs";
import path from "path";
import crypto from "crypto";

// ============================================================================
// Types (Replicating Prisma Client Types)
// ============================================================================

export interface User {
  id: string;
  clerkId: string;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Person {
  id: string;
  userId: string;
  name: string;
  thumbnail: string | null;
  falRequestId: string | null;
  status: string;
  loraUrl: string | null;
  triggerWord: string | null;
  type: string | null;
  age: number | null;
  ethnicity: string | null;
  eyeColor: string | null;
  bald: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  userId: string;
  personId: string | null;
  imageUrl: string;
  prompt: string;
  falRequestId: string | null;
  status: string;
  packId: string | null;
  width: number | null;
  height: number | null;
  createdAt: Date;
  updatedAt: Date;
  // Optional relation for joined queries (manually handled)
  person?: Person | null;
}

// ============================================================================
// Database Infrastructure
// ============================================================================

const DB_PATH = path.join(process.cwd(), "db.json");

interface Schema {
  users: (Omit<User, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
  persons: (Omit<Person, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
  images: (Omit<Image, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
}

function getDb(): Schema {
  if (!fs.existsSync(DB_PATH)) {
    const initial: Schema = { users: [], persons: [], images: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  const content = fs.readFileSync(DB_PATH, "utf-8");
  try {
    return JSON.parse(content);
  } catch (e) {
    return { users: [], persons: [], images: [] };
  }
}

function saveDb(data: Schema) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helper to convert stored string dates back to Date objects
function toUser(u: any): User {
  return {
    ...u,
    createdAt: new Date(u.createdAt),
    updatedAt: new Date(u.updatedAt),
  };
}
function toPerson(p: any): Person {
  return {
    ...p,
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  };
}
function toImage(i: any): Image {
  const img = {
    ...i,
    createdAt: new Date(i.createdAt),
    updatedAt: new Date(i.updatedAt),
  };
  delete img.person; // Removed nested if stored accidentally, relations handled at runtime
  return img;
}

// ============================================================================
// User Operations
// ============================================================================

export const userService = {
  async findOrCreateUser(
    clerkId: string,
    data?: {
      email?: string;
      name?: string;
      imageUrl?: string;
    },
  ): Promise<User> {
    const db = getDb();
    let user = db.users.find((u: any) => u.clerkId === clerkId);

    const now = new Date().toISOString();

    if (user) {
      if (data) {
        Object.assign(user, { ...data, updatedAt: now });
        saveDb(db);
      }
      return toUser(user);
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        clerkId,
        email: data?.email || null,
        name: data?.name || null,
        imageUrl: data?.imageUrl || null,
        createdAt: now,
        updatedAt: now,
      };
      db.users.push(newUser);
      saveDb(db);
      return toUser(newUser);
    }
  },

  async getUserByClerkId(clerkId: string): Promise<User | null> {
    const db = getDb();
    const user = db.users.find((u: any) => u.clerkId === clerkId);
    return user ? toUser(user) : null;
  },
};

// ============================================================================
// Person Operations
// ============================================================================

export const personService = {
  async getPersonsByUserId(userId: string): Promise<Person[]> {
    const db = getDb();
    const persons = db.persons
      .filter((p: any) => p.userId === userId)
      .map(toPerson)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return persons;
  },

  async getPersonById(id: string): Promise<Person | null> {
    const db = getDb();
    const person = db.persons.find((p: any) => p.id === id);
    return person ? toPerson(person) : null;
  },

  async createPerson(data: {
    userId: string;
    name: string;
    thumbnail?: string;
    falRequestId?: string;
    type?: string;
    age?: number;
    ethnicity?: string;
    eyeColor?: string;
    bald?: boolean;
    triggerWord?: string;
  }): Promise<Person> {
    const db = getDb();
    const now = new Date().toISOString();
    const newPerson = {
      id: crypto.randomUUID(),
      userId: data.userId,
      name: data.name,
      thumbnail: data.thumbnail || null,
      falRequestId: data.falRequestId || null,
      status: "training",
      loraUrl: null,
      triggerWord: data.triggerWord || null,
      type: data.type || null,
      age: data.age || null,
      ethnicity: data.ethnicity || null,
      eyeColor: data.eyeColor || null,
      bald: data.bald || false,
      createdAt: now,
      updatedAt: now,
    };
    db.persons.push(newPerson);
    saveDb(db);
    return toPerson(newPerson);
  },

  async updatePerson(
    id: string,
    data: {
      status?: string;
      loraUrl?: string;
      thumbnail?: string;
    },
  ): Promise<Person> {
    const db = getDb();
    const personIndex = db.persons.findIndex((p: any) => p.id === id);
    if (personIndex === -1) throw new Error("Person not found");

    const updatedPerson = {
      ...db.persons[personIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    db.persons[personIndex] = updatedPerson;
    saveDb(db);
    return toPerson(updatedPerson);
  },

  async updatePersonByFalRequestId(
    falRequestId: string,
    data: {
      status?: string;
      loraUrl?: string;
    },
  ): Promise<Person | null> {
    const db = getDb();
    const personIndex = db.persons.findIndex(
      (p: any) => p.falRequestId === falRequestId,
    );
    if (personIndex === -1) return null;

    const updatedPerson = {
      ...db.persons[personIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    db.persons[personIndex] = updatedPerson;
    saveDb(db);
    return toPerson(updatedPerson);
  },

  async deletePerson(id: string): Promise<void> {
    const db = getDb();
    db.persons = db.persons.filter((p: any) => p.id !== id);
    saveDb(db);
  },
};

// ============================================================================
// Image Operations
// ============================================================================

export const imageService = {
  async getImagesByUserId(userId: string, limit = 50): Promise<Image[]> {
    const db = getDb();
    // Join with personen manually as Prisma `include` was used
    const images = db.images
      .filter((i: any) => i.userId === userId)
      .map((i: any) => {
        const img = toImage(i);
        if (img.personId) {
          const person = db.persons.find((p: any) => p.id === img.personId);
          if (person) img.person = toPerson(person);
        }
        return img;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);

    return images;
  },

  async getImagesByPersonId(personId: string): Promise<Image[]> {
    const db = getDb();
    const images = db.images
      .filter((i: any) => i.personId === personId)
      .map(toImage)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return images;
  },

  async createImage(data: {
    userId: string;
    personId?: string;
    imageUrl: string;
    prompt: string;
    falRequestId?: string;
    packId?: string;
    width?: number;
    height?: number;
  }): Promise<Image> {
    const db = getDb();
    const now = new Date().toISOString();
    const newImage = {
      id: crypto.randomUUID(),
      userId: data.userId,
      personId: data.personId || null,
      imageUrl: data.imageUrl,
      prompt: data.prompt,
      falRequestId: data.falRequestId || null,
      status: "pending",
      packId: data.packId || null,
      width: data.width || null,
      height: data.height || null,
      createdAt: now,
      updatedAt: now,
    };
    db.images.push(newImage);
    saveDb(db);
    return toImage(newImage);
  },

  async updateImage(
    id: string,
    data: {
      status?: string;
      imageUrl?: string;
    },
  ): Promise<Image> {
    const db = getDb();
    const imageIndex = db.images.findIndex((i: any) => i.id === id);
    if (imageIndex === -1) throw new Error("Image not found");

    const updatedImage = {
      ...db.images[imageIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    db.images[imageIndex] = updatedImage;
    saveDb(db);
    return toImage(updatedImage);
  },

  async updateImageByFalRequestId(
    falRequestId: string,
    data: {
      status?: string;
      imageUrl?: string;
    },
  ): Promise<Image | null> {
    const db = getDb();
    const imageIndex = db.images.findIndex(
      (i: any) => i.falRequestId === falRequestId,
    );
    if (imageIndex === -1) return null;

    const updatedImage = {
      ...db.images[imageIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    db.images[imageIndex] = updatedImage;
    saveDb(db);
    return toImage(updatedImage);
  },

  async deleteImage(id: string): Promise<void> {
    const db = getDb();
    db.images = db.images.filter((i: any) => i.id !== id);
    saveDb(db);
  },
};
