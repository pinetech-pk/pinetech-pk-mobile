// User Journey screen - multi-step form

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Code,
  TrendingUp,
  Rocket,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react-native";
import { Header } from "@/components/shared";
import { Button, Card, CardContent, Input, TextArea, Badge } from "@/components/ui";
import { COLORS, USER_TYPES } from "@/lib/constants";
import { useUserJourney } from "@/hooks";

export default function JourneyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    currentStep,
    formData,
    isSubmitting,
    submissionResult,
    progress,
    canGoBack,
    canProceed,
    isFinalStep,
    isComplete,
    selectCategory,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetJourney,
    getStepConfig,
  } = useUserJourney();

  const handleClose = () => {
    resetJourney();
    router.back();
  };

  // Render category selection (step 0)
  const renderCategorySelection = () => (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>Who are you?</Text>
      <Text style={styles.categorySubtitle}>
        Select what best describes you to personalize your journey
      </Text>

      <View style={styles.categoryCards}>
        {Object.entries(USER_TYPES).map(([key, value]) => {
          const Icon =
            key === "developer" ? Code : key === "investor" ? TrendingUp : Rocket;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.categoryCard]}
              onPress={() => selectCategory(key as "developer" | "investor" | "entrepreneur")}
            >
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: value.color + "20" },
                ]}
              >
                <Icon size={28} color={value.color} />
              </View>
              <Text style={styles.categoryCardTitle}>{value.label}</Text>
              <Text style={styles.categoryCardDesc}>{value.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render step content (steps 1-4)
  const renderStepContent = () => {
    const stepConfig = getStepConfig(currentStep);
    if (!stepConfig) return null;

    return (
      <View style={styles.stepSection}>
        <Text style={styles.stepTitle}>{stepConfig.title}</Text>
        <Text style={styles.stepDescription}>{stepConfig.description}</Text>

        {stepConfig.inputType === "select" && stepConfig.options && (
          <View style={styles.optionsGrid}>
            {stepConfig.options.map((option) => {
              const stepKey = `step${currentStep}` as "step1" | "step2" | "step3" | "step4";
              const currentData = formData[stepKey] as Record<string, unknown> | null;
              const selectedValue = currentData && Object.values(currentData)[0];
              const isSelected = selectedValue === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => {
                    const key = Object.keys(
                      formData[stepKey] || { value: null }
                    )[0] || "value";
                    updateFormData(stepKey, { [key]: option.value } as never);
                  }}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text style={styles.optionDesc}>{option.description}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {stepConfig.inputType === "multiselect" && stepConfig.options && (
          <View style={styles.optionsGrid}>
            {stepConfig.options.map((option) => {
              const stepKey = `step${currentStep}` as "step2" | "step3";
              const currentData = formData[stepKey] as Record<string, string[]> | null;
              const selectedArray = currentData
                ? (Object.values(currentData)[0] as string[])
                : [];
              const isSelected = selectedArray.includes(option.value);

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    styles.optionCardSmall,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => {
                    const key = Object.keys(currentData || { values: [] })[0] || "values";
                    const newValues = isSelected
                      ? selectedArray.filter((v) => v !== option.value)
                      : [...selectedArray, option.value];
                    updateFormData(stepKey, { [key]: newValues } as never);
                  }}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  // Render contact form (step 5)
  const renderContactForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Contact Information</Text>
      <Text style={styles.stepDescription}>
        How can we reach you?
      </Text>

      <Input
        label="Full Name *"
        placeholder="Your full name"
        value={formData.finalForm.name}
        onChangeText={(text) =>
          updateFormData("finalForm", { ...formData.finalForm, name: text })
        }
      />

      <Input
        label="Email Address *"
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.finalForm.email}
        onChangeText={(text) =>
          updateFormData("finalForm", { ...formData.finalForm, email: text })
        }
      />

      <Input
        label="Phone Number *"
        placeholder="+92 300 1234567"
        keyboardType="phone-pad"
        value={formData.finalForm.phone}
        onChangeText={(text) =>
          updateFormData("finalForm", { ...formData.finalForm, phone: text })
        }
      />

      <TextArea
        label="Message (Optional)"
        placeholder="Tell us more about your needs..."
        value={formData.finalForm.message}
        onChangeText={(text) =>
          updateFormData("finalForm", { ...formData.finalForm, message: text })
        }
      />

      {submissionResult?.success === false && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{submissionResult.message}</Text>
        </View>
      )}
    </View>
  );

  // Render success page (step 6)
  const renderSuccess = () => (
    <View style={styles.successSection}>
      <View style={styles.successIcon}>
        <Check size={40} color="#fff" />
      </View>
      <Text style={styles.successTitle}>Thank You!</Text>
      <Text style={styles.successText}>
        Your submission has been received. We'll be in touch soon!
      </Text>

      {submissionResult?.id && (
        <Badge variant="success" style={styles.refBadge}>
          Reference: #{submissionResult.id}
        </Badge>
      )}

      <View style={styles.successButtons}>
        <Button
          variant="pine"
          onPress={() => router.push("/booking")}
          fullWidth
        >
          Book a Consultation
        </Button>
        <Button variant="outline" onPress={handleClose} fullWidth>
          Back to Home
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Let's Work Together"
        showBack={currentStep > 0 && currentStep < 6}
        onBack={goToPreviousStep}
        rightContent={
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#a1a1aa" />
          </TouchableOpacity>
        }
      />

      {/* Progress bar */}
      {currentStep > 0 && currentStep < 6 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Step {currentStep} of 5
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {currentStep === 0 && renderCategorySelection()}
        {currentStep >= 1 && currentStep <= 4 && renderStepContent()}
        {currentStep === 5 && renderContactForm()}
        {currentStep === 6 && renderSuccess()}
      </ScrollView>

      {/* Navigation buttons */}
      {currentStep > 0 && currentStep <= 5 && (
        <View style={[styles.navButtons, { paddingBottom: insets.bottom + 16 }]}>
          <Button
            variant="outline"
            onPress={goToPreviousStep}
            disabled={!canGoBack}
          >
            <ArrowLeft size={18} color="#e5e7eb" style={{ marginRight: 8 }} />
            <Text style={styles.navButtonText}>Back</Text>
          </Button>

          {isFinalStep ? (
            <Button
              variant="pine"
              onPress={submitForm}
              disabled={!canProceed}
              loading={isSubmitting}
            >
              <Text style={styles.navButtonTextWhite}>Submit</Text>
              <Check size={18} color="#fff" style={{ marginLeft: 8 }} />
            </Button>
          ) : (
            <Button
              variant="pine"
              onPress={goToNextStep}
              disabled={!canProceed}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#27272a",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.pine[500],
  },
  progressText: {
    fontSize: 12,
    color: "#71717a",
  },
  categorySection: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
    textAlign: "center",
  },
  categorySubtitle: {
    fontSize: 15,
    color: "#a1a1aa",
    textAlign: "center",
    marginBottom: 32,
  },
  categoryCards: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  categoryCardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 8,
  },
  categoryCardDesc: {
    fontSize: 14,
    color: "#a1a1aa",
    textAlign: "center",
  },
  stepSection: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    color: "#a1a1aa",
    marginBottom: 24,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionCard: {
    width: "100%",
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  optionCardSmall: {
    width: "48%",
    padding: 12,
  },
  optionCardSelected: {
    borderColor: COLORS.pine[500],
    backgroundColor: COLORS.pine[500] + "10",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e4e4e7",
  },
  optionLabelSelected: {
    color: COLORS.pine[500],
  },
  optionDesc: {
    fontSize: 13,
    color: "#71717a",
    marginTop: 4,
  },
  formSection: {
    padding: 20,
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
    backgroundColor: COLORS.pine[600],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: "#a1a1aa",
    textAlign: "center",
    marginBottom: 24,
  },
  refBadge: {
    marginBottom: 32,
  },
  successButtons: {
    width: "100%",
    gap: 12,
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
