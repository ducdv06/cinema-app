import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWishlist } from "../context/WishlistContext";

export default function MovieCard({ image, title, category, rating, onPress, movieData }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const movie = movieData || { id: title, title, image, rating, genre: category };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
        
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#FFA500" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>

        <TouchableOpacity 
          style={styles.heartIcon}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(movie);
          }}
        >
          <Ionicons 
            name={isInWishlist(movie.id) ? "heart" : "heart-outline"} 
            size={18} 
            color={isInWishlist(movie.id) ? "#FB4141" : "#FFFFFF"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#252836",
    marginTop: 16,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
  },
  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(37, 40, 54, 0.65)",
  },
  ratingText: {
    color: "#FF8700",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  },
  info: {
    paddingHorizontal: 8,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    paddingTop: 12,
  },
  category: {
    color: "#92929D",
    fontFamily: "Montserrat-Medium",
    fontSize: 10,
    marginTop: 4,
    paddingBottom: 8,
  },
});