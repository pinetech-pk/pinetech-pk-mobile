// Logo component

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "@/lib/constants";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

export function Logo({ size = "md", style }: LogoProps) {
  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 18;
      case "lg":
        return 32;
      default:
        return 24;
    }
  };

  const fontSize = getFontSize();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.logo, { fontSize }]}>
        <Text style={styles.pine}>Pine</Text>
        <Text style={styles.tech}>Tech</Text>
        <Text style={styles.pk}>.pk</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
  },
  pine: {
    color: COLORS.pine[500],
  },
  tech: {
    color: "#fafafa",
  },
  pk: {
    color: "#71717a",
    fontWeight: "400",
  },
});
