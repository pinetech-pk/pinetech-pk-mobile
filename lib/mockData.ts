// Mock data for testing without backend

import type {
  UserSubmission,
  ConsultationBooking,
  DaySlots,
  ChatRoom,
  AdminUser,
} from "@/types";

// Enable/disable mock mode
export const USE_MOCK_DATA = true;

// Demo admin credentials
export const DEMO_ADMIN = {
  email: "admin@pinetech.pk",
  password: "demo123",
};

// Mock admin user
export const mockAdminUser: AdminUser = {
  id: "1",
  email: "admin@pinetech.pk",
  name: "Admin",
  role: "admin",
};

// Mock submissions
export const mockSubmissions: UserSubmission[] = [
  {
    id: 1,
    userType: "developer",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 1234567",
    message: "Looking for React Native opportunities",
    stepResponses: {
      step1: { experience: "senior" },
      step2: { skills: ["react", "nextjs", "typescript"] },
      step3: { projectType: "contract" },
      step4: { availability: "immediate", rate: "$50/hr" },
    },
    submissionType: "form",
    status: "new",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    userType: "investor",
    name: "Sarah Johnson",
    email: "sarah@venture.com",
    phone: "+1 555 9876543",
    message: "Interested in SaaS investments",
    stepResponses: {
      step1: { investmentRange: "angel" },
      step2: { sectors: ["saas", "fintech"] },
      step3: { stage: "mvp" },
      step4: { involvement: "advisor" },
    },
    submissionType: "form",
    status: "contacted",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    userType: "entrepreneur",
    name: "Ali Hassan",
    email: "ali@startup.pk",
    phone: "+92 321 5551234",
    message: "Need help building MVP for my food delivery app",
    stepResponses: {
      step1: { stage: "idea" },
      step2: { industry: "tech" },
      step3: { needs: ["development", "design", "strategy"] },
      step4: { budget: "$5000-10000", timeline: "3 months" },
    },
    submissionType: "form",
    status: "new",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    userType: "developer",
    name: "Maria Garcia",
    email: "maria@dev.com",
    phone: "+34 612 345678",
    message: "Full-stack developer seeking collaboration",
    stepResponses: {
      step1: { experience: "mid" },
      step2: { skills: ["nodejs", "react", "mongodb"] },
      step3: { projectType: "freelance" },
      step4: { availability: "2 weeks", rate: "$40/hr" },
    },
    submissionType: "form",
    status: "converted",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Generate mock available slots for the next 2 weeks
export function generateMockSlots(): DaySlots[] {
  const slots: DaySlots[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = date.getDay();
    // Only Monday (1) to Thursday (4)
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      slots.push({
        date: date.toISOString().split("T")[0],
        dayName: dayNames[dayOfWeek],
        formattedDate: `${monthNames[date.getMonth()]} ${date.getDate()}`,
        slots: {
          morning: {
            label: "Morning",
            time: "10:30 AM - 11:00 AM",
            available: Math.random() > 0.3, // 70% chance available
          },
          evening: {
            label: "Evening",
            time: "8:00 PM - 8:30 PM",
            available: Math.random() > 0.2, // 80% chance available
          },
        },
      });
    }
  }

  return slots;
}

// Mock bookings
export const mockBookings: ConsultationBooking[] = [
  {
    id: 1,
    submissionId: 3,
    name: "Ali Hassan",
    email: "ali@startup.pk",
    phone: "+92 321 5551234",
    bookingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    timeSlot: "morning",
    callType: "video",
    preferredTool: "zoom",
    status: "confirmed",
    notes: "Want to discuss MVP scope and timeline",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    submissionId: null,
    name: "John Smith",
    email: "john@company.com",
    phone: "+1 555 1234567",
    bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    timeSlot: "evening",
    callType: "voice",
    preferredTool: "whatsapp",
    status: "pending",
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock chat rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: "room-1",
    title: "Project Discussion - Ali",
    description: "MVP planning for food delivery app",
    adminNote: "Client budget: $5-10k, timeline: 3 months",
    clientNote: null,
    accessKey: "abc123",
    isActive: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "room-2",
    title: "Investment Chat - Sarah",
    description: "SaaS investment opportunities",
    adminNote: "Angel investor, looking for MVP-ready startups",
    clientNote: "Prefer fintech sector",
    accessKey: "xyz789",
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Storage for runtime data (simulates database)
let runtimeSubmissions = [...mockSubmissions];
let runtimeBookings = [...mockBookings];
let nextSubmissionId = 5;
let nextBookingId = 3;

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email: string, password: string) => {
    await delay(500); // Simulate network delay
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      return { success: true, user: mockAdminUser, token: "mock-jwt-token" };
    }
    return { success: false, error: "Invalid credentials" };
  },

  // Submissions
  getSubmissions: async () => {
    await delay(300);
    return [...runtimeSubmissions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createSubmission: async (data: Partial<UserSubmission>) => {
    await delay(500);
    const newSubmission: UserSubmission = {
      id: nextSubmissionId++,
      userType: data.userType || "developer",
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || null,
      message: data.message || null,
      stepResponses: data.stepResponses || {},
      submissionType: "form",
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    runtimeSubmissions.push(newSubmission);
    return { success: true, id: newSubmission.id, message: "Submission recorded" };
  },

  // Bookings
  getAvailableSlots: async () => {
    await delay(300);
    return { slots: generateMockSlots() };
  },

  getBookings: async () => {
    await delay(300);
    return { bookings: [...runtimeBookings] };
  },

  createBooking: async (data: Partial<ConsultationBooking>) => {
    await delay(500);
    const newBooking: ConsultationBooking = {
      id: nextBookingId++,
      submissionId: data.submissionId || null,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      bookingDate: data.bookingDate || "",
      timeSlot: data.timeSlot || "morning",
      callType: data.callType || "voice",
      preferredTool: data.preferredTool || "phone",
      status: "pending",
      notes: data.notes || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    runtimeBookings.push(newBooking);
    return { success: true, booking: newBooking, message: "Booking confirmed" };
  },

  // Chat rooms
  getChatRooms: async () => {
    await delay(300);
    return { rooms: [...mockChatRooms] };
  },
};

// Helper function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
