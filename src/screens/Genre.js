import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Genre() {
  const navigation = useNavigation();

  const [selectedGenre, setSelectedGenre] = useState("Action");

  const genres = [
    {
      id: 1,
      title: "Action",
      image: require("../../assets/img/action-img.png"),
    },
    {
      id: 2,
      title: "Horror",
      image: require("../../assets/img/Horror-img.png"),
    },
    {
      id: 3,
      title: "Fantasy",
      image: require("../../assets/img/Fantasy-img.png"),
    },
    {
      id: 4,
      title: "Anime",
      image: require("../../assets/img/Anime-img.png"),
    },
    {
      id: 5,
      title: "Romance",
      image: require("../../assets/img/Romance-img.png"),
    },
    {
      id: 6,
      title: "Sci-fi",
      image: require("../../assets/img/Sci-fi-img.png"),
    },
    {
      id: 7,
      title: "Comedy",
      image: require("../../assets/img/comedy.png"),
    },
    {
      id: 8,
      title: "Adventures",
      image: require("../../assets/img/Adventures-img.png"),
    },
  ];

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

        <Text style={styles.headerTitle}>Genre</Text>

        <View style={{ width: 32 }} />
      </View>

      {/* GENRE LIST */}
      <View style={styles.genreContainer}>
        {genres.map((item) => {
          const isSelected = selectedGenre === item.title;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.24}
              style={styles.card}
              onPress={() => setSelectedGenre(item.title)}
            >
              <ImageBackground
                source={item.image}
                imageStyle={styles.imageStyle}
                style={styles.imageBg}
              >
                <View style={styles.overlay} />

                <View style={styles.genreContent}>
                  <View
                    style={[styles.radio, isSelected && styles.radioActive]}
                  >
                    {isSelected ? (
                      <View style={styles.radioInner}>
                        <Ionicons name="checkmark" size={16} color="#1F1D2B" />
                      </View>
                    ) : null}
                  </View>

                  <Text style={styles.genreText}>{item.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
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
    marginBottom: 32,
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
  },

  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    height: 80,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },

  imageBg: {
    flex: 1,
    justifyContent: "center",
  },

  imageStyle: {
    borderRadius: 8,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  genreContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 2,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#EBEBEF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  radioActive: {
    borderColor: "#12CDD9",
  },
  radioInner: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#12CDD9",
    justifyContent: "center",
    alignItems: "center",
  },

  genreText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.12,
  },
});
