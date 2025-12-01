// Booking screen - consultation booking wizard

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Calendar,
  Clock,
  Phone,
  Video,
  MessageCircle,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Home,
} from "lucide-react-native";
import { Header } from "@/components/shared";
import { Button, Input, TextArea, Badge } from "@/components/ui";
import { COLORS, TIME_SLOTS, CALL_TYPES, PREFERRED_TOOLS } from "@/lib/constants";
import { useBooking } from "@/hooks";

export default function BookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { ref } = useLocalSearchParams<{ ref?: string }>();

  const {
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
  } = useBooking(ref ? parseInt(ref) : null);

  const handleClose = () => {
    resetBooking();
    router.back();
  };

  // Render date selection
  const renderDateStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Calendar size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Select a Date</Text>
        <Text style={styles.stepDesc}>
          Choose from available consultation days (Monday - Thursday)
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.emerald[500]} />
      ) : (
        <View style={styles.datesGrid}>
          {availableSlots.map((day) => {
            const hasSlots = day.slots.morning.available || day.slots.evening.available;
            const isSelected = selectedDate === day.date;

            return (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                  !hasSlots && styles.dateCardDisabled,
                ]}
                onPress={() => hasSlots && setSelectedDate(day.date)}
                disabled={!hasSlots}
              >
                <Text style={styles.dateDayName}>{day.dayName}</Text>
                <Text
                  style={[
                    styles.dateFormatted,
                    isSelected && styles.dateFormattedSelected,
                  ]}
                >
                  {day.formattedDate}
                </Text>
                <Text style={styles.dateSlotCount}>
                  {hasSlots
                    ? `${[day.slots.morning.available, day.slots.evening.available].filter(Boolean).length} slot(s)`
                    : "Fully booked"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );

  // Render time slot selection
  const renderTimeStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Clock size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Select Time Slot</Text>
        <Text style={styles.stepDesc}>
          {selectedDayInfo?.dayName}, {selectedDayInfo?.formattedDate}
        </Text>
        <Text style={styles.timezone}>All times in PKT (Pakistan Standard Time)</Text>
      </View>

      <View style={styles.timeCards}>
        <TouchableOpacity
          style={[
            styles.timeCard,
            selectedTimeSlot === "morning" && styles.timeCardSelected,
            !selectedDayInfo?.slots.morning.available && styles.timeCardDisabled,
          ]}
          onPress={() =>
            selectedDayInfo?.slots.morning.available && setSelectedTimeSlot("morning")
          }
          disabled={!selectedDayInfo?.slots.morning.available}
        >
          <Sun size={32} color="#fbbf24" />
          <Text style={styles.timeLabel}>Morning</Text>
          <Text style={styles.timeValue}>{TIME_SLOTS.morning.time}</Text>
          {!selectedDayInfo?.slots.morning.available && (
            <Badge variant="error">Booked</Badge>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeCard,
            selectedTimeSlot === "evening" && styles.timeCardSelected,
            !selectedDayInfo?.slots.evening.available && styles.timeCardDisabled,
          ]}
          onPress={() =>
            selectedDayInfo?.slots.evening.available && setSelectedTimeSlot("evening")
          }
          disabled={!selectedDayInfo?.slots.evening.available}
        >
          <Moon size={32} color="#818cf8" />
          <Text style={styles.timeLabel}>Evening</Text>
          <Text style={styles.timeValue}>{TIME_SLOTS.evening.time}</Text>
          {!selectedDayInfo?.slots.evening.available && (
            <Badge variant="error">Booked</Badge>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render call type selection
  const renderTypeStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Video size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Call Type</Text>
        <Text style={styles.stepDesc}>How would you like to connect?</Text>
      </View>

      <View style={styles.typeCards}>
        <TouchableOpacity
          style={[
            styles.typeCard,
            selectedCallType === "voice" && styles.typeCardSelected,
          ]}
          onPress={() => setSelectedCallType("voice")}
        >
          <Phone size={32} color="#3b82f6" />
          <Text style={styles.typeLabel}>{CALL_TYPES.voice.label}</Text>
          <Text style={styles.typeDesc}>{CALL_TYPES.voice.description}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeCard,
            selectedCallType === "video" && styles.typeCardSelected,
          ]}
          onPress={() => setSelectedCallType("video")}
        >
          <Video size={32} color="#a855f7" />
          <Text style={styles.typeLabel}>{CALL_TYPES.video.label}</Text>
          <Text style={styles.typeDesc}>{CALL_TYPES.video.description}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render platform selection
  const renderToolStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <MessageCircle size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Preferred Platform</Text>
        <Text style={styles.stepDesc}>Where should we connect?</Text>
      </View>

      <View style={styles.toolCards}>
        {Object.entries(PREFERRED_TOOLS).map(([key, value]) => {
          const Icon =
            key === "phone" ? Phone : key === "whatsapp" ? MessageCircle : Video;
          const iconColor =
            key === "phone" ? "#22c55e" : key === "whatsapp" ? "#25D366" : "#2D8CFF";

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.toolCard,
                selectedTool === key && styles.toolCardSelected,
              ]}
              onPress={() => setSelectedTool(key as "phone" | "whatsapp" | "zoom")}
            >
              <Icon size={28} color={iconColor} />
              <Text style={styles.toolLabel}>{value.label}</Text>
              <Text style={styles.toolDesc}>{value.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render details form
  const renderDetailsStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Check size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Your Details</Text>
        <Text style={styles.stepDesc}>How can we reach you?</Text>
      </View>

      <Input
        label="Full Name *"
        placeholder="Your full name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <Input
        label="Email Address *"
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      <Input
        label="Phone Number *"
        placeholder="+92 300 1234567"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
      />

      <TextArea
        label="Additional Notes (Optional)"
        placeholder="Anything you'd like to discuss..."
        value={formData.notes}
        onChangeText={(text) => setFormData({ ...formData, notes: text })}
      />
    </View>
  );

  // Render confirmation
  const renderConfirmStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Check size={40} color={COLORS.emerald[500]} />
        <Text style={styles.stepTitle}>Confirm Booking</Text>
        <Text style={styles.stepDesc}>Review your consultation details</Text>
      </View>

      <View style={styles.confirmCard}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Date</Text>
          <Text style={styles.confirmValue}>
            {selectedDayInfo?.dayName}, {selectedDayInfo?.formattedDate}
          </Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Time</Text>
          <Text style={styles.confirmValue}>
            {selectedTimeSlot === "morning"
              ? TIME_SLOTS.morning.time
              : TIME_SLOTS.evening.time}{" "}
            PKT
          </Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Call Type</Text>
          <Text style={styles.confirmValue}>{selectedCallType}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Platform</Text>
          <Text style={styles.confirmValue}>{selectedTool}</Text>
        </View>
        <View style={styles.confirmDivider} />
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Name</Text>
          <Text style={styles.confirmValue}>{formData.name}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Email</Text>
          <Text style={styles.confirmValue}>{formData.email}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Phone</Text>
          <Text style={styles.confirmValue}>{formData.phone}</Text>
        </View>
      </View>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );

  // Render success
  const renderSuccessStep = () => (
    <View style={styles.successSection}>
      <View style={styles.successIcon}>
        <Check size={40} color="#fff" />
      </View>
      <Text style={styles.successTitle}>Booking Confirmed!</Text>
      <Text style={styles.successText}>
        Your consultation has been scheduled successfully.
      </Text>

      <View style={styles.bookingCard}>
        <Text style={styles.bookingRef}>Booking Reference</Text>
        <Text style={styles.bookingId}>#{bookingResult?.id}</Text>
        <Text style={styles.bookingDateLabel}>Scheduled For</Text>
        <Text style={styles.bookingDate}>{bookingResult?.date}</Text>
        <Text style={styles.bookingTime}>{bookingResult?.time} PKT</Text>
      </View>

      <Text style={styles.confirmationNote}>
        You will receive a confirmation email with meeting details shortly.
      </Text>

      <View style={styles.successButtons}>
        <Button variant="outline" onPress={handleClose} fullWidth>
          <Home size={18} color="#e5e7eb" style={{ marginRight: 8 }} />
          <Text style={styles.navButtonText}>Return to Home</Text>
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Book Consultation"
        showBack={step !== "date" && step !== "success"}
        onBack={goBack}
        rightContent={
          step !== "success" && (
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#a1a1aa" />
            </TouchableOpacity>
          )
        }
      />

      {/* Progress bar */}
      {step !== "success" && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {step === "date" && renderDateStep()}
        {step === "time" && renderTimeStep()}
        {step === "type" && renderTypeStep()}
        {step === "tool" && renderToolStep()}
        {step === "details" && renderDetailsStep()}
        {step === "confirm" && renderConfirmStep()}
        {step === "success" && renderSuccessStep()}
      </ScrollView>

      {/* Navigation buttons */}
      {step !== "success" && (
        <View style={[styles.navButtons, { paddingBottom: insets.bottom + 16 }]}>
          <Button variant="outline" onPress={goBack} disabled={step === "date"}>
            <ArrowLeft size={18} color="#e5e7eb" style={{ marginRight: 8 }} />
            <Text style={styles.navButtonText}>Back</Text>
          </Button>

          {step === "confirm" ? (
            <Button
              variant="pine"
              onPress={submitBooking}
              disabled={!canProceed()}
              loading={isSubmitting}
            >
              <Text style={styles.navButtonTextWhite}>Confirm Booking</Text>
              <Check size={18} color="#fff" style={{ marginLeft: 8 }} />
            </Button>
          ) : (
            <Button
              variant="pine"
              onPress={goNext}
              disabled={!canProceed()}
            >
              <Text style={styles.navButtonTextWhite}>Next</Text>
              <ArrowRight size={18} color="#fff" style={{ marginLeft: 8 }} />
            </Button>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#27272a",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.emerald[500],
  },
  stepContent: {
    padding: 20,
  },
  stepHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginTop: 16,
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 15,
    color: "#a1a1aa",
    textAlign: "center",
  },
  timezone: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  dateCard: {
    width: "48%",
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  dateCardSelected: {
    borderColor: COLORS.emerald[500],
    backgroundColor: COLORS.emerald[500] + "10",
  },
  dateCardDisabled: {
    opacity: 0.5,
  },
  dateDayName: {
    fontSize: 12,
    color: "#71717a",
  },
  dateFormatted: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
    marginVertical: 4,
  },
  dateFormattedSelected: {
    color: COLORS.emerald[500],
  },
  dateSlotCount: {
    fontSize: 12,
    color: "#71717a",
  },
  timeCards: {
    flexDirection: "row",
    gap: 12,
  },
  timeCard: {
    flex: 1,
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  timeCardSelected: {
    borderColor: COLORS.emerald[500],
    backgroundColor: COLORS.emerald[500] + "10",
  },
  timeCardDisabled: {
    opacity: 0.5,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
    marginTop: 12,
  },
  timeValue: {
    fontSize: 13,
    color: "#a1a1aa",
    marginTop: 4,
  },
  typeCards: {
    flexDirection: "row",
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  typeCardSelected: {
    borderColor: COLORS.emerald[500],
    backgroundColor: COLORS.emerald[500] + "10",
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
    marginTop: 12,
  },
  typeDesc: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
    textAlign: "center",
  },
  toolCards: {
    gap: 12,
  },
  toolCard: {
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  toolCardSelected: {
    borderColor: COLORS.emerald[500],
    backgroundColor: COLORS.emerald[500] + "10",
  },
  toolLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
  },
  toolDesc: {
    fontSize: 12,
    color: "#71717a",
  },
  confirmCard: {
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  confirmRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  confirmLabel: {
    fontSize: 14,
    color: "#71717a",
  },
  confirmValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fafafa",
  },
  confirmDivider: {
    height: 1,
    backgroundColor: "#27272a",
    marginVertical: 8,
  },
  errorBanner: {
    backgroundColor: "#ef444420",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  successSection: {
    padding: 20,
    alignItems: "center",
    paddingTop: 60,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.emerald[600],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  successText: {
    fontSize: 15,
    color: "#a1a1aa",
    marginBottom: 24,
  },
  bookingCard: {
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  bookingRef: {
    fontSize: 12,
    color: "#71717a",
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.emerald[500],
    marginBottom: 16,
  },
  bookingDateLabel: {
    fontSize: 12,
    color: "#71717a",
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fafafa",
  },
  bookingTime: {
    fontSize: 14,
    color: COLORS.emerald[500],
    marginTop: 4,
  },
  confirmationNote: {
    fontSize: 13,
    color: "#71717a",
    textAlign: "center",
    marginBottom: 24,
  },
  successButtons: {
    width: "100%",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#27272a",
    backgroundColor: "#09090b",
  },
  navButtonText: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
  },
  navButtonTextWhite: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
