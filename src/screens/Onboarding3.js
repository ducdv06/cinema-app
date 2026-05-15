import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding3() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* HERO */}
      <View style={styles.heroSection}>
        {/* Circle background */}
        <View style={styles.circle} />

        {/* Left Card */}
        <View style={[styles.infoBox, styles.leftCard]}>
          <Image
            source={require("../../assets/icons/star.png")}
            style={styles.icon}
          />
          <Text style={styles.infoLabel}>Rating</Text>
          <Text style={styles.infoValue}>9 /10</Text>
        </View>

        {/* Right Card */}
        <View style={[styles.infoBox, styles.rightCard]}>
          <Image
            source={require("../../assets/icons/clock.png")}
            style={styles.icon}
          />
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>1h 20m</Text>
        </View>

        <Image
          source={require("../../assets/img/onboarding3-img.png")}
          style={styles.heroImage}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          Our service brings together your favorite series
        </Text>

        <Text style={styles.description}>
          Semper in cursus magna et eu varius nunc adipiscing. Elementum justo,
          laoreet id sem semper parturient.
        </Text>

        {/* Pagination */}
        <View style={styles.footer}>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("LoginSignUp")}
          >
            <Image source={require("../../assets/icons/Next3-icon.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#171725",

    paddingTop: 55,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: "#1F1D2B",
    marginTop: 6,
  },

  topStatus: {
    paddingHorizontal: 28,
    marginBottom: 20,
  },

  time: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  heroSection: {
    // height: 370,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#171725",
  },

  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#25273F",
    position: "absolute",
    top: 70,
  },

  heroImage: {
    // width: 250,
    // height: 320,
    resizeMode: "cover",
    zIndex: 2,
    width: "100%",
  },

  infoBox: {
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,

    borderWidth: 1,
    borderColor: "#FFFFFF1A",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 4,
  },

  leftCard: {
    left: 41,
    top: 44,
  },

  rightCard: {
    right: 27,
    top: 62,
  },

  icon: {
    color: "#08D6E8",
    fontSize: 16,
  },

  infoLabel: {
    color: "#92929D",
    textAlign: "center",
    fontFamily: "MontserratMedium", // hoặc "Montserrat" nếu bạn load font này
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },

  infoValue: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratBold", // nếu load font bold
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  title: {
    color: "#FFF",
    textAlign: "center",

    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",

    lineHeight: 28.8,

    marginTop: 40,
  },

  description: {
    color: "#92929D",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
    fontFamily: "MontserratMedium",

    fontSize: 14,
    marginTop: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 24,
    marginHorizontal: -27, // bù từ 55 về còn 28
  },

  dots: {
    flexDirection: "row",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#12CDD9",
    marginRight: 10,
    opacity: 0.4,
  },

  activeDot: {
    width: 32,
    backgroundColor: "#12CDD9",
    opacity: 1,
  },
});
