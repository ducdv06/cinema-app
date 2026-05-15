import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";

const upcomingMovies = [
  {
    id: "1",
    title: "The Batman",
    date: "March 2, 2022",
    genre: "Action",
    year: "2022",
    duration: "176 Minutes",
    rating: "4.8",
    description: "Batman điều tra một loạt án mạng ở Gotham",
    image: require("../../assets/img/Batman-poster.png"),
    trailer: require("../../assets/img/batman-trailer.png"),
  },
  {
    id: "2",
    title: "Black Panther: Wakanda Forever",
    date: "November 11, 2022",
    genre: "Action",
    year: "2022",
    duration: "161 Minutes",
    rating: "4.7",
    description: "Sau sự ra đi của T'Challa, Wakanda phải đối mặt với mối đe dọa mới từ Namor. Shuri dần trưởng thành, vượt qua nỗi đau để gánh vác trách nhiệm bảo vệ đất nước.",
    image: require("../../assets/img/black-panther-poster.png"),
    trailer: require("../../assets/img/black_panther_video_trailer.jpg"),
  },
  {
    id: "3",
    title: "Minions: The Rise of Gru",
    date: "July 1, 2022",
    genre: "Animation",
    year: "2022",
    duration: "87 Minutes",
    rating: "4.5",
    description: "Cậu bé 12 tuổi Gru mơ ước trở thành siêu ác nhân vĩ đại nhất. Cùng với Minions, họ tham gia vào nhiều tình huống dở khóc dở cười và học được bài học về tình bạn.",
    image: require("../../assets/img/minion-poster.png"),
    trailer: require("../../assets/img/minions_video.jpg"),
  },
];

export default function UpcomingMovie() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleMoviePress = (movie) => {
    navigation.navigate("Trailer", { movie: movie });
  };

  const filterMovies = () => {
    if (selectedCategory === "All") {
      return upcomingMovies;
    }
    return upcomingMovies.filter(movie => movie.genre === selectedCategory);
  };

  const categories = ["All", "Action", "Animation", "Comedy"];

  const filteredMovies = filterMovies();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upcoming Movie</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* CATEGORY */}
        <View style={styles.categoryWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBtn,
                  selectedCategory === item && styles.activeCategoryBtn,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.activeCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* MOVIES */}
        {filteredMovies.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          >
            {filteredMovies.map((movie) => (
              <TouchableOpacity 
                key={movie.id} 
                style={styles.movieCard}
                onPress={() => handleMoviePress(movie)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image source={movie.image} style={styles.movieImage} />
                  <View style={styles.playOverlay}>
                    <Ionicons name="play-circle" size={50} color="#FFF" />
                  </View>
                </View>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDescription} numberOfLines={2}>
                  {movie.description}
                </Text>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Feather name="calendar" size={12} color="#92929D" />
                    <Text style={styles.infoText}>{movie.date}</Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.infoItem}>
                    <MaterialIcons name="movie" size={13} color="#92929D" />
                    <Text style={styles.infoText}>{movie.genre}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No movies in this category</Text>
          </View>
        )}
      </View>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 52,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
  },
  categoryWrapper: {
    marginTop: 24,
    height: 44,
  },
  categoryRow: {
    alignItems: "center",
    paddingRight: 24,
    gap: 12,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252836",
  },
  activeCategoryBtn: {
    backgroundColor: "#12CDD9",
  },
  categoryText: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.12,
  },
  activeCategoryText: {
    color: "#FFF",
  },
  movieList: {
    marginTop: 21,
    paddingBottom: 120,
  },
  movieCard: {
    marginBottom: 24,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
  },
  movieDescription: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: "#92929D",
    opacity: 0.5,
    marginHorizontal: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "#92929D",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
});