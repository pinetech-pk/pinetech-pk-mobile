// Custom Button component

import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "@/lib/constants";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "pine";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Size styles
    switch (size) {
      case "sm":
        baseStyle.paddingHorizontal = 12;
        baseStyle.paddingVertical = 8;
        break;
      case "lg":
        baseStyle.paddingHorizontal = 24;
        baseStyle.paddingVertical = 16;
        break;
      default:
        baseStyle.paddingHorizontal = 16;
        baseStyle.paddingVertical = 12;
    }

    // Variant styles
    switch (variant) {
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = "#374151";
        break;
      case "ghost":
        baseStyle.backgroundColor = "transparent";
        break;
      case "destructive":
        baseStyle.backgroundColor = "#ef4444";
        break;
      case "pine":
        baseStyle.backgroundColor = COLORS.pine[600];
        break;
      default:
        baseStyle.backgroundColor = COLORS.emerald[600];
    }

    if (isDisabled) {
      baseStyle.opacity = 0.5;
    }

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: "600",
    };

    // Size
    switch (size) {
      case "sm":
        baseTextStyle.fontSize = 14;
        break;
      case "lg":
        baseTextStyle.fontSize = 18;
        break;
      default:
        baseTextStyle.fontSize = 16;
    }

    // Variant colors
    switch (variant) {
      case "outline":
      case "ghost":
        baseTextStyle.color = "#e5e7eb";
        break;
      default:
        baseTextStyle.color = "#ffffff";
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "outline" || variant === "ghost" ? "#10b981" : "#ffffff"}
          style={styles.loader}
        />
      )}
      {typeof children === "string" ? (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
});
