// Admin login screen

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Shield, Mail, Lock } from "lucide-react-native";
import { Header } from "@/components/shared";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { COLORS } from "@/lib/constants";
import { useAuth } from "@/hooks";

export default function AdminLoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    clearError();
    const success = await login(email, password);
    if (success) {
      router.replace("/admin");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Admin Login" showBack onBack={() => router.back()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Shield size={40} color={COLORS.pine[500]} />
          </View>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>
            Sign in to access the admin dashboard
          </Text>
        </View>

        <Card style={styles.formCard}>
          <CardContent>
            <View style={styles.inputRow}>
              <Mail size={20} color="#71717a" style={styles.inputIcon} />
              <Input
                placeholder="admin@pinetech.pk"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                containerStyle={styles.inputContainer}
              />
            </View>

            <View style={styles.inputRow}>
              <Lock size={20} color="#71717a" style={styles.inputIcon} />
              <Input
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                containerStyle={styles.inputContainer}
              />
            </View>

            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Button
              variant="pine"
              onPress={handleLogin}
              loading={isLoading}
              disabled={!email || !password}
              fullWidth
              style={styles.loginButton}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>

        <Text style={styles.note}>
          This area is restricted to authorized administrators only.
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.pine[500] + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#a1a1aa",
  },
  formCard: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  inputIcon: {
    marginTop: 14,
    marginRight: 12,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 8,
  },
  errorBanner: {
    backgroundColor: "#ef444420",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 8,
  },
  note: {
    fontSize: 12,
    color: "#52525b",
    textAlign: "center",
  },
});
