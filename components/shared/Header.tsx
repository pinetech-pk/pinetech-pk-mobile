// Header component

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { Logo } from "./Logo";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
}

export function Header({
  title,
  showBack = false,
  onBack,
  showLogo = false,
  rightContent,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={24} color="#fafafa" />
            </TouchableOpacity>
          )}
          {showLogo && <Logo size="sm" />}
          {title && !showLogo && <Text style={styles.title}>{title}</Text>}
        </View>

        {rightContent && <View style={styles.right}>{rightContent}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#09090b",
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});
