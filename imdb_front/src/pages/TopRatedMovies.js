import React from "react";
import Pagination from "../components/Pagination";
import Card from "../components/ShowsCard/Card";
import { useLocation } from "react-router-dom";
import usePaginate from "../hooks/usePaginate";
import { setGenreNames } from "../utilities/setGenreNames";
import useGenres from "../hooks/useGenres";
const TopRatedMovies = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate("movie", page, "top");
  const genres = useGenres("movie");
  const updatedData = setGenreNames(data, genres);

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {updatedData.results.map((item) => (
          <Card item={item} key={item.id} type={"movie"} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        pathname={pathname}
      />
    </div>
  );
};

export default TopRatedMovies;
