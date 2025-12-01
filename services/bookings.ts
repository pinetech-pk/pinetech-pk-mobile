// Bookings API service

import { api } from "./api";
import type {
  ConsultationBooking,
  CreateBookingRequest,
  CreateBookingResponse,
  AvailableSlotsResponse,
  BookingStatus,
} from "@/types";

/**
 * Get available booking slots (public endpoint)
 */
export async function getAvailableSlots(): Promise<AvailableSlotsResponse> {
  return api.get<AvailableSlotsResponse>("/api/bookings/slots");
}

/**
 * Create a new booking (public endpoint)
 */
export async function createBooking(
  data: CreateBookingRequest
): Promise<CreateBookingResponse> {
  return api.post<CreateBookingResponse>("/api/bookings", data);
}

/**
 * Get all bookings (admin only)
 */
export async function getBookings(): Promise<{ bookings: ConsultationBooking[] }> {
  return api.get<{ bookings: ConsultationBooking[] }>("/api/bookings", {
    requiresAuth: true,
  });
}

/**
 * Update booking status (admin only)
 */
export async function updateBookingStatus(
  id: number,
  status: BookingStatus
): Promise<{ booking: ConsultationBooking }> {
  return api.patch<{ booking: ConsultationBooking }>(
    `/api/bookings/${id}`,
    { status },
    { requiresAuth: true }
  );
}

/**
 * Get upcoming bookings (admin only)
 */
export async function getUpcomingBookings(): Promise<ConsultationBooking[]> {
  const { bookings } = await getBookings();
  const today = new Date().toISOString().split("T")[0];

  return bookings.filter(
    (b) =>
      b.bookingDate >= today &&
      (b.status === "pending" || b.status === "confirmed")
  );
}

/**
 * Get booking statistics
 */
export async function getBookingStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}> {
  const { bookings } = await getBookings();

  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
}
