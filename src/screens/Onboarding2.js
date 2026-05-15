import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding2() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View>
        <View style={styles.sliderWrapper}>
          {/* Left Poster */}
          <Image
            source={require("../../assets/img/Onboarding2.1-img.png")}
            style={[styles.poster, styles.sidePoster]}
          />

          {/* Center Poster */}
          <Image
            source={require("../../assets/img/Onboarding2.2-img.png")}
            style={[styles.poster, styles.centerPoster]}
          />

          {/* Right Poster */}
          <Image
            source={require("../../assets/img/Onboarding2.3-img.png")}
            style={[styles.poster, styles.sidePoster]}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Offers ad-free viewing of high quality
          </Text>

          <Text style={styles.description}>
            Semper in cursus magna et eu varius nunc adipiscing. Elementum
            justo, laoreet id sem semper parturient.
          </Text>
        </View>

        {/* Pagination */}
        <View style={styles.footer}>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Onboarding3")}
          >
            <Image
              source={require("../../assets/icons/Next2-icon.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },

  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#1F1D2B",
    marginTop: -10,
  },
  sliderWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center", // đẩy 2 ảnh sát lề
    alignItems: "center",
    overflow: "hidden",

    // paddingHorizontal: -10,
    backgroundColor: "#171725",
  },

  // poster: {
  //   borderRadius: 32,
  // },

  // 2 ảnh ngoài
  sidePoster: {
    marginHorizontal: -10,
    opacity: 0.3,
  },

  // ảnh giữa lớn hơn
  centerPoster: {
    marginHorizontal: -30, // đè lên 2 ảnh hai bên
    zIndex: 2,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",

    fontFamily: "MontserratSemiBold",
    letterSpacing: 0.12,
    lineHeight: 28.8,
    paddingTop: 37,
  },

  description: {
    color: "#92929D",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
    fontFamily: "MontserratMedium",
    letterSpacing: 0.12,
    fontSize: 14,
    marginTop: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 24,
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
