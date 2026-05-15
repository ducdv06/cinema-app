import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function Banner({ image, title, date }) {
  return (
    <View style={styles.banner}>
      <ImageBackground source={image} style={styles.bannerImg}>
        {/* Text */}
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>{title}</Text>
          <Text style={styles.bannerDate}>{date}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: 300,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },

  bannerImg: {
    width: "100%",
    height: 154,
    justifyContent: "flex-end",
  },

  bannerText: {
    padding: 16,
  },

  bannerTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold", // ✅ font-weight: 600
    fontSize: 16,
  },

  bannerDate: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium", // ✅ font-weight: 500
    fontSize: 12,

    marginTop: 4,
  },
});
