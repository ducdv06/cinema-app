import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ALL_MOVIES = [
  {
    id: "1",
    title: "Spider-Man: No Way Home",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/spider-man-poster.png"),
    navigateTo: "MovieDetail",
  },
  {
    id: "2",
    title: "Riverdale",
    year: "2017",
    duration: "45 Minutes",
    rating: "4.2",
    genre: "Drama",
    type: "Series",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/riverdale-poster.png"),
    navigateTo: "SerialDetail",
  },
  {
    id: "3",
    title: "Life of Pi",
    year: "2012",
    duration: "127 Minutes",
    rating: "4.5",
    genre: "Adventure",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/life-poster.png"),
    navigateTo: "MovieDetail",
  },
  {
    id: "4",
    title: "Harry Potter",
    year: "2001",
    duration: "152 Minutes",
    rating: "4.9",
    genre: "Fantasy",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/dot-poster.png"),
    navigateTo: "MovieDetail",
  },
  {
    id: "5",
    title: "The Batman",
    year: "2022",
    duration: "176 Minutes",
    rating: "4.8",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/Batman-poster.png"),
    navigateTo: "Trailer",
  },
  {
    id: "6",
    title: "Minions: The Rise of Gru",
    year: "2022",
    duration: "87 Minutes",
    rating: "4.5",
    genre: "Animation",
    type: "Movie",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/minion-poster.png"),
    navigateTo: "Trailer",
  },
  {
    id: "7",
    title: "Black Panther: Wakanda Forever",
    year: "2022",
    duration: "161 Minutes",
    rating: "4.7",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/black-panther-poster.png"),
    navigateTo: "Trailer",
  },
];

export default function MostPopularMovie() {
  const navigation = useNavigation();

  const handleMoviePress = (movie) => {
    navigation.navigate(movie.navigateTo, { movie: movie });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => handleMoviePress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.posterWrapper}>
        <Image source={item.poster} style={styles.poster} />
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={10} color="#FF8700" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.movieInfo}>
        <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/calendar-icon.png")} />
          <Text style={styles.metaText}>{item.year}</Text>
        </View>
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/clock-icon.png")} />
          <Text style={styles.metaText}>{item.duration}</Text>
          <View style={styles.pgBadge}>
            <Text style={styles.pgText}>PG-13</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/film-icon.png")} />
          <Text style={styles.metaText}>{item.genre}</Text>
          <View style={styles.separator} />
          <Text style={[styles.metaText, styles.metaTextBold]}>
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Most Popular Movie</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={ALL_MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 120,
  },
  movieCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  posterWrapper: {
    position: "relative",
  },
  poster: {
    width: 112,
    height: 147,
    borderRadius: 8,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(37, 40, 54, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingBadgeText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  movieInfo: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    gap: 13,
  },
  badge: {
    width: 72,
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: "center",
  },
  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 10,
    fontWeight: "500",
  },
  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
  },
  metaTextBold: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
  },
  pgBadge: {
    borderWidth: 1,
    borderColor: "#12CDD9",
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginLeft: 12,
  },
  pgText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: "#696974",
    marginHorizontal: 8,
    opacity: 0.5,
  },
});