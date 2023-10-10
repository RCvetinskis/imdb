import React, { useEffect, useState } from "react";
import { getTopMovies } from "../utilities/tmdbRequests";
import Pagination from "../components/Pagination";
import MovieCard from "../components/SmallCard";

const TopRatedMovies = () => {
  //   tmdbi only gives 500 pages
  const [topMovies, setTopMovies] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  useEffect(() => {
    // loads first 20 top movies
    getTopMovies(1, setTopMovies);
  }, []);

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {topMovies.results.map((item) => (
          <MovieCard item={item} key={item.id} type={"movie"} />
        ))}
      </div>
      <Pagination
        pageCount={500}
        setData={setTopMovies}
        setAPICall={getTopMovies}
      />
    </div>
  );
};

export default TopRatedMovies;
