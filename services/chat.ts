// Chat service
// Note: Full Pusher integration would require pusher-js for React Native

import { api } from "./api";
import type { ChatRoom, ChatMessage } from "@/types";

/**
 * Get all chat rooms (admin only)
 */
export async function getChatRooms(): Promise<{ rooms: ChatRoom[] }> {
  return api.get<{ rooms: ChatRoom[] }>("/api/chat/rooms", {
    requiresAuth: true,
  });
}

/**
 * Create a new chat room (admin only)
 */
export async function createChatRoom(data: {
  title: string;
  description?: string;
  adminNote?: string;
}): Promise<{ room: ChatRoom }> {
  return api.post<{ room: ChatRoom }>("/api/chat/rooms", data, {
    requiresAuth: true,
  });
}

/**
 * Get chat room by ID
 * For clients, requires accessKey
 */
export async function getChatRoom(
  roomId: string,
  accessKey?: string
): Promise<{ room: ChatRoom } | null> {
  try {
    const endpoint = accessKey
      ? `/api/chat/rooms/${roomId}?accessKey=${accessKey}`
      : `/api/chat/rooms/${roomId}`;

    return api.get<{ room: ChatRoom }>(endpoint, {
      requiresAuth: !accessKey,
    });
  } catch {
    return null;
  }
}

/**
 * Send a chat message
 */
export async function sendMessage(data: {
  roomId: string;
  message: string;
  accessKey?: string;
}): Promise<{ success: boolean; message?: ChatMessage }> {
  return api.post<{ success: boolean; message?: ChatMessage }>(
    "/api/chat/message",
    data
  );
}

/**
 * Update room notes
 */
export async function updateRoomNotes(
  roomId: string,
  data: {
    adminNote?: string;
    clientNote?: string;
    accessKey?: string;
  }
): Promise<{ room: ChatRoom }> {
  return api.patch<{ room: ChatRoom }>(`/api/chat/rooms/${roomId}`, data, {
    requiresAuth: !data.accessKey,
  });
}

/**
 * Toggle room active status (admin only)
 */
export async function toggleRoomStatus(
  roomId: string,
  isActive: boolean
): Promise<{ room: ChatRoom }> {
  return api.patch<{ room: ChatRoom }>(
    `/api/chat/rooms/${roomId}`,
    { isActive },
    { requiresAuth: true }
  );
}

// Note: Real-time chat functionality would require:
// 1. Installing pusher-js for React Native
// 2. Setting up Pusher client similar to web app
// 3. Handling presence channels and typing indicators
// This would be implemented in a separate hook: useChat
