import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonApp from "../components/ButtonApp";

const FEATURES = [
  {
    id: "1",
    icon: "hd",
    label: "Streaming in high quality",
  },
  {
    id: "2",
    icon: "remove-circle-outline",
    label: "Ad-free viewing experience",
  },
  {
    id: "3",
    icon: "download",
    label: "Download to watch later",
  },
  {
    id: "4",
    icon: "closed-caption",
    label: "Text of different languages",
  },
  {
    id: "5",
    icon: "tv",
    label: "Stream on multiple devices",
  },
  {
    id: "6",
    icon: "volume-up",
    label: "With the best audio quality",
  },
];

export default function PremiumAccount() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("monthly");

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>VIP</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* ACCESS PREMIUM BADGE */}
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Access Premium</Text>
            </View>
          </View>

          {/* TITLE */}
          <Text style={styles.title}>
            The latest movies and{"\n"}series are here
          </Text>

          {/* SUBSCRIPTION CARDS */}
          <View style={styles.cardsRow}>
            {/* Monthly */}
            <TouchableOpacity
              style={[styles.card, selected === "monthly" && styles.cardActive]}
              onPress={() => setSelected("monthly")}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.cardTitle,
                  selected === "monthly" && styles.cardTitleActive,
                ]}
              >
                Monthly{"\n"}Subscription
              </Text>
              <Text
                style={[
                  styles.cardPrice,
                  selected === "monthly" && styles.cardPriceActive,
                ]}
              >
                <Text style={styles.cardCurrency}>Rp</Text>54.000/
              </Text>
              <Text
                style={[
                  styles.cardPeriod,
                  selected === "monthly" && styles.cardPeriodActive,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>

            {/* Annual */}
            <TouchableOpacity
              style={[styles.card, selected === "annual" && styles.cardActive]}
              onPress={() => setSelected("annual")}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.cardTitle,
                  selected === "annual" && styles.cardTitleActive,
                ]}
              >
                Annual{"\n"}Subscription
              </Text>
              <Text
                style={[
                  styles.cardPrice,
                  selected === "annual" && styles.cardPriceActive,
                ]}
              >
                <Text style={styles.cardCurrency}>Rp</Text>200.000/
              </Text>
              <Text
                style={[
                  styles.cardPeriod,
                  selected === "annual" && styles.cardPeriodActive,
                ]}
              >
                Years
              </Text>
            </TouchableOpacity>
          </View>

          {/* FEATURES GRID */}
          <View style={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <View key={f.id} style={styles.featureItem}>
                <MaterialIcons name={f.icon} size={22} color="#92929D" />
                <Text style={styles.featureText}>{f.label}</Text>
              </View>
            ))}
          </View>

          {/* PAYMENT BUTTON */}
          <View style={styles.buttonWrap}>
            <ButtonApp onPress={() => navigation.navigate("PaymentMethod")}>
              Payment Method
            </ButtonApp>
          </View>

          {/* LOGIN LINK */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already subscribed? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },

  /* HEADER */
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },

  /* BADGE */
  badgeWrapper: {
    alignItems: "center",
    marginTop: 28,
  },

  badge: {
    backgroundColor: "#FF8700",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 16,
    fontWeight: "500",
  },

  /* TITLE */
  title: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",

    marginTop: 20,
    paddingHorizontal: 24,
  },

  /* SUBSCRIPTION CARDS */
  cardsRow: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 28,
    gap: 12,
  },

  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#252836",
    backgroundColor: "#252836",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  cardActive: {
    backgroundColor: "#12CDD9",
    borderColor: "#12CDD9",
  },

  cardTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },

  cardTitleActive: {
    color: "#FFF",
  },

  cardPrice: {
    color: "#FFF",
    fontFamily: "MontserratBold",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },

  cardPriceActive: {
    color: "#FFF",
  },

  cardCurrency: {
    fontSize: 14,
    fontWeight: "600",
  },

  cardPeriod: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginTop: 4,
  },

  cardPeriodActive: {
    color: "#FFF",
  },

  /* FEATURES */
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 24,
    marginTop: 32,
    rowGap: 20,
    columnGap: 0,
  },

  featureItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingRight: 12,
  },

  featureText: {
    flex: 1,
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.12,
  },

  /* BUTTON */
  buttonWrap: {
    marginTop: 40,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  /* LOGIN */
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  loginText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 13,
  },

  loginLink: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    fontWeight: "600",
  },
});
