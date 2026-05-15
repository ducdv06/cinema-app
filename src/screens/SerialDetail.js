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
import { useNavigation } from "@react-navigation/native";

const CAST = [
  {
    id: "1",
    name: "Jon Watts",
    role: "Directors",
    avatar: require("../../assets/icons/avatar.png"),
  },
  {
    id: "2",
    name: "Chris McKenna",
    role: "Writers",
    avatar: require("../../assets/img/avatar-2.png"),
  },
  {
    id: "3",
    name: "Matt Reeves",
    role: "Writers",
    avatar: require("../../assets/img/avatar-3.png"),
  },
];

const EPISODES = [
  {
    id: "1",
    title: "Episode 1",
    duration: "1h30m",
    badge: "Premium",
    thumbnail: require("../../assets/img/ep-img.png"),
    description:
      "Football player who longs to write his own music. It’s not all smiles for this hunk though after he gets involved with his music teacher.",
  },
  {
    id: "2",
    title: "Episode 2",
    duration: "1h30m",
    badge: "Premium",
    thumbnail: require("../../assets/img/ep-img.png"),
    description:
      "Football player who longs to write his own music. It’s not all smiles for this hunk though after he gets involved with his music teacher.",
  },
];

const SEASONS = ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5"];

export default function SerialDetail() {
  const navigation = useNavigation();

  const [selectedSeason, setSelectedSeason] = useState("Season 2");
  const [seasonModalVisible, setSeasonModalVisible] = useState(false);

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

              <TouchableOpacity style={styles.heartBtn}>
                <Ionicons name="heart" size={22} color="#FB4141" />
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
                <Image
                  source={require("../../assets/icons/calendar-icon.png")}
                />
                <Text style={styles.infoText}>2021</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.infoItem}>
                <Image source={require("../../assets/icons/clock-icon.png")} />
                <Text style={styles.infoText}>148 Minutes</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.infoItem}>
                <Image source={require("../../assets/icons/film-icon.png")} />
                <Text style={styles.infoText}>Action</Text>
              </View>
            </View>

            {/* RATING */}
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={16} color="#FF8700" />

              <Text style={styles.ratingText}>4.5</Text>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.trailerBtn}>
                <Ionicons name="play" size={18} color="#FFF" />

                <Text style={styles.trailerText}>Trailer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleBtn}>
                <Feather name="download" size={20} color="#12CDD9" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleBtn}>
                <Image source={require("../../assets/icons/share-icon.png")} />
              </TouchableOpacity>
            </View>

            {/* STORY LINE */}
            <View style={styles.storyContainer}>
              <Text style={styles.sectionTitle}>Story Line</Text>

              <Text style={styles.storyText}>
                Originally a story from Archie Comics which started in 1941,
                Riverdale centres around a group of high school students who are
                shocked by the death of classmate, Jason Blossom. Together they
                unravel the secrets of Riverdale and who
                <Text style={styles.moreText}> More</Text>
              </Text>
            </View>

            {/* CAST */}
            <View style={styles.castContainer}>
              <Text style={styles.sectionTitle}>Cast and Crew</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castRow}
            >
              {CAST.map((person) => (
                <View key={person.id} style={styles.castItem}>
                  <Image source={person.avatar} style={styles.castAvatar} />

                  <View style={styles.castInfo}>
                    <Text style={styles.castName}>{person.name}</Text>

                    <Text style={styles.castRole}>{person.role}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* EPISODE */}
            <View style={styles.episodeContainer}>
              <Text style={styles.sectionTitle}>Episode</Text>

              {/* SEASON */}
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
                  {/* TOP */}
                  <View style={styles.episodeTop}>
                    {/* IMAGE */}
                    <View style={styles.thumbnailWrapper}>
                      <Image
                        source={ep.thumbnail}
                        style={styles.episodeThumbnail}
                      />

                      <TouchableOpacity style={styles.playBtn}>
                        <Ionicons name="play" size={20} color="#FFF" />
                      </TouchableOpacity>
                    </View>

                    {/* INFO */}
                    <View style={styles.episodeInfo}>
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>{ep.badge}</Text>
                      </View>

                      <Text style={styles.durationText}>{ep.duration}</Text>

                      <Text style={styles.episodeTitle}>{ep.title}</Text>
                    </View>

                    {/* DOWNLOAD */}
                    <TouchableOpacity style={styles.downloadBtn}>
                      <Feather name="download" size={24} color="#FF8700" />
                    </TouchableOpacity>
                  </View>

                  {/* DESCRIPTION */}
                  <Text style={styles.episodeDesc}>{ep.description}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      {/* MODAL */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(20,20,35,0.85)",
    paddingTop: 52,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  headerTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },

  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },

  posterContainer: {
    alignItems: "center",
    marginTop: 28,
  },

  poster: {
    width: 200,
    height: 280,
    borderRadius: 24,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 4,
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },

  separator: {
    width: 1,
    height: 16,
    backgroundColor: "#92929D",
    opacity: 0.5,
    marginHorizontal: 12,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  ratingText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    marginLeft: 4,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  trailerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12CDD9",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    marginRight: 16,
  },

  trailerText: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    marginLeft: 8,
  },

  circleBtn: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },

  storyContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  storyText: {
    color: "#EBEBEF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.12,
  },

  moreText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
  },

  castContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },

  castRow: {
    paddingLeft: 24,
    paddingRight: 8,
    gap: 12,
    marginTop: 16,
  },

  castItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  castAvatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },

  castInfo: {
    justifyContent: "center",
  },

  castName: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
  },

  castRole: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 10,
  },

  episodeContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    marginBottom: 120,
  },

  seasonSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 16,
  },

  seasonText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },

  episodeCard: {
    backgroundColor: "#252836",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },

  episodeTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  thumbnailWrapper: {
    width: 121,
    height: 83,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  episodeThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  episodeInfo: {
    flex: 1,
    marginLeft: 16,
  },

  premiumBadge: {
    backgroundColor: "#FF8700",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },

  premiumText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 10,
    fontWeight: "500",
  },

  durationText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },

  episodeTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
  },

  downloadBtn: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#1F1D2B",
    justifyContent: "center",
    alignItems: "center",
  },

  episodeDesc: {
    marginTop: 11,
    color: "#EBEBEF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22.4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  seasonModal: {
    width: "100%",
    backgroundColor: "#252836",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },

  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(31,29,43,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  seasonItem: {
    paddingVertical: 14,
  },

  seasonItemText: {
    color: "#696974",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    textAlign: "center",
  },

  seasonItemActive: {
    color: "#FFF",
    fontSize: 20,
  },
});
