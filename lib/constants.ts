// App configuration - matching web app constants

export const SITE_CONFIG = {
  name: "PineTech.pk",
  title: "PineTech.pk - React & Next.js Developer from Karachi",
  description:
    "Modern web applications built with React, Next.js, and JavaScript. Fast prototyping, affordable projects, and full-stack development services from Karachi, Pakistan.",
  url: "https://pinetech.pk",
  creator: "@pinetech_pk",
} as const;

// API Base URL - update this for production
export const API_BASE_URL = __DEV__
  ? "http://localhost:3000" // Development
  : "https://pinetech.pk"; // Production

// Projects showcase
export const PROJECTS = {
  mealPlanner: {
    name: "Meal Planner",
    description:
      "Universal meal planning with convenience, health, and budget focus",
    stack: [
      "Next.js",
      "React",
      "Express",
      "Node.js",
      "ShadCN",
      "Cloudinary",
      "Sentry",
    ],
    role: "Business Strategist, Founder & Full-Stack Developer",
    status: "In Production",
  },
  impactMeter: {
    name: "Impact Meter - MIF",
    description:
      "Transparency tool connecting donors and beneficiaries with real-time impact tracking",
    stack: ["Next.js", "React", "Node.js", "Data Visualization"],
    role: "Social Innovation Strategist, Systems Designer & Developer",
    status: "In Production",
  },
  nikahFirst: {
    name: "Nikah First",
    description:
      "Modern matrimonial platform with free tier and multi-profile management",
    stack: ["Next.js", "React", "MongoDB", "Auth0", "Credits System"],
    role: "Market Analyst, Product Strategist & Developer",
    status: "In Production",
  },
  tadawulInsight: {
    name: "Tadawul Insight",
    description:
      "Saudi stock market community with curated content and signal validation",
    stack: ["Next.js", "React", "Role-based Access", "Content Management"],
    role: "Fintech Strategist, Platform Architect & Developer",
    status: "In Production",
  },
} as const;

// Tech stack
export const TECH_STACK = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN/UI"],
  backend: ["Node.js", "Express", "MongoDB"],
  auth: ["Kinde", "Auth0", "JWT"],
  tools: ["Cloudinary", "Sentry", "AI Integration"],
  deployment: ["Vercel", "Railway", "Digital Ocean"],
} as const;

// Theme colors
export const COLORS = {
  pine: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  emerald: {
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
  },
} as const;

// Booking time slots
export const TIME_SLOTS = {
  morning: {
    label: "Morning",
    time: "10:30 AM - 11:00 AM",
    icon: "sun",
  },
  evening: {
    label: "Evening",
    time: "8:00 PM - 8:30 PM",
    icon: "moon",
  },
} as const;

// Call types
export const CALL_TYPES = {
  voice: {
    label: "Voice Only",
    description: "Audio call without video",
    icon: "phone",
  },
  video: {
    label: "Video Call",
    description: "Face-to-face video meeting",
    icon: "video",
  },
} as const;

// Preferred tools for calls
export const PREFERRED_TOOLS = {
  phone: {
    label: "Phone Call",
    description: "Direct phone call",
    icon: "phone",
  },
  whatsapp: {
    label: "WhatsApp",
    description: "WhatsApp Call",
    icon: "message-circle",
  },
  zoom: {
    label: "Zoom",
    description: "Zoom meeting link",
    icon: "video",
  },
} as const;

// User types for journey
export const USER_TYPES = {
  developer: {
    label: "Developer",
    description: "I'm a developer looking to collaborate or find opportunities",
    icon: "code",
    color: "#3b82f6", // blue
  },
  investor: {
    label: "Investor",
    description: "I'm looking to invest in promising tech projects",
    icon: "trending-up",
    color: "#22c55e", // green
  },
  entrepreneur: {
    label: "Entrepreneur",
    description: "I have a business idea and need tech expertise",
    icon: "lightbulb",
    color: "#a855f7", // purple
  },
} as const;
