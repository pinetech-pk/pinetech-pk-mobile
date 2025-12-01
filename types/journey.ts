// Journey step types - matching web app
import { UserType } from "./api";

// Developer Journey Steps
export interface DeveloperStep1Data {
  experience: string | null;
}

export interface DeveloperStep2Data {
  skills: string[];
}

export interface DeveloperStep3Data {
  projectType: string | null;
}

export interface DeveloperStep4Data {
  availability: string | null;
  rate: string | null;
}

// Investor Journey Steps
export interface InvestorStep1Data {
  investmentRange: string | null;
}

export interface InvestorStep2Data {
  sectors: string[];
}

export interface InvestorStep3Data {
  stage: string | null;
}

export interface InvestorStep4Data {
  involvement: string | null;
  timeline: string | null;
}

// Entrepreneur Journey Steps
export interface EntrepreneurStep1Data {
  stage: string | null;
}

export interface EntrepreneurStep2Data {
  industry: string | null;
}

export interface EntrepreneurStep3Data {
  needs: string[];
}

export interface EntrepreneurStep4Data {
  budget: string | null;
  timeline: string | null;
}

// Contact form data
export interface FinalFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Combined journey form data
export interface JourneyFormData {
  userType: UserType | null;
  step1:
    | DeveloperStep1Data
    | InvestorStep1Data
    | EntrepreneurStep1Data
    | null;
  step2:
    | DeveloperStep2Data
    | InvestorStep2Data
    | EntrepreneurStep2Data
    | null;
  step3:
    | DeveloperStep3Data
    | InvestorStep3Data
    | EntrepreneurStep3Data
    | null;
  step4:
    | DeveloperStep4Data
    | InvestorStep4Data
    | EntrepreneurStep4Data
    | null;
  finalForm: FinalFormData;
}

// Journey step config
export interface JourneyStepConfig {
  title: string;
  description: string;
  options?: { value: string; label: string; description?: string }[];
  multiSelect?: boolean;
  inputType?: "select" | "multiselect" | "text" | "textarea";
}

// Developer journey steps config
export const DEVELOPER_STEPS: Record<number, JourneyStepConfig> = {
  1: {
    title: "Experience Level",
    description: "What's your development experience?",
    options: [
      { value: "junior", label: "Junior", description: "0-2 years" },
      { value: "mid", label: "Mid-Level", description: "2-5 years" },
      { value: "senior", label: "Senior", description: "5+ years" },
      { value: "lead", label: "Tech Lead", description: "Leading teams" },
    ],
    inputType: "select",
  },
  2: {
    title: "Tech Stack",
    description: "Select your primary skills",
    options: [
      { value: "react", label: "React" },
      { value: "nextjs", label: "Next.js" },
      { value: "nodejs", label: "Node.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "mongodb", label: "MongoDB" },
      { value: "postgresql", label: "PostgreSQL" },
      { value: "react-native", label: "React Native" },
      { value: "aws", label: "AWS" },
    ],
    inputType: "multiselect",
    multiSelect: true,
  },
  3: {
    title: "Project Interest",
    description: "What type of projects interest you?",
    options: [
      { value: "fulltime", label: "Full-time Position" },
      { value: "contract", label: "Contract Work" },
      { value: "freelance", label: "Freelance Projects" },
      { value: "collaborate", label: "Collaboration" },
    ],
    inputType: "select",
  },
  4: {
    title: "Availability & Rate",
    description: "When can you start and your rate expectations?",
    inputType: "text",
  },
};

// Investor journey steps config
export const INVESTOR_STEPS: Record<number, JourneyStepConfig> = {
  1: {
    title: "Investment Range",
    description: "What's your typical investment size?",
    options: [
      { value: "seed", label: "$10K - $50K", description: "Seed Stage" },
      { value: "angel", label: "$50K - $250K", description: "Angel Investment" },
      { value: "series-a", label: "$250K - $1M", description: "Series A" },
      { value: "growth", label: "$1M+", description: "Growth Stage" },
    ],
    inputType: "select",
  },
  2: {
    title: "Sectors",
    description: "Which sectors interest you?",
    options: [
      { value: "fintech", label: "FinTech" },
      { value: "healthtech", label: "HealthTech" },
      { value: "edtech", label: "EdTech" },
      { value: "ecommerce", label: "E-Commerce" },
      { value: "saas", label: "SaaS" },
      { value: "ai-ml", label: "AI/ML" },
    ],
    inputType: "multiselect",
    multiSelect: true,
  },
  3: {
    title: "Stage Preference",
    description: "What stage companies do you prefer?",
    options: [
      { value: "idea", label: "Idea Stage" },
      { value: "mvp", label: "MVP Ready" },
      { value: "revenue", label: "Revenue Generating" },
      { value: "scaling", label: "Scaling" },
    ],
    inputType: "select",
  },
  4: {
    title: "Involvement",
    description: "How involved do you want to be?",
    options: [
      { value: "passive", label: "Passive Investor" },
      { value: "advisor", label: "Advisor Role" },
      { value: "board", label: "Board Position" },
      { value: "hands-on", label: "Hands-on Partner" },
    ],
    inputType: "select",
  },
};

// Entrepreneur journey steps config
export const ENTREPRENEUR_STEPS: Record<number, JourneyStepConfig> = {
  1: {
    title: "Business Stage",
    description: "Where is your business currently?",
    options: [
      { value: "idea", label: "Just an Idea" },
      { value: "prototype", label: "Building Prototype" },
      { value: "launched", label: "Launched MVP" },
      { value: "growing", label: "Growing Business" },
    ],
    inputType: "select",
  },
  2: {
    title: "Industry",
    description: "What industry are you in?",
    options: [
      { value: "tech", label: "Technology" },
      { value: "retail", label: "Retail" },
      { value: "services", label: "Services" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "other", label: "Other" },
    ],
    inputType: "select",
  },
  3: {
    title: "Your Needs",
    description: "What do you need help with?",
    options: [
      { value: "development", label: "Product Development" },
      { value: "design", label: "UI/UX Design" },
      { value: "strategy", label: "Business Strategy" },
      { value: "funding", label: "Funding" },
      { value: "marketing", label: "Marketing" },
      { value: "operations", label: "Operations" },
    ],
    inputType: "multiselect",
    multiSelect: true,
  },
  4: {
    title: "Budget & Timeline",
    description: "What's your budget and timeline?",
    inputType: "text",
  },
};
