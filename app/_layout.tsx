// Root layout for the app

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useAuthStore } from "@/store";
import "../global.css";

export default function RootLayout() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Check auth status on app start
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#09090b" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="journey/index"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="booking/index"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="chat/[roomId]" />
          <Stack.Screen name="(auth)/admin-login" />
          <Stack.Screen name="admin" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
