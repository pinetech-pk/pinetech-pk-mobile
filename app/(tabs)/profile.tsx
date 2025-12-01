// Profile/About screen

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  MapPin,
  Mail,
  Globe,
  Twitter,
  Github,
  Linkedin,
  Settings,
  Shield,
} from "lucide-react-native";
import { Header } from "@/components/shared";
import { Button, Card, CardContent } from "@/components/ui";
import { COLORS, SITE_CONFIG } from "@/lib/constants";
import { useAuth } from "@/hooks";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header title="About" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>PT</Text>
          </View>
          <Text style={styles.name}>{SITE_CONFIG.name}</Text>
          <Text style={styles.title}>Full-Stack Developer</Text>

          <View style={styles.locationRow}>
            <MapPin size={16} color="#71717a" />
            <Text style={styles.location}>Karachi, Pakistan</Text>
          </View>
        </View>

        {/* Bio */}
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.bioTitle}>About Me</Text>
            <Text style={styles.bioText}>
              I'm a passionate full-stack developer specializing in React,
              Next.js, and Node.js. I help startups and entrepreneurs turn
              their ideas into production-ready applications.
            </Text>
            <Text style={styles.bioText}>
              With a focus on fast prototyping and clean code, I deliver
              solutions that are both functional and scalable.
            </Text>
          </CardContent>
        </Card>

        {/* Contact Links */}
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Get in Touch</Text>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => handleLink(`mailto:hello@pinetech.pk`)}
            >
              <Mail size={20} color={COLORS.pine[500]} />
              <Text style={styles.linkText}>hello@pinetech.pk</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => handleLink(SITE_CONFIG.url)}
            >
              <Globe size={20} color={COLORS.pine[500]} />
              <Text style={styles.linkText}>pinetech.pk</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => handleLink("https://twitter.com/pinetech_pk")}
            >
              <Twitter size={20} color="#1DA1F2" />
              <Text style={styles.linkText}>@pinetech_pk</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => handleLink("https://github.com/pinetech-pk")}
            >
              <Github size={20} color="#f5f5f5" />
              <Text style={styles.linkText}>github.com/pinetech-pk</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => handleLink("https://linkedin.com/company/pinetech-pk")}
            >
              <Linkedin size={20} color="#0077B5" />
              <Text style={styles.linkText}>LinkedIn</Text>
            </TouchableOpacity>
          </CardContent>
        </Card>

        {/* Admin Access */}
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Admin Access</Text>

            {isAuthenticated && isAdmin ? (
              <Button
                variant="pine"
                onPress={() => router.push("/admin")}
                fullWidth
              >
                <Settings size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Open Dashboard</Text>
              </Button>
            ) : (
              <Button
                variant="outline"
                onPress={() => router.push("/(auth)/admin-login")}
                fullWidth
              >
                <Shield size={18} color="#e5e7eb" style={{ marginRight: 8 }} />
                <Text style={styles.outlineButtonText}>Admin Login</Text>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>PineTech Mobile v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with Expo & React Native</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.pine[600],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: COLORS.pine[500],
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "#71717a",
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: "#a1a1aa",
    lineHeight: 22,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 16,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  linkText: {
    fontSize: 15,
    color: "#e4e4e7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButtonText: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 32,
  },
  appInfoText: {
    fontSize: 12,
    color: "#52525b",
    marginBottom: 4,
  },
});
