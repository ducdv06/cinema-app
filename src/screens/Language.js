import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SUGGESTED = ["English (UK)", "English", "Bahasa Indonesia"];

const OTHER = [
  "Chineses",
  "Croatian",
  "Czech",
  "Danish",
  "Filipino",
  "Finnish",
];

export default function Language() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("English (UK)");

  const renderItem = (lang, index, arr) => (
    <TouchableOpacity
      key={lang}
      style={[styles.row, index < arr.length - 1 && styles.rowBorder]}
      onPress={() => setSelected(lang)}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.rowText, selected === lang && styles.rowTextSelected]}
      >
        {lang}
      </Text>
      {selected === lang && (
        <Ionicons name="checkmark" size={18} color="#12CDD9" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Language</Text>

        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SUGGESTED */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Suggested Languages</Text>
          {SUGGESTED.map((lang, index) => renderItem(lang, index, SUGGESTED))}
        </View>

        {/* OTHER */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Other Languages</Text>
          {OTHER.map((lang, index) => renderItem(lang, index, OTHER))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 52,
    paddingHorizontal: 24,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  /* SCROLL */
  scrollContent: {
    paddingBottom: 40,
    gap: 16,
  },

  /* CARD */
  card: {
    backgroundColor: "#252836",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },

  cardLabel: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.12,
    marginTop: 12,
    marginBottom: 4,
  },

  /* ROW */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  rowText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.12,
  },

  rowTextSelected: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "600",
  },
});
