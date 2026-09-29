import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieCard, { Movie } from "../src/components/MovieCard";


const mockMovie: Movie = {
  id: "movie-123",
  title: "Inception",
  genre: "Hành động, Viễn tưởng",
  year: 2010,
  rating: 8, 
  poster: "https://example.com/inception.jpg",
  isShowing: true,
};

describe("Câu 7: Test Component MovieCard", () => {
  it("7a: Hiển thị đúng tên phim và điểm đánh giá đúng định dạng (rating 8 -> ⭐ 8.0)", async () => {
    const mockOnSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );

    expect(getByText("Inception")).toBeTruthy();

    expect(getByText(/⭐ 8\.0/)).toBeTruthy();
  });

  it('7b: layout="row" có hiển thị thể loại; layout="tile" không hiển thị thể loại (queryByText trả về null)', async () => {
    const mockOnSelect = jest.fn();

    const { queryByText: queryRow, unmount } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );
    expect(queryRow(/Hành động, Viễn tưởng/)).not.toBeNull();
    unmount();

    const { queryByText: queryTile } = await render(
      <MovieCard movie={mockMovie} layout="tile" onSelect={mockOnSelect} />
    );
    expect(queryTile(/Hành động, Viễn tưởng/)).toBeNull();
  });

  it("7c: isShowing: true hiển thị ☑, isShowing: false hiển thị ❌", async () => {
    const mockOnSelect = jest.fn();

    const { getByText: getShowing, unmount } = await render(
      <MovieCard
        movie={{ ...mockMovie, isShowing: true }}
        layout="row"
        onSelect={mockOnSelect}
      />
    );
    expect(getShowing(/☑/)).toBeTruthy();
    unmount();

    const { getByText: getNotShowing } = await render(
      <MovieCard
        movie={{ ...mockMovie, isShowing: false }}
        layout="row"
        onSelect={mockOnSelect}
      />
    );
    expect(getNotShowing(/❌/)).toBeTruthy();
  });

  it("7d: fireEvent.press gọi hàm onSelect = jest.fn() đúng 1 lần với tham số movie.id", async () => {
    const mockOnSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText("Inception"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    expect(mockOnSelect).toHaveBeenCalledWith(mockMovie.id);
  });
});
