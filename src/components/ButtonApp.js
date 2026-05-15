import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonApp({
  children,
  onPress,
  width = "90%",
  variant = "filled",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.button,
        { width },

        variant === "filled" && styles.filled,
        variant === "outline" && styles.outline,

        disabled && styles.disabled,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            variant === "outline" && styles.outlineText,
            disabled && styles.disabledText,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  filled: {
    backgroundColor: "#27c2c8",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#27c2c8",
  },

  disabled: {
    backgroundColor: "#6D6D7A",
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },

  outlineText: {
    color: "#27c2c8",
  },

  disabledText: {
    color: "#AAA",
  },
});
