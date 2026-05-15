import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWishlist } from "../context/WishlistContext";

// Dữ liệu Cast and Crew theo từng phim
const CAST_CREW_DATA = {
  "The Batman": {
    cast: [
      { name: "Robert Pattinson", role: "Batman", avatar: "RP" },
      { name: "Zoë Kravitz", role: "Catwoman", avatar: "ZK" },
      { name: "Paul Dano", role: "Riddler", avatar: "PD" },
      { name: "Colin Farrell", role: "Penguin", avatar: "CF" },
    ],
    crew: [
      { name: "Matt Reeves", role: "Director", avatar: "MR" },
      { name: "Peter Craig", role: "Writer", avatar: "PC" },
    ],
    gallery: [
      require("../../assets/img/batman-trailer.png"),
      require("../../assets/img/Batman-poster.png"),
      require("../../assets/img/batman-trailer.png"),
    ],
  },
  "Black Panther: Wakanda Forever": {
    cast: [
      { name: "Letitia Wright", role: "Shuri", avatar: "LW" },
      { name: "Lupita Nyong'o", role: "Nakia", avatar: "LN" },
      { name: "Danai Gurira", role: "Okoye", avatar: "DG" },
      { name: "Tenoch Huerta", role: "Namor", avatar: "TH" },
    ],
    crew: [
      { name: "Ryan Coogler", role: "Director", avatar: "RC" },
      { name: "Joe Robert Cole", role: "Writer", avatar: "JC" },
    ],
    gallery: [
      require("../../assets/img/black-panther-poster.png"),
      require("../../assets/img/black_panther_video_trailer.jpg"),
    ],
  },
  "Minions: The Rise of Gru": {
    cast: [
      { name: "Steve Carell", role: "Gru", avatar: "SC" },
      { name: "Pierre Coffin", role: "Minions", avatar: "PC" },
      { name: "Taraji P. Henson", role: "Belle Bottom", avatar: "TH" },
      { name: "Michelle Yeoh", role: "Master Chow", avatar: "MY" },
    ],
    crew: [
      { name: "Kyle Balda", role: "Director", avatar: "KB" },
      { name: "Brad Ableson", role: "Co-Director", avatar: "BA" },
    ],
    gallery: [
      require("../../assets/img/minion-poster.png"),
      require("../../assets/img/minions_video.jpg"),
    ],
  },
};

export default function Trailer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const getTrailerImage = (title) => {
    const trailers = {
      "The Batman": require("../../assets/img/batman-trailer.png"),
      "Black Panther: Wakanda Forever": require("../../assets/img/black_panther_video_trailer.jpg"),
      "Minions: The Rise of Gru": require("../../assets/img/minions_video.jpg"),
    };
    return trailers[title] || require("../../assets/img/batman-trailer.png");
  };

  const movieData = movie || {
    id: "5",
    title: "The Batman",
    year: "2022",
    duration: "176 Minutes",
    rating: "4.8",
    genre: "Action",
    date: "March 2, 2022",
    image: require("../../assets/img/Batman-poster.png"),
  };

  const trailerImage = getTrailerImage(movieData.title);
  const castCrew = CAST_CREW_DATA[movieData.title] || CAST_CREW_DATA["The Batman"];

  const getStoryLine = (title) => {
    const stories = {
      "The Batman": `THE BATMAN is an edgy, action-packed thriller that depicts Batman in his early years, struggling to balance rage with righteousness as he investigates a disturbing mystery that has terrorized Gotham. Robert Pattinson delivers a raw, intense portrayal of Batman as a disillusioned, desperate vigilante awakened by the realization that revenge doesn't bring justice. The film also stars Zoë Kravitz as Catwoman, Paul Dano as Riddler, and Colin Farrell as Penguin. With its dark atmosphere, gripping detective story, and stunning action sequences, THE BATMAN is one of the most acclaimed superhero films of all time.`,
      "Black Panther: Wakanda Forever": `Black Panther: Wakanda Forever is an emotional superhero film set after the passing of King T'Challa. Wakanda falls into crisis as they face both the pain of loss and external forces trying to steal their precious Vibranium resources. Meanwhile, a mysterious underwater nation led by Namor emerges and threatens Wakanda's existence. Shuri must grow up, overcome her grief, and take responsibility for protecting her nation. The film stands as a beautiful tribute to Chadwick Boseman.`,
      "Minions: The Rise of Gru": `Minions: The Rise of Gru is a hilarious animated film about the childhood of Gru – a 12-year-old boy who dreams of becoming the world's greatest supervillain. Set in the 1970s during America's disco craze, Gru and his Minions (Kevin, Stuart, and Bob) get into hilarious situations as they try to join a famous villain group called "The Vicious 6". Along the way, they learn valuable lessons about friendship, loyalty, and growing up.`,
    };
    return stories[title] || stories["The Batman"];
  };

  const fullStory = getStoryLine(movieData.title);
  const shortStory = fullStory.substring(0, 200) + "...";
  const displayStory = isExpanded ? fullStory : shortStory;

  const renderGalleryItem = ({ item, index }) => (
    <Image key={index} source={item} style={styles.galleryImage} />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trailer</Text>
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

        {/* VIDEO PLAYER */}
        <View style={styles.videoContainer}>
          <Image source={trailerImage} style={styles.videoThumbnail} />
          <View style={styles.playIconContainer}>
            <Ionicons name="play-circle" size={60} color="#FFF" />
          </View>
        </View>

        {/* MOVIE TITLE + META */}
        <View style={styles.titleSection}>
          <Text style={styles.movieTitle}>{movieData.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Release Date:</Text>
            <Text style={styles.metaValue}> {movieData.date || "March 2, 2022"}</Text>
            <Text style={styles.separator}> | </Text>
            <Text style={styles.metaLabel}>{movieData.genre}</Text>
          </View>
        </View>

        {/* SYNOPSIS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsisText}>
            {displayStory}
            <Text style={styles.moreText} onPress={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? " Less" : " More"}
            </Text>
          </Text>
        </View>

        {/* CAST AND CREW */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cast and Crew</Text>
          
          {/* Cast */}
          <View style={styles.castRow}>
            {castCrew.cast.map((person, index) => (
              <View key={index} style={styles.castItem}>
                <View style={styles.castAvatar}>
                  <Text style={styles.castAvatarText}>{person.avatar}</Text>
                </View>
                <View>
                  <Text style={styles.castName}>{person.name}</Text>
                  <Text style={styles.castRole}>{person.role}</Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Crew */}
          <View style={styles.crewRow}>
            {castCrew.crew.map((person, index) => (
              <View key={index} style={styles.castItem}>
                <View style={styles.castAvatar}>
                  <Text style={styles.castAvatarText}>{person.avatar}</Text>
                </View>
                <View>
                  <Text style={styles.castName}>{person.name}</Text>
                  <Text style={styles.castRole}>{person.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* GALLERY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <FlatList
            data={castCrew.gallery}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderGalleryItem}
            contentContainerStyle={styles.galleryList}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>
      </ScrollView>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1D2B", paddingTop: 52 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 20 },
  headerTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16 },
  heartBtn: { backgroundColor: "#252836", padding: 8, borderRadius: 20 },
  videoContainer: { marginHorizontal: 24, borderRadius: 16, overflow: "hidden", backgroundColor: "#000", height: 200, position: "relative" },
  videoThumbnail: { width: "100%", height: "100%", resizeMode: "cover" },
  playIconContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  titleSection: { paddingHorizontal: 24, marginTop: 20 },
  movieTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 20, marginBottom: 6 },
  metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  metaLabel: { color: "#92929D", fontFamily: "MontserratMedium", fontSize: 12 },
  metaValue: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 12 },
  separator: { color: "#92929D", marginHorizontal: 4 },
  section: { paddingHorizontal: 24, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, marginBottom: 12 },
  synopsisText: { color: "#EBEBEF", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 22 },
  moreText: { color: "#12CDD9", fontFamily: "MontserratSemiBold" },
  castRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 },
  crewRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  castItem: { flexDirection: "row", alignItems: "center", width: "48%", marginBottom: 12 },
  castAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#252836", justifyContent: "center", alignItems: "center", marginRight: 10 },
  castAvatarText: { color: "#12CDD9", fontFamily: "MontserratSemiBold", fontSize: 14 },
  castName: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 13 },
  castRole: { color: "#92929D", fontFamily: "MontserratMedium", fontSize: 11, marginTop: 2 },
  galleryList: { paddingRight: 24 },
  galleryImage: { width: 120, height: 80, borderRadius: 12, marginRight: 8 },
});