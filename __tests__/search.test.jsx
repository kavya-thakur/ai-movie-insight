import { render, screen, fireEvent } from "@testing-library/react";
// This path goes: Root -> src -> app -> components
import SearchBar from "../src/app/components/SearchBar";

describe("SearchHeader Component", () => {
  const mockSetMovieId = jest.fn();
  const mockOnSearch = jest.fn();
  const mockSetError = jest.fn();

  const defaultProps = {
    movieId: "",
    setMovieId: mockSetMovieId,
    onSearch: mockOnSearch,
    isLoading: false,
    hasData: false,
    error: "",
    setError: mockSetError,
  };

  it('renders the "Search." title', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByText("Search.")).toBeInTheDocument();
  });

  it("calls onSearch when the arrow button is clicked", () => {
    render(<SearchBar {...defaultProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
