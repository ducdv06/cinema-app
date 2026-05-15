import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import ButtonApp from "../components/ButtonApp";

export default function TestScreen() {
  const testFunction = () => {
    console.log("=== TEST FUNCTION CALLED ===");
    Alert.alert("Thành công", "Nút đã hoạt động!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1F1D2B", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", marginBottom: 20 }}>Test Screen</Text>
      
      {/* Nút test 1 - dùng TouchableOpacity thuần */}
      <TouchableOpacity
        onPress={() => {
          console.log("Nút 1 bấm");
          Alert.alert("Test 1", "Nút thuần hoạt động!");
        }}
        style={{ backgroundColor: "blue", padding: 15, marginBottom: 10, width: 200, alignItems: "center" }}
      >
        <Text style={{ color: "white" }}>Test Button 1 (Pure)</Text>
      </TouchableOpacity>

      {/* Nút test 2 - dùng ButtonApp */}
      <ButtonApp
        onPress={() => {
          console.log("Nút 2 bấm");
          Alert.alert("Test 2", "ButtonApp hoạt động!");
        }}
      >
        Test Button 2 (ButtonApp)
      </ButtonApp>
    </SafeAreaView>
  );
}