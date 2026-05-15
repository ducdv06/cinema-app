import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import storage from "../utils/storage";
import BottomTabs from "../navigation/BottomTabs";

export default function EditProfile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJSON = await storage.getItem("@CinemaApp:currentUser");
      if (userJSON) {
        const userData = JSON.parse(userJSON);
        setUser(userData);
        setFullName(userData.fullName || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setAvatar(userData.avatar || null);
      }
    } catch (error) {
      console.error("Lỗi khi load user:", error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Lỗi", "Cần cấp quyền truy cập ảnh để đổi avatar!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
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

    setLoading(true);

    try {
      // Cập nhật current user
      const updatedUser = {
        ...user,
        fullName: fullName,
        email: email,
        phone: phone,
        avatar: avatar,
      };
      await storage.setItem("@CinemaApp:currentUser", JSON.stringify(updatedUser));

      // Cập nhật trong danh sách users
      const usersJSON = await storage.getItem("@CinemaApp:users");
      if (usersJSON) {
        let users = JSON.parse(usersJSON);
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          users[index] = { ...users[index], fullName, email, phone, avatar };
          await storage.setItem("@CinemaApp:users", JSON.stringify(users));
        }
      }

      Alert.alert("Thành công", "Đã cập nhật thông tin!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* AVATAR */}
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              <Image
                source={avatar ? { uri: avatar } : require("../../assets/icons/avatar.png")}
                style={styles.avatar}
              />
              <View style={styles.editIcon}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.userName}>{fullName || "Tiffany"}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>

          {/* FORM */}
          <View style={styles.content}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#8A8A9E"
                style={styles.input}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#8A8A9E"
                style={styles.input}
                keyboardType="email-address"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="#8A8A9E"
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* SAVE BUTTON */}
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              onPress={handleSave}
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
                {loading ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 24,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#12CDD9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1F1D2B",
  },
  userName: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    letterSpacing: 0.12,
  },
  userEmail: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 0.12,
  },
  content: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginTop: 24,
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
    height: 60,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#252836",
    paddingHorizontal: 18,
    paddingTop: 8,
    color: "#FFFFFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    letterSpacing: 0.12,
  },
  buttonWrap: {
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
});