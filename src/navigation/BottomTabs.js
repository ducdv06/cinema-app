import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import homeIcon from "../../assets/icons/home-icon.png";
import homeActiveIcon from "../../assets/icons/home-active.png";

import searchIcon from "../../assets/icons/search-icon.png";
import searchActiveIcon from "../../assets/icons/search-active.png";

import downloadIcon from "../../assets/icons/download-icon.png";
import downloadActiveIcon from "../../assets/icons/download-active.png";

import profileIcon from "../../assets/icons/account-icon.png";
import profileActiveIcon from "../../assets/icons/account-active.png";

export default function BottomTabs() {
  const homeScreens = ["MovieDetail", "Trailer", "UpcomingMovies"];
  const profileScreens = ["EditProfile"];
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    {
      name: "Home",
      screen: "Home",
      icon: homeIcon,
      activeIcon: homeActiveIcon,
    },
    {
      name: "Search",
      screen: "Search",
      icon: searchIcon,
      activeIcon: searchActiveIcon,
    },
    {
      name: "Download",
      screen: "Download",
      icon: downloadIcon,
      activeIcon: downloadActiveIcon,
    },
    {
      name: "Profile",
      screen: "Profile",
      icon: profileIcon,
      activeIcon: profileActiveIcon,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive =
          route.name === tab.screen ||
          (tab.screen === "Home" && homeScreens.includes(route.name)) ||
          (tab.screen === "Profile" && profileScreens.includes(route.name));

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(tab.screen)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Image
              source={isActive ? tab.activeIcon : tab.icon}
              style={styles.icon}
            />

            {isActive && <Text style={styles.activeText}>{tab.name}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1F1D2B",
    paddingHorizontal: 39,
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: "#2A2A3D",
    gap: 17,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },

  activeTab: {
    flexDirection: "row",
    backgroundColor: "#2A2A3D",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  activeText: {
    marginLeft: 4,
    color: "#12CDD9",
    fontFamily: "Montserrat-Medium", // cần load font
    fontSize: 12,
    fontWeight: "500", // có thể bỏ nếu dùng đúng font file
    letterSpacing: 0.12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
