import React, { useEffect, useState } from "react";
import MovieCard from "../components/SmallCard";
import { getPopularMovies } from "../utilities/tmdbRequests";
import SearchBar from "../components/SearchBar";

const MainPage = () => {
  const [popularMovies, setPopularMovies] = useState({
    results: [],
  });
  useEffect(() => {
    getPopularMovies(setPopularMovies);
  }, []);
  console.log(popularMovies);
  return (
    <div className="main-page">
      <SearchBar />
      <div className="flex flex-wrap gap-10 justify-center ">
        {popularMovies.results.map((item) => (
          <MovieCard item={item} key={item.id} type={"movie"} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
