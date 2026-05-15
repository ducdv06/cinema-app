import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonApp from "../components/ButtonApp";

const PAYMENT_METHODS = [
  {
    id: "1",
    type: "visa",
    last4: "87652",
    logo: require("../../assets/icons/visa-logo.png"),
  },
  {
    id: "2",
    type: "mastercard",
    last4: "87652",
    logo: require("../../assets/icons/master-card-logo.png"),
  },
];

export default function PaymentMethod() {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState("1");
  const [successVisible, setSuccessVisible] = useState(false);

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
            <Text style={styles.headerTitle}>Payment Method</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* BADGE */}
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Payment Confirm</Text>
            </View>
          </View>

          {/* TITLE */}
          <Text style={styles.title}>
            Enjoy the viewing{"\n"}experience after you confirm{"\n"}the payment
          </Text>

          {/* CARD LIST */}
          <View style={styles.cardList}>
            {PAYMENT_METHODS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.cardItem,
                  selectedCard === item.id && styles.cardItemActive,
                ]}
                onPress={() => setSelectedCard(item.id)}
                activeOpacity={0.8}
              >
                <Image
                  source={item.logo}
                  style={styles.cardLogo}
                  resizeMode="contain"
                />
                <Text style={styles.cardNumber}>
                  ···· ···· ···· {item.last4}
                </Text>
                <View
                  style={[
                    styles.radio,
                    selectedCard === item.id && styles.radioActive,
                  ]}
                >
                  {selectedCard === item.id && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}

            {/* ADD NEW */}
            <TouchableOpacity style={styles.addNewBtn} activeOpacity={0.8}>
              <Ionicons name="add" size={20} color="#92929D" />
              <Text style={styles.addNewText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {/* PURCHASE BUTTON */}
          <View style={styles.buttonWrap}>
            <ButtonApp onPress={() => setSuccessVisible(true)}>
              Purchase Now
            </ButtonApp>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* SUCCESS MODAL */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            {/* ICON */}
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Image
                  source={require("../../assets/icons/payment-completed.png")}
                />
              </View>
            </View>

            <Text style={styles.successTitle}>
              Your payment has{"\n"}completed!
            </Text>

            <Text style={styles.successDesc}>
              Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim
              purus gravida donec aliquet.
            </Text>

            <TouchableOpacity
              style={styles.okBtn}
              onPress={() => {
                setSuccessVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },

  /* HEADER */
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

  /* BADGE */
  badgeWrapper: {
    alignItems: "center",
    marginTop: 32,
  },

  badge: {
    backgroundColor: "#FF8700",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  /* TITLE */
  title: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.12,
    lineHeight: 28,
    marginTop: 20,
    paddingHorizontal: 24,
  },

  /* CARD LIST */
  cardList: {
    marginHorizontal: 24,
    marginTop: 36,
    gap: 12,
  },

  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  cardItemActive: {
    borderColor: "#12CDD9",
  },

  cardLogo: {
    width: 52,
    height: 32,
  },

  cardNumber: {
    flex: 1,
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    letterSpacing: 2,
    marginLeft: 16,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#92929D",
    justifyContent: "center",
    alignItems: "center",
  },

  radioActive: {
    borderColor: "#12CDD9",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#12CDD9",
  },

  /* ADD NEW */
  addNewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252836",
    borderRadius: 16,
    paddingVertical: 18,
    gap: 8,
  },

  addNewText: {
    color: "#92929D",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  /* BUTTON */
  buttonWrap: {
    marginTop: 48,
    marginBottom: 40,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  successModal: {
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
    backgroundColor: "#1F1D2B",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#12CDD9",
  },

  successTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
    letterSpacing: 0.12,
  },

  successDesc: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 12,
    letterSpacing: 0.12,
  },

  okBtn: {
    marginTop: 24,
    backgroundColor: "#12CDD9",
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 30,
  },

  okText: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
});
