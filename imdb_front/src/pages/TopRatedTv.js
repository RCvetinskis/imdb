import React, { useEffect, useState } from "react";
import { getTopTV } from "../utilities/tmdbRequests";
import Pagination from "../components/Pagination";
import MovieCard from "../components/SmallCard";
const TopRatedTv = () => {
  //   tmdbi only gives 500 pages
  const [toptvshows, setTopTvShows] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  useEffect(() => {
    // loads first 20 top movies
    getTopTV(1, setTopTvShows);
  }, []);

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {toptvshows.results.map((item) => (
          <MovieCard item={item} key={item.id} type={"tv"} />
        ))}
      </div>
      <Pagination
        pageCount={500}
        setData={setTopTvShows}
        setAPICall={getTopTV}
      />
    </div>
  );
};

export default TopRatedTv;
