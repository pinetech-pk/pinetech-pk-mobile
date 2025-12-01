// User Submissions API service

import { api } from "./api";
import type {
  UserSubmission,
  CreateSubmissionRequest,
  CreateSubmissionResponse,
} from "@/types";
import { USE_MOCK_DATA, mockApi } from "@/lib/mockData";

/**
 * Submit a user inquiry (public endpoint)
 */
export async function createSubmission(
  data: CreateSubmissionRequest
): Promise<CreateSubmissionResponse> {
  // Use mock data if enabled
  if (USE_MOCK_DATA) {
    return mockApi.createSubmission(data as Partial<UserSubmission>);
  }

  return api.post<CreateSubmissionResponse>("/api/user-submissions", data);
}

/**
 * Get all submissions (admin only)
 */
export async function getSubmissions(): Promise<UserSubmission[]> {
  // Use mock data if enabled
  if (USE_MOCK_DATA) {
    return mockApi.getSubmissions();
  }

  return api.get<UserSubmission[]>("/api/user-submissions", {
    requiresAuth: true,
  });
}

/**
 * Get submission by ID (admin only)
 */
export async function getSubmissionById(
  id: number
): Promise<UserSubmission | null> {
  try {
    const submissions = await getSubmissions();
    return submissions.find((s) => s.id === id) || null;
  } catch {
    return null;
  }
}

/**
 * Get submissions by user type (admin only)
 */
export async function getSubmissionsByType(
  userType: "developer" | "investor" | "entrepreneur"
): Promise<UserSubmission[]> {
  const submissions = await getSubmissions();
  return submissions.filter((s) => s.userType === userType);
}

/**
 * Get submission statistics
 */
export async function getSubmissionStats(): Promise<{
  total: number;
  developers: number;
  investors: number;
  entrepreneurs: number;
  byStatus: Record<string, number>;
}> {
  const submissions = await getSubmissions();

  return {
    total: submissions.length,
    developers: submissions.filter((s) => s.userType === "developer").length,
    investors: submissions.filter((s) => s.userType === "investor").length,
    entrepreneurs: submissions.filter((s) => s.userType === "entrepreneur")
      .length,
    byStatus: submissions.reduce(
      (acc, s) => {
        acc[s.status] = (acc[s.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}
