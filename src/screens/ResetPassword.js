import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import storage from "../utils/storage";

const USERS_STORAGE_KEY = "@CinemaApp:users";

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const usersJSON = await storage.getItem(USERS_STORAGE_KEY);
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      
      const userExists = users.some(user => user.email === email);
      
      if (!userExists) {
        Alert.alert("Lỗi", "Email không tồn tại trong hệ thống");
        setLoading(false);
        return;
      }

      // Tạo mã OTP ngẫu nhiên 6 số
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Lưu OTP và email tạm thời
      await storage.setItem("@CinemaApp:resetOTP", JSON.stringify({
        email: email,
        otp: otpCode,
        expiry: Date.now() + 5 * 60 * 1000 // 5 phút
      }));

      // Hiện alert với mã OTP (thay vì gửi email)
      Alert.alert(
        "Mã xác nhận",
        `Mã OTP của bạn là: ${otpCode}\n\nVui lòng nhập mã này để tiếp tục đổi mật khẩu.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Verification", { email: email })
          }
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xử lý yêu cầu");
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
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Recover your account password</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Tiffanyjearsey@gmail.com"
            placeholderTextColor="#8A8A9E"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={handleNext}
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
              {loading ? "Processing..." : "Next"}
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
    marginTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 28,
    letterSpacing: 0.12,
  },
  subtitle: {
    color: "#92929D",
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    letterSpacing: 0.12,
    marginTop: 7,
  },
  inputGroup: {
    marginTop: 48,
    width: "100%",
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
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#252836",
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
    color: "#FFFFFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  buttonWrap: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
});