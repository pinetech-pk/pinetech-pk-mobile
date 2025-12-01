// Booking hook for managing consultation booking flow

import { useState, useEffect, useCallback } from "react";
import type {
  DaySlots,
  TimeSlot,
  CallType,
  PreferredTool,
  CreateBookingRequest,
} from "@/types";
import { getAvailableSlots, createBooking } from "@/services/bookings";

type BookingStep =
  | "date"
  | "time"
  | "type"
  | "tool"
  | "details"
  | "confirm"
  | "success";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingResult {
  id: number;
  date: string;
  time: string;
}

export function useBooking(submissionId?: number | null) {
  // Step management
  const [step, setStep] = useState<BookingStep>("date");

  // Available slots
  const [availableSlots, setAvailableSlots] = useState<DaySlots[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selections
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [selectedCallType, setSelectedCallType] = useState<CallType | null>(
    null
  );
  const [selectedTool, setSelectedTool] = useState<PreferredTool | null>(null);

  // Form data
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(
    null
  );

  // Fetch available slots
  const fetchSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAvailableSlots();
      setAvailableSlots(response.slots);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load available slots"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  // Get selected day info
  const selectedDayInfo = availableSlots.find((s) => s.date === selectedDate);

  // Step navigation
  const steps: BookingStep[] = [
    "date",
    "time",
    "type",
    "tool",
    "details",
    "confirm",
  ];

  const currentStepIndex = steps.indexOf(step);

  const goBack = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  const goNext = () => {
    if (currentStepIndex < steps.length - 1 && canProceed()) {
      setStep(steps[currentStepIndex + 1]);
    }
  };

  // Validation
  const canProceed = (): boolean => {
    switch (step) {
      case "date":
        return selectedDate !== null;
      case "time":
        return selectedTimeSlot !== null;
      case "type":
        return selectedCallType !== null;
      case "tool":
        return selectedTool !== null;
      case "details":
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      default:
        return true;
    }
  };

  // Submit booking
  const submitBooking = async (): Promise<boolean> => {
    if (
      !selectedDate ||
      !selectedTimeSlot ||
      !selectedCallType ||
      !selectedTool
    ) {
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const request: CreateBookingRequest = {
        submissionId: submissionId || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bookingDate: selectedDate,
        timeSlot: selectedTimeSlot,
        callType: selectedCallType,
        preferredTool: selectedTool,
        notes: formData.notes,
      };

      const response = await createBooking(request);

      if (response.success && response.booking) {
        const slotInfo =
          selectedTimeSlot === "morning"
            ? "10:30 AM - 11:00 AM"
            : "8:00 PM - 8:30 PM";

        setBookingResult({
          id: response.booking.id,
          date: selectedDayInfo?.formattedDate || selectedDate,
          time: slotInfo,
        });
        setStep("success");
        return true;
      } else {
        setError(response.message || "Failed to book consultation");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset booking
  const resetBooking = () => {
    setStep("date");
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setSelectedCallType(null);
    setSelectedTool(null);
    setFormData({ name: "", email: "", phone: "", notes: "" });
    setBookingResult(null);
    setError(null);
    fetchSlots();
  };

  // Progress
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return {
    // State
    step,
    availableSlots,
    isLoading,
    error,
    selectedDate,
    selectedTimeSlot,
    selectedCallType,
    selectedTool,
    formData,
    isSubmitting,
    bookingResult,
    selectedDayInfo,
    progress,

    // Actions
    setStep,
    setSelectedDate,
    setSelectedTimeSlot,
    setSelectedCallType,
    setSelectedTool,
    setFormData,
    goBack,
    goNext,
    canProceed,
    submitBooking,
    resetBooking,
    refreshSlots: fetchSlots,
  };
}
