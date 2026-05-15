import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

export default function Onboarding1() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/img/onboarding1-img.png")}
          style={styles.image}
        />
      </View>
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          The biggest international and local film streaming
        </Text>

        <Text style={styles.description}>
          Semper in cursus magna et eu varius nunc adipiscing. Elementum justo,
          laoreet id sem semper parturient.
        </Text>

        {/* Pagination */}
        <View style={styles.footer}>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Onboarding2")}
          >
            <Image source={require("../../assets/icons/Next1-icon.png")} />
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
    paddingTop: 60,
  },

  topSection: {
    width: "100%",
  },

  image: {
    width: "100%", // full ngang màn hình

    resizeMode: "cover",
    // hoặc contain nếu muốn giữ nguyên tỷ lệ
  },

  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: "#1F1D2B",
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
