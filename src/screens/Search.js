import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";

// Danh sách phim
const ALL_MOVIES = [
  {
    id: "1",
    title: "Spider-Man No Way..",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    image: require("../../assets/img/spider-man-poster.png"),
    navigateTo: "MovieDetail",
  },
  {
    id: "2",
    title: "Riverdale",
    year: "2021",
    duration: "45 Minutes",
    rating: "4.2",
    genre: "Drama",
    type: "Series",
    badge: "Free",
    badgeColor: "#12CDD9",
    image: require("../../assets/img/riverdale-poster.png"),
    navigateTo: "SerialDetail",
  },
  {
    id: "3",
    title: "Life of Pi",
    year: "2021",
    duration: "127 Minutes",
    rating: "4.5",
    genre: "Adventure",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    image: require("../../assets/img/life-poster.png"),
    navigateTo: "MovieDetail",
  },
  {
    id: "4",
    title: "Black Panther: Wakanda Forever",
    year: "2022",
    duration: "161 Minutes",
    rating: "4.7",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    image: require("../../assets/img/black-panther-poster.png"),
    navigateTo: "Trailer",
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
    image: require("../../assets/img/Batman-poster.png"),
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
    image: require("../../assets/img/minion-poster.png"),
    navigateTo: "Trailer",
  },
];

// Danh sách diễn viên
const ALL_ACTORS = [
  {
    id: "1",
    name: "John Wilson",
    avatar: require("../../assets/icons/actor-1.png"),
  },
  {
    id: "2",
    name: "John Deere",
    avatar: require("../../assets/icons/actor-2.png"),
  },
  {
    id: "3",
    name: "John Cena",
    avatar: require("../../assets/icons/actor-3.png"),
  },
  {
    id: "4",
    name: "John Stamo",
    avatar: require("../../assets/icons/actor-4.png"),
  },
];

const RECOMMEND_MOVIES = [
  {
    id: "rec1",
    title: "The Jungle Waiting",
    rating: "4.5",
    genre: "Action",
    image: require("../../assets/img/jungle-poster.png"),
  },
  {
    id: "rec2",
    title: "Life of PI",
    rating: "4.5",
    genre: "Action",
    image: require("../../assets/img/life-poster.png"),
  },
  {
    id: "rec3",
    title: "Riverdale",
    rating: "4.2",
    genre: "Drama",
    image: require("../../assets/img/riverdale-poster.png"),
  },
  {
    id: "rec4",
    title: "Spider-Man No..",
    rating: "4.5",
    genre: "Action",
    image: require("../../assets/img/spider-man-poster.png"),
  },
];

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialQuery = route.params?.searchQuery || "";
  const fromHome = route.params?.fromHome || false;
  
  const [search, setSearch] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(fromHome);

  useEffect(() => {
    if (fromHome && search.trim().length === 0 && !isFocused) {
      navigation.goBack();
    }
  }, [search, fromHome, isFocused]);

  const trimmed = search.trim().toLowerCase();

  const filteredActors = trimmed
    ? ALL_ACTORS.filter((a) => a.name.toLowerCase().includes(trimmed))
    : [];

  const filteredMovies = trimmed
    ? ALL_MOVIES.filter((m) => 
        m.title.toLowerCase().includes(trimmed) || 
        m.genre.toLowerCase().includes(trimmed)
      )
    : [];

  const hasActors = filteredActors.length > 0;
  const hasMovies = filteredMovies.length > 0;

  const handleCancel = () => {
    if (fromHome) {
      navigation.goBack();
    } else {
      setSearch("");
      setIsFocused(false);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate(movie.navigateTo, { movie: movie });
  };

  const renderMovieCard = (item, isMovieRelated = false) => (
    <TouchableOpacity
      key={item.id}
      style={styles.movieCard}
      activeOpacity={0.8}
      onPress={() => handleMoviePress(item)}
    >
      <View style={styles.posterWrapper}>
        <Image source={item.image} style={styles.poster} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FF8700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
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
          <Text style={[styles.metaText, styles.metaTypeBold]}>
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recommendCard}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
    >
      <Image source={item.image} style={styles.recommendImage} />
      <View style={styles.recommendRating}>
        <Ionicons name="star" size={10} color="#FF8700" />
        <Text style={styles.recommendRatingText}>{item.rating}</Text>
      </View>
      <Text style={styles.recommendTitle}>{item.title}</Text>
      <Text style={styles.recommendGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* SEARCH ROW */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onFocus={() => setIsFocused(true)}
              placeholder="Type title, categories, years, etc"
              placeholderTextColor="#999"
              style={styles.input}
              returnKeyType="search"
              autoFocus={fromHome}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={18} color="#92929D" />
              </TouchableOpacity>
            )}
          </View>

          {(isFocused || search.length > 0) && (
            <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SEARCH RESULTS */}
        {trimmed.length > 0 ? (
          <>
            {/* ACTORS */}
            {hasActors && (
              <>
                <Text style={styles.sectionTitle}>Actors</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.actorsContainer}>
                    {filteredActors.map((actor) => (
                      <TouchableOpacity key={actor.id} style={styles.actorItem}>
                        <Image source={actor.avatar} style={styles.actorAvatar} />
                        <Text style={styles.actorName}>{actor.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}

            {/* MOVIE RELATED */}
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Movie Related</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.movieList}>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((item) => renderMovieCard(item))
              ) : (
                <View style={styles.emptyContainer}>
                  <Image
                    source={require("../../assets/icons/no-icon.png")}
                    style={styles.emptyIcon}
                  />
                  <Text style={styles.emptyTitle}>
                    We Are Sorry, We Can{"\n"}Not Find The Movie :(
                  </Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            {/* CATEGORIES */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categories}>
                <TouchableOpacity style={styles.activeCategoryBtn}>
                  <Text style={styles.activeCategoryText}>All</Text>
                </TouchableOpacity>
                <Text style={styles.category}>Comedy</Text>
                <Text style={styles.category}>Animation</Text>
                <Text style={styles.category}>Dokumen</Text>
              </View>
            </ScrollView>

            {/* TODAY SECTION */}
            <Text style={styles.sectionTitle}>Today</Text>
            {renderMovieCard(ALL_MOVIES[0])}

            {/* RECOMMEND FOR YOU */}
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Recommend for you</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={RECOMMEND_MOVIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderRecommendItem}
              contentContainerStyle={styles.recommendList}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            />
          </>
        )}
      </ScrollView>

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
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  cancelBtn: {
    paddingVertical: 8,
  },
  cancelText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  activeCategoryBtn: {
    backgroundColor: "#2A2A3D",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  activeCategoryText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
  category: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
  },
  seeAll: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  movieList: {
    paddingHorizontal: 24,
  },
  movieCard: {
    flexDirection: "row",
    marginBottom: 16,
  },
  posterWrapper: {
    position: "relative",
  },
  poster: {
    width: 112,
    height: 147,
    borderRadius: 16,
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
  ratingText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  movieInfo: {
    flex: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 10,
  },
  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
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
  },
  metaTypeBold: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
  },
  pgBadge: {
    borderWidth: 1,
    borderColor: "#12CDD9",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 8,
  },
  pgText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: "#696974",
    marginHorizontal: 6,
    opacity: 0.5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  actorsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 20,
  },
  actorItem: {
    alignItems: "center",
    width: 72,
  },
  actorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  actorName: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
  recommendList: {
    paddingLeft: 24,
    paddingRight: 12,
    marginTop: 12,
  },
  recommendCard: {
    width: 130,
    marginRight: 12,
    position: "relative",
  },
  recommendImage: {
    width: 130,
    height: 170,
    borderRadius: 12,
  },
  recommendRating: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(37, 40, 54, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 2,
  },
  recommendRatingText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 10,
  },
  recommendTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    marginTop: 8,
  },
  recommendGenre: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
    marginTop: 2,
  },
});