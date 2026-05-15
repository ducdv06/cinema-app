import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
} from "react-native";

import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWishlist } from "../context/WishlistContext";
import { useDownload } from "../context/DownloadContext";

const CAST = [
  {
    id: "1",
    name: "KJ Apa",
    role: "Archie Andrews",
    avatar: "KA",
  },
  {
    id: "2",
    name: "Lili Reinhart",
    role: "Betty Cooper",
    avatar: "LR",
  },
  {
    id: "3",
    name: "Camila Mendes",
    role: "Veronica Lodge",
    avatar: "CM",
  },
  {
    id: "4",
    name: "Cole Sprouse",
    role: "Jughead Jones",
    avatar: "CS",
  },
];

const EPISODES = [
  {
    id: "ep1",
    title: "Episode 1: Chapter One",
    duration: "45m",
    badge: "Premium",
    thumbnail: require("../../assets/img/ep-img.png"),
    description:
      "Football player Archie Andrews longs to write his own music. It's not all smiles for this hunk though after he gets involved with his music teacher, Miss Grundy.",
  },
  {
    id: "ep2",
    title: "Episode 2: Chapter Two",
    duration: "42m",
    badge: "Premium",
    thumbnail: require("../../assets/img/ep-img.png"),
    description:
      "Archie and the gang investigate the mysterious death of Jason Blossom. Secrets begin to unravel as everyone becomes a suspect.",
  },
  {
    id: "ep3",
    title: "Episode 3: Chapter Three",
    duration: "44m",
    badge: "Premium",
    thumbnail: require("../../assets/img/ep-img.png"),
    description:
      "The mystery deepens as new evidence comes to light. Veronica's past catches up with her, and Betty makes a shocking discovery.",
  },
];

const SEASONS = ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5"];

export default function SerialDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params || {};
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addDownload } = useDownload();
  const [shareVisible, setShareVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const [seasonModalVisible, setSeasonModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const serialData = movie || {
    id: "2",
    title: "Riverdale",
    year: "2017",
    duration: "45 Minutes",
    rating: "4.2",
    genre: "Drama",
    poster: require("../../assets/img/riverdale-poster.png"),
  };

  const fullStory = `Originally a story from Archie Comics which started in 1941, Riverdale centres around a group of high school students who are shocked by the death of classmate, Jason Blossom. Together they unravel the secrets of Riverdale and uncover a town filled with mystery, corruption, and dark secrets. The series follows Archie Andrews, Betty Cooper, Veronica Lodge, and Jughead Jones as they navigate high school life while solving crimes that plague their seemingly perfect small town.`;
  
  const shortStory = fullStory.substring(0, 180) + "...";
  const displayStory = isExpanded ? fullStory : shortStory;

  const handleDownloadSeries = () => {
    addDownload({
      id: serialData.id,
      title: serialData.title,
      image: serialData.poster,
      genre: serialData.genre,
      type: "Series",
      progress: 0,
      completed: false,
    });
    navigation.navigate("Download");
  };

  const handleDownloadEpisode = (episode) => {
    addDownload({
      id: `${serialData.id}_${episode.id}`,
      title: `${serialData.title} - ${episode.title}`,
      image: serialData.poster,
      genre: serialData.genre,
      type: "Episode",
      duration: episode.duration,
      progress: 0,
      completed: false,
    });
    navigation.navigate("Download");
  };

  const handleShare = () => {
    setShareVisible(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/riverdale-poster.png")}
        style={styles.background}
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={26} color="#FFF" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Riverdale</Text>

              <TouchableOpacity 
                style={styles.heartBtn}
                onPress={() => toggleWishlist(serialData)}
              >
                <Ionicons 
                  name={isInWishlist(serialData.id) ? "heart" : "heart-outline"} 
                  size={22} 
                  color={isInWishlist(serialData.id) ? "#FB4141" : "#FFFFFF"} 
                />
              </TouchableOpacity>
            </View>

            {/* POSTER */}
            <View style={styles.posterContainer}>
              <Image
                source={require("../../assets/img/riverdale-poster.png")}
                style={styles.poster}
              />
            </View>

            {/* MOVIE INFO */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Image source={require("../../assets/icons/calendar-icon.png")} />
                <Text style={styles.infoText}>2017</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.infoItem}>
                <Image source={require("../../assets/icons/clock-icon.png")} />
                <Text style={styles.infoText}>45 Minutes</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.infoItem}>
                <Image source={require("../../assets/icons/film-icon.png")} />
                <Text style={styles.infoText}>Drama</Text>
              </View>
            </View>

            {/* RATING */}
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={16} color="#FF8700" />
              <Text style={styles.ratingText}>4.2</Text>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.trailerBtn}>
                <Ionicons name="play" size={18} color="#FFF" />
                <Text style={styles.trailerText}>Trailer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.circleBtn} onPress={handleDownloadSeries}>
                <Feather name="download" size={20} color="#12CDD9" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleBtn} onPress={handleShare}>
                <Ionicons name="share-social" size={20} color="#12CDD9" />
              </TouchableOpacity>
            </View>

            {/* STORY LINE */}
            <View style={styles.storyContainer}>
              <Text style={styles.sectionTitle}>Story Line</Text>
              <Text style={styles.storyText}>
                {displayStory}
                <Text style={styles.moreText} onPress={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? " Less" : " More"}
                </Text>
              </Text>
            </View>

            {/* CAST */}
            <View style={styles.castContainer}>
              <Text style={styles.sectionTitle}>Cast and Crew</Text>
              <View style={styles.castGrid}>
                {CAST.map((person) => (
                  <View key={person.id} style={styles.castItem}>
                    <View style={styles.castAvatar}>
                      <Text style={styles.castAvatarText}>{person.avatar}</Text>
                    </View>
                    <View style={styles.castInfo}>
                      <Text style={styles.castName}>{person.name}</Text>
                      <Text style={styles.castRole}>{person.role}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* EPISODE */}
            <View style={styles.episodeContainer}>
              <Text style={styles.sectionTitle}>Episode</Text>

              {/* SEASON SELECTOR */}
              <TouchableOpacity
                style={styles.seasonSelector}
                onPress={() => setSeasonModalVisible(true)}
              >
                <Text style={styles.seasonText}>{selectedSeason}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFF" />
              </TouchableOpacity>

              {/* EPISODE LIST */}
              {EPISODES.map((ep) => (
                <View key={ep.id} style={styles.episodeCard}>
                  <View style={styles.episodeTop}>
                    <View style={styles.thumbnailWrapper}>
                      <Image source={ep.thumbnail} style={styles.episodeThumbnail} />
                      <TouchableOpacity style={styles.playBtn}>
                        <Ionicons name="play" size={20} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.episodeInfo}>
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>{ep.badge}</Text>
                      </View>
                      <Text style={styles.durationText}>{ep.duration}</Text>
                      <Text style={styles.episodeTitle}>{ep.title}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.downloadBtn}
                      onPress={() => handleDownloadEpisode(ep)}
                    >
                      <Feather name="download" size={24} color="#FF8700" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.episodeDesc}>{ep.description}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      {/* SEASON MODAL */}
      <Modal visible={seasonModalVisible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setSeasonModalVisible(false)}
        >
          <View style={styles.seasonModal}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSeasonModalVisible(false)}
            >
              <Ionicons name="close" size={20} color="#FFF" />
            </TouchableOpacity>
            {SEASONS.map((season) => (
              <TouchableOpacity
                key={season}
                style={styles.seasonItem}
                onPress={() => {
                  setSelectedSeason(season);
                  setSeasonModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.seasonItemText,
                    selectedSeason === season && styles.seasonItemActive,
                  ]}
                >
                  {season}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* SHARE MODAL */}
      <Modal visible={shareVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShareVisible(false)}
            >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1D2B" },
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(20,20,35,0.85)", paddingTop: 52 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24 },
  headerTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16 },
  heartBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#252836", justifyContent: "center", alignItems: "center" },
  posterContainer: { alignItems: "center", marginTop: 28 },
  poster: { width: 200, height: 280, borderRadius: 24 },
  infoRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 },
  infoItem: { flexDirection: "row", alignItems: "center" },
  infoText: { marginLeft: 4, color: "#92929D", fontFamily: "MontserratMedium", fontSize: 12 },
  separator: { width: 1, height: 16, backgroundColor: "#92929D", opacity: 0.5, marginHorizontal: 12 },
  ratingRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 },
  ratingText: { color: "#FF8700", fontFamily: "MontserratSemiBold", fontSize: 12, marginLeft: 4 },
  buttonRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 },
  trailerBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#12CDD9", paddingHorizontal: 28, paddingVertical: 14, borderRadius: 30, marginRight: 16 },
  trailerText: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, marginLeft: 8 },
  circleBtn: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#252836", justifyContent: "center", alignItems: "center", marginHorizontal: 6 },
  storyContainer: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 16, marginBottom: 12 },
  storyText: { color: "#EBEBEF", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 24 },
  moreText: { color: "#12CDD9", fontFamily: "MontserratSemiBold" },
  castContainer: { marginTop: 24, paddingHorizontal: 24 },
  castGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  castItem: { flexDirection: "row", alignItems: "center", width: "48%", marginBottom: 16 },
  castAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#252836", justifyContent: "center", alignItems: "center", marginRight: 12 },
  castAvatarText: { color: "#12CDD9", fontFamily: "MontserratSemiBold", fontSize: 16 },
  castInfo: { flex: 1 },
  castName: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 14 },
  castRole: { color: "#92929D", fontFamily: "MontserratMedium", fontSize: 12 },
  episodeContainer: { marginTop: 24, paddingHorizontal: 24, marginBottom: 120 },
  seasonSelector: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 16 },
  seasonText: { color: "#FFF", fontFamily: "MontserratMedium", fontSize: 14 },
  episodeCard: { backgroundColor: "#252836", borderRadius: 16, padding: 12, marginBottom: 16 },
  episodeTop: { flexDirection: "row", alignItems: "center" },
  thumbnailWrapper: { width: 100, height: 70, borderRadius: 8, overflow: "hidden", position: "relative" },
  episodeThumbnail: { width: "100%", height: "100%", resizeMode: "cover" },
  playBtn: { position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -16 }, { translateY: -16 }], width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center" },
  episodeInfo: { flex: 1, marginLeft: 12 },
  premiumBadge: { backgroundColor: "#FF8700", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start", marginBottom: 4 },
  premiumText: { color: "#FFF", fontFamily: "MontserratMedium", fontSize: 9 },
  durationText: { color: "#92929D", fontFamily: "MontserratMedium", fontSize: 11, marginBottom: 2 },
  episodeTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 13 },
  downloadBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#1F1D2B", justifyContent: "center", alignItems: "center" },
  episodeDesc: { marginTop: 10, color: "#EBEBEF", fontFamily: "MontserratRegular", fontSize: 12, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center", paddingHorizontal: 32 },
  seasonModal: { width: "100%", backgroundColor: "#252836", borderRadius: 16, paddingVertical: 24, paddingHorizontal: 24 },
  closeBtn: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(31,29,43,0.8)", justifyContent: "center", alignItems: "center" },
  seasonItem: { paddingVertical: 14 },
  seasonItemText: { color: "#696974", fontFamily: "MontserratSemiBold", fontSize: 16, textAlign: "center" },
  seasonItemActive: { color: "#FFF", fontSize: 20 },
  shareModal: { width: 300, backgroundColor: "#252836", borderRadius: 20, paddingVertical: 24, paddingHorizontal: 20, alignItems: "center" },
  shareTitle: { color: "#FFF", fontFamily: "MontserratSemiBold", fontSize: 18, marginTop: 20, marginBottom: 30 },
  shareRow: { flexDirection: "row", justifyContent: "center", gap: 24, marginBottom: 20 },
  socialBtn: { width: 40, height: 50, borderRadius: 25, backgroundColor: "#1F1D2B", justifyContent: "center", alignItems: "center" },
});