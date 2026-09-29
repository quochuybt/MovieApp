import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Switch,
  RefreshControl,
} from "react-native";
import MovieCard, { Movie } from "../components/MovieCard";

const API_URL = "https://6abb53fdb2118ed7abb83dcf.mockapi.io/movies";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu");
        }
        const data: Movie[] = await response.json();
        if (isMounted) {
          setMovies(data);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu");
      }
      const data: Movie[] = await response.json();
      setMovies(data);
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleSelect = (id: string) => {
    const movie = movies.find((item) => item.id === id);
    if (movie) {
      alert(movie.title);
    }
  };

  const numColumns = isGrid ? 2 : 1;

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Movie App</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Movie App</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch
            value={isGrid}
            onValueChange={setIsGrid}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={isGrid ? "#2563eb" : "#f4f3f4"}
          />
        </View>
      </View>

      <FlatList
        data={movies}
        numColumns={numColumns}
        key={String(numColumns)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[isGrid ? styles.tileItemWrapper : styles.rowItemWrapper]}
          >
            <MovieCard
              movie={item}
              layout={isGrid ? "tile" : "row"}
              onSelect={handleSelect}
            />
          </View>
        )}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2563eb"]}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },
  listContent: {
    padding: 12,
  },
  rowItemWrapper: {
    width: "100%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  tileItemWrapper: {
    width: "48.5%",
    maxWidth: "48.5%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
