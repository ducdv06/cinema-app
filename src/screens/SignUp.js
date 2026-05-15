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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import storage from "../utils/storage";

const USERS_STORAGE_KEY = "@CinemaApp:users";

export default function SignUp() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveUser = async () => {
    try {
      const existingUsersJSON = await storage.getItem(USERS_STORAGE_KEY);
      let users = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const emailExists = users.some(user => user.email === email);
      if (emailExists) {
        Alert.alert("Lỗi", "Email này đã được đăng ký. Vui lòng sử dụng email khác.");
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        fullName: fullName,
        email: email,
        password: password,
        phone: "",
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await storage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      return true;
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng ký. Vui lòng thử lại.");
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập họ và tên");
      return;
    }
    
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }
    
    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
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
    
    if (!agree) {
      Alert.alert("Lỗi", "Vui lòng đồng ý với Điều khoản và Chính sách");
      return;
    }
    
    setLoading(true);
    const success = await saveUser();
    setLoading(false);
    
    if (success) {
      Alert.alert(
        "Thành công", 
        "Đăng ký tài khoản thành công!",
        [
          {
            text: "Đăng nhập ngay",
            onPress: () => navigation.replace("Login")
          }
        ]
      );
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
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Let's get started</Text>
        <Text style={styles.subtitle}>
          The latest movies and series{"\n"}are here
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Tiffany"
            placeholderTextColor="#8A8A9E"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              placeholder="•••••••••••••"
              placeholderTextColor="#8A8A9E"
              secureTextEntry={!confirmPasswordVisible}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={22} color="#7C7C90" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, agree && styles.checkboxActive]}
            onPress={() => setAgree(!agree)}
          >
            {agree && <Ionicons name="checkmark" size={14} color="#FFF" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms and Services</Text>
            {"\n"}and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={handleSignUp}
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
              {loading ? "Signing Up..." : "Sign Up"}
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
    fontFamily: "MontserratMedium",
    fontSize: 14,
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "#6C6A7A",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#12CDD9",
    borderColor: "#12CDD9",
  },
  termsText: {
    flex: 1,
    color: "#92929D",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "MontserratMedium",
  },
  link: {
    color: "#12CDD9",
  },
  buttonWrap: {
    marginTop: 40,
    alignItems: "center",
  },
});