import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
}

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(movie.id)}
      style={[styles.card, isTile ? styles.cardTile : styles.cardRow]}
    >
      <View
        style={[styles.posterContainer, isTile && styles.posterContainerTile]}
      >
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />
        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>⭐ {movie.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={[styles.infoContainer, isTile && styles.infoContainerTile]}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text style={styles.genre}>Thể loại: {movie.genre}</Text>
            <Text style={styles.year}>Năm: {movie.year}</Text>
            <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}

        <Text
          style={[
            styles.status,
            movie.isShowing ? styles.showing : styles.notShowing,
          ]}
        >
          <Text>{movie.isShowing ? "☑" : "❌"}</Text>
          {movie.isShowing ? " Đang chiếu" : " Ngừng chiếu"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  cardTile: {
    flexDirection: "column",
    marginBottom: 12,
  },
  posterContainer: {
    width: 70,
    height: 100,
    marginRight: 12,
    position: "relative",
  },
  posterContainerTile: {
    width: "100%",
    height: undefined,
    marginRight: 0,
    position: "relative",
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingBadgeText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoContainerTile: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 3,
  },
  year: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 3,
  },
  rating: {
    fontSize: 14,
    color: "#eab308",
    fontWeight: "600",
    marginBottom: 3,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  showing: {
    color: "#16a34a",
  },
  notShowing: {
    color: "#dc2626",
  },
});
