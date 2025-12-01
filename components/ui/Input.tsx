// Input component

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { COLORS } from "@/lib/constants";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor="#71717a"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

interface TextAreaProps extends InputProps {
  numberOfLines?: number;
}

export function TextArea({
  numberOfLines = 4,
  ...props
}: TextAreaProps) {
  return (
    <Input
      {...props}
      multiline
      numberOfLines={numberOfLines}
      inputStyle={[styles.textArea, props.inputStyle]}
      textAlignVertical="top"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#a1a1aa",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#27272a",
    borderWidth: 1,
    borderColor: "#3f3f46",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fafafa",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
});
