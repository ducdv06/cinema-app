import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CONTENT = [
  {
    id: "1",
    title: "Terms",
    paragraphs: [
      "Welcome to our movie streaming application. By accessing and using this app, you agree to comply with these terms and conditions.",
      "We may collect certain information such as your email (if provided), viewing activity (movies watched, search history), and device information (device type, operating system).",
      "This data is used to improve your experience, provide personalized movie recommendations, enhance app performance, and ensure system security.",
      "We do not sell or share your personal information with third parties, except when required by law or with your consent.",    ],
  },
  {
    id: "2",
    title: "Changes to the Service and/or Terms:",
    paragraphs: [
      "We reserve the right to update or modify these terms at any time without prior notice.",
      "Any changes will take effect immediately after being published within the application.",
      "By continuing to use the app after updates, you agree to the revised terms. We recommend reviewing this policy regularly.",],
  },
];

export default function PrivacyPolicy() {
  const navigation = useNavigation();

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

        <Text style={styles.headerTitle}>Privacy Policy</Text>

        <View style={{ width: 32 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CONTENT.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.paragraphs.map((para, index) => (
              <Text key={index} style={styles.paragraph}>
                {para}
              </Text>
            ))}
          </View>
        ))}
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
    marginBottom: 24,
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

  /* CONTENT */
  scrollContent: {
    paddingBottom: 40,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
    marginBottom: 12,
  },

  paragraph: {
    color: "#92929D",
    fontFamily: "MontserratRegular",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 0.12,
    marginBottom: 16,
  },
});
