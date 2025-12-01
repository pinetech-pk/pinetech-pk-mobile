// Journey store using Zustand

import { create } from "zustand";
import type { UserType } from "@/types";
import type {
  JourneyFormData,
  FinalFormData,
  DeveloperStep1Data,
  DeveloperStep2Data,
  DeveloperStep3Data,
  DeveloperStep4Data,
  InvestorStep1Data,
  InvestorStep2Data,
  InvestorStep3Data,
  InvestorStep4Data,
  EntrepreneurStep1Data,
  EntrepreneurStep2Data,
  EntrepreneurStep3Data,
  EntrepreneurStep4Data,
} from "@/types";
import { createSubmission } from "@/services/submissions";

type StepData =
  | DeveloperStep1Data
  | DeveloperStep2Data
  | DeveloperStep3Data
  | DeveloperStep4Data
  | InvestorStep1Data
  | InvestorStep2Data
  | InvestorStep3Data
  | InvestorStep4Data
  | EntrepreneurStep1Data
  | EntrepreneurStep2Data
  | EntrepreneurStep3Data
  | EntrepreneurStep4Data
  | FinalFormData;

const initialFormData: JourneyFormData = {
  userType: null,
  step1: null,
  step2: null,
  step3: null,
  step4: null,
  finalForm: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
};

interface JourneyState {
  currentStep: number;
  formData: JourneyFormData;
  isSubmitting: boolean;
  submissionResult: {
    success: boolean;
    id?: number;
    message: string;
  } | null;

  // Actions
  selectCategory: (userType: UserType) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setCurrentStep: (step: number) => void;
  updateFormData: (
    step: "step1" | "step2" | "step3" | "step4" | "finalForm",
    data: StepData
  ) => void;
  isStepValid: (step: number) => boolean;
  submitForm: () => Promise<boolean>;
  resetJourney: () => void;
}

export const useJourneyStore = create<JourneyState>((set, get) => ({
  currentStep: 0,
  formData: { ...initialFormData },
  isSubmitting: false,
  submissionResult: null,

  selectCategory: (userType: UserType) => {
    set({
      formData: {
        ...initialFormData,
        userType,
      },
      currentStep: 1,
    });
  },

  goToNextStep: () => {
    const { currentStep, isStepValid } = get();
    if (isStepValid(currentStep) && currentStep < 5) {
      set({ currentStep: currentStep + 1 });
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  updateFormData: (step, data) => {
    const { formData } = get();
    set({
      formData: {
        ...formData,
        [step]: data,
      },
    });
  },

  isStepValid: (step: number) => {
    const { formData } = get();

    switch (step) {
      case 0:
        return formData.userType !== null;
      case 1:
        return formData.step1 !== null;
      case 2:
        if (formData.step2 === null) return false;
        // Check for multiselect steps - need at least one selection
        if ("skills" in formData.step2) {
          return (formData.step2 as DeveloperStep2Data).skills.length > 0;
        }
        if ("sectors" in formData.step2) {
          return (formData.step2 as InvestorStep2Data).sectors.length > 0;
        }
        return true;
      case 3:
        if (formData.step3 === null) return false;
        if ("needs" in formData.step3) {
          return (formData.step3 as EntrepreneurStep3Data).needs.length > 0;
        }
        return true;
      case 4:
        return formData.step4 !== null;
      case 5:
        const { name, email, phone } = formData.finalForm;
        return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
      default:
        return true;
    }
  },

  submitForm: async () => {
    const { formData } = get();

    if (!formData.userType) return false;

    set({ isSubmitting: true, submissionResult: null });

    try {
      const response = await createSubmission({
        userType: formData.userType,
        name: formData.finalForm.name,
        email: formData.finalForm.email,
        phone: formData.finalForm.phone,
        message: formData.finalForm.message,
        stepResponses: {
          step1: (formData.step1 ?? undefined) as unknown as Record<string, unknown> | undefined,
          step2: (formData.step2 ?? undefined) as unknown as Record<string, unknown> | undefined,
          step3: (formData.step3 ?? undefined) as unknown as Record<string, unknown> | undefined,
          step4: (formData.step4 ?? undefined) as unknown as Record<string, unknown> | undefined,
        },
        submissionType: "form",
      });

      set({
        isSubmitting: false,
        submissionResult: response,
        currentStep: response.success ? 6 : 5,
      });

      return response.success;
    } catch (error) {
      set({
        isSubmitting: false,
        submissionResult: {
          success: false,
          message:
            error instanceof Error ? error.message : "Submission failed",
        },
      });
      return false;
    }
  },

  resetJourney: () => {
    set({
      currentStep: 0,
      formData: { ...initialFormData },
      isSubmitting: false,
      submissionResult: null,
    });
  },
}));
