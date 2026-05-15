import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import storage from "../utils/storage";

const USERS_STORAGE_KEY = "@CinemaApp:users";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
      return;
    }

    setLoading(true);

    try {
      const existingUsersJSON = await storage.getItem(USERS_STORAGE_KEY);
      const users = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const currentUser = {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || "",
          avatar: user.avatar || null,
          loginTime: new Date().toISOString(),
        };

        await storage.setItem("@CinemaApp:currentUser", JSON.stringify(currentUser));
        
        Alert.alert("Thành công", `Chào mừng ${user.fullName} trở lại!`);
        navigation.replace("Home");
      } else {
        Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/icons/back.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Hi, Welcome Back!</Text>
        <Text style={styles.subtitle}>Welcome back! Please enter{"\n"}your details.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="Tiffanyjearsey@gmail.com"
            placeholderTextColor="#8A8A9E"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              placeholder="•••••••••••••"
              placeholderTextColor="#8A8A9E"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={22} color="#7C7C90" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: "#12CDD9",
              width: "100%",
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16, fontFamily: "MontserratMedium" }}>
              {loading ? "Logging in..." : "Log In"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingHorizontal: 22,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#1F1F38",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 24,
  },
  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    letterSpacing: 0.12,
  },
  content: {
    marginTop: 46,
    paddingHorizontal: 24,
  },
  title: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 0.12,
  },
  subtitle: {
    color: "#EBEBEF",
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    letterSpacing: 0.12,
    marginTop: 8,
  },
  inputGroup: {
    marginTop: 48,
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -8,
    left: 18,
    zIndex: 10,
    backgroundColor: "#1F1D2B",
    paddingHorizontal: 8,
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    letterSpacing: 0.12,
  },
  input: {
    height: 72,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#252836",
    paddingHorizontal: 18,
    paddingTop: 20,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "MontserratMedium",
    letterSpacing: 0.12,
  },
  passwordBox: {
    height: 72,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#252836",
    paddingHorizontal: 18,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    letterSpacing: 0.12,
  },
  forgot: {
    textAlign: "right",
    marginTop: 8,
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
  buttonWrap: {
    marginTop: 40,
    alignItems: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signUpText: {
    color: "#92929D",
    fontSize: 14,
    fontFamily: "MontserratMedium",
  },
  signUpLink: {
    color: "#12CDD9",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
  },
});