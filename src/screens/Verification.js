import React, { useRef, useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import storage from "../utils/storage";

export default function Verification() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  useEffect(() => {
    // Focus vào ô đầu tiên
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    
    if (otp.length < 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ 6 số");
      return;
    }

    try {
      const resetDataJSON = await storage.getItem("@CinemaApp:resetOTP");
      if (!resetDataJSON) {
        Alert.alert("Lỗi", "Mã xác nhận đã hết hạn. Vui lòng thử lại");
        navigation.replace("ResetPassword");
        return;
      }

      const resetData = JSON.parse(resetDataJSON);
      
      // Kiểm tra hết hạn
      if (Date.now() > resetData.expiry) {
        Alert.alert("Lỗi", "Mã xác nhận đã hết hạn. Vui lòng thử lại");
        await storage.removeItem("@CinemaApp:resetOTP");
        navigation.replace("ResetPassword");
        return;
      }

      // Kiểm tra OTP
      if (resetData.otp !== otp) {
        Alert.alert("Lỗi", "Mã xác nhận không đúng");
        return;
      }

      // Xóa OTP đã dùng
      await storage.removeItem("@CinemaApp:resetOTP");
      
      // Chuyển sang tạo mật khẩu mới
      navigation.replace("CreateNewPassword", { email: resetData.email });
      
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xác thực");
    }
  };

  const handleResend = async () => {
    try {
      const usersJSON = await storage.getItem("@CinemaApp:users");
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      
      const userExists = users.some(user => user.email === email);
      
      if (!userExists && email) {
        Alert.alert("Lỗi", "Email không tồn tại");
        return;
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      await storage.setItem("@CinemaApp:resetOTP", JSON.stringify({
        email: email,
        otp: otpCode,
        expiry: Date.now() + 5 * 60 * 1000
      }));

      Alert.alert("Mã xác nhận mới", `Mã OTP của bạn là: ${otpCode}`);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi lại mã");
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
        <Text style={styles.title}>Verifying Your Account</Text>

        <Text style={styles.subtitle}>
          We have just sent you a 6 digit code via
          <Text style={styles.email}> {email || "your email"}</Text>
        </Text>

        {/* OTP Input - 6 số */}
        <View style={styles.otpContainer}>
          {code.map((item, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.otpInput, item ? styles.activeInput : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={item}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" && handleBackspace(item, index)
              }
            />
          ))}
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={handleVerify}
            style={{
              backgroundColor: "#12CDD9",
              width: "100%",
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16, fontFamily: "MontserratMedium" }}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.resendText}>
          Didn't receive code?{" "}
          <Text style={styles.resend} onPress={handleResend}>
            Resend
          </Text>
        </Text>
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
    marginTop: 30,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    color: "#7F7E83",
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  email: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    width: "100%",
    gap: 8,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#252836",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    letterSpacing: 0.12,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: "#12CDD9",
  },
  buttonWrap: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  resendText: {
    marginTop: 24,
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  resend: {
    color: "#12CDD9",
    fontWeight: "600",
  },
});