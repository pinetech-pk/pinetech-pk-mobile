// User journey hook - wrapper around journey store

import { useJourneyStore } from "@/store";
import {
  DEVELOPER_STEPS,
  INVESTOR_STEPS,
  ENTREPRENEUR_STEPS,
} from "@/types/journey";

export function useUserJourney() {
  const {
    currentStep,
    formData,
    isSubmitting,
    submissionResult,
    selectCategory,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    updateFormData,
    isStepValid,
    submitForm,
    resetJourney,
  } = useJourneyStore();

  // Get step config based on user type
  const getStepConfig = (step: number) => {
    if (step < 1 || step > 4) return null;

    switch (formData.userType) {
      case "developer":
        return DEVELOPER_STEPS[step];
      case "investor":
        return INVESTOR_STEPS[step];
      case "entrepreneur":
        return ENTREPRENEUR_STEPS[step];
      default:
        return null;
    }
  };

  // Get progress percentage
  const progress = (currentStep / 5) * 100;

  // Check if can go back
  const canGoBack = currentStep > 0 && currentStep <= 5;

  // Check if can proceed to next step
  const canProceed = isStepValid(currentStep);

  // Check if on final step (contact form)
  const isFinalStep = currentStep === 5;

  // Check if journey is complete
  const isComplete = currentStep === 6 && submissionResult?.success;

  return {
    // State
    currentStep,
    formData,
    isSubmitting,
    submissionResult,
    progress,
    canGoBack,
    canProceed,
    isFinalStep,
    isComplete,

    // Actions
    selectCategory,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    updateFormData,
    isStepValid,
    submitForm,
    resetJourney,

    // Helpers
    getStepConfig,
  };
}
