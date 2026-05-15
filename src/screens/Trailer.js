import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Trailer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params || {};
  const [isExpanded, setIsExpanded] = useState(false);

  // Detailed content for each movie
  const getMovieContent = (movieData) => {
    const contents = {
      "The Batman": {
        fullSynopsis: `THE BATMAN is an edgy, action-packed thriller that depicts Batman in his early years, struggling to balance rage with righteousness as he investigates a disturbing mystery that has terrorized Gotham. Robert Pattinson delivers a raw, intense portrayal of Batman as a disillusioned, desperate vigilante awakened by the realization that revenge doesn't bring justice. The film also stars Zoë Kravitz as Catwoman, Paul Dano as Riddler, and Colin Farrell as Penguin. With its dark atmosphere, gripping detective story, and stunning action sequences, THE BATMAN is one of the most acclaimed superhero films of all time.`,
        shortSynopsis: `THE BATMAN is an edgy, action-packed thriller that depicts Batman in his early years, struggling to balance rage with righteousness as he investigates a disturbing mystery that has terrorized Gotham.`,
      },
      "Black Panther: Wakanda Forever": {
        fullSynopsis: `Black Panther: Wakanda Forever is an emotional superhero film set after the passing of King T'Challa. Wakanda falls into crisis as they face both the pain of loss and external forces trying to steal their precious Vibranium resources. Meanwhile, a mysterious underwater nation led by Namor emerges and threatens Wakanda's existence. Shuri – T'Challa's younger sister – must grow up, overcome her grief, and take responsibility for protecting her nation. The film features epic battles while emphasizing family bonds, loss, and the journey of becoming a leader. It stands as a beautiful tribute to Chadwick Boseman.`,
        shortSynopsis: `Black Panther: Wakanda Forever takes place after the passing of King T'Challa. Wakanda faces a new threat from Namor - the leader of an underwater nation - while Shuri must overcome her grief to become the protector of her people.`,
      },
      "Minions: The Rise of Gru": {
        fullSynopsis: `Minions: The Rise of Gru is a hilarious animated film about the childhood of Gru – a 12-year-old boy who dreams of becoming the world's greatest supervillain. Set in the 1970s during America's disco craze, Gru and his Minions (Kevin, Stuart, and Bob) get into hilarious situations as they try to join a famous villain group called "The Vicious 6". Along the way, they cause plenty of chaos but also learn valuable lessons about friendship, loyalty, and growing up. The film delivers non-stop laughs for all ages with the Minions' signature silly humor.`,
        shortSynopsis: `Minions: The Rise of Gru tells the story of young Gru – a 12-year-old boy who dreams of becoming the world's greatest supervillain. Along with his Minions, he embarks on a hilarious journey to join the villain group "The Vicious 6".`,
      },
    };

    return contents[movieData?.title] || {
      fullSynopsis: movieData?.description || "Content is being updated...",
      shortSynopsis: movieData?.description?.substring(0, 150) + "..." || "Content is being updated...",
    };
  };

  const movieData = movie || {
    id: "1",
    title: "The Batman",
    year: "2022",
    duration: "176 Minutes",
    rating: "4.8",
    genre: "Action",
    date: "March 2, 2022",
    image: require("../../assets/img/Batman-poster.png"),
    trailer: require("../../assets/img/batman-trailer.png"),
  };

  const content = getMovieContent(movieData);
  const displaySynopsis = isExpanded ? content.fullSynopsis : content.shortSynopsis;

  // Sample cast data - you can customize per movie
  const getCastInfo = (title) => {
    const castMap = {
      "The Batman": [
        { name: "Robert Pattinson", role: "Batman", initial: "RP" },
        { name: "Zoë Kravitz", role: "Catwoman", initial: "ZK" },
        { name: "Matt Reeves", role: "Director", initial: "MR" },
        { name: "Paul Dano", role: "Riddler", initial: "PD" },
      ],
      "Black Panther: Wakanda Forever": [
        { name: "Letitia Wright", role: "Shuri", initial: "LW" },
        { name: "Lupita Nyong'o", role: "Nakia", initial: "LN" },
        { name: "Ryan Coogler", role: "Director", initial: "RC" },
        { name: "Tenoch Huerta", role: "Namor", initial: "TH" },
      ],
      "Minions: The Rise of Gru": [
        { name: "Steve Carell", role: "Gru", initial: "SC" },
        { name: "Pierre Coffin", role: "Minions", initial: "PC" },
        { name: "Kyle Balda", role: "Director", initial: "KB" },
        { name: "Taraji P. Henson", role: "Belle Bottom", initial: "TH" },
      ],
    };
    return castMap[title] || castMap["The Batman"];
  };

  const castList = getCastInfo(movieData.title);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trailer</Text>
          <TouchableOpacity style={styles.heartBtn}>
            <Ionicons name="heart" size={24} color="#FB4141" />
          </TouchableOpacity>
        </View>

        {/* VIDEO PLAYER */}
        <View style={styles.videoContainer}>
          <Image source={movieData.trailer} style={styles.videoThumbnail} />
          <View style={styles.playIconContainer}>
            <Ionicons name="play-circle" size={60} color="#FFF" />
          </View>
          <View style={styles.controlsBar}>
            <Image source={require("../../assets/img/tab-video.png")} />
          </View>
        </View>

        {/* MOVIE TITLE + META */}
        <View style={styles.titleSection}>
          <Text style={styles.movieTitle}>{movieData.title}</Text>
          <View style={styles.metaRow}>
            <Image source={require("../../assets/icons/calendar-icon.png")} />
            <Text style={styles.metaLabel}>Release Date:</Text>
            <Text style={styles.metaValue}> {movieData.date}</Text>
            <View style={styles.separator} />
            <Image source={require("../../assets/icons/film-icon.png")} />
            <Text style={styles.metaLabel}> {movieData.genre}</Text>
          </View>
        </View>

        {/* SYNOPSIS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsisText}>
            {displaySynopsis}
            {!isExpanded && content.fullSynopsis.length > content.shortSynopsis.length && (
              <Text style={styles.moreText} onPress={() => setIsExpanded(true)}>
                {" "}More
              </Text>
            )}
            {isExpanded && (
              <Text style={styles.moreText} onPress={() => setIsExpanded(false)}>
                {" "}Less
              </Text>
            )}
          </Text>
        </View>

        {/* CAST AND CREW */}
        <View style={styles.castSection}>
          <Text style={styles.sectionTitle}>Cast and Crew</Text>
          <View style={styles.castGrid}>
            {castList.map((person, index) => (
              <View key={index} style={styles.castItem}>
                <View style={styles.castAvatar}>
                  <Text style={styles.castAvatarText}>{person.initial}</Text>
                </View>
                <View style={styles.castInfo}>
                  <Text style={styles.castName}>{person.name}</Text>
                  <Text style={styles.castRole}>{person.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  heartBtn: {
    backgroundColor: "#252836",
    padding: 6,
    borderRadius: 12,
    opacity: 0.9,
  },
  videoContainer: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    height: 200,
    position: "relative",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  controlsBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  metaLabel: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginLeft: 4,
  },
  metaValue: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: "#92929D",
    marginHorizontal: 8,
    opacity: 0.5,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  synopsisText: {
    color: "#EBEBEF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    letterSpacing: 0.12,
    lineHeight: 22,
  },
  moreText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
  },
  castSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 120,
  },
  castGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  castItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 16,
  },
  castAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  castAvatarText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  castInfo: {
    flex: 1,
  },
  castName: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
  },
  castRole: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
    marginTop: 2,
  },
});