// Projects screen

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLink, CheckCircle } from "lucide-react-native";
import { Header } from "@/components/shared";
import { Card, CardContent, Badge } from "@/components/ui";
import { COLORS, PROJECTS } from "@/lib/constants";

export default function ProjectsScreen() {
  const insets = useSafeAreaInsets();

  const projectsList = Object.values(PROJECTS);

  return (
    <View style={styles.container}>
      <Header title="Projects" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Production Projects</Text>
          <Text style={styles.introText}>
            A selection of projects I've built and shipped. Each one represents
            a unique challenge and solution.
          </Text>
        </View>

        <View style={styles.projectsList}>
          {projectsList.map((project, index) => (
            <Card key={index} style={styles.projectCard}>
              <CardContent style={styles.projectContent}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Badge variant="success">
                    <View style={styles.statusBadge}>
                      <CheckCircle size={12} color={COLORS.pine[500]} />
                      <Text style={styles.statusText}>{project.status}</Text>
                    </View>
                  </Badge>
                </View>

                <Text style={styles.projectDesc}>{project.description}</Text>

                <Text style={styles.roleLabel}>My Role</Text>
                <Text style={styles.roleText}>{project.role}</Text>

                <Text style={styles.stackLabel}>Tech Stack</Text>
                <View style={styles.stackTags}>
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" style={styles.stackBadge}>
                      {tech}
                    </Badge>
                  ))}
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* More coming */}
        <View style={styles.moreSection}>
          <Text style={styles.moreText}>
            More projects coming soon...
          </Text>
          <ExternalLink size={16} color="#71717a" />
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
  intro: {
    padding: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: "#a1a1aa",
    lineHeight: 22,
  },
  projectsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  projectCard: {
    marginBottom: 0,
  },
  projectContent: {
    padding: 20,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  projectName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fafafa",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.pine[500],
    fontWeight: "500",
  },
  projectDesc: {
    fontSize: 14,
    color: "#a1a1aa",
    lineHeight: 20,
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.pine[500],
    marginBottom: 4,
  },
  roleText: {
    fontSize: 13,
    color: "#e4e4e7",
    marginBottom: 16,
  },
  stackLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#71717a",
    marginBottom: 8,
  },
  stackTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  stackBadge: {
    marginRight: 0,
  },
  moreSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 32,
  },
  moreText: {
    fontSize: 14,
    color: "#71717a",
  },
});
