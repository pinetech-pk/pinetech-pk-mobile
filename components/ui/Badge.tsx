// Badge component

import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "@/lib/constants";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = "default",
  style,
  textStyle,
}: BadgeProps) {
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 9999,
      alignSelf: "flex-start",
    };

    switch (variant) {
      case "secondary":
        baseStyle.backgroundColor = "#27272a";
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = "#3f3f46";
        break;
      case "success":
        baseStyle.backgroundColor = COLORS.pine[600] + "20";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = COLORS.pine[600];
        break;
      case "warning":
        baseStyle.backgroundColor = "#f59e0b20";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = "#f59e0b";
        break;
      case "error":
        baseStyle.backgroundColor = "#ef444420";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = "#ef4444";
        break;
      default:
        baseStyle.backgroundColor = COLORS.emerald[600];
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 12,
      fontWeight: "500",
    };

    switch (variant) {
      case "secondary":
        baseTextStyle.color = "#a1a1aa";
        break;
      case "outline":
        baseTextStyle.color = "#e4e4e7";
        break;
      case "success":
        baseTextStyle.color = COLORS.pine[500];
        break;
      case "warning":
        baseTextStyle.color = "#f59e0b";
        break;
      case "error":
        baseTextStyle.color = "#ef4444";
        break;
      default:
        baseTextStyle.color = "#ffffff";
    }

    return baseTextStyle;
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
