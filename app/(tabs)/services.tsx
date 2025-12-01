// Services/Skills screen

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Code,
  Server,
  Shield,
  Cloud,
  Wrench,
  Smartphone,
} from "lucide-react-native";
import { Header } from "@/components/shared";
import { Badge } from "@/components/ui";
import { COLORS, TECH_STACK } from "@/lib/constants";

const SERVICES = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "Modern, responsive web applications with React and Next.js",
    color: "#3b82f6",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable APIs and server-side solutions with Node.js",
    color: "#22c55e",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps with React Native",
    color: "#a855f7",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Secure auth implementations with Kinde, Auth0, JWT",
    color: "#f59e0b",
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description: "Deployment on Vercel, Railway, Digital Ocean",
    color: "#06b6d4",
  },
  {
    icon: Wrench,
    title: "Fast Prototyping",
    description: "Quick MVP development for startups and entrepreneurs",
    color: "#ec4899",
  },
];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Header title="Services & Skills" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What I Offer</Text>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <View key={index} style={styles.serviceCard}>
                  <View
                    style={[
                      styles.serviceIcon,
                      { backgroundColor: service.color + "20" },
                    ]}
                  >
                    <Icon size={24} color={service.color} />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDesc}>{service.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tech Stack */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tech Stack</Text>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Frontend</Text>
            <View style={styles.techTags}>
              {TECH_STACK.frontend.map((tech) => (
                <Badge key={tech} variant="secondary" style={styles.techBadge}>
                  {tech}
                </Badge>
              ))}
            </View>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Backend</Text>
            <View style={styles.techTags}>
              {TECH_STACK.backend.map((tech) => (
                <Badge key={tech} variant="secondary" style={styles.techBadge}>
                  {tech}
                </Badge>
              ))}
            </View>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Authentication</Text>
            <View style={styles.techTags}>
              {TECH_STACK.auth.map((tech) => (
                <Badge key={tech} variant="secondary" style={styles.techBadge}>
                  {tech}
                </Badge>
              ))}
            </View>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Tools & Services</Text>
            <View style={styles.techTags}>
              {TECH_STACK.tools.map((tech) => (
                <Badge key={tech} variant="secondary" style={styles.techBadge}>
                  {tech}
                </Badge>
              ))}
            </View>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Deployment</Text>
            <View style={styles.techTags}>
              {TECH_STACK.deployment.map((tech) => (
                <Badge key={tech} variant="secondary" style={styles.techBadge}>
                  {tech}
                </Badge>
              ))}
            </View>
          </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 20,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    color: "#a1a1aa",
    lineHeight: 20,
  },
  techSection: {
    marginBottom: 20,
  },
  techCategory: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.pine[500],
    marginBottom: 8,
  },
  techTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  techBadge: {
    marginRight: 0,
  },
});
