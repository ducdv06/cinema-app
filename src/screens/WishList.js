import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const navigation = useNavigation();
  const { wishlist, removeFromWishlist } = useWishlist();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* THUMBNAIL */}
      <View style={styles.thumbnailWrapper}>
        <Image source={item.image} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={22} color="#fff" />
        </View>
      </View>

      {/* INFO */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardGenre}>{item.genre || "Action"}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardType}>{item.type || "Movie"}</Text>
          <FontAwesome
            name="star"
            size={12}
            color="#FF8700"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.cardRating}>{item.rating || "4.5"}</Text>
        </View>
      </View>

      {/* HEART */}
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => removeFromWishlist(item.id)}
      >
        <Ionicons name="heart" size={22} color="#FB4141" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 32 }} />
      </View>

      {wishlist.length === 0 ? (
        /* EMPTY STATE */
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/img/wishlist-img.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>There Is No Movie Yet!</Text>
          <Text style={styles.emptyDesc}>
            Find your movie by Type title,{"\n"}categories, years, etc
          </Text>
        </View>
      ) : (
        /* WISHLIST */
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
    letterSpacing: 0.12,
  },

  /* EMPTY */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },

  emptyImage: {
    width: 76,
    height: 76,
    resizeMode: "contain",
  },

  emptyTitle: {
    marginTop: 16,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
    letterSpacing: 0.12,
  },

  emptyDesc: {
    marginTop: 8,
    color: "#92929D",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    fontFamily: "MontserratMedium",
    letterSpacing: 0.12,
  },

  /* LIST */
  listContent: {
    gap: 12,
    paddingBottom: 120,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },

  thumbnailWrapper: {
    width: 100,
    height: 70,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInfo: {
    flex: 1,
    gap: 4,
  },

  cardGenre: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },

  cardTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardType: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },

  cardRating: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    marginLeft: 4,
  },

  heartBtn: {
    padding: 4,
  },
});
