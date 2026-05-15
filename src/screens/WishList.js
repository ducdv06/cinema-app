import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWishlist } from "../context/WishlistContext";
import BottomTabs from "../navigation/BottomTabs";

export default function WishList() {
  const navigation = useNavigation();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Hàm lấy ảnh poster đúng cho từng phim
  const getPosterImage = (movie) => {
    if (movie.image) return movie.image;
    if (movie.poster) return movie.poster;
    
    const posters = {
      "Spider-Man: No Way Home": require("../../assets/img/spider-man-poster.png"),
      "Riverdale": require("../../assets/img/riverdale-poster.png"),
      "Life of Pi": require("../../assets/img/life-poster.png"),
      "Harry Potter": require("../../assets/img/dot-poster.png"),
      "The Batman": require("../../assets/img/Batman-poster.png"),
      "Minions: The Rise of Gru": require("../../assets/img/minion-poster.png"),
      "Black Panther: Wakanda Forever": require("../../assets/img/black-panther-poster.png"),
      "The Jungle Book": require("../../assets/img/jungle-poster.png"),
    };
    return posters[movie.title] || require("../../assets/img/spider-man-poster.png");
  };

  // Hàm lấy ảnh trailer cho phim
  const getTrailerImage = (movie) => {
    const trailers = {
      "The Batman": require("../../assets/img/batman-trailer.png"),
      "Black Panther: Wakanda Forever": require("../../assets/img/black_panther_video_trailer.jpg"),
      "Minions: The Rise of Gru": require("../../assets/img/minions_video.jpg"),
    };
    return trailers[movie.title] || getPosterImage(movie);
  };

  const renderWishlistItem = ({ item }) => {
    // Nếu là phim trailer, dùng ảnh trailer
    const imageSource = item.navigateTo === "Trailer" 
      ? getTrailerImage(item) 
      : getPosterImage(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (item.navigateTo === "SerialDetail") {
            navigation.navigate("SerialDetail", { movie: item });
          } else if (item.navigateTo === "Trailer") {
            navigation.navigate("Trailer", { movie: item });
          } else {
            navigation.navigate("MovieDetail", { movie: item });
          }
        }}
        activeOpacity={0.8}
      >
        {/* Poster Image */}
        <Image source={imageSource} style={styles.image} />
        
        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.genre}>{item.genre || item.category || "Action"}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.type}>{item.type || "Movie"}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#FF8700" />
              <Text style={styles.rating}>{item.rating || "4.5"}</Text>
            </View>
          </View>
        </View>
        
        {/* Heart Icon - Xóa khỏi wishlist */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="heart" size={22} color="#FB4141" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 32 }} />
      </View>

      {wishlist.length === 0 ? (
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
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderWishlistItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
  },
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
  },
  emptyDesc: {
    marginTop: 8,
    color: "#92929D",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "MontserratMedium",
  },
  listContent: {
    paddingBottom: 120,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#252836",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  genre: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 11,
    marginBottom: 4,
  },
  title: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  type: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
  },
  heartBtn: {
    padding: 8,
  },
});