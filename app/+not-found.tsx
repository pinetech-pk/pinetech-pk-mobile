// 404 Not Found screen

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Home, AlertCircle } from "lucide-react-native";
import { Button } from "@/components/ui";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AlertCircle size={64} color="#ef4444" style={styles.icon} />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.message}>
        The page you're looking for doesn't exist or has been moved.
      </Text>

      <Button
        variant="pine"
        onPress={() => router.replace("/")}
        style={styles.button}
      >
        <Home size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Go Home</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: "#a1a1aa",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
