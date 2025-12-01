// Admin dashboard screen

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  RefreshCw,
  ChevronRight,
} from "lucide-react-native";
import { Header } from "@/components/shared";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { COLORS } from "@/lib/constants";
import { useAuth } from "@/hooks";
import { getSubmissionStats, getBookingStats } from "@/services";
import type { UserSubmission } from "@/types";
import { getSubmissions } from "@/services/submissions";

export default function AdminDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();

  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    developers: 0,
    investors: 0,
    entrepreneurs: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const [submissionStats, submissionsData] = await Promise.all([
        getSubmissionStats(),
        getSubmissions(),
      ]);
      setStats(submissionStats);
      setSubmissions(submissionsData.slice(0, 5)); // Last 5
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/(auth)/admin-login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.pine[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Admin Dashboard"
        rightContent={
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.pine[500]}
          />
        }
      >
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || "Admin"}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <Users size={24} color={COLORS.pine[500]} />
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Submissions</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <View
                  style={[styles.statIcon, { backgroundColor: "#3b82f620" }]}
                >
                  <Text style={styles.statIconText}>D</Text>
                </View>
                <Text style={styles.statNumber}>{stats.developers}</Text>
                <Text style={styles.statLabel}>Developers</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <View
                  style={[styles.statIcon, { backgroundColor: "#22c55e20" }]}
                >
                  <Text style={[styles.statIconText, { color: "#22c55e" }]}>
                    I
                  </Text>
                </View>
                <Text style={styles.statNumber}>{stats.investors}</Text>
                <Text style={styles.statLabel}>Investors</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <View
                  style={[styles.statIcon, { backgroundColor: "#a855f720" }]}
                >
                  <Text style={[styles.statIconText, { color: "#a855f7" }]}>
                    E
                  </Text>
                </View>
                <Text style={styles.statNumber}>{stats.entrepreneurs}</Text>
                <Text style={styles.statLabel}>Entrepreneurs</Text>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#3b82f620" }]}
              >
                <Users size={20} color="#3b82f6" />
              </View>
              <View>
                <Text style={styles.actionTitle}>View Submissions</Text>
                <Text style={styles.actionDesc}>
                  Manage user journey submissions
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#71717a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#22c55e20" }]}
              >
                <Calendar size={20} color="#22c55e" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Manage Bookings</Text>
                <Text style={styles.actionDesc}>
                  View and update consultation bookings
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#71717a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#f59e0b20" }]}
              >
                <MessageSquare size={20} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Chat Rooms</Text>
                <Text style={styles.actionDesc}>Manage secure chat rooms</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#71717a" />
          </TouchableOpacity>
        </View>

        {/* Recent Submissions */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Submissions</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <RefreshCw
                size={18}
                color="#71717a"
                style={isRefreshing ? { opacity: 0.5 } : {}}
              />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={COLORS.pine[500]}
              style={styles.loader}
            />
          ) : submissions.length === 0 ? (
            <Card>
              <CardContent>
                <Text style={styles.emptyText}>No submissions yet</Text>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} style={styles.submissionCard}>
                <CardContent style={styles.submissionContent}>
                  <View style={styles.submissionHeader}>
                    <Text style={styles.submissionName}>{submission.name}</Text>
                    <Badge
                      variant={
                        submission.userType === "developer"
                          ? "default"
                          : submission.userType === "investor"
                            ? "success"
                            : "secondary"
                      }
                    >
                      {submission.userType}
                    </Badge>
                  </View>
                  <Text style={styles.submissionEmail}>{submission.email}</Text>
                  <Text style={styles.submissionDate}>
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </Text>
                </CardContent>
              </Card>
            ))
          )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#09090b",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    padding: 8,
  },
  userInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  welcomeText: {
    fontSize: 14,
    color: "#71717a",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fafafa",
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.pine[500],
    marginTop: 4,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
  },
  statContent: {
    alignItems: "center",
    padding: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.pine[500],
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
  },
  actionDesc: {
    fontSize: 13,
    color: "#71717a",
    marginTop: 2,
  },
  recentSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#71717a",
    fontSize: 14,
  },
  submissionCard: {
    marginBottom: 12,
  },
  submissionContent: {
    padding: 16,
  },
  submissionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  submissionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fafafa",
  },
  submissionEmail: {
    fontSize: 14,
    color: "#a1a1aa",
  },
  submissionDate: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
  },
});
