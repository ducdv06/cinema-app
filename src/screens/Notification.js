import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Notification() {
  const navigation = useNavigation();
  const [showNotifications, setShowNotifications] = useState(true);

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

        <Text style={styles.headerTitle}>Notification</Text>

        <View style={{ width: 32 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Messages Notifications</Text>

        {/* SHOW NOTIFICATIONS */}
        <View style={styles.row}>
          <Text style={styles.rowText}>Show Notifications</Text>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            trackColor={{ false: "#3A3A4A", true: "#12CDD9" }}
            thumbColor="#FFF"
            ios_backgroundColor="#3A3A4A"
          />
        </View>

        <View style={styles.divider} />

        {/* EXCEPTIONS */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Exceptions</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  rowText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.12,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
});
