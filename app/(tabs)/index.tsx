// Home screen

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Code,
  Rocket,
  TrendingUp,
} from "lucide-react-native";
import { Logo } from "@/components/shared";
import { Button } from "@/components/ui";
import { COLORS, SITE_CONFIG } from "@/lib/constants";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Logo size="lg" />
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.tagline}>React & Next.js Developer</Text>
        <Text style={styles.heroTitle}>
          Building Modern{"\n"}
          <Text style={styles.heroHighlight}>Web Applications</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Fast prototyping, affordable projects, and full-stack development
          services from Karachi, Pakistan.
        </Text>

        <View style={styles.heroButtons}>
          <Button
            variant="pine"
            size="lg"
            onPress={() => router.push("/journey")}
            style={styles.primaryButton}
          >
            <Text style={styles.buttonText}>Let's Work Together</Text>
            <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onPress={() => router.push("/booking")}
          >
            <Calendar size={20} color="#e5e7eb" style={{ marginRight: 8 }} />
            <Text style={styles.outlineButtonText}>Book Consultation</Text>
          </Button>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What are you looking for?</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/journey")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#3b82f620" }]}>
              <Code size={24} color="#3b82f6" />
            </View>
            <Text style={styles.actionTitle}>Developer</Text>
            <Text style={styles.actionDesc}>Looking to collaborate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/journey")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#22c55e20" }]}>
              <TrendingUp size={24} color="#22c55e" />
            </View>
            <Text style={styles.actionTitle}>Investor</Text>
            <Text style={styles.actionDesc}>Explore opportunities</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/journey")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#a855f720" }]}>
              <Rocket size={24} color="#a855f7" />
            </View>
            <Text style={styles.actionTitle}>Entrepreneur</Text>
            <Text style={styles.actionDesc}>Build your idea</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/booking")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#f59e0b20" }]}>
              <MessageSquare size={24} color="#f59e0b" />
            </View>
            <Text style={styles.actionTitle}>Quick Chat</Text>
            <Text style={styles.actionDesc}>Book a free call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4+</Text>
          <Text style={styles.statLabel}>Projects in Production</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5+</Text>
          <Text style={styles.statLabel}>Years Experience</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statLabel}>Technologies</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.pine[500],
    fontWeight: "600",
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fafafa",
    lineHeight: 44,
    marginBottom: 16,
  },
  heroHighlight: {
    color: COLORS.pine[500],
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#a1a1aa",
    lineHeight: 24,
    marginBottom: 32,
  },
  heroButtons: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 13,
    color: "#71717a",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: "#18181b",
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.pine[500],
  },
  statLabel: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
    textAlign: "center",
  },
});
