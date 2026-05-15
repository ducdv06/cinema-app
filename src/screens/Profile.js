import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import storage from "../utils/storage";

const MenuItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.iconBox}>{icon}</View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#12CDD9" />
    </TouchableOpacity>
  );
};

export default function Profile() {
  const navigation = useNavigation();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJSON = await storage.getItem("@CinemaApp:currentUser");
      if (userJSON) {
        setUser(JSON.parse(userJSON));
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
      // Cập nhật avatar
      const updatedUser = { ...user, avatar: result.assets[0].uri };
      await storage.setItem(
        "@CinemaApp:currentUser",
        JSON.stringify(updatedUser),
      );

      // Cập nhật trong danh sách users
      const usersJSON = await storage.getItem("@CinemaApp:users");
      if (usersJSON) {
        let users = JSON.parse(usersJSON);
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users[index].avatar = result.assets[0].uri;
          await storage.setItem("@CinemaApp:users", JSON.stringify(users));
        }
      }

      setUser(updatedUser);
      Alert.alert("Thành công", "Đã cập nhật ảnh đại diện!");
    }
  };

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.replace("LoginSignUp");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#FFF", textAlign: "center", marginTop: 50 }}>
          Đang tải...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <Text style={styles.header}>Profile</Text>

        {/* USER INFO */}
        <View style={styles.userRow}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                user?.avatar
                  ? { uri: user.avatar }
                  : require("../../assets/icons/avatar-profile.png")
              }
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.fullName || "Tiffany"}</Text>
            <Text style={styles.email}>
              {user?.email || "Tiffanyjersey@gmail.com"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Image source={require("../../assets/icons/edit-icon.png")} />
          </TouchableOpacity>
        </View>

        {/* PREMIUM CARD */}
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => navigation.navigate("PremiumAccount")}
        >
          <View style={styles.premiumIcon}>
            <Image source={require("../../assets/icons/premium-icon.png")} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>Premium Member</Text>
            <Text style={styles.premiumDesc}>
              New movies are coming for you,
            </Text>
            <Text style={styles.premiumDesc}>Download Now!</Text>
          </View>
        </TouchableOpacity>

        {/* ACCOUNT */}
        <View style={styles.card}>
          <Text style={styles.section}>Account</Text>
          <MenuItem
            title="Member"
            icon={
              <Image source={require("../../assets/icons/account-icon.png")} />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            title="Change Password"
            icon={
              <Image source={require("../../assets/icons/lock-icon.png")} />
            }
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </View>

        {/* GENERAL */}
        <View style={styles.card}>
          <Text style={styles.section}>General</Text>
          <MenuItem
            onPress={() => navigation.navigate("Notification")}
            title="Notification"
            icon={
              <Image
                source={require("../../assets/icons/notification-icon.png")}
              />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            onPress={() => navigation.navigate("Language")}
            title="Language"
            icon={
              <Image source={require("../../assets/icons/language-icon.png")} />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            title="Country"
            icon={
              <Image source={require("../../assets/icons/country-icon.png")} />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            title="Clear Cache"
            icon={<Image source={require("../../assets/icons/bin-icon.png")} />}
          />
        </View>

        {/* MORE */}
        <View style={styles.card}>
          <Text style={styles.section}>More</Text>
          <MenuItem
            onPress={() => navigation.navigate("PrivacyPolicy")}
            title="Legal and Policies"
            icon={
              <Image source={require("../../assets/icons/legal-icon.png")} />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            title="Help & Feedback"
            icon={
              <Image source={require("../../assets/icons/help-icon.png")} />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            title="About Us"
            icon={
              <Image source={require("../../assets/icons/about-icon.png")} />
            }
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logout}
          onPress={() => setLogoutVisible(true)}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* LOGOUT MODAL */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModal}>
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Image
                  source={require("../../assets/icons/question-icon.png")}
                />
              </View>
            </View>

            <Text style={styles.modalTitle}>Are you sure ?</Text>

            <Text style={styles.modalDesc}>
              Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim
              purus gravida donec aliquet.
            </Text>

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalBtnOutline}
                onPress={handleLogout}
              >
                <Text style={styles.modalBtnOutlineText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtnFill}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.modalBtnFillText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 52,
    paddingHorizontal: 24,
  },
  header: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 12,
    backgroundColor: "#12CDD9",
    borderRadius: 12,
    padding: 4,
  },
  name: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#B1B1B1",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  editBtn: {
    width: 24,
    height: 24,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumCard: {
    borderRadius: 16,
    backgroundColor: "#FF8700",
    padding: 24,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  premiumIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 2,
  },
  premiumTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  premiumDesc: {
    color: "#FFF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22.4,
    marginTop: 2,
  },
  section: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 23,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1F1D2B",
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 18,
  },
  item: {
    height: 58,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 16,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    marginLeft: 56,
  },
  logout: {
    borderWidth: 1.5,
    borderColor: "#12CDD9",
    borderRadius: 30,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  logoutText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoutModal: {
    backgroundColor: "#252836",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  iconOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF8700",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  iconInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#12CDD9",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.12,
  },
  modalDesc: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 12,
    letterSpacing: 0.12,
  },
  modalBtns: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  modalBtnOutline: {
    flex: 1,
    height: 48,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#12CDD9",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnOutlineText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
  },
  modalBtnFill: {
    flex: 1,
    height: 48,
    borderRadius: 30,
    backgroundColor: "#12CDD9",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnFillText: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
  },
});
