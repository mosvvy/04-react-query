// import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
// import showToastError from "../../services/toastService";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [page, setPage] = useState<number>(0);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  // async function handleSubmit(query: string) {
  // try {

  // const { data, total_pages } = await fetchMovies(query);

  // if (data.length === 0)
  //   showToastError("No movies found for your request.");

  // setTotalPages(total_pages);
  // setMovies(data);
  // } catch {
  //   setIsError(true);
  // } finally {
  //   setIsLoading(false);
  // }
  // }

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  function handleMovieSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleModalClose() {
    setSelectedMovie(null);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleMovieSelect} movies={data.results} />
      )}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {selectedMovie && (
        <MovieModal onClose={handleModalClose} movie={selectedMovie} />
      )}
    </>
  );
}

export default App;
