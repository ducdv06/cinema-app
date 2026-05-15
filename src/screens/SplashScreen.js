import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  // useEffect(() => {
  //   // chuyển màn sau 3s
  //   const timer = setTimeout(() => {
  //     navigation.replace("Onboarding1");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.replace("Onboarding1")}
      style={styles.container}
      activeOpacity={1}
    >
      <View>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    justifyContent: "center",
    alignItems: "center",
  },
});
