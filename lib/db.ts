import { prisma } from "./prisma";
import type { Person, Image, User } from "@prisma/client";

/**
 * Enterprise-level database service using Prisma
 * Replaces the old file-based db.json system
 */

// ============================================================================
// User Operations
// ============================================================================

export const userService = {
  /**
   * Find or create user by Clerk ID
   */
  async findOrCreateUser(
    clerkId: string,
    data?: {
      email?: string;
      name?: string;
      imageUrl?: string;
    }
  ): Promise<User> {
    return await prisma.user.upsert({
      where: { clerkId },
      update: data || {},
      create: {
        clerkId,
        ...data,
      },
    });
  },

  /**
   * Get user by Clerk ID
   */
  async getUserByClerkId(clerkId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { clerkId },
    });
  },
};

// ============================================================================
// Person Operations
// ============================================================================

export const personService = {
  /**
   * Get all persons for a user
   */
  async getPersonsByUserId(userId: string): Promise<Person[]> {
    return await prisma.person.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Get person by ID
   */
  async getPersonById(id: string): Promise<Person | null> {
    return await prisma.person.findUnique({
      where: { id },
    });
  },

  /**
   * Create a new person (trained model)
   */
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
    console.log("Creating person in database:", data);

    const person = await prisma.person.create({
      data: {
        ...data,
        status: "training",
      },
    });

    console.log("Person created successfully:", person.id);
    return person;
  },

  /**
   * Update person (e.g., when training completes)
   */
  async updatePerson(
    id: string,
    data: {
      status?: string;
      loraUrl?: string;
      thumbnail?: string;
    }
  ): Promise<Person> {
    return await prisma.person.update({
      where: { id },
      data,
    });
  },

  /**
   * Update person by FAL request ID
   */
  async updatePersonByFalRequestId(
    falRequestId: string,
    data: {
      status?: string;
      loraUrl?: string;
    }
  ): Promise<Person | null> {
    const person = await prisma.person.findUnique({
      where: { falRequestId },
    });

    if (!person) return null;

    return await prisma.person.update({
      where: { id: person.id },
      data,
    });
  },

  /**
   * Delete person
   */
  async deletePerson(id: string): Promise<void> {
    await prisma.person.delete({
      where: { id },
    });
  },
};

// ============================================================================
// Image Operations
// ============================================================================

export const imageService = {
  /**
   * Get all images for a user
   */
  async getImagesByUserId(userId: string, limit = 50): Promise<Image[]> {
    return await prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        person: true,
      },
    });
  },

  /**
   * Get images by person ID
   */
  async getImagesByPersonId(personId: string): Promise<Image[]> {
    return await prisma.image.findMany({
      where: { personId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Create a new image record
   */
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
    return await prisma.image.create({
      data: {
        ...data,
        status: "pending",
      },
    });
  },

  /**
   * Update image (e.g., when generation completes)
   */
  async updateImage(
    id: string,
    data: {
      status?: string;
      imageUrl?: string;
    }
  ): Promise<Image> {
    return await prisma.image.update({
      where: { id },
      data,
    });
  },

  /**
   * Update image by FAL request ID
   */
  async updateImageByFalRequestId(
    falRequestId: string,
    data: {
      status?: string;
      imageUrl?: string;
    }
  ): Promise<Image | null> {
    const image = await prisma.image.findUnique({
      where: { falRequestId },
    });

    if (!image) return null;

    return await prisma.image.update({
      where: { id: image.id },
      data,
    });
  },

  /**
   * Delete image
   */
  async deleteImage(id: string): Promise<void> {
    await prisma.image.delete({
      where: { id },
    });
  },
};
