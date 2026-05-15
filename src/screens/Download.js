import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import { useDownload } from "../context/DownloadContext";

export default function Download() {
  const navigation = useNavigation();
  const { downloads, removeDownload } = useDownload();

  const renderItem = ({ item }) => {
    const isCompleted = item.completed;
    const sizeTotal = "1.78 GB";
    const sizeDownloaded = ((item.progress / 100) * 1.78).toFixed(2);

    return (
      <View style={styles.card}>
        {/* THUMBNAIL */}
        <View style={styles.thumbnailWrapper}>
          <Image source={item.image} style={styles.thumbnail} />
          <View style={styles.playOverlay}>
            <Ionicons
              name={isCompleted ? "play" : "pause"}
              size={22}
              color="#fff"
            />
          </View>
        </View>

        {/* INFO */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardGenre}>{item.genre || "Action"}</Text>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>

          {!isCompleted ? (
            <View style={styles.progressRow}>
              <Feather name="download" size={12} color="#92929D" />
              <Text style={styles.progressText}>
                {sizeDownloaded} of {sizeTotal}
              </Text>
              <Text style={styles.progressPercent}>{item.progress}%</Text>
            </View>
          ) : (
            <View style={styles.progressRow}>
              <Text style={styles.cardMeta}>
                {item.type || "Movie"} | {sizeTotal}
              </Text>
            </View>
          )}

          {/* PROGRESS BAR */}
          {!isCompleted && (
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${item.progress}%` }]}
              />
            </View>
          )}
        </View>

        {/* DELETE */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeDownload(item.id)}
        >
          <Ionicons name="close" size={18} color="#92929D" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Download</Text>
        <View style={{ width: 32 }} />
      </View>

      {downloads.length === 0 ? (
        /* EMPTY STATE */
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/img/folder-img.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>There Is No Movie Yet!</Text>
          <Text style={styles.emptyDesc}>
            Find your movie by Type title,{"\n"}categories, years, etc
          </Text>
        </View>
      ) : (
        /* DOWNLOAD LIST */
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomTabs />
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
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
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    letterSpacing: 0.12,
  },

  /* EMPTY */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },

  emptyImage: {
    width: 76,
    height: 76,
    resizeMode: "contain",
  },

  emptyTitle: {
    marginTop: 16,
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    letterSpacing: 0.12,
  },

  emptyDesc: {
    marginTop: 8,
    color: "#92929D",
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    lineHeight: 19.2,
    letterSpacing: 0.12,
  },

  /* LIST */
  listContent: {
    paddingBottom: 120,
    gap: 12,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },

  thumbnailWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInfo: {
    flex: 1,
    gap: 4,
  },

  cardGenre: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },

  cardTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  progressText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
    flex: 1,
  },

  progressPercent: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
  },

  progressBarBg: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    marginTop: 4,
  },

  progressBarFill: {
    height: 3,
    backgroundColor: "#12CDD9",
    borderRadius: 2,
  },

  cardMeta: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },

  deleteBtn: {
    padding: 4,
  },
});
