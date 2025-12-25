/**
 * Centralized Type Definitions for PhotoAI
 *
 * This file contains all shared type definitions used across the application.
 * Keeping types centralized improves maintainability and prevents duplication.
 */

// ============================================================================
// Person/Model Types
// ============================================================================

/**
 * Represents a trained AI model/person in the system
 */
export interface Person {
  id: string;
  name: string;
  thumbnail: string;
  status?: "training" | "ready" | "failed";
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Database schema for persons collection
 */
export interface PersonsDatabase {
  persons: Person[];
}

// ============================================================================
// Image Types
// ============================================================================

/**
 * Status of an image generation or training job
 */
export type JobStatus =
  | "pending"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

/**
 * Represents a generated image in the system
 */
export interface GeneratedImage {
  id: string;
  imageUrl: string;
  modelId: string;
  userId: string;
  prompt: string;
  falAiRequestId: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Pack Types
// ============================================================================

/**
 * Represents a pre-configured image generation pack
 */
export interface Pack {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  imageUrl1: string;
  imageUrl2: string;
  prompts: string[];
  category?: string;
  isPremium?: boolean;
  tags?: string[];
}

// ============================================================================
// API Request/Response Types
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Parameters for generating an image
 */
export interface GenerateImageRequest {
  prompt: string;
  modelId?: string;
  num?: number;
  width?: number;
  height?: number;
}

/**
 * Parameters for training a model
 */
export interface TrainModelRequest {
  name: string;
  type: "Man" | "Woman" | "Others";
  age: number;
  ethnicity:
    | "White"
    | "Black"
    | "Asian_American"
    | "East_Asian"
    | "South_East_Asian"
    | "South_Asian"
    | "Middle_Eastern";
  eyeColor: "Brown" | "Blue" | "Hazel" | "Gray";
  bald: boolean;
  zipUrl: string;
}

/**
 * Response from image generation API
 */
export interface GenerateImageResponse {
  success: boolean;
  requestId: string;
  message: string;
}

/**
 * Response from training API
 */
export interface TrainModelResponse {
  success: boolean;
  requestId: string;
  message: string;
}

/**
 * Job status response from API
 */
export interface JobStatusResponse {
  requestId: string;
  status: JobStatus;
  progress?: number;
  result?: any;
  error?: string;
}

// ============================================================================
// User Types
// ============================================================================

/**
 * User profile information
 */
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
  createdAt: string;
}

/**
 * User credits/billing information
 */
export interface UserCredits {
  userId: string;
  credits: number;
  subscription?: "free" | "pro" | "enterprise";
}

// ============================================================================
// Dashboard Context Types
// ============================================================================

/**
 * Dashboard context state
 */
export interface DashboardContextType {
  selectedPersonId: string | null;
  setSelectedPersonId: (id: string | null) => void;
  persons: Person[];
  addPerson: (person: Person) => void;
  refreshPersons: () => Promise<void>;
}

// ============================================================================
// Form Types
// ============================================================================

/**
 * Form state for training model
 */
export interface TrainModelFormData {
  name: string;
  type: string;
  age: string;
  ethnicity: string;
  eyeColor: string;
  bald: boolean;
  zipUrl: string;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Upload progress state
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
