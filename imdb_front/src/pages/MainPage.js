import React, { useContext, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import moviesContext from "../context/MoviesContext";
import { getPopularMovies } from "../utilities/tmdbRequests";
import SearchBar from "../components/SearchBar";

const MainPage = () => {
  const { getMovies, setMovies } = useContext(moviesContext);

  // make main page with display few popular movies, create pagination , implement search bar
  useEffect(() => {
    getPopularMovies(setMovies);
  }, []);
  console.log(getMovies);
  return (
    <div className="main-page">
      <SearchBar />
      <div className="flex flex-wrap gap-10 justify-center ">
        {getMovies.map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
