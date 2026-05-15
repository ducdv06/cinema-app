import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import storage from "../utils/storage";

// Tất cả phim
const ALL_MOVIES = [
  {
    id: "1",
    title: "Spider-Man No Way..",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    category: "Action",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/spider-man-poster.png"),
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
    category: "Drama",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/riverdale-poster.png"),
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
    category: "Adventure",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/life-poster.png"),
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
    category: "Action",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/black-panther-poster.png"),
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
    category: "Action",
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
    category: "Animation",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/minion-poster.png"),
    navigateTo: "Trailer",
  },
];

// Phim theo category
const getMoviesByCategory = (category) => {
  if (category === "All") return ALL_MOVIES;
  if (category === "Comedy") return ALL_MOVIES.filter(m => m.genre === "Animation");
  if (category === "Animation") return ALL_MOVIES.filter(m => m.genre === "Animation");
  if (category === "Dokumen") return ALL_MOVIES.filter(m => m.genre === "Drama");
  return ALL_MOVIES.filter(m => m.category === category);
};

const banners = [
  {
    id: "1",
    title: "",
    date: "",
    image: require("../../assets/img/banner3.jpg"),
  },
  {
    id: "2",
    title: "Black Panther: Wakanda Forever",
    date: "On Dec 16, 2022",
    image: require("../../assets/img/banner1.1.png"),
  },
  {
    id: "3",
    title: "",
    date: "",
    image: require("../../assets/img/banner1.jpg"),
  },
];

const upcomingMovies = [
  {
    id: "1",
    title: "Black Panther: Wakanda Forever",
    date: "On Dec 16, 2022",
    genre: "Action",
    image: require("../../assets/img/black-panther-poster.png"),
  },
  {
    id: "2",
    title: "The Batman",
    date: "On March 2, 2022",
    genre: "Action",
    image: require("../../assets/img/Batman-poster.png"),
  },
  {
    id: "3",
    title: "Minions",
    date: "On July 1, 2022",
    genre: "Animation",
    image: require("../../assets/img/minion-poster.png"),
  },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayMovies, setDisplayMovies] = useState(ALL_MOVIES);
  const navigation = useNavigation();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setDisplayMovies(getMoviesByCategory(selectedCategory));
  }, [selectedCategory]);

  useFocusEffect(
    React.useCallback(() => {
      setSearchText("");
    }, [])
  );

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

  const handleMoviePress = (movie) => {
    navigation.navigate(movie.navigateTo, { movie: movie });
  };

  const handleUpcomingPress = (movie) => {
    navigation.navigate("Trailer", { movie: movie });
  };

  const categories = ["All", "Comedy", "Animation", "Dokumen"];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={
                user?.avatar 
                  ? { uri: user.avatar } 
                  : require("../../assets/icons/avatar.png")
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.hello}>Hello, {user?.fullName || "Smith"}</Text>
              <Text style={styles.subText}>
                Let's stream your favorite movie
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Ionicons name="heart" size={24} color="#FB4141" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => navigation.navigate("Search", { fromHome: false })}>
            <Ionicons name="search" size={18} color="#999" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search a title..."
            placeholderTextColor="#999"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => {
              if (searchText.trim().length > 0) {
                navigation.navigate("Search", { searchQuery: searchText, fromHome: true });
              }
            }}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={() => navigation.navigate("Genre")}>
            <Image source={require("../../assets/icons/filter-icon.png")} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={banners}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Banner image={item.image} title={item.title} date={item.date} />
            )}
          />
        </View>

        {/* Dots */}
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBtn,
                  selectedCategory === category && styles.activeCategory
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.activeCategoryText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Most Popular Section */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Most popular</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MostPopularMovie")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Most Popular Movies FlatList */}
        <FlatList
          data={displayMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.movieList}
          contentContainerStyle={styles.movieListContent}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <MovieCard
              image={item.poster}
              title={item.title}
              category={item.genre}
              rating={item.rating}
              onPress={() => handleMoviePress(item)}
            />
          )}
        />

        {/* Upcoming Movies Section */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Upcoming Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("UpcomingMovies")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={upcomingMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.movieList}
          contentContainerStyle={styles.movieListContent}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleUpcomingPress(item)} 
              style={styles.upcomingCard}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={styles.upcomingImage} />
              <Text style={styles.upcomingTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.upcomingDate}>{item.date}</Text>
              <Text style={styles.upcomingGenre}>{item.genre}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 16,
  },
  hello: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    lineHeight: 22,
  },
  subText: {
    color: "#92929D",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    lineHeight: 16,
  },
  heartBtn: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#252836",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A3D",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 33,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    color: "#FFFFFF",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#19545F",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#12CDD9",
    width: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  categories: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#252836",
  },
  activeCategory: {
    backgroundColor: "#12CDD9",
  },
  categoryText: {
    color: "#EBEBEF",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
  },
  activeCategoryText: {
    color: "#FFF",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  seeAll: {
    color: "#12CDD9",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginTop: 15,
  },
  movieList: {
    marginTop: 4,
  },
  movieListContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  upcomingCard: {
    width: 150,
    marginRight: 12,
    marginTop: 12,
  },
  upcomingImage: {
    width: 150,
    height: 200,
    borderRadius: 12,
  },
  upcomingTitle: {
    color: "#FFF",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    marginTop: 8,
  },
  upcomingDate: {
    color: "#92929D",
    fontFamily: "Montserrat-Medium",
    fontSize: 11,
    marginTop: 4,
  },
  upcomingGenre: {
    color: "#12CDD9",
    fontFamily: "Montserrat-Medium",
    fontSize: 10,
    marginTop: 2,
  },
});