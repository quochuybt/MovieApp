import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieCard, { Movie } from "../MovieCard";

// Mock dữ liệu phim phục vụ kiểm thử
const mockMovie: Movie = {
  id: "movie-123",
  title: "Inception",
  genre: "Hành động, Viễn tưởng",
  year: 2010,
  rating: 8, // Điểm số nguyên 8 để kiểm tra định dạng ra "⭐ 8.0"
  poster: "https://example.com/inception.jpg",
  isShowing: true,
};

describe("Câu 7: Test Component MovieCard", () => {
  // 7a (0.25đ): Test render: hiển thị đúng tên phim và điểm đánh giá đúng định dạng (vd: rating 8 -> "⭐ 8.0")
  it("7a: Hiển thị đúng tên phim và điểm đánh giá đúng định dạng (rating 8 -> ⭐ 8.0)", async () => {
    const mockOnSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );

    // Kiểm tra tên phim
    expect(getByText("Inception")).toBeTruthy();

    // Kiểm tra điểm đánh giá đúng định dạng ⭐ 8.0
    expect(getByText(/⭐ 8\.0/)).toBeTruthy();
  });

  // 7b (0.25đ): Test layout: layout="row" có hiển thị thể loại; layout="tile" không hiển thị thể loại (queryByText(...) trả về null)
  it('7b: layout="row" có hiển thị thể loại; layout="tile" không hiển thị thể loại (queryByText trả về null)', async () => {
    const mockOnSelect = jest.fn();

    // Trường hợp 1: layout="row" -> Có hiển thị thể loại
    const { queryByText: queryRow, unmount } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );
    expect(queryRow(/Hành động, Viễn tưởng/)).not.toBeNull();
    unmount();

    // Trường hợp 2: layout="tile" -> Ẩn thể loại (queryByText trả về null)
    const { queryByText: queryTile } = await render(
      <MovieCard movie={mockMovie} layout="tile" onSelect={mockOnSelect} />
    );
    expect(queryTile(/Hành động, Viễn tưởng/)).toBeNull();
  });

  // 7c (0.25đ): Test trạng thái: isShowing: true hiển thị ☑, isShowing: false hiển thị ❌
  it("7c: isShowing: true hiển thị ☑, isShowing: false hiển thị ❌", async () => {
    const mockOnSelect = jest.fn();

    // Khi isShowing: true -> hiển thị ký hiệu ☑
    const { getByText: getShowing, unmount } = await render(
      <MovieCard
        movie={{ ...mockMovie, isShowing: true }}
        layout="row"
        onSelect={mockOnSelect}
      />
    );
    expect(getShowing(/☑/)).toBeTruthy();
    unmount();

    // Khi isShowing: false -> hiển thị ký hiệu ❌
    const { getByText: getNotShowing } = await render(
      <MovieCard
        movie={{ ...mockMovie, isShowing: false }}
        layout="row"
        onSelect={mockOnSelect}
      />
    );
    expect(getNotShowing(/❌/)).toBeTruthy();
  });

  // 7d (0.25đ): Test sự kiện: fireEvent.press -> hàm onSelect = jest.fn() được gọi đúng 1 lần với tham số là movie.id
  it("7d: fireEvent.press gọi hàm onSelect = jest.fn() đúng 1 lần với tham số movie.id", async () => {
    const mockOnSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );

    // Kích hoạt sự kiện bấm vào card
    fireEvent.press(getByText("Inception"));

    // Kiểm tra hàm onSelect được gọi đúng 1 lần
    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    // Kiểm tra tham số truyền vào hàm đúng là movie.id
    expect(mockOnSelect).toHaveBeenCalledWith(mockMovie.id);
  });
});
