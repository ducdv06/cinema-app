import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDownload } from "../context/DownloadContext";
import { useWishlist } from "../context/WishlistContext";

const { width, height } = Dimensions.get("window");

// Dữ liệu story line cho từng phim
const STORY_DATA = {
  "Spider-Man: No Way Home": {
    full: `SPIDER-MAN: NO WAY HOME is a thrilling, emotional superhero epic that follows Peter Parker as his identity is revealed, throwing his life into chaos. Seeking help from Doctor Strange, Peter accidentally unleashes the multiverse, bringing dangerous villains from alternate realities into his world. As everything spirals out of control, he must confront loss, responsibility, and what it truly means to be Spider-Man. With intense action, powerful performances, and nostalgic surprises, the film delivers one of the most impactful stories in the Spider-Man saga.`,
    short: `SPIDER-MAN: NO WAY HOME follows Peter Parker as his identity is revealed, unleashing the multiverse and bringing dangerous villains from alternate realities into his world.`,
  },
  "Life of Pi": {
    full: `LIFE OF PI is a visually breathtaking and deeply philosophical adventure that follows Pi Patel, a young boy stranded at sea after a tragic shipwreck. Sharing a lifeboat with a Bengal tiger, Pi must rely on courage, faith, and imagination to survive the vast and unforgiving ocean. As reality and storytelling intertwine, his journey becomes a powerful exploration of belief, resilience, and the human spirit.`,
    short: `LIFE OF PI is a visually stunning adventure about a boy surviving at sea with a tiger, exploring faith and survival.`,
  },
  "Harry Potter": {
    full: `HARRY POTTER is a magical fantasy saga that follows a young boy who discovers he is a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry. As Harry grows up, he forms deep friendships while uncovering the truth about his past and his connection to the dark wizard Voldemort. Across years of danger, mystery, and powerful magic, Harry evolves from an innocent child into a brave hero.`,
    short: `HARRY POTTER follows a young wizard who discovers his destiny and faces dark forces in a world of magic.`,
  },
  "Riverdale": {
    full: `RIVERDALE is a dark and stylized teen drama that explores the hidden darkness beneath a seemingly perfect small town. Following Archie, Betty, Veronica, and Jughead, the series begins with a mysterious death that unravels a web of secrets, crime, and betrayal. As the characters navigate love, identity, and danger, they are drawn deeper into a world filled with unexpected twists.`,
    short: `RIVERDALE is a dark teen drama where a group of friends uncover secrets and mysteries hidden within their small town.`,
  },
};

// Dữ liệu cast
const CAST_DATA = {
  "Spider-Man: No Way Home": [
    { name: "Tom Holland", role: "Peter Parker / Spider-Man" },
    { name: "Zendaya", role: "MJ" },
    { name: "Benedict Cumberbatch", role: "Doctor Strange" },
    { name: "Jon Watts", role: "Director" },
  ],
  "Life of Pi": [
    { name: "Suraj Sharma", role: "Pi Patel" },
    { name: "Irrfan Khan", role: "Adult Pi" },
    { name: "Ang Lee", role: "Director" },
    { name: "David Magee", role: "Writer" },
  ],
  "Harry Potter": [
    { name: "Daniel Radcliffe", role: "Harry Potter" },
    { name: "Emma Watson", role: "Hermione Granger" },
    { name: "Rupert Grint", role: "Ron Weasley" },
    { name: "Chris Columbus", role: "Director" },
  ],
  "Riverdale": [
    { name: "KJ Apa", role: "Archie Andrews" },
    { name: "Lili Reinhart", role: "Betty Cooper" },
    { name: "Camila Mendes", role: "Veronica Lodge" },
    { name: "Roberto Aguirre-Sacasa", role: "Creator" },
  ],
};

// Ảnh poster cho từng phim
const POSTER_IMAGES = {
  "Spider-Man: No Way Home": require("../../assets/img/spider-man-poster.png"),
  "Life of Pi": require("../../assets/img/life-poster.png"),
  "Harry Potter": require("../../assets/img/dot-poster.png"),
  "Riverdale": require("../../assets/img/riverdale-poster.png"),
};

export default function MovieDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params || {};
  const [shareVisible, setShareVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addDownload } = useDownload();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const movieData = movie || {
    id: "1",
    title: "Spider-Man: No Way Home",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    image: POSTER_IMAGES["Spider-Man: No Way Home"],
  };

  const posterImage = movieData.image || POSTER_IMAGES[movieData.title] || POSTER_IMAGES["Spider-Man: No Way Home"];
  const storyData = STORY_DATA[movieData.title] || {
    full: "No description available.",
    short: "No description available.",
  };
  const castList = CAST_DATA[movieData.title] || CAST_DATA["Spider-Man: No Way Home"];
  const displayStory = isExpanded ? storyData.full : storyData.short;

  const handleAddDownload = () => {
    addDownload({
      id: movieData.id,
      title: movieData.title,
      image: posterImage,
      genre: movieData.genre,
      type: "Movie",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {movieData.title}
          </Text>
          <TouchableOpacity 
            style={styles.heartBtn}
            onPress={() => toggleWishlist(movieData)}
          >
            <Ionicons 
              name={isInWishlist(movieData.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={isInWishlist(movieData.id) ? "#FB4141" : "#FFF"} 
            />
          </TouchableOpacity>
        </View>

        {/* Poster */}
        <View style={styles.posterContainer}>
          <Image source={posterImage} style={styles.poster} resizeMode="cover" />
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={require("../../assets/icons/calendar-icon.png")} style={styles.iconSmall} />
            <Text style={styles.infoText}>{movieData.year}</Text>
          </View>
          <View style={styles.dotSeparator} />
          <View style={styles.infoItem}>
            <Image source={require("../../assets/icons/clock-icon.png")} style={styles.iconSmall} />
            <Text style={styles.infoText}>{movieData.duration}</Text>
          </View>
          <View style={styles.dotSeparator} />
          <View style={styles.infoItem}>
            <Image source={require("../../assets/icons/film-icon.png")} style={styles.iconSmall} />
            <Text style={styles.infoText}>{movieData.genre}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={16} color="#FF8700" />
          <Text style={styles.ratingText}>{movieData.rating}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.playBtn}>
            <Ionicons name="play" size={18} color="#fff" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={handleAddDownload}>
            <Feather name="download" size={20} color="#FF8700" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={() => setShareVisible(true)}>
            <Ionicons name="share-social" size={20} color="#FF8700" />
          </TouchableOpacity>
        </View>

        {/* Story Line */}
        <View style={styles.storyContainer}>
          <Text style={styles.sectionTitle}>Story Line</Text>
          <Text style={styles.storyText}>
            {displayStory}
            <Text style={styles.moreText} onPress={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? " Less" : " More"}
            </Text>
          </Text>
        </View>

        {/* Cast and Crew */}
        <View style={styles.castContainer}>
          <Text style={styles.sectionTitle}>Cast and Crew</Text>
          {castList.map((person, index) => (
            <View key={index} style={styles.castItem}>
              <View style={styles.castAvatar}>
                <Text style={styles.castAvatarText}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.castInfo}>
                <Text style={styles.castName}>{person.name}</Text>
                <Text style={styles.castRole}>{person.role}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Share Modal */}
      <Modal visible={shareVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShareVisible(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.shareTitle}>Share to</Text>
            <View style={styles.shareRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/icons/facebook-icon.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/icons/instagram-icon.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/icons/messenger-icon.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/icons/send-icon.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1D2B", paddingTop: 52 },
  scrollView: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 20 },
  headerTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, flex: 1, marginHorizontal: 10, textAlign: "center" },
  heartBtn: { backgroundColor: "#252836", padding: 6, borderRadius: 12 },
  posterContainer: { alignItems: "center", marginTop: 10 },
  poster: { width: width * 0.5, height: height * 0.35, borderRadius: 20, backgroundColor: "#252836" },
  iconSmall: { width: 16, height: 16, resizeMode: "contain" },
  infoRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 },
  infoItem: { flexDirection: "row", alignItems: "center" },
  infoText: { marginLeft: 6, color: "#92929D", fontFamily: "MontserratMedium", fontSize: 12 },
  dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#92929D", marginHorizontal: 10 },
  ratingRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 },
  ratingText: { color: "#FF8700", fontFamily: "MontserratSemiBold", fontSize: 14, marginLeft: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 },
  playBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#FF8700", paddingHorizontal: 32, paddingVertical: 12, borderRadius: 30, marginRight: 16 },
  playText: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, marginLeft: 8 },
  circleBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#252836", justifyContent: "center", alignItems: "center", marginHorizontal: 6 },
  storyContainer: { marginTop: 28, paddingHorizontal: 24 },
  sectionTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, marginBottom: 10 },
  storyText: { color: "#EBEBEF", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 22 },
  moreText: { color: "#12CDD9", fontFamily: "MontserratSemiBold" },
  castContainer: { marginTop: 24, marginBottom: 100, paddingHorizontal: 24 },
  castItem: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  castAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#252836", justifyContent: "center", alignItems: "center", marginRight: 12 },
  castAvatarText: { color: "#12CDD9", fontFamily: "MontserratSemiBold", fontSize: 16 },
  castInfo: { flex: 1 },
  castName: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 14 },
  castRole: { color: "#92929D", fontFamily: "MontserratMedium", fontSize: 12, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  shareModal: { width: width * 0.8, backgroundColor: "#252836", borderRadius: 20, paddingVertical: 24, paddingHorizontal: 20, alignItems: "center" },
  closeBtn: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(31,29,43,0.8)", justifyContent: "center", alignItems: "center" },
  shareTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 18, marginTop: 20 },
  shareRow: { flexDirection: "row", marginTop: 30, gap: 20, marginBottom: 20 },
  socialBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#1F1D2B", justifyContent: "center", alignItems: "center" },
});