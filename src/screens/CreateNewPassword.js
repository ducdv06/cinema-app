import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import storage from "../utils/storage";

const USERS_STORAGE_KEY = "@CinemaApp:users";

export default function CreateNewPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const currentUser = await storage.getItem("@CinemaApp:currentUser");
      setIsLoggedIn(!!currentUser);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleReset = async () => {
    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);

    try {
      // Lấy danh sách users
      const usersJSON = await storage.getItem(USERS_STORAGE_KEY);
      let users = usersJSON ? JSON.parse(usersJSON) : [];

      // Tìm user cần đổi mật khẩu
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        Alert.alert("Lỗi", "Không tìm thấy tài khoản");
        setLoading(false);
        return;
      }

      // Cập nhật mật khẩu mới
      users[userIndex].password = password;
      await storage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Nếu đang đăng nhập, cập nhật lại currentUser
      if (isLoggedIn) {
        const currentUser = await storage.getItem("@CinemaApp:currentUser");
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          if (userData.email === email) {
            // Không cập nhật password vào currentUser vì không cần
          }
        }
      }

      Alert.alert(
        "Thành công",
        "Mật khẩu đã được thay đổi!",
        [
          {
            text: "OK",
            onPress: () => {
              if (isLoggedIn) {
                // Nếu đã đăng nhập, quay về Profile
                navigation.replace("Profile");
              } else {
                // Nếu chưa đăng nhập, quay về Login
                navigation.replace("Login");
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../assets/icons/back.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>Enter your new password</Text>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••••"
              placeholderTextColor="#8A8A9E"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={22}
                color="#7C7C90"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••••••"
              placeholderTextColor="#8A8A9E"
              secureTextEntry={!confirmVisible}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
              <Ionicons
                name={confirmVisible ? "eye" : "eye-off"}
                size={22}
                color="#7C7C90"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={handleReset}
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
              {loading ? "Resetting..." : "Reset Password"}
            </Text>
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
  content: {
    marginTop: 44,
    paddingHorizontal: 24,
  },
  title: {
    color: "#FFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    letterSpacing: 0.12,
    textAlign: "center",
  },
  subtitle: {
    color: "#92929D",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    marginTop: 6,
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
    fontSize: 14,
  },
  buttonWrap: {
    marginTop: 40,
    alignItems: "center",
  },
});