// API Response Types - Matching web app contracts

export interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
}

// User Submission Types
export type UserType = "developer" | "investor" | "entrepreneur";
export type SubmissionStatus = "new" | "contacted" | "converted" | "closed";
export type SubmissionType = "form" | "appointment";

export interface StepResponses {
  step1?: Record<string, unknown>;
  step2?: Record<string, unknown>;
  step3?: Record<string, unknown>;
  step4?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface UserSubmission {
  id: number;
  userType: UserType;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  stepResponses: StepResponses;
  submissionType: SubmissionType;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubmissionRequest {
  userType: UserType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  stepResponses?: StepResponses;
  submissionType?: SubmissionType;
}

export interface CreateSubmissionResponse {
  success: boolean;
  id?: number;
  message: string;
}

// Booking Types
export type TimeSlot = "morning" | "evening";
export type CallType = "voice" | "video";
export type PreferredTool = "phone" | "whatsapp" | "zoom";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface TimeSlotInfo {
  label: string;
  time: string;
  available: boolean;
}

export interface DaySlots {
  date: string;
  dayName: string;
  formattedDate: string;
  slots: {
    morning: TimeSlotInfo;
    evening: TimeSlotInfo;
  };
}

export interface ConsultationBooking {
  id: number;
  submissionId: number | null;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
  timeSlot: TimeSlot;
  callType: CallType;
  preferredTool: PreferredTool;
  status: BookingStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  submissionId?: number | null;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
  timeSlot: TimeSlot;
  callType: CallType;
  preferredTool: PreferredTool;
  notes?: string;
}

export interface CreateBookingResponse {
  success: boolean;
  booking?: ConsultationBooking;
  message: string;
}

export interface AvailableSlotsResponse {
  slots: DaySlots[];
}

// Chat Types
export interface ChatRoom {
  id: string;
  title: string;
  description: string | null;
  adminNote: string | null;
  clientNote: string | null;
  accessKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "admin" | "client";
  timestamp: number;
}

// Auth Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AdminUser;
  token?: string;
  error?: string;
}
