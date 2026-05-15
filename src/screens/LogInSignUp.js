import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonApp from "../components/ButtonApp";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

export default function LoginSignUp() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/icons/logo-icon.png")} />
      </View>

      {/* Title */}
      <Text style={styles.title}>CINEMAX</Text>
      <Text style={styles.subtitle}>
        Enter your registered{"\n"}Phone Number to Sign Up
      </Text>

      {/* Sign Up Button
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
      <ButtonApp
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        Sign Up
      </ButtonApp>

      {/* Login */}
      <View style={styles.loginRow}>
        <Text style={styles.loginText}>I already have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginHighlight}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or Sign up with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Icons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtnWhite}>
          <Image source={require("../../assets/icons/Google.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtnDark}>
          <Image source={require("../../assets/icons/Apple.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtnBlue}>
          <Image source={require("../../assets/icons/Facebook.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1226",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "600", // SemiBold
    letterSpacing: 0.12,
    fontFamily: "MontserratSemiBold",
    // nếu đã load font custom
  },

  subtitle: {
    color: "#92929D",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
    fontFamily: "MontserratSemiBold",
    marginBottom: 60,
    marginTop: 8,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 34,
  },

  loginText: {
    color: "#92929D",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "MontserratMedium",
  },

  loginHighlight: {
    color: "#12CDD9",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "MontserratSemiBold",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
    marginTop: 40,
  },

  line: {
    flex: 1,
    height: 1,
    width: 62,
    backgroundColor: "#333",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#92929D",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",

    fontFamily: "MontserratMedium",
  },

  socialContainer: {
    flexDirection: "row",
    gap: 24,
    marginTop: 40,
  },
});
